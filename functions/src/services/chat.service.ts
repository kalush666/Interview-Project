import { firebaseAdmin } from "../config/firebase";
import {
  ChatMessage,
  ChatRoom,
  SendMessageRequest,
  CreateRoomRequest,
  ChatMessagesResponse,
} from "../types/chat.types";
import {
  FIRESTORE_COLLECTIONS,
  REALTIME_DB_PATHS,
  CHAT_CONFIG,
} from "../constants/database.constants";

export class ChatService {
  private db = firebaseAdmin.getFirestore();
  private rtdb = firebaseAdmin.getRealtimeDatabase();

  public async sendMessage(
    userId: string,
    userDisplayName: string,
    messageData: SendMessageRequest
  ): Promise<ChatMessage> {
    const messageRef = this.rtdb.ref(REALTIME_DB_PATHS.MESSAGES).push();
    const messageId = messageRef.key!;
    const message: ChatMessage = {
      id: messageId,
      userId,
      userDisplayName,
      message: messageData.message,
      timestamp: Date.now(),
      createdAt: new Date(),
    };
    await messageRef.set({
      id: messageId,
      userId,
      userDisplayName,
      message: messageData.message,
      timestamp: message.timestamp,
    });
    return message;
  }

  public async getMessages(
    limit: number = CHAT_CONFIG.MAX_MESSAGES_PER_FETCH,
    startAfter?: string
  ): Promise<ChatMessagesResponse> {
    let query = this.rtdb
      .ref(REALTIME_DB_PATHS.MESSAGES)
      .orderByKey()
      .limitToLast(limit);
    if (startAfter) {
      query = query.endBefore(startAfter);
    }
    const snapshot = await query.once("value");
    const messagesData = snapshot.val() || {};
    const messages: ChatMessage[] = Object.values(messagesData)
      .map((msg: any) => ({
        ...msg,
        createdAt: new Date(msg.timestamp),
      }))
      .sort((a, b) => b.timestamp - a.timestamp);
    const hasMore = messages.length === limit;
    const lastKey =
      messages.length > 0 ? messages[messages.length - 1].id : undefined;
    return {
      messages,
      hasMore,
      lastKey,
    };
  }

  public async createRoom(
    roomData: CreateRoomRequest,
    createdBy: string
  ): Promise<ChatRoom> {
    const docRef = this.db.collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS).doc();
    const room: ChatRoom = {
      id: docRef.id,
      name: roomData.name,
      description: roomData.description,
      createdBy,
      createdAt: new Date(),
      participantCount: 0,
    };
    await docRef.set(room);
    return room;
  }

  public async getRooms(): Promise<ChatRoom[]> {
    const snapshot = await this.db
      .collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => doc.data() as ChatRoom);
  }

  public async getRoom(roomId: string): Promise<ChatRoom | null> {
    const doc = await this.db
      .collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS)
      .doc(roomId)
      .get();
    return doc.exists ? (doc.data() as ChatRoom) : null;
  }

  public async initializeDefaultRoom(): Promise<void> {
    const defaultRoom = await this.getRoom(CHAT_CONFIG.DEFAULT_ROOM_ID);
    if (!defaultRoom) {
      await this.db
        .collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS)
        .doc(CHAT_CONFIG.DEFAULT_ROOM_ID)
        .set({
          id: CHAT_CONFIG.DEFAULT_ROOM_ID,
          name: "General Chat",
          description: "Default chat room for all users",
          createdBy: "system",
          createdAt: new Date(),
          participantCount: 0,
        });
    }
  }
}
