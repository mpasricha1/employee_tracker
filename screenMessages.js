const printWelcomeScreen = () => {
	console.log(""); 
	console.log("-----------------------------------");
	console.log("-								   -");
	console.log("-       Employee Manager 		   -");
	console.log("-								   -");
	console.log("-----------------------------------");

}; 

const printAllEmployees = (employees) => {
	employees.forEach(emp => {
		console.log(`|${emp.full_name} | ${emp.dept_name} | ${emp.title} | ${emp.salary} | ${emp.manager_name}`)
	})
}

module.exports = {printWelcomeScreen, printAllEmployees}