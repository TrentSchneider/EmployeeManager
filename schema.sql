DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL UNIQUE,
PRIMARY KEY(id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL UNIQUE,
salary DECIMAL(10) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);

INSERT INTO departments(name)
VALUES ("Accounting");
INSERT INTO departments(name)
VALUES ("IT");
INSERT INTO roles(title, salary, department_id)
VALUES ("Manager", 75000, 1);
INSERT INTO employees(first_name, last_name, role_id)
VALUE ("John", "Smith", 1);
INSERT INTO roles(title, salary, department_id)
VALUES ("Supervisor", 45000, 1);
INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Tom", "David", 2);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;

SELECT name FROM departments;

SELECT id FROM departments WHERE name = "IT";
DELETE FROM roles WHERE title = "IT Intern";
SELECT employees.id, employees.first_name, roles.title
FROM employees
INNER JOIN roles
ON employees.role_id = roles.id
WHERE department_id = 1 AND role_id != 1;

SELECT employees.first_name, employees.last_name, roles.title
FROM roles
INNER JOIN employees
ON employees.role_id = roles.id
WHERE title = "manager";

SELECT a.id AS ID, a.first_name AS "First Name", a.last_name AS "Last Name", roles.title AS Title, departments.name AS Department, roles.salary AS Salary, CONCAT(b.first_name," ",b.last_name) as Manager
FROM employees a
INNER JOIN roles
ON a.role_id = roles.id
INNER JOIN departments
ON roles.department_id = departments.id
LEFT JOIN employees b
ON a.manager_id = b.id;
