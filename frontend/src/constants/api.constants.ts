export const API_BASE_URL = "https://us-central1-interview-project-c4b60.cloudfunctions.net/api";

export const API_ENDPOINTS = {
  USER_PROFILE: "/users/profile",
  CLIENTS: "/clients",
  CLIENT_BY_ID: (clientId: string) => `/clients/${clientId}`,
  CHAT_MESSAGES: "/chat/messages",
  SEND_MESSAGE: "/chat/send",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CHAT: "/chat",
  CLIENTS: "/clients",
  PROFILE: "/profile",
} as const;

export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 1000,
  REALTIME_DB_PATH: "messages",
} as const;
