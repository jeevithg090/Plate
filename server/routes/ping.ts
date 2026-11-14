import type { RequestHandler } from "express";
import type { HealthResponse, PingResponse } from "@shared/api";

export const handlePing: RequestHandler = (_req, res) => {
  const body: PingResponse = { message: process.env.PING_MESSAGE ?? "ping" };
  res.json(body);
};

export const handleHealth: RequestHandler = (_req, res) => {
  const body: HealthResponse = {
    status: "ok",
    uptime: Math.round(process.uptime()),
  };
  res.json(body);
};
