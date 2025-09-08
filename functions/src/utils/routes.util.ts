import { Application } from "express";
import { API_ENDPOINTS } from "../constants";
import { authMiddleware } from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { ClientController } from "../controllers/client.controller";
import { ChatController } from "../controllers/chat.controller";

export function registerRoutes(app: Application) {
  const userController = new UserController();
  const clientController = new ClientController();
  const chatController = new ChatController();

  app.get(
    API_ENDPOINTS.USER_PROFILE,
    authMiddleware,
    userController.getCurrentUser
  );
  app.post(
    API_ENDPOINTS.USER_PROFILE,
    authMiddleware,
    userController.createUserProfile
  );
  app.put(
    API_ENDPOINTS.USER_PROFILE,
    authMiddleware,
    userController.updateUserProfile
  );

  app.post(
    API_ENDPOINTS.CLIENTS,
    authMiddleware,
    clientController.createClient
  );
  app.get(API_ENDPOINTS.CLIENTS, authMiddleware, clientController.getClients);
  app.put(
    API_ENDPOINTS.CLIENT_BY_ID,
    authMiddleware,
    clientController.updateClient
  );
  app.delete(
    API_ENDPOINTS.CLIENT_BY_ID,
    authMiddleware,
    clientController.deleteClient
  );

  app.get(API_ENDPOINTS.CHAT_ROOMS, authMiddleware, chatController.getRooms);
  app.post(API_ENDPOINTS.CHAT_ROOMS, authMiddleware, chatController.createRoom);
  app.get(
    API_ENDPOINTS.CHAT_MESSAGES,
    authMiddleware,
    chatController.getMessages
  );
  app.post(
    API_ENDPOINTS.SEND_MESSAGE,
    authMiddleware,
    chatController.sendMessage
  );
}

export function registerClientRoutes(app: Application) {
  const ClientControllerInstance = new ClientController();
  app.post(API_ENDPOINTS.CLIENTS, ClientControllerInstance.createClient);
  app.get(`${API_ENDPOINTS.CLIENTS}/:id`, ClientControllerInstance.getClient);
}
