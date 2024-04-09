const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    fs.readFile("../data/groups.json", 'utf8', (err, dataGroup) => {
		if (err) {
			console.error("An error occured while reading the file : ", err);
			response.status(500);
			return;
		}
        let groupDataJsObject = JSON.parse(dataGroup);
        let lenGroupList = groupDataJsObject.length;
        let group = {
            "groupId" : lenGroupList>0 ? groupDataJsObject[lenGroupList-1].id + 1 : 1,
            "status" : "admin"
        };
        fs.readFile("../data/profiles.json", 'utf8', (err, dataProfiles) => {
            if (err) {
                console.error("An error occured while reading the file : ", err);
                response.status(500);
                return;
            }
            let profilesData = JSON.parse(dataProfiles);
            for (i=0; i!=profilesData.length;i++){
                if (profilesData[i].id === currentUserId)
                    profilesData[i].groups.push(group);
            }
            let updatedProfilesData = JSON.stringify(profilesData, null, 2);
            fs.writeFile("../data/profiles.json", updatedProfilesData, (err) => {
                if (err) {
                console.error("An error occured while writing the file : ", err);
                response.status(500);
                return;
                }
            })
        });
        let newGroup = {
            "id" : lenGroupList>0 ? groupDataJsObject[lenGroupList-1].id + 1 : 1,
            "name" : request.body.name,
            "member" : [currentUserId]
        };
        groupDataJsObject.push(newGroup);
        let updatedGroupData = JSON.stringify(groupDataJsObject, null, 2);
        fs.writeFile("../data/groups.json", updatedGroupData, (err) => {
            if (err) {
            console.error("An error occured while writing the file : ", err);
            response.status(500);
            return;
            }
            response.send("New Group added to your profile.")
        })
    })
    response.status(200);
});

module.exports = router;