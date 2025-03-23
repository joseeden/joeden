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

import React from "react";


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

## Minified CSS  

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

See: [Minify-CSS](https://www.cleancss.com/css-minify/)

## Responsive Design  

Websites need to look good on all devices, from desktops to phones. Responsive design helps adjust layouts based on screen size.  

- **Fluid Layouts**  

  Use percentages instead of fixed widths to make elements adjust to different screen sizes.  
  ```css
  .container {
    width: 80%;
  }
  ```

- **Media Queries**  

  Apply styles based on screen width.  

  ```css
  @media (max-width: 600px) {
    body {
      background-color: lightgray;
    }
  }
  ```

- **Flexible Images**  

  Ensure images resize with the screen.  

  ```css
  img {
    max-width: 100%;
    height: auto;
  }
  ```

- **Viewport Meta Tag**  

  Helps the browser scale content properly.  

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```

**Example**

A responsive card layout using CSS Grid and media queries.  

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  padding: 20px;
  background: #f4f4f4;
}
```

## Styling Text 

Text should be readable against a background.  

- Use `font-size` to adjust text size  
- Set `color` for contrast  
- Use `strong` tags to highlight important text  

These changes make the text stand out and improve readability.

```css
h1 {
    font-size: 3rem;
    color: #ffffff;
}
```

Output: 

```html
<h1><strong>Welcome to Our Site</strong></h1>
```

## Button Hover Effect

Modifying the button’s hover state improves user interaction.

- Change background color when hovered
- Adjust border color for consistency
- Increase border width for better emphasis

Apply a hover effect in CSS:

```css
.btn-primary:hover {
    background-color: #ee4b08;
    border-color: #ee4b08;
    border-width: 4px;
}
```

## Styled Horizontal Line

A horizontal line (`hr`) adds visual separation in a webpage.

- Add the `hr` tag to your HTML file first:

    ```bash
    <hr>
    ```

- Then customize it in your CSS file:

    ```css
    hr {
        border-color: #ee4b08;
        border-width: 3px;
        max-width: 65px;
    }
    ```

## Sample Website

Below is a sample HTML page. Try to hover on each photos. You may also adjust the size of your browser to see if the embedded website also changes.

<iframe
  src="https://fanciful-souffle-51bd70.netlify.app/"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>