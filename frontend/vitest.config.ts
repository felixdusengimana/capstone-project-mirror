import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// ponytail: coverage gate lives here; raise/lower thresholds in one place.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "html"],
      include: ["**/*.{ts,tsx}"],
      exclude: [
        "**/*.test.*",
        "**/*.config.*",
        "**/node_modules/**",
        "**/.next/**",
        "next-env.d.ts",
        "env.d.ts",
        "**/*.d.ts",
      ],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
