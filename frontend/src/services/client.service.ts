import {
  API_BASE_URL,
  API_ENDPOINTS,
  HTTP_METHODS,
  HTTP_HEADERS,
  ERROR_MESSAGES,
} from "../constants";
import type { Client, CreateClientRequest } from "../types/client.types";
import { AuthService } from "./auth.service";

export class ClientService {
  public static async createClient(
    clientData: CreateClientRequest
  ): Promise<Client> {
    const token = await AuthService.getCurrentUserToken();

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CLIENTS}`, {
      method: HTTP_METHODS.POST,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: HTTP_HEADERS.APPLICATION_JSON,
        [HTTP_HEADERS.AUTHORIZATION]: `${HTTP_HEADERS.BEARER_PREFIX} ${token}`,
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_CREATE_CLIENT);
    }

    const result = await response.json();
    return result.data;
  }

  public static async getClients(): Promise<Client[]> {
    const token = await AuthService.getCurrentUserToken();

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CLIENTS}`, {
      method: HTTP_METHODS.GET,
      headers: {
        [HTTP_HEADERS.AUTHORIZATION]: `${HTTP_HEADERS.BEARER_PREFIX} ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_GET_CLIENTS);
    }

    const result = await response.json();
    return result.data;
  }

  public static async updateClient(
    clientId: string,
    updateData: Partial<CreateClientRequest>
  ): Promise<Client> {
    const token = await AuthService.getCurrentUserToken();

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.CLIENT_BY_ID(clientId)}`,
      {
        method: HTTP_METHODS.PUT,
        headers: {
          [HTTP_HEADERS.CONTENT_TYPE]: HTTP_HEADERS.APPLICATION_JSON,
          [HTTP_HEADERS.AUTHORIZATION]: `${HTTP_HEADERS.BEARER_PREFIX} ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_UPDATE_CLIENT);
    }

    const result = await response.json();
    return result.data;
  }

  public static async deleteClient(clientId: string): Promise<void> {
    const token = await AuthService.getCurrentUserToken();

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.CLIENT_BY_ID(clientId)}`,
      {
        method: HTTP_METHODS.DELETE,
        headers: {
          [HTTP_HEADERS.AUTHORIZATION]: `${HTTP_HEADERS.BEARER_PREFIX} ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAILED_TO_DELETE_CLIENT);
    }
  }
}
