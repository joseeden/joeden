---
title: "Portable Repo Explainer Agent"
sidebar_position: 20
description: "Portable Repo Explainer Agent"
tags: 
- Docusaurus
- Artificial Intelligence
- VS Code
# last_update:
#   date: 06/17/2026
---


## Overview

This KB documents the setup for a portable `repo-explainer` agent.

The goal is to analyze any repository from the perspective of a developer who just discovered it.

The agent should explain what the repository does, why it likely exists, how the main parts work together, what technologies it demonstrates, and whether it is useful for a technical portfolio.


## Purpose

The `repo-explainer` agent is not tied to one repository.

It is designed to work across different repos, laptops, Macs, and VS Code workspaces.

Use it when you want a plain-English explanation of a project that goes beyond summarizing files.

The agent should infer:

- The author's likely intent.
- The target audience.
- The expected use case.
- The practical purpose of the project.
- The real-world or enterprise equivalent, if one applies.


## Recommendation

Use a custom agent for the named persona and a skill for the reusable workflow.

| Piece        | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| Custom agent | Provides the named `repo-explainer` persona in VS Code.   |
| Skill        | Stores the reusable repository analysis workflow.         |
| Dotfiles     | Keeps the source copy synced across machines.             |

This follows the same pattern as the portable `kb-joeden-docs-writer` agent.


## Source Folder

Keep the source copy in the personal dotfiles folder.

On Windows, my VS Code workspace is a folder named "Git" and the source root is:

```text
C:\Git\dotfiles\
  ai\
    agents\
      repo-explainer.agent.md
      repo-explainer.claude.md
    skills\
      repo-explainer\
        SKILL.md
```

For GitHub Copilot, the repo-scoped copies are in the `.github` folder:

```text
C:\Git\dotfiles\.github\
  copilot-instructions.md
  agents\
    repo-explainer.agent.md
```

The dotfiles folder is the source of truth.

**Note**: Each laptop or Mac still needs installed copies or repo-scoped copies for the AI tools used on that machine.


## Installed Files

Install copies into each assistant's supported location.

On Windows:

| Tool           | File                                                            |
| -------------- | --------------------------------------------------------------- |
| GitHub Copilot | `<repo>\.github\agents\repo-explainer.agent.md`                |
| GitHub Copilot | `<repo>\.github\copilot-instructions.md`                       |
| Claude Code    | `C:\Users\joseeden\.claude\agents\repo-explainer.md`          |
| Claude Code    | `C:\Users\joseeden\.claude\skills\repo-explainer\SKILL.md`    |
| Codex          | `C:\Users\joseeden\.codex\skills\repo-explainer\SKILL.md`     |

On macOS or Linux, use the same repo-scoped Copilot paths and the same user-level structure under the home directory for Claude Code and Codex:

```text
<repo>/.github/agents/repo-explainer.agent.md
<repo>/.github/copilot-instructions.md

~/.claude/agents/repo-explainer.md
~/.claude/skills/repo-explainer/SKILL.md

~/.codex/skills/repo-explainer/SKILL.md
```

**Note**: Copilot does not normally read Codex skill files from `~/.codex`. It uses repository instructions such as `.github/copilot-instructions.md` and custom agents such as `.github/agents/*.agent.md`.


## Agent Prompt

The agent should use this core behavior:

```text
Analyze this repository and explain it from the perspective of a developer who just discovered it.

Keep the explanations simple and practical.

Do not just describe the code. Try to infer the author's intent, the target audience, the expected use case, and the practical purpose of the project.
```

The full agent instructions should also tell the assistant to explain:

- What the repository does.
- What problem it is trying to solve.
- The main workflow and how the components work together.
- A short and simple KB page title.
- A short `Overview` section written in plain English.
- Why the author likely created the repository.
- How the author likely intended the repository to be used.
- Whether it is solving a real problem, demonstrating a concept, automating a task, or serving as a learning project.
- The real-world or enterprise equivalent, if applicable.
- Whether it is a simple lab, proof of concept, learning project, portfolio project, or production-style project.
- Whether it is worth adding to a technical portfolio and why.
- The main technologies, tools, frameworks, and concepts demonstrated.
- The key things someone would learn by studying the repository.


## Usage

Use the named agent from VS Code when it is available:

```text
@repo-explainer analyze this repository
```

For GitHub Copilot, select or invoke the `repo-explainer` custom agent when the target repository contains:

```text
.github/agents/repo-explainer.agent.md
```

Use the skill name directly in Codex when needed:

```text
Use $repo-explainer to analyze this repository.
```

**Note**: The `repo-explainer` agent analyzes the active repository or the repository that the assistant can access in the current workspace.


## Maintenance

Update the source copy first:

```text
C:\Git\dotfiles\
```

Then copy the updated files into the supported locations for Copilot, Claude Code, and Codex.

For a new machine, clone or sync the dotfiles repo first.

Then install the files into that machine's local AI assistant folders, and copy the Copilot files into the repository where Copilot should use them.

Copying is the simplest approach across Windows, macOS, synced folders, and different assistant tools.


## Validation

After creating or updating the portable agent, check these items:

- The source root exists at `C:\Git\dotfiles`.
- The agent files exist under `C:\Git\dotfiles\ai`.
- The Copilot files exist under the target repo's `.github` folder.
- The installed user-level files exist for Claude Code and Codex.
- The skill frontmatter has `name: repo-explainer`.
- The agent frontmatter uses the `repo-explainer` name.
- The assistant can see the agent or skill after restarting the session if needed.
- The target repository is open or accessible when the agent needs to analyze it.

:::info

The portable agent can follow the user across machines, but it can only inspect repositories that the active assistant can access in the current workspace or approved file system scope.

:::
