export interface SendMessageDto {
  userId: string;
  userDisplayName: string;
  message: string;
}

export interface GetMessagesDto {
  limit?: number;
  startAfter?: string;
}

export interface CreateRoomDto {
  name: string;
  description?: string;
  createdBy: string;
}

export interface GetRoomDto {
  roomId: string;
}
