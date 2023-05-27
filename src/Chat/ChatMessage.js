import { useContext } from "react";
import { UserContext } from "../Client";
const moment = require('moment');

const ChatMessage = ({ message }) => {
  // current user
  const userInfo = useContext(UserContext);

  const { user, type, chatMessage } = message;
  const selfClass = userInfo.username === user ? "message-chat-self" : "";

  // render bot messages
  if (type === "BOT") {
    return (
      <div className="message message-bot text-center">
        <small>{chatMessage}</small>
      </div>
    );
  }

  return (
    <div className={`message message-chat ${selfClass}`}>
      <p>
        {selfClass === "" ? <small> {user} </small> : <small> You </small>}
        <small>{moment().format("h:m a")}</small>
      </p>
      <p>{chatMessage}</p>
    </div>
  );
};

export default ChatMessage;
