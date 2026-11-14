/**
 * Types shared between the client and the Express server.
 */

/** Response body for `GET /api/ping`. */
export interface PingResponse {
  message: string;
}

/** Response body for `GET /api/health`. */
export interface HealthResponse {
  status: "ok";
  uptime: number;
}

/** Error body returned by the API for unknown endpoints and failures. */
export interface ApiErrorResponse {
  error: string;
}
