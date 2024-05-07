const express = require("express");
const router = express.Router();
const { readFile, getUserIndexFromId, getGroupIndexFromId } = require("../usefulFunctions");

router.get("/",async (_request,response,_next)=>{
    let { currentUserId } = require("./connect")();
    
    let profiles = readFile("../data/profiles.json");
    let userIndex = getUserIndexFromId(currentUserId,profiles);

    let groupInfo = [];

    let groups = readFile("../data/groups.json");

    for (let i = 0;i!=profiles[userIndex].groups.length;i++){
        let groupIndex = getGroupIndexFromId(profiles[userIndex].groups[i].groupId,groups);
        groupInfo.push({
            "groupId":profiles[userIndex].groups[i].groupId,
            "name":groups[groupIndex].name,
            "vote":groups[groupIndex].vote
        })
    }
    
    response.json(groupInfo);

    response.status(200);
})

module.exports = router;

/*body response:
{
	[
        {
            "groupId": ...,
            "status": "...",
            "vote": ...
        },
        ...
    ]
}
*/