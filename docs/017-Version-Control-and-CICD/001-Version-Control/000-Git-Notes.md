---
title: "Git Notes"
description: "Personal notes on Git"
tags: [Version Control, Git, Development]
sidebar_position: 0
last_update:
  date: 2/5/2023
---


## Cloning subrepo inside a Parent Repo 

I was trying to consolidate all my repositories into one central monorepo. Inside a parent repo, I tried cloning a remote repository:

```bash
git clone git@github.com:joseeden/jenkins-project.git
```

Inside the subrepo:

```bash
jenkins-project$ git remote -v
origin  git@github.com:joseeden/jenkins-project.git (fetch)
origin  git@github.com:joseeden/jenkins-project.git (push)
```

If I check the git status:

```bash
jenkins-project$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```


Going one level up, to the root of the parent repo:

```bash
oeden$ git remote -v
origin  git@github.com:joseeden/joeden.git (fetch)
origin  git@github.com:joseeden/joeden.git (push)
```

git status of parent repo:

```bash
joeden$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        jenkins-project/
```
 

I haven't done any changes yet in the subrepo so I don't have to commit anything yet. But on the parent repo, it sees the new subrepo as a new change so I need to commit it. However when I try to commit it, I get a message:

```bash
git add .;git commit -m "Added subrepo"; git push
```

