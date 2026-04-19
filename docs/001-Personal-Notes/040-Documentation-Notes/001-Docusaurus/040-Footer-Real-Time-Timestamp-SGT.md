---
title: "Real-Time Timestamp in Footer"
sidebar_position: 40
description: "Add live timestamp and clock icon to footer"
tags:
  - Docusaurus
---

## Overview

This KB documents how the second footer meta item was updated from "Built with Docusaurus" to a live date-time display in Singapore Time (SGT, GMT+8), including a clock icon.

- Removes the footer link text "Built with Docusaurus"
- Shows a live timestamp that updates every second
- Uses `Asia/Singapore` timezone explicitly
- Displays hour, minute, and second
- Uses semantic `<time>` markup for better structure


## Implementation

### Files Updated

- `src/theme/Footer/index.js`
- `src/css/custom.scss`


### 1. Remove Docusaurus Footer Meta Item

In `src/theme/Footer/index.js`, the old import and UI block were removed:

- `DocusaurusIcon` import
- The anchor element linking to `https://docusaurus.io`

This keeps the footer-bottom section structure the same, while replacing only the second `footer-meta-item` content.


### 2. Add Real-Time SGT Logic

The footer now uses React state and effect hooks:

- `useState` stores the current timestamp as a `Date`
- `useEffect` starts a 1-second interval
- `clearInterval` runs on cleanup to avoid leaks

Code:

```js
const [now, setNow] = useState(() => new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setNow(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
```


### 3. Format Date-Time for Singapore

The formatter uses `Intl.DateTimeFormat` with `timeZone: 'Asia/Singapore'` and 24-hour format:

```js
const sgtDateTimeFormatter = new Intl.DateTimeFormat('en-SG', {
  timeZone: 'Asia/Singapore',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});
```

It then builds a stable label in this format:

- `DD Mon YYYY, HH:MM:SS SGT`

Example output:

- `19 Apr 2026, 22:41:09 SGT`


### 4. Add Clock Icon and `<time>` Element

The second `footer-meta-item` renders:

- An inline clock SVG icon (12x12)
- A semantic `<time>` node 

The `<time>` element has:

- `className="footer-status-time"`
- `dateTime={now.toISOString()}`
- visible text from the SGT formatter

This keeps the metadata row compact and consistent with existing footer icon patterns.


### 5. Styling Update

In `src/css/custom.scss`, a small style hook was added under `.footer-meta-item`:

```scss
.footer-status-time {
  font-family: var(--ifm-font-family-monospace);
}
```

This improves readability for rapidly changing time values while preserving the site theme.


**Notes:**

- The visible clock value is localized to Singapore regardless of user browser locale time zone.
- `dateTime` remains ISO (`toISOString()`), while the displayed text is user-friendly SGT format.
- Interval cleanup is important to prevent duplicate timers during re-renders/hot reload.


## Verification 

1. Footer shows location item unchanged.
2. Second footer meta item shows clock icon and timestamp.
3. Time changes every second.
4. Display includes hour, minute, and second.
5. Suffix is `SGT`.
