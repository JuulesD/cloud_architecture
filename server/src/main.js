const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

const { router } = require("./routes/account/connect.js")();

app.use("/connect",router);
app.use("/register",require("./routes/account/register.js"));
app.use("/delete",require("./routes/account/delete.js"));
app.use("/accept",require("./routes/account/accept.js"));
app.use("/changeInfos",require("./routes/account/changeInfos.js"));

app.use("/getGroupInfos",require("./routes/group/getGroupInfos.js"));
app.use("/getUserGroups",require("./routes/account/getUserGroups.js"));
app.use("/getUserInfos",require("./routes/account/getUserInfos.js"));
app.use("/getUserWaitingsInfos",require("./routes/account/getUserWaitingsInfos.js"));
app.use("/getMembersName",require("./routes/group/getMembersName.js"));

app.use("/creation",require("./routes/group/creation.js"));
app.use("/invitation",require("./routes/group/invitation.js"));
app.use("/addToList",require("./routes/group/addToList.js"));
app.use("/deleteFromList",require("./routes/group/deleteFromList.js"));
app.use("/deleteElementFromList",require("./routes/group/deleteElementFromList.js"));
app.use("/addPoll",require("./routes/group/addPoll.js"));
app.use("/vote",require("./routes/group/vote.js"));
app.use("/leave",require("./routes/group/leave.js"));
app.use("/changeStatus",require("./routes/group/changeStatus.js"));

app.listen(process.env.PORT || 3000);
