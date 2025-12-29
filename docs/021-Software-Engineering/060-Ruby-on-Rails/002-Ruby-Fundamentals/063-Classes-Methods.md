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
Hello from the class
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

In the example below, the class methods `Appliance.fridge` and `Appliance.washer` create appliances with preset voltage and power values. 

**Note:** `Appliance.fridge` is equivalent to calling `self.fridge`, and the same applies to `Appliance.washer`.


```ruby
class Appliance
  attr_reader :voltage, :power

  def initialize(voltage, power)
    @voltage = voltage
    @power = power 
  end

  def self.fridge 
    self.new(220, 150)
  end 

  def self.washer
    self.new(220, 500)
  end
end

fridge1 = Appliance.fridge
washer1 = Appliance.washer

puts fridge1.voltage
puts fridge1.power

puts washer1.voltage
puts washer1.power
```

Output:

```bash
220
150
220
500
```


### Using `class << self`

You can define several class methods together using `class << self`. Inside this block, all methods automatically become class methods, so you don’t need to add `self` before each method name.

Using the previous example on the `Appliance` class:

```ruby
class Appliance 
  attr_reader :voltage, :power 

  def initialize(voltage, power)
    @voltage = voltage
    @power = power
  end

  class << self 
    def fridge
      new(220, 150)
    end
    def washer
      new(220, 150)
    end
  end
end

fridge = Appliance.fridge
washer = Appliance.washer

puts fridge.voltage
puts fridge.power
puts washer.voltage
puts washer.power
```

Output:

```bash
220
150
220
500
```

Using `class << self` automatically treats all methods inside as class methods. This keeps them grouped and avoids repeating `self` before each method. 

**Additional:** You would typically see the `class << self` block closer the top in most projects:

```ruby
class Appliance 
  class << self 
    def fridge
      new(220, 150)
    end
    def washer
      new(220, 150)
    end
  end

  attr_reader :voltage, :power 

  def initialize(voltage, power)
    @voltage = voltage
    @power = power
  end
end

fridge = Appliance.fridge
washer = Appliance.washer

puts fridge.voltage
puts fridge.power
puts washer.voltage
puts washer.power
```


### Class Methods vs Instance Methods

Quick comparison:

- Instance methods belong to objects created from the class.
- Class methods belong to the class itself.

This difference matters because some behavior does not make sense to attach to a single object. Creating new objects is one of those cases, which is why `new` and similar helpers are class methods.

**When to use class methods:** Use a class method when the behavior does not belong to a single object but is related to the class as a whole.

## Class Variables 

A class variable is data that belongs to the class, not to individual objects. It is shared across all instances and is often used with class methods to access or update values.

Examples: Counting how many objects of a class have been created. 

You declare a class variable using `@@` (two "at"signs) and usually define a class method to read its value.

```ruby
class Bike 
  @@count = 0 

  attr_reader :color 

  def initialize(color)
    @color = color 
    @@count += 1
  end

  def self.count 
    @@count 
  end
end

bike1 = Bike.new("red")
bike2 = Bike.new("blue")
bike3 = Bike.new("green")

puts Bike.count
```

Output:

```bash
3 
```

Here, the `@@count` is a class variable shared by all `Bike` instances. When a new `Bike` is initialized, it runs the `@@count += 1` which increases the `@@count`.

## Extending a Class in Parts

You can define a class in more than one place. Each definition adds to the class, and all methods and logic combine to form the final class. This is useful in large codebases where different files contribute to the same class.

```ruby
class Novel 
  attr_reader :title, :author, :pages 

  def initialize(title, author, pages)
    @title = title
    @author = author 
    @pages = pages
  end
end

lotr = Novel.new("The Lord of the Rings", "J.R.R. Tolkien", 1178)

puts lotr.title
puts lotr.author
puts lotr.pages
```

Output:

```bash
The Lord of the Rings
J.R.R. Tolkien
1178
```

