const express = require("express");
const { userJoin, userLeave, getCurUser, roomUsers } = require("./src/users");
const {createServer} = require("http");
const path = require('path');

const app = express();
const server = createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});

// Set static folder
app.use(express.static(path.join(__dirname, 'build')));

console.log("Server is starting...");

// When new user connects
io.on("connection", (socket) => {
  // join room
  socket.on("join-room", ({ username, room }) => {
    socket.join(room);
    console.log("New user joined...");
    // add user to users list
    userJoin(socket.id, username, room);

    // send to joined user
    socket.emit("chat-message", {
      user: username,
      type: "BOT",
      chatMessage: `Welcome to ChatsApp, ${username}`,
    });

    // broadcast message to others
    socket.broadcast.to(room).emit("chat-message", {
      user: username,
      type: "BOT",
      chatMessage: `${username} has joined room.`,
    });

    io.to(room).emit("room-users", {
      room: room,
      users: roomUsers(room),
    });
  });

  // listen Chat message
  socket.on("chat-message", (message) => {
    let cur_user = getCurUser(socket.id);
    const { room } = cur_user;

    io.to(room).emit("chat-message", message);
  });

  // User disconnects
  socket.on("disconnect", () => {
    let cur_user = getCurUser(socket.id);

    if (cur_user) {
      let { id, username, room } = cur_user;
      io.to(room).emit("chat-message", {
        user: username,
        type: "BOT",
        chatMessage: `${username} has left the room.`,
      });
      //remove user
      userLeave(id);

      io.to(room).emit("room-users", {
        room: room,
        users: roomUsers(room),
      });
    }
  });
});

const port = 3000; // Choose your desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});