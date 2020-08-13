const inquirer = require("inquirer");
const fs = require("fs");
function initPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "",
        message: "",
        choices: ["", ""],
      },
      {
        type: "list",
        name: "",
        message: "",
        choices: ["", "", ""],
        when: (answers) => answers.addNew === "",
      },
      {
        type: "input",
        name: "",
        message: "",
        when: (answers) => answers.addNew === "",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "";
        },
      },
    ])
    .then((data) => {});
}
initPrompt();
