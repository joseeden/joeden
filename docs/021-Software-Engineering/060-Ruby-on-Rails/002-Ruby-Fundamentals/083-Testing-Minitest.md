---
title: "Testing: Minitest"
description: "Testing: Minitest"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- Ruby
sidebar_position: 83
last_update:
  date: 8/24/2023
---



## Overview

Unit testing is a way to check that your code works as expected.

- Manual testing is slow and error-prone in large projects
- Tests can run automatically and catch mistakes early
- Ruby has a built-in testing library called **Minitest**.

The idea of testing is to catch problems early and make sure your code keeps working as it grows.

## Setting up a Test 

1. Require the Minitest module to get access to the testing classes:

    ```ruby
    require "minitest/autorun"
    ```

    This loads Minitest and gives you the `Minitest::Test` class. Your test classes will inherit from this class to use its assertion methods.


2. Create a test class for the code you want to check. 

    For example, if we have a method that adds two numbers, we can create a test class like this:

    ```ruby
    class TestMath < Minitest::Test
    end
    ```

    This class now has all the methods we need to write tests. Each test method inside it will check a specific part of the program.


3. To write the test methods, prefix them with `test_`. 

    For example, if you want to test a `sum` method, define a `test_sum` method inside the `TestMath` class.

    ```ruby
    def sum(a, b)
      a + b
    end

    class TestMath < Minitest::Test
      def test_sum
        assert_equal 7, sum(5, 2)
      end
    end
    ```

    The `assert_equal` checks that the first value matches the second. If it does, the test passes. If not, it fails.

4. Run the file in the terminal:

    ```bash
    ruby test_math.rb
    ```

    Each dot in the output is a passing test. If a test fails, Minitest shows an `F` and tells you which assertion failed and why.

    Output:

    ```bash
    Run options: --seed 40405

    # Running:

    .

    Finished in 0.021313s, 46.9201 runs/s, 46.9201 assertions/s.

    1 runs, 1 assertions, 0 failures, 0 errors, 0 skips
    ```

    In the output below, we see a single dot (`.`) after "#Running". The dot represents a passing test. If there are more tests, there will also be more dots in the output.

5. We can try to add another test called `test_sum_2` and re-run it. 

    ```ruby
    require "minitest/autorun"

    def sum(a, b)
      a + b 
    end

    class TestMath < Minitest::Test 
      def test_sum
        assert_equal 7, sum(5, 2)
      end

      def test_sum_2
        assert_equal 9, sum(3, 6)
      end
    end 
    ```

    Output:

    ```bash
    # Running:

    ..

    Finished in 0.018132s, 110.3008 runs/s, 110.3008 assertions/s.

    2 runs, 2 assertions, 0 failures, 0 errors, 0 skip
    ```

    We can now see two dots (`..`) in the output, representing the two tests that have passed.

6. Add a third test called `test_sum_3`. In this test, we intentionally use incorrect expected values to force a failure.

    ```ruby
    require "minitest/autorun"

    def sum(a, b)
      a + b 
    end

    class TestMath < Minitest::Test 
      def test_sum
        assert_equal 7, sum(5, 2)
      end

      def test_sum_2
        assert_equal 9, sum(3, 6)
      end

      def test_sum_3
        assert_equal 11, sum(3, 6)
      end
    end 
    ```

    Output:

    ```bash
    # Running:

    F..

    Finished in 0.018335s, 163.6213 runs/s, 163.6213 assertions/s.

      1) Failure:
    TestMath#test_sum_3 [docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/minitest.rb:17]:
    Expected: 11
      Actual: 9

    3 runs, 3 assertions, 1 failures, 0 errors, 0 skips
    ```

    When we run the tests, the output shows `F..`, which means one test failed and two passed. Ruby also prints the failure details, clearly showing which test failed, what value was expected, and the actual value returned by the method.


