# Copilot Instructions

Use the agent profiles in `.github/agents` when a task matches one of their specialties.

For README writing or README maintenance, prefer the `kb-readme-writer` agent.

When writing a README `Project Structure` section:

- Use a fenced `text` code block.
- Show the contents of the target folder, not the entire parent repository unless the target is the repository root.
- Use Unicode tree drawing characters, not ASCII tree fallbacks.
- Use `│` for vertical continuation lines.
- Use `├──` for entries that have siblings after them.
- Use `└──` for the final entry in a folder.
- Do not use `|--`, `` `-- ``, plain `|` continuation pipes, or standalone `|` separator lines.

Example:

```text
project-folder/
├── data/
│   ├── customers.csv
│   └── orders.csv
├── src/
│   └── main.py
├── pyproject.toml
└── README.md
```

