---
title: "Repo Knowledge Base"
sidebar_position: 0
description: "Reference document tracking the files and folders in this Docusaurus repo"
tags:
  - Docusaurus
---

## Overview

This is the running knowledge base for my personal website, which is a Docusaurus repository. It tracks which files and folders are active, unused, or pending cleanup. This is updated incrementally as different parts of the repo are reviewed.


## Initial Checklist

### Unused / Unreferenced Files

TODO: Review all files/folders in the root directory and subdirectories to determine which are active vs. unused. Initial review suggests the following files are unused or unreferenced, but this needs to be verified:

| File               | Status | Reason                                                                                        |
| ------------------ | ------ | --------------------------------------------------------------------------------------------- |
| `rollup.config.js` | Unused | Only contains `require('dotenv').config()` and is not referenced in any npm script or imports |
| `generateIndex.js` | Unused | Not referenced in any `package.json` script and has no imports anywhere                       |
| `nodemon.json`     | Unused | `nodemon` is not listed in `dependencies` or `devDependencies`, and no script invokes it      |
| `.env`             | Unused | Only consumed by `rollup.config.js`, which itself is unused                                   |

### Active Files

| File                                          | Reason                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `docusaurus.config.ts`                        | Main Docusaurus site configuration                                                                |
| `sidebars.js`                                 | Explicitly required by `docusaurus.config.ts`                                                     |
| `babel.config.js`                             | Used by the build pipeline                                                                        |
| `declaration.d.ts`                            | TypeScript declarations for `.scss` modules and `@theme/IdealImage`, both actively used in `src/` |
| `package.json`, `package-lock.json`           | Essential — define dependencies and scripts                                                       |
| `.eslintrc.js`, `.eslintignore`               | ESLint tooling                                                                                    |
| `.prettierrc`, `.prettierignore`              | Prettier formatting tooling                                                                       |
| `.gitignore`, `.gitattributes`, `.gitmodules` | Git configuration and submodules                                                                  |
| `.nojekyll`                                   | Required for GitHub Pages deployment to bypass Jekyll processing                                  |
| `LICENSE`, `README.md`                        | Standard repository files                                                                         |



<!-- Add sections below as other folders/files are reviewed -->

<!-- ## Root Files and Directories -->
