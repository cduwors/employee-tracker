const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

// Function call to initialize app
init();

//function to initialize app
function init() {
	mainMenu();
	console.log("init function");
}
//main menu questions
const mainMenu = () => {
	prompt({
		type: "list",
		name: "mainMenu",
		message: "What would you like to do?",
		choices: [
			"View All Employees",
			"Add Employee",
			"Update Employee Role",
			"View All Roles",
			"Add Role",
			"View All Departments",
			"Add Department",
			"Quit",
		],
	}).then(function ({ db }) {
		switch (db) {
			case "View All Employees":
				viewEmployees();
				break;
			case "View All Roles":
				viewRoles();
				break;
			case "View All Departments":
				viewDepartments();
				break;
			case "Add Employee":
				addEmp();
				break;
			case "Update Employee Role":
				updateEmpRole();
				break;

			case "Add Role":
				addRole();
				break;
			case "View All Departments":
				viewDepartments();
				break;
			case "Add Department":
				addDeparment();
				break;
			default:
				quit();
		}
	});
};
//FIND ALL...
//view employee table
function viewEmployees() {
	db.findAllEmployees()
		.then(([rows]) => {
			let employees = rows;
			console.table(employees);
		})
		.then(() => mainMenu());
}

//view all roles
function viewRoles() {
	db.findAllRoles()
		.then(([rows]) => {
			let roles = rows;
			console.table(roles);
		})
		.then(() => mainMenu());
}

//view all departments
function viewDepartments() {
	db.findAllDepartments()
		.then(([rows]) => {
			let departments = rows;
			console.table(departments);
		})
		.then(() => mainMenu());
}
//ADD TO...
//add role, salary, role department
function addRole() {
	db.findAllDepartments().then(([rows]) => {
		let departments = rows;
		const departmentChoices = departments.map(({ id, name }) => ({
			name: name,
			value: id,
		}));
		prompt([
			{
				name: "title",
				message: "What is the name of the role?",
			},
			{
				name: "salary",
				message: "What is the salary of the role?",
			},
			{
				type: "list",
				name: "department_id",
				message: "What department does the role belong to?",
				choices: departmentChoices,
			},
		]).then((role) => {
			db.createRole(role)
				.then(() => console.log(`Added ${role.title} to the database.`))
				.then(() => mainMenu());
		});
	});
}

function addDepartment
// 		//add department
// 		{
// 			type: "input",
// 			name: "addDepartment",
// 			message: "What is the name of the department? (Required)",
// 			validate: (addDepartmentInput) => {
// 				if (addDepartmentInput) {
// 					console.log("Service added to the database");
// 					return true;
// 				} else {
// 					console.log("Please enter your department name");
// 					return false;
// 				}
// 			},
// 		},
// 		//add Employee,
// 		{
// 			type: "input",
// 			name: "addFirstName",
// 			message: "What is the Employee's FIRST name? (Required)",
// 			validate: (addFirstName) => {
// 				if (addFirstName) {
// 					return true;
// 				} else {
// 					console.log("Please enter the Employee's FIRST name");
// 					return false;
// 				}
// 			},
// 		},
// 		{
// 			type: "input",
// 			name: "addLastName",
// 			message: "What is the Employee's LAST name? (Required)",
// 			validate: (addLastName) => {
// 				if (addLastName) {
// 					return true;
// 				} else {
// 					console.log("Please enter the Employee's LAST name");
// 					return false;
// 				}
// 			},
// 		},
// 		{
// 			type: "list",
// 			name: "newEmployeeRole",
// 			message: "What is the Employee's role?",
// 			choices: [
// 				//needs to be a fluid array from table
// 				"Sales Lead",
// 				"Lead Engineer",
// 				"etc",
// 			],
// 		},
// 		{
// 			type: "list",
// 			name: "newEmployeeMgr",
// 			message: "Who is the Employee's manager?",
// 			choices: [
// 				"None",
// 				//needs to be a fluid array from table
// 				"John Doe",
// 				"etc",
// 			],
// 		},
// 		//needs a console log "Added ${employee name} to the database"

// 		//Update Employee Role
// 		{
// 			type: "list",
// 			name: "updateEmployeeRole",
// 			message: "Which Employee's role do you want to update?",
// 			choices: [
// 				//needs to be a fluid array from table
// 				"John Doe",
// 				"etc",
// 			],
// 		},
// 		{
// 			type: "list",
// 			name: "chooseNewRole",
// 			message: "Which role do you want assigned to the selected employee?",
// 			choices: [
// 				//needs to be a fluid array from table
// 				"Sales Lead",
// 				"etc",
// 			],
// 		},
