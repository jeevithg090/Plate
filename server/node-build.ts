import path from "node:path";
import { createServer } from "./index";
import { serveSpa } from "./spa";

const port = Number(process.env.PORT) || 3000;
const distPath = path.join(import.meta.dirname, "../spa");

const app = serveSpa(createServer(), distPath);

const server = app.listen(port, () => {
  console.log(`ICAS server listening on http://localhost:${port}`);
});

function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
