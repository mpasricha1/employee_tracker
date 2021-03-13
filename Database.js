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
	insertNewRecord(table, fields){
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
			`SELECT e.id, 
					(SELECT e2.id 
				     FROM employee e2 
				     WHERE e.manager_id = e2.id) as 'manager_id',
				    r.id as role_id,
				    CONCAT(e.first_name, ' ',e.last_name) AS 'full_name',
				    d.name AS 'dept_name',
				    r.title, 
				    r.salary,
				    (SELECT CONCAT(e2.first_name, ' ',e2.last_name) 
				     FROM employee e2 
				     WHERE e.manager_id = e2.id) as 'manager_name'    
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
			`SELECT DISTINCT d.id, d.name FROM department d`,
			function(err, res){
				if (err) throw err; 
				return callback(res);
			})
	}
	getAllRoles(callback){
		let query = connection.query(
			`SELECT DISTINCT r.id, r.title FROM role r`, 
			function(err, res){
				if(err) throw err; 
				return callback(res);
			}
		)
	}
	updateAValue(table, fields, callback){
		let query = connection.query(
			"UPDATE ?? SET ?? = ? WHERE id = ?",[table, Object.keys(fields)[1], Object.values(fields)[1], fields.id],
			function(err, res){
				if (err) throw err;
				console.log(`1 Record Updated In ${table}`);
			}
		)
		console.log
	}
	deleteAValue(table, field, callback){
		let query = connection.query(
			"DELETE FROM ?? WHERE id = ?", [table, field],
			function(err, res){
				if (err) throw err; 
				console.log(`1 Record Updated In ${table}`);
			});

		console.log(query.sql)
	}
	
};

module.exports = new Database(); 

