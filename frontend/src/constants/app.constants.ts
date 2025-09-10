export const APP_CONFIG = {
  NAME: "Interview Project",
  VERSION: "1.0.0",
  DESCRIPTION: "Firebase Functions Backend with React Frontend",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CHAT: "/chat",
  CLIENTS: "/clients",
  PROFILE: "/profile",
} as const;

export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5001",
  USERS: "/users",
  CLIENTS: "/clients",
  CHAT: "/chat",
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
