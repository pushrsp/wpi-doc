const inquirer = require("inquirer");

const { execJob } = require("./main");

const questions = [
  {
    type: "list",
    name: "job",
    message: "Please choose what you want",
    choices: ["Parse wpi-doc", "Delete all comments"],
  },
  {
    type: "confirm",
    name: "check",
    message: "Are you sure?",
    default: false,
  },
];

module.exports.cli = async function () {
  const answer = await inquirer.prompt([
    ...questions,
    {
      type: "input",
      name: "fileName",
      message: "Please type filename(*.json): ",
      default: "wpi-doc",
      when: (answers) => questions[0].choices.indexOf(answers.job) === 0 && answers.check,
    },
  ]);

  await execJob(answer);
};
