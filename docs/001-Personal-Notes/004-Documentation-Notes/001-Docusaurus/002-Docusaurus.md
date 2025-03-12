---
title: "Docusaurus Notes"
sidebar_position: 2
description: "Resources, bookmarks"
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---



## Prerequisites 

- [Install NodeJS and NPX](/docs/001-Personal-Notes/003-Developer-Notes/011-Tools-Specifications.md#nodejs)


## Docusaurus

### Create your Docusaurus site

Make sure NodeJS and NPX is already install. Run the command below and specify the name of your site.

```bash
# joeden is the name of my site.
npx create-docusaurus@latest joeden classic 
```

To check the Docusaurus version, run the command below in the root of the project directory.

```bash
npm list @docusaurus/core 
```

It should return:

```bash
├── @docusaurus/core@3.4.0
└─┬ @docusaurus/preset-classic@3.4.0
  ├── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-content-blog@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-content-docs@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-content-pages@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-debug@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-google-analytics@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-google-gtag@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-google-tag-manager@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/plugin-sitemap@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  ├─┬ @docusaurus/theme-classic@3.4.0
  │ └── @docusaurus/core@3.4.0 deduped
  └─┬ @docusaurus/theme-search-algolia@3.4.0
    └── @docusaurus/core@3.4.0 deduped 
```

### Start Development Server 

Start your site. 

```bash
cd joeden
npx docusaurus start 
```

You can also use the command:

```bash
npm start 
```

By default, a browser window will open at http://localhost:3000.


## Deploy 

### Github Pages via Github Actions

Create the repository first:

![](/img/docs/deploy-github-pagesss.png)


Going back to your local repository, initialize it as a Github repository.
Set the remote Github repository as the upstream repository. Commit and push.

```bash
git init 
git add . 
git commit -m "first commit"
git remote add origin https://github.com/joseeden/joeden.git 
git push -u origin master               
```

Next, modify the docusaurus.config.js.

```js
  title: 'JOEDEN',
  tagline: 'Engineer by day, Runner by night.',
  favicon: 'img/favicon.ico',
  url: 'https://github.com',
  baseUrl: '/joeden/',

  // GitHub pages deployment config.
  organizationName: 'joseeden',          // Usually your GitHub org/user name.
  projectName: 'joeden',                 // Usually your repo name.
  deploymentBranch: "master",            // Change to the branch used 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn', 
```

Create the workflow file. I'm using npm here, so you're configuration may change if you're using yarn.

| If you're using npm             | If you're using yarn  |
|---------------------------------|-----------------------|
| cache: yarn                     | cache: npm            |
| yarn install --frozen-lockfile  | npm ci                |
| yarn build                      | npm run build         |

```bash
# deploy.yaml 
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master
    # Review gh actions docs if you want to further define triggers, paths, etc
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on

jobs:
  build:
    name: Build Docusaurus
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    name: Deploy to GitHub Pages
    needs: build

    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write # to deploy to Pages
      id-token: write # to verify the deployment originates from an appropriate source

    # Deploy to the github-pages environment
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

Commit and push.

```bash
git add; git commit 
```

In Github, check the Actions tab. We should see the workflow created.

![](/img/docs/notes-github-worklow-created-for-docu-site.png)













