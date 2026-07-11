---
title: "Unable to Detect Venv as Kernel in VS Code"
description: "Unable to Detect Virtual Environment as Kernel in VS Code"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 30
# last_update:
#   date: 07/11/2026
---


## Overview

Use this when a `.venv` exists for a Python project, but VS Code does not show it as a Jupyter notebook kernel.

This commonly happens when:

- VS Code is opened at the wrong folder.
- `ipykernel` is missing from the project environment.
- The notebook is attached to a global Python install instead of the project `.venv`.
- VS Code is running on Windows while the project environment is inside WSL.


## Recommended Folder

Open the project folder directly in VS Code.

If the project is inside a parent folder, avoid opening only the parent folder unless you intentionally want that parent folder as the workspace.

Example:

```text
Git/
|-- project-a/
|   |-- .venv/
|   |-- pyproject.toml
|   `-- notebook.ipynb
`-- project-b/
```

For `project-a`, open the `project-a/` folder directly in VS Code.


## macOS

Open the project folder:

```bash
cd ~/Git/project-a
code .
```

Install `ipykernel` in the project environment:

```bash
uv add --dev ipykernel
uv sync
```

Verify the environment:

```bash
uv run python --version
uv run python -m ipykernel --version
```

If VS Code still does not show the environment, register a named kernel:

```bash
uv run python -m ipykernel install \
  --user \
  --name project-a \
  --display-name "Python (.venv project-a)"
```

Reload VS Code:

1. Open the command palette.
2. Run `Developer: Reload Window`.
3. Open the notebook again.
4. Select `Python (.venv project-a)` from the kernel dropdown.


## Windows with PowerShell

You can use this when the project and `.venv` are created directly on Windows.

Open a Powershell terminal and navigate to the project folder:

```powershell
cd C:\Git\project-a
code .
```

Install `ipykernel` in the project environment:

```powershell
uv add --dev ipykernel
uv sync
```

Verify the environment:

```powershell
uv run python --version
uv run python -m ipykernel --version
```

If needed, register a named kernel:

```powershell
uv run python -m ipykernel install --user --name project-a --display-name "Python (.venv project-a)"
```

In VS Code:

1. Open the command palette.
2. Run `Developer: Reload Window`.
3. Open the notebook again.
4. Select the project `.venv` or the named kernel.


## Windows with VS Code and WSL

Use this when the project `.venv` is inside WSL.

Open the project from a WSL terminal:

```bash
cd ~/Git/project-a
code .
```

Note that this opens VS Code on a remote server inside WSL. You should see `WSL: Ubuntu-22.04` in the lower-left corner of VS Code. Another way to check is to open the command palette and run `Remote-WSL: New Window`. If it opens a new VS Code window, you are connected to WSL.

<!-- VS Code should show that it is connected to WSL in the lower-left corner. -->

Install `ipykernel` inside WSL:

```bash
uv add --dev ipykernel
uv sync
```

Verify the WSL environment:

```bash
uv run python --version
uv run python -m ipykernel --version
```

Check the actual `.venv` Python path:

```bash
.venv/bin/python --version
```

Open the notebook in VS Code and select the project `.venv` from the kernel dropdown.

If VS Code still does not detect the kernel, register it from WSL:

```bash
uv run python -m ipykernel install \
  --user \
  --name project-a \    ### change to a unique name if you have multiple projects
  --display-name "Python (.venv project WSL)"
```

Then reload VS Code and select the named kernel.

:::warning[Do not mix Windows and WSL environments]

If the project lives in WSL, install `ipykernel` from the WSL terminal. 

If the project lives on Windows, install it from PowerShell. Mixing the two can make VS Code show the wrong interpreter.

:::

If you get this when trying to select the kernel:

```text
Install/Enable suggested extensions 
Browse marketplace for extensions
```

This means the Jupyter extension is not installed or enabled inside the WSL VS Code environment.

Extensions installed on Windows are separate from extensions installed in the WSL extension host, so they may appear installed locally but still need installation in WSL.

Open Extensions and search the following:

- Python 
- Jupyter 

Select the extensions and click:

```bash
Install in WSL: Ubuntu
```

or:

```bash
Enable in WSL: Ubuntu
```

Reload VS Code and open the notebook again. You should now see the project `.venv` in the kernel dropdown.

## Quick Checks

Check whether `ipykernel` is installed:

```bash
uv run python -m ipykernel --version
```

For a regular activated environment, this also works:

```bash
python -m ipykernel --version
```

For macOS, Linux, and WSL, check the project interpreter:

```bash
.venv/bin/python --version
```

For Windows PowerShell:

```powershell
.venv\Scripts\python.exe --version
```


## Recreate the Environment

If the environment was created with the wrong Python version or missing packages, recreate it.

For macOS, Linux, and WSL:

```bash
rm -rf .venv
uv sync
uv add --dev ipykernel
```

For Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .venv
uv sync
uv add --dev ipykernel
```

Reload VS Code after recreating the environment.


## Cleanup

List registered Jupyter kernels:

```bash
jupyter kernelspec list
```

Remove an old named kernel:

```bash
jupyter kernelspec remove project-a
```

If `jupyter` is not available globally, run it through `uv`:

```bash
uv run --with jupyter jupyter kernelspec list
uv run --with jupyter jupyter kernelspec remove project-a
```

Remove a broken project `.venv` and rebuild it:

```bash
rm -rf .venv
uv sync
```

For Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .venv
uv sync
```

:::danger[Only remove the project environment]

Run cleanup commands from the project folder, and confirm that `.venv` is the environment you want to recreate.

:::


## References

- [Using uv with Jupyter](https://docs.astral.sh/uv/guides/integration/jupyter/)
- [Installing uv](https://docs.astral.sh/uv/getting-started/installation/)
