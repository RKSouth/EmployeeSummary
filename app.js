
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");


//array where everyone is stored
const folks = [];
bossFacts();
function bossFacts() {
    inquirer
        .prompt([{
            type: "input",
            message: "What is your name?",
            name: "name",
            validate: async (input) => {
                if (input == "") {
                    return "Please enter your name.";
                }
                return true;
            }
        }, {
            type: "number",
            message: "What is your ID?",
            name: "id",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
        }, {
            type: "input",
            message: "What is your email address?",
            name: "email",
        }, {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
        }
        ]).then(function ({ name, id, email, officeNumber }) {
            var role = "Manager";
            const manager = new Manager(name, id, email, officeNumber);
            folks.push(manager);
            console.log(`You said your name was ${name} and that you are the manager`);
            doneYet();
        })


}

function askQuestions() {
    inquirer
        .prompt([{
            type: "input",
            message: "What is your employee's name?",
            name: "name", 
            validate: async (input) => {
                if (input == "") {
                    return "Please enter a name.";
                }
                return true;
            }
        },
        {
            type: "number",
            message: "What is your employee's ID?",
            name: "id",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
        }, {
            type: "input",
            message: "What is your employee's email address?",
            name: "email",
        },
        {
            type: "list",
            message: "What is your employee's role?",
            name: "role",
            choices: ["Engineer", "Intern"]
        }
            // roles
        ]).then(
            function ({ name, id, email, role }) {
                if (role === "Engineer") {
                    inquirer
                        .prompt({
                            type: "input",
                            message: "What is your GitHub username?",
                            name: "github",
                            validate: async (input) => {
                                if (input == "" || /\s/.test(input)) {
                                    return "Please enter a valid GitHub username";
                                }
                                return true;
                            }

                        }).then(function ({ github }) {

                            const engineer = new Engineer(name, id, email, github);
                            folks.push(engineer);
                            console.log(`Added an Engineer by the name of ${name}, with an employee id of ${id}, an email address of ${email}, and a github of ${github}`);
                            doneYet();
                        })

                } else if (role == "Intern") {
                    inquirer
                        .prompt({
                            type: "input",
                            message: "What school did/does your intern attend?",
                            name: "school",
                            validate: async (input) => {
                                if (input == "") {
                                    return "Please enter a school name.";
                                }
                                return true;
                            }

                        }).then(function ({ school }) {
                            const intern = new Intern(name, id, email, role, school);
                            folks.push(intern);
                            console.log(`Added an Intern by the name of ${name}, with an employee id of ${id}, an email address of ${email}, and that goes/went to ${school}`);
                            doneYet();
                        })


                }
            })
};


//are we done yet??
function doneYet() {
    inquirer
        .prompt([{
            type: "list",
            message: "Would you like to add more employees?",
            choices: ["Yes", "No"],
            name: "moreFolks",
        }]).then(
            function ({ moreFolks }) {
                if (moreFolks == "Yes") {
                    // askQuestions();
                    askQuestions();
                } else {
                    const results = render(folks);
                    fs.writeFile("./output/team.html", results, function (err) {
                        if (err) throw err;
                    }); console.log("Successfully wrote html, now you can open it and see how it looks! (team.html)");

                }
            })
}

