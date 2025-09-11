export const FIREBASE_CONFIG_KEYS = {
  API_KEY: "VITE_FIREBASE_API_KEY",
  AUTH_DOMAIN: "VITE_FIREBASE_AUTH_DOMAIN",
  DATABASE_URL: "VITE_FIREBASE_DATABASE_URL",
  PROJECT_ID: "VITE_FIREBASE_PROJECT_ID",
  STORAGE_BUCKET: "VITE_FIREBASE_STORAGE_BUCKET",
  MESSAGING_SENDER_ID: "VITE_FIREBASE_MESSAGING_SENDER_ID",
  APP_ID: "VITE_FIREBASE_APP_ID",
  MEASUREMENT_ID: "VITE_FIREBASE_MEASUREMENT_ID",
} as const;

export const FIREBASE_EMULATOR_CONFIG = {
  AUTH: {
    HOST: "localhost",
    PORT: 9099,
    URL: "http://localhost:9099",
  },
  FIRESTORE: {
    HOST: "localhost",
    PORT: 8888,
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
