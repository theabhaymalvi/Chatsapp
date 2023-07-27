import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../Client";
import ChatMessage from "./ChatMessage";

const Chat = ({roomUsers, messages, onLeave, sendMessage}) => {
  let [message,setMessage] = useState("");
  let [file, setFile] = useState(null);
  const userInfo = useContext(UserContext);

  const fileInputRef = useRef(null);
  const ChatContainerRef = useRef(null);
  const chatDiv = document.querySelector(".chat-messages");

  useEffect(() => {
    if (ChatContainerRef.current) {
      ChatContainerRef.current.scrollTop = ChatContainerRef.current.scrollHeight;
    }
  },[messages]);

  const handleClick = () => {
    // Programmatically trigger the click event on the hidden file input
    fileInputRef.current.click();
  };

  const selectFile = (e) => {
    setMessage(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msgText = message.trim();
    const username = userInfo ? userInfo.username : "";

    // console.log(file);
    if(file)
    {
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result);
        const msgObj = {
          user: username,
          type: "FILE",
          fileUrl: reader.result,
          fileName: file.name,
        };
        // console.log(file.type);
        if(file.type.startsWith("image/"))
        msgObj.type = "IMAGE";
        else if(file.type.startsWith("video/"))
        msgObj.type = "VIDEO";
        sendMessage(msgObj);
        setFile();
        setMessage("");
      };
      reader.readAsDataURL(file);
    }
    else if(msgText != "")
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
        <div class="chat-messages" ref={ChatContainerRef}>
        {messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}
        <div />
        </div >
      </main>
      <div class="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <img src="/clip.png" class="attachment" onClick={handleClick} style={{ cursor: 'pointer' }}/>
          <i class='fa fa-paperclip'></i> 
          <input type="file" ref={fileInputRef} onChange={selectFile} style={{display: 'none'}} />
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={message}
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
