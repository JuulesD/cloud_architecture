const fs = require('fs');

async function linkApi(){
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '71c89b1928msh4dd545334e32284p1605b3jsnaf0b4e3cc8f7',
			'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
		}
	};

	try{
		const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/top32', options);
		const result = await response.text();
		console.log(result);
	}
	catch (error){
		console.error(error);
	}
}

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

function verifInput(input){
    //An input cannot be more than 15 char, must be at least one char, cannot start or end with space.
    if (input.length === 0 || input.length > 15)
        return false;
    const first = input[0];
    if (first === " ")
        return false;
    else{
        isSpace = false;
        for (let i = 1;i!=input.length;i++){
            if (input[i]===" ")
                isSpace = true;
            else
                isSpace = false;
        }
    }
    return !isSpace;
}

function verifPassword(input){
    if (input.length < 8 || input.length > 32)
        return false;
    return true;
}

function getUserIndexFromUsername(username,profiles){
    for (l=0;l!=profiles.length;l++)
        if (profiles[l].username === username)
            return l;
    return -1;
}

module.exports = { getUserIndexFromId, getGroupIndexFromId, getWaitingGroupIndexFromId,
                   readFile, writeFile, linkApi, verifInput, verifPassword, getUserIndexFromUsername };