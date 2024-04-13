const express = require("express");
const router = express.Router();
const {readFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
	let profiles = readFile("../data/profiles.json");
    //Array of every profile.

	var lenUserList = profiles.length;
	var i = 0;
	while (i!=lenUserList){
		if (profiles[i].username === request.body.username && profiles[i].password ===  request.body.password){
			//Tcheck if a password and an username matched in the database.

			let currentUserId = profiles[i].userId;
			module.exports = currentUserId;
			//It permits to other files to know which user is connected.

			response.send(`Connected as ${profiles[i].username}.`);
			break;
		}
		i++;
	}
	if (i==lenUserList)
		response.send("Username and password doesn't match.")
	response.status(200);
});

module.exports = router;