6. Finally, we add two more tests that are also expected to fail: `test_sum_4` and `test_sum_3`.

    ```ruby
    require "minitest/autorun"

    def sum(a, b)
      a + b 
    end

    class TestMath < Minitest::Test 
      def test_sum
        assert_equal 7, sum(5, 2)
      end

      def test_sum_2
        assert_equal 9, sum(3, 6)
      end

      def test_sum_3
        assert_equal 11, sum(3, 6)
      end

      def test_sum_4
        assert_equal 11, sum(1, 0)
      end

      def test_sum_5
        assert_equal 11, sum(-1, nil)
      end
    end 
    ```

    Output:

    ```bash
    # Running:

    .FFE.

    Finished in 0.016531s, 302.4680 runs/s, 241.9744 assertions/s.

      1) Failure:
    TestMath#test_sum_4 [docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/minitest.rb:21]:
    Expected: 11
      Actual: 1

      2) Failure:
    TestMath#test_sum_3 [docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/minitest.rb:17]:
    Expected: 11
      Actual: 9

      3) Error:
    TestMath#test_sum_5:
    TypeError: nil can't be coerced into Integer
        docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/minitest.rb:4:in 'Integer#+'
        docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/minitest.rb:4:in 'Object#sum'
        docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/minitest.rb:25:in 'TestMath#test_sum_5'

    5 runs, 4 assertions, 2 failures, 1 errors, 0 skips
    ```

    Here, the output shows `.FFE.`, which means some tests passed, some failed, and one raised an error. The failure messages show incorrect expected values, while the error shows that passing `nil` causes a `TypeError`. 
    
    This helps us clearly see the difference between a test failure (wrong result) and a test error (invalid input that crashes the code).

## Testing a Class

We can also write and run tests for a Ruby class using Minitest. 

1. To start with, we'll use a `Book` which stores two pieces of state and exposes them using getter methods.

    ```ruby
    ## book.rb
    class Book
      attr_reader :title, :author

      def initialize(title, author)
        @title = title
        @author = author
      end
    end
    ```

2. Next, we load Minitest and create a test class. Every test class must inherit from `Minitest::Test`.

    ```ruby
    ## book.rb
    require "minitest/autorun"

    class Book
      attr_reader :title, :author

      def initialize(title, author)
        @title = title
        @author = author
      end
    end

    class TestBook < Minitest::Test
    end
    ```

3. For the test, we'll instantiate a new `Book` object called `book_1` and compare the expected title with the value returned by the getter. This confirms that the initializer assigned the value correctly.

    ```ruby
    ## book.rb
    require "minitest/autorun"

    class Book
      ...
    end

    class TestBook < Minitest::Test
      def test_title
        book_1 = Book.new("The War of the Worlds", "H.G. Wells")
        assert_equal("The War of the Worlds", book_1.title)
      end
    end
    ```

4. Tests should also be independent, so we'll add a second test called `test_author`. In this test, we'll create a new object `book_1` instead of reusing the previous one.

    ```ruby
    class TestBook < Minitest::Test
      def test_title
        book_1 = Book.new("The War of the Worlds", "H.G. Wells")
        assert_equal("The War of the Worlds", book_1.title)
      end

      def test_author 
        book_1 = Book.new("The War of the Worlds", "H.G. Wells")
        assert_equal("H.G. Wells", book_1.author)
      end
    end
    ```

    Even though both tests use the same variable name, `book_1` only exists inside the method where it is defined. Once `test_title` finishes, its `book_1` is gone. When `test_author` runs, it creates an  entirely different object from scratch.

    This isolation ensures that tests do not affect each other and keeps the test suite reliable.

5. Run the script:

    ```bash
    ruby book_test.rb
    ```

    Output:

    ```bash
    # Running:

    ..

    Finished in 0.016886s, 118.4441 runs/s, 118.4441 assertions/s.

    2 runs, 2 assertions, 0 failures, 0 errors, 0 skips
    ```

    Two dots mean both tests passed. This confirms that the class behaves as expected.

6. We can add a failing test called `test_title_2` inside the `TestBook` class to ensure that tests *can fail* as well.

    ```ruby
    class TestBook < Minitest::Test 
      def test_title
        ...
      end

      def test_author 
        ...
      end

      def test_title_2
        book = Book.new("The War of the Worlds", "Some Author")
        assert_equal "The War of the World", book.title
      end
    end
    ```

    Output:

    ```bash
    # Running:

    .F.

    Finished in 0.018197s, 164.8635 runs/s, 164.8635 assertions/s.

      1) Failure:
    TestBook#test_title_2 [docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/book.rb:24]:
    Expected: "The War of the World"
      Actual: "The War of the Worlds"

    3 runs, 3 assertions, 1 failures, 0 errors, 0 skips 
    ```

    Running the tests now shows one failure. This proves that the test suite is active and checking real behavior. 

## Setup and Teardown 

Sometimes tests need shared code that runs before or after each test.

- `setup` runs before every test
- `teardown` runs after every test
- Both are optional but must use exact names

These methods help reduce repeated code while keeping tests isolated.

### Using `setup` 

`setup` is a special method that runs before each test method. It is used to prepare common objects that tests need.

Updating the example from previous section, we move the object creation into `setup` instead of repeating it in every test. `setup` runs before each test, so a new `Book` object is still created every time and the tests remain independent.

