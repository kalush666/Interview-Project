import {
  ref,
  onValue,
  off,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { realtimeDb } from "../config/firebase.database";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  CHAT_CONFIG,
  HTTP_METHODS,
  HTTP_HEADERS,
  ERROR_MESSAGES,
  FIREBASE_DATABASE,
} from "../constants";
import type { ChatMessage, SendMessageRequest } from "../types/chat.types";
import { AuthService } from "./auth.service";

export class ChatService {
  public static async sendMessage(
    messageData: SendMessageRequest
  ): Promise<ChatMessage> {
    const token = await AuthService.getCurrentUserToken();

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SEND_MESSAGE}`,
      {
        method: HTTP_METHODS.POST,
        headers: {
          [HTTP_HEADERS.CONTENT_TYPE]: HTTP_HEADERS.APPLICATION_JSON,
          [HTTP_HEADERS.AUTHORIZATION]: `${HTTP_HEADERS.BEARER_PREFIX} ${token}`,
        },
        body: JSON.stringify(messageData),
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_SEND_MESSAGE);
    }

    const result = await response.json();
    return result.data;
  }

  public static async getMessages(limit = 50): Promise<ChatMessage[]> {
    const token = await AuthService.getCurrentUserToken();

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.CHAT_MESSAGES}?limit=${limit}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          [HTTP_HEADERS.AUTHORIZATION]: `${HTTP_HEADERS.BEARER_PREFIX} ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_GET_MESSAGES);
    }

    const result = await response.json();
    return result.data.messages;
  }

  public static subscribeToMessages(
    onMessageReceived: (message: ChatMessage) => void,
    onError?: (error: Error) => void
  ): () => void {
    const messagesRef = ref(realtimeDb, CHAT_CONFIG.REALTIME_DB_PATH);

    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messages: ChatMessage[] = Object.values(data)
            .map((msg: any) => ({
              ...msg,
              createdAt: new Date(msg.timestamp),
            }))
            .sort((a, b) => a.timestamp - b.timestamp);

          messages.forEach(onMessageReceived);
        }
      },
      (error) => {
        if (onError) {
          onError(new Error(error.message));
        }
      }
    );

    return () => off(messagesRef, FIREBASE_DATABASE.VALUE_EVENT, unsubscribe);
  }

  public static subscribeToNewMessages(
    onNewMessage: (message: ChatMessage) => void,
    onError?: (error: Error) => void
  ): () => void {
    const messagesRef = ref(realtimeDb, CHAT_CONFIG.REALTIME_DB_PATH);

    const unsubscribe = onValue(
      query(messagesRef, orderByKey(), limitToLast(1)),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const latestMessage = Object.values(data)[0] as any;
          onNewMessage({
            ...latestMessage,
            createdAt: new Date(latestMessage.timestamp),
          });
        }
      },
      (error) => {
        if (onError) {
          onError(new Error(error.message));
        }
      }
    );

    return () => off(messagesRef, FIREBASE_DATABASE.VALUE_EVENT, unsubscribe);
  }
}
