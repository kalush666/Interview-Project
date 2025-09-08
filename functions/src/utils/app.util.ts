import express from "express";
import helmet from "helmet";
import cors from "cors";
import { ChatService } from "../services/chat.service";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const chatService = new ChatService();
  chatService.initializeDefaultRoom().catch(console.error);

  return app;
}
