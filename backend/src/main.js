const express = require("express");
const app = express();

app.use(express.json());
app.use("/connect",require("./routes/account/connect.js"));
app.use("/register",require("./routes/account/register.js"));
app.use("/delete",require("./routes/account/delete.js"));
app.use("/accept",require("./routes/account/accept.js"));

app.use("/creation",require("./routes/group/creation.js"));
app.use("/invitation",require("./routes/group/invitation.js"));
/*
IMPORTANT
app.use("/chat",require("./routes/group/chat.js")); long
app.use("/addPoll",require("./routes/group/addPoll.js"));
app.use("/addPoll",require("./routes/group/vote.js"));
app.use("/addList",require("./routes/group/addList.js"));
app.use("/modifyList",require("./routes/group/modifyList.js")); long 

OSEF
app.use("/deletion",require("./routes/group/deletion.js"));  osef
app.use("/addPoll",require("./routes/group/leave.js"));
app.use("/changeStatus",require("./routes/group/changeStatus.js"));
app.use("/kick",require("./routes/group/kick.js"));
app.use("/ban",require("./routes/group/ban.js")); long
app.use("/unban",require("./routes/group/unban.js"));
*/
app.listen(process.env.PORT || 3000);

