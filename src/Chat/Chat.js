import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../Client";
import ChatMessage from "./ChatMessage";

const Chat = ({roomUsers, messages, onLeave, sendMessage}) => {
  let [message,setMessage] = useState("");
  const userInfo = useContext(UserContext);

  const ChatContainerEndRef = useRef(null);
  const chatDiv = document.querySelector(".chat-messages");

  const handleSubmit = (e) => {
    e.preventDefault();
    const msgText = message.trim();
    const username = userInfo ? userInfo.username : "";
    ChatContainerEndRef.current.scrollIntoView({ behavior: "smooth" });
    chatDiv.scrollTop = chatDiv.scrollHeight;

    if(msgText != "")
    {
      sendMessage({
        user: username,
        type: "TEXT",
        chatMessage: msgText,
      });
      setMessage("");
    }
  }

  return (
    <div class="chat-container">
      <header class="chat-header">
        <h1>
          <img src="/WhatsApp_icon.png" className='main-icon' /> ChatsApp
        </h1>
        <button className='btn' onClick={onLeave}> Leave Room </button>
      </header>
      <main class="chat-main">
        <div class="chat-sidebar">
          <h3>
          <img src="/chats.png" className='icon' /> Room Name:
          </h3>
          <h2 id="room-name"> {userInfo.room} </h2>
          <h3>
          <img src="/group.png" className='icon' /> Users
          </h3>
          <ul id="users">
          {roomUsers.map(user => {
            return <li key={user.id}> {user.username} </li>
          })}
          </ul>
        </div>
        <div class="chat-messages">
        {messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}
        <div ref={ChatContainerEndRef} />
        </div >
      </main>
      <div class="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={message}
            required
            autocomplete="off"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" class="btn">
            <i class="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
