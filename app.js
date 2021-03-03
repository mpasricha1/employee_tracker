const screenMessages = require("./screenMessages"); 
const screenPrompts = require("./screenPrompts"); 
const database = require("./Database"); 


async function init(){
	try{
	 	let choice = await screenPrompts.selectAnOptionPrompt();

		switch(choice.choice.toLowerCase()){
			case("add a department"):
				let department = await screenPrompts.addDepartmentPrompt();
				database.insertnewRecord("department", department)
				break;
			case("add a role"):
				let role = await screenPrompts.addRolePrompt(); 
				database.getId("department", {"name":role.department_id}, (result) =>{
					role.department_id = result; 
					database.insertNewRecord("role", role)
				});
				break;
			case("add an employee"):
				let employee = await screenPrompts.addEmployeePrompt();
				let manName = employee.manager_id ? employee.manager_id.split(" ") : [null, null]; 

				database.getId("role", {"title":employee.role_id}, (result) => {
					employee.role_id = result; 

					database.getEmployeeByName(manName, (result) =>{
						employee.manager_id = result;
						database.insertNewRecord("employee",employee);
					});
				});
				break;
			case("view all employees"):
				database.getAllEmployees((result) =>{
					screenMessages.printAllEmployees(result)
				})

		}
	}catch(err){
		console.log(err)
	}
}

init();