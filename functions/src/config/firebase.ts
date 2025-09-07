import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

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
      initializeApp();
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
}

export const firebaseAdmin = FirebaseAdmin.getInstance();
