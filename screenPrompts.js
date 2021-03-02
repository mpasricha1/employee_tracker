const inquirer = require("inquirer");

const selectAnOption = () => {
	return inquirer.prompt([
		{
			type: "list", 
			name: "select", 
			message: "What would you like to do?",
			choices: ["View All Employees", "View Employees By Department", "View Employees by Role", 
				   "View Employees by Manager", "Add An Employee", "Add A Role", "Add A Department", 
				   "Update Employee Manager", "Delete Employee", "Delete a Role", "Delete a Department", 
				   "Show Total Utilized Budget By Department"]
		}
	])
}

module.exports = {selectAnOption};