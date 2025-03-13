---
title: "Embed videos"
sidebar_position: 15
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---

import ReactPlayerWrapper from '@site/src/components/documentation/ReactPlayerWrapper';

## Using `react-player`

### Install 

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

    Add the line below the [Front Matter](/docs/001-Personal-Notes/004-Documentation-Notes/001-Docusaurus/004-Front-Matter.md) section, like this:


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

    ```bash
    <ReactPlayer 
        controls
        url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
        width='100%'
        height='100%'              
    />
    ```
  
4. Sample:

    Unindented: 
    
<ReactPlayerWrapper 
    controls
    url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
/>

    - Indented:

        <ReactPlayerWrapper 
            controls
            url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
        />


### Play controls

To add play/pause button, plus other video settings, include `controls`:

```bash
<ReactPlayer 
    controls
    url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
/>
```

### Auto-Play 

To make videos auto-play, add `playing`:

```bash
<ReactPlayer 
    playing
    controls
    url='https://www.youtube.com/watch?v=XGxIE1hr0w4' 
/>
```

### Modify Style (Customize) 




## Using `iframe`

An alternative way which does not require any additional package is through the use of `iframe`:

```bash
<iframe 
  width="560" 
  height="315"
  src="https://www.youtube.com/embed/XGxIE1hr0w4?si=acocw4T3zdTqd3V-" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
></iframe>
```

Note that "full screen mode" is not allowed when using this.



## Reference

- [react-player](https://github.com/cookpete/react-player)
- [Example of video embedded in Docusaurus: Podman](https://podman-desktop.io/blog/podman-desktop-release-1.1)
- [Example of video embedded in Docusaurus: Podman (Github)](https://github.com/podman-desktop/podman-desktop/blob/62d5f07f6b7ac3c271cc100%b61e5da1d5b260b84/website/blog/2023-06-08-release-1.1.md?plain=1#L11)
- [Example of video embedded in Docusaurus: LTC](https://learntocloud.guide/phase4/)
- [Example of video embedded in Docusaurus: LTC (Github)](https://github.com/learntocloud/learn-to-cloud/blob/main/docs/phase4/README.md)