---
name: kb-readme-writer
description: Create or update practical README files for the current or specified repository or folder. Use when asked to write, rewrite, improve, or maintain a README.md, including nested folder READMEs inside a larger Git repository.
---

# KB README Writer

Create or update the `README.md` for the current or specified repository or folder.

Use the same calm, practical, and direct style as Joeden KB pages.

A Git repository may contain nested folders with their own READMEs. When the user specifies a folder, target that folder's README instead of assuming the repository root.

## Workflow

1. Identify the target repository or folder from the user request.
2. If no target is specified, use the current working repository or folder.
3. Check whether the target folder already has a `README.md`.
4. Inspect the existing README when present and preserve useful accurate content.
5. Inspect nearby or parent READMEs when they help match style.
6. Inspect the target folder contents, source files, config files, dependency files, scripts, examples, and output folders.
7. Infer the project purpose, problem, workflow, setup requirements, and expected usage.
8. Create or update the README with simple, practical sections.
9. Keep commands and paths accurate for the target folder.
10. Keep the README scoped to the target folder.

## Common Sections

Use sections that fit the project.

Prefer these sections when useful:

- `Overview`
- `Workflow`
- `Use Case`
- `Project Structure`
- `Prerequisites`
- `Setup`
- `Run the Application`
- `Skipping Steps`
- `Validation`
- `Notes`

Do not force every section. Add, remove, or rename sections when the README becomes clearer.

## Markdown Tables

When using Markdown tables, always align the pipes in the raw Markdown source.

Good:

```md
| Item      | Purpose                                  |
| --------- | ---------------------------------------- |
| `README`  | Explains how to understand the project.  |
| `main.py` | Runs the main application workflow.      |
```

Avoid compact or visually uneven tables.

Do not leave table pipes jagged or unpadded when the raw Markdown is viewed in an editor.

## Project Structure

Include `Project Structure` for most READMEs.

Show the contents of the target folder, not the entire parent repository unless the target is the repository root.

Use a fenced `text` code block.

Use Unicode tree drawing characters, not ASCII tree fallbacks.

Use these characters consistently:

- `│` for vertical continuation lines
- `├──` for entries that have siblings after them
- `└──` for the final entry in a folder

Example:

```text
project-folder/
|
├── data/
│   ├── customers.csv
│   └── orders.csv
|
├── prompts/
│   └── developer-prompt.txt
|
├── src/
│   └── main.py
|
├── pyproject.toml
└── README.md
```

Group related files together by purpose when it makes the structure easier to scan.

Use a standalone `|` line as a visual separator between purpose-based groups.

Use `│` for nested vertical continuation lines.

Do not use `|--` or `` `-- `` branch styles.

Do not use plain `|` as an indentation or continuation character inside nested entries.

Do not use vague placeholders when actual files can be inspected.

Omit noisy generated folders when they do not help the reader, such as `.venv`, `node_modules`, `__pycache__`, build caches, and large output folders.

## Writing Style

- Keep explanations simple and practical.
- Use short paragraphs.
- Use numbered steps for setup and run instructions.
- Use bullets for quick lists.
- Capitalize the first word of every bullet item.
- Align Markdown table pipes in the raw source whenever tables are used.
- Use code blocks for commands, paths, configuration, and examples.
- Use short inline `**Note**:` paragraphs for brief reminders or caveats.
- Avoid em dashes.
- Avoid asyndetons, and use conjunctions when listing related ideas in prose.

## Default Prompt

Use this request shape when the user invokes the skill without a detailed prompt:

```text
Create or update the README for the current or specified repository or folder.

Use simple, practical explanations.

Include common README sections such as Overview, Workflow when useful, Project Structure, Prerequisites, and Setup.
```
