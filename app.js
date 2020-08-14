const inquirer = require("inquirer");
const fs = require("fs");
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
function addPrompt() {}
function viewPrompt() {}
function updatePrompt() {}
