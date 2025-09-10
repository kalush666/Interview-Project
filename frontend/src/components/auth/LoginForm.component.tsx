import React, { useState } from "react";
import { AuthService } from "../../services/auth.service";
import {
  UI_TEXT,
  CSS_CLASSES,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
} from "../../constants";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.login(formData.email, formData.password);
      onSuccess();
    } catch (error) {
      setError(ERROR_MESSAGES.LOGIN_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={CSS_CLASSES.LOGIN_FORM}>
      <h2>{UI_TEXT.LOGIN_TITLE}</h2>
      {error && <div className={CSS_CLASSES.AUTH_ERROR}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder={UI_TEXT.PASSWORD_PLACEHOLDER}
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? LOADING_MESSAGES.LOGGING_IN : UI_TEXT.LOGIN_BUTTON_TEXT}
        </button>
      </form>

      <p>
        {UI_TEXT.NO_ACCOUNT_TEXT}{" "}
        <button type="button" onClick={onSwitchToRegister}>
          {UI_TEXT.REGISTER_BUTTON_TEXT}
        </button>
      </p>
    </div>
  );
};
