function getUserIndexFromId(id,profiles){
    for (l=0;l!=profiles.length;l++)
        if (profiles[l].id === id)
            return l;
    return -1;
}

function getGroupIndex(id,groups){
    for (l=0;l!=groups.length;l++)
        if (groups[l].groupId === id)
            return l;
    return -1;
}

module.exports = {getUserIndexFromId, getGroupIndex};