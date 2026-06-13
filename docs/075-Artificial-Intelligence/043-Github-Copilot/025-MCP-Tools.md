---
title: "MCP Tools"
description: "Using Model Context Protocol tools with GitHub Copilot"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
- Github Copilot
sidebar_position: 25
--- 

## Overview

**Model Context Protocol**, or **MCP**, lets GitHub Copilot work with systems outside the editor.

- It connects Copilot to external tools
- It uses a standard way to expose those tools
- It is commonly used through MCP servers

With MCP, Copilot can inspect data, call services, and support actions that would otherwise need separate integrations.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09223447.png)

</div>

## How MCP Works

In VS Code, the editor acts as the MCP client. Copilot sends a request through that client to an MCP server, and the server sends the result back into chat.

<div class='img-center'>

![](/img/docs/all-things-ai-gh-copilot-mcp.png)

</div>

Copilot does not need a custom connection for every service because MCP provides a common bridge between the chat experience and the external tool.

## Security Considerations

MCP servers can do more than read information. Some tools can change files, update databases, or trigger actions in external systems, so they should be used carefully.

- Review what a tool is about to do.
- Use servers from trusted sources.
- Be cautious with tools that can make changes.
- Confirm sensitive actions before proceeding.

The practical rule is simple: MCP is powerful, and that power requires judgment. Install only the servers you trust, and pay attention to the actions a tool may perform before you approve it.

<!-- ## Using an MCP Server

If you haven't done yet, install the [Azure MCP Server extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azure-mcp-server) in VS Code. This will provide a set of tools that can be used directly from Copilot.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09224329.png)

</div>


After installation, the server appears with your available chat tools and can be used directly from Copilot.

- Open the MCP Registry in VS Code.
- Browse the available servers.
- Install the server you want.
- Check the Chat tools list after installation.
- Use the tool in a prompt when needed.

You can also reference a tool directly in chat by using its name in the prompt. That gives you more control when you want Copilot to use a specific tool instead of choosing one on its own. -->