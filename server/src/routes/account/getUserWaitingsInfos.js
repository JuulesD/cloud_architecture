const express = require("express");
const router = express.Router();
const {getUserIndexFromId, readFile, getGroupIndexFromId } = require("../usefulFunctions");

router.get("/",async (_request,response,_next)=>{
    let { currentUserId } = require("./connect")();
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.

    let groups = readFile("../data/groups.json");
    //Array of every profile.

    let waitingInfos = [];
    for (let i = 0; i!=profiles[userIndex].waiting.length;i++){
        const waitingAssociation = {
            userId: profiles[userIndex].waiting[i].userId,
            username: profiles[getUserIndexFromId(profiles[userIndex].waiting[i].userId, profiles)].username,
            groupId: profiles[userIndex].waiting[i].groupId,
            groupName: groups[getGroupIndexFromId(profiles[userIndex].waiting[i].groupId, groups)].name
        }
        waitingInfos.push(waitingAssociation);
    }
    
    response.json(waitingInfos);
    response.status(200);
})

module.exports = router;