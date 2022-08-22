const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection(
	{
		host: "localhost",
		// Your MySQL username,
		user: "root",
		// Your MySQL password
		password: "Perdemco2833!",
		database: "employees_db",
	},
	console.log("Connected to the employees_db database.")
);

connection.connect(function (err) {
	if (err) throw err;
});

module.exports = connection;
