import React, { useState } from "react";
import {
  CHAT_CONFIG,
  CSS_CLASSES,
  UI_TEXT,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
} from "../../../constants";

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || sending) return;

    try {
      setSending(true);
      await onSendMessage(message.trim());
      setMessage("");
    } catch (error) {
      console.error(ERROR_MESSAGES.FAILED_TO_SEND_MESSAGE, error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={CSS_CLASSES.MESSAGE_INPUT_FORM}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={UI_TEXT.MESSAGE_PLACEHOLDER}
        maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
        disabled={sending}
        className={CSS_CLASSES.MESSAGE_INPUT}
      />
      <button
        type="submit"
        disabled={!message.trim() || sending}
        className={CSS_CLASSES.SEND_BUTTON}
      >
        {sending ? LOADING_MESSAGES.SENDING_MESSAGE : UI_TEXT.SEND_BUTTON_TEXT}
      </button>
    </form>
  );
};
