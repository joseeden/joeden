---
title: "KB Writing Guide"
description: "KB Writing Guide"
tags: 
- Knowledge Base
- Documentation
- Writing
sidebar_position: 1
# last_update:
#   date: 06/17/2026
---


## Overview

Use this guide when creating or updating pages in `docs/`.

The goal is to keep KB pages simple, consistent, and easy to scan.


## Page Format

- Add frontmatter to every Markdown page.
- Match the frontmatter style used by nearby pages in the same folder.
- Use a short and clear title.
- Use a short description that usually matches the title.
- Add relevant tags.
- Add `sidebar_position` when the folder uses numbered navigation.


## Writing Style

- Start with a short overview.
- Use simple sentences.
- Use short paragraphs.
- Use bullets for quick lists.
- Capitalize the first word of every bullet item.
- Use tables when a comparison or reference list is easier to scan in rows.
- Format Markdown tables with padded columns so the pipes align in the raw source file.
- Avoid sub-bullets unless they make the content easier to understand.
- Avoid em dashes.
- Avoid asyndetons, and use conjunctions when listing related ideas in prose.
- Keep the tone practical, calm, and direct.


## Section Style

- Use `##` headings for main sections.
- Use `###` headings only when a section becomes too long.
- Keep headings short.
- Prefer sections such as `Overview`, `Setup`, `Usage`, `Example`, `Validation`, `Troubleshooting`, and `References`.
- Use code blocks for commands, paths, configuration, and examples.
- Use short inline `**Note**:` paragraphs for brief reminders or caveats.
- Use Docusaurus admonitions when a note, tip, warning, or risk is clearer as a callout.


## Lists and Tables

Use bullets when each item is short.

Capitalize the first word of every bullet item.

Use a table when the content has repeated fields.

Format tables so the columns line up in the Markdown source.

Example:

| Item      | Purpose                                           |
| --------- | ------------------------------------------------- |
| `cwd`     | Sets the directory where the command runs.        |
| `envFile` | Loads environment variables from a file.          |
| `args`    | Passes command arguments to the launched program. |


## Inline Notes

Use inline `**Note**:` paragraphs for short reminders, small caveats, or minor context.

Keep inline notes short.

Use one paragraph only.

Do not use an inline note for multi-step instructions, long warnings, or high-risk information.

Example:

```md
**Note**: Different AI tools do not all read instruction files equally.
```

Use an admonition instead when the note needs visual emphasis or more than one short paragraph.


## Admonitions

Use Docusaurus admonitions when a paragraph or phrase is better shown as a callout.

Use admonitions instead of inline notes when the content is longer, more important, or easier to scan as a callout.

Choose the admonition type based on the purpose of the information.

| Type      | Use for                                                |
| --------- | ------------------------------------------------------ |
| `note`    | Extra context, reminders, and small clarifications.    |
| `tip`     | Helpful suggestions, shortcuts, and recommended paths. |
| `info`    | Neutral background information and useful details.     |
| `warning` | Important cautions, limitations, and possible issues.  |
| `danger`  | High-risk actions, destructive steps, and severe risks. |

Use the standard Docusaurus syntax.

```md
:::note

This is extra context that helps explain the topic.

:::
```

```md
:::tip

This is a helpful suggestion or recommended path.

:::
```

```md
:::info

This is neutral background information.

:::
```

```md
:::warning

This is an important caution or limitation.

:::
```

```md
:::danger

This is a high-risk or destructive action.

:::
```

Use a custom title only when it makes the callout clearer.

```md
:::warning[Check the workspace path]

Make sure `launch.json` is created inside the active VS Code workspace.

:::
```


## Frontmatter Example

```yaml
---
title: "Debug Python in VS Code with uv"
description: "Debug Python in VS Code with uv"
tags: 
- Computer Science
- Application Development
- Software Development
- Python
sidebar_position: 20
# last_update:
#   date: 06/17/2026
---
```


## AI Instruction

When an AI assistant creates or updates a KB page in this repository, it should follow this guide and inspect nearby pages before writing.
