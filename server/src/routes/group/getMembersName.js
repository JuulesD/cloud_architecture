const express = require("express");
const router = express.Router();
const { readFile, getGroupIndexFromId, getUserIndexFromId } = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let groups = readFile("../data/groups.json");
    let profiles = readFile("../data/profiles.json");

    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);

    let membersList = [];
    for (let i = 0;i!=groups[groupIndex].membersId.length;i++){
        let currentProfileIndex = getUserIndexFromId(groups[groupIndex].membersId[i],profiles);
        const member = {
            userId:profiles[currentProfileIndex].userId,
            name:profiles[currentProfileIndex].username
        }
        membersList.push(member);
    }

    response.json(membersList);
    response.status(200);
})

module.exports = router;

/*body request:
{
    "groupId":...
}
*/
/*body response:
{
    [
        ...,
        ...
    ]
}
*/
    