---
title: "Classes: Methods"
description: "Classes: Methods"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 63
last_update:
  date: 8/24/2023
---


## Private Methods

A private method is used by an object to do its work. Unlike public methods, a private method cannot be called from outside the class. It can only be used by other methods within the same object.

- Hide complex logic from the main interface
- Keep initialization code clean and focused
- Prevent external code from accessing internal secrets
- Group helper logic under the `private` keyword

In the example below, the `Gadget` class allows anyone to read a serial number. Tthe `create_sid` method is "public," meaning anyone can trigger it from outside the class.

```ruby
class Gadget 

  attr_reader :username, :serial_id
  attr_writer :password 

  def initialize(username, password)
    @username = username 
    @password = password
    @serial_id = create_sid
  end

  def create_sid
    part_a = rand(10_000..99_999)
    part_b = rand(10_000..99_999)
    "ID-#{part_a}-#{part_b}"
  end

end


gadget_a = Gadget.new("veritymobile", "admin123")
p gadget_a.create_sid
```

Output:

```bash
  
```

At the moment, anyone can call the method outside the class, which exposes internal logic that should be handled automatically.

If we add the `private` keyword before `create_sid`, this tells Ruby that any methods below this keyword are for internal use only.

```ruby
class Gadget 

  attr_reader :username, :serial_id
  attr_writer :password 

  def initialize(username, password)
    @username = username 
    @password = password
    @serial_id = create_sid
  end

  private 
  
  def create_sid
    part_a = rand(10_000..99_999)
    part_b = rand(10_000..99_999)
    "ID-#{part_a}-#{part_b}"
  end

end


gadget_a = Gadget.new("veritymobile", "admin123")

p gadget_a.create_sid
```

Output:

```bash
private method 'create_sid' called for an instance of Gadget (NoMethodError)
```

It now returns a `NoMethodError` exception. Even though the method still exists and works perfectly inside the object, Ruby blocks any attempt to trigger it from the outside.

## Protected Methods

Protected methods are a middle ground in Ruby. They keep data hidden from the general public but allow objects of the same class to "talk" to each other.

- Accessible by any instance of the same class
- External users are blocked from calling them directly
- Acts like a "members only" pass for objects

This is perfect for when one object needs to look at another object's internal state to perform a comparison or calculation.

#### Example: Hardware Store

In the example below, we have a `Tool` class. We want to compare the quality of two tools without showing the customer the secret "quality score." By using the `protected` keyword, one tool can "peek" at another tool's score, but a user cannot.

```ruby
class Tool
  def initialize(score)
    @quality_score = score 
  end

  # Public method 
  def compare_with(other_tool)
    if self.quality_score > other_tool.quality_score
      "This tool is higher quality."
    else
      "The other tool is higher quality"
    end
  end

  protected 

  # Protected 
  def quality_score 
    @quality_score
  end
end

hammer = Tool.new(80)
drill = Tool.new(95)

puts hammer.compare_with(drill)
```

Output:

```bash
The other tool is higher quality
```

If you try to call the `quality_score` directly, Ruby will block you to protect the object's secrets.

```ruby
puts hammer.quality_score 
```

Output:

```bash
protected method 'quality_score' called for an instance of Tool (NoMethodError) 
```

## Public vs Private vs Protected

Quick comparison:

- **Public**: Anyone can call it.
- **Private**: Only the object itself can call it.
- **Protected**: The object and its "siblings" (other instances of the same class) can call it.

## Validating Ruby Setters

Default writers like `attr_writer` do not check if the value is valid. If you need rules, you must write your own setter.

- Use a custom setter to control what gets saved
- Add simple checks to reject bad data
- Hide rules in private methods to keep code clean

