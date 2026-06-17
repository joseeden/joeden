---
title: "Sync dotfiles to joeden/prompts"
sidebar_position: 25
description: "Sync dotfiles to joeden/prompts"
tags: 
- Docusaurus
- Artificial Intelligence
- VS Code
# last_update:
#   date: 06/17/2026
---


## Overview

This KB documents how to mirror portable prompt files from `dotfiles` into `joeden/prompts`.

The goal is to keep `dotfiles` as the working source while also keeping a GitHub-visible copy inside the `joeden` repo.

The sync should only update `joeden/prompts` when files are added, removed, or changed.


## Folder Purpose

The setup uses two folders.

| Folder                  | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `C:\Git\dotfiles`       | Working source for portable prompt assets.         |
| `C:\Git\joeden\prompts` | GitHub-visible mirror of the dotfiles prompt tree. |

The `dotfiles` folder can contain multiple prompt-related folders.

The `joeden/prompts` folder mirrors the prompt-related files that should be committed with the `joeden` repo.

**Note**: The `dotfiles` folder can be a local Git repo without a GitHub remote. The `joeden` folder is the GitHub-backed repo used for the public mirror.


## Current Structure

The source folder can contain multiple folders:

```text
C:\Git\dotfiles\
  .github\
  ai\
```

The mirror folder follows the same structure:

```text
C:\Git\joeden\prompts\
  .github\
  ai\
```

The `.git` folder is excluded from the mirror.


## Sync Script

The sync script is:

```text
C:\Git\dotfiles\ai\scripts\sync-to-joeden.ps1
```

Run it with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Git\dotfiles\ai\scripts\sync-to-joeden.ps1
```

The script compares source and destination files by relative path and SHA-256 hash.

If both folders already match, it does not rewrite files.

Expected output when no update is needed:

```text
No sync needed. C:\Git\joeden\prompts already matches C:\Git\dotfiles
```


## What Gets Synced

The script syncs `dotfiles` into `joeden/prompts`.

| Source                    | Destination                     |
| ------------------------- | ------------------------------- |
| `C:\Git\dotfiles\ai`      | `C:\Git\joeden\prompts\ai`      |
| `C:\Git\dotfiles\.github` | `C:\Git\joeden\prompts\.github` |

The script does not sync:

- `C:\Git\dotfiles\.git`
- Startup watcher scripts
- Scheduled task installer scripts
- Temporary files


## Why Not Use a Startup Watcher

The sync should not run every time Windows starts.

It should also not keep rewriting `joeden/prompts` when the files are already the same.

A startup watcher is unnecessary for this workflow because:

- It keeps a background process running.
- It can update the mirror too often.
- It can make Git changes harder to understand.
- It is more complex than the workflow needs.

The better behavior is to trigger sync only after `dotfiles` is updated.


## Trigger Options

There are a few practical ways to trigger the sync.

| Trigger     | When to use                                                   |
| ----------- | ------------------------------------------------------------- |
| Manual run  | Best when edits are occasional and explicit control is wanted. |
| Git hook    | Best when `dotfiles` is a local Git repo.                      |
| Editor task | Best when using VS Code tasks for local automation.            |

Manual run is the simplest setup.

A Git hook is the cleanest automatic setup when `dotfiles` is a Git repo.


## Git Hook Option

If `dotfiles` is a Git repository, the sync can be triggered by a `post-commit` hook.

In this setup, the repository does not need to have a GitHub remote.

The local repo gives access to Git hooks, commits, diffs, and local history.

The sync trigger is a `post-commit` hook:

```text
C:\Git\dotfiles\.git\hooks\post-commit
```

The hook runs the sync script after each commit in `dotfiles`.

Example hook command:

```sh
#!/bin/sh

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:/Git/dotfiles/ai/scripts/sync-to-joeden.ps1"
```

This makes the mirror update only after dotfiles changes are committed.

The script still checks hashes, so it will skip the update when the files already match.

The normal workflow is:

```powershell
cd C:\Git\dotfiles
git add .
git commit -m "Update dotfiles prompts"
```

After the commit, the hook syncs changed prompt files into:

```text
C:\Git\joeden\prompts
```

Then commit the `joeden` repo separately when the mirrored files should be pushed to GitHub.

**Note**: The hook updates the local `joeden` mirror. It does not commit or push the `joeden` repo.


## Validation

After running the sync script, check these items:

- `C:\Git\joeden\prompts\ai\agents` exists.
- `C:\Git\joeden\prompts\ai\skills` exists.
- Other folders under `C:\Git\dotfiles` are mirrored under `C:\Git\joeden\prompts`.
- There is no duplicate nested folder such as `ai\ai`.
- Running the script again with no changes prints `No sync needed`.
- The `post-commit` hook exists at `C:\Git\dotfiles\.git\hooks\post-commit`.
- A commit in `C:\Git\dotfiles` runs the sync script.

:::info

The mirror in `joeden/prompts` is for GitHub visibility. The installed user-level copies under `.copilot`, `.claude`, and `.codex` are still separate local files used by the AI tools.

:::

