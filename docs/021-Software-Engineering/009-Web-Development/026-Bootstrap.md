---
title: "Bootstrap"
description: "Bootstrap"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 26
last_update:
  date: 4/11/2023
---

import React from "react";


## Overview  

Bootstrap is a toolkit for quickly building responsive websites. It provides ready-made CSS and JavaScript components, so you don’t have to build everything from scratch.  

## Key Features  

- **Pre-built Components** – Includes navigation bars, buttons, modals, and more.  
- **Responsive Grid System** – Helps create layouts that adapt to different screen sizes.  
- **Customizable** – You can override Bootstrap styles with your own CSS.  
- **JavaScript Enhancements** – Includes dropdowns, modals, and interactive elements.  

## Using Bootstrap  

To get started, you can include Bootstrap via a CDN to your HTML file:  

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
```

For more information, please see [Get Bootstrap.](https://getbootstrap.com/)

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)

## Sample Website 

Below is a sample HTML page. You can try the functionalities like the navbar and dropdown menu. You can also click the modal button.

<iframe
  src="https://melodic-pika-35d471.netlify.app//"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>

## Jumbotron 

:::info 

Jumbotron has been phased out in Bootstrap 5. This section has been updated to use a workaround.
:::

The Jumbotron is a large, attention-grabbing banner often used to highlight important content on a webpage.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-23-230639.png)

</div>

You can emulate Jumbotron (with the exception of the specific background color) by adding this to your HTML file.

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)

See: [Sample Website](#sample-website)

```html 
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

  <div class="bg-light p-5 rounded-lg m-3">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-jumbotron btn-lg" href="#" role="button">Learn more</a>
  </div>
```

## Navigation Bar

The code below will generate a responsive navigation bar with a dropdown menu on smaller screens. 

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-23-230734.png)

</div>

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)

See: [Sample Website](#sample-website)

```html
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
```


## Buttons  

Bootstrap provides different button styles with easy-to-use classes.  

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)

See: [Sample Website](#sample-website)

```html
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
```

## Customizing Bootstrap  

Even though Bootstrap provides default styles, you can override them with your own CSS.  

**Example: Changing the primary button color** 

To apply custom styles, link your CSS file to your HTML document.

```bash
<link rel="stylesheet" type=""text/css" href="style.css" /> 
```

Here’s an example HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  
  <link rel="stylesheel" type=""text/css" href="style.css" />
</head>
<body>
 
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
```

Next, include your custom CSS after the Bootstrap link to override the default btn btn-primary styles:

```css
.btn-primary {
  background-color: #0080be;
}

.btn-primary:hover {
  background-color: green;
} 
```





## Adding Meta Tags

Meta tags provide extra information about a webpage. They help with mobile responsiveness and text encoding.  

- The `viewport` meta tag ensures the page works well on mobile devices  
- The `charset` meta tag defines the text encoding format  

Adding these tags improves compatibility and readability on different devices.  

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
```

This setup makes the page mobile-friendly and ensures proper text display.  


## Full-Page Background Image  

A full-page background image adjusts to different screen sizes.  

- The important line here is `no-repeat center center fixed`
- `no-repeat` - prevents repeating of the image
- `center` - keep the image centered
- `fixed` - keep the image fixed

This keeps the image flexible, filling the entire screen while staying centered.  

```css
html { 
  background: url(images/bg.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
```

For more information, please see [Perfect Full Page Background Image.](https://css-tricks.com/perfect-full-page-background-image/)


## Make Text Uppercase

You can easily convert text to uppercase using Bootstrap or CSS.

- Using Bootstrap, add the `text-uppercase` class to any text element:

    ```html
    <p class="text-uppercase">This text will be uppercase.</p>
    ```

- Using CSS, apply `text-transform: uppercase;` to any element:

    ```css
    .uppercase {
        text-transform: uppercase;
    }
    ```

- Using regular HTML:

    ```html
    <p class="uppercase">This text will also be uppercase.</p>
    ```


## Style Bootstrap Buttons

Bootstrap provides ready-to-use button styles that can be customized.

- Use predefined Bootstrap button classes
- Modify colors and sizes with custom CSS
- Add hover effects for better interaction

To create a primary button using Bootstrap:

```html
<button class="btn btn-primary">Click Me</button>
```

To customize it further, add your own CSS:

```css
.btn-xl {
    padding: 1rem 2rem;
    font-weight: 700;
    border-radius: 10px;
}
```

```html
<button class="btn btn-primary btn-xl">Click Me</button>
```

This creates a larger, custom-styled button while keeping Bootstrap functionality.


## Center Page Content

Using Bootstrap, you can easily center content.

- Bootstrap’s grid system helps with alignment
- Utility classes simplify centering
- Works for text, images, and containers

Example using Bootstrap’s flex utilities:

```html
<div class="d-flex justify-content-center align-items-center">
    <p>Centered content</p>
</div>
```

This ensures the content stays centered and makes the layout cleaner and more organized.

