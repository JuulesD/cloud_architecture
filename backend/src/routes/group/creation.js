const express = require("express");
const router = express.Router();
const fs = require('fs');
const {getUserIndexFromId} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.
 
    let profilesData = fs.readFileSync("../data/profiles.json", {encoding: 'utf8', flag: 'r'});
    let profiles = JSON.parse(profilesData);
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.
    if (userIndex != -1){
        //Test if user is connected.

        let dataGroup = fs.readFileSync("../data/groups.json", {encoding: 'utf8', flag: 'r'});
        let groups = JSON.parse(dataGroup);
        //Array of every group.
    
        let lenGroupList = groups.length;
        let group = {
            "groupId" : lenGroupList>0 ? groups[lenGroupList-1].groupId + 1 : 1,
            "status" : "admin"
        };
        //New user information.
    
        profiles[userIndex].groups.push(group);
        //Group added to the profile.
    
        let updatedProfilesData = JSON.stringify(profiles, null, 2);
        fs.writeFileSync("../data/profiles.json", updatedProfilesData);
        //Data update in database.
    
        let newGroup = {
            "groupId" : lenGroupList>0 ? groups[lenGroupList-1].groupId + 1 : 1,
            "name" : request.body.name,
            "membersId" : [currentUserId]
        };
        //New group informations.
    
        groups.push(newGroup);
        let updatedGroupData = JSON.stringify(groups, null, 2);
        fs.writeFileSync("../data/groups.json", updatedGroupData);
        //Data update.
    
        response.send("New Group added to your profile.")
        response.status(200);
    }
    else{
        response.send("No account found.")
        response.status(500);
        return;
    }
});

module.exports = router;

/*body request:
{
    "name":"..."
}
*/