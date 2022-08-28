const { prompt } = require("inquirer");
const db = require("./db/index.js");
require("console.table");

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
	}).then(function (userInput) {
		switch (userInput.mainMenu) {
			case "View All Employees":
				viewEmployees();
				break;
			case "View All Roles":
				viewRoles();
				break;
			case "View All Departments":
				viewDepartments();
				break;
			case "Add Role":
				addRole();
				break;
			case "Add Department":
				addDepartment();
				break;
			case "Add Employee":
				addEmployee();
				break;
			case "Update Employee Role":
				updateEmployeeRole();
				break;
			default:
				quit();
		}
	});
};

function quit() {
	console.log("bye");
	process.exit();
}

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
//add ROLE with salary and role department
function addRole() {
	db.findAllDepartments().then(([rows]) => {
		let departments = rows;
		const departmentChoices = departments.map(({ id, Departments }) => ({
			name: Departments,
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
//add department
function addDepartment() {
	prompt([
		{
			name: "name",
			message: "What is the name of the new department?",
		},
	]).then((department) => {
		db.createDepartment(department)
			.then(() => console.log(`Added ${department.name} to the database.`))
			.then(() => mainMenu());
	});
}

function addEmployee() {
	prompt([
		{
			name: "first_name",
			message: "What is the Employee's first name?",
		},
		{
			name: "last_name",
			message: "What is the Employee's last name?",
		},
	]).then((res) => {
		let firstName = res.first_name;
		let lastName = res.last_name;

		db.findAllRoles().then(([rows]) => {
			let roles = rows;
			// console.log(roles)
			const roleChoices = roles.map(({ id, Roles }) => ({
				name: Roles,
				value: id,
			}));

			prompt({
				type: "list",
				name: "roleId",
				message: "What is the Employee's job title?",
				choices: roleChoices,
			}).then((res) => {
				let roleId = res.roleId;

				db.findAllEmployees().then(([rows]) => {
					let manager = rows;
					const managerChoices = manager.map(
						({ id, first_name, last_name }) => ({
							name: first_name + " " + last_name,
							value: id,
						})
					);

					prompt({
						type: "list",
						name: "manager_id",
						message: "Who is the Employee's Manager?",
						choices: managerChoices,
					}).then((res) => {
						let employee = {
							manager_id: res.manager_id,
							role_id: roleId,
							first_name: firstName,
							last_name: lastName,
						};

						db.createEmployee(employee)
							.then(() =>
								console.log(
									`Added ${
										employee.first_name + " " + employee.last_name
									}  to the database.`
								)
							)
							.then(() => mainMenu());
					});
				});
			});
		});
	});

	// db.findAllEmployees().then(([rows]) => {
	// 	let role = rows;
	// 	// console.log(rows);
	// 	const roleChoices = role.map(({ id, title }) => ({
	// 		name: title,
	// 		value: id,
	// 	}));
	// 	const managerChoices = role.map(({ id, first_name, last_name }) => ({
	// 		name: first_name + " " + last_name,
	// 		value: id,
	// 	}));
	// 	prompt([
	// 		{
	// 			name: "first_name",
	// 			message: "What is the Employee's first name?",
	// 		},
	// 		{
	// 			name: "last_name",
	// 			message: "What is the Employee's last name?",
	// 		},
	// 		{
	// 			type: "list",
	// 			name: "role_id",
	// 			message: "What is the Employee's job title?",
	// 			choices: roleChoices,
	// 		},
	// 		{
	// 			type: "list",
	// 			name: "manager_id",
	// 			message: "Who is the Employee's Manager?",
	// 			choices: managerChoices,
	// 		},
	// .then((employee) => {
	// 	db.createEmployee(employee)
	// 		.then(() =>
	// 			console.log(
	// 				`Added ${
	// 					employee.first_name + " " + employee.last_name
	// 				}  to the database.`
	// 			)
	// 		)
	// 		.then(() => mainMenu());
	// });
}
function updateEmployeeRole() {
	db.findAllEmployees().then(([rows]) => {
		let role = rows;
		const employeeChoices = role.map(({ id, first_name, last_name }) => ({
			name: first_name + " " + last_name,
			value: id,
		}));
		prompt([
			{
				type: "list",
				name: "name",
				message: "Which employee do you need to update?",
				choices: employeeChoices,
			},
		]).then((res) => {
			let nameToUpdate = res.name;

			db.findAllRoles().then(([rows]) => {
				let roles = rows;
				console.log(roles);
				const roleChoices = roles.map(({ id, Roles }) => ({
					name: Roles,
					value: id,
				}));

				prompt({
					type: "list",
					name: "roleId",
					message: "What is the Employee's new role?",
					choices: roleChoices,
				})
					.then((res) => {
						let roleId = res.roleId;
						console.log(roleId);
					})
					.then((nameToUpdate) => {
						db.updateEmployeeRole(nameToUpdate, roleId)
							.then(() => console.log(`Role updated in the database.`))
							.then(() => mainMenu());
					});
			});
		});
	});
}
// Function call to initialize app
init();

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
