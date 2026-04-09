---
title: "Guiding with Context"
description: "Starter Notes on AI Copilot"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 10
--- 

## Overview

Copilot works best when it understands your code and your intent.

- Better context gives better results
- Less context leads to weak or wrong code
- You control what Copilot can see

Your IDE already provides some context automatically, but you can add more when needed.

- Active file is included automatically
- Selected code is included automatically
- Files and folders can be added manually

You can drag files into chat or use **Add Context** (`+` button) to include more details. 

<div class='img-center'>

![](/gif/docs/09042026-gh-copilot-adding-context.gif)

</div>


## Using Chat Variables

Chat variables help you control exactly what Copilot looks at.

| Variable     | Description                         | When to use it                            |
| ------------ | ----------------------------------- | ----------------------------------------- |
| `#codebase`  | Searches across the whole project   | When you need full project context        |
| `#selection` | Uses highlighted code in the editor | When working on a specific code block     |
| `#files`     | Includes specific files             | When analyzing or reviewing certain files |
| `#changes`   | Looks at recent edits or commits    | When checking impact of recent changes    |
| `#fetch`     | Pulls content from external URLs    | When using docs, APIs, or web references  |

When you use these variables in your prompts, Copilot will look at the indexes and content you specify to generate more relevant and accurate code. There are two types of indices:

| Index Type    | Description |
| ------------- | ----------- |
| Local index   | Stored on your machine, includes your code and files |
| Remote index  | Used for GitHub repositories, includes code and files from the repo |

You can check which index is active in the Copilot status dashboard in your IDE. 

<div class='img-center'>

![](/img/docs/Screenshot2026-04-0974615.png)

</div>

### `#codebase`

As an example, you can use `#codebase` to ask about FastAPI is used in the selected Python project and it will return all relevant files and functions across the project that involve FastAPI.

<div class='img-center'>

![](/gif/docs/09042026-gh-copilot-codebase-chat-var.gif)

</div>

Behind the scenes, Copilot is searching through your local and remote indexes to find relevant code snippets that match your query. This allows you to get a comprehensive view of how a particular pattern is used throughout your codebase without having to manually search for it.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09174344.png)

</div>


### `#selection`

The `#selection` variable focuses on highlighted code in your editor. In the example below, a function is selected and passed to Copilot.

```python
def process_data(data):
    return data
```

Then you ask:

```bash
Can you refactor this? #selection
```

Expected result:

```python
def process_data(data):
    if data is None:
        raise ValueError("Data cannot be None")
    return data
```

This is useful for quick and targeted improvements.

## Using #files

The `#files` variable lets you include specific files in your prompt.

In the example below, the file `utils/data_loader.py` is referenced.

```bash
Check this file for error handling issues #files:utils/data_loader.py
```

Expected result:

Copilot reviews the file and suggests improvements even if it is not open.

This helps when working with multiple files without switching tabs.

## Using #changes

The `#changes` variable looks at your recent edits.

In the example below, you ask Copilot to review recent modifications.

```bash
Will any of these changes break the login flow? #changes
```

Expected result:

Copilot analyzes recent commits or edits and highlights potential issues.

This is useful for quick validation after making changes.

## Using #fetch

The `#fetch` variable pulls in external content like documentation.

In the example below, a URL is provided.

```bash
Summarize this documentation #fetch https://example.com/docs
```

Expected result:

Copilot reads the page and summarizes key points.

This helps when working with APIs or external references.

## How Copilot understands your codebase

Copilot uses indexes to understand your project.

- Local index is stored on your machine
- Remote index is used for GitHub repositories

You can check which one is active using the Copilot status dashboard in your IDE.

Understanding this helps you know how Copilot retrieves context.

## Using chat history as context

Copilot remembers your previous messages in a chat.

- Past prompts are included automatically
- You can build step by step
- You avoid repeating information

This allows you to create better solutions over time instead of doing everything in one prompt.

## Building step by step prompts

Breaking tasks into smaller steps improves results.

- Ask for approach first
- Then implement step by step
- Then refine and improve

In the example below, a complex task is broken into smaller prompts.

```bash
What is the best approach for database persistence? #codebase
```

```bash
Implement the database connection
```

```bash
Design schema for User and Task classes
```

```bash
Add session management and error handling
```

Expected result:

Each step builds on the previous one, leading to better and more controlled output.

This makes complex tasks easier and more accurate.

## Resetting context

Sometimes you need a clean start.

- Start a new chat to reset context

This removes previous history and avoids confusion.

## Final takeaway

Copilot becomes much more powerful when you manage context properly.

- Give clear and relevant context
- Use chat variables intentionally
- Build solutions step by step

Better context leads to better results, which makes Copilot a more reliable coding assistant.
