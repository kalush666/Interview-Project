import { useState, useEffect, useCallback } from "react";
import type { ChatMessage } from "../types/chat.types";
import { ChatService } from "../services/chat.service";
import { ERROR_MESSAGES } from "../constants";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const initialMessages = await ChatService.getMessages();
        setMessages(initialMessages);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : ERROR_MESSAGES.FAILED_TO_GET_MESSAGES
        );
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const unsubscribe = ChatService.subscribeToNewMessages(
      (newMessage) => {
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === newMessage.id);
          if (exists) return prev;

          return [...prev, newMessage].sort(
            (a, b) => a.timestamp - b.timestamp
          );
        });
      },
      (error) => {
        setError(error.message);
      }
    );

    return unsubscribe;
  }, []);

  const sendMessage = useCallback(async (messageText: string) => {
    try {
      await ChatService.sendMessage({ message: messageText });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : ERROR_MESSAGES.FAILED_TO_SEND_MESSAGE
      );
      throw err;
    }
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
};
