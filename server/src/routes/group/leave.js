const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let { currentUserId } = require("../account/connect")();
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
        let initLenMembers = groups[groupIndex].membersId.length;
        while (i!=initLenMembers){
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

                if (groups[groupIndex].membersId.length === 0){

                    groups.splice(groupIndex,1);

                    for (let j = 0; j!=profiles.length;j++){
                        for (let k = 0; k<profiles[j].waiting.length;k++){
                            if (profiles[j].waiting[k].groupId === request.body.groupId)
                                profiles[j].waiting.splice(k,1);
                        }
                    }
                    //Remove invitations.

                }
                //If the user was alone in the group, the group is removed.
                //Every invitation to this group is destroyed too.

                else if (userProfile.groups[groupProfileIndex].status === "admin"){
                //If the user wasn't alone and was the admin of the group, then a new admin is choosed, randomly.

                    let newAdminIndex;

                    if (groups[groupIndex].membersId[0] !== currentUserId)
                        newAdminIndex = getUserIndexFromId(groups[groupIndex].membersId[0],profiles);
                    else
                        newAdminIndex = getUserIndexFromId(groups[groupIndex].membersId[groups[groupIndex].membersId.length-1],profiles);

                    profiles[newAdminIndex].groups[groupProfileIndex].status = "admin";
                }

                userProfile.groups.splice(groupProfileIndex,1);
                //Group is removed from user groupList.

                break;
            }
            i+=1;
        }
        if (i===initLenMembers){
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