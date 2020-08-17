const inquirer = require("inquirer");
const mysql = require("mysql");
const DB_PW = require("./db_pw");
const view = require("./dbInt/view");
const add = require("./dbInt/add");
const update = require("./dbInt/update");
const cons = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: DB_PW,
  database: "employee_db",
});
connection.connect((err) => {
  if (err) throw err;
  initPrompt();
});
function initPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initialPrompt",
        message: "What would you like to do?",
        choices: ["Add records", "View records", "Update records", "Exit"],
      },
    ])
    .then((data) => {
      if (data.initialPrompt === "Add records") {
        console.clear();
        addPrompt();
      } else if (data.initialPrompt === "View records") {
        console.clear();
        viewPrompt();
      } else if (data.initialPrompt === "Update records") {
        console.clear();
        updatePrompt();
      } else if (data.initialPrompt === "Exit") {
        connection.end();
        console.log("Exiting now");
        setTimeout(() => {
          console.clear();
          process.exit();
        }, 1000);
      }
    });
}
function addPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addPrompt",
        message: "What would you like to add?",
        choices: ["Department", "Role", "Employee"],
      },
    ])
    .then((data) => {
      if (data.addPrompt == "Department") {
        add.addDep();
      } else if (data.addPrompt === "Role") {
        connection.query("SELECT name FROM departments", function (err, deps) {
          if (err) throw err;
          add.addRole(deps);
        });
      } else if (data.addPrompt === "Employee") {
        connection.query("SELECT title FROM roles", function (err, role) {
          if (err) throw err;
          connection.query(
            "SELECT employees.first_name, employees.last_name FROM employees",
            function (err, manager) {
              if (err) throw err;
              add.addEmp(role, manager);
            }
          );
        });
      }
    });
}
function viewPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewPrompt",
        message: "What would you like to view?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
        ],
      },
    ])
    .then((data) => {
      if (data.viewPrompt === "View all departments") {
        view.viewDep();
      } else if (data.viewPrompt === "View all roles") {
        view.viewRole();
      } else if (data.viewPrompt === "View all employees") {
        view.viewEmp();
      }
    });
}
function updatePrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updatePrompt",
        message: "What would you like to Update?",
        choices: ["Update an employee"],
      },
    ])
    .then((data) => {
      if (data.updatePrompt === "Update an employee") {
        connection.query("SELECT * FROM employees", (err, emps) => {
          if (err) throw err;
          connection.query("SELECT * FROM roles", (err, ro) => {
            if (err) throw err;
            connection.query(
              "SELECT employees.first_name, employees.last_name FROM employees",
              function (err, ma) {
                if (err) throw err;
                update.upEmpRole(emps, ro, ma);
              }
            );
          });
        });
      }
    });
}

module.exports.initPrompt = initPrompt;