Later, you can add a new class definition for the same `Novel` class:

```ruby
class Novel 
  attr_reader :title, :author, :pages 

  def initialize(title, author, pages)
    @title = title
    @author = author 
    @pages = pages
  end
end

lotr = Novel.new("The Lord of the Rings", "J.R.R. Tolkien", 1178)

puts lotr.title
puts lotr.author
puts lotr.pages

# Adding a new method for the "Novel" class
class Novel 
  def read 
    1.step(pages, 10) do |page|
      puts "Reading page: #{page}"
    end
    puts "Done reading: #{title}"
  end
end

puts lotr.read
```

Output:

```bash
The Lord of the Rings
J.R.R. Tolkien
1178
Reading page: 1
Reading page: 11
....
Reading page: 1161
Reading page: 1171
Done reading: The Lord of the Rings
```

Even though the `lotr` instance was already created with `lotr = Novel.new(...)`, Ruby will merge the second `class Novel` block and its new methods into the existing `Novel` class.

Note that Ruby reads files top to bottom, so methods must be defined before they are called. As an example, if you call the `lotra.read` before adding the new logic:

```ruby
# Attempting to invoke read before its define
puts lotr.read

# Adding a new method for the "Novel" class
class Novel 
  def read 
    1.step(pages, 10) do |page|
      puts "Reading page: #{page}"
    end
    puts "Done reading: #{title}"
  end
end
```

This will raise a `NoMethodError` exception because the method does not exist yet:

```bash
undefined method 'read' for an instance of Novel (NoMethodError)
```

## Monkey Patching 

**Monkey Patching** is the practice of adding new methods or functionality to an existing Ruby class. This works for both custom classes and Ruby’s built-in classes like `String` or `Array`.

For example, we can add a `count_vowels` method to the `String` class:

```ruby
class String
  def count_vowels
    self.downcase.count("aeiou")
  end
end

puts "Hello".count_vowels  
puts "Refrigerator".count_vowels  
```

Output:

```bash
2
5
```

We can also extend `Array` with a method to check if it is sorted:

```ruby
class Array
  def sorted?
    self == self.sort
  end
end

puts [1,2,3].sorted?    # true
puts [1,3,2].sorted?    # false
```

Output:

```bash
true
false
```

**Note:** Any object from a patched class gains the new methods automatically.

Monkey patching is generally discouraged because you might accidentally replace core methods, which can break expectations in your program. Much safer alternatives include creating helper classes that operate on the object instead of changing the original class.

The key idea is that Ruby allows it, but it should be used carefully and only when necessary.

## Hash as `initialize` Arguments 

You can pass a single hash to initialize to set multiple attributes at once. This avoids having to remember the order of parameters.

For example, using the hash `details` in the `initialize` method:

```ruby
class Employee
  attr_reader :name, :age, :occupation, :hobby, :birthplace

  def initialize(details)
    @name = details[:name]
    @age = details[:age]
    @occupation = details[:occupation]
    @hobby = details[:hobby]
    @birthplace = details[:birthplace]
  end
end

new_hire_1 = Employee.new({ name: "Adam", 
                        age: 53, 
                        occupation: "Economist", 
                        hobby: "Running", 
                        birthplace: "Delaware" })

p new_hire_1.name        
p new_hire_1.age        
p new_hire_1.occupation        
p new_hire_1.hobby        
p new_hire_1.birthplace           
```

Output:

```bash
"Adam"
53
"Economist"
"Running"
"Delaware"
```

Passing the hash `details` as argument avoids the need to remember the order of parameters, but it can still lead to mistakes if a key is missing or mistyped. 

**Another tip:** If a hash is the last argument to a method, you can omit the curly braces:

```ruby
new_hire_1 = Employee.new(name: "Adam", 
                        age: 53, 
                        occupation: "Economist", 
                        hobby: "Running", 
                        birthplace: "Delaware")
```

