---
title: "Code Review and Testing"
description: "Software Development Maturity Models"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 6
last_update:
  date: 3/14/2022
---



## Code Reviews

Code reviews are essential in the software development process, allowing developers to assess code quality, share knowledge, and improve overall code standards. They promote collaboration and ensure that code changes align with best practices.

- Developers review code changes and provide feedback.
- Multiple reviewers enhance the review quality.
- Reviewers should understand the code’s purpose.

In general, the goal of code reviews is to make sure that the final code:

- Is easy to read
- Is easy to understand
- Follows coding best practices
- Uses correct formatting
- Is free of bugs
- Has proper comments and documentation
- Is clean

Code reviews offer numerous advantages for the development team, enhancing collaboration and code quality.

- Authors receive valuable feedback and learn best practices.
- Knowledge transfer helps all developers understand the code better.
- Reviews refine code and identify potential bugs.


## Types of Code Reviews

<div class='img-center'>

![](/img/docs/devnet-codereview.png)

</div>

### Formal Code Review

Formal code reviews involve meetings where developers review the entire codebase line by line. 

- Promotes thorough discussion among reviewers.  
- Results in better feedback and consensus.  
- Often documented for future reference.  

### Change-Based Code Review

Change-based reviews focus on specific code changes from bugs, features, or commits.  

- Utilizes peer code review tools to highlight changes.  
- Initiated by developers responsible for the code.  
- Allows for independent feedback from multiple reviewers.  

### Over-the-Shoulder Code Review

In over-the-shoulder reviews, a reviewer observes the developer’s code changes directly.  

- Facilitates immediate feedback and discussion.  
- Allows for real-time code modifications.  
- Typically involves only one reviewer, limiting perspectives.  

### Email Pass-Around

Email pass-around reviews happen when developers receive automatic notifications of code changes.  

- Developers review changes based on email updates.  
- Lacks context, making it harder to understand changes fully.  


## Testing

Coders test software to ensure it functions as intended, but this involves several layers of complexity.

### Types of Software Testing

Software testing is broadly categorized into two main types:

- **Functional Testing**  
  - Determines if the software behaves correctly.  
  - Ranges from detailed Unit Testing to broader Integration Testing.  

- **Non-Functional Testing**  
  - Examines aspects like usability, performance, security, and compliance.  
  - Ensures the software is fit for purpose and minimizes risk.  

### Testing Throughout Development

Testing is not confined to specific phases of development:

- Functional testing can occur early in the development cycle.  
- Non-functional testing may need to happen before the design is finalized.  

In Agile development, software exists early in the process, allowing for both types of testing from the start. 


## Unit Testing

Unit Testing focuses on detailed functional testing of small code segments (like lines, functions, or classes) in isolation. Modern developers often automate this testing using unit test frameworks, which allow assertions about testable conditions during execution. 

For example:

```python
a = 2 + 2
assert a == 4
```

Here, the assertion will return true because 2 + 2 equals 4. Conversely:

```python
assert a == 5
```

This will return false and trigger an error.

### Testing Frameworks

Testing frameworks simplify the process of collecting assertions and generating test reports. Some popular frameworks for Python include:

- **unittest**  
  - Default framework in Python.  
  - Allows test collections as methods extending a `TestCase` class.  

- **PyTest**  
  - Easily installable via pip (`pip3 install pytest`).  
  - Runs `unittest` tests without modification.
  - Supports simpler test functions rather than class methods.  
  - Used in specialized test suites like Cisco's PyATS.  


### Simple Unit Testing with PyTest

PyTest simplifies unit testing by automatically executing scripts that start with `test_` or end with `_test.py`, along with any functions within those scripts that begin with `test_`. To unit test a function, you can copy it into a file, import PyTest, add appropriately-named test functions, and run it with PyTest.

#### Example Function to Test

Let's say we want to test the function `add5()`, which adds 5 to a given value:

```python
def add5(v):
    myval = v + 5
    return myval
```

#### Testing with PyTest

You can save the function in a file called `tests_mytest.py`, import PyTest, and write a test function called `tests_add5()`:

```python
# tests_mytest.py
import pytest

def add5(v):
    return v + 5

def tests_add5():
    assert add5(1) == 6
    assert add5(5) == 10
    assert add5(10.102645) == 15.102645
```

#### Running the Tests

Execute the tests using:

```bash
pytest tests_mytest.py
```

You'll receive a result like this:

```plaintext
============================= test session starts ==============================
rootdir: /home/tana/python/mytest
collected 1 item                                                               
tests_mytest.py .                                                        [100%]
============================== 1 passed in 0.01s ===============================
```

#### Importance of Unit Testing

Even trivial functions can have significant impacts, especially when called by higher-level functions. If a lower-level function returns an incorrect result, it can cause errors in higher-level outputs. This makes detailed unit testing essential for reliable software development. 

**Best Practices:**

- Add unit tests whenever you make significant code changes.
- Run tests after every change to catch errors early.
- Consider writing a deliberately-broken unit test at the end of a work session to remind you of where you left off.



### Simple Unit Testing with unittest

The `unittest` framework requires a different syntax compared to PyTest. To use `unittest`, you subclass the built-in `TestCase` class and define test methods that start with `test_`. 

#### Example Function to Test

Let’s say we want to test the function `add5()`, which adds 5 to a given value:

