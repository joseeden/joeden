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

    We can now see two dots in the output, representing the two tests that have passed.

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
