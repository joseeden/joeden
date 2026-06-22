---
title: "Plugins"
description: "Using plugins in Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 48
--- 

## Overview

Plugins are a way to package and install Claude Code capabilities without setting up every piece manually.

A plugin can bundle features such as:

- Skills
- Commands
- MCP servers
- Other Claude Code configuration

This makes plugins useful when a team wants to share a repeatable setup or when a user wants to install a capability from a marketplace.

## Plugin Marketplace

Claude Code plugins are managed from the `/plugin` command.

```bash
/plugin
```

The plugin interface includes areas for discovering, installing, and reviewing plugins. The marketplace view shows available plugins from the marketplaces that are enabled on your machine.

By default, Claude Code includes the official marketplace maintained by Anthropic. Additional marketplaces can also be added, which is useful for company-internal plugin sharing.

:::info

The available plugin list can change over time as marketplaces add, remove, or update plugins.

:::

## Installing Plugins

When installing a plugin, choose the scope based on who should use it and where it should be available.

| Scope       | Use For                                                     |
| ----------- | ----------------------------------------------------------- |
| **User**    | Personal tools that should work across your projects.       |
| **Project** | Shared tools that should be checked into version control.   |
| **Local**   | Project-specific tools that should not be shared with Git.  |

For example, a browser automation plugin may make sense at user scope if you use it across many projects.

A TypeScript helper plugin may make more sense at project scope when the repository is a TypeScript project and the whole team benefits from the same setup.

## Plugins and MCP

Plugins can include MCP servers, and some MCP installations may appear in the installed plugins list.

For example, a Playwright plugin may install browser access as an MCP server behind the scenes. A separately installed MCP server may also be shown in the plugin interface because Claude Code treats MCP-based capabilities as part of the same extension system.

**Note**: A plugin is often the easier installation path, but it is still useful to understand MCP directly when you need to configure servers, transports, scopes, and credentials.

## Common Examples

Plugins are most helpful when they add capabilities that would otherwise require manual setup.

Common examples include:

- Browser access through Playwright
- TypeScript language support
- External tool access through MCP
- Shared project commands and workflows
- Reusable skills for team conventions

## When To Use Plugins

Use plugins when you want a capability to be easy to install, update, and share.

Plugins are a good fit for:

- Reusing the same setup across projects
- Sharing tools with a team
- Installing marketplace capabilities quickly
- Bundling skills, commands, and MCP servers together

Manual setup is still useful when you need tight control over individual files or when you are experimenting with a small configuration before packaging it.

