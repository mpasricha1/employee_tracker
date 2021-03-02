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
			name: "department", 
			message: "Enter Department Name: "
		}
	])
};

module.exports = {selectAnOptionPrompt, addDepartmentPrompt};