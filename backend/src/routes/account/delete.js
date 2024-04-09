const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post("/",async (request,response,_next)=>{
    let currentUserId = require("./connect");
    fs.readFile("../data/profiles.json", 'utf8', (err, data) => {
        if (err) {
            console.error("An error occured while reading the file : ", err);
            response.status(500);
            return;
        }
        let profiles = JSON.parse(data);
        let idIndex = 0;
        for (i = 0; i!=profiles.length;i++){
            if (profiles[i].id === currentUserId){
                idIndex = i;
                break;
            }
        }
        if (idIndex!=0){
            console.log(`currentId : ${currentUserId}, id : ${profiles[idIndex].id}, index : ${idIndex}`);
            profiles.splice(idIndex, 1);
            var updatedData = JSON.stringify(profiles, null, 2);
                fs.writeFile("../data/profiles.json", updatedData, (err) => {
                    if (err) {
                    console.error("An error occured while writing the file : ", err);
                    response.status(500);
                    return;
                    }
                    response.send("Account deleted.")
                });
        }
        else{
            response.send("No account found.")
            response.status(500);
            return;
        }
    })
    response.status(200);
})

module.exports = router;