const express = require("express");
const router = express.Router();
const fs = require('fs');
const {getGroupIndexFromId, getUserIndexFromId, getWaitingGroupIndexFromId} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profilesData = fs.readFileSync("../data/profiles.json", { encoding: 'utf8', flag: 'r' });
    let profiles = JSON.parse(profilesData);
    //Array of every profile.

    let userIndex = getUserIndexFromId(currentUserId,profiles);
        //Profile of the connected user.
    
    if (userIndex != -1){
        let userProfile = profiles[userIndex];
        //Current user.

        let groupsData = fs.readFileSync("../data/groups.json", { encoding: 'utf8', flag: 'r' });
        let groups = JSON.parse(groupsData);
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

            let updatedGroupsData = JSON.stringify(groups, null, 2);
            fs.writeFileSync("../data/groups.json",updatedGroupsData);
            //Json groups file update.

            response.send("Group joined !")
        }
        else{
            let waitingIndex = getWaitingGroupIndexFromId(request.body.groupId, userProfile.waiting);
            userProfile.waiting.splice(waitingIndex,1);
            //Group delete from the waiting list.

            response.send("Invitation declined.")
        }

        let updatedProfilesData = JSON.stringify(profiles, null, 2);
        fs.writeFileSync("../data/profiles.json",updatedProfilesData);
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

//Boucle infinie