const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

function addPoll(groups, request){
    let groups = readFile("../data/groups.json");
    //Array of every group.

    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);

    let newPoll = {
        "name":request.body.name,
        "nbVote":0,
        "votersId":[]
    };
    //New element.

    groups[groupIndex].polls.push(newPoll);
    //Element added.

    writeFile("../data/groups.json",groups);
}

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    if (idIndex !=-1){

        let groupIndex = getGroupIndexFromId(request.body.groupId,profiles[idIndex].groups)
        if (profiles[idIndex].groups[groupIndex].status != "admin"){
            //Only the admin of the group can add a poll.
            response.send("You don't have the right to add a poll.")
            response.status(200);
        }
        else{
            addPoll(groups, request);
            response.send("Group vote added.")
            response.status(200);
        }
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