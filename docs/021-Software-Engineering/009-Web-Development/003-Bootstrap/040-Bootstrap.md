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
- Bootstrap
sidebar_position: 40
last_update:
  date: 4/11/2023
---

import React from "react";


## Overview  

Bootstrap is a toolkit for quickly building responsive websites. It provides ready-made CSS and JavaScript components, so you don’t have to build everything from scratch.  

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


## Center Page Content

Using Bootstrap, you can easily center content.

- Bootstrap’s grid system helps with alignment
- Utility classes simplify centering
- Works for text, images, and containers

Example using Bootstrap’s flex utilities:

```html
<div class="d-flex justify-content-center align-items-center h-100">
    <p>Centered content</p>
</div>
```

Note: 

- `d-flex` enables flexbox
- `justify-content-center` centers horizontally
- `align-items-center` centers vertically
- `h-100` makes container full height

## Using Full-Height Containers

Ensure content fills the full page height.

```html
<div class="container h-100 d-flex align-items-center">
    <h1>Full-Height Example</h1>
</div>
```

- `h-100` makes container full height
- `d-flex` enables flexible alignment

This ensures elements stay vertically centered.

## Using `container` Class

Start with a container to hold all content.

```html
<div class="container">
    <!-- Content goes here -->
</div>
```

- The `container` class centers content
- Provides padding on small screens

This helps keep content aligned and responsive.

## Using `container` even without Bootstrap

You can use `<div class="container">` even without Bootstrap. However, this class will just be a regular class with no special meaning. If you're not using Bootstrap, the `.container` class won't have any predefined styles. You would need to define your own CSS for it.

For example, this:

```html
<div class="random-class">
    <!-- Content -->
</div>
```

is no different from:

```html
<div class="container">
    <!-- Content -->
</div>
```

unless you define styles for `.container` in your CSS.

If you want your `.container` to behave like Bootstrap’s, you need to manually add styles in your CSS file:

```css
.container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

Without this, `<div class="container">` will just be a plain `<div>` with no extra effects.


## Adding Rows and Columns

Rows hold columns, defining the layout structure.

```html
<div class="container">
    <div class="row">
        <div class="col-12">Header</div>
    </div>
    <div class="row">
        <div class="col-6">Left</div>
        <div class="col-6">Right</div>
    </div>
</div>
```

Note: 

- Rows group columns together
- Columns adjust based on screen size

## Connecting a Signup Form 

Setting up an email marketing service allows the users of our website to sign up for updates. 

- We need to host our website online  
- Users should be able to sign up for updates  
- We'll use an email marketing service like MailChimp  

For more information on how to use MailChimp, please see [MailChimp.](/docs/021-Software-Engineering/009-Web-Development/050-Mailchimp.md)

Example signup form: 

<iframe
  src="https://mailchi.mp/2ce980b93259/justkeeprunning"
  width="100%"
  height="600px"
  style={{ border: "1px solid #ccc" }}
></iframe>


After creating the signup form, we need to add the signup form link to our website.

```html
  <a href="https://mailchi.mp/2ce980b93259/justkeeprunning">
    <button class="btn btn-primary btn-find-out-more">Find out more</button>  
  </a> 
```