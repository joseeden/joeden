---
title: "Rename Portable AI Agents"
sidebar_position: 30
description: "Rename Portable AI Agents"
tags: 
- Docusaurus
- Artificial Intelligence
- VS Code
# last_update:
#   date: 06/17/2026
---


## Overview

This KB documents how to update or rename portable AI agents.

The goal is to rename an agent cleanly across the following:

- Source files
- Mirrored GitHub-visible files
- Installed user-level files
- Documentation

This avoids a half-renamed setup where one assistant still sees the old name.


## Current Agent Names

This change was done on the current agents as of June 2026. There may be more agents added in the future, so this process should be followed for any new agent names as well. 

The portable agents use descriptive names.

| Agent Name                  | Purpose                                  |
| --------------------------- | ---------------------------------------- |
| `kb-joeden-docs-writer`     | Writes Joeden-style KB pages in `docs/`. |
| `kb-readme-writer`          | Creates or updates repo README files.    |
| `repo-explainer`            | Explains a repository for developers.    |


## Source Files

The source of truth is:

```text
C:\Git\dotfiles\ai
```

When renaming an agent, update these source paths.

| Item          | Path Pattern                                             |
| ------------- | -------------------------------------------------------- |
| Copilot agent | `C:\Git\dotfiles\ai\agents\<agent-name>.agent.md`        |
| Claude agent  | `C:\Git\dotfiles\ai\agents\<agent-name>.claude.md`       |
| Skill folder  | `C:\Git\dotfiles\ai\skills\<agent-name>\`                |
| Skill file    | `C:\Git\dotfiles\ai\skills\<agent-name>\SKILL.md`        |

Inside each file, update:

- The `name:` frontmatter value.
- The heading when it uses the old agent name.
- Any prompt text that says `You are <old-agent-name>`.
- Any examples that use `@old-agent-name`.
- Any examples that use `$old-agent-name`.


## Mirrored Files

This part is actually optional, I only mirrored the agent and skill files to the **joeden** repo since that repo is commited in Github and visible to the public, while the **dotfiles** repo is private and doesn't have a remote origin, meaning it doesn't have a Github repo. 

The GitHub-visible mirror that is used is:

```text
C:\Git\joeden\prompts\ai
```

This mirror should match the agent and skill files from `dotfiles/ai`, except for helper scripts.

After renaming source files, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Git\dotfiles\ai\scripts\sync-to-joeden.ps1
```

The sync should add the new file paths and remove stale old file paths.

Check these mirror paths:

| Item          | Path Pattern                                             |
| ------------- | -------------------------------------------------------- |
| Copilot agent | `C:\Git\joeden\prompts\ai\agents\<agent-name>.agent.md`  |
| Claude agent  | `C:\Git\joeden\prompts\ai\agents\<agent-name>.claude.md` |
| Skill folder  | `C:\Git\joeden\prompts\ai\skills\<agent-name>\`          |
| Skill file    | `C:\Git\joeden\prompts\ai\skills\<agent-name>\SKILL.md`  |


## Installed Files

Each assistant also has user-level installed copies.

Renaming the source and mirror is not enough.

Install the new names and remove the old names from these folders.

| Tool           | Path Pattern                                                    |
| -------------- | --------------------------------------------------------------- |
| GitHub Copilot | `C:\Users\joseeden\.copilot\agents\<agent-name>.agent.md`       |
| GitHub Copilot | `C:\Users\joseeden\.copilot\skills\<agent-name>\SKILL.md`       |
| Claude Code    | `C:\Users\joseeden\.claude\agents\<agent-name>.md`              |
| Claude Code    | `C:\Users\joseeden\.claude\skills\<agent-name>\SKILL.md`        |
| Codex          | `C:\Users\joseeden\.codex\skills\<agent-name>\SKILL.md`         |

Remove old installed paths after the new ones are copied.

This prevents assistants from showing both the old and new agent names.


## Documentation Files

Update any KB pages that reference the old agent name.

Common documentation paths include:

```text
C:\Git\joeden\docs\001-Personal-Notes\030-AI-Tooling
```

Check for old names in:

- Page titles.
- File names.
- Frontmatter `title`.
- Frontmatter `description`.
- Agent install tables.
- Usage examples with `@agent-name`.
- Usage examples with `$agent-name`.
- Validation checklists.


## Search Checks

Use `rg` to find old names before and after the rename.

Example:

```powershell
rg "old-agent-name" C:\Git\dotfiles\ai C:\Git\joeden\prompts\ai C:\Git\joeden\docs\001-Personal-Notes\030-AI-Tooling
```

Search installed folders too when checking user-level copies:

```powershell
rg "old-agent-name" C:\Users\joseeden\.copilot C:\Users\joseeden\.claude C:\Users\joseeden\.codex
```

**Note**: Some old names may appear in historical notes. Remove or update them when they would confuse future usage.


## Validation

After renaming an agent, check these items:

- Source agent files use the new file names.
- Source skill folders use the new folder names.
- `SKILL.md` frontmatter uses the new `name:`.
- Agent frontmatter uses the new `name:`.
- `joeden/prompts/ai` has the new mirrored files.
- `joeden/prompts/ai` does not have stale old mirrored files.
- User-level Copilot files use the new names.
- User-level Claude files use the new names.
- User-level Codex skill folders use the new names.
- Old installed paths are removed.
- AI Tooling KB pages reference the new names.
- Usage examples use the new `@agent-name` and `$agent-name`.

:::info

After renaming installed agents or skills, restart the assistant session or VS Code if the old name still appears in the UI.

:::

