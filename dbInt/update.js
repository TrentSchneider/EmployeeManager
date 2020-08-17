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
function upEmpRole(emps, ro, ma) {
  let empChoi = [];
  for (let i = 0; i < emps.length; i++) {
    empChoi.push(emps[i].first_name + " " + emps[i].last_name);
  }
  let roChoi = [];
  for (let i = 0; i < ro.length; i++) {
    roChoi.push(ro[i].title);
  }
  let manChoi = [];
  for (let i = 0; i < ma.length; i++) {
    manChoi.push(ma[i].first_name + " " + ma[i].last_name);
  }
  manChoi.unshift("None");
  inquirer
    .prompt([
      {
        type: "list",
        name: "empPrompt",
        message: "Which employee would you like to update?",
        choices: empChoi,
      },
      {
        type: "list",
        name: "updatePrompt",
        message: "What information would you like to update?",
        choices: ["Role", "Manager"],
      },
      {
        type: "list",
        name: "updateInfo",
        message: "Please select new role:",
        choices: roChoi,
        when: (answers) => answers.updatePrompt === "Role",
      },
      {
        type: "list",
        name: "updateInfo",
        message: "Please select new manager:",
        choices: manChoi,
        when: (answers) => answers.updatePrompt === "Manager",
      },
    ])
    .then((answers) => {
      let splitter = answers.empPrompt;
      let empArray = splitter.split(" ");
      let query;
      let queryUp;
      let queryQs;
      if (answers.updatePrompt === "Role") {
        queryUp = "role_id";
        query = "SELECT id FROM roles WHERE ?";
        queryQs = [{ title: answers.updateInfo }];
      } else if (answers.updatePrompt === "Manager") {
        let manSplit = answers.updateInfo;
        let manArray = manSplit.split(" ");
        queryUp = "manager_id";
        query = "SELECT id FROM employees WHERE ? AND ?";
        queryQs = [{ first_name: manArray[0] }, { last_name: manArray[1] }];
      }
      connection.query(query, queryQs, function (err, upID) {
        if (err) throw err;
        if (answers.updatePrompt === "Role") {
          queryArray = [
            { role_id: upID[0].id },
            { first_name: empArray[0] },
            { last_name: empArray[1] },
          ];
        } else if (answers.updatePrompt === "Manager") {
          queryArray = [
            { manager_id: upID[0].id },
            { first_name: empArray[0] },
            { last_name: empArray[1] },
          ];
        }
        connection.query(
          "UPDATE employees SET ? WHERE ? AND ?",
          queryArray,
          function (err, res) {
            if (err) throw err;
            console.log(
              "The " +
                answers.updatePrompt +
                " of " +
                splitter +
                " has been updated to " +
                answers.updateInfo
            );
            setTimeout(() => {
              console.clear();
              init.initPrompt();
            }, 3000);
          }
        );
      });
    });
}

function upEmpMan() {}

module.exports.upEmpRole = upEmpRole;
module.exports.upEmpMan = upEmpMan;
