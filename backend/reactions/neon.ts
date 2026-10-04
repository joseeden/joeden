import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  functions: {
    reactions: {
      name: "Joeden writing reactions",
      source: "./functions/reactions.ts",
      env: {
        ALLOWED_ORIGINS:
          process.env.REACTIONS_ALLOWED_ORIGINS ?? "http://localhost:3000",
      },
      dev: { port: 8787 },
    },
  },
});
