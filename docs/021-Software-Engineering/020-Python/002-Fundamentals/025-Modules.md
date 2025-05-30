---
title: "Modules"
description: "Python Modules"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 25
last_update:
  date: 10/28/2019
---


## Overview

Modules are Python files with a `.py` extension that contain functions, attributes, and even other modules. Python includes many built-in modules to help us avoid rewriting code.  

## Common Python Modules  

Python has around 200 built-in modules. Some popular ones:  

- `os` – Interacts with the operating system, like getting the current directory.  
- `collections` – Provides advanced data structures.  
- `string` – Helps with string operations.  
- `logging` – Logs program events.  
- `subprocess` – Runs terminal commands from Python.  

## Importing a Module  

To use a module, we import it with the `import` keyword.  

```python
import os
print(type(os))  # Output: <class 'module'>
```

## Finding Module Functions  

To see what a module offers, check its documentation or use the `help` function.  

```python
import os
help(os)  # Displays a long list of functions and attributes
```

## Using `os`

### Get Current Directory  

Use `os.getcwd()` to find the current working directory.  

```python
import os
work_dir = os.getcwd()
print(work_dir)  
```

The output is in quotes, which means the output is a string.

```plaintext
'/home/user/projects'
```


### Changing Directory  

Use `os.chdir()` to move to a different directory.  

```python
import os
os.chdir("/home/user/documents")
print(os.getcwd())  # Output: '/home/user/documents'
```

## Module Attributes  

Modules also have attributes, which store values instead of performing actions.  

```python
import os
print(os.environ)  # Outputs environment variables as a dictionary
```

With attributes, we don't need to use "()" as they are not functions. The output is a dictionary:

```js
environ({
  'SHELL': '/bin/bash', 
  'WSL2_GUI_APPS_ENABLED': '1', 
  'WSL_DISTRO_NAME': 'Ubuntu-16.04', 
  'HISTSIZE': '1000000', 
  'PWD': '/mnt/c/project' 
  .....})
```

## Importing a Single Function  

Instead of importing the whole module, we can import only what we need. For example, instead of importing the entire `os` module, we can only import the specific `chdir` function.

```python
from os import chdir
chdir("/home/user")
```

## Importing Multiple Functions  

For multiple functions, separate them with commas.  

```python
from os import chdir, getcwd
chdir("/home/user/documents")
print(getcwd())  # Output: "/home/user/documents"
```

## Example: Creating a Module

A module is just a single Python file. Python has built-in modules, but you can also create your own by writing a `.py` file.  

:::info 

Get the script here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/020-Python/000-Projects/001-Basic-Scripts)

:::

This section guides you through creating a Python module for testing network connections.

1. **Install the Requests Module**

    - **Requests**: For sending HTTP requests, handling headers, data, and SSL.
    - Install it using:
    ```bash
    sudo apt install python3-requests
    ```

2. **Create the `custom_network_module.py` Module**

    - Code can be found here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/020-Python/000-Projects/001-Basic-Scripts)

    - **`check_localhost`**: Verifies if localhost is correctly configured by checking if the IP is `127.0.0.1`.

    - **`check_connectivity`**: Verifies internet connectivity by sending a GET request.

    - Note that module file names should not contain dashes ("-").

3. **This module can not be used by another script.**

    - Create `check-disk-cpu-usage.py` and use the `custom_network_module` module.
    - Code can be found here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/docs/021-Software-Engineering/020-Python/000-Projects/001-Basic-Scripts)
    - Run code:

        ```python
        python3  check-disk-cpu-usage.py
        ```