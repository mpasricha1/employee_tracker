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
	addADepartment(deptName){
		let query = connection.query(
			"INSERT INTO department(name) VALUES(?)", 
			{
				name: deptName
			},
			function(err, res){
				if (err) throw err; 
				console.log("1 Record Inserted Into Departments");
 			}
 		)
	}
};

module.exports = new Database(); 

