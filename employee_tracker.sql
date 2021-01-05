
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE race (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE class (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
gold DECIMAL,
race_id INT,
FOREIGN KEY (race_id) REFERENCES race(id)
);

CREATE TABLE champion (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
class_id INT,
raid_leader_id INT,
FOREIGN KEY (class_id) REFERENCES class(id),
FOREIGN KEY (raid_leader_id) REFERENCES champion(id)
);

INSERT INTO race (name)
VALUE ("Orc");
INSERT INTO race (name)
VALUE ("Human");
INSERT INTO race (name)
VALUE ("Troll");
INSERT INTO race (name)
VALUE ("Dwarf");

INSERT INTO class (title, gold, race_id)
VALUE ("Paladin", 15000, 2);
INSERT INTO class (title, gold, race_id)
VALUE ("Mage", 25000, 2);
INSERT INTO class (title, gold, race_id)
VALUE ("Hunter", 17500, 4);
INSERT INTO class (title, gold, race_id)
VALUE ("Warlock", 18000, 1);
INSERT INTO class (title, gold, race_id)
VALUE ("Druid", 30000, 3);
INSERT INTO class (title, gold, race_id)
VALUE ("Monk", 40000, 1);
INSERT INTO class (title, gold, race_id)
VALUE ("Warrior", 19000, 4);

INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("John", "Smith", null, 1);
INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("Koranes", "Rauoabjarnarstaoir", null, 4);
INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("Krogran","Redbelly",null,3);
INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("Kenneth", "Livingstone", 1, 2);
INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("Issa", "Tree", 4, 5);
INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("Shin-Young", "Windbrow", 1, 6);
INSERT INTO champion (first_name, last_name, raid_leader_id, class_id)
VALUE ("Myrduggs", "Hammerfall", 2, 7);

SELECT * FROM race;
SELECT * FROM class;
SELECT * FROM champion;