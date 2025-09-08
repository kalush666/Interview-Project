export const FIRESTORE_COLLECTIONS = {
  USERS: "users",
  CLIENTS: "clients",
  CHAT_ROOMS: "chatRooms",
} as const;
export const REALTIME_DB_PATHS = {
  MESSAGES: "messages",
  ROOM_MESSAGES: (roomId: string) => `messages/${roomId}`,
} as const;

export const CHAT_CONFIG = {
  DEFAULT_ROOM_ID: "general",
  DEFAULT_ROOM_NAME: "General Chat",
  DEFAULT_ROOM_DESCRIPTION: "Default chat room for all users",
  DEFAULT_ROOM_CREATED_BY: "system",
  MAX_MESSAGE_LENGTH: 1000,
  MAX_MESSAGES_PER_FETCH: 50,
} as const;

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_MESSAGE_LENGTH: 1,
  MAX_MESSAGE_LENGTH: 1000,
} as const;
