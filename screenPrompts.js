const inquirer = require("inquirer");

const selectAnOptionPrompt = () => {
	return inquirer.prompt([
		{
			type: "list", 
			name: "choice", 
			message: "What would you like to do?",
			choices: ["View All Employees", "View Employees By Department", "View Employees by Role", 
				   "View Employees by Manager", "Add An Employee", "Add A Role", "Add A Department", 
				   "Update Employee Manager", "Delete Employee", "Delete a Role", "Delete a Department", 
				   "Show Total Utilized Budget By Department"]
		}
	])
}; 

const addDepartmentPrompt = () => {
	return inquirer.prompt([
			{
				type: "input", 
				name: "name", 
				message: "Enter Department Name: "
			}
		])
};

const addRolePrompt = () => {
	return inquirer.prompt([
			{
				type:"input", 
				name: "title", 
				message: "Enter Title: "
			}, 
			{
				type: "input", 
				name: "salary", 
				message: "Enter Salary: "
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
				message: "Enter First Name: "
			}, 
			{
				type: "input", 
				name: "last_name", 
				message: "Enter Last Name: "
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

module.exports = {selectAnOptionPrompt, addDepartmentPrompt, addRolePrompt,  
					addEmployeePrompt};