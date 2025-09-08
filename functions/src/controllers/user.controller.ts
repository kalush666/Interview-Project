import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { UserService } from "../services/user.service";
import { STATUS_MESSAGES } from "../constants";

export class UserController {
  private userService = new UserService();

  public getCurrentUser = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user!.uid;
      const userProfile = await this.userService.getUserProfile(userId);
      if (!userProfile) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NO_CONTENT).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
        });
        return;
      }
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.OK)
        .json({ success: true, data: userProfile });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public createUserProfile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user!.uid;
      const { email, displayName } = req.body;
      const userProfile = await this.userService.createUserProfile(userId, {
        email,
        displayName,
      });
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.CREATED)
        .json({ success: true, data: userProfile });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public updateUserProfile = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user!.uid;
      const { displayName } = req.body;
      const updatedProfile = await this.userService.updateUserProfile(userId, {
        displayName,
      });
      if (!updatedProfile) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NO_CONTENT).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
        });
        return;
      }
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.OK)
        .json({ success: true, data: updatedProfile });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
