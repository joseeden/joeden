---
title: "Design Patterns"
description: "Software Design Patterns"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 4
last_update:
  date: 6/12/2020
---


## Overview  

Software design patterns provide best practices for common software development challenges to enhance efficiency and maintainability. These language-independent patterns can be used in any object-oriented programming language and often lead to frameworks that simplify their implementation.

- Originated in architecture, organizing solutions by core themes  
- Pioneers in object-oriented coding adopted this approach  

In 1994, the Gang of Four published a key book on reusable object-oriented software design patterns, documenting essential patterns and their applications. This book, titled **Design Patterns: Elements of Reusable Object-Oriented Software**, identified 23 foundational patterns that address common design issues, promoting best practices for software developers.

## Key Principles  

- Program to an interface, not an implementation  
  - Loose coupling improves code understanding and maintenance  
  - Abstract interfaces allow generic function calls  

- Favor object composition over class inheritance  
  - Inheritance can create complex hierarchies  
  - Composition enables flexible subclasses with shared interfaces  

- Proven design patterns speed up development  
  - Leverage existing solutions instead of starting from scratch  
  - Patterns provide validated methods for reliability  

## The Original Design Patterns

In their book *Design Patterns*, the Gang of Four categorized patterns into three main types:

- **Creational**  
  - Guide and simplify object creation at scale.  
  - Examples include Singleton, Factory Method, and Builder patterns.  

- **Structural**  
  - Provide reliable ways to use objects and classes in various projects.  
  - Examples include Adapter, Composite, and Decorator patterns.  

- **Behavioral**  
  - How objects communicate and collaborate to address common challenges.  
  - Examples include Observer, Strategy, and Command patterns.  

They identified 23 design patterns, forming the foundation for many contemporary patterns. Most of these patterns embody core principles of effective object-oriented design.  


## Observer Design Pattern

The observer design pattern allows objects (observers) to receive notifications about changes in another object (subject). This pattern is commonly seen in applications like social media, where users follow others and get updates when the followed users post content.

To implement this pattern:

- The subject maintains a list of observers.
- The subject includes methods for adding and removing observers.
- A callback method is used for notifications through a standard interface.

The execution flow is as follows:

1. An observer registers itself with the subject.
2. When the subject changes, it notifies observers via callbacks.
3. Each callbacks contain data relevant to the user.
4. Observers process the notification through its callback.
5. This continues for every subject update.
6. Observers can unregister when they no longer want updates.

The benefit of the observer design pattern is that observers can get real time data from the subject when a change occurs. Subscription mechanisms always provide better performance than other options, such as polling.

## Model-View-Controller (MVC)

The Model-View-Controller (MVC) design pattern simplifies the development of graphical user interface applications by dividing responsibilities into components. This pattern is commonly used in user interfaces and web applications.

<div class='img-center'>

![](/img/docs/devnet-mvc.png)

</div>

The MVC components are as follows:

- **Model**
  - Manages data, logic, and application rules.
  - Updates the view when data changes.
  
- **View**
  - Displays data visually; multiple views can represent the same data.
  - Listens for updates from the model to refresh its display.
  
- **Controller**
  - Processes user input and communicates between the model and view.
  - Updates the model based on user actions and input.  

The execution of the Model-View-Controller looks like this:

1. The user provides input.
2. Controller accepts the input and manipulates the data.
3. Controller sends the manipulated data to the model.
4. The model accepts the manipulated data and processes it.
5. Data is sent to the view (via the controller).
6. The view accepts selected data and displays it to the user.
7. The user sees the updated data as a result of their input.

The Model-View-Controller pattern enables parallel development by requiring components to know only their interfaces. This abstraction keeps components independent and allows for reuse as long as they follow the defined interfaces.