---
title: "Starter Notes"
description: "Starter Notes on Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 10
--- 


## The Dive In Problem

Asking Claude to build something immediately without context leads to weak or inconsistent results. The model has to guess the structure, which often creates incorrect patterns.

Claude works best when it understands the project before generating anything. 

## Structured Workflow

A simple workflow improves results by guiding Claude through the task step by step.

1. Initialize the project
2. Explore the codebase
3. Plan before coding
4. Review the plan
5. Write code after review
6. Test the changes and iterate

This approach helps ensure the output aligns with existing structure instead of introducing random or conflicting changes.

## Project Memory with `CLAUDE.md`

Claude can store project context in a file called `CLAUDE.md`. This file helps it remember structure, rules, and conventions across sessions. This removes the need to repeatedly explain the same setup.

To initialize it:

```bash
/init
```

Claude scans the project and generates the file automatically based on the existing codebase.


## Plan Mode

**Plan Mode** forces Claude to think before writing code. It reviews the project and creates a structured plan first.

To swithch to plan mode, use the shortcut `Shift + Tab` or type:

```bash
/plan 
```

Then enter your prompt. For example:

```bash
How to add a new authentication method to the system?
```

If you skip planning, Claude may generate code immediately without understanding the full context. This can result to a working solution that does not match the project design.

## Levels of Thinking

Adding `think` to a prompt encourages deeper reasoning before responding. This helps Claude produce more thoughtful and structured responses.

Sample prompt:

```bash
think how to optimize the database query for better performance?
```

There are four levels of thinking:

| Command        | Reasoning Depth         |
| -------------- | ----------------------- |
| `think`        | Basic reasoning         |
| `think more`   | Extended analysis       |
| `think a lot`  | Comprehensive reasoning |
| `think longer` | Extended time reasoning |
| `ultrathink  ` | Maximum reasoning depth |


## Context Window Limits

Claude has a limited memory for each session. When this limit is reached, older context may be dropped. Keep sessions focused to maintain better output quality. 

To clear the context and start fresh, use:

```bash
/clear
```

<div class='img-center'>

![](/img/docs/Screenshot2026-05-24012347.png)

</div>

