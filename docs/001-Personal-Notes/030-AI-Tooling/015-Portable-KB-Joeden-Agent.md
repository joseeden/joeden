---
title: "Portable KB Joeden Agent"
sidebar_position: 15
description: "Portable KB Joeden Agent"
tags: 
- Docusaurus
- Artificial Intelligence
- VS Code
# last_update:
#   date: 06/17/2026
---


## Overview

This KB documents the setup for a portable `kb-joeden` writing agent.

The goal is to invoke the same KB writing workflow from different AI assistants in VS Code, across different laptops, Macs, and repositories.

The agent should create KB pages from a topic and optional notes, then place the page in the correct folder under `joeden/docs` when that repository is available.


## Why Repo Instructions Were Not Enough

Repo instruction files are useful when the assistant is already working inside the repo.

Examples include:

- `AGENTS.md`
- `CLAUDE.md`
- `.github/copilot-instructions.md`
- `.agents/KB-Writing-Guide.md`

These files are tied to the repository. They do not create a personal agent that follows the user across machines and workspaces.

For a reusable VS Code-level workflow, use personal customizations instead.


## Recommendation

Use a custom agent for the named persona and a skill for the reusable workflow.

| Piece        | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| Custom agent | Provides the named `kb-joeden` persona in VS Code or Claude. |
| Skill        | Stores the portable KB writing workflow and instructions.    |
| Dotfiles     | Keeps the source copy synced across machines.                |

This keeps the agent easy to invoke and the workflow easy to reuse.


## Source Folder

Keep the source copy outside project repos.

On Windows, the source folder is:

```text
C:\Git\dotfiles\ai\
  agents\
    kb-joeden.agent.md
    kb-joeden.claude.md
  skills\
    kb-joeden\
      SKILL.md
```

This folder can be committed to a dotfiles repo and synced to other machines.

The dotfiles folder is the source of truth.

**Note**: If you have multiple machines, each laptop or Mac still needs installed copies in the user-level folders for the AI tools installed on that machine. Follow this page to copy the source files into the correct user-level folders for each assistant on each machine.


## Installed Files

Install copies into each assistant's user-level folder.

On Windows:

| Tool           | File                                                              |
| -------------- | ----------------------------------------------------------------- |
| GitHub Copilot | `C:\Users\joseeden\.copilot\agents\kb-joeden.agent.md`            |
| GitHub Copilot | `C:\Users\joseeden\.copilot\skills\kb-joeden\SKILL.md`           |
| Claude Code    | `C:\Users\joseeden\.claude\agents\kb-joeden.md`                  |
| Claude Code    | `C:\Users\joseeden\.claude\skills\kb-joeden\SKILL.md`            |
| Codex          | `C:\Users\joseeden\.codex\skills\kb-joeden\SKILL.md`             |

On macOS or Linux, use the same structure under the home directory:

```text
~/.copilot/agents/kb-joeden.agent.md
~/.copilot/skills/kb-joeden/SKILL.md

~/.claude/agents/kb-joeden.md
~/.claude/skills/kb-joeden/SKILL.md

~/.codex/skills/kb-joeden/SKILL.md
```


## Agent Prompt

The agent should use this core behavior:

```text
Create a KB page about the topic provided.

Put it in the correct folder under joeden/docs.

Below are added notes, if any:
```

The full agent instructions should also tell the assistant to:

- Inspect nearby pages in the target folder.
- Match frontmatter style, tags, filename pattern, and sidebar position pattern.
- Read local repo instructions when they exist.
- Use short sections, short paragraphs, clear bullets, and aligned Markdown tables.
- Use Docusaurus admonitions when useful.
- Avoid em dashes.


## Usage

Use the named agent from VS Code when it is available:

```text
@kb-joeden write KB about this conversation
```

Use the skill name directly in Codex when needed:

```text
Use $kb-joeden to create a KB page about debugging Python in VS Code.
```

**Note**: Invocation syntax can vary by assistant. The important part is that the personal agent and skill files are installed in the user-level folders for that tool.


## Maintenance

Update the source copy first:

```text
C:\Git\dotfiles\ai\
```

Then copy the updated files into the user-level folders for Copilot, Claude Code, and Codex.

This keeps the dotfiles repo as the source of truth and keeps installed assistant files in sync.

For a new machine, clone or sync the dotfiles repo first.

Then install the files into that machine's local AI assistant folders.

The recommended practical setup is to keep a small install script in the dotfiles repo.

On macOS or Linux, the script could be:

```bash
./ai/install-kb-joeden.sh
```

On Windows, the script could be:

```powershell
.\ai\install-kb-joeden.ps1
```

The script should create the required folders and copy the source files into the local user-level assistant folders.

**Note**: Copying is simpler than symlinking across Windows, macOS, synced folders, and different assistant tools.


## Validation

After creating or updating the portable agent, check these items:

- The source files exist under `C:\Git\dotfiles\ai`.
- The installed user-level files exist for each assistant.
- The skill frontmatter has `name: kb-joeden`.
- The agent frontmatter uses the `kb-joeden` name.
- The assistant can see the agent or skill after restarting the session if needed.
- The `joeden` repo is open or accessible when the agent needs to write under `joeden/docs`.

:::info

The portable agent can follow the user across machines, but it can only edit repositories that the active assistant can access in the current workspace or approved file system scope.

:::
