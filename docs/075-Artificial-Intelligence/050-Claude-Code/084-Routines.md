---
title: "Claude Code Routines"
description: "Scheduled Claude Code tasks and routines"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 84
---


## Overview

Claude Code routines are scheduled tasks that run from a saved prompt.

They are useful for repeated project maintenance work, such as summarizing changes, checking project health, or preparing reports.

In the desktop app, scheduled tasks are called routines. In the CLI, scheduled remote tasks can be created with the schedule command.


## Common Uses

Use routines for tasks that should run regularly.

- Summarize recent changes into a Markdown file.
- Review open work and create a project status note.
- Run checks and report failures.
- Inspect recent commits and prepare a short changelog.
- Update documentation based on completed work.

<!-- For Probably Important, a routine could create a short summary of recent app changes after each work session. -->


## Desktop App Routines

The desktop app can create local or remote routines.

When creating a routine, choose:

- The project folder.
- The task prompt.
- The schedule.
- The model and reasoning effort.
- The permission mode.
- The branch or worktree behavior.

Example routine prompt:

```text
Analyze the recent changes in the project "Probably Important" and create a summary.md file with the main updates, risks, and suggested next steps.
```


## Schedule Options

Use a schedule that matches the task.

| Schedule      | Good For                                      |
| ------------- | --------------------------------------------- |
| Daily         | Short project summaries and health checks.    |
| Weekdays      | Workday status reports.                       |
| Weekly        | Changelogs, cleanup review, and planning.     |
| Custom time   | Tasks that should run before or after work.   |

**Note**: Use clear routine titles so scheduled tasks are easy to review later.


## CLI Schedule

The CLI can create scheduled tasks with this command.

```text
/schedule
```

The command can guide you through creating, viewing, running, and updating scheduled triggers.

You can also start with a short description.

```text
/schedule summarize key changes in a summary.md file
```

Scheduled CLI tasks may require a GitHub repository URL when they run remotely.

:::warning

Make sure the remote environment has access to the repository and any required secrets before depending on a scheduled task.

:::


## Permissions

Routines can fail if they stop for permission prompts while unattended.

Choose permissions based on risk.

| Permission Choice  | Use When                                              |
| ------------------ | ----------------------------------------------------- |
| Ask first          | The routine may touch sensitive files or settings.    |
| Accept edits       | The routine should make normal file changes.          |
| Bypass permissions | The routine must finish without manual approval.     |

:::warning

Bypass permissions can be useful for unattended routines, but it should only be used for well-scoped prompts and trusted project folders.

:::


## Good Routine Prompts

Write routine prompts that are specific and bounded.

Good prompts include:

- The project name.
- The files or folders to inspect.
- The output file to create or update.
- The checks to run.
- The format of the final summary.
- Any actions that should be avoided.

Example:

```text
In the project "Probably Important", review changes from the last 24 hours. Create docs/dev-summary.md with a short summary, notable risks, and commands that should be run next. Do not modify application code.
```


## Safety Checklist

Before enabling a routine:

1. Confirm the prompt is specific.
2. Confirm the target project is correct.
3. Confirm the schedule is not too frequent.
4. Confirm the permission mode matches the risk.
5. Confirm the output path is safe.
6. Confirm required tokens and environment variables are available.

Start with low-risk documentation or summary tasks before using routines for code changes.
