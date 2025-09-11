import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";
import { FIREBASE_CONFIG_KEYS } from "../constants";

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

let analytics: any = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };

console.log("� Firebase connected to production services");

export default app;
