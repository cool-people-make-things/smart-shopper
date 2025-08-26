import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "**/index.{ts,tsx}",
        "**/__mocks__/**",
        "**/*.config.{js,ts}",
        "**/vite-env.d.ts",
        "**/*.types.d.ts",
        "**/main.tsx",
        "**/App.tsx",
      ],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/lib/test/vitest.setup.ts",
  },
}) as ViteUserConfig;
