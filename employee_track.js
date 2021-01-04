const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
//connects to the mysql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wow12345",
  database: "employee_trackerDB",
});
//throws and error if connection fails otherwise console logs the connection id and then starts the prompt function
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as Id" + connection.threadId);
  startPrompt();
});
//function that starts the prompt asking user what they would like to do next. Depending on the users choice it then goes to the correct function for that prompt.
function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Champions?",
          "View All Champions By Class?",
          "View all Champions By Race",
          "Update Champion",
          "Add Champion?",
          "Add Class?",
          "Add Race?",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View All Champions?":
          viewAllChampions();
          break;

        case "View All Champions By Class?":
          viewAllClasses();
          break;
        case "View all Champions By Race":
          viewAllRaces();
          break;

        case "Update Champion":
          updateChampion();
          break;

        case "Add Champion?":
          addChampion();
          break;

        case "Add Class?":
          addClass();
          break;

        case "Add Race?":
          addRace();
          break;
      }
    });
}
//this function allows you to
function viewAllChampions() {
  connection.query(
    "SELECT champion.first_name, champion.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM champion INNER JOIN role on role.id = champion.role_id INNER JOIN department on department.id = role.department_id left join champion e on champion.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
//
function viewAllClasses() {
  connection.query(
    "SELECT champion.first_name, champion.last_name, role.title AS Title FROM champion JOIN role ON champion.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
//
function viewAllRaces() {
  connection.query(
    "SELECT champion.first_name, champion.last_name, department.name AS Department FROM champion JOIN role ON champion.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY champion.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}

//
let classArr = [];
function selectclass() {
  connection.query("SELECT * FROM class", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      classArr.push(res[i].title);
    }
  });
  return classArr;
}
//
let raidLeaderArr = [];
function selectLeader() {
  connection.query(
    "SELECT first_name, last_name FROM champion WHERE raid_leader_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        raidLeaderArr.push(res[i].first_name);
      }
    }
  );
  return raidLeaderArr;
}
