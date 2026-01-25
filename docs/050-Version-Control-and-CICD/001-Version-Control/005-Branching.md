---
title: "Branching"
description: "Creating different branches in Git"
tags: 
- Version Control
- Git
- Software Development
sidebar_position: 5
last_update:
  date: 8/11/2019
---


## Branching

Branches in Git are essential because they allow you to make changes without impacting the main codebase until you choose to merge them.

<div class="img-center"> 

![](/img/docs/03012025-git-branching.png)

</div>

## `git branch`

The `git branch` command will output a list of branches. If you haven't created any other branches, there is only one branch in the output of your command. The default branch for any Git repository is usually master, though you can change which branch is the default if needed.

```bash
git branch
```

Sample output:

```bash
* master
```

If you have multiple branches, the output will look like this:

```bash
* master
  development-abc 
  reporting
  feature-main  
```

The * next to "master" shows which branch you're currently on. Checking out a branch means choosing where your changes will apply. Since you’re on "master," any changes will affect that branch until you switch to another.

<div style={{textAlign: 'center'}}>

![](/img/docs/git-branching.png)

</div>

You can have multiple branches stemming from the master which will have the similar code in it. From there you can work on your own feature branch while others can work on other feature branches. 


## `HEAD`

In Git, **HEAD** points to your current branch or commit.

When you create a repository, `HEAD` usually points to the main branch, like `master` or `main`. If you create and switch to a new branch, `HEAD` will point to that branch, so new commits go there.

To create and switch to a new branch, use:

```bash
git checkout -b new-branch
```

Output:
 
```bash
Switched to a new branch 'new-branch'
```



## Common Commands 

- Create a branch:

    ```bash
    git branch [branch name]
    ```

- List the branches (the asterisk denotes the current branch):

    ```bash
    git branch
    ```

- List the branches, including both local and remote branches.

    ```bash
    git branch -a
    ``` 

- Switch to another branch.

    ```bash
    git checkout [branch name]
    ```

- Create a new branch and switch to it.
    ```bash
    git checkout -b [branch name]	
    git branch
    ```

- Switch to the branch last checked out.

    ```bash
    git checkout -	
    ```

- Rename a local branch.

    ```bash
    git branch -m [old branch name] [new branch name]	
    ```

- Delete  branch.

    ```bash
    git branch [branch name] -d
    ```

- Clone a remote branch and switch to it.

    ```bash
    git checkout -b [branch name] origin/[branch name]	
    ```

- Compare two branches:

    ```bash
    git diff branch-a branch-b 
    ```

- Delete a remote branch.

    ```bash
    git push origin --delete [branch name]	
    ```

- Clone a remote branch and switch to it.

    ```bash
    git checkout -b [branch name] origin/[branch name]	
    ```

- Discard changes to a file.

    ```bash
    git checkout -- [file-name.txt]	
    ```


