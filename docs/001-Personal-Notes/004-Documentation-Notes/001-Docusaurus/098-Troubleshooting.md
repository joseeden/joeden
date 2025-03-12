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
