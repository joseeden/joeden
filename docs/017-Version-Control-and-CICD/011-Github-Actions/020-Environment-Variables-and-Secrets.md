---
title: "Env vars and Secrets"
description: "Environment Variables and Secrets"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - Github Actions
sidebar_position: 20
last_update:
  date: 10/22/2022
---



## Contexts  

Contexts store information about the workflow run.  

- `github` → Workflow details  
- `env` → Custom environment variables  
- `secrets` → Encrypted secrets  
- `job` → Current job details  
- `runner` → Runner machine info  

Use them in expressions like this:  

```yaml
env:
  MY_VAR: ${{ github.repository }}
```

## Variables  

Variables store non-sensitive data like settings.  

- Declared using `env` in YAML  
- Scope depends on where they are defined  
- Accessed with `env` context  

Example:  

```yaml
env:
  BUILD_MODE: "debug"

steps:
  - run: echo "Mode: ${{ env.BUILD_MODE }}"
```

## Secrets  

Secrets store sensitive data securely.  

- Used for passwords, API keys, etc.  
- Encrypted and hidden in logs  
- Accessed with `secrets` context  

Example:  

```yaml
env:
  API_KEY: ${{ secrets.MY_SECRET }}       ## Set the secret as an env var 
with:
  SUPER_SECRET: ${{ secrets.MY_SECRET }}  ## Or as an input
```

Note that Github does not print secrets in the logs as safety measure.

## Setting Secrets  

Add a secret to a repository:  

1. Go to **Settings** in the repository  
2. Click **Secrets and Variables** → **Actions**  
3. Click **New repository secret**  
4. Enter a name and value, then **Add secret**  

## `GITHUB_TOKEN` Secret  

A built-in secret for GitHub Actions.  

- Allows workflows to interact with GitHub  
- Used for repository actions like:  
  - Cloning code  
  - Managing issues and PRs  
  - Posting comments  

Access it with:  

```yaml
env:
  TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Example: Commenting on a Pull Request  

Use `GITHUB_TOKEN` to post a comment.  

```yaml
jobs:
  comment:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v3
      - uses: thollander/actions-comment-pull-request@v2
        with:
          message: "Hello world!"
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

When a pull request is created, GitHub Actions will comment:  

```
Hello world!
```