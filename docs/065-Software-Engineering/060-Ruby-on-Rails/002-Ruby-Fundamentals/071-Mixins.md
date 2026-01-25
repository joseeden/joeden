---
title: "Mixins"
description: "Mixins"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 71
last_update:
  date: 8/24/2023
---


## Overview 

Mixins and modules work together to share behavior between classes without using inheritance. 

- A **module** groups related methods
- A **mixin** adds those methods into a class

Some behaviors are useful across many objects, even when those objects are not related.

- Different objects can share the same behavior
- Inheritance is not always a good fit
- Behavior can be added without changing class relationships

:::info 

Mixins are ideal when different classes need the same feature but do not belong to the same hierarchy. 

:::

Modules used as mixins often end in `able` to indicate added behavior. For example:

- `Enumerable` adds collection methods
- `Comparable` adds comparison methods
- `Monitorable` can add monitoring features
- `Serializable` adds ability to convert objects to a storable format.

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




## Mixins: `Comparable` Module

The `Comparable` module allows objects to be compared easily. By including it in a class and defining the `<=>` (spaceship) operator, we get methods like `<`, `<=`, `>`, `>=`, `==`, and `between?`.

The `<=>` method returns:

- `-1` if the current object is less than the other
- `0` if both are equal
- `1` if the current object is greater


Here’s an example of using `Comparable` to compare books based on their number of pages:

```ruby
class Book
  include Comparable

  attr_reader :title, :pages

  def initialize(title:, pages:)
    @title = title
    @pages = pages
  end

  def <=>(other)
    self.pages <=> other.pages
  end
end
```

We can create some book instances and compare them easily:

```ruby 
book1 = Book.new(title: "Short Story", pages: 100)
book2 = Book.new(title: "Novel", pages: 300)
book3 = Book.new(title: "Epic", pages: 500)

puts book1 < book2       
puts book3 > book2       
puts book3.between?(book1, book2)  
```

Output:

```bash
true
true
false
```

## Example: Comparing Medals

In this example, we rank the sports medals in tournaments: bronze, gold, and silver. By including `Comparable` and defining `<=>`, we can compare the medals easily.

```ruby
class GamesMedal
  include Comparable 
  attr_reader :type 

  def initialize(type:)
    @type = type 
  end 

  def <=>(other)
    medal_values = {
      gold: 3,
      silver: 2,
      bronze: 1 
    }
    medal_values[self.type] <=> medal_values[other.type]
  end
end
```

Here we create some medal instances:

```ruby
medal_gold = GamesMedal.new(type: :gold)
medal_silver = GamesMedal.new(type: :silver)
medal_bronze = GamesMedal.new(type: :bronze)
```

**Note:** When creating the instances, we pass a **symbol** as a keyword argument.

- The `type:` is a keyword argument expected by `initialize`
- The values `:gold`, `:silver`, and `:bronze` are symbols

Symbols are identifiers used to represent fixed values. In this example, the symbol stored in `@type` is used as a key to look up the associated numeric value in the `medal_values` hash inside the `<=>` method. 

:::info 

