---
title: "Favicons"
description: "Favicons"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 25
last_update:
  date: 03/29/2019
---



## Overview

A website icon, also called a **favicon**, is the small image shown in the browser tab. It helps users recognize your site easily.  

- Favicons appear in browser tabs and bookmarks  
- They use a special `.ico` format  
- Browsers request the favicon even if a site isn’t bookmarked  

**FUN FACT:**

Favicon stands for "favorite icon". It was originally used in the early days of web browsing to represent websites in the bookmarks or favorites list. They were displayed in browsers like Internet Explorer and helped users quickly identify and access their favorite websites.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-30-234802.png)

</div>


## Creating a Favicon  

You can create a favicon from an image or draw one manually.  

- Use an online tool like [favicon.cc](https://www.favicon.cc)  
- Upload an image or draw your own  
- Download the `.ico` file  

## Adding a Favicon  

To display the favicon, place the `.ico` file in your website folder and update the HTML.  

1. Move the `favicon.ico` file to the same folder as your `index.html`  
2. Add this line inside the `<head>` section of your HTML:  

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

3. Save the file and refresh your website  
