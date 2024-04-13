const express = require("express");
const router = express.Router();
/////////////////////////////////////////////::
//Use socket.io to get instant chats between users in a group
/////////////////////////////////////////////::

/*
router.get('/',async(request,response,next)=>{
    socket.emit('message',request.body.message);
})

module.exports = router;

const chat = []

router.post("/chat",async (request,response,next)=>{
    console.log(request.body);
    chat.push(request.body.message);
    response.send(chat);
    next();
})

router.get("/chat",async(request,response,_next)=>{
    console.log(request.body);
})

/*body request:
{
    "groupId":"...",
    "chat":"..."
}
*/