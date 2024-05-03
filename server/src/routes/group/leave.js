const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect")();
    //Connected user.
 
    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.

    if (userIndex != -1){
        let groups = readFile("../data/groups.json");
        //Array of every group.

        let groupIndex = getGroupIndexFromId(request.body.groupId, groups);
        //Group user needs to be removed from.

        let i = 0;
        while (i!=groups[groupIndex].membersId.length){
            if (groups[groupIndex].membersId[i] === currentUserId){
                let userProfile = profiles[userIndex];
                //Current user.

                let groupProfileIndex = getGroupIndexFromId(request.body.groupId, userProfile.groups);
                //Index of the group in user profile.

                if (userProfile.groups[groupProfileIndex].vote === 0)
                    //Tcheck if user has vote in one the poll.
                
                    for (i=0;i!=groups[groupIndex].polls.length;i++)
                        for (j=0;j!=groups[groupIndex].polls[i].votersId.length;j++)
                            if (groups[groupIndex].polls[i].votersId[j] === currentUserId){
                                groups[groupIndex].polls[i].votersId.splice(j,1);
                                groups[groupIndex].polls[i].nbVote -=1;
                                //If the userId is found in one of the poll, it is removed and the nbVote is decreased.
                                break;
                            }

                groups[groupIndex].membersId.splice(i,1);
                //User is removed from the groupList.

                userProfile.groups.splice(groupProfileIndex,1);
                //Group is removed from user groupList.

                break;
            }
            i+=1;
        }
        if (i===groups[groupIndex].membersId.length){
            response.send("This user is not in the group.")
            response.status(500);
            return;
        }
        else{
            writeFile("../data/profiles.json", profiles);
            writeFile("../data/groups.json",groups);
            //Data updated.

            response.send("User removed from group.");
            response.status(200);
        }   
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
    "groupId":"..."
}
*/