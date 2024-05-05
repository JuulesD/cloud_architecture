const express = require("express");
const router = express.Router();
const { readFile, getGroupIndexFromId } = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let groups = readFile("../data/groups.json");
    let groupIndex = getGroupIndexFromId(request.body.groupId,groups);
    response.json(groups[groupIndex].list);
    response.status(200);
})

module.exports = router;