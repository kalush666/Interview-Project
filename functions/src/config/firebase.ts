import { initializeApp } from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as FirebaseAdmin from "firebase-admin";

class FireBaseAdmin {
  private static instance: FireBaseAdmin;

  public static getInstance(): FireBaseAdmin {
    if (!FireBaseAdmin.instance) {
      FireBaseAdmin.instance = new FireBaseAdmin();
    }
    return FireBaseAdmin.instance;
  }

  public initialize(): void {
    if (getApps().length === 0) {
      initializeApp();
    }
  }

  public getAuth(): FirebaseAdmin.auth.Auth {
    this.initialize();
    return getAuth();
  }
}
export const fireBaseAdmin = FireBaseAdmin.getInstance();
