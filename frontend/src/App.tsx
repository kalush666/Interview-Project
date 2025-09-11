import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth.hook";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ChatPage } from "./pages/ChatPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ROUTES } from "./constants/api.constants";
import { CSS_CLASSES, UI_TEXT } from "./constants";
import { testFirebaseConfig } from "./debug/firebase-test";
import "./App.css";

// Run Firebase config test
testFirebaseConfig();

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className={CSS_CLASSES.LOADING}>{UI_TEXT.LOADING_TEXT}</div>;
  }

  return (
    <Router>
      <div className={CSS_CLASSES.APP}>
        <Routes>
          {/* Public routes */}
          <Route
            path={ROUTES.LOGIN}
            element={user ? <Navigate to={ROUTES.DASHBOARD} /> : <AuthPage />}
          />
          <Route
            path={ROUTES.REGISTER}
            element={user ? <Navigate to={ROUTES.DASHBOARD} /> : <AuthPage />}
          />

          {/* Protected routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={user ? <DashboardPage /> : <Navigate to={ROUTES.LOGIN} />}
          />
          <Route
            path={ROUTES.CHAT}
            element={user ? <ChatPage /> : <Navigate to={ROUTES.LOGIN} />}
          />
          <Route
            path={ROUTES.CLIENTS}
            element={user ? <ClientsPage /> : <Navigate to={ROUTES.LOGIN} />}
          />

          {/* Default redirect */}
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={user ? ROUTES.DASHBOARD : ROUTES.LOGIN} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
