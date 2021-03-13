const table = require("console.table")

const printWelcomeScreen = () => {
	console.log(""); 
	console.log("-----------------------------------");
	console.log("-								   -");
	console.log("-       Employee Manager 		   -");
	console.log("-								   -");
	console.log("-----------------------------------");

}; 

const printAll = (name, data) => {
	data.forEach(d => delete d.manager_id);
	data.forEach(d => delete d.role_id);
	console.log("")
	console.log("")
	console.table(`${name} List`, data)
}


module.exports = {printWelcomeScreen, printAll}