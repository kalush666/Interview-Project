import { Firestore } from "firebase-admin/firestore";
import { firebaseAdmin } from "../config/firebase";
import { UserProfile } from "../types/user.types";
import { FIRESTORE_COLLECTIONS } from "../constants/database.constants";
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  GetUserProfileDto,
} from "../dto";

export class UserService {
  private dataBase: Firestore;

  constructor() {
    this.dataBase = firebaseAdmin.getFirestore();
  }

  public async createUserProfile(
    dto: CreateUserProfileDto
  ): Promise<UserProfile> {
    const now = new Date();
    const userProfile: UserProfile = {
      uid: dto.uid,
      email: dto.email,
      displayName: dto.displayName,
      createdAt: now,
      updatedAt: now,
    };

    await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(dto.uid)
      .set(userProfile);
    return userProfile;
  }
  public async getUserProfile(
    dto: GetUserProfileDto
  ): Promise<UserProfile | null> {
    const doc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(dto.uid)
      .get();
    return doc.exists ? (doc.data() as UserProfile) : null;
  }

  public async updateUserProfile(
    dto: UpdateUserProfileDto
  ): Promise<UserProfile> {
    const updatePayload = {
      displayName: dto.displayName,
      updatedAt: new Date(),
    };
    await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(dto.uid)
      .update(updatePayload);
    return (await this.getUserProfile({ uid: dto.uid })) as UserProfile;
  }

  public async userProfileExists(uid: string): Promise<boolean> {
    const doc = await this.dataBase
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .get();
    return doc.exists;
  }
}
