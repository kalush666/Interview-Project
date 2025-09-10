export interface ChatMessage {
  id: string;
  userId: string;
  userDisplayName: string;
  message: string;
  timestamp: number;
  createdAt: Date;
}

export interface SendMessageRequest {
  message: string;
}
