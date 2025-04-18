---
title: "Bootstrap Buttons"
description: "Bootstrap Buttons"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
- Bootstrap
sidebar_position: 42
last_update:
  date: 03/29/2019
---


## Overview  

Bootstrap provides different button styles with easy-to-use classes.  

See: [Sample HTML File](https://github.com/joseeden/joeden/blob/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/010-Bootstrap/index.html)

See: [Sample Website](https://melodic-pika-35d471.netlify.app/)

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

## Links in Buttons 

### Use `a href` element 

To make a **Bootstrap 5 button** behave like a link (example: go to another page using `href`), you should use an `<a>` tag instead of a `<button>` tag, but style it like a button using Bootstrap classes.

- `<button>`doesn't support `href`; 
- It's meant for form actions or JavaScript.

As an example, we write Bootstrap buttons like this:

```html
<button type="button" class="btn btn-primary btn-lg supp-sec-8-btn rounded-pill">
  Send us a question
</button> 
```

To add a link, rewrite it with an `<a>` tag:

```html
<a href="your-target-link.html" class="btn btn-primary btn-lg supp-sec-8-btn rounded-pill">
  Send us a question
</a>
```

You can also point it to a specific part of the same page:

```html
<a href="#section-abc" class="btn btn-primary btn-lg supp-sec-8-btn rounded-pill">
  Send us a question
</a>
```

Then somewhere else on your page, add `id="section-abc"` to the element:

```html
<section id="section-abc">
  
  <!-- Content here -->

</section>
```

### Retain `button` and use `onclick`

Using the previous example:

```html
<button type="button" class="btn btn-primary btn-lg supp-sec-8-btn rounded-pill">
  Send us a question
</button> 
```

To keep the `button` element (instead of changing it to `<a>`), and still make it navigate to a link, you can use a bit of JavaScript.

```html
<button type="button" 
        class="btn btn-primary btn-lg supp-sec-8-btn rounded-pill"
        onclick="window.location.href='#contact-us'">
  Send us a question
</button>
```

This works exactly like a link would, but keeps the Bootstrap `button` structure intact.

:::info 

Using `onclick="window.location.href='#support-sec-3'"` completely bypasses JavaScript logic, which can disrupt any custom behavior you've implemented.

For instance, if you have a script that handles smooth scrolling or adjusts scroll positions for fixed headers, using `onclick` may prevent THE script from working as intended.

:::

### Retain `button` and use `data-href`

Another way to keep the `button` element is by adding a `data-href` and attach JavaScript for a cleaner HTML.

```html
<button type="button"
  class="btn btn-primary btn-lg supp-sec-8-btn rounded-pill"
  data-href="#section">
  Send us a question
</button>

<!-- Add script before closing the body of the HTML -->
<script>
  document.querySelector('.supp-sec-8-btn').addEventListener('click', function () {
    window.location.href = this.getAttribute('data-href');
  });
</script>
```

## Customize Button Styles

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
  <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
  <button type="button" 
          class="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal">
    Click Me!
  </button>
</body>
</html>
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

To customize it further, add your own CSS:

```html

<button type="button" 
        class="btn btn-primary btn-xl-custom" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal">
  Click Me!
</button>
```

This creates a larger button while keeping Bootstrap functionality.

```css
.btn-xl-custom {
    padding: 1rem 2rem;
    font-weight: 700;
    border-radius: 10px;
}
```

## Link to Play Store and App Store 

You can redirect the user to App Store or Play Store using JavaScript to detect the user’s device and redirect accordingly.

Sample button code:

```html
<button class="btn btn-warning dload-btn" type="button">
  Download the App
</button>
```

### Go to App URL  

Target the any of the button classes, in this case, we can use `dload-btn`.

```js
document.querySelector('.dload-btn').addEventListener('click', function () {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Replace with your actual app URL
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package'; 
  const appStoreUrl = 'https://apps.apple.com/app/id1234567890'; 

  if (/android/i.test(userAgent)) {
    window.location.href = playStoreUrl;
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.href = appStoreUrl;
  } else {
    // Optional fallback for desktop or unknown devices
    // Or show a modal instead
    window.location.href = 'https://yourwebsite.com/download'; 
  }
}); 
```

### Open Store Homepages 

If you just want the button to open the general Play Store or App Store homepage, not a specific app, just use the Store homepages:

```js
document.querySelector('.dload-btn').addEventListener('click', function () {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Store homepages
  const playStoreUrl = 'https://play.google.com/store';
  const appStoreUrl = 'https://www.apple.com/app-store/';

  if (/android/i.test(userAgent)) {
    window.location.href = playStoreUrl;
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.href = appStoreUrl;
  } else {
    // Optional fallback for desktop or unknown devices
    // Or show a modal instead
    window.location.href = 'https://yourwebsite.com/download'; 
  }
}); 
```

### Open a New Tab 

If you want the link to open in a new tab, change the line inside the event listener to:

```js
window.open(playStoreUrl, '_blank');
```
