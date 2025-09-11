import express from "express";
import helmet from "helmet";
import cors from "cors";
import { ChatService } from "../services/chat.service";

export function createApp() {
  const app = express();
  app.use(helmet());

  const corsOptions = {
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com", "https://www.yourdomain.com"]
        : true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const chatService = new ChatService();
  chatService.initializeDefaultRoom().catch(console.error);

  return app;
}
