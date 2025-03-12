---
title: "Embed videos"
sidebar_position: 15
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---


## Using `react-player`

1. Install `react-player`.

    - Use NPM to install:

        ```bash
        npm install react-player
        ```

    - Verify:

        ```bash
        cat package.json | grep react-player  
        ```

        Output:

        ```bash
        "react-player": "^2.16.0" 
        ```

    - Other way to verify:

        ```bash
        npm list react-player
        ```

        Output:

        ```bash
        joeden@0.0.0 /mnt/c/Git/joeden
        └── react-player@2.16.0
        ```

2. Import it at the top of your markdown file (`.md` or `.mdx`).

    - Add the line below the [Front Matter](/docs/001-Personal-Notes/004-Documentation-Notes) section: 