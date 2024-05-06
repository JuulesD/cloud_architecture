const express = require("express");
const router = express.Router();
const { getUserIndexFromId, getUserIndexFromUsername, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let { currentUserId } = require("../account/connect")();
    //Connected user.
 
    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let senderIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.

    if (senderIndex != -1){

        let receiverIndex = getUserIndexFromUsername(request.body.username,profiles);

        if (receiverIndex===-1){
            response.send("No username found.");
        }
        else{
            let userProfile = profiles[receiverIndex];
            //Current user profile.

            let j = 0;
            while (j!=userProfile.groups.length){
                if (userProfile.groups[j].groupId === request.body.groupId){
                    response.send("User already in the group.");
                    break;
                }
                j++;
            }

            if (j===userProfile.groups.length){
                j = 0;

                while (j!=userProfile.waiting.length){
                    if (userProfile.waiting[j].groupId === request.body.groupId){
                        response.send("User already received an invitation.");
                        break;
                    }
                    j++
                }

                if (j===userProfile.waiting.length){

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
            }
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
    "username":"...",
    "groupId":"..."
}
*/