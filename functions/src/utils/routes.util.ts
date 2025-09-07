import { Application } from "express";
import { API_ENDPOINTS } from "../constants";
import { ClientController } from "../controllers/client.controller";

export function registerClientRoutes(app: Application) {
  const ClientControllerInstance = new ClientController();
  app.post(API_ENDPOINTS.CLIENTS, ClientControllerInstance.createClient);
  app.get(`${API_ENDPOINTS.CLIENTS}/:id`, ClientControllerInstance.getClient);
}
