export const STATUS_MESSAGES = {
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
  } as const,
  ERROR_MESSAGES: {
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden access",
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
    BAD_REQUEST: "Bad request",
    INVALID_TOKEN: "Invalid token",
  },
};
