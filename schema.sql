DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10) NOT NULL,
department_id INT,
PRIMARY KEY(id),
FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
PRIMARY KEY(id),
FOREIGN KEY(role_id) REFERENCES roles(id)
);

INSERT INTO departments(name)
VALUES ("Accounting");
INSERT INTO roles(title, salary, department_id)
VALUES ("Manager", 75000, 1);
INSERT INTO employees(first_name, last_name, role_id)
VALUE ("John", "Smith", 1);

SELECT * FROM departments;