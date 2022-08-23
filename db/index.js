const connection = require("./connection");

class DB {
	constructor(connection) {
		this.connection = connection;
	}
    //METHODS TO FIND ALL...
	findAllEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, title, salary, name, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = employee.manager_id;"
			);
	}
	findAllRoles() {
		return this.connection
			.promise()
			.query(
				"SELECT role.id, title AS Roles, department_id AS Department, salary AS Salary FROM role ORDER BY id;"
			);
		//HELP! NEEDS LEFT JOIN TO PUT DEPARTMENT NAME AND NOT #
	}
	findAllDepartments() {
		return this.connection
			.promise()
			.query("SELECT id, name AS Departments FROM department ORDER BY id;");
	}
    // METHODS TO ADD...
	createEmployee(employee) {
		return this.connection
			.promise()
			.query("INSERT INTO employee SET ?", employee);
	}
	createRole(role) {
		return this.connection.promise().query("INSERT INTO role SET ?", role);
	}
	createDepartment(department) {
		return this.connection.promise().query("INSERT INTO department SET ?", department);
	}

    // METHODS TO UPDATE...
	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query("UPDATE employee SET role_id = ? WHERE id = ?", [
				roleId,
				employeeId,
			]);
	}

	//BONUS
	updateEmployeeManager() {
		return this.connection.promise().query("");
	}
	findAllPossibleManagers() {
		return this.connection.promise().query("");
	}
	removeEmployee() {
		return this.connection.promise().query("");
	}
	removeRole() {
		return this.connection.promise().query("");
	}
	removeDepartment() {
		return this.connection.promise().query("");
	}
	viewDepartmentBudgets() {
		return this.connection.promise().query("");
	}
	findAllEmployeesByDepartment() {
		return this.connection.promise().query("");
	}
	findAllEmployeesByManager() {
		return this.connection.promise().query("");
	}
}

module.exports = new DB(connection);
