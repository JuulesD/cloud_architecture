const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

function validVote(groups, groupIndex, userProfile, request){
    for (i=0;i!=groups[groupIndex].poll.length;i++){
        if (groups[groupIndex].poll[i].name === request.body.name){
            groups[groupIndex].poll[i].vote +=1;
            groups[groupIndex].poll[i].votersId.push(userProfile.userId);
            userProfile.groups[groupIndexInProfile].vote = 0;
            return 0;
        }
    }
    return -1;
}

function vote(userProfile, groups, request){
    let groupIndexInProfile = getGroupIndexFromId(request.body.groupId,userProfile.groups);
    //Index of the group in the user group list.

    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);
    //Index of the group in the user group database.

    if (userProfile.groups[groupIndexInProfile].vote == 1){
        //Tcheck if the user has already used his vote.
        
        let done = validVote(groups, groupIndex, userProfile, request);
        if (done === -1)
            return -1;
        else{
            writeFile("../data/groups.json",groups)
            return 0;
        }

    }
    else{
        //If he has already vote, the number of vote for the movie need to be decreased.
        for (i=0;i!=groups[groupIndex].poll.length;i++)
            for (j=0;j!=groups[groupIndex].poll[i].votersId.length;j++)
                if (groups[groupIndex].poll[i].votersId[j] === userProfile.userId){
                    groups[groupIndex].poll[i].votersId.splice(j,1);
                    let done = validVote(groups, groupIndex, userProfile, request);
                    if (done === -1)
                        return -1;
                    else{
                        writeFile("../data/groups.json",groups)
                        return 0;
                    }
                }
    }
}

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    if (idIndex !=-1){
        let userProfile = profiles[idIndex];

        let groups = readfile("../data/groups.json");
        //Array of every group.

        let done = vote(userProfile, groups, request);
        if (done === -1)
            response.send("Poll not existed.")
        else
            response.send("Vote added.")
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
    "name":"..."
}
*/