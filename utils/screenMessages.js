const table = require("console.table")

const printWelcomeScreen = () => {
	console.log(""); 
	console.log("-----------------------------------");
	console.log("								    ");
	console.log("        Employee Manager 		    ");
	console.log("								    ");
	console.log("-----------------------------------");

}; 

const printAll = (name, data, flag) => {
	if(flag){
		data.forEach(d => delete d.manager_id);
		data.forEach(d => delete d.role_id);
	}
	console.log("");
	console.log("");
	console.table(`${name} List`, data);
	console.log("");
	console.log("")
	app.init();
}

const confirmChange = () => {
	console.log("Changes Commited"); 
	app.init();
}

module.exports = {printWelcomeScreen, printAll}

const app = require("../init");