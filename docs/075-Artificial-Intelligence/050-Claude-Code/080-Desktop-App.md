---
title: "Claude Code Desktop App"
description: "Using the Claude Code desktop app for local project work"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 80
---


## Overview

The Claude desktop app can run Claude Code sessions for local projects.

It is useful when you want a visual workflow around the same kind of coding tasks that can be handled from the CLI.

The desktop app can help with:

- Starting local or cloud coding sessions.
- Switching between projects and sessions.
- Reviewing agent output and file diffs.
- Previewing a web app while changes are being made.
- Managing permissions, skills, plugins, and connectors.


## Session Setup

Start a new Claude Code session from the desktop app and choose the project folder that should be used.

For a local apps, select the local project folder and choose whether the task should run in the current branch or in a Git worktree.

| Option           | Use When                                             |
| ---------------- | ---------------------------------------------------- |
| Local task       | The work should run on the current machine.          |
| Cloud task       | The work should run in a remote Claude environment.  |
| Same directory   | The task can safely use the active working tree.     |
| Git worktree     | Multiple tasks need isolated copies of the project.  |
| Different branch | The task should work against another branch.         |

**Note**: A Git worktree creates another working directory for the same repository. It is useful when parallel sessions may touch overlapping files.


## Prompt Context

The desktop app supports several ways to provide context before sending a task.

- Reference project files with `@`.
- Attach files or images with the plus button.
- Use slash commands for actions such as compaction.
- Invoke skills when a task should follow a specific workflow.
- Use voice dictation when it is easier to describe the task aloud.

For example, when asking Claude Code to fix the edit note page, attach or reference the edit page file directly so the task starts with the right context.


## Permissions

The desktop app lets you choose how much freedom Claude Code should have during a session.

| Mode                  | Behavior                                                       |
| --------------------- | -------------------------------------------------------------- |
| Ask for permission    | Claude Code asks before making sensitive changes.              |
| Accept edits          | Claude Code can edit files but still asks for some operations. |
| Bypass permissions    | Claude Code runs without stopping for approvals.               |
| Plan mode             | Claude Code prepares a plan before implementation.             |

:::warning

Use bypass permissions carefully. It can be convenient for unattended work, but it also removes an important review step before high-impact actions.

:::


## Preview Mode

Preview mode can show a running web app inside the desktop app.

When preview is used for the first time in a project, Claude Code may create a launch configuration (`launch.json`) so it knows how to start or connect to the development server.

Preview mode can be used to:

- View the app without leaving the desktop app.
- Switch between light and dark mode signals.
- Toggle between desktop and mobile viewport sizes.
- Select page elements and add them as chat context.
- Inspect development server logs.

<!-- For Probably Important, this is helpful when checking layout changes such as note editor width, button styling, and mobile behavior. -->


## Terminal and Logs

The desktop app includes an integrated terminal and session logs.

Use the terminal for normal project commands such as:

```bash
bun run dev
```

Use the logs panel to inspect development server output and runtime errors while the agent is working.


## Diff Review

The diff viewer shows which files changed and what changed inside each file.

Use it before accepting or continuing from a completed task.

The diff viewer also supports line comments. Add a comment on a specific line when the next prompt should refer to an exact change.

For example:

```text
Make this spacing match the new note page.
```

That comment can be sent back to Claude Code as context for a follow-up task.


## Settings

Review the Claude Code settings in the desktop app from time to time.

Useful settings include:

- Appearance and font preferences
- Account and usage information
- Permission behavior
- Worktree storage location
- Preview support
- Whether the app comes to the foreground when input is needed
- Privacy preferences


## Customization

The desktop app also exposes customization options for Claude Code.

Use these settings to manage:

- Skills
- Plugins
- Connectors
- GitHub integration
- Browser or Playwright support

Connectors and plugins can extend the app so Claude Code can work with additional services or tooling.
