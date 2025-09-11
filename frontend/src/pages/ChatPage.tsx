import React from "react";
import { ChatBox } from "../components/chat/ChatBox.component";
import { AuthService } from "../services/auth.service";
import { CSS_CLASSES, UI_TEXT, ERROR_MESSAGES } from "../constants";

export const ChatPage: React.FC = () => {
  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(ERROR_MESSAGES.LOGOUT_FAILED, error);
    }
  };

  return (
    <div className={CSS_CLASSES.CHAT_PAGE}>
      <header className={CSS_CLASSES.PAGE_HEADER}>
        <h1>{UI_TEXT.CHAT_PAGE_TITLE}</h1>
        <button onClick={handleLogout} className={CSS_CLASSES.LOGOUT_BUTTON}>
          {UI_TEXT.LOGOUT_BUTTON_TEXT}
        </button>
      </header>

      <main className={CSS_CLASSES.PAGE_MAIN}>
        <ChatBox />
      </main>
    </div>
  );
};
