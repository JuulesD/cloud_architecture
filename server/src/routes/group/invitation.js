const express = require("express");
const router = express.Router();
const {getUserIndexFromId, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.
 
    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let senderIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.
    if (senderIndex != -1){

        let receiverIndex = getUserIndexFromId(request.body.userId,profiles);

        if (receiverIndex===-1){
            response.send("No username found.");
        }
        else{
            let userProfile = profiles[receiverIndex];
            //Current user profile.

            for (j=0;j!=userProfile.groups.length;j++){
                if (userProfile.groups[j].groupId === request.body.groupId){
                    response.send("User already in the group.");
                    break;
                }
            }

            for (j=0;j!=userProfile.waiting.length;j++){
                if (userProfile.waiting[j].groupId === request.body.groupId){
                    response.send("User already received an invitation.");
                    break;
                }
            }

            let invitation = {
                "userId":currentUserId,
                "groupId":request.body.groupId
            };
            //New invitation created.

            userProfile.waiting.push(invitation);

            writeFile("../data/profiles.json",profiles);
            //Update database.
            
            response.send("Invitation successfully send !");
        }
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
    "userId":"...",
    "groupId":"..."
}
*/