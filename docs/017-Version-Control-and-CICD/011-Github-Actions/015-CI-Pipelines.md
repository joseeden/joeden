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
  date: 10/21/2022
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

## Example: Continuous Integration Workflow

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
