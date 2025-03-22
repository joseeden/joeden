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
  date: 03/21/2019
---

## Overview  

Bootstrap is a popular framework that makes web development faster and easier. It provides ready-made CSS and JavaScript components, so you don’t have to build everything from scratch.  

- Writing CSS from scratch can be time-consuming.  
- It provides a collection of pre-built styles and components.  

## Key Features  

- **Pre-built Components** – Includes navigation bars, buttons, modals, and more.  
- **Responsive Grid System** – Helps create layouts that adapt to different screen sizes.  
- **Customizable** – You can override Bootstrap styles with your own CSS.  
- **JavaScript Enhancements** – Includes dropdowns, modals, and interactive elements.  

## Using Bootstrap  

To get started, you can include Bootstrap via a CDN:  

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

For more information, please see [Get Bootstrap.](https://getbootstrap.com/)

## Example: Navigation Bar

This will generate a responsive navigation bar with a dropdown menu on smaller screens. 

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">MySite</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
      </ul>
    </div>
  </div>
</nav>
```


## Example: Buttons  

Bootstrap provides different button styles with easy-to-use classes.  

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
```

## Customizing Bootstrap  

Even though Bootstrap provides default styles, you can override them with your own CSS.  

Example: Changing the primary button color  

Just add this CSS after Bootstrap to modify the styles.  

```css
.btn-primary {
  background-color: orange;
  border-color: orange;
}
```



## Resources 

- [Mailchimp-Add an Embedded Signup Form to Your Website](https://mailchimp.com/en/help/add-a-signup-form-to-your-website/)
- [Free Bootstrap starter templates](https://mdbootstrap.com/freebies/)
- [Creative Time - Bootstrap UI Kits](https://www.creative-tim.com/bootstrap-themes/ui-kit?direction=asc&sort=price)
- [Perfect Full Page Background Image](https://css-tricks.com/perfect-full-page-background-image/)
- [Start Bootstrap](https://startbootstrap.com/templates)
- [Animate.css](https://animate.style/)
- [Bootstrap Expo](https://expo.getbootstrap.com/)
- [Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)
- [What is meta tag](https://www.w3schools.com/tags/tag_meta.asp)
- [What is UTF-8](https://www.quora.com/What-is-UTF8)
- [Bootstrap Flex](https://getbootstrap.com/docs/4.3/utilities/flex/)