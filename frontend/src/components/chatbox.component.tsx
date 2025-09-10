import React from "react";
import { useChat } from "../hooks/useChat.hook";
import { MessageList } from "./chat/messages/MessageList.component";
import { MessageInput } from "./chat/messages/MessageInput.component";
import { LOADING_MESSAGES, UI_TEXT, CSS_CLASSES } from "../constants";

export const ChatBox: React.FC = () => {
  const { messages, loading, error, sendMessage } = useChat();

  if (loading) {
    return (
      <div className={CSS_CLASSES.CHAT_LOADING}>
        {LOADING_MESSAGES.LOADING_DATA}
      </div>
    );
  }

  if (error) {
    return (
      <div className={CSS_CLASSES.CHAT_ERROR}>
        {UI_TEXT.ERROR_PREFIX}
        {error}
      </div>
    );
  }

  return (
    <div className={CSS_CLASSES.CHAT_CONTAINER}>
      <div className={CSS_CLASSES.CHAT_HEADER}>
        <h2>{UI_TEXT.CHAT_HEADER_TITLE}</h2>
        <span>{UI_TEXT.MESSAGES_COUNT(messages.length)}</span>
      </div>

      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};
