DROP DATABASE IF EXISTS TrackerDB;
CREATE database TrackerDB;

USE TrackerDB;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(30) NULL,
);

CREATE TABLE role (
 id INT PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(30),
 salary DECIMAL,
 department_id INT,
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
);

SELECT * FROM department;
SELECT * FROM roll;
SELECT * FROM employee;

