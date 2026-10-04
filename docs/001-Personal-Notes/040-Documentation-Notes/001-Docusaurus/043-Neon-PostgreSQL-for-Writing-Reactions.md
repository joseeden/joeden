---
title: "Enable Anonymous Reactions on Writings Pages"
sidebar_position: 43
description: "Enable reactions without sign-in on Writings pages using Neon PostgreSQL as the backend"
tags:
  - Docusaurus
  - PostgreSQL
  - Neon
---

## Overview

This KB explains how anonymous reactions are implemented on *Writings* pages. Readers can react without signing in, while reaction totals are stored in Neon PostgreSQL and shared across visitors.

The site remains hosted on GitHub Pages. A Neon Function provides the API used to read, add, and remove reactions, while PostgreSQL stores the reaction data.

For now, *Writings* pages are the test area for this feature. Documentation pages will continue using Giscus until the custom reaction system is ready to replace it there.

The backend package, SQL migration, and Writings reaction component are already included in the repository. Local backend tests use an embedded PostgreSQL engine; the Neon deployment still needs to be configured and verified.

:::info 

Recheck the linked documentation before provisioning services because CLI commands and limits can change.

:::

## Architecture

GitHub Pages serves the website and displays the reaction controls. A Neon Function handles the API requests, and Neon PostgreSQL stores the reaction data.

### Request Flow

1. A reader opens a writing on `joseeden.com`.
2. The reaction controls send an HTTP request to the reactions API.
3. The Neon Function validates the request and runs parameterized SQL queries.
4. Neon PostgreSQL reads or updates the stored reactions.
5. The API returns the latest counts and selections to the page.

Because GitHub Pages is a static host, it cannot update a local file or database on behalf of visitors. The Neon Function provides that server-side capability without requiring a separate server to maintain.

The frontend only needs the function's public URL. Database credentials stay on the backend.