```ruby
def setup 
  @book_1 = Book.new("The War of the Worlds", "H.G. Wells")
end
```

**Note:** If we used a local variable like `book_1` inside `setup`, it would disappear as soon as `setup` finishes. To make the object available to the test methods, we must store it in an instance variable like `@book_1`.

Full code: 

```ruby
# book.rb
require "minitest/autorun"

class Book
  attr_reader :title, :author 
  def initialize(title, author)
    @title = title 
    @author = author 
  end
end

class TestBook < Minitest::Test 
  def setup 
    @book_1 = Book.new("The War of the Worlds", "H.G. Wells")
  end

  def test_title
    assert_equal("The War of the Worlds", @book_1.title)
  end

  def test_author 
    assert_equal("H.G. Wells", @book_1.author)
  end
end
```

Run the script:

```bash
ruby book.rb  
```

Output:

```bash
# Running:

..

Finished in 0.020205s, 98.9868 runs/s, 98.9868 assertions/s.

2 runs, 2 assertions, 0 failures, 0 errors, 0 skips
```

Each test gets its own fresh `@book_1` because `setup` runs again before the next test. This keeps tests isolated while removing duplication.

### Using `teardown` 

`teardown` is another special method that runs after each test. It is usually used for cleanup.

```ruby
def teardown
  puts "Cleaning up test data"
end
```

If you had created files, database records, or connections during a test, `teardown` is where you remove them. Like `setup`, it runs once per test.

Full code:

```bash
# book.rb
require "minitest/autorun"

class Book
  attr_reader :title, :author 
  def initialize(title, author)
    @title = title 
    @author = author 
  end
end

class TestBook < Minitest::Test 
  def setup 
    @book_1 = Book.new("The War of the Worlds", "H.G. Wells")
  end

  def teardown
    puts "Cleaning up test data"
  end

  def test_title
    assert_equal("The War of the Worlds", @book_1.title)
  end

  def test_author 
    assert_equal("H.G. Wells", @book_1.author)
  end
end
```


Output:

```bash
# Running:

Cleaning up test data
.Cleaning up test data
.

Finished in 0.020512s, 97.5047 runs/s, 97.5047 assertions/s.

2 runs, 2 assertions, 0 failures, 0 errors, 0 skips
```

**Weird format:** Minitest prints dots without adding a newline, while puts does add a newline. When they mix together, the output looks odd, as seen here:

```bash
Cleaning up test data
.Cleaning up test data
.
```


### When to use setup and teardown

`setup` and `teardown` are helpful when many tests share the same preparation or cleanup logic. However, too much logic in `setup` can make tests harder to read because important details are hidden away.

Sometimes repeating a few lines inside each test is clearer. The goal is not just less code, but readable and reliable tests that clearly show what is being tested.

## Using `assert_includes`

You can verify if a value exists within another without checking the whole object. This focuses on presence rather than exact matches, which makes tests easier to read and maintain.

Consider the simple `Book` class below. Each book starts with an empty list of tags, and we can add tags later.

```ruby
# book2.rb
class Book
  attr_reader :title, :tags
  def initialize(title)
    @title = title
    @tags = []
  end

  def add_tag(tag)
    @tags << tag
  end
end
```

We can write a test called `test_adds_tag_to_book` that adds multiple tags to a book and then checks if a specific tag is in the book’s tag list using `assert_includes`."

```ruby
# book2.rb
require "minitest/autorun"

class Book
  ....
end

class TestBook < Minitest::Test
  def setup
    @book = Book.new("The Moon is a Harsh Mistress")
  end

  def test_adds_tag_to_book
    @book.add_tag("Science Fiction")
    @book.add_tag("Adventure")
    @book.add_tag("Classic")
    @book.add_tag("Political")
    assert_includes(@book.tags, "Science Fiction")
  end
end
```

Run the script:

```bash
ruby book2.rb 
```

Output: 

```
# Running:

.

Finished in 0.020485s, 48.8166 runs/s, 97.6332 assertions/s.

1 runs, 2 assertions, 0 failures, 0 errors, 0 skips
```

This confirms that the tag exists somewhere in the collection, which is exactly what we want to validate.

If you check for a tag that wasn’t added, the test fails and Minitest shows what’s actually in the collection. For example, checking for the tag "Historical":

```ruby
# book2.rb
require "minitest/autorun"

class Book
  ....
end

class TestBook < Minitest::Test
  def setup
    @book = Book.new("The Moon is a Harsh Mistress")
  end

  def test_adds_tag_to_book
    @book.add_tag("Science Fiction")
    @book.add_tag("Adventure")
    @book.add_tag("Classic")
    @book.add_tag("Political")
    assert_includes(@book.tags, "Historical")
  end
end
```

