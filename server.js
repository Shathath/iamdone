const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/configDB");
const jwt = require("jsonwebtoken");
const userRouter = require("./server_routes/userroutes");
const todoRouter = require("./server_routes/todoroutes");
const projectRouter = require("./server_routes/projectRoute");
const meetingRouter = require("./server_routes/meetingRoutes");
const SocketIO = require("socket.io");
const http = require("http");
//const { prependListener } = require("process");


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.use(todoRouter)
app.use(userRouter);
app.use(projectRouter);


const port = process.env.PORT || 5000;
//const http = require('http');
const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("change color", (color) => {
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("I'm listening", port);
});