See the [Neon Functions setup guide](https://neon.com/docs/compute/functions/get-started).

### Reaction Behavior

Readers can add or remove reactions without an account. Each browser remembers its selections, while everyone sees the shared totals.

- Allow each browser to select several different reaction types on a writing.
- Allow only one reaction of each type per browser and writing.
- Allow readers to remove their own selections.
- Store individual selections, and calculate totals from those records.
- Keep counts separate for each writing.
- Show saved counts after refreshing or reopening the page.

The browser stores a random visitor identifier in `localStorage`. PostgreSQL stores the actual reactions. Local storage alone cannot provide totals shared between visitors.

:::note

An anonymous identifier represents a browser, not a verified person. 

Clearing browser storage or using another device allows another set of reactions. 

This approach provides lightweight engagement, not verified voting.

:::

## Prerequisites

Before starting, make sure the required account access and local tools are available.

- Access to the existing Neon account.
- Access to the local `C:\Git\joeden` repository.
- Node.js 24 for the backend examples, matching the deployed Functions runtime.
- npm and PowerShell.
- A published writing URL to register and test later.

Only the site owner signs in to Neon for administration. 

Visitors do not need Neon accounts, GitHub accounts, or Neon Auth.

### Free Plan

The free plan includes database storage and function usage allowances. Check both because the reaction feature uses both services.

Neon's October 2, 2026 announcement lists these allowances:

| Resource           | Free allowance per project                     |
| ------------------ | ---------------------------------------------- |
| PostgreSQL storage | 1 GB                                           |
| Database compute   | 100 CU-hours per month                         |
| Function calls     | 1 million invocations per month                |
| Function capacity  | 10 active and 400 waiting capacity-hours/month |

The plan allows 100 projects. Storage increased from 0.5 GB to 1 GB, including existing projects. See the [Free plan announcement](https://neon.com/blog/neon-free-plan-1-gb-per-project) and [current pricing](https://neon.com/pricing).

Database compute and function capacity are separate allowances. A low-traffic reaction feature should need little storage, but traffic patterns and requests determine compute usage. Avoid continuous polling and review usage after launch.

## Create the Neon Project

Create a Neon project for the reaction database and API. Use a separate development branch so setup and testing do not affect production data.

### Choose a Project and Region

Choose a project that can host both PostgreSQL and Neon Functions. The region matters because Functions is not available in every database region.

1. Sign in to the [Neon Console](https://console.neon.tech/).
2. Confirm that the selected organization uses the intended plan.
3. Create a dedicated project named `joeden-reactions` to separate website data from old lab experiments.
4. Choose a region supported by Neon Functions.
5. Record the project name, project ID, database name, and default branch name.

At the time of writing, the [Functions prerequisites](https://neon.com/docs/compute/functions/get-started#prerequisites) list AWS Ohio, N. Virginia, Frankfurt, and Singapore. Singapore is a convenient starting point for this project. Use a region supported by both the database and Functions.

An existing lab project can also work if its region supports Functions and its data is suitable for reuse. Do not reset or overwrite the lab database just to add reactions.

### Create a Development Branch

Use a separate branch for test reactions and schema changes. This keeps development activity away from the production data.

1. Open the project's branch management page.
2. Keep the default branch for production.
3. Create a child branch named `dev-reactions`.
4. Use that branch for the schema, test records, and initial function deployment.
5. Confirm the branch and database selectors before running SQL.

Development branches have separate database state. Applying SQL or deploying a function to `dev-reactions` does not update production automatically.

## Prepare the Backend 

The reactions backend lives in its own npm package under `backend/reactions`. This keeps backend dependencies and local secrets separate from the Docusaurus site.

The folder and package files are already included. Normally, run `npm ci` inside `backend/reactions`; the following PowerShell commands document how to recreate the package from scratch:

```powershell
Set-Location C:\Git\joeden
New-Item -ItemType Directory -Path backend/reactions -Force
Set-Location backend/reactions
npm init -y
npm install @neon/config@latest @neon/functions@latest hono pg
npm install --save-dev neon@latest @types/pg @types/node typescript
New-Item -ItemType Directory -Path functions, sql -Force
```

For Linux or WSL, use Bash instead. The example below uses WSL's default path for `C:\Git\joeden`:

```bash
cd /mnt/c/Git/joeden
mkdir -p backend/reactions
cd backend/reactions
npm init -y
npm install @neon/config@latest @neon/functions@latest hono pg
npm install --save-dev neon@latest @types/pg @types/node typescript
mkdir -p functions sql
```

On native Linux, or if the repository is stored inside WSL's Linux filesystem, replace the first path with your checkout location, such as `~/projects/joeden`. Run only the command block for your shell, and use Node.js and npm installed in that environment.

Create `backend/reactions/.gitignore` before linking the project:

```gitignore
node_modules/
.env
.env.*
!.env.example
.neon
```

The repository's existing root ignore rules do not cover every nested dependency folder or every environment filename. The backend-specific ignore file covers the new package.

The intended layout is:

```text
backend/reactions/
├── functions
│   ├── app.ts
│   └── reactions.ts
├── neon.ts
├── node_modules
│   ├── .....
│   └── .....
├── package-lock.json
├── package.json
├── sql
│   └── 001-reactions.sql
├── tests
│   └── reactions.test.ts
└── tsconfig.json
```

### Link the Neon Project

**Note:** This setup uses **Neon PostgreSQL** as the database provider. If you are using a different PostgreSQL provider or database setup, follow the relevant documentation.

1. Link the backend folder to the intended Neon project and branch. 

    ```bash
    npx neon link
    ```

    This will return an authentication URL and may automatically open a browser tab. Sign in and authorize the Neon CLI to access your Neon account.

    ::info 

    This command can select the project's default branch, such as `main`, without asking you to choose a branch. 

    :::

2. After authentication, select the appropriate Neon 

    Once linking finishes, switch to the development branch

    ```bash
    npx neon checkout dev-reactions
    ```

    If no project exists yet, the Neon CLI may prompt you to create a new project directly from the terminal.

    Example:

    ```text
    INFO: Auth complete
    INFO: Linking organization Jose (org-solitary-king-86982091).
    ✔ Which project would you like to link? › ＋ Create new project…
    ? Name for the new project: ›
    ```

    Enter a name for the new project and select the region, then continue through the prompts to complete the setup.

The CLI writes local link metadata and pulls connection variables into an environment file. Existing `.env` files take precedence over the default `.env.local` location. See [Neon environment variables](https://neon.com/docs/compute/functions/environment-variables).

:::warning

Keep database passwords, connection strings, and Neon API keys out of Markdown examples, browser code, and Docusaurus configuration. A value bundled into the website is public even if it originally came from an environment variable.

:::

### Retrieve the Connection String 

Open the Neon dashboard, select the project, click **Connect**, and copy the PostgreSQL connection string.

It should look similar to:

```text
postgresql://username:password@something.neon.tech/database?sslmode=require
```

Store it in a local `.env.local` file:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

## Create the Database Schema

The database stores the registered writing paths, individual reactions, and request-limit data. Database constraints prevent duplicate selections and reject unsupported reaction types.

### Tables and Constraints

Save the following as `backend/reactions/sql/001-reactions.sql`. Run it in the Neon SQL Editor with `dev-reactions` and the intended database selected.

```sql
CREATE TABLE IF NOT EXISTS public.reaction_posts (
    post_id text PRIMARY KEY,
    enabled boolean NOT NULL DEFAULT true,
    CHECK (char_length(post_id) BETWEEN 1 AND 300)
);

CREATE TABLE IF NOT EXISTS public.writing_reactions (
    post_id text NOT NULL
        REFERENCES public.reaction_posts(post_id),
    visitor_id uuid NOT NULL,
    reaction text NOT NULL CHECK (reaction IN (
        'like', 'celebrate', 'hype', 'love',
        'applaud', 'admire', 'boost', 'smile'
    )),
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (post_id, visitor_id, reaction)
);

CREATE INDEX IF NOT EXISTS writing_reactions_totals_idx
    ON public.writing_reactions (post_id, reaction);

CREATE TABLE IF NOT EXISTS public.reaction_request_limits (
    visitor_id uuid PRIMARY KEY,
    window_start timestamptz NOT NULL,
    requests integer NOT NULL
);
```

The primary key prevents repeated inserts from inflating totals. The reaction constraint rejects unsupported types. The post table limits the API to explicitly registered writings.

The request-limit table provides a shared per-visitor write limit across function instances. It is a basic protection against repeated clicks, not a complete defense against automated abuse.

### Register a Test Writing

Register a sample writing before testing the API. The API accepts reactions only for paths listed in the database.

Run this on the development branch:

```sql
INSERT INTO public.reaction_posts (post_id)
VALUES ('/writings/reaction-test')
ON CONFLICT (post_id) DO NOTHING;
```

For real writings, use the published URL pathname without the domain, query string, fragment, or trailing slash. For example, `https://joseeden.com/writings/example/` becomes `/writings/example`.

Register each writing before enabling its buttons. Do not let the public API create post records from arbitrary user input.

**Note**: Paths are convenient identifiers, but changing a writing's slug requires migrating its reaction records. A permanent frontmatter ID is an alternative if URLs change frequently.

## Build the Reactions API

The reactions API sits between the browser and PostgreSQL. It validates each request, updates the database when needed, and returns the latest reaction counts and selections.

### Endpoint Contract

Use separate operations to read, add, and remove reactions. This makes repeated requests predictable and avoids changing a selection twice by mistake.

Use one `/reactions` endpoint with three methods:

| Method   | Purpose                                       |
| -------- | --------------------------------------------- |
| `GET`    | Read totals and the current browser selection |
| `PUT`    | Ensure a specific reaction exists             |
| `DELETE` | Ensure a specific reaction is absent          |

Send `postId` in the query string. Send the browser identifier in `X-Visitor-Id`. For writes, send JSON containing `reaction`.

Using explicit add and remove operations makes retries safe. Retrying a toggle endpoint could unintentionally reverse a successful earlier request.

Example write body:

```json
{
  "reaction": "love"
}
```

### Function Configuration

The configuration tells Neon which function to deploy. It also defines the website origins allowed to call the API from a browser.

Create `backend/reactions/neon.ts`:

```ts
import { defineConfig } from '@neon/config/v1';

export default defineConfig({
  functions: {
    reactions: {
      name: 'Joeden writing reactions',
      source: './functions/reactions.ts',
      env: {
        ALLOWED_ORIGINS:
          process.env.REACTIONS_ALLOWED_ORIGINS ?? 'http://localhost:3000',
      },
      dev: { port: 8787 },
    },
  },
});
```

The current configuration uses a top-level `functions` field. Older examples use a deprecated `preview` wrapper. See the [neon.ts reference](https://neon.com/docs/reference/neon-ts).

Neon injects `DATABASE_URL` for the linked branch. This example does not enable Neon Auth or the Data API because the function implements the anonymous API itself.

### Request Handler

The handler validates requests and runs the database queries. It returns updated totals after each successful change.

Create `backend/reactions/functions/reactions.ts`:

```ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { bodyLimit } from 'hono/body-limit';
import { attachDatabasePool } from '@neon/functions';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  connectionTimeoutMillis: 10_000,
  statement_timeout: 10_000,
});
attachDatabasePool(pool);

const app = new Hono();
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS ?? '')
    .split(',').map((value) => value.trim()).filter(Boolean),
);
const kinds = [
  'like', 'celebrate', 'hype', 'love',
  'applaud', 'admire', 'boost', 'smile',
];
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

app.use('*', async (c, next) => {
  c.header('Cache-Control', 'no-store');
  const origin = c.req.header('Origin');
  if (!origin || !allowedOrigins.has(origin)) {
    return c.json({ error: 'Origin not allowed' }, 403);
  }
  await next();
});

app.use('*', cors({
  origin: (origin) => allowedOrigins.has(origin) ? origin : '',
  allowMethods: ['GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-Visitor-Id'],
  exposeHeaders: ['Retry-After'],
  maxAge: 600,
}));

app.use('*', bodyLimit({
  maxSize: 1024,
  onError: (c) => c.json({ error: 'Request body too large' }, 413),
}));

app.on(['GET', 'PUT', 'DELETE'], '/reactions', async (c) => {
  const postId = c.req.query('postId') ?? '';
  const visitorId = c.req.header('X-Visitor-Id') ?? '';

  if (postId.length > 300 || !postId.startsWith('/writings/') ||
      !uuidPattern.test(visitorId)) {
    return c.json({ error: 'Invalid post or visitor identifier' }, 400);
  }

  const post = await pool.query(
    'SELECT 1 FROM public.reaction_posts WHERE post_id = $1 AND enabled',
    [postId],
  );
  if (post.rowCount === 0) {
    return c.json({ error: 'Writing not registered' }, 404);
  }

  if (c.req.method !== 'GET') {
    if (!c.req.header('Content-Type')?.toLowerCase()
      .startsWith('application/json')) {
      return c.json({ error: 'Expected application/json' }, 415);
    }
    const body = await c.req.json().catch(() => null);
    if (!body || !kinds.includes(body.reaction)) {
      return c.json({ error: 'Invalid reaction' }, 400);
    }

    const limit = await pool.query(`
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
    `, [visitorId]);

    if (limit.rows[0].requests > 30) {
      c.header('Retry-After', '60');
      return c.json({ error: 'Too many requests; try again shortly' }, 429);
    }

    if (c.req.method === 'PUT') {
      await pool.query(`
        INSERT INTO public.writing_reactions (post_id, visitor_id, reaction)
        VALUES ($1, $2, $3)
        ON CONFLICT (post_id, visitor_id, reaction) DO NOTHING
      `, [postId, visitorId, body.reaction]);
    } else {
      await pool.query(`
        DELETE FROM public.writing_reactions
        WHERE post_id = $1 AND visitor_id = $2 AND reaction = $3
      `, [postId, visitorId, body.reaction]);
    }
  }

  const result = await pool.query(`
    SELECT reaction, count(*)::integer AS count,
           bool_or(visitor_id = $2::uuid) AS selected
    FROM public.writing_reactions
    WHERE post_id = $1
    GROUP BY reaction
  `, [postId, visitorId]);

  const counts = Object.fromEntries(kinds.map((kind) => [kind, 0]));
  const selected: string[] = [];
  for (const row of result.rows) {
    counts[row.reaction] = row.count;
    if (row.selected) selected.push(row.reaction);
  }
  return c.json({ postId, counts, selected });
});

app.onError((_error, c) => {
  // Keep connection strings, visitor identifiers, and SQL details out of responses.
  console.error('Reaction request failed');
  return c.json({ error: 'Reactions temporarily unavailable' }, 503);
});

export default app;
```

Use a reusable `pg` pool for Neon Functions. `attachDatabasePool` handles idle connection errors and requires `@neon/functions` 0.8.0 or later. This follows the [Functions connection guidance](https://neon.com/docs/compute/functions/get-started#define-your-function).

All visitor-supplied SQL values use parameters rather than string concatenation. See [node-postgres parameterized queries](https://node-postgres.com/features/queries).

The request middleware uses Hono's [CORS configuration](https://hono.dev/docs/middleware/builtin/cors) and [body size limit](https://hono.dev/docs/middleware/builtin/body-limit).

### Limits of the Example

This example provides basic request checks and duplicate protection. Anonymous identifiers still have limits, especially when someone deliberately sends automated requests.

- CORS restricts browser access from other origins, but it does not authenticate callers.
- A script can forge the Origin header and generate new visitor identifiers.
- The write limiter is shared through PostgreSQL, but read requests still reach the database without a rate limit.
- Visitor identifiers act as anonymous selection tokens, so do not expose a list of them through the API.
- The injected database role may have more access than this endpoint needs.

Before a wider public launch, add a gateway rate limit for reads and writes, or a verified challenge for suspicious traffic. Apply limits before database queries where possible. Configure a dedicated database role with only the necessary table permissions if sharing a database with other features.

## Local Setup and Testing

1. Navigate to the correct directory and run the `npm` command using Node.js 24.

    If you're using `nvm`, switch with:

    ```bash
    nvm use 24 
    ```

    If Node 24 isn't installed:

    ```bash
    nvm install 24
    nvm use 24
    ```

    Verify:

    ```bash
    node --version   
    ```

    Run the command to install the dependencies:

    ```bash
    cd joeden/backend/reactions
    npm ci
    ```

    You should see something like this:

    ```bash
    added 157 packages, and audited 158 packages in 39s
    ```

2. Verify the backend locally.

    ```bash
    npm run typecheck
    npm test
    ```

    **Note:** During `npm test`, you may see output similar to the following:

    ```bash
    Reaction request failed

    ✔ retries, distinct visitors, multiple kinds, and removal preserve shared totals (2296.342219ms)
    ✔ rejects invalid visitors, reactions, unknown posts, and origins (6.843959ms)
    ✔ handles preflight without needing a visitor and keeps responses private (4.866241ms)
    ✔ enforces JSON and body limits (6.023852ms)
    ✔ shared write limiter blocks repeated requests and allows an expired window (220.887097ms)
    ✔ database enforces uniqueness and allowed reaction kinds independently of API (7.556565ms)
    ✔ database failures do not expose credentials (2.426621ms)    
    ```

    The `Reaction request failed` message is expected during this test suite. One of the tests deliberately exercises an error path, causing the application to log the failed request while handling the simulated failure.    

    The sequence is:

    1. The test intentionally causes a failure.
    2. The API catches the error.
    3. The application logs `Reaction request failed`.
    4. The API returns a safe error response.
    5. The test verifies the response.
    6. The test passes.

    As long as the final test summary reports `fail 0`, the test suite completed successfully.

    The log message is generated here:

    ```bash
    joseeden@TOWER-1:reactions$ grep -Rni "Reaction request failed" .
    ./functions/app.ts:170:    console.error("Reaction request failed");
    ```

    This confirms that the message comes from the application's error-handling code rather than from the test runner itself.

3. Check whether `psql` is installed:

    ```bash
    psql --version
    ```

    If it is not installed:

    ```bash
    sudo apt update
    sudo apt install postgresql-client
    ```

4. Load the environment variables from `.env.local`:

    ```bash
    set -a
    source .env.local
    set +a
    ```

    `psql` does not automatically load environment files, so this step makes `DATABASE_URL` available in the current terminal session.

    **Note:** Make sure you aded the connection string to the `.env` file. See [Retrieve the Connection String](#retrieve-the-connection-string).

5. Apply the SQL schema to the database:

    ```bash
    psql "$DATABASE_URL" -f ./sql/001-reactions.sql
    ```

    Expected output:

    ```text
    CREATE TABLE
    CREATE TABLE
    CREATE INDEX
    CREATE TABLE
    ```

6. Run the API locally:

    ```bash
    npm run dev
    ```

    **Note:** I encountered the following error during local testing:

    ```text
    file:///mnt/c/Git/joeden/backend/reactions/node_modules/client.gen.js:1
    import { createSseClient } from "../core/serverSentEvents.gen.js";
            ^^^^^^^^^^^^^^^^
    SyntaxError: The requested module '../core/serverSentEvents.gen.js' does not provide an export named 'createSseClient'
        at #asyncInstantiate (node:internal/modules/esm/module_job:455:21)
        at async ModuleJob.run (node:internal/modules/esm/module_job:553:5)
        at async node:internal/modules/esm/loader:647:26
    ```

    This may indicate a corrupted or inconsistent dependency installation rather than an issue with the reaction code itself.

    In WSL, reinstall the backend dependencies using a fresh npm cache:

    ```bash
    cd ./backend/reactions

    npm ci --cache /tmp/joeden-reactions-npm-cache --prefer-online

    npm run dev
    ```

    If the reinstall completes successfully, retry `npm run dev`.

7. Open a second WSL terminal, navigate to the **repository root**, and start the website.

    For WSL or Linux:

    ```bash
    REACTIONS_API_URL=http://localhost:8787 npm run start
    ```

    For PowerShell:

    ```powershell
    $env:REACTIONS_API_URL = 'http://localhost:8787'
    npm run start
    ```

    **Troubleshooting:** If you see the following error:

    ```text
    sh: 1: docusaurus: not found
    ```

    This usually means the Docusaurus dependencies have not been installed in the **repository root**.

    Install the dependencies from the repository root:

    ```bash
    cd joeden
    npm ci
    ```

    After the install finishes, run the start command again.

For production, set the GitHub repository Actions variable `REACTIONS_API_URL` to the production function's HTTPS origin. The website build workflow passes this public value to Docusaurus. Changing the endpoint requires rebuilding the website; no database credentials belong in that variable.

## Validate the Backend API

After the local server is running, test the API directly before relying on the website UI. Check normal reactions, duplicate requests, removals, and invalid input against the development branch.

### Start Locally

Run the function locally to test changes quickly. It still connects to the linked Neon database, so confirm the development branch first.

From `backend/reactions`, run:

```powershell
npx neon dev
```

Confirm that the CLI reports the development branch and the local function address. Local function execution still uses the linked Neon database, so these tests write real records to that branch.

### Read and Add a Reaction

Start by reading the counts for the test writing. Then add one reaction and check that the saved total changes.

Open a second PowerShell terminal:

```powershell
$reactionApi = 'http://localhost:8787'
$postId = '/writings/reaction-test'
$visitorId = [guid]::NewGuid().ToString()
$headers = @{
  Origin = 'http://localhost:3000'
  'X-Visitor-Id' = $visitorId
}
$uri = $reactionApi + '/reactions?postId=' + [uri]::EscapeDataString($postId)

Invoke-RestMethod -Uri $uri -Headers $headers

$body = @{ reaction = 'love' } | ConvertTo-Json
Invoke-RestMethod -Uri $uri -Method Put -Headers $headers `
  -ContentType 'application/json' -Body $body
```

The first response should contain zero counts for a new test writing. The second should contain `love: 1` and include `love` in `selected`.

### Verify Duplicate and Remove Behavior

Repeated requests should not create duplicate reactions. Removing a reaction should affect only the selection associated with that browser identifier.

1. Repeat the same `PUT` request with the same identifier. The count should stay at one.
2. Generate a second visitor identifier and repeat the request. The count should become two.
3. Read using the original identifier. Its selection should still include `love`.
4. Remove the original visitor's reaction using the command below.
5. Repeat the removal. The count should remain unchanged after the first removal.

```powershell
Invoke-RestMethod -Uri $uri -Method Delete -Headers $headers `
  -ContentType 'application/json' -Body $body
```

To test a second identifier without replacing the original headers:

```powershell
$otherHeaders = @{
  Origin = 'http://localhost:3000'
  'X-Visitor-Id' = [guid]::NewGuid().ToString()
}
Invoke-RestMethod -Uri $uri -Method Put -Headers $otherHeaders `
  -ContentType 'application/json' -Body $body
```

### Verify Rejected Requests

The API should reject invalid requests without changing reaction data. Check the response codes below to confirm each validation rule works.

| Test                                      | Expected result                     |
| ----------------------------------------- | ----------------------------------- |
| Invalid visitor UUID                      | `400`                               |
| Unsupported reaction                      | `400`                               |
| Malformed JSON                            | `400`                               |
| Unregistered writing                      | `404`                               |
| Missing or unapproved Origin              | `403`                               |
| Non-JSON write body                       | `415`                               |
| Body larger than 1 KB                     | `413`                               |
| More than 30 valid writes within a minute | `429` with `Retry-After`            |
| Database temporarily unavailable          | `503` with a generic error message  |

Check CORS preflight separately:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri $uri -Method Options -Headers @{
  Origin = 'http://localhost:3000'
  'Access-Control-Request-Method' = 'PUT'
  'Access-Control-Request-Headers' = 'content-type,x-visitor-id'
}
```

Expect a successful response with the approved origin, methods, and headers. PowerShell does not enforce CORS itself, so a browser test is also required.

### Register the Writing Used for Browser Testing

Register the actual writing before checking its reaction buttons in the browser. If the API returns `404` with `Writing not registered`, the component hides the buttons.

The file `backend/reactions/sql/002-register-un-cafe-por-favor.sql` registers `/writings/un-cafe-por-favor`. It can be rerun safely and enables an existing writing without changing its saved reactions.

Apply `001-reactions.sql` first if the tables do not exist yet. Confirm that `.env.local` points to the same development branch and database used by the running API.

From a separate WSL or Linux terminal, run:

```bash
cd /mnt/c/Git/joeden/backend/reactions

node --env-file=.env.local --input-type=module <<'NODE'
import { readFile } from 'node:fs/promises';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from the environment.');
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();
  const sql = await readFile(
    'sql/002-register-un-cafe-por-favor.sql', 'utf8'
  );
  await client.query(sql);
  console.log('Writing registered successfully.');
} finally {
  await client.end();
}
NODE
```

This command uses the installed `pg` dependency and Node.js 24 to execute the SQL file. It writes to the configured Neon database, so check the selected branch before running it.

After the success message, refresh `http://localhost:3000/writings/un-cafe-por-favor` and scroll to the bottom. All eight reaction buttons should appear with zero counts for a writing that has no reactions; neither the website nor the API needs restarting for this database change.

**Note**: If the button is still missing, inspect the `/reactions?postId=` request in browser DevTools. A `404` can mean the path was registered in a different branch or database from the one the API uses.

## Deploy the Function

Once local testing passes, deploy the API so the website can reach it over HTTPS. Deploy to the development branch first, verify it, then prepare production.

### Deploy to the Development Branch

Deploy to the development branch first. This gives you a hosted API URL for testing without changing production.

Keep `dev-reactions` linked and run from `backend/reactions`:

```powershell
npx neon config plan
npx neon deploy
npx neon functions get reactions -o yaml
```

Review the plan before applying it. Wait for deployment to complete, and copy the returned `invocation_url`. Do not construct an endpoint URL from an example branch name.

Repeat the API tests with `$reactionApi` set to that URL without its trailing slash. The permitted Origin is still `http://localhost:3000` in this development deployment.

### Prepare Production

Production needs its own schema, registered writings, and function deployment. Confirm the target branch before applying each change.

1. Open the Neon SQL Editor on the production branch and confirm the database.
2. Run `001-reactions.sql` there.
3. Register the real writing paths in `reaction_posts`.
4. Return to the linked backend folder and run `npx neon checkout main` to select the production branch. Replace `main` if your production branch has a different name.
5. Configure the production origin, review the plan, and deploy.
6. Retrieve the production function URL and verify its branch.

```powershell
$env:REACTIONS_ALLOWED_ORIGINS = 'https://joseeden.com'
npx neon config plan
npx neon deploy
npx neon functions get reactions -o yaml
Remove-Item Env:REACTIONS_ALLOWED_ORIGINS
```

For WSL or Linux, use these commands from the backend folder:

```bash
export REACTIONS_ALLOWED_ORIGINS=https://joseeden.com
npx neon config plan
npx neon deploy
npx neon functions get reactions -o yaml
unset REACTIONS_ALLOWED_ORIGINS
```

Add another origin only if the site really serves pages there. Origins contain the scheme and hostname, plus a port when applicable. They do not include paths or trailing slashes.

`neon.ts` reads this value at deployment time. Changing the local variable after deploying does not change the running function. See [user-defined function variables](https://neon.com/docs/compute/functions/environment-variables#user-defined-variables).

**Note**: These commands deploy backend resources. They are instructions for the later setup, not commands executed as part of writing this KB.

## Connect the Writing Pages

After the backend is working, connect the Writings pages to the API. The React component loads reaction counts, tracks the current browser's selections, and sends add or remove requests.

### Planned Frontend Files

Keep the reaction interface in a reusable component. A small theme wrapper places it beneath each writing without changing the docs layout.

| File                                                 | Purpose                                  |
| ---------------------------------------------------- | ---------------------------------------- |
| `src/components/WritingReactions/index.tsx`          | Load counts and handle selections        |
| `src/components/WritingReactions/styles.module.scss` | Style the reaction buttons and counts    |
| `src/theme/BlogPostItem/Footer/index.tsx`            | Attach reactions to individual writings  |

The included component displays all eight reaction buttons in a row, including reactions with zero counts. The row wraps on smaller screens, and each button supports keyboard access and shows its selected state.

### Create a Browser Identifier

Generate a random identifier so the backend can recognize a browser's selections. Store it locally and reuse it for later visits.

Read or create the identifier inside a React effect, not during module initialization or server rendering:

```ts
function getVisitorId(): string {
  const key = 'joeden.reactions.visitor.v1';
  const stored = window.localStorage.getItem(key);
  const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (stored && valid.test(stored)) return stored;
  const created = window.crypto.randomUUID();
  window.localStorage.setItem(key, created);
  return created;
}
```

Catch storage errors in the calling component. If storage is unavailable, use an in-memory UUID for that page session and explain that selections will not persist across visits. Do not generate a new UUID for every click.

### Call the API

Use the development function URL while testing and the production URL for the live site. Set it through `REACTIONS_API_URL`, which becomes the public `customFields.reactionsApiUrl` value in Docusaurus.

```ts
const API_BASE = 'https://REPLACE-WITH-THE-FUNCTION-HOST';

async function requestReactions(
  postId: string,
  visitorId: string,
  method: 'GET' | 'PUT' | 'DELETE' = 'GET',
  reaction?: string,
  signal?: AbortSignal,
) {
  const url = new URL('/reactions', API_BASE);
  url.searchParams.set('postId', postId);
  const headers: Record<string, string> = { 'X-Visitor-Id': visitorId };
  if (method !== 'GET') headers['Content-Type'] = 'application/json';

  const response = await fetch(url, {
    method,
    headers,
    credentials: 'omit',
    signal,
    body: method === 'GET' ? undefined : JSON.stringify({ reaction }),
  });
  if (!response.ok) {
    throw new Error(`Reaction request failed (${response.status})`);
  }
  return response.json();
}
```

The browser supplies the Origin header automatically. Do not try to set it from frontend JavaScript.

Implement the component behavior in this order:

1. Initialize a visitor ID after the component mounts.
2. Load `counts` and `selected` using `GET`.
3. Enable the buttons after the initial request succeeds.
4. Send `PUT` when an unselected reaction is clicked, or `DELETE` when a selected reaction is clicked.
5. Disable writes while a request is pending to avoid conflicting rapid clicks.
6. Replace local counts and selections with the successful server response.
7. Show a retry message when a request fails, and respect `Retry-After` for `429` responses.

Abort loading requests on unmount, and ignore stale responses when navigating between writings. After an ambiguous write failure, reload the saved state or retry the same explicit operation. Do not present an unsaved optimistic count as confirmed.

### Add the Footer Wrapper

The footer wrapper adds reactions below the writing content. It keeps the existing footer and excludes writing list pages.

Once `WritingReactions` exists and accepts a `postId` prop, create `src/theme/BlogPostItem/Footer/index.tsx`:

```tsx
import React from 'react';
import OriginalFooter from '@theme-original/BlogPostItem/Footer';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import WritingReactions from '@site/src/components/WritingReactions';

export default function BlogPostItemFooterWrapper() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const postId = metadata.permalink.replace(/\/+$/, '');

  return (
    <>
      {isBlogPostPage && (
        <WritingReactions key={postId} postId={postId} />
      )}
      <OriginalFooter />
    </>
  );
}
```

This places reactions before the existing footer content on full writing pages. The `isBlogPostPage` check excludes writing lists and tag results. The key remounts the component when the writing changes.

The installed theme calls the footer even when there are no tags. Wrapping it preserves the existing footer and keeps this change separate from the header customization. See [Docusaurus theme wrapping](https://docusaurus.io/docs/swizzling#wrapping).

Do not modify `src/theme/DocItem/Layout/index.js` for this phase. That file contains the existing Giscus integration for docs.

### Reaction Button Requirements

Make the reaction controls easy to use with a mouse, touch, or keyboard. Show saved selections clearly and provide feedback while requests are loading.

- Use real buttons with descriptive labels such as `Add love` and `Remove love`.
- Set `aria-pressed` from the server's selected reactions.
- Support keyboard focus and visible focus indicators.
- Mark decorative SVG icons as hidden from assistive technology.
- Support light and dark themes, and honor reduced-motion preferences.
- Keep all eight reaction buttons visible, and allow the row to wrap on smaller screens.
- Distinguish loading or unavailable counts from confirmed zero counts.

## Validate the Website

Test the full flow after the frontend is connected to the API. Confirm that reactions persist, totals are shared correctly, and API failures do not break the reading experience.

Run from the repository root after implementing the frontend:

```powershell
Set-Location C:\Git\joeden
npm run start
```

1. Open a registered writing and verify that saved totals load.
2. Add and remove a reaction, and refresh to verify persistence.
3. Use a private window to verify that totals are shared while selections are separate.
4. Navigate to another writing and verify its counts are independent.
5. Confirm there are no reaction buttons on the writings list or docs pages.
6. Disable the network and confirm that failures produce a retry state without breaking the article.
7. Test keyboard navigation and the mobile layout.
8. Inspect browser requests and confirm no database credentials appear.

Run the production build:

```powershell
npm run build
```

The site build should not query Neon or require database credentials. Database calls happen from the mounted browser component through the API.

Publishing the website is a separate step. The existing GitHub Actions workflow deploys pushes to `master` and now reads the optional `REACTIONS_API_URL` repository variable. Preparing or testing the feature does not require committing or pushing.

## Maintenance

After launch, keep the registered writing paths and backend configuration up to date. Review usage occasionally and clean up expired request-limit records.

### Register New Writings

Insert each new normalized path into `reaction_posts` before publication. Repeat the insert with `ON CONFLICT DO NOTHING` safely if the path already exists.

To temporarily disable reactions for a specific writing while retaining its data:

```sql
UPDATE public.reaction_posts
SET enabled = false
WHERE post_id = '/writings/example';
```

The frontend should hide or disable the controls when the API returns `404` for an unavailable writing.

### Review Data and Usage

Review saved totals and service usage after launch. This helps spot unexpected activity and track the free plan allowances.

Use this query to inspect totals without displaying visitor identifiers:

```sql
SELECT post_id, reaction, count(*) AS total
FROM public.writing_reactions
GROUP BY post_id, reaction
ORDER BY post_id, reaction;
```

- Review database storage, compute, and function usage in the Neon Console.
- Fetch counts on page load and after changes instead of polling continuously.
- Keep personalized responses uncached because they contain visitor selections.
- Add a separate cached public totals endpoint later if read traffic becomes significant.
- Review the account's current recovery window, and export backups before schema changes.

Clean old limiter records periodically on the intended branch:

```sql
DELETE FROM public.reaction_request_limits
WHERE window_start < now() - interval '1 day';
```

This removes expired request-limit bookkeeping, not reaction records. The next request from that visitor starts a new window.

### Privacy and Credentials

Document the browser identifier and reaction storage in the site's privacy information. Avoid collecting names, emails, or raw IP addresses for this basic feature.

If a database connection string is exposed, rotate the affected role password, update the backend credentials, and verify access. Removing a visible copy alone does not invalidate the exposed password.

## Troubleshooting

When something fails, first check the linked Neon branch, function URL, and HTTP response before changing the code.

| Symptom                          | Check or action                                                       |
| -------------------------------- | --------------------------------------------------------------------- |
| Function cannot deploy           | Verify that the project region supports Functions and update the CLI  |
| Unknown `functions` config key   | Update `@neon/config`; older releases used a `preview` wrapper        |
| Table does not exist             | Apply the schema to the branch and database used by the function      |
| Correct code, unexpected counts  | Check the linked branch and the frontend's function URL               |
| Browser reports CORS failure     | Match the exact site origin and verify the `OPTIONS` response         |
| `404` for a writing              | Register its normalized permalink and check `enabled`                 |
| Counts grow on retries           | Confirm the composite primary key and `ON CONFLICT DO NOTHING`        |
| Selections disappear             | Check whether browser storage was cleared, blocked, or changed        |
| First request is slow            | Allow for database wake-up and display a loading state                |
| Repeated `429` responses         | Wait before retrying and inspect excessive click or retry behavior    |
| Build says `window` is undefined | Move browser storage access into an effect                            |
| Function returns `503`           | Inspect provider logs, database availability, credentials, and quotas |

## References

These sources explain the services and integration patterns used in this guide. Check the current documentation when updating commands or configuration.

- [Neon Functions setup](https://neon.com/docs/compute/functions/get-started)
- [Neon function environment variables](https://neon.com/docs/compute/functions/environment-variables)
- [Neon configuration reference](https://neon.com/docs/reference/neon-ts)
- [Neon Free plan storage update](https://neon.com/blog/neon-free-plan-1-gb-per-project)
- [Neon pricing](https://neon.com/pricing)
- [Parameterized queries with node-postgres](https://node-postgres.com/features/queries)
- [Docusaurus swizzling](https://docusaurus.io/docs/swizzling)
- [Blog post page implementation](./042-Blog-Post-Page-Implementation.md)
