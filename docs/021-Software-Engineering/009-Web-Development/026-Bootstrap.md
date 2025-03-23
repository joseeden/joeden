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
  date: 8/27/2021
---

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

View: [Sample HTML Page](/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)

## Example: Jumbotron 

:::info 

Jumbotron has been phased out in Bootstrap 5. This section has been updated to use a workaround.
:::

You can emulate Jumbotron (with the exception of the specific background color) by adding this to your HTML file.

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)


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

## Example: Navigation Bar

This will generate a responsive navigation bar with a dropdown menu on smaller screens. 

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)


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


## Example: Buttons  

Bootstrap provides different button styles with easy-to-use classes.  

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/Projects/010-Bootstrap/index.html)

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


