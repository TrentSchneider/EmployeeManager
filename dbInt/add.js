const inquirer = require("inquirer");
const mysql = require("mysql");
const DB_PW = require("../db_pw");
const init = require("../app");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: DB_PW,
  database: "employee_db",
});

function addDep() {
  connection.connect((err) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please add department name",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please make sure a name is entered.";
          },
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO departments SET ?",
          { name: answer.name },
          function (err, res) {
            if (err) throw err;
            console.log("Added " + answer.name + " to departments.");
            connection.end();
            setTimeout(() => {
              console.clear;
            }),
              3000;
          }
        );
      });
  });
}
function addRole(deps) {
  console.log(deps);
  let choice = [];
  for (let i = 0; i < deps.length; i++) {
    choice.push(deps[i].name);
  }
  console.log(choice);
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please add the role's title.",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please make sure a title is entered.";
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Please add the role's salary.",
        validate: (answer) => {
          if (isNaN(answer) || answer === "") {
            return "Please make sure a salary is entered.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "department",
        message: "Please select which department this role belongs to.",
        choices: choice,
      },
    ])
    .then((answer) => {
      connection.connect((err) => {
        if (err) throw err;
        connection.query(
          "SELECT id FROM departments WHERE name = " + answer.name,
          function (err, depID) {
            connection.query(
              "INSERT INTO roles SET ?",
              {
                title: answer.title,
                salary: answer.salary,
                department_id: depID,
              },
              function (err, res) {
                if (err) throw err;
                console.log("Added " + answer.title + " to roles.");
                connection.end();
                setTimeout(() => {
                  console.clear();
                  init.initPrompt();
                }, 3000);
              }
            );
          }
        );
      });
    });
}

function addEmp() {
  connection.connect((err) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "first",
          message: "Please add employee's first name",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please make sure a name is entered.";
          },
        },
        {
          type: "input",
          name: "last",
          message: "Please add employee's last name",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please make sure a name is entered.";
          },
        },
        {
          type: "list",
          name: "department",
          message: "Please select which department this employee belongs to.",
          choices: depchoice(),
        },
        {
          type: "list",
          name: "role",
          message: "Please select which role this employee belongs to.",
          choices: function () {
            let depID;
            connection.query(
              "SELECT * FROM departments WHERE name = " + answer.department,
              function (err, res) {
                if (err) throw err;
                depID = res.id;
              }
            );
            connection.query(
              "SELECT * FROM roles WHERE department_id = " + depID,
              function (err, results) {
                if (err) throw err;
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].name);
                }
                return choiceArray;
              }
            );
          },
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: connection.query(
              "SELECT id FROM role WHERE title = " + answer.role,
              function (err, res) {
                if (err) throw err;
                return res;
              }
            ),
          },
          function (err, res) {
            if (err) throw err;
            console.log(
              "Added " + answer.first + " " + answer.last + " to employees."
            );
            setTimeout(() => {
              console.clear;
            }),
              3000;
          }
        );
      });
    connection.end();
  });
}

module.exports.addDep = addDep;
module.exports.addRole = addRole;
module.exports.addEmp = addEmp;
