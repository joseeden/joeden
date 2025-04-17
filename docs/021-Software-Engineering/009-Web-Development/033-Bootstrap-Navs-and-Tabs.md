---
title: "Bootstrap Navs and tabs"
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

![](/gif/docs/bootstrap-avs-and-tabs.gif)

</div>

[Bootstrap provides official documentation for Navs and Tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/#tabs) that you can refer to for implementation. This guide focuses on how to style them.

## Sticky Tab Bar 

You might encounter an issue where when you click one of the tabs in the tab bar, you toggle to the correct tab content, but the screen also scrolls down and might sometimes cut off or hide the tab bar.

<div class="img-center"> 

![](/gif/docs/bootstrap-avs-and-tabs-2.gif)

</div>


This happens because Bootstrap’s `nav-pills` with `data-bs-toggle="pill"` will scroll into view the selected `.tab-pane`, and if that content is long, it pushes the tabs off the screen, especially on smaller devices. 

If you'd like to keep the navtabs always visible, like a sticky tab bar, 
