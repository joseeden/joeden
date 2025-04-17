---
title: "Bootstrap Navs-tabs"
description: "Bootstrap Navs and tabs"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 33
last_update:
  date: 04/21/2019
---


## Overview 

Navs and Tabs can be used to style navigation menus. They are especially useful when you have multiple content sections but want to display only one section at a time while hiding the others. 

- Allow toggling between different content panes
- Only one pane is visible at any given time
- Useful for organizing information in limited space
- Reduces clutter by avoiding long scrollable pages

Example:

<div class="img-center"> 

![](/gif/docs/bootstrap-navs-and-tabs.gif)

</div>


:::info 

[Bootstrap provides official documentation for Navs and Tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/#tabs) that you can refer to for implementation. 

This guide focuses on how to style them.

:::


## Sticky Tab Bar 

Sometimes, when you click a tab in the tab bar, it switches to the correct tab content but also scrolls the screen down — causing the tab bar to be partially or completely hidden.

<details>
  <summary> **See sample code here** </summary>

```html
<div class="container about-container" id="about-container">

    <!-- Tabs Navigation -->
    <ul class="nav nav-pills" 
        id="aboutTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="origin-tab" 
            aria-controls="origin" aria-selected="false"role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#origin">
           Our Origins
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="services-tab" 
            aria-controls="services" aria-selected="false" role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#services">
            Our Services
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="mission-tab" 
            aria-controls="mission" aria-selected="false" role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#mission">
            Our Mission
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="commitment-tab" 
            aria-controls="commitment" aria-selected="true"role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#commitment">
            Our Commitment
        </a>
      </li>
    </ul>

    <!-- Tabs Content -->
    <div class="tab-content" id="aboutTabsContent">
      <div class="tab-pane fade" id="origin" 
            role="tabpanel" aria-labelledby="origin-tab">
        <h3>Our Origins</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
      <div class="tab-pane fade" id="services" 
            role="tabpanel" aria-labelledby="services-tab">
        <h3>Our Services</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
      <div class="tab-pane fade" id="mission" 
            role="tabpanel" aria-labelledby="mission-tab">
        <h3>Our Mission</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
      <div class="tab-pane fade active show" id="commitment" 
            role="tabpanel" aria-labelledby="commitment-tab">
        <h3>Our Commitment</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
    </div>

</div>  
```

</details>

<div class="img-center"> 

![](/gif/docs/bootstrap-navs-and-tabs-2.gif)

</div>


This happens because Bootstrap’s `nav-pills` with `data-bs-toggle="pill"` will scroll into view the selected `.tab-pane`, and if that content is long, it pushes the tabs off the screen, especially on smaller devices. 

```html
<!-- Tabs Navigation -->
<ul class="nav nav-pills" 
    id="aboutTabs" role="tablist">

  <li class="nav-item" role="presentation">
    <a class="nav-link" id="origin-tab" 
        data-bs-toggle="pill" data-bs-target="#origin">
        Our Origins
    </a>
  </li>
```

### Option 1: Make the Tabs Sticky 

You can make the navtabs stick to the top of the section when scrolling, by using `position: sticky`.

```css
.nav-pills {
  position: sticky;
}
```

Note that this only ensures that the tab bar is always in view, **but it doesn't prevent the auto-scrolling** behavior. To do this, please see [Prevent Auto-scrolling, Just Toggle Panels.](#prevent-auto-scrolling-just-toggle-panels)

<div class="img-center"> 

![](/gif/docs/bootstrap-navs-and-tabs-3.gif)

</div>



### Option 2: Scroll to Top of Section on Click

Another approach: use a little JS to **scroll the view back to the top of the section when a tab is clicked**, keeping the tabs in view:

Add the JavaScript code to your HTML:

```html
<script>
  document.querySelectorAll('#aboutTabs .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('about-container').scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>
```

This makes the section (with the tabs) scroll back into view when any tab is clicked. This is useful if you're not doing sticky tabs, and just want to ensure the nav is visible after clicking.


### Option 3: Scroll Target Adjustment (Optional + Extra Polish)

Sometimes clicking a tab will scroll too far (especially on mobile). You can add `padding-top` to your tab content and negative `margin-top` to offset this:

```css
.tab-content > .tab-pane {
  scroll-margin-top: 80px; /* adjusts scroll behavior on tab click */
}
```

### Optional: Add Top Padding to Tab Content

Add some **padding-top** to your tab content area to create space *below* the sticky tabs:

```css
.tab-content {
  padding-top: 60px; /* adjust based on sticky nav height */
}
```

This ensures there's enough space above the content so it's not hidden behind the sticky tabs.


## Prevent Auto-scrolling, Just Toggle Panels

Bootstrap 5 triggers scrolling by default when it activates a tab (changing tabs), but you can the scroll jump entirely so it only swaps the content without moving the page at all.

<details>
  <summary> **See sample code here** </summary>

```html
<div class="container about-container" id="about-container">

    <!-- Tabs Navigation -->
    <ul class="nav nav-pills" 
        id="aboutTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="origin-tab" 
            aria-controls="origin" aria-selected="false"role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#origin">
           Our Origins
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="services-tab" 
            aria-controls="services" aria-selected="false" role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#services">
            Our Services
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="mission-tab" 
            aria-controls="mission" aria-selected="false" role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#mission">
            Our Mission
        </a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="commitment-tab" 
            aria-controls="commitment" aria-selected="true"role="tab" tabindex="-1"
            data-bs-toggle="pill" data-bs-target="#commitment">
            Our Commitment
        </a>
      </li>
    </ul>

    <!-- Tabs Content -->
    <div class="tab-content" id="aboutTabsContent">
      <div class="tab-pane fade" id="origin" 
            role="tabpanel" aria-labelledby="origin-tab">
        <h3>Our Origins</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
      <div class="tab-pane fade" id="services" 
            role="tabpanel" aria-labelledby="services-tab">
        <h3>Our Services</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
      <div class="tab-pane fade" id="mission" 
            role="tabpanel" aria-labelledby="mission-tab">
        <h3>Our Mission</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
      <div class="tab-pane fade active show" id="commitment" 
            role="tabpanel" aria-labelledby="commitment-tab">
        <h3>Our Commitment</h3>
        <p>Lorem ipsum dolor sit amet.........
        </p>
      </div>
    </div>

</div>  
```

</details>

<div class="img-center"> 

![](/gif/docs/bootstrap-navs-and-tabs-3.gif)

</div>

###  Override Default Scroll

Bootstrap scrolls because the `href` with a `#` (e.g. `href="#origin"`) makes the browser try to scroll to that `id`. That behavior happens **even before JavaScript has a chance to override** it. To solve this, change tab links to use `data-bs-target` instead of `href`

Replace this:

```html
<a class="nav-link" 
   id="origin-tab" 
   data-bs-toggle="pill" 
   href="#origin" 
   role="tab" 
   aria-controls="origin" 
   aria-selected="true">
   Our Origins
</a>
```

With this:

```html
<a class="nav-link" 
   id="origin-tab" 
   data-bs-toggle="pill" 
   data-bs-target="#origin" 
   role="tab" 
   aria-controls="origin" 
   aria-selected="true">
   Our Origins
</a>
```

This **completely disables Bootstrap's scroll-jump behavior**, because you're no longer triggering a native anchor scroll.

:::info 

Using `data-bs-target` is **100% supported by Bootstrap 5** and does **exactly the same thing** as `href="#..."` — it just avoids the side effect of scrolling.

:::

<div class="img-center"> 

![](/gif/docs/bootstrap-navs-and-tabs.gif)

</div>


### Optional: Prevent scroll restoration via hash

If users are landing on your page via `example.com/about#services`, the browser will scroll to `#services`. If you want to disable even that:

```html
<script>
  history.scrollRestoration = 'manual';
</script>
```

Or clear the hash:

```js
window.history.replaceState(null, "", window.location.pathname);
```
