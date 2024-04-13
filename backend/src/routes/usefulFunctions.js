const fs = require('fs');

function getUserIndexFromId(id,profiles){
    for (l=0;l!=profiles.length;l++)
        if (profiles[l].userId === id)
            return l;
    return -1;
}

function getGroupIndexFromId(id,groups){
    for (l=0;l!=groups.length;l++)
        if (groups[l].groupId === id)
            return l;
    return -1;
}

function getWaitingGroupIndexFromId(id,waiting){
    for (i=0;i!=waiting.length;i++)
        if (waiting[i].groupId === id)
            return i;
    return -1;
}

function readFile(path){
    let data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(data);
}

function writeFile(path,data){
    let updatedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(path,updatedData);
}

module.exports = {getUserIndexFromId, getGroupIndexFromId, getWaitingGroupIndexFromId, readFile, writeFile};