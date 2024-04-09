const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post("/",async (request,response,_next)=>{
    fs.readFile("../data/profiles.json", 'utf8', (err, data) => {
		if (err) {
			console.error("An error occured while reading the file : ", err);
			response.status(500);
			return;
		}
		let profilesData = JSON.parse(data);
		let lenUserList = profilesData.length;
		let i = 0;
		while (i!=lenUserList){
			if (profilesData[i].username === request.body.username){
				response.send("Username already used.");
				break;
			}
			i++;
		}
		if (i==lenUserList){
			const newProfile = {
				"id": lenUserList>0 ? profilesData[i-1].id+1 : 1,
				"username": request.body.username,
				"firstname": request.body.firstname,
				"surname": request.body.surname,
				"profilePic": request.body.profilePic,
				"password": request.body.password,
				"groups": []
			  };
            profilesData.push(newProfile);
            let updatedData = JSON.stringify(profilesData, null, 2);
            fs.writeFile("../data/profiles.json", updatedData, (err) => {
                if (err) {
                  console.error("An error occured while writing the file : ", err);
				  response.status(500);
                  return;
                }
                response.send("New account created.")
              });
        }
		response.status(200);
	});
});

module.exports = router;
