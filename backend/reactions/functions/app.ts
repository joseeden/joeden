import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { HTTPException } from "hono/http-exception";

export interface Database {
  query(
    text: string,
    values?: unknown[],
  ): Promise<{
    rows: Record<string, any>[];
    rowCount: number | null;
  }>;
}

export function createApp(pool: Database, origins: string) {
  const app = new Hono();
  const allowedOrigins = new Set(
    origins
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
  const kinds = [
    "like",
    "celebrate",
    "hype",
    "love",
    "applaud",
    "admire",
    "boost",
    "smile",
  ];
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  app.use("*", async (c, next) => {
    c.header("Cache-Control", "no-store");
    const origin = c.req.header("Origin");
    if (!origin || !allowedOrigins.has(origin)) {
      return c.json({ error: "Origin not allowed" }, 403);
    }
    await next();
  });

  app.use(
    "*",
    cors({
      origin: (origin) => (allowedOrigins.has(origin) ? origin : ""),
      allowMethods: ["GET", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "X-Visitor-Id"],
      exposeHeaders: ["Retry-After"],
      maxAge: 600,
    }),
  );

  app.use(
    "*",
    bodyLimit({
      maxSize: 1024,
      onError: (c) => c.json({ error: "Request body too large" }, 413),
    }),
  );

  app.on(["GET", "PUT", "DELETE"], "/reactions", async (c) => {
    const postId = c.req.query("postId") ?? "";
    const visitorId = c.req.header("X-Visitor-Id") ?? "";

    if (
      postId.length > 300 ||
      !/^\/(?:es\/)?writings\/.+/.test(postId) ||
      !uuidPattern.test(visitorId)
    ) {
      return c.json({ error: "Invalid post or visitor identifier" }, 400);
    }

    const post = await pool.query(
      "SELECT 1 FROM public.reaction_posts WHERE post_id = $1 AND enabled",
      [postId],
    );
    if (post.rowCount === 0) {
      return c.json({ error: "Writing not registered" }, 404);
    }

    if (c.req.method !== "GET") {
      if (
        !c.req
          .header("Content-Type")
          ?.toLowerCase()
          .startsWith("application/json")
      ) {
        return c.json({ error: "Expected application/json" }, 415);
      }
      let body;
      try {
        body = await c.req.json();
      } catch (error) {
        if (error instanceof HTTPException) throw error;
        return c.json({ error: "Invalid JSON" }, 400);
      }
      if (!body || !kinds.includes(body.reaction)) {
        return c.json({ error: "Invalid reaction" }, 400);
      }

      const limit = await pool.query(
        `
      INSERT INTO public.reaction_request_limits
          (visitor_id, window_start, requests)
      VALUES ($1, now(), 1)
      ON CONFLICT (visitor_id) DO UPDATE SET
        window_start = CASE
          WHEN reaction_request_limits.window_start < now() - interval '1 minute'
          THEN now() ELSE reaction_request_limits.window_start END,
        requests = CASE
          WHEN reaction_request_limits.window_start < now() - interval '1 minute'
          THEN 1 ELSE reaction_request_limits.requests + 1 END
      RETURNING requests
    `,
        [visitorId],
      );

      if (limit.rows[0].requests > 30) {
        c.header("Retry-After", "60");
        return c.json({ error: "Too many requests; try again shortly" }, 429);
      }

      if (c.req.method === "PUT") {
        await pool.query(
          `
        INSERT INTO public.writing_reactions (post_id, visitor_id, reaction)
        VALUES ($1, $2, $3)
        ON CONFLICT (post_id, visitor_id, reaction) DO NOTHING
      `,
          [postId, visitorId, body.reaction],
        );
      } else {
        await pool.query(
          `
        DELETE FROM public.writing_reactions
        WHERE post_id = $1 AND visitor_id = $2 AND reaction = $3
      `,
          [postId, visitorId, body.reaction],
        );
      }
    }

    const result = await pool.query(
      `
    SELECT reaction, count(*)::integer AS count,
           bool_or(visitor_id = $2::uuid) AS selected
    FROM public.writing_reactions
    WHERE post_id = $1
    GROUP BY reaction
  `,
      [postId, visitorId],
    );

    const counts = Object.fromEntries(kinds.map((kind) => [kind, 0]));
    const selected: string[] = [];
    for (const row of result.rows) {
      counts[row.reaction] = row.count;
      if (row.selected) selected.push(row.reaction);
    }
    return c.json({ postId, counts, selected });
  });

  app.onError((error, c) => {
    if (error instanceof HTTPException) return error.getResponse();
    // Keep connection strings, visitor identifiers, and SQL details out of responses.
    console.error("Reaction request failed");
    return c.json({ error: "Reactions temporarily unavailable" }, 503);
  });

  return app;
}
