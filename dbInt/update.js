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
// TODO add update functionality
function upEmpRole(emps, ro) {
  let empChoi = [];
  for (let i = 0; i < emps.length; i++) {
    empChoi.push(emps[i].first_name + " " + emps[i].last_name);
  }
  let roChoi = [];
  for (let i = 0; i < ro.length; i++) {
    roChoi.push(ro[i].title);
  }
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
        choices: ["Role"],
      },
      {
        type: "list",
        name: "updateInfo",
        message: "Please select new role:",
        choices: roChoi,
        when: (answers) => (answers.updatePrompt = "Role"),
      },
    ])
    .then((answers) => {
      let splitter = answers.empPrompt;
      let empArray = splitter.split(" ");
      let queryChoi;
      let query;
      if (answers.updatePrompt === "Role") {
        queryUp = "role_id";
        query = "SELECT id FROM roles WHERE ?";
      }
      connection.query(query, [{ title: answers.updateInfo }], function (
        err,
        upID
      ) {
        if (err) throw err;
        if (answers.updatePrompt === "Role") {
          queryArray = [
            { role_id: upID[0].id },
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
                " has been updated."
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
