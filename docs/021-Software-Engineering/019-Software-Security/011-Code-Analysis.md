---
title: "Code Analysis"
description: "Static, Dynamic, and Test Coverage"
tags: [Computer Science, Application Development, Software Development, Application Security]
sidebar_position: 11
last_update:
  date: 1/30/2024
---



## Static Code Analysis

Static code analysis, also known as **Static Application Security Testing (SAST)**, involves examining the source code for vulnerabilities without executing the program, helping to identify security flaws early in the development process.

- Scans source code for potential security vulnerabilities.
- Detects issues like buffer overflows, injection flaws, and insecure data handling.
- Supports compliance with security standards and best practices.
- Usually performed using software analyzers, such as Sonarqube. Veracode, Semgrep.

## Dynamic Code Analysis

Dynamic code analysis, also known as **Dynamic Application Security Testing (DAST)**, tests the running application to identify vulnerabilities that may not be apparent in static analysis.

- Analyzes an application during execution to find runtime vulnerabilities.
- Identifies issues such as memory leaks, improper error handling, and authentication flaws.
- Provides insights into the application’s behavior under different conditions.

### Synthetic Transactions

Synthetic transactions are scripted sets of inputs and instructions that are given to code when the testers know what output the code should produce for each input. The testing software can cycle through these synthetic transactions to verify that the code is functioning properly.

### Fuzzing 

Fuzzing is a software testing technique used to identify vulnerabilities and bugs by inputting random or unexpected data into a program. The goal is to discover errors that could lead to crashes or security issues. 

- Tests the robustness of software by feeding it various types of inputs.
- Can identify vulnerabilities such as buffer overflows, crashes, and memory leaks.
- Often automated to systematically cover a wide range of input scenarios.

Fuzzing can use different input sources:
 
- **Developer-supplied input** - The developer can supply a long or short input value.
- **Developer-supplied script** - Tester can write a script that generate input values 
- **Generation Fuzzing** - Fuzz testing software can generate input values randomly
- **Mutation Fuzzing** - Tester can analyze real input and modify them

### Stress Testing

Stress testing evaluates how a system performs under extreme conditions to determine its stability and behavior under high loads. This testing helps identify the system's breaking points and ensures it can handle unexpected spikes in usage.

- Assesses system performance under maximum or peak load conditions.
- Helps identify bottlenecks and weaknesses in the system's capacity.
- Ensures the system can recover from high-load scenarios without crashing or losing data.


## Test Coverage Analysis

Test coverage analysis evaluates how much of the software’s code or functionality is tested by existing test cases. It helps identify areas of the software that may need additional testing to ensure comprehensive validation.

- Measures the extent to which the codebase is exercised by tests.
- Identifies untested parts of the application, revealing gaps in coverage.
- Helps improve the effectiveness of testing efforts by highlighting areas needing more focus.

**Test Coverage** is defined as the the percentage of software that was evaluated during a given test set. To compute the test coverage:

<div class='img-center'>

![](/img/docs/app-sec-computing-test-coverage-analysis.png)

</div>


As an example, if there are 10,000 possible test cases and your testing evaluated 9000 of them, you have 90% test coverage. There are many variables that you can plug in to the formula to evaluate test coverage: 

- Variables based on use cases 
- Based on functions in a piece of software
- A more detailed approach is to compute based on the lines of code
- Conditional branching ensures all conditionals was tested with all possible conditions
