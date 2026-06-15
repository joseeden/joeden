---
title: "Probably Important"
description: "Note-taking application with NextJS and Tailwind CSS"
tags: 
- Web Development
- HTML
- CSS
- JavaScript
- NextJS
sidebar_position: 41
# last_update:
#   date: 4/23/2019
---

import React from "react";

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)](#) [![NextJS](https://img.shields.io/badge/Next.js-323330?style=for-the-badge&logo=next.js&logoColor=white)](#) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](#) [![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#) [![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)](#) [![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=fff)](#)

## Overview

This project is a simple note-taking application called "Probably Important".

This application allows users to create, edit, and delete notes. 

It is built using Next.js and Tailwind CSS.


:::info 

This page sets up the starting point for the application.

The steps for adding features to the application can be found here: Probably Important 

::: 


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


## Next Step

Once the project is running successfully, development of the note-taking features can begin.

At this point, the environment is ready and all required tools have been installed.

