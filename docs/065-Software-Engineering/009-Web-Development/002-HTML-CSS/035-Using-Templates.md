---
title: "Using Templates"
description: "Using Templates"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 35
last_update:
  date: 03/20/2019
---


## Using Animate.css  

Animate.css is a CSS library that adds animations to websites easily. It provides pre-made animation styles that can be applied with simple class names.  

- No need to create animations from scratch  
- Uses simple CSS classes for effects  
- Works well with any HTML element  

This makes it useful for quickly adding animations to websites without writing complex CSS or JavaScript.  

### Getting Animate.css  

You can install Animate using NPM or use a CDN link to include it directly in your project:

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head> 
```

For more information, please see [Animate.style](https://animate.style/)

### Using Animate.css  

To apply an animation, add the `animated` class along with the desired effect.  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>
<body>
    <h1 class="animate__animated animate__bounce">Animate Me</h1>
</body>
</html>
```  

Notes: 

- `animate__animated` is required for all animations  
- `animate__bounce` adds a bounce effect  
- Animations work on any HTML element  


### Customizing Animations  

You can modify animations using additional classes.  

- `animate__infinite` makes the animation repeat  
- `animate__delay-2s` adds a 2-second delay  
- `animate__slow` slows down the animation  

Example with infinite animation:  

```html
<h1 class="animate__animated animate__infinite animate__bounce">Bouncing Forever</h1>
```  
Customizing animations allows more control over effects and timing.  


## Using Free HTML Templates  

Templates save time by giving you a ready-made structure. You can modify the design, change text, and update styles without starting from nothing.  

- Templates come with prebuilt structures and styles  
- You can customize them by editing HTML and CSS files  

There are many free resources online where you can get templates for websites.  

- Search for "free HTML5 templates" online  
- Websites like Mashup Template provide various designs  
- Download a template and open the HTML file  

Once you download a template, you get prebuilt HTML, CSS, and sometimes JavaScript files. You can open the HTML file in a browser and start editing to fit your needs.  

