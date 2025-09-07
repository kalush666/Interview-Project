import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
}
