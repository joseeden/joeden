---
title: "Pip Error"
description: "Pip Error"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 10
# last_update:
#   date: 10/28/2019
---


## `AttributeError` when checking Pip3 Version 

I encountered this issue when trying to check the Python3 and Pip3 version installed in my WSL2 Ubuntu:

```bash
$ python3 --version
Python 3.8.10 

$ pip3 --version
Traceback (most recent call last):
  File "/usr/bin/pip3", line 11, in <module>
    load_entry_point('pip==20.0.2', 'console_scripts', 'pip3')()
  File "/usr/lib/python3/dist-packages/pkg_resources/__init__.py", line   490, in load_entry_point
  
  ......
```

The specific error was:

```bash
AttributeError: module 'lib' has no attribute 'X509_V_FLAG_NOTIFY_POLICY'
```

This error comes from the `pyOpenSSL` library and indicates a mismatch between the `pyOpenSSL` Python package and the underlying `libssl` C library.

**Problem:** Likely due to conflicting or outdated system packages in the WSL Ubuntu environment. This is causing `pip3` to crash with an `AttributeError`.

**Solution:** Reinstall `pip` using `get-pip.py`.


1. Remove broken pip.

    ```bash
    sudo apt remove python3-pip -y
    ```

2. Manually install pip via get-pip.py. Note that you might encounter an issue if you're running a different Python3 version.

    ```bash
    curl -sS https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py --user
    ```

    For example, I was running Python 3.8 but the script above is specific to Python 3.9. As a workaround, download the script for your Python version.

    ```bash
    curl -O https://bootstrap.pypa.io/pip/3.8/get-pip.py
    python3 get-pip.py --user
    ```

3. Ensure `~/.local/bin` is in your PATH.

    ```bash
    echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc
    source ~/.bashrc
    ```

4. Verify pip works.

    ```bash
    pip3 --version
    ```
