const screenMessages = require("./screenMessages"); 
const screenPrompts = require("./screenPrompts"); 
const database = require("./Database"); 
const utils = require("./utils");


async function init(){
	try{
	 	let choice = await screenPrompts.selectAnOptionPrompt();

		switch(choice.choice.toLowerCase()){
			case("add a department"):
				let department = await screenPrompts.addDepartmentPrompt();
				database.insertNewRecord("department", department)
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
				let manName = utils.splitName(employee.manager_id)

				database.getId("role", {"title":employee.role_id}, (result) => {
					employee.role_id = result; 

					database.getEmployeeByName(manName, (result) =>{
						employee.manager_id = result;
						database.insertNewRecord("employee",employee);
					});
				});
				break;
			case("view all employees"):
				database.getAllEmployees( (result) =>{
					screenMessages.printAllEmployees(result)
				});
				break;
			case("update employee role"):
				let updateRole = await screenPrompts.updateEmployeeRolePrompt();
				database.getEmployeeByName(utils.splitName(updateRole.id), (result) =>{
					updateRole.id = result; 

					database.getId("role", {"title": updateRole.role_id}, (result) => {
						updateRole.role_id = result;

						database.updateEmployeeRole("employee",updateRole);
					})

				});
				break;
			case("update employee manager"):
				let updateManager = await screenPrompts.updateEmployeeManagerPrompt();

				database.getEmployeeByName(utils.splitName(updateManager.id), (result) =>{
					updateManager.id = result; 
					database.getEmployeeByName(utils.splitName(updateManager.manager_id), (result) =>{
						updateManager.manager_id = result; 
						database.updateEmployeeManager("employee",updateManager);
					})

				});
		}

		let answer = await screenPrompts.performMorePrompt();

		if(answer.answer.toLowerCase() === 'y' || answer.answer.toLowerCase() === 'yes'){
			init();
		}else{
			return;
		}

	}catch(err){
		console.log(err)
	}
}

init();