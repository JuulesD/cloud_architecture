const express = require("express");
const router = express.Router();

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


module.exports = router;