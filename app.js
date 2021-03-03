const screenMessages = require("./screenMessages"); 
const screenPrompts = require("./screenPrompts"); 
const database = require("./Database"); 


async function init(){
	try{
	 	let choice = await screenPrompts.selectAnOptionPrompt();

		switch(choice.choice){
			case("Add A Department"):
				let department = await screenPrompts.addDepartmentPrompt();
				database.addDepartment(department.department);
			case("Add A Role"):
				let role = await screenPrompts.addRolePrompt(); 
				database.getDeptByName(role.dept, (result) =>{
					role.dept = result; 
					database.addRole(role);
				});
			case("Add An Employee"):
				let employee = await screenPrompts.addEmployeePrompt()
				let manName = employee.manager.split(" "); 
				database.getRoleByName(employee.role, (result) => {
					employee.role = result; 

					database.getEmployeeByName(manName, (result) =>{
						employee.manager = result;
						console.log(employee)
						database.addEmployee(employee);
					});
				});
				
				console.log(employee);
		}
	}catch(err){
		console.log(err)
	}
}

init();