export interface ChatMessage {
  id: string;
  userId: string;
  userDisplayName: string;
  message: string;
  timestamp: number;
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  lastMessage?: {
    text: string;
    timestamp: number;
    userId: string;
  };
  participantCount: number;
}

export interface SendMessageRequest {
  message: string;
}

export interface CreateRoomRequest {
  name: string;
  description?: string;
}

export interface ChatMessagesResponse {
  messages: ChatMessage[];
  hasMore: boolean;
  lastKey?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
