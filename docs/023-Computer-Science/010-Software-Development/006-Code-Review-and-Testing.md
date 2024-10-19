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

The unittest framework demands a different syntax than PyTest. For unittest , you need to subclass the built-in TestCase class and test by overriding its built-in methods or adding new methods whose names begin with 'test_'. The examp

```python
import unittest
def add5(v):
    myval = v + 5
    return myval
class tests_add5(unittest.TestCase):
    def test_add5(self):
        self.assertEqual(add5(1),6)
        self.assertEqual(add5(5),10)
        self.assertEqual(add5(10.102645),15.102645)
if __name__ == '__main__':
    unittest.main()
```

As with PyTest, you import the unittest module to start. Your function follows.

To subclass the TestCase class, pass it to your own (derived) test class (again called tests_add5, though this is now a class, rather than a function), causing the latter to inherit all characteristics of the former. For more on Python object-oriented programming (OOP), see the documentation.

Next, use unittest's assertEqual method (this is one of a wide range of built-in test methods) in the same way that you used Python's native assert in the PyTest example. Basically, you are running your function with different arguments, and checking to see if returned values match expectations.

The last stanza is a standard way of enabling command-line execution of our program, by calling its main function; which, in this case, is defined by unittest.

Save this file (again as tests_mytest.py ), ensure that it is executable (for example, in Linux, using chmod +x tests_mytest.py ) and execute it, adding the -v argument to provide a verbose report:

```python
python3 tests_mytest.py -v
test_add5 (__main__.tests_add5) ... ok
----------------------------------------------------------------------
Ran 1 test in 0.000s
OK
```



## Integration Testing

After unit testing comes integration testing, which makes sure that all of those individual units you have been building fit together properly to make a complete application. For example, suppose an application that you are writing needs to consult a local web service to obtain configuration data, including the name of a relevant database host. You might want to test the values of variables set when these functions are called. If you were using PyTest, you could do that like this:
```python

import requests   # python module that simplifies making web requests
def get_config():
    return requests.get("http://localhost/get_config").content
def set_config(dbhost):
    requests.get("http://localhost/config_action?dbhost="+dbhost)
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
    assert get_config() == "ESTVAL"
    tearDown()
```

Note that your test_setconfig() method deliberately calls your setUp() function before running tests, and your tearDown() function afterward. In unittest, methods called setUp() and tearDown() are provided by the TestCase class, can be overridden in your defined subclass, and are executed automatically.

Running this code with PyTest might produce output like this:
```python
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

If you fix the broken test, you can see that everything runs perfectly:
```python
============================== test session starts ===============================
platform linux2 -- Python 2.7.15+, pytest-3.3.2, py-1.5.2, pluggy-0.6.0
rootdir: /home/ubuntu/deploysample, inifile:
collected 1 item                                                                 
test_sample_app.py .                                                       [100%]
============================ 1 passed in 0.07 seconds ============================
```

Again, you should run your integration tests before you make any changes for the day, whenever you make significant changes, and before you close out for the day. If you are using Continuous Integration, any errors you find must be corrected before you do anything else.

**Note:** You can run this script on your VM using pytest. However, understanding the output and fixing any errors is beyond the scope of this course.




## Test-Driven Development (TDD)

Building small, simple unit and integration tests around small bits of code helps in two ways:

* It ensures that units are fit for purpose. In other words, you make sure that units are doing what requirements dictate, within the context of your evolving solution.
* It catches bugs locally and fixes them early, saving trouble later on when testing or using higher-order parts of your solution that depend on these components.

The first of these activities is as important as the second, because it lets testing validate system design or, failing that, guide local refactoring, broader redesign, or renegotiation of requirements.

Testing to validate design intention in light of requirements implies that you should write testing code before you write application code . Having expressed requirements in your testing code, you can then write application code until it passes the tests you have created in the testing code.

This is the principle of Test-Driven Development (sometimes called Test-First Development). The basic pattern of TDD is a five-step, repeating process:

1. Create a new test (adding it to existing tests, if they already exist). The idea here is to capture some requirement of the unit of application code you want to produce.
2. Run tests to see if any fail for unexpected reasons. If this happens, correct the tests. Note that expected failures, here, are acceptable (for example, if your new test fails because the function it is designed to test does not yet exist, that is an acceptable failure at this point).
3. Write application code to pass the new test. The rule here is to add nothing more to the application besides what is required to pass the test.
4. Run tests to see if any fail. If they do, correct the application code and try again.
5. Refactor and improve application code. Each time you do, re-run the tests and correct application code if you encounter any failures.

By proceeding this way, the test harness leads and grows in lockstep with your application. This may be on a line-by-line basis, providing very high test coverage and high assurance that both the test harness and the application are correct at any given stopping-point. Co-evolving test and application code this way:

* Obliges developers to consistently think about requirements (and how to capture them in tests).
* Helps clarify and constrain what code needs to do (because it just has to pass tests), speeding development and encouraging simplicity and good use of design patterns.
* Mandates creation of highly-testable code. This is code that, for example, breaks operations down into pure functions that can be tested in isolation, in any order, etc.
