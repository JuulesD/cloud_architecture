const express = require("express");
const router = express.Router();
const {readFile, linkApi} = require("../usefulFunctions");

var currentUserId = -1;

router.post("/",async (request,response,_next)=>{
	let profiles = readFile("../data/profiles.json");
    //Array of every profile.

	let lenUserList = profiles.length;
	let i = 0;
	while (i!=lenUserList){
		if (profiles[i].username === request.body.username && profiles[i].password ===  request.body.password){
			//Tcheck if a password and an username matched in the database.

			currentUserId = profiles[i].userId;
			//It permits to other files to know which user is connected.

			//await linkApi();

			const data = {
				"message":`Connected as ${profiles[i].username}.`,
				"userId":currentUserId
			}
			
			response.json(data);
			break;
		}
		i++;
	}
	
	if (i==lenUserList){
		const data = {
			"message":"Username and password doesn't match.",
			"userId":currentUserId
		}
		response.json(data);
	}
	response.status(200);
});

module.exports = () => ({ currentUserId, router });
//The module is export via a function to prevent currentUserId to be equal to -1.
//Only one module.exports can exist by file and as the router is an asynchronous function
//it is necessary to export it via a function

/*body request:
{
	"username":"...",
	"password":"..."
}
*/
/*body response:
{
	"message":"...",
	"userId":"..."
}
*/