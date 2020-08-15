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

function upEmpRole() {}
function upEmpMan() {}

module.exports.upEmpRole = upEmpRole;
module.exports.upEmpMan = upEmpMan;
