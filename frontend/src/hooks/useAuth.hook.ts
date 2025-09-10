import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../config/firebase.database";
import { ERROR_MESSAGES } from "../constants";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthState({
          user,
          loading: false,
          error: null,
        });
      },
      (error) => {
        setAuthState({
          user: null,
          loading: false,
          error: error.message || ERROR_MESSAGES.AUTHENTICATION_FAILED,
        });
      }
    );

    return unsubscribe;
  }, []);

  return authState;
};
