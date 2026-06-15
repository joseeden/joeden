---
title: "Sandboxing"
description: "Using sandboxing to control and restrict AI tool access in Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 60
--- 


## Overview

A sandbox helps reduce this risks of agents performing unwanted actions or unintended changes by isolating the agent from the rest of the system.

- Limits access to the host system
- Reduces the impact of mistakes
- Protects sensitive files and data
- Makes testing and experimentation safer

Sandboxing does not prevent every issue, but it helps contain problems within a controlled environment.

There are two main approaches to sandboxing AI agents:

| Options             | Description                                 |
| ------------------- | ------------------------------------------- |
| Docker Sandbox      | Runs the agent inside an isolated container |
| Built-In Sandboxing | Uses restrictions provided by the AI tool   |

## Docker Sandbox (Replaced by SBX CLI)

Docker is a common way to run an AI agent in an isolated environment.

- Isolates the project from the host system
- Restricts access to files outside the container
- Allows safer automation
- Helps contain accidental changes

When an agent runs inside a container, its actions are generally limited to the files and resources available within that container.

To run:

```bash
docker sandbox run claude 
```

**UPDATE:** The `docker sandbox` CLI commands have been officially deprecated and replaced by the standalone `sbx` CLI tool. \

See resources below:

- [Docker docs.](https://docs.docker.com/reference/cli/docker/sandbox/)
- [Install sbx cli](https://docs.docker.com/ai/sandboxes/get-started/)
- [Install sbx cli on WSL](/docs/041-Containerization/099-Troubleshooting-Notes/020-Install-Docker-SBX-on-WSL.md)


## Built-In Sandboxing

Claude Code and other AI tools also offer built-in sandboxing features that restrict the agent's access to certain system resources.

Common restrictions include:

- File system access controls
- Command execution restrictions
- Network access limitations
- Permission approval workflows

Built-in sandboxing is often easier to set up and may provide sufficient protection for many development tasks.

Run `claude` and then enable sandboxing:

```bash
/sandbox
```

It will prompt you to choose the sandbox mode:

| Mode                                       | Purpose                                                       | When to Use                                              |
| ------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------------- |
| Sandbox BashTool, with auto-allow          | Runs commands in a sandbox with automatic approvals.          | When you want faster automation with sandbox protection. |
| Sandbox BashTool, with regular permissions | Runs commands in a sandbox and asks for approval when needed. | When you want sandbox protection with more control.      |
| No sandbox (current)                       | Runs commands directly on the host system.                    | When full system access is required.                     |

Once you enable sandboxing, the configuration file (`~/.claude/settings.json`) will be updated with the chosen mode. You can change it later if needed.

```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true
  }
}
```

All future agent sessions will use the sandboxing settings until you change them.

## Typical Workflow

A common workflow is:

1. Enable sandboxing
2. Start the agent session
3. Review proposed changes
4. Approve important actions
5. Validate the final results

Even when sandboxing is enabled, human review is still recommended before applying significant changes.

## Best Practices

The goal of sandboxing is not to eliminate risk completely. The goal is to give agents enough access to be productive while limiting the impact of mistakes.

- Use sandboxing whenever possible
- Review generated changes before accepting them
- Protect secrets and credentials
- Limit unnecessary network access
- Keep backups of important work


