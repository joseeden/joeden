---
title: "Writing Tests and Securing Code"
description: "Using AI models to assist in writing tests and identifying security issues in code"
tags:
- Machine Learning
- Artificial Intelligence
- Prompt Engineering
sidebar_position: 13
last_update:
  date: 7/13/2023
--- 


## Overview

AI models can be guided to write stronger unit tests and also help identify security issues in code. A useful approach is to define expected behavior and edge cases first, instead of only asking for a function.

## Test-Driven Prompting

Test-driven prompting means you describe how the code should behave before asking the model to implement or test it. This helps the model focus on edge cases from the start.

Instead of only requesting a function, you define rules like valid input, invalid input, and expected errors.

Example prompt:

```plaintext 
Write a Python function to parse email addresses.

It should:
- Accept valid emails like "user@example.com"  
- Reject invalid formats like "user@@domain"  
- Raise ValueError if the input is empty  
```

This makes the expected behavior clear and reduces missing edge cases.

## Generating Unit Tests

We can also ask the model to generate unit tests for existing functions. Basic prompts work, but they often miss important edge cases.

Example prompt:

```plaintext 
Generate pytest unit tests for a function that processes form data and saves it to a database.
```

A better version adds more structure and specific test cases.

```plaintext 
Generate pytest unit tests for the following function.

Include test cases for:
Empty input  
Special characters in input  
SQL injection attempts  
Mock database connection  

Assume the database connection is already mocked.
```

Model response:

```python
import pytest

def test_process_form_data_empty_input():
    with pytest.raises(ValueError):
        process_form_data("")

def test_process_form_data_special_characters():
    result = process_form_data("name=John@#&*")
    assert result is not None

def test_process_form_data_sql_injection():
    result = process_form_data("'; DROP TABLE users; --")
    assert result is not None

def test_process_form_data_mock_db(monkeypatch):
    class MockDB:
        def save(self, data):
            return True

    monkeypatch.setattr("module.db", MockDB())
    result = process_form_data("name=John")
    assert result is True  
```

This produces more complete and reliable test coverage, especially for edge cases and security-related inputs.

## Prompting for Security Issues

Instead of general requests, we can specify what types of issues to look for, like SQL injection, input validation problems, or unsafe data handling.

Example prompt:

```plaintext 
Analyze this Python function and identify potential security vulnerabilities.

Focus on:
- SQL injection  
- Input validation issues  
- Unsafe data handling 
- Broken authentication 
```

Model response:

```bash
Potential issues identified:

- SQL injection risk if user input is directly used in SQL queries without parameterization  
- Missing input validation for user-provided data, which may allow malformed or malicious inputs  
- Unsafe handling of sensitive data if credentials or tokens are stored or logged in plain text  
- Broken authentication risk if login logic does not properly verify user credentials or session state    
```

This helps the model focus on realistic and common security risks.

## OWASP-Guided Security Review

Security prompting becomes even stronger when we reference known frameworks like OWASP Top 10. These frameworks guide the model to check for well-known vulnerabilities.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-13201046.png)

</div>

We can use the following prompt to guide the model through a security review based on OWASP Top 10:

```plaintext 
Audit the following login function for OWASP Top 10 vulnerabilities.

Check for issues such as:
- Broken authentication  
- Injection flaws  
- Sensitive data exposure  
```

This approach makes the review more systematic and aligned with real-world security standards.
