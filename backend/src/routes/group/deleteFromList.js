const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

function removePart(groups, request){
    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);

    for (i=0;i!=groups[groupIndex].list.length;i++)
        if (groups[groupIndex].list[i] === request.body.part){
            groups[groupIndex].list.splice(i,1);
            return 0;
        }
    return -1;
}

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("./connect");
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    //Profile of the connected user.

    if (idIndex != -1){
        let groups = readFile("../data/groups.json");
        //Array of every group.

        let done = removePart(groups, request);
        if (done ===0)
            response.send("Part deleted.");
        else
            response.send("Part not existed.");
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
    "part":"..."
}
*/