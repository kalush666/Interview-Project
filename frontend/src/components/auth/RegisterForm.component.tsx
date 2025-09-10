import React, { useState } from "react";
import { AuthService } from "../../services/auth.service";
import {
  UI_TEXT,
  CSS_CLASSES,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  VALIDATION_RULES,
} from "../../constants";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    if (!formData.email || !VALIDATION_RULES.EMAIL_REGEX.test(formData.email)) {
      setError(ERROR_MESSAGES.VALIDATION_ERROR + ": Invalid email format");
      return false;
    }

    if (formData.password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
      setError(
        ERROR_MESSAGES.VALIDATION_ERROR +
          `: Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(ERROR_MESSAGES.VALIDATION_ERROR + ": Passwords do not match");
      return false;
    }

    if (
      formData.displayName.length < VALIDATION_RULES.MIN_NAME_LENGTH ||
      formData.displayName.length > VALIDATION_RULES.MAX_NAME_LENGTH
    ) {
      setError(
        ERROR_MESSAGES.VALIDATION_ERROR +
          `: Name must be between ${VALIDATION_RULES.MIN_NAME_LENGTH} and ${VALIDATION_RULES.MAX_NAME_LENGTH} characters`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await AuthService.register(
        formData.email,
        formData.password,
        formData.displayName
      );
      onSuccess();
    } catch (error) {
      setError(ERROR_MESSAGES.REGISTRATION_FAILED);
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
    <div className={CSS_CLASSES.REGISTER_FORM}>
      <h2>{UI_TEXT.REGISTER_TITLE}</h2>
      {error && <div className={CSS_CLASSES.AUTH_ERROR}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="displayName"
          type="text"
          placeholder={UI_TEXT.NAME_PLACEHOLDER}
          value={formData.displayName}
          onChange={handleChange}
          required
          disabled={loading}
          maxLength={VALIDATION_RULES.MAX_NAME_LENGTH}
        />
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
          minLength={VALIDATION_RULES.MIN_PASSWORD_LENGTH}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder={UI_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={VALIDATION_RULES.MIN_PASSWORD_LENGTH}
        />
        <button type="submit" disabled={loading}>
          {loading
            ? LOADING_MESSAGES.REGISTERING
            : UI_TEXT.REGISTER_BUTTON_TEXT}
        </button>
      </form>

      <p>
        {UI_TEXT.HAVE_ACCOUNT_TEXT}{" "}
        <button type="button" onClick={onSwitchToLogin}>
          {UI_TEXT.LOGIN_BUTTON_TEXT}
        </button>
      </p>
    </div>
  );
};
