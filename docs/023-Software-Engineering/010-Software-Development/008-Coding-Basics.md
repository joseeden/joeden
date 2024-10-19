---
title: "Coding Basics"
description: "Software Development Maturity Models"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 8
last_update:
  date: 3/14/2022
---


## Overview

As project size and complexity grow, disciplined methods and best practices are essential for writing better code and enhancing collaboration among developers. A key goal is to achieve **clean code**, which is easy to read and understand. 

## Clean Code

Clean code results from developers striving to enhance readability and comprehension. Although "clean" can be subjective, common principles include:

- **Consistent Formatting**: 
  - Adheres to accepted practices (tabs vs. spaces).
  - Maintains consistent indentation and syntax.
  
- **Intuitive Naming**: 
  - Uses clear variable and object names.
  
- **Logical Organization**: 
  - Groups declarations logically, with functions at the top and mainline code at the bottom.
  
- **Documentation**: 
  - Includes meaningful comments for clarity.
  
- **Purposeful Code**: 
  - Ensures every line serves a function and removes unused code.
  
- **Reusability and Testability**: 
  - Structures code for easy unit testing and reuse.

Clean code emphasizes:

- Standardized formatting and naming for readability.
- Clear organization to convey intent.
- Modularity for easier testing and reuse.
- Inline comments for self-documentation.

This allows other developers to understand and modify your code independently, accelerating development and enhancing maintainability. Conversely, unclean code can lead to technical debt, making it unmaintainable or unreliable. 

Below are just reasons why developers should follow clean code:

1. Easier to understand, compact, and better organized.
2. Code has less bugs, works correctly, and performs as required.
3. Modular design simplifies automated testing.
4. Standardize scanning and checking with automated tools.
5. It just looks nicer.



## Methods and Functions

Methods and functions are blocks of code that execute tasks. Here are best practices for encapsulating code in methods or functions:

- **Encapsulate Discrete Tasks**:  
  - Encapsulate utility functions or I/O operations for clarity.  
  - Use once-off functions to prepare for potential future reuse.  

- **Avoid Code Duplication**:  
  - Encapsulate repeated code to streamline maintenance.  
  - Simplify code updates and reduce error potential.  

By following these practices, methods and functions not only improve code organization but also enhance readability and reduce the likelihood of bugs. This leads to more efficient collaboration among developers and easier debugging and code management in the long run.

Syntax of a Function in Python:

```python

# Define the function
def functionName:
...blocks of code...
# Call the function
functionName()
```

### Arguments and Parameters

Methods and functions can take values (arguments) when executed. Parameters define what the method or function accepts:

- Can have different data types.
- Clear type definitions improve reuse and error handling.

Parameters can also control code execution, enhancing method and function versatility.

```python
# Define the function
def functionName(param1,...,paramN):
    ...blocks of code...
# Call the function
functionName("arg1", 4, {"arg3":"3"})
```

The example above is passing this function a string, an integer (or number), and an object containing a key and a value.

### Return Statements

Methods and functions can return values using the `return` statement, which allows code to skip subsequent lines upon execution.

```python
  
# Define the function
def functionName(parameter1,...,parameterN):
  # You can use the parameters just like local variables
  ...blocks of code...
  someVariable = parameter1 * parameter2
  return someVariable
# Call the function
myVariable = functionName("argument1", 4, {"argument3":"3"})
```

In the above example, the returned value would be the string **"argument1argument1argument1argument1"**, because Python lets you concatenate strings using the multiplication operator.

### Function Example

Let's say your original code looks like the one below. As you can see, there is a lot of duplicate code here.


```python
# Print the circumference for circles with a radius of 2, 5, and 7
radius1 = 2
radius2 = 5
radius3 = 7
# Formula for a circumference is c = pi * diameter
# Formula for a diameter is d = 2 * radius

circumference1 = pi * radius1 * 2
print ("Circumference of a circle with a radius of " + str(radius1) + " is " + str(circumference1))
circumference2 = pi * radius2 * 2
print ("Circumference of a circle with a radius of " + str(radius2) + " is " + str(circumference2))
circumference3 = pi * radius3 * 2
print ("Circumference of a circle with a radius of " + str(radius3) + " is " + str(circumference3))
```


By using methods with parameters, your code can be cleaned up:

```python
def circumference(radius):
  circumferenceValue = pi * radius * 2
  return circumferenceValue

def printCircumference(radius):
  myCircumference = circumference(radius)  
  print ("Circumference of a circle with a radius of " + str(radius) + " is " + str(myCircumference))

radius1 = 2
radius2 = 5
radius3 = 7

# Calls
printCircumference(radius1)
printCircumference(radius2)
printCircumference(radius3)
```

The new version uses uutilizes functions, parameters, and arguments, which helps eliminates duplication. This approach allows for labeling code blocks, enhancing clarity about their purposes. In more complex examples, having code repeated multiple times would significantly reduce understandability.


### Methods vs. Functions

Both methods and functions serve similar purposes but differ in their usage and association.

- **Functions**: Standalone code blocks.
- **Methods**: Associated with objects in object-oriented programming.

The code from the function example can be modified to turn the function into a method, producing the same result:

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius
    def circumference(self):
      # Formula for a circumference is c = pi * diameter
      # Formula for a diameter is d = 2 * radius
      
      circumferenceValue = pi * self.radius * 2
      return circumferenceValue
    def printCircumference(self):
      myCircumference = self.circumference()
      print ("Circumference of a circle with a radius of " + str(self.radius) + " is " + str(myCircumference))

radius1 = 2
radius2 = 5
radius3 = 7

circle1 = Circle(radius1)
circle1.printCircumference()
circle2 = Circle(radius2)
circle2.printCircumference()
circle3 = Circle(radius3)
circle3.printCircumference()
```



## Modules

Modules are self-contained code chunks for reuse, helping to divide large projects into smaller, manageable parts. A module consists of a set of functions and typically contains an interface for other modules to integrate with. It is essentially, a library, and cannot be instantiated.

Below is a module with a set of functions saved in a script called `circleModule.py`. 

```python
  
# Given a radius value, print the circumference of a circle.
# Formula for a circumference is c = pi * 2 * radius

class Circle:

    def __init__(self, radius):
        self.radius = radius

    def circumference(self):
      
      circumferenceValue = pi * self.radius * 2
      return circumferenceValue

    def printCircumference(self):
      myCircumference = self.circumference()
      print ("Circumference of a circle with a radius of " + str(self.radius) + " is " + str(myCircumference))
```

An application that exists in the same directory as **circleModule.py** could use this module by importing it, instantiating the class, and then using dot notation to call its functions, as follows:

```python
  
from circleModule import Circle
      
# First instantiation of the Circle class.
circle1 = Circle(2)
# Call the printCircumference for the instantiated circle1 class.
circle1.printCircumference()

# Two more instantiations and method calls for the Circle class.
circle2 = Circle(5)
circle2.printCircumference()

circle3 = Circle(7)
circle3.printCircumference()
```


## Classes

Object-oriented programming (OOP) encapsulates data and functionality through classes. Each class defines a new object type, bundling data with methods. Inheritance allows new classes to derive properties and methods from existing ones.

- **Instantiation**: Classes can be instantiated multiple times with unique attributes.
- **Dot Notation**: Used to access methods and attributes outside the class.

In Python, class variables aren't private, but conventionally, single underscores signify privacy.
