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


## Mixins: `Enumerable` Module

Ruby provides a built-in module called `Enumerable`. When mixed into a class, it adds many iteration-related methods.

- `each`
- `map`
- `select`
- `reject`
- `any`
- `sort`

Example: 

The `Bookshelf` class below stores two collections: books and magazines.

```ruby
class Bookshelf
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
end
```

We create an instance with some sample data.

```ruby 
shelf = Bookshelf.new(
  books: [
    "Slaughterhouse-Five by Kurt Vonnegut",
    "Cat's Cradle by Kurt Vonnegut",
    "Stranger in a Strange Land by Robert A. Heinlein",
    "Dune by Frank Herbert",
    "1984 by George Orwell"
  ],
  magazines: [
    "Asimov's Science Fiction",
    "The Magazine of Fantasy & Science Fiction",
    "Clarkesworld Magazine",
    "Weird Tales",
    "Analog Science Fiction and Fact"
  ]
)
 
```

We can list the books by calling the `books` method, which will then return an array:

```bash
puts shelf.books 
```

Output:

```bash
Slaughterhouse-Five by Kurt Vonnegut
Cat's Cradle by Kurt Vonnegut
Stranger in a Strange Land by Robert A. Heinlein
Dune by Frank Herbert
1984 by George Orwell 
```

Now, if we want to sort them in order, we might expect to be able to do this:

```bash
puts shelf.sort 
```

But this will return an error because we didn't define a method in the `Bookshelf` class. At the moment, it's just a container that holds arrays.

```bash
undefined method 'sort' for an instance of Bookshelf (NoMethodError) 
```

We can *sort* the books by calling `sort` on the array returned by `books`.

```bash
puts shelf.books.sort
```

Output:

```bash
1984 by George Orwell
Cat's Cradle by Kurt Vonnegut
Dune by Frank Herbert
Slaughterhouse-Five by Kurt Vonnegut
Stranger in a Strange Land by Robert A. Heinlein
```

This works, but it means that if we want to perform any operation, we must always append it to the internal array. For example:

```bash
puts shelf.books.any? { |item| item.length > 12 }
puts shelf.books.map { |item| item.upcase }
puts shelf.books.select { |item| item.downcase.include?("g")}
```

At this point, all useful methods live on the internal arrays, not the class itself. Instead of repeatedly reaching into `books` (or `magazines`) to access these behaviors, we can take advantage of the `Enumerable` module.

By mixing `Enumerable` into the class, Ruby takes the methods defined inside `Enumerable` module, and *injects* them into the class and makes them available directly on `Bookshelf`. This allows the object itself to behave like a collection, rather than just containing one.

#### Combined arrays 

Right now, the class has two separate arrays: `books` and `magazines`

`Enumerable` does know which one to iterate over or whether to iterate over both. To fix this problem, we can combine both arrays into one array that preserves the order (books first, magazines second). We can do this by adding an `items` method insdie the `Bookshelf` class:

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
end
```

When we call `items`, it now returns a single array containing all the items:

```bash
shelf.items
```

Output:

```bash
Slaughterhouse-Five by Kurt Vonnegut
Cat's Cradle by Kurt Vonnegut
Stranger in a Strange Land by Robert A. Heinlein
Dune by Frank Herbert
1984 by George Orwell
Asimov's Science Fiction
The Magazine of Fantasy & Science Fiction
Clarkesworld Magazine
Weird Tales
Analog Science Fiction and Fact
```

#### Defining iteration with `each`

At this point, `Enumerable` now has one logical list to work with, but we still cannot call methods directly on the class. The reason is that `Enumerable` does not know *how* to iterate over a `Bookshelf`. It only provides higher-level methods, but it depends on the object responding to `each`.

The next step is to define an `each` method inside the `Bookshelf` class which tells Ruby how to iterate over the specific entities within class.

```ruby
def each
  items.each do |item|
    yield item
  end
end
```

This method acts as a bridge between the `Bookshelf` and `Enumerable`:

- `items.each` lets the combined array handle the looping
- `yield` sends each item to the block passed to `each`
- Ruby now knows how to move through the object one item at a time

Simply put: `Enumerable` asks what to do, but `each` explains how to move.

The complete code should now look like this: 

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

shelf = Bookshelf.new(
  books: [
    "Slaughterhouse-Five by Kurt Vonnegut",
    "Cat's Cradle by Kurt Vonnegut",
    "Stranger in a Strange Land by Robert A. Heinlein",
    "Dune by Frank Herbert",
    "1984 by George Orwell"
  ],
  magazines: [
    "Asimov's Science Fiction",
    "The Magazine of Fantasy & Science Fiction",
    "Clarkesworld Magazine",
    "Weird Tales",
    "Analog Science Fiction and Fact"
  ]
)
```

**Note:** `def each` creates the instance method while the `items.each` are called on a regular array that is returned by the `items` method.

Now that we have defined `each`, we can use the methods that rely on iteration:

