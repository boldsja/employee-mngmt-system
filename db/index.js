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
}

module.exports = new DB(connection);