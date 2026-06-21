---
title: "Probably Important"
description: "Note-taking application with Next.js, Bun, and Claude-assisted development"
tags: 
- Web Development
- HTML
- CSS
- JavaScript
- Next.js
- TypeScript
- Claude
sidebar_position: 41
# last_update:
#   date: 4/23/2019
---

import React from "react";

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)](#) [![Next.js](https://img.shields.io/badge/Next.js-323330?style=for-the-badge&logo=next.js&logoColor=white)](#) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](#) [![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#) [![Neon PostgreSQL](https://img.shields.io/badge/Neon%20PostgreSQL-1E1E1E?style=for-the-badge&logo=postgresql&logoColor=white)](#) [![TipTap](https://img.shields.io/badge/TipTap-111827?style=for-the-badge&logoColor=white)](#) [![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=fff)](#)

## Overview

This project is a note-taking application called "Probably Important".

The app is designed for authenticated users who need a simple place to write, organize, search, and share notes.

The planned stack includes:

| Tool             | Used For           |
| ---------------- | ------------------ |
| Next.js          | App framework      |
| Bun              | Runtime            |
| TypeScript       | Type safety        |
| Tailwind CSS     | Styling            |
| better-auth      | Authentication     |
| Prisma           | Database access    |
| Neon PostgreSQL  | Database storage   |
| TipTap           | Rich text editing  |

## Core Features

These are the main features planned for the app.

- Create, edit, and delete notes.
- Store a title, content, and timestamp for each note.
- Render notes in a list for quick browsing.
- Search notes by title or content.
- Restrict access so each user only sees their own notes.
- Share notes publicly through a unique URL.

The app will provide rich text formatting options:

- Bold, Italic, and Underline
- Headings
- Bullet and Numbered Lists
- Links
- Blockquotes
- Horizontal Separator Lines

## Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [Bun](https://bun.com/docs/installation)

## Environment Setup

### Create the Project

Create the project directory that will contain the note-taking application.

**Note:** Do not navigate into the project directory.

```bash
mkdir project-probably-important 
```

Create the application using the Next.js generator. 

Make sure to specify the new project directory you just created.

```bash
bun create next-app project-probably-important
```

You can choose the default settings for now, if prompted. 

<!-- Select the following options:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src directory: No
App Router: Yes
Import alias: Yes
``` -->

The Next.js generator automatically creates the initial project structure and installs the required dependencies.

**Note:** These files are generated and do not need to be created manually.

```text
project-probably-important/
├── app/
├── public/
├── package.json
├── bun.lock
├── tsconfig.json
├── next.config.js
├── eslint.config.mjs
├── postcss.config.mjs
└── README.md
```

The project is stored in GitHub at: [Probably-Important](https://github.com/joseeden/Probably-Important)


### Start the Development Server

Move into the project directory:

```bash
cd project-probably-important
```

Run the application:

```bash
bun run dev
```

Output:

```text
Local: http://localhost:3030
```

Open the application in a browser:

```text
http://localhost:3030
```

<div class='img-center'>

![](/img/docs/Screenshot2026-06-16022451.png)

</div>

## Claude Build Prompt

To assist with building the app, we can use Claude as a coding assistant. 

When asking Claude for help, we can use the following prompt:

> I want to build a note-taking app called "Probably Important" using Next.js.
> 
> The app should allow users to create, edit, and delete notes.
> 
> Each note should have a title and content. The note should be created with a timestamp and should be displayed in a list of notes.
> 
> Notes should be created and edited using a rich text editor (using TipTap) that allows users to format their notes with bold, italic, and underline options.
> 
> The app should also have a search functionality to find notes by title or content.
> 
> Additionally, I want to implement user authentication so that users can only access their own notes.
> 
> Authenticated users should be able to:
> 
> - Login and log out
> - Create new notes
> - View, update, and delete their existing notes
> - Search through their notes
> - Share notes publicly with a unique URL
> 
> The app should be built using Next.js with Bun as the runtime.
> 
> Typescript should be used for type safety, and Tailwind CSS should be used for styling.
> 
> The backend should be implemented using Next.js API routes, and the frontend should be built with React components.
> 
> Authentication should be implemented using better-auth, and the database should be managed with Prisma and Neon PostgreSQL.
> 
> The rich editor should be implemented using TipTap, and the search functionality should be implemented using a simple text search on the database.
> 
> The basic rich text editor should support the following formatting options:
> 
> - Bold
> - Italic
> - Underline
> - Headings
> - Bullet list
> - Numbered list
> - Links
> - Blockquote
> - Horizontal separator lines
> 
> The data will be stored in a Neon PostgreSQL database, and Prisma will be used as the ORM to interact with the database.
> 
> Before implementing any code, create a `SPEC.md` document and wait for approval.
> 
> DO NOT generate application code, database migrations, configuration files, or project scaffolding until the specifications in `SPEC.md` have been reviewed and approved.
> 
> The specification should define:
> 
> - Project overview
> - Functional requirements
> - Non-functional requirements
> - User flows
> - Database schema
> - Authentication flow
> - API endpoints
> - Frontend pages and components
> - Folder structure
> - Third-party dependencies
> - Implementation phases
> 
> The specification should be concise, practical, and focused on the requirements described above. Avoid adding unnecessary features that are not part of the project scope.
> 
> Keep the implementation simple and production-ready. Favor straightforward solutions over advanced patterns unless they are required by the project requirements.

Note that it won't implement the application yet, it will first create the `SPEC.md` file that outlines the project specifications and requirements.

It is highly recommended to generate the `SPEC.md` file before starting the implementation of the app. This will help ensure that the project is well-defined and that all requirements are clearly understood before development begins.

You can paste the prompt above into the Claude CLI or in the Claude Code extension in VS Code to generate the `SPEC.md` file.

In my case, I used the Claude Code extension in VS Code first.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-21181603.png)

</div>

After generating the `SPEC.md` file, you can review it and make any necessary adjustments before proceeding with the implementation of the app. 


## Install Project Dependencies

The generated Next.js project already includes the basic framework packages:

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- ESLint and React/Node type packages

Based on the approved `SPEC.md`, the app still needs extra packages for authentication, validation, database access, and rich text editing.

<!-- These packages are needed for the planned app: -->

| Package                       | Used For                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `better-auth`                 | User signup, login, logout, and sessions                                                 |
| `zod`                         | Runtime validation for API request bodies                                                |
| `prisma`                      | Prisma CLI for schema and migrations                                                     |
| `@prisma/client`              | Database client used by the app                                                          |
| `@neondatabase/serverless`    | Neon PostgreSQL connection support                                                       |
| `@tiptap/react`               | React integration for TipTap                                                             |
| `@tiptap/pm`                  | ProseMirror packages required by TipTap                                                  |
| `@tiptap/starter-kit`         | Core editor features like bold, italic, headings, lists, blockquote, and horizontal rule |
| `@tiptap/extension-underline` | Underline formatting                                                                     |
| `@tiptap/extension-link`      | Link formatting                                                                          |
| `@types/bun`                  | TypeScript types for Bun APIs                                                            |

Normally in JS projects, you would use `npm install` to add packages. However, this project uses Bun as the runtime, so we will use `bun add` instead. 

**Note 1:** Mixing package managers can create multiple lockfiles, such as both `bun.lock` and `package-lock.json`.

Before running the install commands, make sure you are in the project directory:

```bash
cd project-probably-important
```

Install the runtime dependencies (these are the packages that the app needs to run):

```bash
bun add better-auth zod @prisma/client @neondatabase/serverless @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link
```

**Note 2:** The `@prisma/client` package is the Prisma database client your application code imports and uses at runtime. It is installed as a runtime dependency because it is required for the app to function properly.

**Note 3:** For JS projects, we do not need a Python-style virtual environment because the project dependencies are isolated in the project directory. The `bun.lock` file ensures that the same versions of packages are installed for all developers working on the project.

They do not overwrite global system packages, but just make sure you run the command from inside the project folder.

```bash
project-probably-important/node_modules/
project-probably-important/package.json
project-probably-important/bun.lock 
```

Install the development dependencies (only needed during development and testing, not in production):

```bash
bun add -D prisma @types/bun
```

**Note 4:** The `@prisma/client` package is installed as a runtime dependency, while the `prisma` package is installed as a development dependency. The `prisma` package is only needed for generating the Prisma client and running migrations, so it is not required in production.

After the packages have been added once, another developer can install everything from `package.json` and `bun.lock` with:

```bash
bun install
```

:::info 

You do not need to manually run every `bun add` command again unless you are adding new packages to the project.

:::

**Additional:** Since we are using Bun as the runtime, we will need to update the `package.json` scripts to use `bun run` instead of `npm run`.

```json
"scripts": {
  "dev": "bun run --bun next dev",
  "build": "bun run --bun next build",
  "start": "bun run --bun next start",
  "lint": "eslint"
},
```

**EDIT:** Since this project uses Prisma, we should avoid running Next.js with the Bun runtime. In testing, Bun and Turbopack caused issues resolving Prisma's externalized client, which can lead to `500` errors during database operations.

Keep using Bun as the package manager, but run Next with the normal Node runtime instead:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
},
```

## Setting up the Claude Project 

### Initialize

To initialize the Claude project, run the following command in the project directory:

```bash
claude init
```

This will create a `.claude` directory in the project root, which contains the configuration files for the Claude project. This will help Claude understand the project structure and provide better assistance during development.

Claude will detect the `SPEC.md` file and use it as a reference for the project specifications.

Finally, it also creates a `CLAUDE.md` file in the project root. This file will be loaded by Claude when working with the project, and it contains important information about the project structure, dependencies, and conventions.

Review the `CLAUDE.md` file and make any necessary adjustments to ensure that it accurately reflects the project setup and conventions. 

**EDIT:** As good practice, I added a mention in the `CLAUDE.md` file to remind Claude to keep its responses short. Longer responses means more tokens used, which can lead to hitting the token limit faster and losing context.

```
Keep the replies extremely concise and focused on the code. Avoid unnecessary explanations or commentary. Only provide information that is directly relevant to the code. Avoid long explanations, background information, or unrelated details. Focus on the code itself and its functionality.  
```

### Using MCP 

When Claude needs to check current documentation, it will often search the web directly from the main conversation. While this works, documentation pages can be very large and may contain extensive examples, migration guides, API references, and unrelated details. This can quickly consume context that would be better spent on the project itself.

This is especially common when working with fast-moving tools such as Next.js, better-auth, Prisma, Neon, Bun, and TipTap.

As an alternative, we can use an MCP server that is designed for documentation lookup. This allows Claude to search external documentation only when needed, and retrieve only the specific information needed for the current task.

Use MCP for:

- Checking the latest API syntax
- Verifying setup instructions
- Confirming framework-specific behavior
- Reviewing version-specific changes
- Avoiding outdated examples from model memory

The goal is not to copy documentation into the conversation, but to retrieve only the information required for the next implementation step. This keeps the main Claude context focused on the project files, `SPEC.md`, and the implementation plan.

For this project, I used **Context7** as the MCP server because it is focused on current library documentation. It also has a Claude Code plugin that can add documentation lookup tools, skills, commands, and a documentation research subagent.

There are a few possible ways to use it:

| Option                      | When to Use                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Context7 Claude Code Plugin | Recommended. Adds MCP tools, automatic docs lookup behavior, commands, and a `docs-researcher` agent. |
| Context7 MCP Only           | Good if you only need documentation lookup through MCP without the additional plugin features.        |
| Manual Web Search           | Works, but can fill the main context window with large documentation pages and unrelated details.     |


Inside Claude Code, install the Context7 plugin:

```bash
/plugin marketplace add upstash/context7
/plugin install context7@context7-marketplace
```

You can choose to install the plugin for the current project only, or for all projects.

```bash
  Install for you (user scope)
  Install for all collaborators on this repository (project scope)
> Install for you, in this repo only (local scope)     Back to plugin list 
```

If needed, reload plugins:

```bash
/reload-plugins
```

You can also use the Context7 setup command from the terminal:

```bash
npx ctx7 setup --claude
```

:::info 

Context7 can work without an API key, but the anonymous tier has lower rate limits. 

For a better experience, create a free Context7 API key from the Context7 dashboard, then add it to your shell profile:

```bash
export CONTEXT7_API_KEY="your-context7-api-key"
```

Note that this is optional for this project.

:::

Restart Claude Code after adding the environment variable.

To confirm the MCP server is available in Claude Code, run:

```bash
/mcp
```

You can also list configured MCP servers from the terminal:

```bash
claude mcp list
```

Output:

```bash
plugin:context7:context7: https://mcp.context7.com/mcp (HTTP) - ✔ Connected 
```

After setup, we can now ask Claude to use Context7 for documentation lookups instead of pasting docs into the main conversation.

> Use the documentation MCP server to check the current better-auth Prisma adapter setup. Return only the required imports, configuration shape, and any version-specific warnings. Do not paste the full documentation page.


While this works, it would mean adding this reminder every time you want to check documentation. A better approach is to create a subagent that can handle documentation lookup separately from the main conversation.

### Using Subagents 

For documentation-heavy tasks, we can use subagents so the main Claude conversation does not get polluted with long research notes. A subagent can inspect external documentation, compare options, and return a short summary to the main agent. This keeps the main thread focused on decisions and code changes instead of raw documentation.

This is useful when a task requires checking several sources before implementation. For example, better-auth, Prisma 7, Next.js 16, and TipTap may each have version-specific setup details.

If the Context7 plugin is installed, use its `docs-researcher` agent for this. The agent can research documentation in a separate context and return only the useful summary.

The subagent can be created at the global level to be used across projects, like this:

```bash
/home/joseeden/.claude
|
├── agents
|   └── docs-researcher
|       └── README.md
```

Alternatively, it can be created at the project level to be used only for this project:

```bash
/project-probably-important
|
├── .claude
|   └── agents
|       └── docs-researcher
|           └── README.md
```

> See [Probably Important - Subagent](https://github.com/joseeden/joeden/tree/master/prompts/general)

To ensure that Claude always use the subagent for documentation lookups, we can add a note in the `CLAUDE.md` file:

> When checking documentation, ALWAYS use the `docs-researcher` agent to perform the lookup. Return only the relevant summary and implementation guidance. Avoid pasting large documentation pages into the main conversation.


### Using Skills 

Skills are reusable instructions that help Claude handle specific types of tasks consistently. They can be used to guide common workflows such as documentation lookup, code review, or framework-specific implementation steps.

Like subagents, skills can be created at the global level to be used across projects, or at the project level to be used only for this project.

```bash
/home/joseeden/.claude
|
├── agents
|   └── skills
|       └── modern-best-practice-react-components
|           └── SKILL.md
```

For this project, we'll create a skill that guides Claude to build React components using modern best practices.

> See [Probably Important - Skills](https://github.com/joseeden/joeden/tree/master/prompts/skills)



## Implementation 

### Database Setup 

The application uses a serverless Postgres database hosted on Neon, which is a cloud-based Postgres service that provides a free tier for small projects.

Go to the Neon website to sign up for a free account: https://neon.com/

After signing up, click Create database and choose region closest to you:

<div class='img-center'>

![](/img/docs/Screenshot2026-06-21203200.png)

</div>

This provides an NPX command for connecting to your database using the Neon CLI, along with a connection string that can be used with any Postgres client. 

```bash
postgresql://******************************************************?sslmode=require...
```

Create a `.env.local` file in the project root and add the following environment variables:

```bash
DATABASE_URL="postgresql://...?...sslmode=require..."
BETTER_AUTH_SECRET="generate-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3030"
```

For the `BETTER_AUTH_SECRET`, you can generate a long random string using a password generator or a command like `openssl rand -hex 32`.

```bash
openssl rand -base64 32 
```

**NOTE:** The `BETTER_AUTH_URL` value should match the exact origin used by the development server. Since thee app will be run on port `3030`, the value is `http://localhost:3030`. If you use a different port later, update `BETTER_AUTH_URL` to match it before testing signup or login.


### Initial App Structure

To start the implementation of the app, we can use instruct Claude Code to generate code snippets based on the approved `SPEC.md` file.

Using the Claude CLI, use `/plan` to create a plan first without generating any code yet.

Prompt:

> /plan Build the "Probably Important" app based on the approved `SPEC.md` file.
> 
> Start with setting up the core route structure and the main pages for the app. 
> 
> Use dummy message content in the page.tsx files for now, and focus on creating the basic layout and navigation. 
> 
> Implement a single /auth route for email and password authentication using better-auth.

**EDIT:** Claude may decide to use separate routes for login and signup, which is fine. In my case, I want a single /auth route. 

It will list the steps to implement the app, and it will ask you some questions about the project. Review the plan and answer the questions. Once you are satisfied with the plan, you can approve it and Claude will start generating code snippets based on the plan.

Since better-auth is used here, it will ask you to select the database type. Choose PostgreSQL:

```bash
  1. Local SQLite now
     Set up Prisma with a local SQLite dev DB...
❯ 2. Neon Postgres now
     Full SPEC stack now. Requires you to provide a Neon DATABASE_URL in .env....
  3. Config only, no live DB
     Wire up the better-auth instance, /api/auth route....
  4. Type something.
```

When prompted for the page routes to implement, choose the full spec tree (if its an available option):

```bash
Which page routes should I scaffold as dummy pages now (alongside the working /auth route)?

❯ 1. Full SPEC tree
     Scaffold /, /auth, /notes/new, /notes/[id...
  2. Core only
     Scaffold just / (dashboard), /auth, and /notes/[id]...
  3. Type something.
```

For `/auth` route, choose the option that recommendes a single `/auth` route for both login and signup (this is aligned with the approved `SPEC.md` file):

```bash
How should the /auth page work?

❯ 1. Combined toggle
     One /auth page with a toggle/tab switching between Sign in and Sign up...
  2. Sign-in only + link
     /auth is sign-in; sign-up is a secondary mode....
  3. Type something.
```

It will return all your answers and ask you to confirm. 

Once you confirm, it will generate the code snippets for the app based on the approved `SPEC.md` file.

```bash
Review your answers

 ● better-auth needs a database to store users/sessions. How should I handle the DB for this step so auth actually works?
   → Neon Postgres now
 ● Which page routes should I scaffold as dummy pages now (alongside the working /auth route)?
   → Full SPEC tree
 ● How should the /auth page work?
   → Combined toggle

Ready to submit your answers?

❯ 1. Submit answers
  2. Cancel 
```

When prompted to execute, you can choose from the following options:

```bash
Claude has written up a plan and is ready to execute. Would you like to proceed?

  1. Yes, and use auto mode
❯ 2. Yes, manually approve edits
  3. Tell Claude what to change        shift+tab to approve with this feedback
```

The options may differ depending on the version of Claude you are using. In my case, I chose option 2 to manually approve edits. 

:::info 

There maybe a couple of steps where Claude will ask you to confirm before proceeding. This is to ensure that the generated code aligns with your expectations and the approved `SPEC.md` file.

If you want Claude to generate the code without asking for approval, you can choose option 1 to use auto mode. However, this may result in code that does not align with your expectations or the approved `SPEC.md` file.

:::

Once the code snippets are generated, you can review them and make any necessary adjustments before proceeding with the implementation of the app.

But first, test the app by running the development server:

```bash
PORT=3030 bun run dev   
```

**Note:** You can change the port as needed, but make sure to update `BETTER_AUTH_URL` in `.env.local` accordingly

Access the app in your browser at:

```text
http://localhost:3030
```

<div class='img-center'>

![](/gif/docs/21062026-probab-impt-1.gif)

</div>


After the initial route structure is in place, the next step is to connect the application to the real authentication and database layer.

### Authentication and Database Access

After the initial route structure is in place, the next step is to connect the application to the real authentication and database layer.

This step focuses only on the foundation: 

1. Prisma should connect to the Neon PostgreSQL database
2. better-auth should use Prisma for users and sessions
3. Shared database/auth helpers should live in the root-level `lib` folder.

At this stage, we'll avoid building the note CRUD features, editor, search, or public sharing flow. Those features will depend on the auth and database setup, so it is better to get this layer working first.

We'll use Claude to generate the code snippets for the auth and database access.
 
Prompt: 

> Implement authentication and database access based on the approved `SPEC.md` file.
> 
> Use Prisma with Neon PostgreSQL. Do not use SQLite, Drizzle, or raw SQL.
> 
> Add a `lib` folder in the project root for shared authentication and database utilities.
> 
> Create:
> 
> - `lib/db.ts`
> - `lib/auth.ts`
> 
> In `lib/db.ts`, export a Prisma Client singleton named `db`. It should use the `DATABASE_URL` environment variable through Prisma’s normal datasource configuration in `prisma/schema.prisma`.
> 
> In `lib/auth.ts`, configure better-auth using the Prisma adapter and the `db` client from `lib/db.ts`.
> 
> Also create or update `prisma/schema.prisma` with the required better-auth models and the app-owned `Note` model from `SPEC.md`.
> 
> Focus only on authentication setup, database access, and the Prisma schema. Do not implement any API routes, frontend pages, or other features at this time.


<!-- BELOW ARE ALREADY IMPLEMENTED. THIS IS ONLY ADDED IF /auth ROUTE IS NOT IMPLEMENTED IN THE PREVIOUS STEP. 
KEEPING BELOW PROMPT HERE FOR CONTEXT, BUT COMMENTING OUT.

Once the authentication and database foundation is in place, we can add the user-facing authentication page. This keeps the scope focused on the shared `/auth` route for login and signup before moving on to the note features.

Prompt: 

> Add a proper authentication route `/` pages that uses better-auth for email and password authentication. Use the combined toggle approach for login and signup, as specified in the approved `SPEC.md` file.
> 
> Users can switch between login and signup modes on the same page. This should be implemented using params or query strings to determine the current mode. For example, `/auth?mode=login` for login and `/auth?mode=signup` for signup.
> 
> The form should include fields for email and password, and a submit button that triggers the appropriate better-auth action based on the current mode.
> 
> Password reset and email verification flows are not required at this stage, but the form should handle basic validation for email format and password length.
> 
> Lastly, do not collect the user's names. If we need it, use the part of the email before the `@` symbol as a default name for the user. -->


After Claude generates the code, review the changed files before testing. For this step, the important files are:

- `lib/db.ts`
- `lib/auth.ts`
- `prisma/schema.prisma`
- `app/api/auth/[...all]/route.ts`

If the files look aligned with the prompt, generate the Prisma client and apply the database migration:

```bash
bun run db:generate
bun run db:migrate
```

**EDIT:** If you get this error:

```bash
error: script "db:migrate" exited with code 130 
```

This might mean that Prisma sees the database and migration history are disagreeing. Since this is a development database, the clean fix is usually:

1. Reset the database to clear all data and migration history.

    This will drop and recreate the database schema from the current migration files.

    ```bash
    bunx prisma migrate reset 
    ```

2. Generate a new migration from the current Prisma schema, which should now be in sync with the empty database.

    ```bash
    bun run db:generate
    bun run db:migrate
    ```

Once the migration is applied successfully, you should see the new tables in the database (in your Neon dashboard), including the `User` table for better-auth and the `Note` table for the app.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-22041409.png)

</div>

If the development server is not already running, start it again:

```bash
PORT=3030 bun run dev
```

Open the app in the browser:

```text
http://localhost:3030/auth
```

Create a test account from the auth page, then sign out or open a private browser window and try signing in with the same email and password. If signup and login both work without a `500` error, the auth route is talking to better-auth correctly.

<div class='img-center'>

![](/gif/docs/21062026-probab-impt-2.gif)

</div>

To confirm that the database is also being written to, open Prisma Studio:

```bash
bun run db:studio
```

Output:

```bash
Prisma Studio is running at: http://localhost:51212
```

Open the provided URL in the browser to access Prisma Studio, which is a visual interface for interacting with your database.

Check that the new user appears in the `User` table, and that better-auth has also created the related auth records such as sessions or accounts. 

<div class='img-center'>

![](/img/docs/Screenshot2026-06-22044247.png)

</div>


### Note CRUD API

### Notes Dashboard

### Rich Text Editor

### Search

### Public Sharing

### Final Polish


## Resources 

- [TipTap Docs - React](https://tiptap.dev/docs/editor/getting-started/install/react)
- [Neon documentation](https://neon.com/docs/introduction)
