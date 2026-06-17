---
name: explainer
description: Analyze a repository from the perspective of a developer who just discovered it. Use when asked to explain what a repo does, why it exists, how it works, what technologies it demonstrates, what someone can learn from it, and whether it is portfolio-worthy.
---

# Explainer

Analyze this repository from the perspective of a developer who just discovered it.

Keep the explanation simple and practical.

Do not just describe the code. Infer the author's intent, target audience, expected use case, and practical purpose.

## Workflow

1. Inspect the repository structure.
2. Read the README, package files, dependency files, config files, entry points, docs, tests, and representative source files.
3. Identify what the repository does.
4. Infer what problem it is trying to solve.
5. Explain the main workflow and how the components work together.
6. Infer why the author likely created it.
7. Explain how the author likely intended it to be used.
8. Classify whether it is solving a real problem, demonstrating a concept, automating a task, or serving as a learning project.
9. Identify the real-world or enterprise equivalent, if applicable.
10. Classify whether it is a simple lab, proof of concept, learning project, portfolio project, or production-style project.
11. Explain whether it is worth adding to a technical portfolio and why.
12. Identify the main technologies, tools, frameworks, and concepts demonstrated.
13. Explain the key things someone would learn by studying it.

## Output

Use these sections:

- What This Repository Does
- Problem It Solves
- Main Workflow
- Simple KB Page Title
- Overview
- Author Intent
- Intended Use
- Project Type
- Real-World Equivalent
- Portfolio Value
- Technologies and Concepts
- What You Can Learn

Keep the output plain, practical, and developer-friendly.

When evidence is unclear, say what is inferred and why.

## Default Prompt

Use this request shape when the user invokes the skill without a detailed prompt:

```text
Analyze this repository and explain it from the perspective of a developer who just discovered it.

Keep the explanations simple and practical.

Do not just describe the code. Try to infer the author's intent, the target audience, the expected use case, and the practical purpose of the project.
```