Output: 

```
# Running:

F

Finished in 0.020506s, 48.7665 runs/s, 97.5329 assertions/s.

  1) Failure:
TestBook#test_adds_tag_to_book [docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/book2.rb:26]:
Expected ["Science Fiction", "Adventure", "Classic", "Political"] to include "Historical".        

1 runs, 2 assertions, 1 failures, 0 errors, 0 skips
```

The output shows exactly what tags exist, so you can quickly tell whether the test or the code needs fixing.



## Using `assert_raises` 

We can use `assert_raises` to check that our code raises an error when something goes wrong. This ensures we test both normal cases and invalid cases.

Consider the `Book` class below, where we only allow tags to be strings. If someone tries to add a non-string tag, we want to raise a custom error:

```ruby
class InvalidTagError < StandardError; end

class Book
  attr_reader :title, :tags
  def initialize(title)
    @title = title
    @tags = []
  end

  def add_tag(tag)
    raise InvalidTagError, "Tag must be a string" unless tag.is_a?(String)
    @tags << tag
  end
end
```

We can test this using `assert_raises` inside `test_add_invalid_tag` to make sure the error happens when an invalid tag is added.

**Note:** The `test_adds_tag_to_book` from the previous section is included but not used here, since it is expected to pass.


```ruby
require "minitest/autorun"

class InvalidTagError < StandardError
end

class Book
  ....
end

class TestBook < Minitest::Test
  def setup
    @book = Book.new("The Moon is a Harsh Mistress")
  end

  def test_adds_tag_to_book
    @book.add_tag("Science Fiction")
    @book.add_tag("Adventure")
    @book.add_tag("Classic")
    @book.add_tag("Political")
    assert_includes(@book.tags, "Science Fiction")
  end

  def test_add_invalid_tag
    assert_raises(InvalidTagError) do
      @book.add_tag(123)
    end
  end
end
```

Output:

```bash
..

Finished in 0.019351s, 103.3519 runs/s, 155.0279 assertions/s.

2 runs, 3 assertions, 0 failures, 0 errors, 0 skips
```

Here, all the tests passed. The `test_add_invalid_tag` passes because adding a non-string tag correctly triggers the expected `InvalidTagError` behind the scene.

The `InvalidTagError` error doesn’t appear in the output because `assert_raises` catches it. If the error did not occur, the test would fail.

In this case, a test “passes” when the expected error is raised. If the error occurs as expected, the test is considered successful.



## Custom Messages in Assertions

You can provide an optional final argument to any assertion. This argument is a string that will be displayed if the assertion fails. It gives extra context about what went wrong.

For example, with the `Book` class, we can check if the title is assigned correctly and provide a custom message like "The book title was not assigned correctly":

```ruby
require "minitest/autorun"

class Book
  attr_reader :title
  def initialize(title)
    @title = title
  end
end

class TestBook < Minitest::Test
  def setup
    @book = Book.new("The Moon is a Harsh Mistress")
  end

  def test_book_title
    # Custom message
    assert_equal("The Mistress is a Harsh Moon", @book.title, "The book title was not assigned correctly")
  end
end
```

If the test fails, Minitest prints both its usual failure output and our custom message:

```bash
# Running:

F

Finished in 0.020873s, 47.9088 runs/s, 47.9088 assertions/s.

  1) Failure:
TestBook#test_book_title [docs/021-Software-Engineering/060-Ruby-on-Rails/000-Projects/001-Practice-Sets/022-Practice-22/book4.rb:17]:
The book title was not assigned correctly.
Expected: "The Mistress is a Harsh Moon"
  Actual: "The Moon is a Harsh Mistress"

1 runs, 1 assertions, 1 failures, 0 errors, 0 skips
```

The same applies to other assertions like `assert_includes` or `assert_raises`. For example, in `test_add_invalid_tag`:

```ruby
require "minitest/autorun"

class Book
  ....
end

class TestBook < Minitest::Test
  def setup
    ....
  end

  def test_book_title
    ....
  end

  def test_add_invalid_tag
    assert_raises(InvalidTagError, "Adding a non-string tag should raise an error") do
    @book.add_tag(123)
  end
end
end
```

Here, if no `InvalidTagError` is raised, the test fails and the message helps explain why.

Custom messages are optional, but they make tests easier to understand, especially for someone reading failures later. Even when all tests pass, you know this feature is available for added clarity.

