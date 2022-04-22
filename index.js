const db = require("./db");
const { prompt } = require("inquirer");
const inquirer = require("inquirer");


init()

function init() {
    console.log("Welcome to your employee tracker!")
    mainMenu()
}

function mainMenu() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Quit"]
        }
    ]).then(response => {
        let userChoice = response.choice;

        switch (userChoice) {
            case "View All Departments":
                viewDepartments()
                break;
            case "View All Roles":
                viewRoles()
                break;
            case "View All Employees":
                viewEmployees()
                break;
            case "View Employee by Department":
                // viewEmpDepartment()
                break;
            case "Add a Department":
                addDepartment()
                break;
            case "Add an Employee":
                addEmployee()
                break;
            case "Add a Role":
                addRole()
                break;
            case "Update Employee Role":
                updateRole()
                break;
            case "Quit":
                process.exit()
                break;
            //quit();
        }
    })
}
//function to view all Employees
function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees)
        })
        .then(() => mainMenu())
}

//function to view all departments
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments)
        })
        .then(() => mainMenu())
}

function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles)
        })
        .then(() => mainMenu())
}

function addDepartment() {
    prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
        }
    ])
        .then(response => {
            let name = response;
            console.log("name of department being added", name.name)
            db.createDepartment(name)
                .then(() => console.log(`You added ${name} to the database!`))
                .then(() => mainMenu())
        })
}

function addRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "What department will this role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`You added ${role.title} to the database!`))
                        .then(() => mainMenu())
                })
        })
}

function addEmployee() {
    prompt([
        {
            name: "firstName",
            message: "What is the employee's first name"
        },
        {
            name: "lastName",
            message: "What is the employee's last name?"
        },
    ])
        .then(answer => {
            let firstName = answer.firstName
            let lastName = answer.lastName
            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const rolesChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt(
                        {
                            type: "list",
                            name: "roleID",
                            message: "What is employee's role?",
                            choices: rolesChoices
                        }
                    ).then(answer => {
                        let roleId = answer.roleID;

                        let employee = {
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }

                        db.addEmployee(employee)

                    })
                        .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
                        .then(() => mainMenu())
                })
        })

}

function updateRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeesChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            inquirer.prompt(
                {
                    type: "list",
                    name: "employeeID",
                    message: "Which employee's role do you want to update?",
                    choices: employeesChoices
                }
            )
                .then(answer => {
                    let employeeId = answer.employeeID

                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const rolesChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));
                            inquirer.prompt(
                                {
                                    type: "list",
                                    name: "roleID",
                                    message: "Which role do you want to assign to the selected employee?",
                                    choices: rolesChoices
                                }
                            ).then(answer => {
                                let role_id = answer.roleID;

                                db.updateEmployeeRole(employeeId, role_id)
                                mainMenu()
                            })

                        })
                })
        })
    }
    
