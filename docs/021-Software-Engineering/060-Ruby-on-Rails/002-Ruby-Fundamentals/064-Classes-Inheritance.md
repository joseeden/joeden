---
title: "Classes: Inheritance"
description: "Classes: Inheritance"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 64
last_update:
  date: 8/24/2023
---

## Overview

Inheritance allows one class to reuse methods from another class. It helps reduce duplicated code and makes it easier to model related ideas in a clear hierarchy.

In Ruby, inheritance works with two main roles:

- A parent class (also called a **superclass** or **base class**) provides methods 
- A child class (also called a **subclass**) receives them. 

A class can inherit from only one parent, but inheritance can extend through multiple levels, with general behavior passed down to more specific classes.

For example, if you model animals, an `Animal` class can define shared behavior like eating or sleeping, while `Dog` or `Bird` classes can add their own specific actions. This keeps common logic in one place and makes the code easier to extend and maintain.

<div class='img-center'>

![](/img/docs/Screenshot-2025-12-29-165404.png)

</div>
