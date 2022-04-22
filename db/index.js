const connection = require("./connection");


class DB {
    constructor(connection){
        this.connection = connection;
    }

    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT * FROM employee"
        )
    }

    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    }

    findAllRoles(){
        return this.connection.promise().query(
            "SELECT * FROM roles"
        )
    }

    createDepartment(department){
        console.log("department being added on our query", department)
        return this.connection.promise().query("INSERT INTO department SET ?", department)
    }

    createRole(role){
        return this.connection.promise().query("INSERT INTO roles SET ?", role)
    }

    addEmployee(employee){
        console.log("Employee being added")
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }

    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query(
            "UPDATE employee SET role_id=? WHERE id=?",[roleId, employeeId]
        )
    }
}



module.exports = new DB(connection);