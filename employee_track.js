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

//this function allows the user to view all the champions through the query, throws an error or displays the response and then runs the start function again.
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

//allows the user to view all classes through the query, throws an error or displays the response and then runs the start function again
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

//allows user to view all races through the query, throws an error or displays the response and then runs the start function again.
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

//selects the class queries for the add champion function. Creates the class array. The function then through the query takes the classes and pushes it to the class array. Then returns the array.
let classArr = [];
function selectClass() {
  connection.query("SELECT * FROM class", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      classArr.push(res[i].title);
    }
  });
  return classArr;
}

//selects the raid leader queries for the add employee function. Creates the raid leader array. Then through the query it takes the first and last name from the champion table where the raid leader id is null. Throws an error or pushes the the response to the array. Then returns array.
let raidLeaderArr = [];
function selectLeader() {
  connection.query(
    "SELECT first_name, last_name FROM champion WHERE raid_leader_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        raidLeaderArr.push(res[i].first_name);
      }
    }
  );
  return raidLeaderArr;
}

//
function updateChampion() {
  connection.query(
    "SELECT champion.last_name, class.title FROM champion JOIN class ON champion.class_id = class.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function () {
              let lastName = [];
              for (let i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Champions last name? ",
          },
          {
            name: "class",
            type: "rawlist",
            message: "What is the Champions new title? ",
            choices: selectClass(),
          },
        ])
        .then(function (val) {
          let classId = selectClass().indexOf(val.class) + 1;
          connection.query(
            "UPDATE champion SET WHERE ?",
            {
              last_name: val.lastName,
            },
            {
              class_id: classId,
            },
            function (err) {
              if (err) throw err;
              console.table(val);
              startPrompt();
            }
          );
        });
    }
  );
}

//
function addChampion() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "class",
        type: "list",
        message: "What is their Class? ",
        choices: selectClass(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their raid leaders name?",
        choices: selectLeader(),
      },
    ])
    .then(function (val) {
      let classId = selectClass().indexOf(val.role) + 1;
      let leaderId = selectLeader().indexOf(val.choice) + 1;
      connection.query(
        "INSERT INTO champion SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          class_id: classId,
          raid_leader_id: leaderId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
}

function addClass() {
  connection.query(
    "SELECT class.title AS Title, class.gold AS Salary FROM class",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Gold",
            type: "input",
            message: "How much gold will they make?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO class SET ?",
            {
              title: res.Title,
              gold: res.gold,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    }
  );
}

function addRace() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Race would you like to add?",
      },
    ])
    .then(function (res) {
      let query = connection.query(
        "INSERT INTO race SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}
