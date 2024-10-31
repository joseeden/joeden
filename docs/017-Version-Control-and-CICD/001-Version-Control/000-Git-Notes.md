---
title: "Git Notes"
description: "Personal notes on Git"
tags: [Version Control, Git, Development]
sidebar_position: 0
last_update:
  date: 2/5/2023
---

## Cloning a Subrepo Inside a Parent Repo

The goal was to consolidate all repositories into a single central monorepo. Inside the parent repo, I tried to clone a remote repository:

```bash
git clone git@github.com:joseeden/jenkins-project.git
```

In the subrepo, I ran:

```bash
jenkins-project$ git remote -v
origin  git@github.com:joseeden/jenkins-project.git (fetch)
origin  git@github.com:joseeden/jenkins-project.git (push)
```

Checking the git status:

```bash
jenkins-project$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Next, I moved up to the root of the parent repo:

```bash
joeden$ git remote -v
origin  git@github.com:joseeden/joeden.git (fetch)
origin  git@github.com:joseeden/joeden.git (push)
```

The git status of the parent repo shows:

```bash
joeden$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        jenkins-project/
```

Since I haven't made any changes in the subrepo, there's nothing to commit there. However, the parent repo sees the new subrepo as an untracked change that needs to be committed. When I tried to commit, I got this message:

```bash
joeden$ git add .; git commit -m "Added subrepo"; git push

warning: adding embedded git repository: jenkins-project
hint: You've added another git repository inside your current repository.
hint: Clones of the outer repository will not contain the contents of
hint: the embedded repository and will not know how to obtain it.
hint: If you meant to add a submodule, use:
hint: 
hint:   git submodule add <url> jenkins-project        
hint: 
hint: If you added this path by mistake, you can remove it from the
hint: index with:
hint: 
hint:   git rm --cached jenkins-project
hint: 
hint: See "git help submodule" for more information.
[master 47bb7e6] Added subrepo
 2 files changed, 5 insertions(+), 4 deletions(-)
```

It looks like Git is treating the `jenkins-project` as a submodule and suggests that I should use a submodule. When I check GitHub, I can see the subrepo has been pushed, but I can’t open it after clicking on it. The folder icon shows an "arrow pointing to the right," which means Git is indeed treating it as a submodule.

<div class='img-center'>

![](/img/docs/1031-added-subrepo-but-it-was-treated-as-a-submodule.png)

</div>


## Submodules are pointers 

For submodules, the remote repository doesn’t display the subrepo inside it but rather points to another remote repository. So when I click the embedded subrepo with the "arrow pointing to the right," it should redirect me to the remote repository of the submodule.

<div class='img-center'>

![](/img/docs/all-things-devops-sub-module.png.png)

</div>

To set the subrepo as a submodule:

```bash
git submodule add <url-of-the-remote-repo> jenkins-project  
```

## Not Intended for Submodule 

However, I didn’t want to set up the repository as a submodule on my local machine. I just want it to be a child repo inside of the a parent repo. So locally, it’s not a submodule and isn’t linked to any remote repository. Yet, when I commit and push the parent repo, the embedded subrepo gets treated as a submodule. That’s why I can see the subrepo on GitHub, but I can’t open it.

