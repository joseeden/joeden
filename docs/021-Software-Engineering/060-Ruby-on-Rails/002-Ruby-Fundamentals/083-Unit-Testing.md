---
title: "Unit Testing"
description: "Unit Testing"
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

First, require the Minitest module to get access to the testing classes:

```ruby
require "minitest/autorun"
```

This loads Minitest and gives you the `Minitest::Test` class. Your test classes will inherit from this class to use its assertion methods.


## Creating a Test Class

Define a test class for the code you want to check. For example, if we have a method that adds two numbers, we can create a test class like this:

```ruby
class TestMath < Minitest::Test
end
```

This class now has all the methods we need to write tests. Each test method inside it will check a specific part of the program.


## Writing a Test Method

Test methods should start with `test_`. For example, if we want to test a `sum` method:

```ruby
def sum(a, b)
  a + b
end

class TestMath < Minitest::Test
  def test_sum
    assert_equal 5, sum(2, 3)
  end
end
```

`assert_equal` checks that the first value matches the second. If it does, the test passes. If not, it fails.


## Running the Tests

Run the file in the terminal:

```bash
ruby test_math.rb
```

Each dot in the output is a passing test. If a test fails, Minitest shows an `F` and tells you which assertion failed and why.



