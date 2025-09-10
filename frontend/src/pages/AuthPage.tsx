import React, { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm.component";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/api.constants";
import { CSS_CLASSES } from "../constants";

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={CSS_CLASSES.AUTH_PAGE}>
      {isLogin ? (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={handleSwitchMode}
        />
      ) : (
        <div>Register form coming soon...</div>
      )}
    </div>
  );
};
