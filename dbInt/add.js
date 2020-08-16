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

          setTimeout(() => {
            console.clear();
            init.initPrompt();
          }, 3000);
        }
      );
    });
}
function addRole(deps) {
  let choice = [];
  for (let i = 0; i < deps.length; i++) {
    choice.push(deps[i].name);
  }
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
      connection.query(
        "SELECT id FROM departments WHERE name = ?",
        [answer.department],
        function (err, depID) {
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: depID[0].id,
            },
            function (err, res) {
              if (err) throw err;
              console.log("Added " + answer.title + " to roles.");
              setTimeout(() => {
                console.clear();
                init.initPrompt();
              }, 3000);
            }
          );
        }
      );
    });
}

function addEmp(role, manager) {
  let manChoi = [];
  for (let i = 0; i < manager.length; i++) {
    manChoi.push(manager[i].first_name + " " + manager[i].last_name);
  }
  manChoi.unshift("None");
  let roChoi = [];
  for (let i = 0; i < role.length; i++) {
    roChoi.push(role[i].title);
  }

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
        name: "role",
        message: "Please select which role this employee belongs to.",
        choices: roChoi,
      },
      {
        type: "list",
        name: "manager",
        message: "Please select the employee's manager.",
        choices: manChoi,
      },
    ])
    .then((answer) => {
      let splitter = answer.manager;
      let manArray = splitter.split(" ");
      connection.query(
        "SELECT id FROM roles WHERE title = ?",
        [answer.role],
        function (err, role) {
          if (err) throw err;
          connection.query(
            "SELECT id FROM employees WHERE first_name = ? AND last_name = ?",
            [manArray[0], manArray[1]],
            function (err, manage) {
              if (err) throw err;
              connection.query(
                "INSERT INTO employees SET ?",
                {
                  first_name: answer.first,
                  last_name: answer.last,
                  role_id: role[0].id,
                  manager_id: () => {
                    if (answer.manager === "None") {
                      return null;
                    } else {
                      manage[0].id;
                    }
                  },
                },
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    "Added " +
                      answer.first +
                      " " +
                      answer.last +
                      " to employees."
                  );
                  setTimeout(() => {
                    console.clear();
                    init.initPrompt();
                  }, 3000);
                }
              );
            }
          );
        }
      );
    });
}

module.exports.addDep = addDep;
module.exports.addRole = addRole;
module.exports.addEmp = addEmp;
