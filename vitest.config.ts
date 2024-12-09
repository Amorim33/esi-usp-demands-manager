import { resolve } from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    globalSetup: [resolve(import.meta.dirname, "test/setup-pg.ts")],
    exclude: [".next/**", "node_modules/**"],
  },
});
