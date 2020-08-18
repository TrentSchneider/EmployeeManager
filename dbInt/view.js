const inquirer = require("inquirer");
const mysql = require("mysql");
const DB_PW = require("../db_pw");
const init = require("../app");
const cons = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: DB_PW,
  database: "employee_db",
});

function viewDep() {
  connection.query("SELECT id AS ID, name AS Name FROM departments", function (
    err,
    res
  ) {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "exit",
          message: "Exit view?",
          choices: ["Yes"],
        },
      ])
      .then(() => {
        console.clear();
        init.initPrompt();
      });
  });
}
function viewRole() {
  connection.query(
    "SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles INNER JOIN departments ON roles.department_id = departments.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      inquirer
        .prompt([
          {
            type: "list",
            name: "exit",
            message: "Exit view?",
            choices: ["Yes"],
          },
        ])
        .then(() => {
          console.clear();
          init.initPrompt();
        });
    }
  );
}
function viewEmp() {
  connection.query(
    "SELECT a.id AS ID, a.first_name AS 'First Name', a.last_name AS 'Last Name', roles.title AS Title, departments.name AS Department, roles.salary AS Salary, CONCAT(b.first_name,' ',b.last_name) as Manager FROM employees a INNER JOIN roles ON a.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees b ON a.manager_id = b.id ORDER BY id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      inquirer
        .prompt([
          {
            type: "list",
            name: "exit",
            message: "Exit view?",
            choices: ["Yes"],
          },
        ])
        .then(() => {
          console.clear();
          init.initPrompt();
        });
    }
  );
}
function viewEmpByMan() {
  connection.query(
    "SELECT CONCAT(b.first_name,' ',b.last_name) as Manager, a.id AS ID, a.first_name AS 'First Name', a.last_name AS 'Last Name', roles.title AS Title, departments.name AS Department, roles.salary AS Salary FROM employees a INNER JOIN roles ON a.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees b ON a.manager_id = b.id ORDER BY b.last_name, b.first_name",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      inquirer
        .prompt([
          {
            type: "list",
            name: "exit",
            message: "Exit view?",
            choices: ["Yes"],
          },
        ])
        .then(() => {
          console.clear();
          init.initPrompt();
        });
    }
  );
}

module.exports.viewDep = viewDep;
module.exports.viewRole = viewRole;
module.exports.viewEmp = viewEmp;
module.exports.viewEmpByMan = viewEmpByMan;
