---
title: "Point Folder To index.md"
sidebar_position: 26
description: "Open a folder's index.md when the sidebar category is clicked"
tags:
- Docusaurus
---


## Overview

If you want a folder in the Docusaurus sidebar to open its `index.md` file when clicked, set the folder's `_category_.json` to use a doc link instead of a generated index. The safest way is to give `index.md` an explicit `id` in frontmatter, then reference that same `id` in `_category_.json`.


## Use a doc link

In `index.md`, set an explicit doc ID:

```md
---
title: "GCP DevOps Project"
id: gcp-devops-project
---
```

Then in the folder's `_category_.json`, use:

```json
{
  "label": "GCP DevOps",
  "position": 20,
  "link": {
    "type": "doc",
    "id": "gcp-devops-project"
  }
}
```

This makes the sidebar folder open `index.md` for that folder.


## Why this works

The `id` is a Docusaurus doc ID, not a filesystem path.

- It is relative to the `docs` folder
- It does not use the `.md` extension
- It is used by Docusaurus to resolve docs inside the site
- An explicit `id` is more reliable than depending on the inferred ID of `index.md`


## Do not use an absolute path

Do not use something like:

```json
"id": "C:/Git/joeden/docs/037-Google-Cloud/020-GCP-DevOps-Project/index.md"
```

Reasons:

- Docusaurus does not look up docs by your machine's absolute file path
- Absolute paths only make sense on one computer and will break across environments
- The sidebar `id` must match the internal doc ID that Docusaurus generates


## Notes

- `generated-index` creates a separate category landing page
- `doc` opens an actual markdown doc
- For `index.md`, using an explicit frontmatter `id` is the safest option