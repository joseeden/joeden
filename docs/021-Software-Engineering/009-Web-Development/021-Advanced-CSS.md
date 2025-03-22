---
title: "Advanced CSS"
description: "Advanced CSS"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 21
last_update:
  date: 03/20/2019
---

## Overview

The critical render path is how a website loads and displays content in a browser. 

## How It Works  

- **Requesting the HTML**  
  The browser requests the website’s HTML file from a server.  

- **Processing the HTML**  
  As the browser reads the HTML, it finds references to other resources like CSS and fonts.  

- **Fetching CSS and Fonts**  
  The browser requests the CSS file and waits for it before rendering the page. If font files are needed, it also fetches them.  

- **Rendering the Page**  
  The browser processes the HTML and CSS to display the website. If fonts are still loading, text may not appear properly.  

## Optimizing Load Speed  

- **Use Local Fonts**  
  Instead of fetching fonts from external sources, host them locally to reduce load time.  

- **Minify CSS**  
  Remove unnecessary spaces and line breaks to reduce file size and speed up loading.  

## Example: Minified CSS  

Original CSS:  

```css
body {  
    background-color: white;  
    font-size: 16px;  
    color: black;  
}
```

Minified CSS:  

```css
body{background-color:white;font-size:16px;color:black;}
```

Minification reduces file size, which makes pages load faster. 

## Resources 

- [https://css-tricks.com/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/)