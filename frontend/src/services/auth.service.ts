import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../config/firebase.database";
import { AUTH_CONSTANTS, ERROR_MESSAGES } from "../constants";

export class AuthService {
  public static async login(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.LOGIN_FAILED);
    }
  }

  public static async register(
    email: string,
    password: string,
    displayName?: string
  ): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (displayName && result.user) {
        await updateProfile(result.user, {
          displayName: displayName,
        });
      }

      return result.user;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.REGISTRATION_FAILED);
    }
  }

  public static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.LOGOUT_FAILED);
    }
  }

  public static async getCurrentUserToken(): Promise<string | null> {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken(AUTH_CONSTANTS.FORCE_REFRESH);
      }
      return null;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.TOKEN_RETRIEVAL_FAILED);
    }
  }

  public static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  public static async refreshUserToken(): Promise<string | null> {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken(AUTH_CONSTANTS.REFRESH_TOKEN);
      }
      return null;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.TOKEN_RETRIEVAL_FAILED);
    }
  }
}
