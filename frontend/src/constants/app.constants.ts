export const APP_CONFIG = {
  NAME: "Interview Project",
  VERSION: "1.0.0",
  DESCRIPTION: "Firebase Functions Backend with React Frontend",
} as const;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const HTTP_HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
  APPLICATION_JSON: "application/json",
  BEARER_PREFIX: "Bearer",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_MESSAGE_LENGTH: 1,
  MAX_MESSAGE_LENGTH: 1000,
  MIN_PASSWORD_LENGTH: 6,
} as const;

export const FIREBASE_DATABASE = {
  VALUE_EVENT: "value",
} as const;

export const AUTH_CONSTANTS = {
  REFRESH_TOKEN: true,
  FORCE_REFRESH: false,
} as const;

export const USER_STATES = {
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
  LOADING: "loading",
} as const;

export const UI_TEXT = {
  CHAT_HEADER_TITLE: "Global Chat Room",
  ERROR_PREFIX: "Error: ",
  MESSAGES_COUNT: (count: number) => `${count} messages`,
  MESSAGE_PLACEHOLDER: "Type your message...",
  SEND_BUTTON_TEXT: "Send",
  LOGIN_TITLE: "Login",
  LOGIN_BUTTON_TEXT: "Login",
  REGISTER_TITLE: "Register",
  REGISTER_BUTTON_TEXT: "Register",
  EMAIL_PLACEHOLDER: "Email",
  PASSWORD_PLACEHOLDER: "Password",
  NO_ACCOUNT_TEXT: "Don't have an account?",
  HAVE_ACCOUNT_TEXT: "Already have an account?",
  LOGOUT_BUTTON_TEXT: "Logout",
  CHAT_PAGE_TITLE: "Chat Room",
  DASHBOARD_PAGE_TITLE: "Dashboard",
  CLIENTS_PAGE_TITLE: "Clients",
  LOADING_TEXT: "Loading...",
} as const;

export const CSS_CLASSES = {
  CHAT_CONTAINER: "chat-container",
  CHAT_HEADER: "chat-header",
  CHAT_LOADING: "chat-loading",
  CHAT_ERROR: "chat-error",
  MESSAGES_CONTAINER: "messages-container",
  MESSAGE: "message",
  OWN_MESSAGE: "own-message",
  OTHER_MESSAGE: "other-message",
  MESSAGE_HEADER: "message-header",
  USER_NAME: "user-name",
  TIMESTAMP: "timestamp",
  MESSAGE_CONTENT: "message-content",
  MESSAGE_INPUT_FORM: "message-input-form",
  MESSAGE_INPUT: "message-input",
  SEND_BUTTON: "send-button",
  LOGIN_FORM: "login-form",
  AUTH_ERROR: "error",
  AUTH_FORM: "auth-form",
  AUTH_INPUT: "auth-input",
  AUTH_BUTTON: "auth-button",
  AUTH_LINK: "auth-link",
  APP: "app",
  LOADING: "loading",
  CHAT_PAGE: "chat-page",
  PAGE_HEADER: "page-header",
  PAGE_MAIN: "page-main",
  LOGOUT_BUTTON: "logout-btn",
  DASHBOARD_PAGE: "dashboard-page",
  CLIENTS_PAGE: "clients-page",
  AUTH_PAGE: "auth-page",
} as const;

export const SCROLL_BEHAVIOR = {
  SMOOTH: "smooth" as ScrollBehavior,
  AUTO: "auto" as ScrollBehavior,
  INSTANT: "instant" as ScrollBehavior,
} as const;
