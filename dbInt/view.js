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

function viewDep() {}
function viewRole() {}
function viewEmp() {}

module.exports.viewDep = viewDep;
module.exports.viewRole = viewRole;
module.exports.viewEmp = viewEmp;
