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

## `superclass` and `ancestors`

Every class can inherit from another class, which forms a hierarchy. The `superclass` and `ancestors` methods help you see where a class gets its methods.

- `superclass` shows the immediate parent class
- `ancestors` lists all classes and modules that provide behavior

Consider the `Animal` hierarchy below. We can see that the `Dog` inherits from `Mammal`, which inherits from `Animal`, and so on. 

```ruby
class Animal
end

class Mammal < Animal
end

class Dog < Mammal
end

puts Dog.superclass      
puts Mammal.superclass   
puts Animal.superclass   
puts Object.superclass   
puts BasicObject.superclass 
```

Output:

```bash
Mammal
Animal
Object
BasicObject

```

The `Object` class inherits from `BasicObject`, which is the **top-level class** in Ruby and does not have a superclass, so calling `BasicObject.superclass` returns `nil` or none.

The `ancestors` method shows the full chain of inheritance for a class, including all the classes and modules. For example:

```ruby 
puts Dog.ancestors.inspect  
```

Output:

```bash
[Dog, Mammal, Animal, Object, Kernel, BasicObject]
```

The classes can also be written in a compact form:

```ruby
class Animal; end
class Mammal < Animal; end
class Dog < Mammal; end

puts Dog.superclass      
puts Mammal.superclass   
puts Animal.superclass   
puts Object.superclass   
puts BasicObject.superclass 
```

## Chaining `superclass`

You can trace a class's inheritance chain by chaining the `superclass` method. This shows each parent class in the hierarchy. Once you reach `BasicObject`, calling `superclass` returns `nil`, which basically means you've reached the end of the hierarchy.

```ruby
class Animal
end

class Mammal < Animal
end

class Dog < Mammal
end

puts Dog.superclass                                               # Output: Mammal
puts Dog.superclass.superclass                                    # Output: Animal
puts Dog.superclass.superclass.superclass                         # Output: Object
puts Dog.superclass.superclass.superclass.superclass              # Output: BasicObject
puts Dog.superclass.superclass.superclass.superclass.superclass   # Output: nil
```


Another good example is chaining `superclass` on an integer like `27`. Since `27` is an object, not a class, we first call `class` to get its class, and then chain `superclass` to see the inheritance hierarchy:

```ruby
puts 27.class                                               # Output: Integer                                            
puts 27.class.superclass                                    # Output: Numeric                                        
puts 27.class.superclass.superclass                         # Output: Object                            
puts 27.class.superclass.superclass.superclass              # Output: BasicObject                     
puts 27.class.superclass.superclass.superclass.superclass   # Output: nil      
```



