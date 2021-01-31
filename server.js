const express = require("express");
const app = express();
const server = require("http").Server(app); //http module is bulit in js so we dont have to npm install
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs"); // 화면 node.js express engine을 ejs로 설정
app.use(express.static("public"));
app.get("/", (req, res) => {
  //res.status(200).send("Hello world");
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});
server.listen(3030);
