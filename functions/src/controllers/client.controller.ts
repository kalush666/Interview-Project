import { Response } from "express";
import { ClientService } from "../services/client.service";
import { AuthRequest } from "../types/auth.types";
import { STATUS_MESSAGES } from "../constants";
import { CreateClientDto, GetClientDto } from "../dto";

export class ClientController {
  private clientService: ClientService = new ClientService();

  public createClient = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const { name, phone, email } = req.body;
    const ownerUid = req.user!.uid;
    try {
      const dto: CreateClientDto = {
        name,
        phone,
        email,
        ownerUid,
      };
      const client = await this.clientService.createClient(dto);

      res.status(STATUS_MESSAGES.HTTP_STATUS.CREATED).json({
        message: STATUS_MESSAGES.HTTP_STATUS.CREATED,
        data: client,
        success: true,
      });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        error: (error as Error).message,
      });
    }
  };

  public getClient = async (req: AuthRequest, res: Response): Promise<void> => {
    const clientId = req.params.id;
    try {
      const dto: GetClientDto = { clientId };
      const client = await this.clientService.getClient(dto);
      if (!client) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NO_CONTENT).json({
          message: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
          success: false,
        });
        return;
      }
      res.status(STATUS_MESSAGES.HTTP_STATUS.OK).json({
        message: STATUS_MESSAGES.HTTP_STATUS.OK,
        data: client,
        success: true,
      });
    } catch (error) {
      res.status(STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: STATUS_MESSAGES.HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        error: (error as Error).message,
      });
    }
  };
}
