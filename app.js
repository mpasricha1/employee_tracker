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
					screenMessages.printAll("Employee", result)
				});
				break;
			case("view all employees by department"):
				database.getAllDepartments( async (result) =>{
					let deptArr = []; 
					result.forEach(r => deptArr.push(r.name))
					let dept = await screenPrompts.generateSelectList(deptArr, "department", "Search Employee's for Which department: ")

					database.getAllEmployeesFiltered("d\.name", dept.department, (result) =>{
						screenMessages.printAll("Department", result);
					}) 
				});
				break;
			case("view all employees by role"):
				database.getAllRoles( async (result) =>{
					let roleArr = []; 
					result.forEach(r => roleArr.push(r.title))
					let role = await screenPrompts.generateSelectList(roleArr, "title", "Search Employee's for Which Role: ")
					console.log(role)
					database.getAllEmployeesFiltered("r.title", role.title, (result) =>{
						screenMessages.printAll("Role", result);
					}) 
				});
				break;
			case("view all employees by manager"):
				database.getAllRoles( async (result) =>{
					let roleArr = []; 
					result.forEach(r => roleArr.push(r.title))
					let role = await screenPrompts.generateSelectList(roleArr, "title", "Search Employee's for Which Role: ")
					console.log(role)
					database.getAllEmployeesFiltered("r.title", role.title, (result) =>{
						screenMessages.printAll("Role", result);
					}) 
				});
				break;
			case("update employee role"):
				database.getAllEmployees( async (result) =>{
					database.getAllRoles( async (result2) =>{
						let empArr = [];
						let roleArr = [];

						result.forEach(r => empArr.push(r.full_name))
						result2.forEach(r => roleArr.push(r.title))

						let emp = await screenPrompts.generateSelectList(empArr, "name", "Select an employee to update their role: ");
						let role = await screenPrompts.generateSelectList(roleArr, "name", "Select a new role: ");
						
						emp = result.filter(r => r.full_name === emp.name);
						role = result2.filter(r => r.title === role.name);

						emp[0].role_id = role[0].id;
						delete emp[0]["manager_id"]; 

						database.updateAValue("employee",emp[0]);
					});
				});
				break;
			case("update employee manager"):

				database.getAllEmployees( async (result) =>{
					let empArr = []; 
					
					result.forEach(r => empArr.push(r.full_name))

					let emp = await screenPrompts.generateSelectList(empArr, "name", "Select an employee to update their manager: ");
					let man = await screenPrompts.generateSelectList(empArr, "name", "Select a new manager: ");
					
					emp = result.filter(r => r.full_name === emp.name);
					man = result.filter(r => r.full_name === man.name);

					emp[0].manager_id = man[0].id;

					database.updateAValue("employee",emp[0]);

				});
				break;
			case("delete employee"):
				database.getAllEmployees( async (result) =>{
					let empArr = []; 
					result.forEach(r => empArr.push(r.full_name))
					
					let emp = await screenPrompts.generateSelectList(empArr, "name", "Select an employee to delete: ")
					emp = result.filter(r => r.full_name === emp.name)

					database.deleteAValue("employee", emp[0].id);

				});
				break;
			case("delete a role"):
				database.getAllRoles( async (result) =>{
					let roleArr = []; 
					result.forEach(r => roleArr.push(r.title))

					let role = await screenPrompts.generateSelectList(roleArr, "role", "Select a role to delete: ")
					role = result.filter(r => r.title === role.role)

					database.deleteAValue("role", role[0].id);
				});
				break;
			case("delete a department"):
				database.getAllDepartments( async (result) =>{
					let deptArr = []; 
					result.forEach(r => deptArr.push(r.name))

					let dept = await screenPrompts.generateSelectList(deptArr, "dept", "Select a department to delete: ")
					dept = result.filter(r => r.name === dept.dept)

					database.deleteAValue("department", dept[0].id);
				});
		}


	}catch(err){
		console.log(err)
	}
}

init();