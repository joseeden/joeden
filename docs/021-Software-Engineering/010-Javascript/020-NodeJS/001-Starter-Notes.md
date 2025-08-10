---
title: "Starter Notes"
description: "Starter Notes on NodeJS"
tags: 
- Computer Science
- Application Development
- Software Development
- Backend Development
- Javascript
- NodeJS
sidebar_position: 1
last_update:
  date: 2/11/2022
---


## Overview

Node.js lets you JavaScript run outside of the browser.

- Runs JavaScript directly on your computer  
- Uses the V8 engine (same as Chrome)  
- Adds new features like file system access  
- Provide features that aren’t available in browsers  

This means you can build full programs with JavaScript, not just browser stuff.


## Purpose 

JavaScript was made for webpages, but Node.js makes it usable anywhere.

- Normally, JavaScript controls things on web pages  
- Node.js lets JavaScript run like other programs  
- You can build server-side apps with it  

It makes JavaScript a flexible tool for full-stack development.

## How It Works

Node.js is built on the V8 JavaScript engine.

- V8 compiles JavaScript into machine code  
- Machine code is what your computer actually runs  
- V8 is written in C++ (but you don’t need to use C++)  
- Node.js extends V8 to support more features  

The result: JavaScript that works like a regular script or backend language.

## Features Added

The browser keeps things secure by limiting what JavaScript can do. Node.js removes some of these limits.

- Can access files on the local file system  
- Can work with network connections and databases  
- Can build apps, tools, and APIs  

## Limitations 

Node.js doesn’t include browser-specific features.

- No access to the DOM  
- No `window` or `document` objects  

Since Node.js runs on your computer, not in a browser, it doesn’t know about webpages.

## Simple Example 

Here's a basic example:

```js
// hello.js
console.log("Hello from Node.js!");
```

Command:

```bash
node hello.js
```

**Expected output:**

```
Hello from Node.js!
```

This confirms Node.js can run JavaScript directly like any normal program.
