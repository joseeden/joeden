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

