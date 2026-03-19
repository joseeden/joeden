---
title: "Function Tagger"
description: "Function Tagger"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
- Pandas
sidebar_position: 4
last_update:
  date: 10/28/2019
---


## Problem 

Use tags to add extra information to functions so they are easier to manage or track.  

- Tag functions with labels for searching later  
- Add information about who wrote the function  
- Mark functions as "experimental" if inputs or outputs may change  
- Flag functions planned for removal in the future  

## Solution 

Create a `tag` decorator that stores tags as an attribute on the function. When the function is called, it behaves normally, but you can access its `.tags` property to see all labels attached.  

The full code can be found here: [Github repo](https://github.com/joseeden/joeden/tree/master/docs/065-Software-Engineering/020-Python/000-Projects/003-Problem-Sets/042-Function-Tagger.md/function-tagger.py)

