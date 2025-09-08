export const API_ENDPOINTS = {
  USER_PROFILE: "/api/user/profile",

  CLIENTS: "/api/clients",
  CLIENT_BY_ID: "/api/clients/:id",

  CHAT_ROOMS: "/api/chat/rooms",
  CHAT_MESSAGES: "/api/chat/messages",
  SEND_MESSAGE: "/api/chat/send",
} as const;
