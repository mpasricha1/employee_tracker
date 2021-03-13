const mysql = require("mysql");
const screenMessages = require("../utils/screenMessages.js"); 
const connection = require("./connection.js")

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
				// console.log(`1 Record Inserted Into ${table}`);
				screenMessages.confirmChange();
 			}
 		)
	}
	updateAValue(table, fields){
		let query = connection.query(
			"UPDATE ?? SET ?? = ? WHERE id = ?",[table, Object.keys(fields)[1], Object.values(fields)[1], fields.id],
			function(err, res){
				if (err) throw err;
				screenMessages.confirmChange();
			}
		)
	}
	deleteAValue(table, field){
		let query = connection.query(
			"DELETE FROM ?? WHERE id = ?", [table, field],
			function(err, res){
				if (err) throw err;
				screenMessages.confirmChange();
			}
		);
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
	getAllInfo(field1, field2, table, callback){
		let query = connection.query(
			`SELECT DISTINCT ??, ?? FROM ??`, [field1, field2,table],
			function(err, res){
				if (err) throw err; 
				return callback(res);
			})
	}
	getTotalUtilizedSalary(callback){
		let query = connection.query(
			`SELECT d.name as Department, 
	   				SUM(r.salary) as 'Total Utilized Budget'
			FROM employee e 
			INNER JOIN role r ON r.id = e.role_id
			INNER JOIN department d on d.id = r.department_id
			GROUP BY d.name`, 
			function(err, res){
				if(err) throw err; 
				return callback(res);
 			}
			)
	}
	exit(){
		connection.end();
	}
};

module.exports = new Database(); 

