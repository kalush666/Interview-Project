import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { ChatService } from "../services/chat.service";
import { UserService } from "../services/user.service";
import { STATUS_MESSAGES } from "../constants";
import { CHAT_CONFIG } from "../constants/database.constants";
import {
  SendMessageDto,
  GetMessagesDto,
  CreateRoomDto,
  GetRoomDto,
  GetUserProfileDto,
} from "../dto";
import { ValidationUtils } from "../utils/validation.util";

export class ChatController {
  private chatService = new ChatService();
  private userService = new UserService();

  public sendMessage = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { message } = req.body;
      const userId = req.user!.uid;

      const sanitizedMessage = ValidationUtils.sanitizeString(message);

      if (!sanitizedMessage || sanitizedMessage.trim().length === 0) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.BAD_REQUEST,
        });
        return;
      }
      if (sanitizedMessage.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: `Message too long. Maximum ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters.`,
        });
        return;
      }
      const userProfileDto: GetUserProfileDto = { uid: userId };
      const userProfile = await this.userService.getUserProfile(userProfileDto);
      const userDisplayName =
        userProfile?.displayName ||
        userProfile?.email ||
        CHAT_CONFIG.DEFAULT_ROOM_CREATED_BY;
      const sendMessageDto: SendMessageDto =
        ValidationUtils.removeUndefinedFields({
          userId,
          userDisplayName,
          message: sanitizedMessage.trim(),
        }) as SendMessageDto;
      const chatMessage = await this.chatService.sendMessage(sendMessageDto);
      res.status(STATUS_MESSAGES.HTTP_STATUS.CREATED).json({
        success: true,
        data: chatMessage,
        message: "Message sent successfully",
      });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public getMessages = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { limit, startAfter } = req.query;
      const messageLimit = limit
        ? parseInt(limit as string)
        : CHAT_CONFIG.MAX_MESSAGES_PER_FETCH;
      const getMessagesDto: GetMessagesDto = {
        limit: messageLimit,
        startAfter: startAfter as string,
      };
      const result = await this.chatService.getMessages(getMessagesDto);
      res.status(STATUS_MESSAGES.HTTP_STATUS.OK).json({
        success: true,
        data: result,
        message: `Found ${result.messages.length} messages`,
      });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public getRooms = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const rooms = await this.chatService.getRooms();
      res.status(STATUS_MESSAGES.HTTP_STATUS.OK).json({
        success: true,
        data: rooms,
        message: `Found ${rooms.length} chat rooms`,
      });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public createRoom = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { name, description } = req.body;
      const createdBy = req.user!.uid;

      const sanitizedName = ValidationUtils.sanitizeString(name);
      const sanitizedDescription = ValidationUtils.sanitizeString(description);

      if (!sanitizedName || sanitizedName.trim().length === 0) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.BAD_REQUEST,
        });
        return;
      }
      const createRoomDto: CreateRoomDto =
        ValidationUtils.removeUndefinedFields({
          name: sanitizedName.trim(),
          description: sanitizedDescription,
          createdBy,
        }) as CreateRoomDto;
      const room = await this.chatService.createRoom(createRoomDto);
      res.status(STATUS_MESSAGES.HTTP_STATUS.CREATED).json({
        success: true,
        data: room,
        message: "Chat room created successfully",
      });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public getRoom = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { roomId } = req.params;
      const getRoomDto: GetRoomDto = { roomId };
      const room = await this.chatService.getRoom(getRoomDto);
      if (!room) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NOT_FOUND).json({
          success: false,
          error: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
        });
        return;
      }
      res
        .status(STATUS_MESSAGES.HTTP_STATUS.OK)
        .json({ success: true, data: room });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: STATUS_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
