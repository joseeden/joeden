---
title: "Embed videos"
sidebar_position: 15
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---

import ReactPlayer from 'react-player'

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

    - Add the line below the [Front Matter](/docs/001-Personal-Notes/004-Documentation-Notes/001-Docusaurus/004-Front-Matter.md) section, like this:


        ```bash
        ---
        title: "Embed videos"
        sidebar_position: 15
        description: "Resources, bookmarks"
        tags: 
        - Docusaurus
        # last_update:
        #   date: 7/14/2024
        ---

        import ReactPlayer from 'react-player'
        ```

3. Add the URL to the page.

    - Youtube video:

        ```bash
        <ReactPlayer url='https://www.youtube.com/watch?v=XGxIE1hr0w4' />
        ```

        Output:

<ReactPlayer url='https://www.youtube.com/watch?v=XGxIE1hr0w4' />

4. Optional.

    - For better readability:

        ```bash
        <ReactPlayer 
            url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
        />
        ```

    - Add play controls:

        ```bash
        <ReactPlayer 
            controls
            url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
        />
        ```

        Output:

<ReactPlayer 
    controls
    url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
/>

    - Adjust width and height:

        ```bash
        <ReactPlayer 
            controls
            url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
            width='100%'
            height='100%'
        />
        ```

        Output:

<ReactPlayer 
    controls
    url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
    width='100%'
    height='100%'
/>


## Auto-Play 

To make videos auto-play, add `playing`:

```bash
<ReactPlayer 
    playing
    controls
    url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
    width='100%'
    height='100%'
/>
```