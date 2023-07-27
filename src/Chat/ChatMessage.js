import { useContext } from "react";
import { UserContext } from "../Client";
const moment = require('moment');

const ChatMessage = ({ message }) => {
  // current user
  const userInfo = useContext(UserContext);

  const { user, type, chatMessage, fileUrl, fileName } = message;
  const selfClass = userInfo.username === user ? "message-chat-self" : "";

  // render bot messages
  if (type === "BOT") {
    return (
      <div className="message message-bot text-center">
        <small>{chatMessage}</small>
      </div>
    );
  }

  const renderFileMsg = () => {
    switch(type)
    {
      case "IMAGE":
        return(<div className={`message message-chat message-media ${selfClass}`}>
            <img
                className="chat-image"
                src={fileUrl}
            />
        </div>);
      case "VIDEO":
        return (
          <div
              className={`message message-chat message-media ${selfClass}`}>
              <video className="chat-video" controls>
                  <source src={fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
          </div>
      );

      case "FILE":
        return (
            <div
                className={`message message-chat message-media ${selfClass}`}>
                <a className="chat-file" href={fileUrl} target="_blank">
                    <i className="fa fa-file fa-2x mr-2"></i>
                    <span>{fileName}</span>
                </a>
            </div>
        );
    }
  };

  return (
    <div className={`message message-chat ${selfClass}`}>
      <p>
        {selfClass === "" ? <small> {user} </small> : <small> You </small>}
        <small>{moment().format("h:m a")}</small>
      </p>
      {type === 'TEXT' ? <p>{chatMessage}</p> : renderFileMsg()}
    </div>
  );
};

export default ChatMessage;
