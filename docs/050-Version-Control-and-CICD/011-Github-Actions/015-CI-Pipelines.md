---
title: "CI Pipelines"
description: "CI Pipelines in Github Actions (GHA)"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - Github Actions
sidebar_position: 15
last_update:
  date: 7/13/2021
---


## Overview

GitHub Actions automate workflows for code integration and deployment.  

- Workflows define automation tasks  
- Triggered by repository events like code pushes  
- Defined in `.github/workflows/`  

## GitHub Actions Workflow  

A workflow consists of jobs and steps that define what happens when triggered.  

- **Workflow**: Defines automation tasks  
- **Jobs**: Run on virtual machines called runners  
- **Steps**: Execute commands inside a job  

## Defining a Basic Workflow  

A simple GitHub Actions workflow runs a script when code is pushed.  

```yaml
name: CI
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Print message
        run: |
          echo "Hello from GitHub Actions!"
          echo "Workflow running successfully."
```  

- **`on: push`**: Triggers when pushing to `main`  
- **`runs-on: ubuntu-latest`**: Uses an Ubuntu runner  
- **`run`**: Executes shell commands  



## Setting Up a GitHub Actions Workflow

1. **Create a GitHub Repository**  
    - Go to [github.com/new](https://github.com/new).  
    - Add a Python `.gitignore` and a license.  
    - Click **Create Repository**.  

2. **Enable GitHub Actions**  
    - Go to `Settings > Actions` in the repository.  
    - Ensure Actions are enabled.  

      <div class="img-center"> 

      ![](/img/docs/Screenshot-2025-03-04-192110.png)

      </div>

3. **Create a "Hello, World!" Action**  
    - Click **Actions** in the repository.  
    - Search for **Simple Workflow** and click **Configure**.  
    - Edit and save the workflow YAML file.  

      <div class="img-center"> 

      ![](/img/docs/Screenshot-2025-03-04-192227.png)

      </div>


4. **Commit the Workflow**  
    - Type a commit message.  
    - Click **Commit changes** to trigger the workflow.  

      <div class="img-center"> 

      ![](/img/docs/Screenshot-2025-03-04-192332.png)

      </div>


5. **Check the Workflow Execution**  
    - On the repository page, see the status icons:  
      - 🟠 Amber circle → Running  
      - ✅ Green check → Success  
      - ❌ Red cross → Failed  

5. **Inspect the Logs**  
    - Click **Actions** to view the latest runs.  
    - Open the **build** job to see the output logs.

## Example: CI Workflow with Slack Notifications

This YAML file defines a **CI workflow** with **Slack notifications**.  

- **Config Section**  
  - Specifies Slack notification channels.  

- **Workflow Section**  
  - Runs a script (`script.py`).  
  - Sends a Slack message if the script fails.  

YAML Example:

```yaml
config:
  slack:
    channels:
      - workflow-orchestration
      - builds-911

workflow:
  # Run a script with proper block style
  run: |
    echo "Running script.py"
    python3 script.py
  
  # Send Slack notification on failure
  notify:
    - slack:
        channels: ${{ config.slack.channels }}
        message: >-
          It appears that your run has failed.
          Check the CI logs for details.
          Contact the Engineer on call if needed.
      if: run.state == "failed"
```

This structure ensures **clear execution steps** and **automatic failure alerts** in CI workflows.

- **Block Styles**  
  - `|` (Literal) → Preserves command formatting.  
  - `>-` (Folded) → Converts newlines into spaces for a cleaner message.  

- **Dynamic Values**  
  - Uses `${{ config.slack.channels }}` to reference predefined Slack channels.  

- **Failure Notification**  
  - Sends a message only if `run.state == "failed"`.  


## Example: CI Workflow for Pull Requests  

This workflow runs tests and checks when a pull request is created.  

- Ensures code quality before merging  
- Automates testing and setup  
- Helps catch issues early  

**Steps:**

1. **Create a Feature Branch**  
    A feature branch isolates changes before merging.  

    - Click **Branches** in the repository  
    - Click **New branch**, name it, and create it  
    - Verify that the branch appears in the repository  

2. **Add the Code to the Branch**  
    A simple script helps test the workflow.  

    - Add a Python script (`hello_world.py`)  
    - The script prints "Hello, World!" with the current time  

        ```python
        import datetime
        print("Hello, World!", datetime.datetime.now())
        ```

    - Commit the file to the feature branch  

3. **Configure the Workflow for Pull Requests**  
    The workflow needs key steps before running code.  

    - **Checkout**: Fetch repository code  
    - **Setup Python**: Install the required version  
    - **Run script**: Execute the Python file  

    Modify the workflow to trigger on pull requests.  

    - Open `.github/workflows/main.yml`  
    - Use `on: pull_request`  


      ```yaml
      on: 
        pull_request:
          branches:
            - main
      ```
    
    Next, define the actions:

    - Each step uses the `uses` key  
    - Format: `org/repo@version`  
    - Arguments are passed with `with`  

      ```yaml
      steps: 
      - name: Checkout 
        uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.6'
      ```

    The complete YAML file should now look like this:

      ```yaml
      name: CI Workflow for PR 

      on: 
        pull_request:
          branches:
            - main      

      jobs:
        build:
          runs-on: ubuntu-latest
          steps: 
          - name: Checkout 
            uses: actions/checkout@v3
          - name: Setup Python
            uses: actions/setup-python@v4
            with:
              python-version: '3.6'
          - name: Run Python script
            run: |
              echo hello_world.py
              python hello_world.py
      ```

4. **Create a Pull Request**  
    A pull request triggers the workflow.  

    - Commit changes in the feature branch  
    - Open a pull request to merge into `main`  
    - The workflow runs automatically  

5. **Checking Workflow Execution**  
    GitHub displays workflow status.  

    - 🟠 Amber → Running  
    - ✅ Green → Success  
    - ❌ Red → Failed  

6. **Inspecting Logs**  
    Logs help debug workflow runs.  

    - Click **Actions**  
    - Open the latest run  
    - View logs for each step