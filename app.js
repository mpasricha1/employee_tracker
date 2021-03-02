const screenMessages = require("./screenMessages"); 
const screenPrompts = require("./screenPrompts"); 


async function init(){
	try{
		screenPrompts.selectAnOption();
	}catch(err){
		console.log(err)
	}
}

init();