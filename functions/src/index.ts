import express from "express";
import helmet from "helmet";
import cors from "cors";
import * as functions from "firebase-functions";
import { Configuration } from "./constants";

const app: express.Application = express();

app.use(helmet());
app.use(cors(Configuration.DEFAULT_CORS_CONFIG));
app.use(express.json());
app.use(express.urlencoded(Configuration.DEFAULT_EXPRESS_URL_ENCODED_CONFIG));

export const api = functions.https.onRequest(app);
