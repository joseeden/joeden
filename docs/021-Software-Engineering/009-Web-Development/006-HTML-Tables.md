---
title: "HTML Tables"
description: "HTML Tables"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- HTML
- CSS
sidebar_position: 6
last_update:
  date: 03/20/2019
---


## Overview

HTML tables help organize data in a structured way using rows and columns.  

- Tables contain rows (`<tr>`) and cells (`<td>`)  
- Headers use `<th>` for column titles  
- Can be styled using CSS for better appearance  

## Structure

A simple table consists of table rows (`<tr>`) and table data (`<td>`). 

The example below creates a two-row table where each row has two columns.  

```html
<table>
  <tr>
    <td>2010-2018</td>
    <td>Lead Engineer at Stratencore</td>
  </tr>
  <tr>
    <td>2019</td>
    <td>Platform Specialis at Circuit Minds</td>
  </tr>
</table>
```

## Headers

You can include headers to label columns, which makes data easier to read.  

:::info 

Headers (`<th>`) are bold by default, which makes them stand out from the data.  

:::

```html
<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Position</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2010-2013</td>
      <td>Lead Developer at Tempo</td>
    </tr>
    <tr>
      <td>2014</td>
      <td>Researcher at Cognitive Institute</td>
    </tr>
  </tbody>
</table>
```

## Table Sections  

HTML tables can have sections for better organization.  

- `<thead>` for headers  
- `<tbody>` for main content  
- `<tfoot>` for summary or footer data  

Separating sections allows for better styling and scrolling behavior.  

## Styling Tables  

Instead of using deprecated HTML attributes, CSS is recommended for styling.  

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
```

## Nested Tables

Tables can also be placed or nested inside another table cell to organize data more effectively.  

```html
<table border="1">
  <tr>
    <td>Main Table - Row 1, Col 1</td>
    <td>
      <table border="1">
        <tr>
          <td>Nested Table - Row 1</td>
        </tr>
        <tr>
          <td>Nested Table - Row 2</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```