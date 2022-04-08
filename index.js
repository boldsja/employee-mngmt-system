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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Done"]
        }
    ]).then(response => {
        let userChoice = response.choice;

        switch(userChoice){
            case "View All Departments":
                viewDepartments()
                break;
            case "View All Roles":
                //viewRoles    
                break;
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
//function to view all Employees
function viewEmployees(){
    db.findAllEmployees()
    .then(([rows])=> {
        let employees = rows;
        console.table(employees)
    })
    .then(()=> mainMenu())
}
//function to view all departments
function viewDepartments(){
    db.findAllDepartments()
    .then(([rows])=> {
        let departments = rows;
        console.table(departments)
    })
    .then(()=> mainMenu())
}
