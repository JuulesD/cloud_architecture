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

module.exports = {getUserIndexFromId, getGroupIndexFromId, getWaitingGroupIndexFromId};