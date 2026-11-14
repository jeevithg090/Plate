import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  test: {
    include: ["{client,server,shared}/**/*.{test,spec}.{ts,tsx}"],
    environment: "node",
    restoreMocks: true,
  },
});
