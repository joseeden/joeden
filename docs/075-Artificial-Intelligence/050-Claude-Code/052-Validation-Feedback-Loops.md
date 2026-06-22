---
title: "Validation Feedback Loops"
description: "Using browser access and automated tests to help Claude Code verify its work"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 52
--- 

## Overview

When using Claude Code or other AI coding agents, it is useful to give the agent a way to validate its own work.

This creates a feedback loop:

1. Claude makes a change.
2. Claude runs a validation step.
3. Claude reads the result.
4. Claude fixes any issue it finds.
5. Claude validates the affected flow again.

Validation can come from browser testing, automated tests, linters, formatters, type checks, or build commands.

## Browser Access

For web applications, browser access is one of the most useful validation tools. It allows Claude Code to open the app, click through pages, fill forms, inspect state, and confirm that the UI behaves correctly.

Playwright is a common option for this. It can be installed as a Claude Code plugin or configured through MCP.

Open the Claude Code plugin interface:

```bash
/plugin
```

Then install a Playwright plugin if one is available in your configured marketplace.

Use browser access for workflows such as:

- Signup and login
- Navigation
- Form submission
- Dashboard interactions
- Create, edit, and delete flows
- Public share links
- Responsive layout checks

Sample prompt:

> Test the application using the Playwright plugin or MCP.
> 
> The development server is running at `http://localhost:3000`.
> 
> Test all main features step by step and confirm they work correctly.
> 
> If you find an issue, explain it, fix it, and test that flow again.

:::info

Browser access is powerful, but it can use many tokens because Claude needs to inspect page state, screenshots, snapshots, and tool results.

Use it for important user flows and larger UI changes.

:::

## Automated Tests

Automated tests are another strong validation loop. They are faster than manual browser checks and can be run repeatedly after each change.

For JavaScript and TypeScript projects, Vitest is a common testing library.

Install Vitest:

```bash
bun add -D vitest
```

Then ask Claude Code to configure it:

> Set up unit testing with Vitest.
> 
> Add a `bun run test` script that uses Vitest.
> 
> Add unit tests for the key features.
> 
> Add mocks as needed.
> 
> Split complex functions into smaller testable helpers if needed, but do not change application behavior.

Claude can then run the tests, inspect failures, and make corrections.

```bash
bun run test
```

## Test Quality

AI-generated tests still need review. Claude may write tests that match the current implementation instead of testing the intended behavior.

Check that tests include:

- Normal cases
- Edge cases
- Failure cases
- Clear assertions
- Important user or business rules

**Note:** Tests are most valuable when they describe the behavior the app should have, not just the behavior the current code already has.

## Plugins That Help

Plugins can add validation capabilities without manual setup.

Useful examples include:

- **Playwright** for browser access
- TypeScript language support for better code analysis
- Documentation lookup plugins for checking current framework behavior
- Project commands for common validation workflows

Choose plugin scope based on how broadly the tool should be available.

| Scope       | Use For                                                   |
| ----------- | --------------------------------------------------------- |
| User        | Personal tools used across many projects.                 |
| Project     | Shared tools that should be committed with the repository. |
| Local       | Machine-specific tools that should not be committed.      |

## Practical Workflow

Use a small validation ladder instead of relying on one tool.

1. Run formatting for code style.
2. Run linting for obvious mistakes.
3. Run unit tests for logic.
4. Run browser checks for real user flows.
5. Run the production build before final review.

For a Next.js project using Bun, that might look like:

```bash
bun run format
bun run lint
bun run test
bun run build
```

Then use Playwright for the main browser flows.
