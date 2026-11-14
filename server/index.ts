import "dotenv/config";
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import cors from "cors";
import type { ApiErrorResponse } from "@shared/api";
import { handleHealth, handlePing } from "./routes/ping";

const apiNotFound: RequestHandler = (_req, res) => {
  const body: ApiErrorResponse = { error: "API endpoint not found" };
  res.status(404).json(body);
};

const apiErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status =
    typeof err?.status === "number" && err.status >= 400 && err.status < 600
      ? err.status
      : 500;
  if (status >= 500) console.error(err);
  const body: ApiErrorResponse = {
    error: status >= 500 ? "Internal server error" : String(err.message),
  };
  res.status(status).json(body);
};

/**
 * Builds the Express app that serves the `/api` routes.
 * Used by the Vite dev server, the Node production server and the
 * Netlify function.
 */
export function createServer() {
  const app = express();
  app.disable("x-powered-by");

  const api = express.Router();
  api.use(cors());
  api.use(express.json({ limit: "100kb" }));
  api.use(express.urlencoded({ extended: true, limit: "100kb" }));

  api.get("/ping", handlePing);
  api.get("/health", handleHealth);

  api.use(apiNotFound);
  api.use(apiErrorHandler);

  app.use("/api", api);
  return app;
}
