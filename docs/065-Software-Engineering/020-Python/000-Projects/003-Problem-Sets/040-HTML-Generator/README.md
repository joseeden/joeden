---
title: "HTML Generator"
description: "HTML Generator"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 40
last_update:
  date: 10/28/2019
---


## Problem 

You want to generate HTML dynamically using a Python script.

So far, you’ve created two decorators that wrap a function’s return value with bold and italic HTML tags. However, both decorators follow almost the same structure.

```python
def bold(func):
  @wraps(func)
  def wrapper(*args, **kwargs):
    msg = func(*args, **kwargs)
    return '<b>{}</b>'.format(msg)
  return wrapper

def italics(func):
  @wraps(func)
  def wrapper(*args, **kwargs):
    msg = func(*args, **kwargs)
    return '<i>{}</i>'.format(msg)
  return wrapper 
```

Instead of repeating similar code for every HTML tag, use a single decorator that can accept any pair of opening and closing tags.


## Solution

Create a reusable decorator,` html()`, that takes HTML tags as parameters and applies them to the function output.

The full code can be found here: [Github repo](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/020-Python/000-Projects/003-Problem-Sets/040-HTML-Generator/html-generator.py)