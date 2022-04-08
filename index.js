const db = require("./db");
const { prompt } = require("inquirer");

init()

function init() {
    console.log("Welcome to your employee tracker!")
    mainMenu()
}

function mainMenu(){
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View All Employees", "View Employee by Department", "View All Departments"]
        }
    ]).then(response => {
        let userChoice = response.choice;

        switch(userChoice){
            case "View All Employees":
                viewEmployees()
                break;
            case "View Employee by Department":
                // viewEmpDepartment()
                break;
            default:
                // quit();
        }
    })
}

function viewEmployees(){
    db.findAllEmployees()
    .then(([rows])=> {
        let employees = rows;
        console.table(employees)
    })
    .then(()=> mainMenu())
}

