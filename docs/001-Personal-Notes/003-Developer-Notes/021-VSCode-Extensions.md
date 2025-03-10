---
title: "Visual Studio Code Extensions"
sidebar_position: 21
description: "Visual Studio Code Extensions"
tags: 
- Development
- Terminal
- IDE
- Visual Studio Code
- DevOps
last_update:
  date: 11/22/2023
---

## Prettier - Code Formatter 

Simply install the extension in VSCode. To configure Prettier, create a `.prettierrc` in the root directory of your project.

```json title=".prettierrc"
{
  "trailingComma": "all",  // Trailing commas are added to the end of objects and arrays
  "singleQuote": false     // Set to True to convert all double quotes to single quotes
  "arrowParens": "avoid"   // avoid | always - adds parentheses around function parameter
}
```

## Live Server

Useful for quickly previewing and testing web pages during development.

- Testing a static site or web app.
- Auto reloads the browser whenever you make changes.
- Working in teams where multiple developers need to view changes instantly.

Install it in the VSCode Extensions menu. Once installed, you should see a `Go Live` button at the bottom of VSCode. Click to activate and check the file inyour browser.

<div class="img-center"> 

![](/img/docs/11222023-liveserver.png)

</div>

## Installing Live Server using NPM 

The other way to install live server is using NodeJS. Make sure to [download NodeJS first.](https://nodejs.org/en/download). Verify version.

```bash
$ node -v
v18.20.5
```

Once done, install Live serve rusinig `npm`:

```bash
npm install live-server -g 
```

After installing it, go to the root directory of your project and run the command below. This should open the project in your web browser.

```bash
live-server 
```