For more information on `attr_writer`, please [Attribute Accessors.](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/062-Classes-Encapsulation.md#the-ruby-way-attribute-accessors)


#### Basic custom setter with validation

This example shows a `LockBox` that only accepts a PIN with at least 6 characters.

```ruby
class LockBox
  attr_reader :pin 

  def initialize(pin)
    @pin = pin
  end

  # Custom setter 
  def pin=(new_pin)
    if new_pin.length >= 6
      @pin = new_pin
    end
  end
end

safe = LockBox.new("869487")

# Trying to set a new pin
safe.pin = "12345"
puts safe.pin
```

Output:

```bash
869487
```

The new value ("12345") is rejected because it is too short, so the old PIN remains.

To make the code cleaner, you can move the rules into a private method. Ruby commonly uses predicate methods (ending with `?`) for checks.

```ruby
class LockBox
  attr_reader :pin 

  def initialize(pin)
    @pin = pin
  end

  # Custom setter 
  def pin=(new_pin)
    if valid_pin?(new_pin)
      @pin = new_pin
    end
  end

  private 

  def valid_pin?(input)
    input.is_a?(String) && input.length >= 6
  end
end

safe = LockBox.new("869487")

# Trying to set a new pin
safe.pin = "12345"
puts safe.pin
```

The behavior stays the same, but the validation logic is now hidden and easier to maintain.


## Avoid Storing Derived State

A derived value is data that is calculated from other data in the object.

- It depends on other state
- It changes when that state changes

Because it is not independent, storing a derived value means you must remember to update it every time the original data changes. This often leads to bugs, which is why this approach is considered an anti-pattern.

:::info 

An anti-pattern is a common coding habit that looks acceptable at first but leads to bugs and extra work over time.

:::


This example shows `area` as a derived value being stored as an instance variable:

```ruby
class Box
  attr_accessor :height, :width
  attr_reader :area

  def initialize(height, width)
    @height = height
    @width = width
    @area = height * width
  end
end

b = Box.new(3, 5)
puts b.area

b.height = 10
puts b.area
```

Output:

```bash
15
15
```

The area does not change because it is only calculated once during initialization.Instead of storing the derived value, calculate it when needed. To do this, move the calculation on another instance method called `area`:

```ruby
class Box
  attr_accessor :height, :width

  def initialize(height, width)
    @height = height
    @width = width
  end

  def area
    height * width
  end
end

b = Box.new(3, 5)
puts b.area

b.height = 10
puts b.area

b.width = 8
puts b.area
```

Output:

```bash
15
50
```

By computing the value in a method, it always uses the latest state and stays correct. This avoids duplicate state and ensures that derived values belong in methods, not in stored variables.

## Class Methods

A class method is a method you call on the class itself, not on an object created from the class.

- It runs on the class, not an instance
- It can be used even before any object exists
- It is useful for logic that does not belong to one specific object

When you call `new`, you are actually already calling a method on the class, not on an instance. This shows that classes can have their own methods.

```ruby
class Animal
  def initialize(species)
    @species = species 
  end

  def speak
    puts "Animal name: #{@species}"
  end
end

# Create the ".new" class method
animal1 = Animal.new("Lion")
p animal1.speak
```

### Creating the Class Method 

You can define a class method by prefixing it with the class name. For example, to create a class method `hello` inside the `Book` class, you would write it as `Book.hello`:

```ruby
class Book
  # Class method
  def Book.hello 
    puts "Hello from the class"
  end
end

Book.hello
```

Output:

```bash
hello from the class
```

Note that if you don't add this and simply use `hello` as the method name, Ruby will read this as an instance method, not a class method.

This works, but if you need to change class name later, you would also need to update every class method that uses it. A better approach is to define class methods using `self`.

```ruby
class Book
  # Class method
  def self.hello 
    puts "Hello from the class"
  end
end

Book.hello
```

### Preconfigured Objects 

A common use for class methods is to create objects with preset values.

```ruby
class Vehicle
  attr_reader :wheels, :passengers

  def initialize(wheels, passengers)
    @wheels = wheels
    @passengers = passengers
  end

  def self.car
    new(4, 6)
  end

  def self.truck
    new(18, 2)
  end
end

car = Vehicle.car
truck = Vehicle.truck

puts car.wheels
puts car.passengers
puts truck.wheels
puts truck.passengers
```

Output:

```bash
4
6
18
2
```

These class methods hide the setup details and make object creation simpler and clearer.


## Class Methods vs Instance Methods

Quick comparison:

- Instance methods belong to objects created from the class.
- Class methods belong to the class itself.

This difference matters because some behavior does not make sense to attach to a single object. Creating new objects is one of those cases, which is why `new` and similar helpers are class methods.

**When to use class methods** 
Use a class method when the behavior does not belong to a single object but is related to the class as a whole.
