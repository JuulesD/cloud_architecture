const express = require("express");
const router = express.Router();

/////////////////////////////////////////////
//Use socket.io to get instant chats between users in a group or server side events
/////////////////////////////////////////////

/*body request:
{
    "groupId":...,
    "userId":...
    "chat":"..."
}
*/