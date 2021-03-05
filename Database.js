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
	insertNewRecord(table, fields,){
		let query = connection.query(
			"INSERT INTO ?? (??) VALUES (?)",[table, Object.keys(fields), Object.values(fields)],
			function(err, res){
				if (err) throw err; 
				console.log(`1 Record Inserted Into ${table}`);
 			}
 		)
	}
	getId(table, field, callback){
		let query = connection.query(
			"SELECT id FROM ?? WHERE ?",[table,field],
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
			`SELECT CONCAT(e.first_name, ' ',e.last_name) AS full name,
				    d.name AS dept name,
				    r.title, 
				    r.salary,
				    (SELECT CONCAT(e2.first_name, ' ',e2.last_name) 
				     FROM employee e2 
				     WHERE e.manager_id = e2.id) as manager name
			 FROM employee e
			 INNER JOIN role r ON r.id = e.role_id 
			 INNER JOIN department d ON d.id = r.department_id`,
			function(err, res){
				if (err) throw err; 
				return callback(res);

			})
		};
	getAllDepartments(callback){
		let query = connection.query(
			`SELECT d.name as "Department Name" FROM department d`,
			function(err, res){
				if (err) throw err; 
				return callback(res);
			})
	}
	getAllRoles(callback){
		let query = connection.query(
			`SELECT r.title, r.salary, d.name as "department Name" FROM role r 
				INNER JOIN department d on d.id = r.department_id`, 
			function(err, res){
				if(err) throw err; 
				return callback(res);
			}
		)
	}
	updateEmployeeRole(table, fields, callback){
		let query = connection.query(
			"UPDATE ?? SET role_id = ? WHERE id = ?",[table, fields.role_id, fields.id],
			function(err, res){
				if (err) throw err;
				console.log(`1 Record Updated In ${table}`);
			}
		)
		console.log(query.sql);
	}
	updateEmployeeManager(table, fields, callback){
		console.log("In Function")
		let query = connection.query(
			"UPDATE ?? SET manager_id = ? WHERE id = ?",[table, fields.manager_id, fields.id],
			function(err, res){
				if (err) throw err;
				console.log(`1 Record Updated In ${table}`);
			}
		)
		console.log(query.sql);
	}

};

module.exports = new Database(); 

