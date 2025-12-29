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

## Declaring Subclasses 

A subclass gets all the functionality of its parent class and can also add its own unique methods.

To create a subclass, write the subclass name followed by `<` and the superclass it inherits from. For example, writing `Dog < Animal` makes `Dog` inherit from the `Animal` class.

```ruby
class Animal
  attr_reader :type, :action

  def initialize(type, action)
    @type = type 
    @action = action 
  end

  def perform
    "The #{@type} can #{@action}"
  end
end

# Subclass "Dog" inheriting from "Animal"
class Dog < Animal
end

# Subclass "Bird" inheriting from "Animal"
class Bird < Animal
end

# Creating objects
fido = Dog.new("dog", "bark and fetch")
tweety = Bird.new("bird", "fly and sing")

puts fido.perform   
puts tweety.perform
```

Output:

```bash
The dog can bark and fetch
The bird can fly and sing
```

Even though `Dog` and `Bird` have no methods defined inside them, they automatically get the initializer, readers, and instance methods from `Animal`. This avoids repeating code and allows each subclass to be extended with its own behavior later.