---
title: "Modules and Mixins"
description: "Modules and Mixins"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 70
last_update:
  date: 8/24/2023
---

## Modules

Modules in Ruby are containers that group related code together. Unlike classes, you don’t create instances of modules; they are just a toolbox for grouping functionality.

To define a module, use the `module` keyword, followed by the module name. 

```ruby
module LengthConversions
  # add logic here
end

```

You can call methods inside a module by using the `self` as a prefix, for example:

```ruby
module LengthConversions
  def self.miles_to_feet(miles)
    miles * 5280
  end

  def self.miles_to_inches(miles)
    miles_to_feet(miles) * 12
  end

  def self.miles_to_cm(miles)
    miles_to_inches(miles) * 2.54
  end
end
```

Methods inside a module are not available at the top level. To use these method, you need to reference the module as a prefix. 

```ruby
puts LengthConversions.miles_to_feet(10)      # 52800
puts LengthConversions.miles_to_inches(10)    # 633600
puts LengthConversions.miles_to_cm(10)        # 1606944.0
```


## Avoiding Name Conflicts

Modules prevent method name conflicts by grouping methods and classes inside a namespace. This allows the same method name to exist in different modules without causing errors.

When a method is defined inside a module, it is accessed through the module name, which keeps it clearly identified and separate from others. For example:

```ruby
module Square
  # "area' method
  def self.area(side)
    side * side
  end
end

module Rectangle
  # "area' method
  def self.area(length, width)
    length * width
  end
end

puts Square.area(10)
puts Rectangle.area(10, 5)
```

Output:

```text
100
50
```

Here, both methods are named `area`, but there is no conflict because each lives inside its own module. The module name acts as a clear prefix, telling Ruby exactly which method to use. 

## Using Modules Across Files

Instead of putting many modules in one file, you can save the modules in separate files.. Using the example from previous section, the `Square` and `Rectangle` modules can be stored in their respective Ruby files:

- `square.rb`

    ```ruby
    module Square
      def self.area(side)
        side * side
      end
    end
    ```

- `rectangle.rb`

    ```ruby
    module Rectangle
      def self.area(length, width)
        length * width
      end
    end
    ```

To use both modules, we need to import them using the `require_relative` keyword:

```ruby
## main.rb

require_relative "square"
require_relative "rectangle"

puts Square.area(10)
puts Rectangle.area(3, 5)
```

Running the script:

```bash
ruby main.rb  
```

Output:

```text
100
15
```

Here, both modules are loaded into the file, but their `area` methods do not conflict because each one is wrapped inside its own module. 


## Built-in Module: `Math`

Ruby includes many ready-to-use modules that organize related functionality. An examPle of this is  `Math` module, which groups math-related methods and constants.

:::info 

Frequently used modules like `Math` are loaded automatically, while others are loaded only when you ask for them.

:::

Example using the `sqrt` method:

```ruby
puts Math.sqrt(4)
puts Math.sqrt(5)
```

Output:

```ruby
2.0
2.23606797749979
```

To see all available methods:

```ruby
puts Math.methods.sort 
```

Modules can also contain constants. A common example is `PI`, which stores the value of pi.

```ruby
puts Math::PI
```

Output:

```text
3.141592653589793
```

Constants are accessed using `::` instead of a dot. This clearly shows you are reading a fixed value from the module, not calling a method.

## Importing Built-in Modules

Some Ruby modules are not available by default and must be imported before you can use them. This keeps Ruby fast by loading only what your program needs.

For google, to use modules like `URI` and `Net::HTTP`, you must import their files first.

```ruby
require "uri"
require "net/http"
```

**Note:** Use `require` to load files from Ruby’s libraries or other locations, and use `require_relative` to load files that are in the same directory as the current file.

Once imported, you can use methods and classes inside these modules.

```ruby
require "net/http"

url = URI.parse("https://www.google.com")
response = Net::HTTP.get(url)

puts response
```

Here, `URI.parse` creates a URL object, and `Net::HTTP.get` uses it to fetch data from the web. This prints the HTML content of the webpage.

:::tip[Modules Can Load Other Modules]

Some modules depend on others. For google, `net/http` automatically loads `uri` internally. Ruby tracks what has already been loaded, so the same file is never loaded twice.

:::

## Mixins 

Mixins and modules work together to share behavior between classes without using inheritance. 

- A **module** groups related methods
- A **mixin** adds those methods into a class

Some behaviors are useful across many objects, even when those objects are not related.

- Different objects can share the same behavior
- Inheritance is not always a good fit
- Behavior can be added without changing class relationships


## Using the `Enumerable` module

Ruby provides a built-in module called `Enumerable`. When mixed into a class, it adds many iteration-related methods.

- `each`
- `map`
- `select`
- `reject`
- `any`
- `sort`

The `Bookshelf` class below stores books and magazines:

```ruby
class Bookshelf
  include Enumerable

  def initialize(books:, magazines:)
    @books = books
    @magazines = magazines
  end

  def books
    @books
  end

  def magazines
    @magazines
  end

  def items
    books + magazines
  end

  def each
    items.each do |item|
      yield item
    end
  end
end
```

Here, `Enumerable` is mixed into the class, and `each` defines how to iterate. This brings the idea of mixins into practice.

We can create a `shelf` instance and see all stored items:

```ruby
shelf = Bookshelf.new(
  books: ["Ruby Basics", "Learn Rails", "Programming Tips"],
  magazines: ["Tech Monthly", "Code Weekly", "Dev Digest"]
)

shelf.items
```

Output:

```ruby
["Ruby Basics", "Learn Rails", "Programming Tips", "Tech Monthly", "Code Weekly", "Dev Digest"]
```

Now that we have defined `each`, we can use many methods that rely on iteration:


1. Iterate over all items in the shelf:

    ```ruby
    shelf.each do |item|
      puts "#{item} is on the shelf"
    end
    ```

    Output:

    ```
    Ruby Basics is on the shelf
    Learn Rails is on the shelf
    Programming Tips is on the shelf
    Tech Monthly is on the shelf
    Code Weekly is on the shelf
    Dev Digest is on the shelf
    ```

2. Sort all items alphabetically:

    ```ruby
    shelf.sort
    ```

    Output:

    ```ruby
    ["Code Weekly", "Dev Digest", "Learn Rails", "Programming Tips", "Ruby Basics", "Tech Monthly"]

    ```

3. Check if any item meets a condition:

    ```ruby
    shelf.any? { |item| item.length > 12 }
    ```

    Output:

    ```ruby
    true
    ```

4. Transform items with a block:

    ```ruby
    shelf.map { |item| item.upcase }
    ```

    Output:

    ```ruby
    ["RUBY BASICS", "LEARN RAILS", "PROGRAMMING TIPS", "TECH MONTHLY", "CODE WEEKLY", "DEV DIGEST"]
    ```