1. Iterate over all items in the shelf:

    ```ruby
    shelf.each do |item|
      puts "#{item} is on the shelf"
    end
    ```

    Output:

    ```
    Slaughterhouse-Five by Kurt Vonnegut is on the shelf
    Cat's Cradle by Kurt Vonnegut is on the shelf
    Stranger in a Strange Land by Robert A. Heinlein is on the shelf
    Dune by Frank Herbert is on the shelf
    1984 by George Orwell is on the shelf
    Asimov's Science Fiction is on the shelf
    The Magazine of Fantasy & Science Fiction is on the shelf
    Clarkesworld Magazine is on the shelf
    Weird Tales is on the shelf
    Analog Science Fiction and Fact is on the shelf
    ```

2. Sort all items alphabetically:

    ```ruby
    puts shelf.sort
    ```

    Output:

    ```ruby
    1984 by George Orwell
    Analog Science Fiction and Fact
    Asimov's Science Fiction
    Cat's Cradle by Kurt Vonnegut
    Clarkesworld Magazine
    Dune by Frank Herbert
    Slaughterhouse-Five by Kurt Vonnegut
    Stranger in a Strange Land by Robert A. Heinlein
    The Magazine of Fantasy & Science Fiction
    Weird Tales
    ```

    We did not define any `sort`, but it is actually using the `sort` method from the `Enumerable` module. We can also now use the other methods like `any?` and `map`.

3. Check if any item matches a condition (e.g., longer than 12 characters):

    ```ruby
    p shelf.any? { |item| item.length > 12 }
    ```

    Output:

    ```ruby
    true
    ```

4. Transform items with a block (e.g., convert all text to uppercase):

    ```ruby
    p shelf.map { |item| item.upcase }
    ```

    Output:

    ```ruby
    SLAUGHTERHOUSE-FIVE BY KURT VONNEGUT
    CAT'S CRADLE BY KURT VONNEGUT
    STRANGER IN A STRANGE LAND BY ROBERT A. HEINLEIN
    DUNE BY FRANK HERBERT
    1984 BY GEORGE ORWELL
    ASIMOV'S SCIENCE FICTION
    THE MAGAZINE OF FANTASY & SCIENCE FICTION
    CLARKESWORLD MAGAZINE
    WEIRD TALES
    ANALOG SCIENCE FICTION AND FACT
    ```

5. Select items that meet a condition (e.g., contain the letter "g"):

    ```ruby
    p shelf.select { |item| item.downcase.include?("g")}
    ```

    Output:

    ```ruby
    Slaughterhouse-Five by Kurt Vonnegut
    Cat's Cradle by Kurt Vonnegut
    Stranger in a Strange Land by Robert A. Heinlein
    1984 by George Orwell
    The Magazine of Fantasy & Science Fiction
    Clarkesworld Magazine
    Analog Science Fiction and Fact
    ```

We can further modify to class, let's say to iterate over books only, by updating the `each` method:

```ruby
def each
  books.each do |item|
    yield item
  end
end 
```

Or to iterate over magazines only:

```ruby
def each
  magazines.each do |item|
    yield item
  end
end 
```



## Multiple Mixins

In this example, we have a `RestApiHandler` class for a backend server. It needs several independent features: authentication, logging, and response formatting. 

Each feature is implemented as a separate module in its own file and mixed into the class.

- `auth.rb` - This module handles authentication

    ```ruby
    module Auth
      def authenticate(user)
        if user[:token] == "valid_token"
          @current_user = user[:name]
          true
        else
          false
        end
      end

      def current_user
        @current_user
      end
    end
    ```

- `logger.rb` - This module tracks requests

    ```ruby
    module Logger
      def log_request(endpoint)
        puts "[LOG] User #{@current_user || 'Guest'} accessed #{endpoint}"
      end
    end
    ```

- `response_formatter.rb` - This module formats API responses

    ```ruby
    require 'json'

    module ResponseFormatter
      def json_response(data)
        { status: "success", data: data }.to_json
      end
    end
    ```

The next step is to create a class that brings together all three modules.. We first load each module using `require_relative` with the file names, and then include them inside the class with the `include` keyword:

```ruby
## rest_api_handler.rb

require_relative 'auth.rb'
require_relative 'logger.rb'
require_relative 'response_formatter.rb'

class RestApiHandler
  include Auth
  include Logger 
  include ResponseFormatter

  def get_user_profile(user)
    if authenticate(user)       # Auth
      log_request("/profile")   # Logger
      json_response({           # ResponseFormatter
        name: current_user,
        role: "developer"
      })
    else 
      {
        status: "Error",
        message: "Unauthorized"
      }.to_json
    end
  end
end
```

**Note:** There is no `initialize` method because the class does not need any setup when a new instance is created. Any state, like `@current_user`, is handled internally by the modules themselves.

Create a new instance and call the methods:

```ruby
api_1 = RestApiHandler.new 

# Valid user
user = {
  name: "Alice",
  token: "valid_token"
}
puts api_1.get_user_profile(user)

# Invalid user
unauthorized_user = {
  name: "Bob",
  token: "invalid"
}
puts api_1.get_user_profile(unauthorized_user)
```

Output:

```
[LOG] User Alice accessed /profile
{"status":"success","data":{"name":"Alice","role":"developer"}}
{"status":"Error","message":"Unauthorized"}
```

