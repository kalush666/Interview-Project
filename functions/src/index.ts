import * as functions from "firebase-functions";
import { createApp } from "./utils/app.util";
import { registerClientRoutes } from "./utils/routes.util";

const app = createApp();
registerClientRoutes(app);
export const api = functions.https.onRequest(app);
