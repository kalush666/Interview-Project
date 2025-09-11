import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/auth/LoginForm.component";
import { RegisterForm } from "../components/auth/RegisterForm.component";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/api.constants";
import { CSS_CLASSES } from "../constants";

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === ROUTES.LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(location.pathname === ROUTES.LOGIN);
  }, [location.pathname]);

  const handleAuthSuccess = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleSwitchToRegister = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleSwitchToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className={CSS_CLASSES.AUTH_PAGE}>
      {isLogin ? (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <RegisterForm
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
};
