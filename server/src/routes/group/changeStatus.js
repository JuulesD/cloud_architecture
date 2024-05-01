const express = require("express");
const router = express.Router();
const {getUserIndexFromId, getGroupIndexFromId, readFile, writeFile} = require("../usefulFunctions");

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("../account/connect");
    //Connected user.
 
    let profiles = readFile("../data/profiles.json");
    //Array of every profile.
    
    let userIndex = getUserIndexFromId(currentUserId,profiles);
    //Current user.

    if (userIndex != -1){

        let oldAdminGroupIndex = getGroupIndexFromId(request.body.groupId,profiles[userIndex].groups);
        //Group Index in old admin groups.
        if (oldAdminGroupIndex === -1){
            response.send("User is not in the group.")
            response.status(500);
            return;
        }

        if (profiles[userIndex].groups[oldAdminGroupIndex].status == "admin"){
            //Tcheck if the status of the connected user in the reach group is admin, only an admin can change his status.
            profiles[userIndex].groups[oldAdminGroupIndex].status = "member";

            let newAdminIndex = getUserIndexFromId(request.body.newAdminId,profiles);
            //New admin index in profiles.
            
            if (newAdminIndex === -1){
                response.send("User is not in the group.")
                response.status(500);
                return;
            }

            let newAdminGroupIndex = getGroupIndexFromId(request.body.groupId,profiles[newAdminIndex].groups);
            //Group Index in new admin groups.
            
            if (newAdminGroupIndex === -1){
                response.send("User is not in the group.")
                response.status(500);
                return;
            }

            profiles[newAdminIndex].groups[newAdminGroupIndex].status = "admin";
            //Update new admin status.
            
            writeFile("../data/profiles.json",profiles);

            response.send("Status changed !")
            response.status(200);
        }
        else{
            response.send("Only an admin can change his status.")
            response.status(500);
            return;
        }
    }
    else{
        response.send("No account found.")
        response.status(500);
        return;
    }
        
});

module.exports = router;

/*body request:
{
    "groupId":"...",
    "newAdminId":"..."
}
*/