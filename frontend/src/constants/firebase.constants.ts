export const FIREBASE_CONFIG_KEYS = {
  API_KEY: "REACT_APP_FIREBASE_API_KEY",
  AUTH_DOMAIN: "REACT_APP_FIREBASE_AUTH_DOMAIN",
  DATABASE_URL: "REACT_APP_FIREBASE_DATABASE_URL",
  PROJECT_ID: "REACT_APP_FIREBASE_PROJECT_ID",
  STORAGE_BUCKET: "REACT_APP_FIREBASE_STORAGE_BUCKET",
  MESSAGING_SENDER_ID: "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  APP_ID: "REACT_APP_FIREBASE_APP_ID",
  MEASUREMENT_ID: "REACT_APP_FIREBASE_MEASUREMENT_ID",
} as const;

export const FIREBASE_EMULATOR_CONFIG = {
  AUTH: {
    HOST: "localhost",
    PORT: 9099,
    URL: "http://localhost:9099",
  },
  FIRESTORE: {
    HOST: "localhost",
    PORT: 8080,
  },
  DATABASE: {
    HOST: "localhost",
    PORT: 9000,
  },
} as const;

export const ENVIRONMENT = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
} as const;

export const FIREBASE_SERVICES = {
  AUTH: "auth",
  FIRESTORE: "firestore",
  DATABASE: "database",
  ANALYTICS: "analytics",
} as const;
