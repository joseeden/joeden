---
title: "Timeout Decorator"
description: "Timeout Decorator"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 41
last_update:
  date: 10/28/2019
---


## Problem 

Some functions can run too long or hang indefinitely. We want a way to stop them if they exceed a certain time limit.  

## Solution

Create a **timeout decorator** that stops a function if it runs longer than the allowed time. 

The decorator can use Python's `signal` module to raise a `TimeoutError` when the function takes too long. It can also be customized to allow different timeouts for different functions. 

The full code can be found here: [Github repo](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/020-Python/000-Projects/003-Problem-Sets/041-Timeout-Generator/timeout-decorator.py)