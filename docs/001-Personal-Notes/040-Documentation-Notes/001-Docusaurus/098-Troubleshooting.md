---
title: "Troubleshooting"
sidebar_position: 98
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---



## Testing route 

To test if the routes are in place and that landing page is loading correctly, we can use the following config for the src/pages/index.tsx.

```bash
import React from 'react';

const HomePage = () => {
  return <div>Welcome to the homepage!</div>;
};

export default HomePage;
```

## ESLint

In some instances, you may need to install several ESLint-related packages to ensure everything works correctly. Here's a list of the packages you need to install and the command to install them using npm or yarn

Package                             | Description                                                   | 
------------------------------------|---------------------------------------------------------------|
 eslint                             | The core ESLint package.                                      | 
 @typescript-eslint/parser          | Parses TypeScript code so ESLint can understand it.           | 
 @typescript-eslint/eslint-plugin   | A plugin that contains rules for TypeScript code.             | 
 eslint-config-prettier             | Disables ESLint rules that might conflict with Prettier.      | 
 eslint-plugin-prettier             | (optional but recommended): Runs Prettier as an ESLint rule.  | 


Install using npm.

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier
```

Install using yarn.

```bash
yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier
```

**Sample script**

You can also want to add some scripts to your `package.json` to easily run ESLint:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.ts,.tsx --fix"
  }
}
```

After installing the packages, you can run ESLint on your project:

- To check for linting issues:
  ```bash
  npm run lint
  ```
  or
  ```bash
  yarn lint
  ```

- To automatically fix linting issues:
  ```bash
  npm run lint:fix
  ```
  or
  ```bash
  yarn lint:fix
  ```

## Dependencies lock file is not found 

If your Github action deployment failed and you got this error:

```bash
Dependencies lock file is not found...
```

![](/img/docs/note-missing-json-file.png)

Try running install command. This will create the package-lock.json.

```bash
npm install 
```

## Expected closing tag for `<img>`

If you are using markdown (`.md`) pages for your Docusaurus documentation pages and you embedded an image like this:

```html
<div class="img-center">  

<img src="/img/docs/Screenshot-2025-04-17-031725.png" alt="DocSearch confirmation screenshot" />

</div> 
```

You might get an error even though this HTML syntax is correct.

```json
Cause: Unexpected closing tag `</div>`, expected corresponding closing tag for `<img>` (40:1-40:95)
Details:
{
  "column": 1,
  "message": "Unexpected closing tag `</div>`, expected corresponding closing tag for `<img>` (40:1-40:95)",
  "line": 41,
  "name": "41:1-41:7",
  "place": {
    "start": {
      "_bufferIndex": 0,
      "_index": 10,
      "line": 41,
      "column": 1,
      "offset": 1298
    },
    "end": {
      "_bufferIndex": -1,
      "_index": 11,
      "line": 41,
      "column": 7,
      "offset": 1304
    }
  },
  "reason": "Unexpected closing tag `</div>`, expected corresponding closing tag for `<img>` (40:1-40:95)",
  "ruleId": "end-tag-mismatch",
  "source": "mdast-util-mdx-jsx"
} 
```

The error is caused by using raw HTML (`<div>`, `<img>`) in an MDX file, and MDX is treating your `<img>` as a JSX tag, which requires it to be self-closing (like `<img ... />`). 

```md
<img ... />      (must be self-closed)
```

Note that even though your file ends in `.md`, **Docusaurus treats all Markdown files as MDX under the hood**, which means it **parses JSX/HTML inside them as JSX** — **not raw HTML**.

So even in `.md` files, **you still need to follow JSX rules** for tags like `<img>` and `<br>`, which includes:

- Tags must be **properly closed** (e.g., `<img ... />`)
- Only **one root JSX tag** is allowed if you're embedding JSX
- No syntax errors like missing closing slashes or invalid nesting

To fix the issue, change the  `<img>` tag to be self-closing like this:

```md
<div class="img-center">  
  <img src="/img/docs/Screenshot-2025-04-17-031725.png" alt="DocSearch confirmation screenshot" />
</div>
```

You can also write the image in pure Markdown (but you'd lose the `img-center` styling unless styled via Markdown image styling):

```md
![DocSearch confirmation screenshot](/img/docs/Screenshot-2025-04-17-031725.png)
```

Or wrap it in a Markdown-style center (via a plugin or CSS targeting `img[src*="Screenshot"]`).