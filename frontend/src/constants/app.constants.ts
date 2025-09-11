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
  CONFIRM_PASSWORD_PLACEHOLDER: "Confirm Password",
  NAME_PLACEHOLDER: "Full Name",
  NO_ACCOUNT_TEXT: "Don't have an account?",
  HAVE_ACCOUNT_TEXT: "Already have an account?",
  LOGOUT_BUTTON_TEXT: "Logout",
  CHAT_PAGE_TITLE: "Chat Room",
  DASHBOARD_PAGE_TITLE: "Dashboard",
  CLIENTS_PAGE_TITLE: "Clients",
  LOADING_TEXT: "Loading...",
} as const;

export const CSS_CLASSES = {
  APP: "app",
  LOADING: "loading",
  SPINNER: "spinner",
  
  NAV: "nav",
  NAV_CONTAINER: "nav-container",
  NAV_BRAND: "nav-brand",
  NAV_MENU: "nav-menu",
  NAV_LINK: "nav-link",
  NAV_ACTIVE: "active",
  
  MAIN: "main",
  CONTAINER: "container",
  CONTAINER_SM: "container-sm",
  CONTAINER_XS: "container-xs",
  
  CARD: "card",
  CARD_ELEVATED: "card-elevated",
  
  BTN: "btn",
  BTN_PRIMARY: "btn-primary",
  BTN_SECONDARY: "btn-secondary",
  BTN_SUCCESS: "btn-success",
  BTN_WARNING: "btn-warning",
  BTN_ERROR: "btn-error",
  BTN_OUTLINE: "btn-outline",
  BTN_GHOST: "btn-ghost",
  BTN_SM: "btn-sm",
  BTN_LG: "btn-lg",
  BTN_FULL: "btn-full",
  
  FORM_GROUP: "form-group",
  FORM_CONTROL: "form-control",
  ERROR_MESSAGE: "error-message",
  SUCCESS_MESSAGE: "success-message",
  
  AUTH_CONTAINER: "auth-container",
  AUTH_CARD: "auth-card",
  AUTH_HEADER: "auth-header",
  AUTH_TITLE: "auth-title",
  AUTH_SUBTITLE: "auth-subtitle",
  AUTH_FORM: "auth-form",
  AUTH_FOOTER: "auth-footer",
  AUTH_SWITCH: "auth-switch",
  AUTH_SWITCH_LINK: "auth-switch-link",
  AUTH_ERROR: "error-message",
  AUTH_PAGE: "auth-container",
  LOGIN_FORM: "auth-form",
  REGISTER_FORM: "auth-form",
  
  DASHBOARD: "dashboard",
  DASHBOARD_HEADER: "dashboard-header",
  DASHBOARD_TITLE: "dashboard-title",
  DASHBOARD_SUBTITLE: "dashboard-subtitle",
  DASHBOARD_GRID: "dashboard-grid",
  DASHBOARD_CARD: "dashboard-card",
  DASHBOARD_CARD_ICON: "dashboard-card-icon",
  DASHBOARD_CARD_TITLE: "dashboard-card-title",
  DASHBOARD_CARD_DESCRIPTION: "dashboard-card-description",
  DASHBOARD_PAGE: "dashboard",
  
  CHAT_CONTAINER: "chat-container",
  CHAT_HEADER: "chat-header",
  CHAT_TITLE: "chat-title",
  CHAT_MESSAGES: "chat-messages",
  CHAT_INPUT: "chat-input",
  CHAT_INPUT_FORM: "chat-input-form",
  CHAT_INPUT_FIELD: "chat-input-field",
  CHAT_INPUT_BUTTON: "chat-input-button",
  CHAT_PAGE: "chat-container",
  CHAT_LOADING: "loading",
  CHAT_ERROR: "error-message",
  
  MESSAGE: "message",
  MESSAGE_OWN: "own",
  MESSAGE_OTHER: "other",
  MESSAGE_CONTENT: "message-content",
  MESSAGE_TIMESTAMP: "message-timestamp",
  MESSAGE_INPUT_FORM: "chat-input-form",
  MESSAGE_INPUT: "chat-input-field",
  SEND_BUTTON: "chat-input-button",
  MESSAGES_CONTAINER: "chat-messages",
  OWN_MESSAGE: "message own",
  OTHER_MESSAGE: "message other",
  MESSAGE_HEADER: "message-header",
  USER_NAME: "user-name",
  TIMESTAMP: "message-timestamp",
  
  CLIENTS_PAGE: "clients-page",
  CLIENTS_HEADER: "clients-header",
  CLIENTS_TITLE: "clients-title",
  CLIENTS_LIST: "clients-list",
  CLIENT_CARD: "client-card",
  CLIENT_NAME: "client-name",
  CLIENT_EMAIL: "client-email",
  CLIENT_ACTIONS: "client-actions",
  
  PAGE_HEADER: "page-header",
  PAGE_MAIN: "page-main",
  LOGOUT_BUTTON: "btn btn-secondary",
  
  ALERT: "alert",
  ALERT_SUCCESS: "alert-success",
  ALERT_ERROR: "alert-error",
  ALERT_WARNING: "alert-warning",
  ALERT_INFO: "alert-info",
  
  FLEX: "flex",
  FLEX_CENTER: "flex-center",
  FLEX_BETWEEN: "flex-between",
  FLEX_COLUMN: "flex-column",
  FLEX_WRAP: "flex-wrap",
  
  GRID: "grid",
  HIDDEN: "hidden",
  VISIBLE: "visible",
  
  TEXT_CENTER: "text-center",
  TEXT_LEFT: "text-left",
  TEXT_RIGHT: "text-right",
  TEXT_PRIMARY: "text-primary",
  TEXT_SECONDARY: "text-secondary",
  TEXT_SUCCESS: "text-success",
  TEXT_WARNING: "text-warning",
  TEXT_ERROR: "text-error",
  TEXT_WHITE: "text-white",
  
  BG_PRIMARY: "bg-primary",
  BG_SECONDARY: "bg-secondary",
  BG_LIGHT: "bg-light",
  BG_DARK: "bg-dark",
  
  SHADOW_LIGHT: "shadow-light",
  SHADOW_MEDIUM: "shadow-medium",
  SHADOW_HEAVY: "shadow-heavy",
  
  ROUNDED: "rounded",
  ROUNDED_SM: "rounded-sm",
  ROUNDED_LG: "rounded-lg",
  ROUNDED_XL: "rounded-xl",
  ROUNDED_FULL: "rounded-full",
} as const;

export const SCROLL_BEHAVIOR = {
  SMOOTH: "smooth" as ScrollBehavior,
  AUTO: "auto" as ScrollBehavior,
  INSTANT: "instant" as ScrollBehavior,
} as const;
