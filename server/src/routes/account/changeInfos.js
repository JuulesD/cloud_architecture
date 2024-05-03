const express = require("express");
const router = express.Router();
const {getUserIndexFromId, readFile, writeFile, verifInput, verifPassword} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let expVar = require("../account/connect")();
    //Exported variables.

    let currentUserId = expVar.currentUserId;
    //Connected user.

    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.

    let isVerified = true;

    if (verifInput(request.body.username))
        profiles[userIndex].username = request.body.username;
    else
        isVerified = false;

    if (isVerified && verifInput(request.body.firstname))
        profiles[userIndex].firstname = request.body.firstname;
    else
        isVerified = false;

    if (isVerified && verifInput(request.body.surname))
        profiles[userIndex].surname = request.body.surname;
    else
        isVerified = false;

    if (isVerified && verifPassword(request.body.password))
        profiles[userIndex].password = request.body.password;
    else
        isVerified = false;

    profiles[userIndex].profilePic = request.body.profilePic;

    if (isVerified){ 
        //Change Informations in database.
        
        writeFile("../data/profiles.json",profiles);
        //Rewrite new informations.

        response.send(isVerified);
        response.status(200);
    }
    else{
        response.send(isVerified);
        response.status(200);
    }
})

module.exports = router;

/*body request:
{
    "username": "...",
    "firstName": "...",
    "surname": "...",
    "profilePic": "...",
    "password": "...",
}
*/