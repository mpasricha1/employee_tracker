const screenMessages = require("./screenMessages"); 
const screenPrompts = require("./screenPrompts"); 
const database = require("./Database"); 


async function init(){
	try{
	 	let choice = await screenPrompts.selectAnOptionPrompt();
	 	console.log(choice.choice);

		switch(choice.choice){
			case("Add A Department"):
				let department = await screenPrompts.addDepartmentPrompt();
				database.addADepartment(department.department);

		}
	}catch(err){
		console.log(err)
	}
}

init();