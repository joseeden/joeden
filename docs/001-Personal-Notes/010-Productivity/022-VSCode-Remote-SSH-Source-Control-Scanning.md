---
title: "VS Code Remote SSH Source Control Scanning"
description: "Fix VS Code Remote SSH Source Control stuck scanning for Git repositories"
sidebar_position: 22
tags: 
- Development
- Terminal
- IDE
- Visual Studio Code
- DevOps
# last_update:
#   date: 06/22/2026
---


## Overview

When using VS Code Remote SSH, the Source Control panel may get stuck on:

```text
Scanning folder for Git repositories...
```

This can happen even when the Git repositories on the remote server are valid and accessible.

In this case, the issue may be caused by a stale VS Code Remote Server installation and repository detection settings that prevent normal Git discovery.


## Environment

My environment: 

| Component            | Details                                      |
| -------------------- | -------------------------------------------- |
| Local machine        | macOS Tahoe                                  |
| VS Code              | 1.125.0                                      |
| Remote SSH extension | 0.124.0                                      |
| Remote server        | Ubuntu                                       |
| Workspace root       | User home directory opened through Remote SSH |

The remote server had multiple Git repositories under the user's home directory.

Example:

```text
/home/joseeden/
├── project-backend
├── project-frontend
├── project-deploy
├── project-tools
└── z-git/poc-testing
```


## Symptoms

The Source Control panel stayed on:

```text
Scanning folder for Git repositories...
```

The issue continued after trying these steps:

- Reloading the VS Code window
- Opening individual repositories directly
- Changing Git repository detection settings

## Troubleshooting Checklist

[] Confirm `.git` directories can be found with `find`.
[] Confirm the `find` scan is fast.
[] Confirm `git status` works inside a repository.
[] Remove or rename invalid `.git` directories outside real repositories.
[] Check that `git.ignoredRepositories` does not ignore the workspace root.
[] Reset `~/.vscode-server` if repository health is good but Source Control remains stuck.


## Validate Git Discovery

First, confirm that the remote server can find the repositories.

Run this from the remote workspace root:

```bash
find . -name .git -type d -prune
```

Example output:

```text
./z-git/poc-testing/.git
./project-tools/.git
./project-backend/.git
./project-frontend/.git
./project-deploy/.git
```

Then check whether the scan is slow:

```bash
time find . -name .git -type d -prune
```

Example result:

```text
real    0m0.303s
```

If the command returns quickly, the remote filesystem scan is probably not the bottleneck.


## Validate Repository Health

Check one of the repositories directly:

```bash
cd ~/project-backend
git status
```

Expected result:

```text
On branch <branch-name>
nothing to commit, working tree clean
```

If `git status` works normally, the repositories themselves are probably healthy.


## Check for Invalid Git Directories

In this case, an empty `.git` directory existed in the user's home directory:

```text
/home/joseeden/.git
```

Check it with:

```bash
ls -la ~/.git
```

Example output:

```text
total 8
drwxr-xr-x 2 joseeden joseeden 4096 .
drwxr-x--- 26 joseeden joseeden 4096 ..
```

Since this was not a valid Git repository, it was renamed:

```bash
mv ~/.git ~/.git.bak
```

**Note**: This was not the main cause in this case, but removing the invalid directory prevents future confusion.


## Root Cause

The main issue was a stale or corrupted VS Code Remote Server installation.

Repository detection settings had also been changed during troubleshooting. These settings prevented VS Code from finding repositories normally.

Examples:

```json
"git.autoRepositoryDetection": "openEditors"
```

```json
"git.ignoredRepositories": [
  "/home/joseeden"
]
```

:::warning

Do not add the home directory to `git.ignoredRepositories` if the workspace root is the home directory and the Git repositories are stored underneath it.

:::


## Resolution

Back up the existing VS Code Remote Server installation:

```bash
mv ~/.vscode-server ~/.vscode-server.bak
```

Alternatively, create a compressed backup:

```bash
tar czf ~/vscode-server-backup.tar.gz ~/.vscode-server
```

Then reconnect from VS Code using Remote SSH.

VS Code automatically installs a fresh remote server after reconnecting.


## Restore Git Detection Settings

Open the Remote SSH settings JSON and restore normal repository detection.

Example:

```json
{
  "git.autoRepositoryDetection": true,
  "git.repositoryScanMaxDepth": 3,
  "git.repositoryScanIgnoredFolders": [
    ".codex",
    ".cache",
    ".venv",
    "node_modules",
    "dist",
    "build",
    "vendor"
  ]
}
```

Do not use this setting in this scenario:

```json
"git.ignoredRepositories": [
  "/home/joseeden"
]
```

It prevents VS Code from discovering repositories under the home directory workspace.


## Result

After resetting the VS Code Remote Server and restoring Git auto-detection, VS Code detected these repositories automatically:

```text
project-backend
project-frontend
project-deploy
project-tools
z-git/poc-testing
```

The Source Control panel stopped hanging on repository scanning.


