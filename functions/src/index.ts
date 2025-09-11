import * as functions from "firebase-functions";
import {createApp} from "./utils/app.util";
import {registerRoutes} from "./utils/routes.util";

const app = createApp();
registerRoutes(app);

export const api = functions.https.onRequest(app);
