---
title: "Workflow"
description: "Workflow for using Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 12
--- 

## Coding Workflow

This simple workflow helps guide Claude through the task step by step.

1. Initialize the project
2. Explore the codebase
3. Plan before coding
4. Review the plan
5. Write code after review
6. Commit and test the changes 
7. Iterate as needed

This approach helps ensure the output aligns with existing structure instead of introducing random or conflicting changes.

## Planning

Plan mode allows the AI to research your files and suggest a strategy without modifying your project yet. This is the best stage to correct any mistakes before the development work begins.

To switch to plan mode, use the shortcut `Shift + Tab` or type:

```bash
claude
```

If you skip planning, Claude may generate code immediately without understanding the full context. This can result to a working solution that does not match the project design

<div class='img-center'>

![](/gif/docs/06062026-claude-code-planmode.gif)

</div>


## Coding and Testing

Once you approve the plan, the development phase begins. To help the AI implement the plan correctly, provide the right validation tools. This ensures that the AI can fix errors automatically and guarantees that the new features work correctly.

- Set up a test suite for constant validation
- Create a configuration file to save permanent solutions
- Let the AI run tests to verify its own work

<div class='img-center'>

![](/gif/docs/06062026-claude-code-implem-commit.gif)

</div>

## Undoing Changes 

### Using Git 

Git helps you go back to an older version of your code when something goes wrong.

Notes: 

- Commit small changes often
- Review AI-generated changes with `git diff`
- Revert unwanted changes safely
- Avoid mixing too many AI changes in one commit

Commands: 

1. To check which files were changed:

    ```bash
    git status
    ```

2. To see the exact changes made in the files:

    ```bash
    git diff
    ```

3. To restore a file back to the last committed version:

    ```bash
    git restore <file-name>
    ```

4. To restore all uncommitted file changes:

    ```bash
    git restore .
    ```

### Using Claude Code Rewind

Claude Code also has two rewind features for undoing changes from the current session.

1. Using the `Esc` key 

    - Press `Esc` twice
    - Choose the snapshot to restore

2. Using the `/rewind` command

    - Check Git after rewinding
    - This can help, but it should not replace Git.

    ```bash
    /rewind
    ```

When you use rewind, it will show you the available restore points from the current session.

After using rewind, make sure to check the files again with Git.

Then verify:

```bash
git status
```

If Git still shows modified files, the rewind did not fully undo the change.

:::info 

Use both Git and Claude Code rewind, but trust Git more.

Git is the main safety net
Rewind is useful for quick session recovery

:::

## Reviewing and Committing

The final phase focuses on checking the quality of the work and saving your progress.

Before you commit the changes, you can run a **subagent reviewer** to check the files. The subagent can give a fresh perspective and removes any bias from the main coding session. 

<div class='img-center'>

![](/gif/docs/06062026-claude-code-subagent-review.gif)

</div>
