const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

function validVote(groups, profiles, group, groupIndexInProfile, userProfile, request){
    for (i=0;i!=group.polls.length;i++){
        let poll = group.polls[i];
        //Current poll checked.

        if (poll.name === request.body.name){
            poll.nbVote +=1;
            //Vote for the movie is augmented.

            poll.votersId.push(userProfile.userId);
            //Member that voted for the movie is added.

            userProfile.groups[groupIndexInProfile].vote = 0;
            //User already used his vote.

            writeFile("../data/groups.json",groups)
            writeFile("../data/profiles.json",profiles)
            //Files are updated.

            return 0;
        }
    }
    return -1;
}

function vote(userProfile, profiles, groups, request){
    let groupIndexInProfile = getGroupIndexFromId(request.body.groupId,userProfile.groups);
    //Index of the group in the user group list.

    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);
    //Index of the group in the user group database.

    let group = groups[groupIndex];

    if (userProfile.groups[groupIndexInProfile].vote == 1){
        //Tcheck if the user has already used his vote.
        
        return validVote(groups, profiles, group, groupIndexInProfile, userProfile, request);
    }
    else{
        //If he has already vote, the number of vote for the movie need to be decreased.
        for (i=0;i!=group.polls.length;i++){
            let poll = group.polls[i];

            for (j=0;j!=poll.votersId.length;j++)
                if (poll.votersId[j] === userProfile.userId){
                    poll.nbVote -=1;

                    poll.votersId.splice(j,1);
                    //Member of the poll deleted.

                    return validVote(groups, profiles, group, groupIndexInProfile, userProfile, request, true);
                }
        }
    }
}

router.post("/",async (request,response,_next)=>{

    let {currentUserId} = require("../account/connect")();
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    if (idIndex !=-1){
        let userProfile = profiles[idIndex];

        let groups = readFile("../data/groups.json");
        //Array of every group.
        
        let done = vote(userProfile, profiles, groups, request);
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