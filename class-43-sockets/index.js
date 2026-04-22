const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

// this io is responsible for handling all the socket connections
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id + " connected");
  // socket.emit("message", "Socket ID" + socket.id + " at " + new Date());

  // Send a message to the client every 2 seconds
  // setInterval(() => {
  //   socket.emit(
  //     "message",
  //     "message from server = " + socket.id + " at " + new Date()
  //   );
  // }, 2000);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected" + socket.id);
  });
});

server.listen(5001, () => console.log("Listening at 5001"));