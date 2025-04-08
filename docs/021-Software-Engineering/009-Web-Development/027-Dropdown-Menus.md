---
title: "Dropdown Menus"
description: "Dropdown Menus"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 27
last_update:
  date: 06/14/2019
---

## Cannot Modify Style 

I encountered this when I was trying to modify the text color and background color when I hover on items in a dropdown bar. By default, it shows a blue background.

![](/gif/docs/css-notes-dropdown-menu.gif)

I learned that there are some browser limitations when it comes to using dropdown menus — most browsers do not allow styling `<option>` hover states due to native rendering of dropdowns. 

```css
/* This tries to change background color, but this will fgil. */
#referenceDropdown option:checked {
  background-color: blue;            /* Background */
  color: red;                        /* Text color of selected option */
} 
```

### Reason 

Browsers like Chrome and Firefox **don't expose hover or active states of `<option>` elements** to custom CSS because of accessibility and security reasons. 

```css
#referenceDropdown option:hover {   /* ❌ This won't work in most browsers */
  background-color: blue;            
  color: red;                        
}
```

This is the reason why I still see blue background with white text when hovering over dropdown options — it's the default browser behavior and cannot be overridden with plain CSS.

### Workaround: Change Overall Styling 

Change overall `<select>` styling instead:

```css
#referenceDropdown:hover,
#referenceDropdown:focus {
  background-color: white;
  color: #333;
  border-color: red;
  box-shadow: none;
}
```

This affects the entire dropdown control, **not the options inside** it.

### Workaround: Use JavaScript 

To fully control styles like hover, highlight color, icons, font size, and behavior, you need a JS-based solution. Recommended:

- **[Choices.js](https://github.com/Choices-js/Choices)** - lightweight & customizable
- **[Select2](https://select2.org/)** - popular jQuery-based
- **[Bootstrap Select](https://developer.snapappointments.com/bootstrap-select/)** - for Bootstrap projects

These libraries replace the native `<select>` with a stylable version using custom HTML elements.

### Workaround: Choices.js (DID NOT WORKED)

:::info

Attempted to do this but did not worked. Use custom logic through JS script, and also through playing around the HTML layout, as well as the CSS rulesets.

For reference, please see [Custom Select Box.](https://www.w3schools.com/howto/howto_custom_select.asp)

:::

Example: Using Choices.js

1. Include Choices.js in your page (via CDN or npm).
2. Initialize it in your JS:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">
<script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>


<script>
  document.addEventListener('DOMContentLoaded', function () {
    new Choices('#referenceDropdown', {
      searchEnabled: false
    });
  });
</script>
```

Now you can target dropdown items like:

```css
.choices__item--selectable:hover {
  background-color: #f5f5f5;
  color: red;
}
```