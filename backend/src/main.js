const express = require("express");
const app = express();

const chat = [];

app.use(express.json());
app.use("/connect",require("./routes/account/connect.js"));
app.use("/register",require("./routes/account/register.js"));
app.use("/delete",require("./routes/account/delete.js"));
//app.use("/delete",require("./routes/account/disconnected.js"));

app.use("/creation",require("./routes/group/creation.js"));
app.use("/invitation",require("./routes/group/invitation.js"));
/*
app.use("/accept",require("./routes/group/accept.js"));
app.use("/deletion",require("./routes/group/deletion.js"));
app.use("/chat",require("./routes/group/chat.js"));
app.use("/suppresion",require("./routes/group/suppresion.js"));
app.use("/addPoll",require("./routes/group/addPoll.js"));
app.use("/addPoll",require("./routes/group/vote.js"));
app.use("/addList",require("./routes/group/addList.js"));
app.use("/modifyList",require("./routes/group/modifyList.js"));
app.use("/addPoll",require("./routes/group/leave.js"));

app.use("/changeStatus",require("./routes/group/changeStatus.js"));
app.use("/kick",require("./routes/group/kick.js"));
app.use("/ban",require("./routes/group/ban.js"));
app.use("/unban",require("./routes/group/unban.js"));
*/
app.listen(process.env.PORT || 3000);

