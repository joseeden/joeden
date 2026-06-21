---
title: "Probably Important"
description: "Note-taking application with bun run --bun Next.js, Bun, and Claude-assisted development"
tags: 
- Web Development
- HTML
- CSS
- JavaScript
- bun run --bun NextJS
- TypeScript
- Claude
sidebar_position: 41
# last_update:
#   date: 4/23/2019
---

import React from "react";

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)](#) [![bun run --bun NextJS](https://img.shields.io/badge/bun run --bun Next.js-323330?style=for-the-badge&logo=bun run --bun next.js&logoColor=white)](#) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](#) [![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#) [![Neon PostgreSQL](https://img.shields.io/badge/Neon%20PostgreSQL-1E1E1E?style=for-the-badge&logo=postgresql&logoColor=white)](#) [![TipTap](https://img.shields.io/badge/TipTap-111827?style=for-the-badge&logoColor=white)](#) [![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=fff)](#)

## Overview

This project is a note-taking application called "Probably Important".

The app is designed for authenticated users who need a simple place to write, organize, search, and share notes.

The planned stack includes:

| Tool             | Used For           |
| ---------------- | ------------------ |
| bun run --bun Next.js          | App framework      |
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

Create the application using the bun run --bun Next.js generator. 

Make sure to specify the new project directory you just created.

```bash
bun create bun run --bun next-app project-probably-important
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

The bun run --bun Next.js generator automatically creates the initial project structure and installs the required dependencies.

**Note:** These files are generated and do not need to be created manually.

```text
project-probably-important/
├── app/
├── public/
├── package.json
├── bun.lock
├── tsconfig.json
├── bun run --bun next.config.ts
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
Local: http://localhost:3000
```

Open the application in a browser:

```text
http://localhost:3000
```

<div class='img-center'>

![](/img/docs/Screenshot2026-06-16022451.png)

</div>

## Claude Build Prompt

To assist with building the app, we can use Claude as a coding assistant. 

When asking Claude for help, we can use the following prompt:

> I want to build a note-taking app called "Probably Important" using bun run --bun Next.js.
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
> The app should be built using bun run --bun Next.js with Bun as the runtime.
> 
> Typescript should be used for type safety, and Tailwind CSS should be used for styling.
> 
> The backend should be implemented using bun run --bun Next.js API routes, and the frontend should be built with React components.
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

The generated bun run --bun Next.js project already includes the basic framework packages:

- `bun run --bun next`
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

## Initialize Claude Project 

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

##