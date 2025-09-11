import React from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { ROUTES } from "../constants/api.constants";
import { CSS_CLASSES, UI_TEXT, ERROR_MESSAGES } from "../constants";

export const ClientsPage: React.FC = () => {
  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(ERROR_MESSAGES.LOGOUT_FAILED, error);
    }
  };

  return (
    <div className={CSS_CLASSES.CLIENTS_PAGE}>
      <header className={CSS_CLASSES.PAGE_HEADER}>
        <h1>{UI_TEXT.CLIENTS_PAGE_TITLE}</h1>
        <nav>
          <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          <Link to={ROUTES.CHAT}>Chat</Link>
        </nav>
        <button onClick={handleLogout} className={CSS_CLASSES.LOGOUT_BUTTON}>
          {UI_TEXT.LOGOUT_BUTTON_TEXT}
        </button>
      </header>

      <main className={CSS_CLASSES.PAGE_MAIN}>
        <div>
          <h2>Client Management</h2>
          <p>Client management functionality will be implemented here.</p>
        </div>
      </main>
    </div>
  );
};
