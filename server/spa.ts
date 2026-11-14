import path from "node:path";
import express, { type Express } from "express";

/**
 * Serves the built single-page app from `distPath`, falling back to
 * `index.html` for client-side routes. Must be registered after the API.
 */
export function serveSpa(app: Express, distPath: string) {
  app.use(
    express.static(distPath, {
      index: false,
      setHeaders(res, filePath) {
        // Vite emits content-hashed files under /assets; cache them forever.
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(distPath, "index.html"));
  });

  return app;
}
