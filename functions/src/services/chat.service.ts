import {firebaseAdmin} from "../config/firebase";
import {
  ChatMessage,
  ChatRoom,
  ChatMessagesResponse,
} from "../types/chat.types";
import {
  FIRESTORE_COLLECTIONS,
  REALTIME_DB_PATHS,
  CHAT_CONFIG,
} from "../constants/database.constants";
import {
  SendMessageDto,
  GetMessagesDto,
  CreateRoomDto,
  GetRoomDto,
} from "../dto";

export class ChatService {
  private db = firebaseAdmin.getFirestore();
  private rtdb = firebaseAdmin.getRealtimeDatabase();

  public async sendMessage(dto: SendMessageDto): Promise<ChatMessage> {
    const messageRef = this.rtdb.ref(REALTIME_DB_PATHS.MESSAGES).push();
    const messageId = messageRef.key!;
    const message: ChatMessage = {
      id: messageId,
      userId: dto.userId,
      userDisplayName: dto.userDisplayName,
      message: dto.message,
      timestamp: Date.now(),
      createdAt: new Date(),
    };
    await messageRef.set({
      id: messageId,
      userId: dto.userId,
      userDisplayName: dto.userDisplayName,
      message: dto.message,
      timestamp: message.timestamp,
    });
    return message;
  }

  public async getMessages(dto: GetMessagesDto): Promise<ChatMessagesResponse> {
    const limit = dto.limit || CHAT_CONFIG.MAX_MESSAGES_PER_FETCH;
    let query = this.rtdb
      .ref(REALTIME_DB_PATHS.MESSAGES)
      .orderByKey()
      .limitToLast(limit);
    if (dto.startAfter) {
      query = query.endAt(dto.startAfter);
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

  public async createRoom(dto: CreateRoomDto): Promise<ChatRoom> {
    const docRef = this.db.collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS).doc();
    const room: ChatRoom = {
      id: docRef.id,
      name: dto.name || CHAT_CONFIG.DEFAULT_ROOM_NAME,
      description: dto.description || CHAT_CONFIG.DEFAULT_ROOM_DESCRIPTION,
      createdBy: dto.createdBy || CHAT_CONFIG.DEFAULT_ROOM_CREATED_BY,
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

  public async getRoom(dto: GetRoomDto): Promise<ChatRoom | null> {
    const doc = await this.db
      .collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS)
      .doc(dto.roomId)
      .get();
    return doc.exists ? (doc.data() as ChatRoom) : null;
  }

  public async initializeDefaultRoom(): Promise<void> {
    const defaultRoom = await this.getRoom({
      roomId: CHAT_CONFIG.DEFAULT_ROOM_ID,
    });
    if (!defaultRoom) {
      await this.db
        .collection(FIRESTORE_COLLECTIONS.CHAT_ROOMS)
        .doc(CHAT_CONFIG.DEFAULT_ROOM_ID)
        .set({
          id: CHAT_CONFIG.DEFAULT_ROOM_ID,
          name: CHAT_CONFIG.DEFAULT_ROOM_NAME,
          description: CHAT_CONFIG.DEFAULT_ROOM_DESCRIPTION,
          createdBy: CHAT_CONFIG.DEFAULT_ROOM_CREATED_BY,
          createdAt: new Date(),
          participantCount: 0,
        });
    }
  }
}
