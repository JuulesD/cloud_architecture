const express = require("express");
const router = express.Router();
const fs = require('fs');
const { getUserIndexFromId, getGroupIndex } = require("../usefulFunctions");

function removeUser(profiles,groups,idIndex,currentUserId){

    let userProfile = profiles[idIndex];

    let modifiedGroups = [];
    //This array will store every new group informations.

    //First part is about removing user from every group. 
    for(i=0;i!=groups.length;i++){
        console.log(`i: ${i}, len: ${groups.length}`);
        let j = 0;
        let nbMembers = groups[i].membersId.length;
        //Number of member in the current group.

        for (j=0;j!=nbMembers;j++){
            if (groups[i].membersId[j] === currentUserId && nbMembers != 1){
                //Tcheck if the user is in the group.

                for (k=0;k!=userProfile.groups.length;k++){
                //Search user status, it needs to be change if the user

                    if (userProfile.groups[k].groupId === groups[i].groupId && userProfile.groups[k].status === "admin"){
                        //Tcheck if the group is good and if user is the admin.
                        
                        if (j===nbMembers-1){
                            //Tcheck the index of the user in the array. If he is at the end, the new admin
                            //will be the first of the array.
                            let newAdminIndex = getUserIndexFromId(groups[i].membersId[0],profiles);
                            let newAdminGroupIndex = getGroupIndex(groups[i].groupId,profiles[newAdminIndex].groups);
                            profiles[newAdminIndex].groups[newAdminGroupIndex].status = "admin";
                            //Update the new admin.
                        }
                        else{
                            //If the user is not at the last position, the last person of the list will be the admin.
                            let newAdminIndex = getUserIndexFromId(groups[i].membersId[nbMembers-1],profiles);
                            let newAdminGroupIndex = getGroupIndex(groups[i].groupId,profiles[newAdminIndex].groups);
                            profiles[newAdminIndex].groups[newAdminGroupIndex].status = "admin";
                        }
                        break;
                    }
                }
                modifiedGroups.push(groups[i]);
                modifiedGroups[modifiedGroups.length-1].membersId.splice(j,1);
                //Adding the new object to the new list.
            }
        }
        if (groups[i].membersId[j] != currentUserId && groups[i].membersId.length===1 ||
            j===groups[i].membersId.length && groups[i].membersId.length!=1){
            //Special case : a user is alone in a group (case avoid previously to simplify code)
            //or a group doesn't contains a user.
            modifiedGroups.push(groups[i]);
        }
    }
    let updatedGroupsData = JSON.stringify(modifiedGroups, null, 2);
    fs.writeFileSync("../data/groups.json",updatedGroupsData);
    //Json groups file update.

    profiles.splice(idIndex, 1);
    let updatedProfilesData = JSON.stringify(profiles, null, 2);
    fs.writeFileSync("../data/profiles.json",updatedProfilesData);
    //User is deleted and the json profiles file update.
}

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("./connect");
    //Connected user.

    let profilesData = fs.readFileSync("../data/profiles.json", { encoding: 'utf8', flag: 'r' });
    let profiles = JSON.parse(profilesData);
    //Array of every profile.

    let idIndex = getUserIndexFromId(currentUserId,profiles);
    //Profile of the connected user.

    let groupsData = fs.readFileSync("../data/groups.json", { encoding: 'utf8', flag: 'r' });
    let groups = JSON.parse(groupsData);
    //Array of every group.

    if (idIndex != -1){
        removeUser(profiles,groups ,idIndex,currentUserId);
        response.send("Account deleted.");
        response.status(200);
    }
    else{
        response.send("No account found.")
        response.status(500);
        return;
    }
})


module.exports = router;

//Si un groupe est supprimé du même temps, supprimer tous les waitings