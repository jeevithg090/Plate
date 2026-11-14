import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import type { Express } from "express";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServer } from "./index";
import { serveSpa } from "./spa";

async function listen(app: Express) {
  const server = await new Promise<Server>((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const { port } = server.address() as AddressInfo;
  return { server, url: `http://127.0.0.1:${port}` };
}

describe("API", () => {
  let server: Server;
  let url: string;

  beforeAll(async () => {
    ({ server, url } = await listen(createServer()));
  });
  afterAll(() => server.close());
  afterEach(() => vi.unstubAllEnvs());

  it("GET /api/ping returns the configured message", async () => {
    vi.stubEnv("PING_MESSAGE", "hello");
    const res = await fetch(`${url}/api/ping`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "hello" });
  });

  it("GET /api/ping falls back to 'ping'", async () => {
    vi.stubEnv("PING_MESSAGE", undefined);
    const res = await fetch(`${url}/api/ping`);
    expect(await res.json()).toEqual({ message: "ping" });
  });

  it("GET /api/health reports ok", async () => {
    const res = await fetch(`${url}/api/health`);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(typeof body.uptime).toBe("number");
  });

  it("returns JSON 404 for unknown API routes", async () => {
    const res = await fetch(`${url}/api/does-not-exist`);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "API endpoint not found" });
  });

  it("returns 400 JSON for malformed request bodies", async () => {
    const res = await fetch(`${url}/api/ping`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{bad json",
    });
    expect(res.status).toBe(400);
    expect(res.headers.get("content-type")).toMatch(/json/);
  });

  it("does not advertise Express", async () => {
    const res = await fetch(`${url}/api/ping`);
    expect(res.headers.get("x-powered-by")).toBeNull();
  });
});

describe("SPA hosting", () => {
  let server: Server;
  let url: string;
  let dir: string;

  beforeAll(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "spa-"));
    fs.mkdirSync(path.join(dir, "assets"));
    fs.writeFileSync(
      path.join(dir, "index.html"),
      "<!doctype html><title>ICAS</title>",
    );
    fs.writeFileSync(
      path.join(dir, "assets", "app-abc123.js"),
      "console.log(1)",
    );
    ({ server, url } = await listen(serveSpa(createServer(), dir)));
  });
  afterAll(() => {
    server.close();
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it.each(["/", "/portal/courses/ICS%20231", "/does/not/exist"])(
    "serves index.html for client route %s",
    async (route) => {
      const res = await fetch(`${url}${route}`);
      expect(res.status).toBe(200);
      expect(await res.text()).toContain("<title>ICAS</title>");
      expect(res.headers.get("cache-control")).toBe("no-cache");
    },
  );

  it("serves hashed assets with long-lived caching", async () => {
    const res = await fetch(`${url}/assets/app-abc123.js`);
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toContain("immutable");
  });

  it("keeps API 404s as JSON", async () => {
    const res = await fetch(`${url}/api/missing`);
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toMatch(/json/);
  });
});
