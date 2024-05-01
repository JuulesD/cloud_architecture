const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

function addToList(groups, request){

    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);

    let newListElement = {
        "name":request.body.name,
        "elements":request.body.elements
    };
    //New element.

    groups[groupIndex].list.push(newListElement);
    //Element added.

    writeFile("../data/groups.json",groups);
}

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let groups = readFile("../data/groups.json");
    //Array of every group.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    if (idIndex !=-1){

        addToList(groups, request);
        response.send("Group list modify.")
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
    "name":"...",
    "elements":["...","...",...,"..."]
}
*/
