const express = require("express");
const router = express.Router();
const {readFile, linkApi} = require("../usefulFunctions");

var currentUserId;

router.post("/",async (request,response,_next)=>{
	let profiles = readFile("../data/profiles.json");
    //Array of every profile.

	let lenUserList = profiles.length;
	let i = 0;
	while (i!=lenUserList){
		if (profiles[i].username === request.body.username && profiles[i].password ===  request.body.password){
			//Tcheck if a password and an username matched in the database.

			currentUserId = profiles[i].userId;
			await linkApi();
			//It permits to other files to know which user is connected.

			const data = {
				"message":`Connected as ${profiles[i].username}.`,
				"userId":currentUserId
			}
			
			response.json(data);
			break;
		}
		i++;
	}
	console.log("i at the backend end :",i);
	if (i==lenUserList){
		const data = {
			"message":"Username and password doesn't match.",
			"userId":-1
		}
		response.json(data);
	}
	response.status(200);
});

module.exports =  currentUserId ;
module.exports = router;

/*body request:
{
	"username":"...",
	"password":"..."
}
*/