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
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Tom", "David", 2, 1);
INSERT INTO roles(title, salary, department_id)
VALUES ("IT Intern", 15000, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Jones", 3, 1);
