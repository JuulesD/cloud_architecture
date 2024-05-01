const express = require("express");
const router = express.Router();
const {getGroupIndexFromId, getUserIndexFromId, getWaitingGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.

    let userIndex = getUserIndexFromId(currentUserId,profiles);
        //Profile of the connected user.
    
    if (userIndex != -1){
        let userProfile = profiles[userIndex];
        //Current user.

        let groups = readFile("../data/groups.json");
        //Array of every profile.

        if (request.body.accept === "yes"){
            //Tcheck if the invitation has been accepted or not.

            let groupIndex = getGroupIndexFromId(request.body.groupId,groups);
            groups[groupIndex].membersId.push(currentUserId);
            //Add to user to group database.

            let newGroup = {
                "groupId": groups[groupIndex].groupId,
                "status": "member"
            };
            userProfile.groups.push(newGroup);
            //Group added to user group list.

            let waitingIndex = getWaitingGroupIndexFromId(request.body.groupId, userProfile.waiting);
            userProfile.waiting.splice(waitingIndex,1);
            //Group delete from the waiting list.

            writeFile("../data/groups.json",groups);
            //Json groups file update.

            response.send("Group joined !")
        }
        else{
            let waitingIndex = getWaitingGroupIndexFromId(request.body.groupId, userProfile.waiting);
            userProfile.waiting.splice(waitingIndex,1);
            //Group delete from the waiting list.

            response.send("Invitation declined.")
        }

        writeFile("../data/profiles.json",profiles);
        //Json user file update.

        response.status(200);
    }
    else{
        response.send("No account found.")
        response.status(500);
        return;
    }
})

module.exports = router;

/*body request:
{
    "groupId":"...",
    "accept":"..."
}
*/