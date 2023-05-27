import { useState, useEffect, createContext } from "react";
import io from "socket.io-client";
import Chat from "./Chat/Chat";
import Home from './Home';

export const UserContext = createContext(null);

const Client = () => {
  let [socket, setSocket] = useState(null);
  let [user, setUser] = useState(null);
  let [roomUsers, setRoomUsers] = useState([]);
  let [messages, setMessages] = useState([]);


  //Initialize Socket
  useEffect(() => {
    if (!socket) initSocket();
  }, [socket]);

  let initSocket = async () => {
    console.log("Initializing socket...");
    await fetch("../server/Server");
    let socket = io("http://localhost:3000/");

    // new chat messages
    socket.on("chat-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // set room users
    socket.on("room-users", (data) => {
        console.log(data.users);
      setRoomUsers(data.users);
    });

    setSocket(socket);
  };

  // On Join
  let onJoin = (user) => {
    setUser(user);
    const { username, room } = user;
    //join room
    socket.emit("join-room", { username, room });
  };

  // On Leave
  let onLeave = () => {
    console.log("leaving...");
    setUser(null);
    setMessages([]);
    setSocket(null);
    socket.disconnect();
  };

  let sendMessage = (msg) => {
    socket.emit("chat-message", msg);
  };

  return (
    <section>
      {!user ? (
        <Home onJoin={onJoin} />
      ) : (
        <UserContext.Provider value={user}>
          <Chat roomUsers={roomUsers} messages={messages} onLeave={onLeave} sendMessage={sendMessage} />
        </UserContext.Provider>
      )}
    </section>
  );
};

export default Client;
