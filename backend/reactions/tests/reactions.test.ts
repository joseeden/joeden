import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import { createApp, type Database } from "../functions/app.js";

const db = new PGlite();
const adapter: Database = {
  async query(text, values) {
    const result = await db.query<Record<string, any>>(text, values);
    return {
      rows: result.rows,
      rowCount: result.rows.length || result.affectedRows || 0,
    };
  },
};
const app = createApp(adapter, "http://localhost:3000");
const post = "/writings/test";
const visitor = randomUUID();
function call(
  method = "GET",
  id: string = visitor,
  reaction = "love",
  path = post,
) {
  return app.request("/reactions?postId=" + encodeURIComponent(path), {
    method,
    headers: {
      Origin: "http://localhost:3000",
      "X-Visitor-Id": id,
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify({ reaction }),
  });
}

before(async () => {
  await db.exec(
    await readFile(
      new URL("../sql/001-reactions.sql", import.meta.url),
      "utf8",
    ),
  );
  await db.query(
    "INSERT INTO public.reaction_posts(post_id) VALUES ($1), ($2)",
    [post, "/writings/other"],
  );
});
after(() => db.close());

test("retries, distinct visitors, multiple kinds, and removal preserve shared totals", async () => {
  assert.equal((await (await call()).json()).counts.love, 0);
  assert.equal((await (await call("PUT")).json()).counts.love, 1);
  assert.equal((await (await call("PUT")).json()).counts.love, 1);
  const other = randomUUID();
  assert.equal((await (await call("PUT", other)).json()).counts.love, 2);
  const multiple = await (await call("PUT", visitor, "boost")).json();
  assert.deepEqual(multiple.selected.sort(), ["boost", "love"]);
  const removed = await (await call("DELETE")).json();
  assert.equal(removed.counts.love, 1);
  assert.deepEqual(removed.selected, ["boost"]);
  assert.equal((await (await call("DELETE")).json()).counts.love, 1);
  assert.equal(
    (await (await call("GET", visitor, "love", "/writings/other")).json())
      .counts.love,
    0,
  );
});

test("rejects invalid visitors, reactions, unknown posts, and origins", async () => {
  assert.equal((await call("GET", "invalid")).status, 400);
  assert.equal((await call("PUT", visitor, "invalid")).status, 400);
  assert.equal(
    (await call("PUT", visitor, "love", "/writings/missing")).status,
    404,
  );
  const denied = await app.request("/reactions", {
    headers: { Origin: "https://untrusted.example" },
  });
  assert.equal(denied.status, 403);
  assert.equal(denied.headers.get("Access-Control-Allow-Origin"), null);
});

test("handles preflight without needing a visitor and keeps responses private", async () => {
  const response = await app.request("/reactions", {
    method: "OPTIONS",
    headers: {
      Origin: "http://localhost:3000",
      "Access-Control-Request-Method": "PUT",
    },
  });
  assert.equal(response.status, 204);
  assert.equal(
    response.headers.get("Access-Control-Allow-Origin"),
    "http://localhost:3000",
  );
  assert.match(response.headers.get("Access-Control-Allow-Methods")!, /PUT/);
  assert.equal((await call()).headers.get("Cache-Control"), "no-store");
});

test("enforces JSON and body limits", async () => {
  for (const [body, contentType, expected] of [
    ["{", "application/json", 400],
    ["{}", "text/plain", 415],
    [
      JSON.stringify({ reaction: "love", extra: "a".repeat(2048) }),
      "application/json",
      413,
    ],
  ] as const) {
    const result = await app.request(
      "/reactions?postId=" + encodeURIComponent(post),
      {
        method: "PUT",
        headers: {
          Origin: "http://localhost:3000",
          "X-Visitor-Id": visitor,
          "Content-Type": contentType,
        },
        body,
      },
    );
    assert.equal(result.status, expected);
  }
});

test("shared write limiter blocks repeated requests and allows an expired window", async () => {
  const limited = randomUUID();
  for (let i = 0; i < 30; i++)
    assert.equal((await call("PUT", limited)).status, 200);
  const blocked = await call("DELETE", limited);
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("Retry-After"), "60");
  assert.equal((await call("GET", limited)).status, 200);
  await db.query(
    "UPDATE public.reaction_request_limits SET window_start = now() - interval '2 minutes' WHERE visitor_id = $1",
    [limited],
  );
  assert.equal((await call("DELETE", limited)).status, 200);
});

test("database enforces uniqueness and allowed reaction kinds independently of API", async () => {
  const id = randomUUID();
  await db.query("INSERT INTO public.writing_reactions VALUES ($1, $2, $3)", [
    post,
    id,
    "smile",
  ]);
  await assert.rejects(
    db.query("INSERT INTO public.writing_reactions VALUES ($1, $2, $3)", [
      post,
      id,
      "smile",
    ]),
  );
  await assert.rejects(
    db.query("INSERT INTO public.writing_reactions VALUES ($1, $2, $3)", [
      post,
      id,
      "invalid",
    ]),
  );
});

test("database failures do not expose credentials", async () => {
  const failing = createApp(
    {
      query: async () => {
        throw new Error("private connection details");
      },
    },
    "http://localhost:3000",
  );
  const response = await failing.request(
    "/reactions?postId=" + encodeURIComponent(post),
    {
      headers: { Origin: "http://localhost:3000", "X-Visitor-Id": visitor },
    },
  );
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /private connection/);
});
