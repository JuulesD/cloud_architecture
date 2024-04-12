const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profilesData = fs.readFileSync("../data/profiles.json", { encoding: 'utf8', flag: 'r' });
    let profiles = JSON.parse(profilesData);
    //Array of every profile.

    let lenProfiles = profiles.length;
    let i = 0;
    while (i!=lenProfiles){
        //Tcheck if username exists.
        if (profiles[i].username === request.body.username){
            for (j=0;j!=profiles[i].groups.length;j++){
                if (profiles[i].groups[j][1] === request.body.group){
                    response.send("User already in the group.");
                    break;
                }
            }
            let invitation = {
                "sender":currentUserId,
                "group":request.body.group
            };
            //New invitation created.

            profiles[i].waiting.push(invitation);
            let updatedProfilesData = JSON.stringify(profiles, null, 2);
            fs.writeFileSync("../data/profiles.json", updatedProfilesData);
            //Update database.
            
            response.send("Invitation successfully send !");
            break;
        } 
        i++;
    }
    if (i===lenProfiles){
        response.send("No username found.");s
    }
    response.status(200);
})

module.exports = router;

