import React, { useEffect, useRef } from "react";
import type { ChatMessage } from "../../../types/chat.types";
import { useAuth } from "../../../hooks/useAuth.hook";
import { CSS_CLASSES, SCROLL_BEHAVIOR } from "../../../constants";

interface MessageListProps {
  messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: SCROLL_BEHAVIOR.SMOOTH,
    });
  }, [messages]);

  return (
    <div className={CSS_CLASSES.MESSAGES_CONTAINER}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${CSS_CLASSES.MESSAGE} ${
            message.userId === user?.uid
              ? CSS_CLASSES.OWN_MESSAGE
              : CSS_CLASSES.OTHER_MESSAGE
          }`}
        >
          <div className={CSS_CLASSES.MESSAGE_HEADER}>
            <span className={CSS_CLASSES.USER_NAME}>
              {message.userDisplayName}
            </span>
            <span className={CSS_CLASSES.TIMESTAMP}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className={CSS_CLASSES.MESSAGE_CONTENT}>{message.message}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
