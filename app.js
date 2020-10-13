
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");


//array where everyone is stored
const folks = [];

//function asks the questions
//to do: re-order and ask manager and them for employee info
function askQuestions() {
    inquirer
    .prompt([{
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "number",
        message: "What is your ID?",
        name: "id",
    }, {
        type: "input",
        message: "What is your email address?",
        name: "email",
    },
    {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"]
    }
    // roles
]).then(
    function({ name, id, email, role }) {
        if ( role == "Engineer"){ 
            inquirer
                .prompt({
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "github"
                    }).then( function({github}) {
                        const eng = new Engineer(name, id, email, role, github);
                        folks.push(eng);
                        console.log(folks);
                        doneYet();
                    })

        } else if ( role == "Intern"){ inquirer
            .prompt({
                type: "input",
                message: "What school do you attend?",
                name: "school"
                
            }).then( function({school}) {
                const intern = new Intern(name, id, email, role, school);
                folks.push(intern);
                console.log(folks);
                doneYet();
            })


        } else if (role == "Manager") {
            inquirer
            .prompt({
                type: "input",
                message: "What is your Office Number?",
                name: "officeNumber"
            }).then( function({officeNumber}) {
               const manager = new Manager(name, id, email, role, officeNumber);
                folks.push(manager);
                console.log(folks);
                doneYet();
            })
        }
    })};


askQuestions();


function doneYet(){
    inquirer
    .prompt([{
        type: "list",
        message: "Would you like to add more employees?",
        choices: ["Yes", "No"],
        name: "moreFolks",
    }]).then(
        function({moreFolks}) {
            if ( moreFolks == "Yes"){ 
                askQuestions();
            }else{ const results = render(folks);
                     fs.writeFile("./output/team.html", results, function(err) { 
                             if(err) throw err;
                          });console.log("Successfully wrote html");
                    
                    }
        })}

