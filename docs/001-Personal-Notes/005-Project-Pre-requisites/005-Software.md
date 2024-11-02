---
sidebar_position: 1
title: Software
---

## Python 3.10

Reference: [Download Python](https://www.python.org/downloads/) 

- Install Python 3.10. Note that this was tested on Ubuntu 22.04 LTS.

    ```bash
    sudo apt install -y python3
    ```

## Python 3.12 

Reference: [Download Python](https://www.python.org/downloads/) 

- Install Python 3.12.

    ```bash
    sudo apt install -y python3.12
    ``` 

- Verify.

    ```bash
    python --version 
    ```

If you are using Ubuntu 22.04, you might only be able to install Python 3.10.
To install Python 3.12:

- Install this package (this is required to run `add-apt-repository`)

    ```bash
    sudo apt install -y software-properties-common
    ```

- Add the deadsnakes PPA repository and run update.

    ```bash
    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt update
    ```
    
- Install Python 3.12

    ```bash 
    sudo apt install -y python3.12
    ```

- Verify:

    ```bash
    python3.12 --version
    ```


## Pip 3.12

- Install pip.

    ```bash
    sudo apt install python3.12-venv
    python3.12 -m ensurepip --upgrade

    ## Ensure Python 3.12 and its pip are in your PATH
    which python3.12
    which pip3.12
    ```
