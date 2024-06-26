const express = require("express");
const router = express.Router();
const {getUserIndexFromId, readFile } = require("../usefulFunctions");

router.get("/",async (_request,response,_next)=>{
    let { currentUserId } = require("./connect")();
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.

    response.json(profiles[userIndex]);
    response.status(200);
})

module.exports = router;