```python
def add5(v):
    return v + 5
```

#### Testing with unittest

You can create a test class called `tests_add5` that subclasses `unittest.TestCase`:

```python
### tests_mytest.py

import unittest

def add5(v):
    return v + 5

class tests_add5(unittest.TestCase):
    def test_add5(self):
        self.assertEqual(add5(1), 6)
        self.assertEqual(add5(5), 10)
        self.assertEqual(add5(10.102645), 15.102645)

if __name__ == '__main__':
    unittest.main()
```

#### Running the Tests

1. Save the file as `tests_mytest.py`.
2. Ensure the file is executable (e.g., using `chmod +x tests_mytest.py` on Linux).
3. Run it with the `-v` option for a verbose report:

```bash
python3 tests_mytest.py -v
```

You should see an output like this:

```plaintext
test_add5 (__main__.tests_add5) ... ok
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

#### Key Points

- **Subclassing**: By subclassing `TestCase`, your test class inherits all its methods.
- **Assertions**: Use `assertEqual` to compare expected and actual values.
- **Command-line Execution**: The `unittest.main()` function allows you to run tests from the command line.


## Integration Testing

Integration testing ensures that individual units work together correctly as a whole system. For example, you might need to check how an application interacts with a web service to retrieve configuration data. This can be tested with a simple script in PyTest.

#### Example: Testing Web Service Integration

Here's an example using PyTest to verify this integration:

```python
import requests  # module for web requests

def get_config():
    return requests.get("http://localhost/get_config").content

def set_config(dbhost):
    requests.get(f"http://localhost/config_action?dbhost={dbhost}")

save_dbhost = ""

def setUp():
    global save_dbhost
    save_dbhost = get_config()

def tearDown():
    global save_dbhost
    set_config(save_dbhost)

def test_setconfig():
    setUp()
    set_config("TESTVAL")
    assert get_config() == "TESTVAL"
    tearDown()
```

This test checks if the system interacts with the web service correctly by getting and setting configuration data.

- **setUp/tearDown**: These functions run before and after the test, resetting the environment.
- **Assertions**: Check if the system's response is as expected.

#### Running the Test

Executing this with PyTest gives detailed feedback, such as whether the `assert` passes or fails. Example output for a failed test:


```bash
============================== test session starts ===============================
platform linux2 -- Python 2.7.15+, pytest-3.3.2, py-1.5.2, pluggy-0.6.0
rootdir: /home/ubuntu/deploysample, inifile:
collected 1 item                                                                 
test_sample_app.py F                                                       [100%]
==================================== FAILURES ====================================
    def test_setconfig():
        setUp()
        set_config("TESTVAL")
>       assert get_config() == "ESTVAL"
E       AssertionError: assert 'TESTVAL' == 'ESTVAL'
E         - TESTVAL
E         ? -
E         + ESTVAL
test_sample_app.py:21: AssertionError
------------------------------- Captured log call --------------------------------
connectionpool.py          225 DEBUG    Starting new HTTP connection (1): localhost:80
connectionpool.py          437 DEBUG    http://localhost:80 "GET /get_config HTTP/1.1" 200 7
connectionpool.py          225 DEBUG    Starting new HTTP connection (1): localhost:80
connectionpool.py          437 DEBUG    http://localhost:80 "GET /config_action?dbhost=TESTVAL HTTP/1.1" 200 30
_________________________________ test_setconfig __________
_______________________
connectionpool.py          225 DEBUG    Starting new HTTP connection (1): localhost:80
connectionpool.py          437 DEBUG    http://localhost:80 "GET /get_config HTTP/1.1" 200 7
============================ 1 failed in 0.09 seconds ============================
```


Once fixed, the output shows success:

```bash
============================== test session starts ===============================
platform linux2 -- Python 2.7.15+, pytest-3.3.2, py-1.5.2, pluggy-0.6.0
rootdir: /home/ubuntu/deploysample, inifile:
collected 1 item                                                                 
test_sample_app.py .                                                       [100%]
============================ 1 passed in 0.07 seconds ============================
```

Run your integration tests at the start of the day, after significant changes, and before wrapping up. In Continuous Integration, fix any errors immediately.

**Note:** You can run this script on your VM using pytest, but error handling is outside the course scope.


## Test-Driven Development (TDD)

Test-driven development (TDD) is a process where you write tests before writing the actual application code. This method helps ensure that your code meets requirements and catches bugs early, improving development efficiency and quality.

The TDD cycle involves five key steps:

1. **Write a new test:**  
    - Capture a specific requirement.  
    - Add the test to the existing suite.

2. **Run tests:**  
    - Check for any unexpected failures.  
    - Accept expected failures for incomplete functions.

3. **Write application code:**  
    - Code only to pass the new test.  
    - Avoid adding unnecessary functionality.
4. **Run tests again:**  
    - Correct any failures in the application code.  
    - Re-run tests to confirm fixes.

5. **Refactor code:**  
    - Clean up and optimize the code.  
    - Ensure all tests still pass after refactoring.

By adopting this approach, the test harness develops in tandem with the application, frequently at a line-by-line level. This leads to extensive test coverage and greater assurance of accuracy for both the tests and the application. 

- Focuses on requirements and their representation in tests.
- Clarifies code purpose, streamlining development.
- Requires highly testable code, pure functions tested independently.