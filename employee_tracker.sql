ALTER USER 'root'@'localhost'
IDENTIFIED WITH mysql_nativepassword BY 'Wow12344';

DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_tracker;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
raid_leader_id INT,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (raid_leader_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUE ("Orc");
INSERT INTO department (name)
VALUE ("Human");
INSERT INTO department (name)
VALUE ("Troll");
INSERT INTO department (name)
VALUE ("Dwarf");

INSERT INTO role (title, salary, department_id)
VALUE ("Paladin", 15000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Mage", 25000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Hunter", 17500, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Warlock", 18000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Druid", 30000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Monk", 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Warrior", 19000, 4);

INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("John", "Smith", null, 1);
INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("Koranes", "Rauoabjarnarstaoir", null, 4);
INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("Krogran","Redbelly",null,3);
INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("Kenneth", "Livingstone", 1, 2);
INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("Issa", "Tree", 4, 5);
INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("Shin-Young", "Windbrow", 1, 6);
INSERT INTO employee (first_name, last_name, raid_leader_id, role_id)
VALUE ("Myrduggs", "Hammerfall", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;