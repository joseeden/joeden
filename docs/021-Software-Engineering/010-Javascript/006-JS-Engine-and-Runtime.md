---
title: "The Javascript Engine"
description: "Javascript Engine and Runtime"
tags: 
- Computer Science
- Application Development
- Software Development
- Javascript
sidebar_position: 7
last_update:
  date: 12/21/2020
---

## Overview  

A JavaScript engine is a program that interprets and executes JavaScript code. Every browser has its own engine, but the most popular one is Google’s **V8**, which powers both Google Chrome and Node.js.

## Components  

Every JavaScript engine has two main components: the call stack and the heap. These are used to manage and store the data and execution contexts while running JavaScript code.

- **Call Stack**  
  - Where functions are executed in a last-in, first-out (LIFO) order.  
  - It keeps track of the execution context for each function call.  
  - It helps manage function calls and handles the flow of execution.

- **Heap**  
  - Unstructured pool of memory used for dynamic memory allocation.  
  - stores objects that the application needs during execution.

## Just-in-Time Compilation  

Just-in-Time (JIT) compilation is used by JavaScript engines to improve performance. It converts JavaScript code into machine code at runtime, and is then executed immediately. In this scenario, there's no portable file to execute unlike on compiled languages.

<div class="img-center"> 

![](/img/docs/compile-interpret-jit.png)

</div>

