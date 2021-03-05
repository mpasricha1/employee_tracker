const splitName = (name) =>{
	return name ? name.split(" ") : [null, null]; 
}

module.exports = {splitName}