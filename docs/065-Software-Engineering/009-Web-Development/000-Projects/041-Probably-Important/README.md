---
title: "Probably Important"
description: "Note-taking application with Next.js, Bun, and Claude-assisted development"
tags: 
- Web Development
- HTML
- CSS
- JavaScript
- NextJS
- TypeScript
- Claude
sidebar_position: 41
# last_update:
#   date: 4/23/2019
---

import React from "react";

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)](#) [![NextJS](https://img.shields.io/badge/Next.js-323330?style=for-the-badge&logo=next.js&logoColor=white)](#) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](#) [![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#) [![Neon PostgreSQL](https://img.shields.io/badge/Neon%20PostgreSQL-1E1E1E?style=for-the-badge&logo=postgresql&logoColor=white)](#) [![TipTap](https://img.shields.io/badge/TipTap-111827?style=for-the-badge&logoColor=white)](#) [![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=fff)](#)

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

## Create the Project

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
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── README.md
```

The project is stored in GitHub at: [Probably-Important](https://github.com/joseeden/Probably-Important)

## Start the Development Server

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

