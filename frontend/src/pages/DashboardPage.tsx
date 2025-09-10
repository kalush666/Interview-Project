import React from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { ROUTES } from "../constants/api.constants";
import { CSS_CLASSES, UI_TEXT, ERROR_MESSAGES } from "../constants";

export const DashboardPage: React.FC = () => {
  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(ERROR_MESSAGES.LOGOUT_FAILED, error);
    }
  };

  return (
    <div className={CSS_CLASSES.DASHBOARD_PAGE}>
      <header className={CSS_CLASSES.PAGE_HEADER}>
        <h1>{UI_TEXT.DASHBOARD_PAGE_TITLE}</h1>
        <button onClick={handleLogout} className={CSS_CLASSES.LOGOUT_BUTTON}>
          {UI_TEXT.LOGOUT_BUTTON_TEXT}
        </button>
      </header>

      <main className={CSS_CLASSES.PAGE_MAIN}>
        <nav>
          <Link to={ROUTES.CHAT}>Go to Chat</Link>
          <Link to={ROUTES.CLIENTS}>Manage Clients</Link>
        </nav>

        <div>
          <h2>Welcome to your Dashboard</h2>
          <p>
            Use the navigation above to access different sections of the
            application.
          </p>
        </div>
      </main>
    </div>
  );
};
