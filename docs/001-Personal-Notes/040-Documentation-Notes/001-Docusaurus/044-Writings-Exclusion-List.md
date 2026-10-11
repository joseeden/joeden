---
title: "Writings Exclusion List"
sidebar_position: 44
description: "Keep articles in Git while excluding them from the published Writings site"
tags:
  - Docusaurus
---

## Overview

Use the blog `exclude` list in `docusaurus.config.ts` to keep selected articles in Git without publishing them on the website.

In this repository, the blog content lives in `writings/`, and its public route is `/writings`.


## Exclude an Article

Keep the article in its existing folder:

```text
writings/
  2026-09-25-hey-you/
    index.md
  2026-09-25-hey-you-english-unpublished-hidden/
    index.md
```

Open `docusaurus.config.ts` and find the `blog` options inside the classic preset. Keep the default exclusions import at the top of the file:

```ts
import { GlobExcludeDefault } from '@docusaurus/utils';
```

Add the article folder to the existing exclusion list:

```ts
blog: {
  blogDescription: 'Stories, thoughts, and ideas',
  path: 'writings',
  routeBasePath: 'writings',
  postsPerPage: 'ALL',
  blogSidebarCount: 'ALL',
  include: ['*/**/*.{md,mdx}'],
  exclude: [
    ...GlobExcludeDefault,
    '2017-08-26-welcome/**',
    '2026-09-25-hey-you-english-unpublished-hidden/**',
  ],
  showReadingTime: true,
  onUntruncatedBlogPosts: 'ignore',
},
```

The exclusion patterns are relative to `writings/`. Do not add `writings/` or `joeden/` to the beginning of the pattern. Use forward slashes, including on Windows.

The trailing `/**` matches files throughout the article folder. Keep `...GlobExcludeDefault` to preserve Docusaurus's default exclusions.

The excluded article has no generated blog page and does not appear in the Writings list or blog feeds. This repository's homepage also uses the published blog metadata, so its recent writings list follows the same exclusion.


## Exclude Folders by Name

To automatically exclude any article folder whose name ends in `-hidden`, replace the individual article entry with a naming pattern:

```ts
exclude: [
  ...GlobExcludeDefault,
  '2017-08-26-welcome/**',
  '**/*-hidden/**',
],
```

With this rule, `2026-09-25-hey-you-english-unpublished-hidden/` is excluded, while `2026-09-25-hey-you/` remains eligible for publication.

**Note**: Adding `-hidden` to a folder name only works when the matching exclusion rule is configured.


## Commit and Push

The Docusaurus exclusion list controls site generation. It does not prevent Git from tracking or pushing the article.

Commit the configuration and article files normally. Keep articles you want to push out of `.gitignore`.

:::warning

Excluding an article from the website does not make its source private. If the Git repository is public, people can still read the committed article there. Assets stored in `static/` are also published independently of the blog exclusion list.

:::


## Validation

Restart the development server after changing the configuration. Before deploying, build and preview the production site from the repository root:

```bash
npm run build
npm run serve
```

- Confirm the excluded article is absent from `/writings` and the homepage's recent writings.
- Check that its previous URL no longer opens an article page in the production preview.
- Confirm the article files remain in Git.
- Remove or update published links to the excluded article if the build reports broken links.

If an article still appears, check that the pattern matches its folder name exactly and that it is inside the `blog` options. The `docs.exclude` option controls documentation pages separately.


## Publish the Article Later

Remove the article's entry from `exclude`, then rebuild and deploy the site.

If using the `-hidden` naming rule, rename the folder so it no longer ends in `-hidden`. Review any links or explicit `slug` frontmatter when renaming the folder.


## References

- [Docusaurus blog plugin configuration](https://docusaurus.io/docs/3.6.3/api/plugins/%40docusaurus/plugin-content-blog)