Now, if you mistakenly missed a key, for example, the `age` key:

```ruby
new_hire_1 = Employee.new({ name: "Adam", 
                        occupation: "Economist", 
                        hobby: "Running", 
                        birthplace: "Delaware" })

p new_hire_1.name        
p new_hire_1.age        
p new_hire_1.occupation        
p new_hire_1.hobby        
p new_hire_1.birthplace       
```

The `age` will now show as `nil` because Ruby is trying to access a missing key:

Output:

```bash
"Adam"
nil
"Economist"
"Running"
"Delaware"
```


Using a hash works, but missing or mistyped keys can cause problems. This is why **keyword arguments** are often a safer choice.

## Positional and Keyword Arguments

You can mix regular positional arguments with keyword arguments. Usually, positional arguments come first, followed by keyword arguments. 

**Keywords arguments** are discussed in detail in the [Custom Methods](/docs/021-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/057-Custom-Methods.md#keyword-arguments) page, but as a quick recap, keyword arguments allow you to clearly assign values to specific parameters when calling a method, and they can also have default fallback values. 

In the example below, `a:` and `b:` are keyword arguments.

```ruby
def sum(a:, b:)
  a + b
end

puts sum(a: 2, b: 3)   # Output: 5
puts sum(b: 3, a: 2)   # Output: 5
```

You can also give keyword arguments default values so they become optional:

```ruby
def sum(a: 1, b: 2)
  a + b
end

puts sum(b: 3, a: 2)   # Output: 5
puts sum               # Output: 3, uses default a and b
puts sum(a: 5)         # Output: 7. uses default a
```

You can combine this with positional arguments. In the example below, `a` is positional and `b:` is a keyword argument with a default value:

```ruby
def sum(a, b: 1)
  a + b
end

puts sum(3, b: 5)    # Output: 8
puts sum(4)          # Output: 5, b defaults to 1
```

Note that if you switch the positions when calling the method, it will raise an error:

```ruby
puts sum(b: 5, 8)    
```

Output:

```bash
syntax errors found (SyntaxError)
```

This happens because Ruby expects the first value to be for the positional argument `a`. When a keyword argument like `b:` is provided first, Ruby no longer has a clear way to match the remaining value (which is `8`) to a or b, so it raises an error.

To prevent these errors, make sure to specify the positional arguments first and keyword arguments after.

#### Example: Refactoring the `Employee` Class 

Using the `Employee` Class from the [Hash as `initialize` Arguments](#hash-as-initialize-arguments) section above, we can improve it by making some parameters required and others optional with defaults.

In this version, `name` and `age` are both required keyword arguments, while `occupation`, `hobby`, and `birthplace` are optional since we have assigned default values for them.

```ruby
class Employee
  attr_reader :name, :age, :occupation, :hobby, :birthplace

  def initialize( name:,
                  age:,
                  occupation: "Employee",
                  hobby: "Unknown",
                  birthplace: "USA"
    )
    @name = name
    @age = age
    @occupation = occupation
    @hobby = hobby
    @birthplace = birthplace
  end
end

new_hire_1 = Employee.new(name: "John", 
                          age: 45, 
                          occupation: "Banker", 
                          hobby: "Fishing", 
                          birthplace: "Canada")

new_hire_2 = Employee.new(name: "Alex", age: 50)

p new_hire_1.name        
p new_hire_1.age        
p new_hire_1.occupation        
p new_hire_1.hobby        
p new_hire_1.birthplace     
```

Output:

```bash
"John"
45
"Banker"
"Fishing"
"Canada"
```

If we look at `new_hire_2`, there are no `nil` values or errors because any missing parameters automatically use their default values.

```bash
p new_hire_2.name        
p new_hire_2.age        
p new_hire_2.occupation        
p new_hire_2.hobby        
p new_hire_2.birthplace 
```

Output:

```bash
"Alex"
50
"Employee"
"Unknown"
"USA"
```

