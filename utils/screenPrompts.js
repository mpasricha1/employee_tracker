const inquirer = require("inquirer");

const selectAnOptionPrompt = () => {
	return inquirer.prompt([
		{
			type: "list", 
			name: "choice", 
			message: "What would you like to do?",
			choices: ["View All Employees", "View Employees By Department", "View Employees By Role", 
				   "View Employees by Manager", "View All Roles", "View All Departments", "Add An Employee", "Add A Role", "Add A Department", 
				   "Update Employee Manager", "Update Employee Role", "Delete Employee", "Delete Role", "Delete Department", 
				   "Show Total Utilized Budget By Department", "Quit"]
		}
	])
}; 

const addDepartmentPrompt = () => {
	return inquirer.prompt([
			{
				type: "input", 
				name: "name", 
				message: "Enter Department Name: ", 
				validate: input => {
					if(!input.length){
						return "Please enter more then one character."
					}else{
						return true; 
					}
				}
			}
		])
};

const addRolePrompt = () => {
	return inquirer.prompt([
			{
				type:"input", 
				name: "title", 
				message: "Enter Title: ", 
				validate: input => {
					if(!input.length){
						return "Please enter more then one character."
					}else{
						return true; 
					}
				}
			}, 
			{
				type: "input", 
				name: "salary", 
				message: "Enter Salary: ", 
				validate: input => {
					if(isNaN(parseInt(input))){
						return "Please enter a number."
					}else{
						return true; 
					}
				}
			}, 
			{
				type: "input", 
				name: "department_id", 
				message: "Enter Department Name: "
			}
		])
};

const addEmployeePrompt = () => {
	return inquirer.prompt([
			{
				type: "input", 
				name: "first_name", 
				message: "Enter First Name: ", 
				validate: input => {
					if(!input.length){
						return "Please enter more then one character."
					}else{
						return true; 
					}
				}
			}, 
			{
				type: "input", 
				name: "last_name", 
				message: "Enter Last Name: ", 
				validate: input => {
					if(!input.length){
						return "Please enter more then one character."
					}else{
						return true; 
					}
				}
			}, 
			{
				type: "input", 
				name: "role_id", 
				message: "Enter Role: "
			}, 
			{
				type: "input", 
				name: "manager_id", 
				message: "Enter Managers Name: "
			}
		])
};

const performMorePrompt = () => {
	return inquirer.prompt([
			{
				type: "input", 
				name: "answer", 
				message: "Do you want to do more? (y/n)"
			}
		])

};

const updateEmployeeRolePrompt = () => {
	return inquirer.prompt([
			{
				type: "input", 
				name: "id", 
				message: "Which employee role do you want to update?", 
				validate: input => {
					if(!input.length){
						return "Please enter more then one character."
					}else{
						return true; 
					}
				}
			}, 
			{
				type: "input", 
				name: "role_id", 
				message: "Enter New Role: "
			}
		])
}
const updateEmployeeManagerPrompt = () => {
	return inquirer.prompt([
			{
				type: "input", 
				name: "id", 
				message: "Which employee role do you want to update?", 
				validate: input => {
					if(!input.length){
						return "Please enter more then one character."
					}else{
						return true; 
					}
				}
			}, 
			{
				type: "input", 
				name: "manager_id", 
				message: "Enter New Manager: "
			}
		])
}

const generateSelectList = (list, returnName, message) => {
	return inquirer.prompt([
			{
				type: "list", 
				name: returnName, 
				message: message,
				choices: list
			}
		])

}

module.exports = {selectAnOptionPrompt, addDepartmentPrompt, addRolePrompt,  
					addEmployeePrompt, performMorePrompt, updateEmployeeRolePrompt, 
					updateEmployeeManagerPrompt, generateSelectList};