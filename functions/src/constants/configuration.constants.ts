export const Configuration = {
  DEFAULT_CORS_CONFIG: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  DEFAULT_EXPRESS_URL_ENCODED_CONFIG: { extended: true },
};
