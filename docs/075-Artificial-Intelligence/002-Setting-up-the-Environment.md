---
title: "Setting up the Environment"
description: "Setting up the Python environment for AI development"
tags: 
- Data Science
- Machine Learning
- Artificial Intelligence
sidebar_position: 1
last_update:
  date: 5/26/2023
---


## Overview 

AI applications can be built using many programming languages and frameworks. However, Python is the most commonly used language for AI, machine learning, AI workflows, and AI agents. 

- Popular in AI development
- Large ecosystem
- Strong AI library support

For these reasons, the examples in this section uses Python. The concepts remain the same regardless of the programming language, but Python is often the easiest place to start when building AI-powered applications.

## Using UV for Python Projects

Before building AI workflows and agents, you need a Python project. One simple way to do this is by using UV.

UV is a Python project and package manager. It automatically creates a virtual environment for each project so that installed packages do not affect your global Python installation.

> See [UV Installation.](https://docs.astral.sh/uv/getting-started/installation/)

Once installed, verify that UV is available.

In the example below, the `uv` command is used to check the installed version.

```bash
uv --version
```

Output:

```text
uv 0.11.21 (x86_64-unknown-linux-gnu)
```


## Create a New Project

After installing UV, create a directory for your project.
Inside the new directory, initialize the project.

```bash
uv init
```

Output:

```text
Initialized project
```

After running the command, your folder may look similar to this:

```text
project/
├── README.md
├── main.py
└── pyproject.toml
```

The important file for now is `main.py`, which will contain your Python code.

## Run the Project

Open the project folder in your code editor.

Many developers use Visual Studio Code, but any code editor will work.

Once opened, locate the `main.py` file.

A new `main.py` file is usually very simple.

```python
def main():
    print("Hello from building-ai-workflows!")

if __name__ == "__main__":
    main()
```

Run the Python file using UV.

```bash
uv run main.py
```

Output:

```text
Using CPython 3.12.12
Creating virtual environment at: .venv
Hello from building-ai-workflows!
```

<!-- If the message appears, your project is working correctly.

## Why Use UV?

You can create Python projects using other tools if you prefer. The important thing is having a working Python project where you can start building AI workflows and agents. -->

Once the project is ready, the next step is to add code that interacts with AI models and external APIs.
