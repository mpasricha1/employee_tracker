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
	console.log("")
	console.log("")
	console.table(`${name} List`, data)
}


module.exports = {printWelcomeScreen, printAll}