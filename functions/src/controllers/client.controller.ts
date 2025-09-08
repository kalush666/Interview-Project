import { Response } from "express";
import { ClientService } from "../services/client.service";
import { AuthRequest } from "../types/auth.types";
import { STATUS_MESSAGES } from "../constants";
import {
  CreateClientDto,
  GetClientDto,
  GetClientsByOwnerDto,
  UpdateClientDto,
  DeleteClientDto,
} from "../dto";

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

  public getClients = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const ownerUid = req.user!.uid;
    try {
      const dto: GetClientsByOwnerDto = { ownerUid };
      const clients = await this.clientService.getClientsByOwner(dto);
      res.status(STATUS_MESSAGES.HTTP_STATUS.OK).json({
        message: STATUS_MESSAGES.HTTP_STATUS.OK,
        data: clients,
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

  public updateClient = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const clientId = req.params.id;
    const ownerUid = req.user!.uid;
    const { name, phone, email } = req.body;
    try {
      const dto: UpdateClientDto = {
        clientId,
        ownerUid,
        name,
        phone,
        email,
      };
      const updatedClient = await this.clientService.updateClient(dto);
      if (!updatedClient) {
        res.status(STATUS_MESSAGES.HTTP_STATUS.NO_CONTENT).json({
          message: STATUS_MESSAGES.ERROR_MESSAGES.NOT_FOUND,
          success: false,
        });
        return;
      }
      res.status(STATUS_MESSAGES.HTTP_STATUS.OK).json({
        message: STATUS_MESSAGES.HTTP_STATUS.OK,
        data: updatedClient,
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

  public deleteClient = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const clientId = req.params.id;
    const ownerUid = req.user!.uid;
    try {
      const dto: DeleteClientDto = {
        clientId,
        ownerUid,
      };
      await this.clientService.deleteClient(dto);
      res.status(STATUS_MESSAGES.HTTP_STATUS.OK).json({
        message: "Client deleted successfully",
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
