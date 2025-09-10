export const ERROR_MESSAGES = {
  FIREBASE_EMULATOR_WARNING:
    "Firebase emulators already connected or unavailable",
  NETWORK_ERROR: "Network error occurred",
  AUTHENTICATION_FAILED: "Authentication failed",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
  RESOURCE_NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation error",
  FORM_SUBMISSION_ERROR: "Form submission failed",
  FAILED_TO_SEND_MESSAGE: "Failed to send message",
  FAILED_TO_GET_MESSAGES: "Failed to get messages",
  LOGIN_FAILED: "Login failed",
  REGISTRATION_FAILED: "Registration failed",
  LOGOUT_FAILED: "Logout failed",
  TOKEN_RETRIEVAL_FAILED: "Failed to retrieve authentication token",
} as const;

export const SUCCESS_MESSAGES = {
  OPERATION_SUCCESSFUL: "Operation completed successfully",
  LOGIN_SUCCESSFUL: "Login successful",
  LOGOUT_SUCCESSFUL: "Logout successful",
  PROFILE_UPDATED: "Profile updated successfully",
  MESSAGE_SENT: "Message sent successfully",
  CLIENT_CREATED: "Client created successfully",
  CLIENT_UPDATED: "Client updated successfully",
  CLIENT_DELETED: "Client deleted successfully",
} as const;

export const LOADING_MESSAGES = {
  AUTHENTICATING: "Authenticating...",
  LOADING_DATA: "Loading data...",
  SENDING_MESSAGE: "Sending message...",
  SAVING_CHANGES: "Saving changes...",
  PROCESSING: "Processing...",
} as const;
