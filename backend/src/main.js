const express = require("express");
const app = express();

const chat = [];

app.use(express.json());
app.use("/connect",require("./routes/account/connect.js"));
app.use("/register",require("./routes/account/register.js"));
app.use("/delete",require("./routes/account/delete.js"));
//app.use("/delete",require("./routes/account/disconnected.js"));

app.use("/creation",require("./routes/group/creation.js"));
/*
app.use("/chat",require("./routes/group/invitation.js"));
app.use("/chat",require("./routes/group/deletion.js"));
app.use("/chat",require("./routes/group/chat.js"));
app.use("/chat",require("./routes/group/suppresion.js"));
app.use("/chat",require("./routes/group/addPoll.js"));
app.use("/chat",require("./routes/group/addList.js"));
*/
app.listen(process.env.PORT || 3000);

