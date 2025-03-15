---
title: "Modules"
description: "Python Modules"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 32
last_update:
  date: 10/28/2019
---



## Creating a Module

Get the script here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/assets/code/python/basics)


This section guides you through creating a Python module for testing network connections.

- Step 1: Install the Requests Module

    - **Requests**: A Python module for sending HTTP requests, handling headers, data, and SSL.
    - Install it using:
    ```bash
    sudo apt install python3-requests
    ```

- Step 2: Create the `custom_network_module.py` Module

    - Code can be found here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/assets/code/python/basics)

    - **`check_localhost`**: Verifies if localhost is correctly configured by checking if the IP is `127.0.0.1`.

    - **`check_connectivity`**: Verifies internet connectivity by sending a GET request.

    - Note that module file names should not contain dashes ("-").

- Step 3: This module can not be used by another script. 

    - Create `check-disk-cpu-usage.py` and use the `custom_network_module` module.
    - Code can be found here: [Sample python scripts.](https://github.com/joseeden/joeden/tree/master/assets/code/python/basics)
    - Run code:

        ```python
        python3  check-disk-cpu-usage.py
        ```