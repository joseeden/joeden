import { attachDatabasePool } from "@neon/functions";
import { Pool } from "pg";
import { createApp } from "./app.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  connectionTimeoutMillis: 10_000,
  statement_timeout: 10_000,
});
attachDatabasePool(pool);

export default createApp(pool, process.env.ALLOWED_ORIGINS ?? "");
