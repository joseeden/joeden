---
title: "Claude Code Remote Workflows"
description: "Using dispatch, remote control, and channels with Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 82
---


## Overview

Claude Code can be controlled from another device when the local machine is running and reachable through a supported workflow.

These workflows are useful when you want to start, continue, or monitor project work while away from the computer.

| Workflow       | Starts From          | Runs On                   | Project Context                         |
| -------------- | -------------------- | ------------------------- | --------------------------------------- |
| Dispatch       | Mobile app           | Desktop app machine       | Must be described in the prompt.        |
| Remote control | Local CLI or session | Local machine             | Attached to the current project folder. |
| Channels       | External channel     | Local Claude Code session | Attached to the session that is running.  |

**Note**: All local remote workflows require the computer to stay on, connected, and running the needed Claude Code or desktop app session.


## Dispatch

Dispatch lets you send tasks from the Claude mobile app to the Claude desktop app on your computer.

Use dispatch when:

- The desktop app is already running.
- You want to start a new task from your phone.
- The task can be described clearly without relying on an existing session.
- You can include the project path or project name in the prompt.

Dispatch can also be used to monitor progress from the mobile app while the task runs on the computer.

Because dispatch is not tied to a specific project by default, include clear location context.

Example:

```text
In the /home/joseeden/Git/project-probably-important folder, update the note editor page so the edit form uses the same width as the new note page.
```

Before using dispatch:

1. Install and sign in to the Claude desktop app.
2. Install and sign in to the Claude mobile app.
3. Enable dispatch in the desktop app.
4. Complete the one-time pairing flow.
5. Keep the computer awake.
6. Keep the desktop app running.

:::warning

If the computer sleeps or the desktop app closes, dispatched work can stop or fail. 

Enable an awake setting when running unattended tasks.

:::


## Remote Control

Remote control lets another device interact with a Claude Code session that is running on the local machine.

Use remote control when:

- The task should stay attached to a specific project folder.
- You want to continue an existing Claude Code session.
- You want the remote device to send prompts to the same local session.
- The task depends on local files, local tools, and project-specific configuration.

Remote control can be started from the CLI.

```bash
claude remote-control
```

It can also be started from inside an active Claude Code session with the remote control slash command.

```text
/remote-control
```

When starting remote control, choose how the task should run.

| Mode           | Use When                                          |
| -------------- | ------------------------------------------------- |
| Same directory | The active working tree should be used directly. |
| Git worktree   | The task should run in an isolated working copy.  |

Remote control is stronger than dispatch when project context matters because the session starts inside the selected project directory.


## Channels

Channels let Claude Code receive messages from an external communication channel.

This can be useful when you want to connect Claude Code to a tool such as Telegram, Slack, WhatsApp, or another custom channel.

The general flow is:

1. Install the channel plugin.
2. Configure the plugin with the required token or credentials.
3. Pair the external channel with Claude Code.
4. Start Claude Code with the channel enabled.
5. Send prompts through the external channel.


## Example: Telegram Channel 

Install the Telegram channel plugin from inside Claude Code.

```text
/plugin install telegram@claude-plugins-official
```

Reload plugins after installation.

```text
/plugin reload
```

Configure the Telegram plugin.

```text
/telegram:configure
```

Create a Telegram bot through *BotFather* and copy the bot token into the Claude Code configuration flow.

After the bot sends a pairing code, pair it with Claude Code.

```text
/telegram:accesspair <pairing-code>
```

Start a Claude Code session with the Telegram channel enabled.

```bash
claude --channels plugin:telegram@claude-plugins-official
```

Messages sent to the Telegram bot are then received by the local Claude Code session.

:::warning

Treat bot tokens as secrets. Do not commit them to the repository and do not paste them into shared logs.

:::


## Practical Uses

Remote workflows are useful for:

- Starting a small fix while away from the desk.
- Continuing an active session from a phone.
- Checking progress on a longer running task.
- Approving permissions remotely when a channel supports it.
- Running project work on a local machine or remote machine that has Claude Code installed.

<!-- For Probably Important, these workflows can help with small follow-up tasks such as layout fixes, documentation updates, and test runs. -->


## Limitations

Keep these limits in mind when using remote workflows:

- The local machine must stay awake.
- The required app or CLI session must keep running.
- Dispatch needs clear project path context.
- Channel setup needs extra credentials and pairing.
- Permissions can block unattended work unless configured ahead of time.

Use the workflow that matches the task:

- Dispatch is good for starting new work quickly.
- Remote control is better for project-attached sessions.
- Channels are best when a custom communication path is needed.
