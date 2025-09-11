import {NextFunction, Response} from "express";
import {AuthRequest} from "../types/auth.types";
import {Auth, STATUS_MESSAGES} from "../constants";
import {firebaseAdmin} from "../config/firebase";
import {DecodedIdToken} from "firebase-admin/auth";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(Auth.BEARER_PREFIX)) {
    res.status(STATUS_MESSAGES.HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: STATUS_MESSAGES.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }
  const token: string = authHeader.split(" ")[Auth.TOKEN_PLACEMENT];
  try {
    const decodedToken: DecodedIdToken = await firebaseAdmin
      .getAuth()
      .verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
    };
    next();
  } catch (error) {
    res.status(STATUS_MESSAGES.HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: STATUS_MESSAGES.ERROR_MESSAGES.UNAUTHORIZED,
    });
    return;
  }
};
