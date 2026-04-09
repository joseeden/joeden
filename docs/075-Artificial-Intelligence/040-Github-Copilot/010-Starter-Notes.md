---
title: "Github Copilot"
id: github-copilot-starter-notes
description: "Starter Notes on AI Copilot"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
- Github Copilot
sidebar_position: 10
--- 

## Overview

GitHub Copilot is an AI coding assistant that helps you write, understand, and improve code using natural language.

- Suggests code while you type
- Understands comments and prompts
- Helps refactor and debug code

There are two ways to use Copilot:

- Using autocomplete
- Using it like a coding partner

When used properly, Copilot can handle many development tasks.

- Explain complex or legacy code
- Refactor code across files
- Debug errors and suggest fixes
- Write test cases
- Assist with CI/CD and deployment

It becomes a powerful tool when you guide it with clear and structured input.
<div class='img-center'>

![](/img/docs/Screenshot2026-04-09121454.png)

</div>

## Using Copilot as Autocomplete

Some developers treat Copilot as a simple autocomplete tool.

- Write a comment
- Press tab to accept suggestions
- Repeat the process

In the example below, a simple comment is used as a prompt.

```python
# function to calculate sum of two numbers
```

Expected result:

```python
def sum(a, b):
    return a + b
```

This works well for simple and repetitive code, but it starts to break down for more complex tasks.

## Problem with Vague Prompts

When prompts are unclear, Copilot struggles to give good results.

- It loses track of context
- It adds features that were not requested
- It produces inconsistent code
- It increases debugging time

For example, a vague prompt like this:

```python
Add authentication
```

Expected result may vary and often becomes messy or incomplete.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09121204.png)

</div>


## Using Copilot as a Coding Partner

A better approach is to treat Copilot like a junior developer.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09121310.png)

</div>

In the example below, the prompt includes clear intent and constraints.

```python
# create a function validate_user_input that checks if age is above 18 and email contains '@'
```

Expected result:

```python
def validate_user_input(age, email):
    return age > 18 and "@" in email
```

This approach leads to more accurate and useful code suggestions, as Copilot has a clearer understanding of the task at hand.

## Github Copilot Modes 

GitHub Copilot can be used in different parts of Visual Studio Code, including the editor, the chat panel, the terminal, and source control views. It's basically anywhere you can see the "sparkle" icon.

<div class='img-center'>

![](/img/docs/all-things-ai-gh-copilot.png)

</div>

In practice, the main modes you will use most often are:

- Autocomplete
- Inline Chat
- Ask Mode
- Edit Mode (Replaced by Plan Mode)
- Agent Mode

### Autocomplete and Inline Chat

**Autocomplete** works directly in the editor while you write code. 

**Inline Chat** also works in the editor, but it is better when you want to modify an existing block of code.

- Use Autocomplete for quick suggestions while typing
- Use Inline Chat for focused changes in a selected block

To accept suggestions, simply click the tab key. You can also cycle through multiple suggestions with `Ctrl + ]` and `Ctrl + [`.

To trigger Inline Chat, select a block of code and click the sparkle icon, then **Modify**

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09122433.png)

</div>

This opens the chat panel where you can give instructions to modify the selected code block. 

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09122625.png)

</div>

Copilot will generate a response that modifies the code block according to your instructions. You can review the changes and accept or reject them as needed.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09122708.png)

</div>

This mode works best for small updates, missing logic, bug fixes, and local refactoring.

### Ask Mode

Ask Mode is useful when you want guidance before making changes. It helps you think through a problem without directly modifying your code.

- Plan application architecture
- Explore different approaches
- Break down implementation steps
- Ask questions across multiple files and concepts

To open Ask Mode, click the sparkle icon in the chat panel and select **Open Chat**. 

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09123356.png)

</div>

This will open a new chat on the right side of the editor where you can ask questions and get guidance without affecting your code until you're ready. If you have previous chat sessions, it will also appear in the chat history.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09123420.png)

</div>

You can set the **chat mode** using buttons like **Ask**, **Plan**, and **Explain** to tailor Copilot's responses to your needs.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09123709.png)

</div>

In older versions, there was an **Edit Mode** that allowed you to make broader code changes across multiple files. This mode has been replaced by **Plan Mode**, which is better suited for execution and larger code changes.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09125242.png)

</div>

| Mode           | Use Case                              | When to Use                                     |
| -------------- | ------------------------------------- | ----------------------------------------------- |
| **Agent Mode** | Complex multi-step tasks              | Involved workflows and autonomous execution     |
| **Ask Mode**   | Guidance and planning without changes | Thinking through problems, exploring approaches |
| **Plan Mode**  | Larger changes across multiple files  | Broader refactoring and feature implementation  |

### Plan Mode (Replaced Edit Mode)

This mode is for making broader code changes. It is useful when you already know the outcome you want and want Copilot to apply the changes for you.

- Implement features across related components
- Set up new project structure
- Make larger changes with reviewable diffs

**Note:** Plan mode is not really a rename of Edit. It is a separate mode focused on creating a step-by-step implementation plan.

## Agent Mode 

**Agent Mode** is different from the other Copilot modes because it is designed for complex, multi-step tasks. Instead of suggesting a single change, it works iteratively and more autonomously.

- It can make changes across multiple files
- It can use tools and run commands when needed
- It can try another approach if the first one does not work

For example, in a project with several scripts and many print statements, you could ask Copilot to add logging with the `logging` module and remove the print statements. 

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09161714.png)

</div>

Agent Mode would search the codebase, update the relevant files, and ask for approval if it needs to run commands such as installing a package or running tests.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09161903.png)

</div>

You can click **Keep** at the bottom to accept all changes, or you can review each change and accept or reject them individually. 

### Tools in Agent Mode 

Agent Mode can use tools to perform actions that go beyond just editing code. These tools can help with tasks like running tests, installing dependencies, or even interacting with external systems.

<div class='img-center'>

![](/img/docs/all-things-ai-gh-copilot-agent-mode.png)

</div>

The tools available in Agent Mode can include:

- Built-in development tools
- MCP tools for external systems
- Marketplace extensions that add extra capabilities

The tools also depend on the context and the task at hand. For example, if you're working on a Python project and ask Copilot to set up a testing framework, it might use tools to install `pytest` and run test commands.

### Approval and Control 

By default, Copilot asks for approval before it uses a tool or runs a command. You can approve a tool once, approve it for the session or workspace, or allow it automatically in the future. 

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09162948.png)

</div>

You can also manage tool access from the **Tools** icon in the chat input.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09163110.png)

</div>

In newer interfaces:

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09163201.png)

</div>

You can then select which tools to allow and set permissions for them. This gives you control over what actions Copilot can take while still enabling it to perform complex tasks when needed.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09163301.png)

</div>

