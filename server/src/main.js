const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use("/connect",require("./routes/account/connect.js"));
app.use("/register",require("./routes/account/register.js"));
app.use("/delete",require("./routes/account/delete.js"));
app.use("/accept",require("./routes/account/accept.js"));

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