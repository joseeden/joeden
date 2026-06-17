---
title: "Block Remote Publishing for Local Repos"
description: "Block Remote Publishing for Local Repos"
tags: 
- Version Control
- Git
- GitHub
- Software Development
- VS Code
sidebar_position: 21
# last_update:
#   date: 06/17/2026
---


## Overview

This KB documents how to keep a local Git repository from being accidentally published to GitHub.

This is useful for a repo such as:

```text
C:\Git\dotfiles
```

The goal is to keep the repo local while still allowing normal local Git features such as commits, diffs, branches, and hooks.


## Problem

When a local Git repository has no `origin` remote, tools such as VS Code may show a **Publish Branch** action.

That action can create a new GitHub repository if it is clicked.

For a private local-only repo, that is not the desired behavior.

:::warning

A Git hook can block a normal `git push`, but it may not stop an editor or GitHub tool from creating a remote repository before the push happens.

:::


## Recommendation

Add a deliberately invalid `origin` remote.

This makes Git and editor tooling treat the repo as already having a remote, while normal push attempts fail.

Run this inside the local-only repo:

```powershell
cd C:\Git\dotfiles
git remote add origin DISABLED_LOCAL_ONLY
git config remote.origin.pushurl DISABLED_LOCAL_ONLY
```

Check the result:

```powershell
git remote -v
```

Expected shape:

```text
origin  DISABLED_LOCAL_ONLY (fetch)
origin  DISABLED_LOCAL_ONLY (push)
```

**Note**: The remote name is still `origin` on purpose. Many tools use the missing `origin` remote as the signal to offer a publish flow.


## Extra Push Block

Add a local `pre-push` hook as a second guard.

Create this file:

```text
C:\Git\dotfiles\.git\hooks\pre-push
```

Use this content:

```sh
#!/bin/sh

echo "Push is disabled for this local-only dotfiles repo." >&2
exit 1
```

This blocks normal push commands:

```powershell
git push
```

Expected result:

```text
Push is disabled for this local-only dotfiles repo.
```


## What Each Guard Does

| Guard                 | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| Fake `origin` remote  | Hides or avoids the publish flow in editor tooling.    |
| Fake `pushurl`        | Makes the configured push destination invalid.         |
| `pre-push` hook       | Blocks normal Git push commands from this local clone. |
| No GitHub repo        | Keeps the private local repo out of GitHub.            |


## When to Use This

Use this setup when:

- The repo should stay local-only.
- The repo needs local Git history.
- The repo should not create a GitHub repository by accident.
- The repo uses Git hooks for local automation.

Do not use this setup when:

- The repo should be pushed to GitHub later.
- The repo needs to collaborate with another machine through a remote.
- The invalid `origin` would confuse an existing automation script.


## Undo

If the repo should be published later, remove the fake remote and the hook.

```powershell
cd C:\Git\dotfiles
git remote remove origin
Remove-Item .git\hooks\pre-push
```

Then add the real remote:

```powershell
git remote add origin https://github.com/<owner>/<repo>.git
```


## Validation

After setting this up, check these items:

- `git remote -v` shows `origin` with `DISABLED_LOCAL_ONLY`.
- VS Code no longer treats the repo as missing a remote.
- `git push` fails instead of publishing anything.
- The local repo can still commit changes.
- The local repo can still run local Git hooks.
- No GitHub repository is created for the local-only repo.

