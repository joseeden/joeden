---
title: "Debug Python in VS Code with uv"
description: "Debug Python in VS Code with uv"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 20
# last_update:
#   date: 06/17/2026
---


## Overview

This page explains how to debug a Python script in VS Code when the project is using `uv` and normally runs with:

```bash
uv run python main.py
```

Use this when you want to see where the code execution is, inspect variables, step through the code, and understand what happens while the script is running.


## Add Breakpoints

Open the Python file that you want to debug.

Click on the left side of a line number to add a red breakpoint.

Good places to start are:

- The `main()` function
- The line that calls the main API or business logic
- A `for` loop that processes results
- A function that receives user input
- A function that handles errors

For an AI agent script, useful breakpoints are often around the model call and the response loop.

```python
response = client.responses.create(...)
```

```python
for reply in response.output:
```

To start debugging, click the green "Run and Debug" button in the VS Code left panel.

1. Step through the code with `F10`.

2. Step into a function with `F11`.

3. Continue running with `F5`.


## Create `launch.json`

A workspace folder refers to the folder that was opened in VS Code.

Create the debug configuration inside the VS Code workspace folder.

VS Code looks for debug configs here:

```text
<your VS Code workspace folder>/.vscode/launch.json
```

If the VS Code workspace is opened at `c:\Git`, create this file:

```text
c:\Git\.vscode\launch.json
```

Do not create it in `~` unless `~` is the folder that was opened as the VS Code workspace.


## If the Workspace Is a Parent Folder 

<!-- ## Debug with `uv` -->

<!-- If the project normally runs with this command:

```bash
uv run python main.py
``` -->

Here, the workspace folder is a parent folder which contains the project folder. 

```bash
parent-folder/              ## workspace folder
|
├── project-folder            
|   └── main.py             ## The code you want to debug
|
└── another-project-folder
|   └── main.py
``` 

<!-- Use a launch config that starts `uv` and passes the same arguments. -->

As an example:

```bash
Git/             ## parent folder is the workspace folder
|
├── project-llm-engineering-sandbox           
|   └── main.py  
``` 

Then the `launch.json` file should look like this:

**Note:** The format here is for WSL or Linux. For Windows, use `\` instead of `/` in the paths.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug customer service agent with uv",
      "type": "debugpy",
      "request": "launch",
      "program": "uv",
      "args": [
        "run",
        "python",
        "main.py"
      ],
      "console": "integratedTerminal",
      "cwd": "${workspaceFolder}/project-llm-engineering-sandbox/building-ai-agents/03-multi-tool-customer-service-agent",
      "envFile": "${workspaceFolder}/project-llm-engineering-sandbox/building-ai-agents/03-multi-tool-customer-service-agent/.env"
    }
  ]
}
```

The `cwd` and `envFile` values point to the project folder.

- `cwd` value is the project directory, where `uv run python main.py` must run.

- `envFile` is used if the script needs environment variables such as API keys.


## If the Workspace Is the Project Folder

Here, the workspace folder is the project folder itself.

```bash
project-llm-engineering-sandbox  ## project folder is the workspace folder           
|   └── main.py  
``` 

If VS Code is opened directly inside the Python project folder, use shorter paths.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Python with uv",
      "type": "debugpy",
      "request": "launch",
      "program": "uv",
      "args": [
        "run",
        "python",
        "main.py"
      ],
      "console": "integratedTerminal",
      "cwd": "${workspaceFolder}",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```

## Using the `uv` Virtual Environment Directly

Another option is to debug with the Python interpreter inside the `.venv` that `uv` created.

This usually behaves the same as `uv run python main.py` because it uses the same project environment.

For WSL or Linux:

```json
{
  "name": "Debug Python with .venv",
  "type": "debugpy",
  "request": "launch",
  "program": "${workspaceFolder}/project-llm-engineering-sandbox/building-ai-agents/03-multi-tool-customer-service-agent/main.py",
  "console": "integratedTerminal",
  "cwd": "${workspaceFolder}/project-llm-engineering-sandbox/building-ai-agents/03-multi-tool-customer-service-agent",
  "envFile": "${workspaceFolder}/project-llm-engineering-sandbox/building-ai-agents/03-multi-tool-customer-service-agent/.env",
  "python": "${workspaceFolder}/project-llm-engineering-sandbox/building-ai-agents/03-multi-tool-customer-service-agent/.venv/bin/python"
}
```

For Windows:

```json
{
  "name": "Debug Python with .venv",
  "type": "debugpy",
  "request": "launch",
  "program": "${workspaceFolder}\\project-llm-engineering-sandbox\\building-ai-agents\\03-multi-tool-customer-service-agent\\main.py",
  "console": "integratedTerminal",
  "cwd": "${workspaceFolder}\\project-llm-engineering-sandbox\\building-ai-agents\\03-multi-tool-customer-service-agent",
  "envFile": "${workspaceFolder}\\project-llm-engineering-sandbox\\building-ai-agents\\03-multi-tool-customer-service-agent\\.env",
  "python": "${workspaceFolder}\\project-llm-engineering-sandbox\\building-ai-agents\\03-multi-tool-customer-service-agent\\.venv\\Scripts\\python.exe"
}
```

Use the WSL or Linux path if VS Code is connected to WSL.

Use the Windows path if VS Code is running directly on Windows.


## What to Inspect

When the debugger pauses, check the `Run and Debug` panel.

It will display the following sections:

| Panel         | Purpose                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------- |
| Variables     | Shows current variable values such as `user_input`, `response`, `reply`, and `messages`. |
| Call Stack    | Shows the current execution path and where the program is in the code.                   |
| Watch         | Tracks expressions such as `reply.type` or `response.output`.                            |
| Debug Console | Lets you inspect variables and run expressions manually.                                 |


## Common Issues

1. If the debugger cannot find the file, check that `launch.json` is inside the actual VS Code workspace folder.

2. If the script cannot find local files, check that `cwd` points to the project directory.

3. If imports fail, check that the debug config uses `uv` or the correct `.venv` Python interpreter.

4. If environment variables are missing, check that `envFile` points to the correct `.env` file.

5. If the terminal command has a typo, use `.py` and not `,py`.

```bash
uv run python main.py
```
