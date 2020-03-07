const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRenderer")
const employees = [];

const empChoice = [
    empType = {
        choices: ["Engineer", "Intern", "Done Adding Employees"],
        type: "list",
        message: "Would you like to add an Engineer or Intern?",
        name: "emp"
    }
]

const manChoice = [
    name = {
        type: "input",
        message: "What is the Managers name?",
        name: "manName"
    },
    id = {
        type: "input",
        message: "What is the Managers Id?",
        name: "manId",
    },
    email = {
        type: "input",
        message: "What is the Managers email?",
        name: "manEmail"
    },
    officeNumber = {
        type: "input",
        message: "What is the Manager's Office Number?",
        name: "manOffice"
    }
]

const engChoice = [
    name = {
        type: "input",
        message: "What is the Engineer's name?",
        name: "engName"
    },
    id = {
        type: "input",
        message: "What is the Engineer's Id?",
        name: "engId",
    },
    email = {
        type: "input",
        message: "What is the Engineer's email?",
        name: "engEmail"
    },
    gitHub = {
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "engGit"
    }
]

const intChoice = [
    name = {
        type: "input",
        message: "What is the Intern's name?",
        name: "intName"
    },
    id = {
        type: "input",
        message: "What is the Intern's Id?",
        name: "intId",
    },
    email = {
        type: "input",
        message: "What is the Intern's email?",
        name: "intEmail"
    },
    school = {
        type: "input",
        message: "What school did the Intern attend?",
        name: "intSchool"
    }
]

function init() {
    makeManager();
}

function makeManager() {
    inquirer
        .prompt(manChoice)
        .then(function (response) {
            const manager = new Manager(
                response.manName,
                response.manId,
                response.manEmail,
                response.manOffice
            )
            employees.push(manager);
            makeEmployee();
        });

}

function makeEmployee() {
    inquirer
        .prompt(empChoice)
        .then(val => {
            // If the user says yes to another game, play again, otherwise quit the game
            if (val.emp === "Engineer") {
                makeEngineer();
            } else if (val.emp === "Intern") {
                makeIntern();
            } else {
                finishTeam();
            }
        });
}

function makeEngineer() {
    inquirer
        .prompt(engChoice)
        .then(function (response) {
            const engineer = new Engineer(
                response.engName,
                response.engId,
                response.engEmail,
                response.engGit
            )
            employees.push(engineer);
            makeEmployee();
        });
}

function makeIntern() {
    inquirer
        .prompt(intChoice)
        .then(function (response) {
            const intern = new Intern(
                response.intName,
                response.intId,
                response.intEmail,
                response.intSchool
            )
            employees.push(intern);
            makeEmployee();
        });
}

function finishTeam() {
    const team = render(employees);
    fs.writeFile(outputPath, team, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```