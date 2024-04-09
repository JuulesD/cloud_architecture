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
		var jsonData = JSON.parse(data);
		var lenUserList = jsonData.length;
		var i = 0;
		while (i!=lenUserList){
			if (jsonData[i].username === request.body.username && jsonData[i].password ===  request.body.password){
				response.send(`Connected as ${jsonData[i].username}.`);
				let currentUserId = jsonData[i].id;
				module.exports = currentUserId;
				break;
			}
			i++;
		}
		if (i==lenUserList)
			response.send("Username and password doesn't match.")
		response.status(200);
	});
});

module.exports = router;