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
	insert(table, fields,){
		let query = connection.query(
			"INSERT INTO ?? (??) VALUES (?)",[table, Object.keys(fields), Object.values(fields)],
			function(err, res){
				if (err) throw err; 
				console.log(`1 Record Inserted Into ${table}`);
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
				console.log(res)
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
			], 
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
	getAllEmployees(callback){
		let query = connection.query(
			`SELECT CONCAT(e.first_name, " ",e.last_name) AS full_name,
				    d.name AS dept_name,
				    r.title, 
				    r.salary,
				    (SELECT e.first_name + e.last_name 
				     FROM employee e2 
				     WHERE e.manager_id = e2.id) as manager_name
			 FROM employee e
			 INNER JOIN role r ON r.id = e.role_id 
			 INNER JOIN department d ON d.id = r.department_id`,
			function(err, res){
				if (err) throw err; 
				return callback(res);

			}
		)
	}
};

module.exports = new Database(); 

