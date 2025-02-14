---
title: "Thinking like a Developer"
description: "Thinking like a Developer"
tags: 
-DevOps
- Personal Notes
- Development
sidebar_position: 2
last_update:
  date: 07/13/2019
---

## Ask the Right Questions 

When given a problem, make sure to ask the correct questions. You may not have all the questions at the beginning since you don't have all the facts yet, but as you gain more experience, you will develop a sense of how projects should be started and eventually you will come up with a set of common questions to ask when provided with some business requirements.

Example: 

Project Manager tells the team:

> We need a function that reverses whatever we passes onto it. 


**The common questions to ask:**

- *What does "whatever" mean?*

    What needs to be reversed? In the context of data structures, only:
    
    - strings
    - numbers
    - arrays
    
    Dictionaries doesn't have a well-defined order and they don't have indexes, so they can't be reversed. The following cannot be reversed:

    - Dictionaries/Objects 
    - Boolean 

- *What to do if something else is passed in?*

    How should we handle inputs which are not strings, numbers, or arrays? 

- *What should be returned by the function?*

    Should it always return a string?
    Should it return the same type as the input?

## Divide and Conquer 

Break a big problem to digestible chunks/smaller problems so it's much easier to solve. We can also understand a problem better when we break it apart.

Using the previous example, the steps to break the problem to smaller sub-problems:

- Check if argument is a string, a number, or an array
- Implement reversing a number
- Implement reversing a string 
- Implement reversing an array
- Return a reversed value 

## Do as much research as you have to

At the beginning, we should always try to solve the sub-problems on our own using our own abilities. However if you keep hitting obstacles, it is recommended to find external sources, such as Google or Stackoverflow.

In reality, you'll normally go straight to Google and see if there is an existing solution to your problem.

## Write Pseudo-code

For bigger problems, it is helpful to write some sort of pseudo-code before writing the actual code. A pseudo-code is an informal description of the actual code. An example is:

```plaintext
function reverse(value) 

  if type(value) == string
    reverse_value = reverse string 
    return reverse_value

  else if type(value) == number
    reverse_value = reverse string 
    return reverse_value

  else if type(value) == array
    reverse_value = reverse string 
    return reverse_value

  else
    return "Invalidy input type"
```

From here, you can use your preferred language like Python and follow this flow to create the function.

## The Debugging Process 

1. **Identify the Bug**

    Becoming aware that there is a bug. Discovering the bug can happen:

    - During development
    - Testing software
    - Context: browsers, users, etc.
    - User reports during production (worst, went live undetected)

2. **Find the Bug**

    Isolating the part of the code where the bug is found.

    - Isolate through developer console
    - For complex bugs, use debugger software 

3. **Fix the Bug**

    Correct the bug, ensure this bug doesn't exist anywhere else in the code.

    - Replace existing solution with working solution
    - Search for the bug in similar code
    - Write tests using testing software