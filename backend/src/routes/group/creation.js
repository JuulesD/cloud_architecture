const express = require("express");
const router = express.Router();
const {getUserIndexFromId, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.
 
    let profiles = readfile("../data/profiles.json");
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.
    if (userIndex != -1){
        //Test if user is connected.

        let groups = readFile("../data/groups.json");
        //Array of every group.
    
        let lenGroupList = groups.length;
        let group = {
            "groupId" : lenGroupList>0 ? groups[lenGroupList-1].groupId + 1 : 1,
            "status" : "admin",
            "vote":1
        };
        //New user information.
    
        profiles[userIndex].groups.push(group);
        //Group added to the profile.
    
        writeFile("../data/profiles.json",profiles);
        //Data update in database.
    
        let newGroup = {
            "groupId" : lenGroupList>0 ? groups[lenGroupList-1].groupId + 1 : 1,
            "name" : request.body.name,
            "membersId" : [currentUserId],
            "list":[],
            "polls":[]
        };
        //New group informations.
    
        groups.push(newGroup);
        writeFile("../data/groups.json",groups);
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