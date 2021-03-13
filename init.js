const screenMessages = require("./utils/screenMessages.js"); 
const screenPrompts = require("./utils/screenPrompts.js"); 
const database = require("./db/Database.js"); 
const utils = require("./utils/utils.js");


async function init(){
	try{
	 	let choice = await screenPrompts.selectAnOptionPrompt();

		switch(choice.choice.toLowerCase()){
			case("add a department"):
				let department = await screenPrompts.addDepartmentPrompt();
				database.insertNewRecord("department", department); 
		
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
					screenMessages.printAll("Employee", result, true)
				});
				break;
			case("view employees by department"):
				database.getAllEmployees( async (result) =>{
					database.getAllDepartments( async (result2) =>{
						let deptArr = [];

						result2.forEach(r => deptArr.push(r.name))

						let dept = await screenPrompts.generateSelectList(deptArr, "name", "Search Employee's for Which Role: ")

						dept = result.filter(r => r.dept_name === dept.name)
						console.log(dept)

						screenMessages.printAll("Department", dept, true);
					});
				});
				break;
			case("view employees by role"):
				database.getAllEmployees( async (result) =>{
					database.getAllRoles( async (result2) =>{
						let roleArr = [];

						result2.forEach(r => roleArr.push(r.title))

						let role = await screenPrompts.generateSelectList(roleArr, "name", "Search Employee's for Which Role: ")

						role = result.filter(r => r.title === role.name)

						screenMessages.printAll("Role", role, true);
					});
				});
				break;
			case("view employees by manager"):
				database.getAllEmployees( async (result) =>{
					let empArr = [];

					result.forEach(r => empArr.push(r.full_name))

					let man = await screenPrompts.generateSelectList(empArr, "name", "Search employee's for which manager: ")
					emp = result.filter(r => r.manager_name === man.name);

					screenMessages.printAll("Manager", emp, true);
	
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
			case("delete role"):
				database.getAllRoles( async (result) =>{
					let roleArr = []; 
					result.forEach(r => roleArr.push(r.title))

					let role = await screenPrompts.generateSelectList(roleArr, "role", "Select a role to delete: ")
					role = result.filter(r => r.title === role.role)

					database.deleteAValue("role", role[0].id);
				});
				break;
			case("delete department"):
				database.getAllDepartments( async (result) =>{
					let deptArr = []; 
					result.forEach(r => deptArr.push(r.name))

					let dept = await screenPrompts.generateSelectList(deptArr, "dept", "Select a department to delete: ")
					dept = result.filter(r => r.name === dept.dept)

					database.deleteAValue("department", dept[0].id);
				});
				break;
			case("show total utilized budget by department"):
				database.getTotalUtilizedSalary( (result) =>{
					screenMessages.printAll("Budget", result, false);
				}); 
				break;

			case("quit"):
				database.exit();
				process.exit(1);
			default:
				console.log("Please select an option"); 
				init();
		}
	}catch(err){
		console.log(err)
	};
}

module.exports = {init}