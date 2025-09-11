import {initializeApp, getApps} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getDatabase} from "firebase-admin/database";
import {getFirestore} from "firebase-admin/firestore";

class FirebaseAdmin {
  private static instance: FirebaseAdmin;

  public static getInstance(): FirebaseAdmin {
    if (!FirebaseAdmin.instance) {
      FirebaseAdmin.instance = new FirebaseAdmin();
    }
    return FirebaseAdmin.instance;
  }

  public initialize(): void {
    if (getApps().length === 0) {
      initializeApp({
        databaseURL: "https://interview-project-c4b60-default-rtdb.firebaseio.com/",
      });
    }
  }

  public getAuth() {
    this.initialize();
    return getAuth();
  }

  public getFirestore() {
    this.initialize();
    return getFirestore();
  }

  public getRealtimeDatabase() {
    this.initialize();
    return getDatabase();
  }
}

export const firebaseAdmin = FirebaseAdmin.getInstance();
