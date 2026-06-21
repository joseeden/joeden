---
title: "Bun as a Package Manager"
description: "Bun as a Package Manager"
tags: 
- Web Development
- Backend Development
- Javascript
- NodeJS
- Bun
sidebar_position: 2
# last_update:
#   date: 06/21/2026
---


## Overview

Bun can be used as the package manager for a JavaScript or TypeScript project.

When you run `bun add` inside a project folder, Bun installs packages for that project. It updates the local `package.json`, updates the local `bun.lock`, and installs packages into the local `node_modules` folder.

This is different from installing something globally on the system.


## Local Project Installs

Run package install commands from inside the project directory.

Example:

```bash
cd project-abc
bun add better-auth zod @prisma/client
```

This installs the packages into the current project.

Typical files affected:

| File or folder    | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `package.json`    | Lists the project dependencies and scripts.       |
| `bun.lock`        | Pins the exact installed package versions.        |
| `node_modules/`   | Stores the installed package files locally.       |

**Note**: These packages do not overwrite package versions in other projects.


## No Virtual Environment Needed

JavaScript projects do not usually need a Python-style virtual environment.

For Python, a virtual environment isolates installed packages from the global Python environment. For JavaScript projects, package isolation is normally handled by the project folder, `package.json`, the lockfile, and `node_modules`.

If two projects need different versions of the same package, each project can have its own dependency version in its own `package.json`.


## Runtime Dependencies

Use `bun add` for packages the application needs while it is running.

Example:

```bash
bun add better-auth zod @prisma/client @neondatabase/serverless @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link
```

These packages are saved under `dependencies` in `package.json`.

Example use cases:

| Package                         | Purpose                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| `better-auth`                   | Handles authentication and sessions.                                        |
| `zod`                           | Validates request bodies and other runtime data.                            |
| `@prisma/client`                | Provides the Prisma database client used by application code.               |
| `@neondatabase/serverless`      | Supports connecting to Neon PostgreSQL.                                     |
| `@tiptap/react`                 | Provides React integration for TipTap.                                      |
| `@tiptap/starter-kit`           | Provides common editor features such as headings, lists, and blockquotes.   |
| `@tiptap/extension-underline`   | Adds underline formatting to the editor.                                    |
| `@tiptap/extension-link`        | Adds link formatting to the editor.                                         |


## Development Dependencies

Use `bun add -D` for packages needed during development, setup, builds, tests, or type checking.

Example:

```bash
bun add -D prisma @types/bun
```

These packages are saved under `devDependencies` in `package.json`.

| Package      | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `prisma`     | Provides the Prisma CLI for schema setup, migrations, and generation.   |
| `@types/bun` | Provides TypeScript types for Bun-specific APIs and globals.            |

The Prisma split is important:

| Package          | Role                                      |
| ---------------- | ----------------------------------------- |
| `@prisma/client` | Used by the app code at runtime.          |
| `prisma`         | Used by developers as the Prisma CLI.     |

Common Prisma commands:

```bash
bunx prisma init
bunx prisma migrate dev
bunx prisma generate
bunx prisma studio
```


## Package Files

Bun uses `package.json` and `bun.lock` instead of a Python-style `requirements.txt`.

| Python concept     | JavaScript and Bun equivalent                       |
| ------------------ | --------------------------------------------------- |
| `requirements.txt` | `package.json` for listing dependencies.            |
| Lockfile           | `bun.lock` for exact installed versions.            |
| Virtual env        | Local project `node_modules/` and lockfile workflow. |

After dependencies have been added once, another developer can install the project packages with:

```bash
bun install
```

They do not need to rerun every `bun add` command manually.


## Avoid Mixing Package Managers

If a project uses Bun, prefer Bun commands for dependency management.

Use:

```bash
bun add package-name
bun add -D package-name
bun install
```

Avoid mixing these with:

```bash
npm install package-name
yarn add package-name
pnpm add package-name
```

Mixing package managers can create multiple lockfiles, such as `bun.lock` and `package-lock.json`, which makes dependency versions harder to reason about.


## Quick Rule

- Use `bun add` for packages the app imports and uses at runtime.
- Use `bun add -D` for tools and types used during development.
- Use `bun install` when dependencies are already listed in `package.json`.
- Use `package.json` and `bun.lock` instead of `requirements.txt`.
- Run commands from inside the project folder.
