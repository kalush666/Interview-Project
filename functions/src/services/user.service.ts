import { Firestore } from "firebase-admin/firestore";
import { firebaseAdmin } from "../config/firebase";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserProfile,
} from "../types/user.types";
import { FIRESTORE_COLLECTIONS } from "../constants/database.constants";

export class UserService {
  private dataBase: Firestore;

  constructor() {
    this.dataBase = firebaseAdmin.getFirestore();
  }

  public async createUserProfile(
    uid: string,
    userData: CreateUserRequest
  ): Promise<UserProfile> {
    const now = new Date();
    const userProfile: UserProfile = {
      uid,
      email: userData.email,
      displayName: userData.displayName,
      createdAt: now,
      updatedAt: now,
    };

    await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .set(userProfile);
    return userProfile;
  }
  public async getUserProfile(uid: string): Promise<UserProfile | null> {
    const doc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .get();
    return doc.exists ? (doc.data() as UserProfile) : null;
  }

  public async updateUserProfile(
    uid: string,
    updateData: UpdateUserRequest
  ): Promise<UserProfile> {
    const updatePayload = { ...updateData, updatedAt: new Date() };
    await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .update(updatePayload);
    return (await this.getUserProfile(uid)) as UserProfile;
  }

  public async userProfileExists(uid: string): Promise<boolean> {
    const doc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .get();
    return doc.exists;
  }
}
