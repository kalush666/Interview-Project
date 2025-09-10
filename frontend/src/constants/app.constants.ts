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
