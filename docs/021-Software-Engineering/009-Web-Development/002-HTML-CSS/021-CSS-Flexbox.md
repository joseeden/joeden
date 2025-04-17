---
title: "CSS Flexbox"
description: "CSS Flexbox"
tags:
- Computer Science
- Application Development
- Software Development
- Web Development
- Frontend Development
- HTML
- CSS
sidebar_position: 21
last_update:
  date: 03/20/2019
---



## Early Web Layouts

Web pages were originally structured using basic HTML tables.

- Used `<table>`, `<tr>`, and `<td>` elements
- Allowed multi-column layouts by adjusting column widths
- Still useful for tabular data but not for layouts

Tables are not ideal for layouts because they mix structure with design, making updates difficult.

## Transition to Display 

To improve layouts, developers started using display properties.

- `display: inline-block` for placing elements side by side
- `position: absolute` for precise positioning
- `float: left/right` for arranging elements in columns

While these methods improved layouts, they introduced complexities in alignment and responsiveness.

## The Problem with Floats

Floats were widely used but had drawbacks.

- Difficult to align elements properly
- Required clearfix hacks for layout stability
- Not designed for complex grid structures

Floats work well for wrapping text around images but are not ideal for building full-page layouts.

## Using Flexbox 

Flexbox simplifies layout creation with a flexible approach.

- `display: flex` creates a flex container
- Items adjust dynamically based on available space
- Aligns items easily with `justify-content` and `align-items`

Example: Creating a Flexbox Layout

Sample files: [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/008-CSS-Flexbox)

```html
<div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
</div>
```

```css
.container {
  display: flex;
  gap: 10px;
}
.box {
  background: #66D2CE;
  padding: 20px;
  flex: 1;
}
```

Each `.box` will be evenly spaced inside `.container`, adjusting dynamically based on the available width.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-230452.png)

</div>

## Main and Cross Axis

Flexbox layouts are structured around two axes:

- **Main axis**
  - Defined by `flex-direction`
  - `row`: main axis is horizontal
  - `column`: main axis is vertical

- **Cross axis**
  - Perpendicular to the main axis
  - Helps control item alignment in the perpendicular direction

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-231851.png)

</div>


## Flex Direction

The `flex-direction` property determines how flex items are arranged inside a container.

- Default value: `row` (items align from left to right)
- `column`: items align from top to bottom
- `row-reverse`: items align from right to left
- `column-reverse`: items align from bottom to top

Example: Modify the default layout using `flex-direction`:

```css
.container {
  display: flex;
  flex-direction: column;
}
```

- Items now align top to bottom
- The main axis becomes vertical
- The cross axis moves left to right

Sample file can be found here: [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/009-CSS-Flex-Direction)

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-233549.png)

</div>


## Flex Basis

The `flex-basis` property controls the initial size of flex items along the main axis.

- In `row` direction: `flex-basis` sets width
- In `column` direction: `flex-basis` sets height
- Applies to child elements, not the container

Example:

```css
.container > * {
  flex-basis: 100px;
}

.container {
  display: flex;
  flex-direction: row;
} 
```


- When `row`, items have a width of `100px`
- When `column`, items have a height of `100px`
- Helps control item sizes within a flex container

Using the previous example, we've set the `flex-direction` to column so each of the boxes will have a height of `100px`.


<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-233836.png)

</div>

If it was set to `flex-direction: row`, the `flex-basis` sets the width to `100px` and the arrangement would look like this:

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-234052.png)

</div>

## Control Order with `order`

The `order` property changes the arrangement of child items inside a flex container.

- Default order is `0`, following HTML structure
- Higher values move items further right
- Lower values move items further left

Example: Without ordering, the box items are arranged the same way they are defined in the

> Sample files found in [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/010-CSS-Order)

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-233836.png)

</div>

If we set the order of the box 1 (red) to `1`, we're moving it further down below the other elements which have a default order of `0`.

```css
.red {
  background: #D76C82;
  order: 1
}

.green {
  background: #66D2CE;
}

.blue {
  background: #578FCA;
}
```

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-31-235440.png)

</div>

## Wrap Items with `flex-wrap`

By default, items stay in a single row and do not wrap.

- `nowrap` (default) keeps items in one row
- `wrap` moves items to the next line when space runs out
- `wrap-reverse` wraps items from bottom to top

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

Sample files: [Github](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/011-CSS-Flex-Wrap)

Using `flex-wrap` ensures items don’t overflow and stay visible within the container.

<div class="img-center"> 

![](/gif/docs/css-flex-wrap.gif)

</div>

Setting it to `wrap-reverse`:

<div class="img-center"> 

![](/gif/docs/css-flex-wrap-2.gif)

</div>


## Align Items with `justify-content`

This property controls spacing along the main axis (horizontal by default).

- `flex-start` (default) aligns items to the left
- `flex-end` moves items to the right
- `center` centers items
- `space-between` distributes items with space in between
- `space-around` adds equal space on both sides of each item
- `space-evenly` ensures equal spacing everywhere

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

To view the sample files, check out [Github.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/012-CSS-Justify-Content)

You may also view the live demo here: [CSS Justify Content](https://aquamarine-mousse-d41f71.netlify.app/)

<div class="img-center"> 

![](/gif/docs/css-flex-3.gif)

</div>




## Align Items with `align-items`

This property aligns items along the cross-axis (vertical by default).

- `flex-start` aligns items at the top
- `flex-end` moves items to the bottom
- `center` aligns items in the middle
- `stretch` makes items expand to fill the container height
- `baseline` aligns items by their text baselines

```css
.container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
```

Using `align-items` helps in vertically positioning elements inside the container.

To view the sample files, check out [Github.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/013-CSS-Align-Items)

<div class="img-center"> 

![](/img/docs/Screenshot-2025-04-01-004021.png)

</div>



## Adjust Individual Items with `align-self`

This property overrides `align-items` for a specific child.

- Works like `align-items` but for a single item
- Lets specific items behave differently from others

```css
.item {
  align-self: flex-end;
}
```

For our example, we want to set all boxes to be aligned to the top, except for:

- orange - position at the center 
- green - position at the bottom

To view the sample files, check out [Github.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/009-Web-Development/000-Projects/001-Basics/014-CSS-Align-Self)

<div class="img-center"> 

![](/img/docs/Screenshot-2025-04-01-004704.png)

</div>


## Align Content in Flexbox

Align-content controls how wrapped flex items are aligned along the cross axis. 

- Works only with `flex-wrap: wrap`
- Affects how rows of flex items are spaced
- Different from `align-items`

When items wrap into multiple rows, `align-content` decides how those rows are spaced. Without wrapping, this property has no effect.

#### Align-Items and Align-Content

`align-items` and `align-content` seem similar but behave differently.

- `align-items`: Aligns individual items in a single row
- `align-content`: Aligns multiple rows of items
- `align-content` does nothing if all items fit in one row

When there is only one row, `align-items` is enough. But if flex items wrap, `align-content` helps control row spacing.

#### Common Values 

Different values change how wrapped rows are positioned.

- `flex-start` – Rows packed at the start
- `flex-end` – Rows packed at the end
- `center` – Rows centered
- `space-between` – Evenly distributed with no space at edges
- `space-around` – Evenly distributed with space around them
- `stretch` – Rows stretch to fill container height

Example:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 300px;
  border: 1px solid black;
}

.item {
  width: 100px;
  height: 100px;
  background: lightblue;
  margin: 5px;
}
```

Expected Result:
- If flex items wrap, they will be centered vertically inside `.container`.
- Without `flex-wrap: wrap`, `align-content` does nothing.
