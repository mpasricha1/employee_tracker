const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost", 
	user: "root", 
	password: "root", 
	database: "employee_db"
}); 

class Database{
	constructor(){
		connection.connect(function(err){
			if(err) throw err;
			console.log("Connected to database")
		})
	}
	addDepartment(deptName){
		let query = connection.query(
			"INSERT INTO department SET ?", 
			{
				name: deptName
			},
			function(err, res){
				if (err) throw err; 
				console.log("1 Record Inserted Into Departments");
				connection.end()
 			}
 		)
	}
	addRole(role){
		let query = connection.query(
			"INSERT INTO role SET ?", 
			{
				title: role.title,
				salary: role.salary, 
				department_id: role.dept
			},
			function(err, res){
				if (err) throw err; 
				console.log("1 Record Inserted Into Roles");
				connection.end()
 			}
 		)
	}
	addEmployee(employee){
		let query = connection.query(
				"INSERT INTO employee SET ?", 
				{
					first_name: employee.first_name, 
					last_name: employee.last_name, 
					role_id: employee.role, 
					manager_id: employee.manager
				}, 
				function(err, res){
					if (err) throw err; 
					console.log("1 Record Inserted Into Employee");
					connection.end()
 			}
		)
	}
	getDeptByName(deptName, callback){
		let query = connection.query(
			"SELECT d.id FROM department d WHERE ?",
			{
				name: deptName
			}, 
			function(err, res){
				if (err) throw err; 
				return callback(res[0].id);
			}
		)
	}
	getRoleByName(role, callback){
		let query = connection.query(
			"SELECT r.id FROM role r WHERE ?",
			{
				title: role
			}, 
			function(err, res){
				if (err) throw err; 
				if(res.length){
					return callback(res[0].id);
				}else{
					return callback(null);
				}
			}
		)
	}
	getEmployeeByName(employee, callback){
		let query = connection.query(
			"SELECT e.id FROM employee e WHERE first_name = ? AND last_name = ?",
			[
				employee[0], 
				employee[1]
			]
			, 
			function(err, res){
				if (err) throw err; 
				if(res.length){
					return callback(res[0].id);
				}else{
					return callback(null);
				}
				
			}
		)
	}
};

module.exports = new Database(); 

