const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

function removeElement(groups , request){
    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);

    for (i=0;i!=groups[groupIndex].list.length;i++)
        for (j=0;j!=groups[groupIndex].list[i].elements.length;j++)
            if (groups[groupIndex].list[i].elements[j] === request.body.element){
                groups[groupIndex].list[i].elements.splice(j,1);
                return 0;
            }
    return -1;
}

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("./connect")();
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    //Profile of the connected user.

    if (idIndex != -1){
        let groups = readFile("../data/groups.json");
        //Array of every group.

        let done = removeElement(groups, request); 
        if (done ===0)
            response.send("Element deleted.");
        else
            response.send("Element not existed.");
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
    "element":"..."
}
*/