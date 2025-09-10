import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import {
  FIREBASE_CONFIG_KEYS,
  FIREBASE_EMULATOR_CONFIG,
  ENVIRONMENT,
  ERROR_MESSAGES,
} from "../constants";

const firebaseConfig = {
  apiKey: import.meta.env[FIREBASE_CONFIG_KEYS.API_KEY] || "",
  authDomain: import.meta.env[FIREBASE_CONFIG_KEYS.AUTH_DOMAIN] || "",
  databaseURL: import.meta.env[FIREBASE_CONFIG_KEYS.DATABASE_URL] || "",
  projectId: import.meta.env[FIREBASE_CONFIG_KEYS.PROJECT_ID] || "",
  storageBucket: import.meta.env[FIREBASE_CONFIG_KEYS.STORAGE_BUCKET] || "",
  messagingSenderId:
    import.meta.env[FIREBASE_CONFIG_KEYS.MESSAGING_SENDER_ID] || "",
  appId: import.meta.env[FIREBASE_CONFIG_KEYS.APP_ID] || "",
  measurementId: import.meta.env[FIREBASE_CONFIG_KEYS.MEASUREMENT_ID] || "",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const analytics = getAnalytics(app);

if (import.meta.env.VITE_NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
  try {
    connectAuthEmulator(auth, FIREBASE_EMULATOR_CONFIG.AUTH.URL);
    connectFirestoreEmulator(
      firestore,
      FIREBASE_EMULATOR_CONFIG.FIRESTORE.HOST,
      FIREBASE_EMULATOR_CONFIG.FIRESTORE.PORT
    );
    connectDatabaseEmulator(
      realtimeDb,
      FIREBASE_EMULATOR_CONFIG.DATABASE.HOST,
      FIREBASE_EMULATOR_CONFIG.DATABASE.PORT
    );
  } catch (error) {
    console.warn(ERROR_MESSAGES.FIREBASE_EMULATOR_WARNING);
  }
}

export default app;
