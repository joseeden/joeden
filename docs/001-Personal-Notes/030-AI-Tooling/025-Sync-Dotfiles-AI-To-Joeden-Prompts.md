---
title: "Sync dotfiles/ai to joeden/prompts/ai"
sidebar_position: 25
description: "Sync dotfiles/ai to joeden/prompts/ai"
tags: 
- Docusaurus
- Artificial Intelligence
- VS Code
# last_update:
#   date: 06/17/2026
---


## Overview

This KB documents how to mirror portable AI agents and skills files from `dotfiles/ai` into `joeden/prompts/ai`.

The goal is to keep `dotfiles/ai` as the working source while also keeping a GitHub-visible copy inside the `joeden` repo.

The sync should only update `joeden/prompts/ai` when files are added, removed, or changed.


## Folder Purpose

The setup uses two folders.

| Folder                    | Purpose                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `C:\Git\dotfiles\ai`      | Working source for portable AI agents, skills, and scripts.    |
| `C:\Git\joeden\prompts\ai` | GitHub-visible mirror of the agents and skills only.           |

NoteS: 

- "Git" is the VS Code workspace folder, not a Git repository. 
- The `dotfiles` folder is not a Git repo, so it can be used for local work without worrying about commits or history.
- The `joeden` folder is a Git repo, so it is used for the files that should be version controlled and shared on GitHub.


The `dotfiles/ai` folder can include helper scripts.

The `joeden/prompts/ai` folder should contain only the portable agent and skill files that should be committed with the `joeden` repo.


## Current Structure

The source folder contains agents, skills, and scripts:

```text
C:\Git\dotfiles\ai\
  agents\
  scripts\
  skills\
```

The mirror folder contains only agents and skills:

```text
C:\Git\joeden\prompts\ai\
  agents\
  skills\
```

The `scripts` folder is excluded from the mirror.


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
No sync needed. C:\Git\joeden\prompts\ai already matches C:\Git\dotfiles\ai
```


## What Gets Synced

The script syncs these folders:

| Source                         | Destination                         |
| ------------------------------ | ----------------------------------- |
| `C:\Git\dotfiles\ai\agents`    | `C:\Git\joeden\prompts\ai\agents`  |
| `C:\Git\dotfiles\ai\skills`    | `C:\Git\joeden\prompts\ai\skills`  |

The script does not sync:

- `C:\Git\dotfiles\ai\scripts`
- Startup watcher scripts
- Scheduled task installer scripts
- Temporary files


## Why Not Use a Startup Watcher

The sync should not run every time Windows starts.

It should also not keep rewriting `joeden/prompts/ai` when the files are already the same.

A startup watcher is unnecessary for this workflow because:

- It keeps a background process running.
- It can update the mirror too often.
- It can make Git changes harder to understand.
- It is more complex than the workflow needs.

The better behavior is to trigger sync only after `dotfiles/ai` is updated.


## Trigger Options

There are a few practical ways to trigger the sync.

| Trigger      | When to use                                                   |
| ------------ | ------------------------------------------------------------- |
| Manual run   | Best when edits are occasional and explicit control is wanted. |
| Git hook     | Best when `dotfiles` is a local Git repo.                      |
| Editor task  | Best when using VS Code tasks for local automation.            |

Manual run is the simplest setup.

A Git hook is the cleanest automatic setup when `dotfiles` is a Git repo.


## Git Hook Option

If `dotfiles` is a Git repository, the sync can be triggered by a `post-commit` hook.

**EDIT:** I have initialized the directory to be a local Git repository so I can use `post-commit` hook.

In this setup, the repository does not need to have a GitHub remote, since the files will be committed locally and the hook will sync the changes to the `joeden` repo.

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
git add ai
git commit -m "Update AI prompts"
```

After the commit, the hook syncs changed prompt and skill files into:

```text
C:\Git\joeden\prompts\ai
```

Then commit the `joeden` repo separately when the mirrored files should be pushed to GitHub.

**Note**: The hook updates the local `joeden` mirror. It does not commit or push the `joeden` repo.


## Validation

After running the sync script, check these items:

- `C:\Git\joeden\prompts\ai\agents` exists.
- `C:\Git\joeden\prompts\ai\skills` exists.
- Agent files are present in the mirror folder.
- Skill files are present in the mirror folder.
- There is no duplicate nested folder such as `agents\agents`.
- There is no duplicate nested folder such as `skills\skills`.
- Running the script again with no changes prints `No sync needed`.
- The `post-commit` hook exists at `C:\Git\dotfiles\.git\hooks\post-commit`.
- A commit in `C:\Git\dotfiles` runs the sync script.

:::info

The mirror in `joeden/prompts/ai` is for GitHub visibility. The installed user-level copies under `.copilot`, `.claude`, and `.codex` are still separate local files used by the AI tools.

:::
