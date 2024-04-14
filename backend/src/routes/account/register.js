const express = require("express");
const router = express.Router();
const {readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let profiles = readFile("../data/profiles.json");
	//Array of every profile.
		
	let lenUserList = profiles.length;
	let i = 0;

	while (i!=lenUserList){
		//Tcheck if username is already used.
		if (profiles[i].username === request.body.username){
			response.send("Username already used.");
			break;
		}
		i++;
	}
	if (i==lenUserList){
		const newProfile = {
			"userId": lenUserList>0 ? profiles[i-1].id+1 : 1,
			"username": request.body.username,
			"firstname": request.body.firstname,
			"surname": request.body.surname,
			"profilePic": request.body.profilePic,
			"password": request.body.password,
			"groups": [],
			"waiting":[]
			};
        profiles.push(newProfile);
		//Creation and update of the new profile.

        writeFile("../data/profiles.json",profiles);
        response.send("New account created.")
		//Update data.
    }
	response.status(200);
});

module.exports = router;

/*body request:
{
    "username":"...",
    "firstname":"...",
	"surname":"...",
	"profilePic":"...",
	"password":"..."
}
*/