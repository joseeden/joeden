---
name: kb-joeden
description: Create Joeden-style KB pages from a topic and optional notes. Use when asked to create, draft, or update a KB page under a docs folder, especially Docusaurus knowledge base documentation in joeden/docs.
---

# KB Joeden

Create a KB page about the topic provided.

Put it in the correct folder under `joeden/docs` when that repository is available. If the current workspace is different, inspect the workspace and choose the closest docs or knowledge base folder.

Use any notes the user provides.

## Workflow

1. Inspect the docs tree and choose the target folder by topic.
2. Inspect nearby pages in the target folder before writing.
3. Match nearby frontmatter style, tags, filename pattern, and sidebar position pattern.
4. Read local repository instructions when they exist, such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, or `.agents/KB-Writing-Guide.md`.
5. Create or update the KB page with the provided topic and notes.
6. Check that Markdown tables are aligned in the raw source when tables are used.

## Writing Style

- Use a short overview.
- Use practical and direct wording.
- Use short sections and short paragraphs.
- Use bullets when they improve scanning.
- Capitalize the first word of every bullet item.
- Use tables when the content is easier to compare in rows.
- Use short inline `**Note**:` paragraphs for brief reminders or caveats.
- Use Docusaurus admonitions when a note, tip, warning, or risk is clearer as a callout.
- Avoid sub-bullets unless they are needed for clarity.
- Avoid em dashes.
- Avoid asyndetons, and use conjunctions when listing related ideas in prose.

## Default Prompt

Use this request shape when the user invokes the skill without a detailed prompt:

```text
Create a KB page about the topic provided.

Put it in the correct folder under joeden/docs.

Below are added notes, if any:
```