For more information on Symbools, please [Symbols as Hash Keys and Hash Values.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/032-Hashes.md#symbols-as-hash-values)

:::


Now we can compare them using all the `Comparable` methods:

```ruby
puts medal_silver < medal_gold        
puts medal_bronze > medal_gold      
puts medal_gold.between?(medal_silver, medal_bronze)  
```

Output:s

```bash
true
false
false 
```

**What happens under the hood:** Because `Comparable` is included, Ruby rewrites the first two `puts` lines to use the `<=>` method:

```ruby
puts medal_silver.<=>(medal_gold) < 0
puts medal_bronze.<=>(medal_gold) < 0
```

This calls the `<=>` method, performs the symbol lookup to get the corresponding numeric values, and then compares those numbers:

```bash
2 <=> 3
1 <=> 3
```

For the third comparison, `between?` is rewritten internally as:

```ruby
puts medal_gold >= medal_silver && medal_gold <= medal_bronze
```

This results in the following checks:

1. First check: 

    ```ruby
    medal_gold >= medal_silver
    3 <=> 2  # Returns 1
    true
    ```

2. Second check: 

    ```ruby
    medal_gold <= medal_bronze
    3 <=> 1  # Returns 1
    false
    ```

3. Because both conditions must be true:

    ```ruby
    medal_gold <= medal_bronze
    true && false
    ```

    Output:

    ```bash
    false
    ```

All comparisons ultimately rely on `<=>`, where symbol values are mapped to numbers and compared, and the results are then used by `Comparable` to implement `<`, `>`, and `between?`.




## Method Lookup and `ancestors`

When a module is mixed into a class, Ruby searches for methods in a set order:

1. First in the class itself
2. Then in any included modules
3. Finally up the superclass chain

This determines which method will run if the same method exists in multiple places.

Updating the the `Orderable` module from the previous section:

1. The `Cafe` class overrides the `order` method from the module, so its own version is used. 
2. `FoodTruck` and `JuiceStand` don’t define their own method, so they use the one from `Orderable`.

```ruby
module Orderable
  def order(item)
    "You ordered #{item}"
  end
end

class Cafe
  include Orderable

  def order(item)
    "You got a #{item} at the cafe"
  end
end

class FoodTruck
  include Orderable
end

class JuiceStand < FoodTruck
end

cafe_1 = Cafe.new
food_truck_1 = FoodTruck.new
juice_stand_1= JuiceStand.new

puts cafe_1.order("Latte")
puts food_truck_1.order("Sandwich")
puts juice_stand_1.order("Smoothie")
```

Output:

```text
You got a Latte at the cafe
You ordered Sandwich
You ordered Smoothie
```

We can use the `ancestors` method to check the inheritance and mixin hierarchy:

```ruby
p Cafe.ancestors
p FoodTruck.ancestors
p JuiceStand.ancestors
```

Output:

```text
[Cafe, Orderable, Object, Kernel, BasicObject]
[FoodTruck, Orderable, Object, Kernel, BasicObject]
[JuiceStand, FoodTruck, Orderable, Object, Kernel, BasicObject]
```

The `ancestors` array shows the order Ruby searches for methods: first the class, then any modules included in the class or its superclasses, and finally the built-in superclasses. This explains why the `order` method in `Cafe` was used instead of the module’s.

:::info 

For more information on `ancestors`, please see [Inheritance.](/docs/065-Software-Engineering/060-Ruby-on-Rails/002-Ruby-Fundamentals/064-Classes-Inheritance.md#superclass-and-ancestors)

::: 

You can also check if an object includes a module or inherits from a class with `is_a?`:

```ruby
puts cafe_1.is_a?(Cafe)       # Output: true
puts cafe_1.is_a?(Orderable)  # Output: true
puts cafe_1.is_a?(Object)     # Output: true
```

Mixins appear in the ancestor chain and Ruby can find their methods just like it does for superclasses.



## Using `prepend` and `extend`

There are different ways to mix a module’s methods into a class:

- `prepend` makes the module’s methods run before the class’s methods
- `extend` adds module methods as class-level methods

### Using `prepend` 

In the `Orderable` example below, we are using `prepend` to override instance methods in the `Cafe` class:

```ruby
module Orderable
  def order(item)
    "You ordered #{item}"
  end
end

class Cafe
  prepend Orderable

  def order(item)
    "You got a #{item} at the cafe"
  end
end

cafe = Cafe.new
puts cafe.order("Latte")
```

Output:

```text
You ordered Latte
```

Here, `Orderable` comes before `Cafe` in the method lookup chain, so its `order` method is called instead of the one defined in `Cafe`. You can check the lookup order with `ancestors`:

```ruby
p Cafe.ancestors
```

Output:

```text
[Orderable, Cafe, Object, Kernel, BasicObject]
```

If we comment out the `prepend` line:

```ruby
class Cafe
  # prepend Orderable
  ....
```

And check the method lookup again, Ruby now prioritizes the class’s own methods first. That’s why `Orderable` no longer appears in the ancestors array:

```ruby
p Cafe.ancestors
```

Output:

```text
[Cafe, Object, Kernel, BasicObject]
```

### Using `extend` 

With `extend`, module methods are added as class methods, not instance methods. This means you call these methods on the class, not on objects created from that class.

In the example below, we are calling the `track` method on the `Cafe` and `FoodTruck` classes, not on the `cafe_1` instance.

```ruby
module Trackable
  def track
    "Tracking activity for #{self}"
  end
end

class Cafe
  extend Trackable
end

class FoodTruck
  extend Trackable
end

cafe_1 = Cafe.new 

# Calls `track` on the classes
puts Cafe.track
puts FoodTruck.track
```

Output:

```text
Tracking activity for Cafe
Tracking activity for FoodTruck
```

If we try to call the `track` method on the instance, it will return an error because `track` is not an instance method. It doesn’t exist on objects (like `cafe_1`) created from `Cafe`.

```ruby
puts cafe_1.track
```

Output:

```bash
undefined local variable or method 'cafe_1' for main (NameError) 
```

:::tip[When to use `extend`]

Use `extend` when you want a module’s methods to be called on the class itself. For example, to give different classes a shared way to report their configuration without creating an instance.

:::


## Method conflicts when mixing modules

You can mix multiple modules into the same class, but if they define methods with the same name, Ruby will use the method from the last module included. The order of `include` determines which method is called.

In this example, both the `Breakfast` and `Lunch` modules define a `serve` method. When both are included in the `Cafe` class, the `Lunch` module is added last, so its method takes priority.

```ruby
module Breakfast
  def serve(item)
    "Serving #{item} for breakfast"
  end

  def drink
    "Serving coffee"
  end
end

module Lunch
  def serve(item)
    "Serving #{item} for lunch"
  end
end

class Cafe
  include Breakfast
  include Lunch
end

cafe = Cafe.new
puts cafe.serve("Pancakes")  
```

Output:

```bash
Serving Pancakes for lunch
```

If we reverse the inclusion order in the `Cafe` class, the `Breakfast` module is included last, so its `serve` method wins:

```bash
class Cafe
  include Lunch
  include Breakfast
end

cafe = Cafe.new
puts cafe.serve("Pancakes") 
```

Output:

```bash
Serving Pancakes for breakfast
```

Methods that don’t conflict are still available, but for conflicting methods, Ruby prioritizes the last included module. 


## Example: Multiple Mixins

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

The next step is to create a class that brings together all three modules. We first load each module using `require_relative` with the file names, and then include them inside the class with the `include` keyword:

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


