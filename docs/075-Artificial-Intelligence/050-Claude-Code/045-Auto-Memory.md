---
title: "Auto Memory"
description: "Using Auto Memory in Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 45
--- 

## Overview

Auto Memory is a Claude Code feature that lets Claude save useful project information automatically.

It is related to `CLAUDE.md`, but it has a different purpose. `CLAUDE.md` is where you write permanent instructions yourself. Auto Memory is where Claude Code stores information it thinks may help future sessions.

**Note**: Auto Memory was added in Claude Code version `2.1.59`.

## How It Works

Claude Code can learn from repeated corrections, important instructions, and project-specific details.

For example, it may store:

- Code style preferences
- Repeated mistakes you corrected
- Project-specific implementation details
- Instructions that seem useful across sessions
- Patterns Claude should remember for future work

This helps Claude Code avoid rediscovering the same information every time a new session starts.

## Where Memory Is Stored

Claude Code stores Auto Memory files outside the project folder.

The global memory path uses this structure:

```bash
~/.claude/projects/<project>/memory/
```

The main memory file is:

```bash
MEMORY.md
```

Claude Code may also create topic-specific memory files in the same project memory folder.

```text
~/.claude/projects/<project>/memory/
├── MEMORY.md
├── coding-style.md
└── troubleshooting.md
```

## What Gets Loaded

Claude Code loads memory automatically when a new conversation or session starts.

| File content                  | When Claude loads it              |
| ----------------------------- | --------------------------------- |
| First 200 lines of `MEMORY.md` | Every new conversation            |
| Full memory files             | Every new Claude Code session     |
| Topic-specific memory files   | When they belong to that project  |

The memory files should stay concise. Short memory files are easier for Claude Code to load and use without wasting context.

## Manage Auto Memory

Use the `/memory` command inside Claude Code to manage Auto Memory.

```bash
/memory
```

This command lets you:

- Enable Auto Memory
- Disable Auto Memory
- Configure how memory is used
- Browse project memory files
- Edit existing memory files

## Auto Memory vs CLAUDE.md

Auto Memory is helpful, but it should not replace a clear `CLAUDE.md` file.

| Use this       | When                                      |
| -------------- | ----------------------------------------- |
| `CLAUDE.md`    | You already know the instruction matters. |
| Auto Memory    | Claude learns something from your work.   |
| `/memory`      | You want to inspect or adjust memory.     |

Put known requirements in `CLAUDE.md` yourself. Do not wait for Claude Code to memorize important instructions automatically.

:::tip

Use Auto Memory as an extra layer, not the primary source of project instructions.

:::

## Good Use Cases

Auto Memory is useful for lightweight project habits and recurring corrections.

- Remembering a preferred code style
- Remembering a common project-specific command
- Remembering a past mistake that should not be repeated
- Remembering a naming convention used in the project
- Remembering a framework-specific preference

## When To Use CLAUDE.md Instead

Use `CLAUDE.md` when an instruction is important, explicit, and expected to apply across all sessions.

Good examples include:

- Required test commands
- Required build commands
- Project architecture rules
- Security rules
- Files that should not be edited
- Team conventions that must always be followed

**Note**: If the instruction is important enough that Claude must always follow it, write it in `CLAUDE.md`.
