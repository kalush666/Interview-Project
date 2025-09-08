import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Configuration } from "../constants";
import { ChatService } from "../services/chat.service";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors(Configuration.DEFAULT_CORS_CONFIG));
  app.use(express.json());
  app.use(express.urlencoded(Configuration.DEFAULT_EXPRESS_URL_ENCODED_CONFIG));

  const chatService = new ChatService();
  chatService.initializeDefaultRoom().catch(console.error);

  return app;
}
