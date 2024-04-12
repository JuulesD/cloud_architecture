const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.

    let profilesData = fs.readFileSync("../data/profiles.json", { encoding: 'utf8', flag: 'r' });
    let profiles = JSON.parse(profilesData);
    //Array of every profile.

    if (request.body.value === "yes"){
        //Tcheck if the invitation has been accepted or not.
        
    }
    else{

    }
    response.status(200);
})

module.exports = router;