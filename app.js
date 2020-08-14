const inquirer = require("inquirer");
const fs = require("fs");
const view = require("./dbInt/view");
const add = require("./dbInt/add");
const update = require("./dbInt/update");

function initPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initialPrompt",
        message: "What would you like to do?",
        choices: ["Add a record", "View a record", "Update a record", "Exit"],
      },
    ])
    .then((data) => {
      if (data === "Add a record") {
        console.clear();
        addPrompt();
      } else if (data === "View a record") {
        console.clear();
        viewPrompt();
      } else if (data === "Update a record") {
        console.clear();
        updatePrompt();
      } else if (data === "Exit") {
        console.log("Exiting now");
        setTimeout(() => console.clear), 3000;
      }
    });
}
initPrompt();
function addPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addPrompt",
        message: "What would you like to add?",
        choices: ["Add a department", "Add a role", "Add an employee"],
      },
    ])
    .then((data) => {
      if (data === "Add a department") {
        addDep();
      } else if (data === "Add a role") {
        addRole();
      } else if (data === "Add an employee") {
        addEmp();
      }
    });
}
function viewPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addPrompt",
        message: "What would you like to view?",
        choices: ["View a department", "View a role", "View an employee"],
      },
    ])
    .then((data) => {
      if (data === "View a department") {
        viewDep();
      } else if (data === "View a role") {
        viewRole();
      } else if (data === "View an employee") {
        viewEmp();
      }
    });
}
function updatePrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addPrompt",
        message: "What would you like to Update?",
        choices: ["Update a department", "Update a role", "Update an employee"],
      },
    ])
    .then((data) => {
      if (data === "Update a department") {
        updateDep();
      } else if (data === "Update a role") {
        updateRole();
      } else if (data === "Update an employee") {
        updateEmp();
      }
    });
}
