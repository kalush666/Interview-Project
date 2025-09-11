import {Response} from "express";
import {AuthRequest} from "../types/auth.types";
import {UserService} from "../services/user.service";
import {STATUS_MESSAGES} from "../constants";
import {ValidationUtils} from "../utils/validation.util";
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  GetUserProfileDto,
} from "../dto";

export class UserController {
  private userService = new UserService();

  public getCurrentUser = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user!.uid;
      const dto: GetUserProfileDto = {uid: userId};
      const userProfile = await this.userService.getUserProfile(dto);
      if (!userProfile) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NOT_FOUND).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
        });
        return;
      }
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.OK)
        .json({success: true, data: userProfile});
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
      const {email, displayName} = req.body;

      if (!email || !ValidationUtils.isValidEmail(email)) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: "Valid email is required",
        });
        return;
      }

      const sanitizedDisplayName = ValidationUtils.sanitizeString(displayName);

      const dto: CreateUserProfileDto = ValidationUtils.removeUndefinedFields({
        uid: userId,
        email: email.trim(),
        displayName: sanitizedDisplayName,
      }) as CreateUserProfileDto;

      const userProfile = await this.userService.createUserProfile(dto);
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.CREATED)
        .json({success: true, data: userProfile});
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
      const {displayName} = req.body;

      const sanitizedDisplayName = ValidationUtils.sanitizeString(displayName);

      const dto: UpdateUserProfileDto = ValidationUtils.removeUndefinedFields({
        uid: userId,
        displayName: sanitizedDisplayName,
      }) as UpdateUserProfileDto;

      const updatedProfile = await this.userService.updateUserProfile(dto);
      if (!updatedProfile) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NOT_FOUND).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
        });
        return;
      }
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.OK)
        .json({success: true, data: updatedProfile});
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
