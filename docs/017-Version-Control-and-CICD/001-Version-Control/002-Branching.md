---
title: "Branching"
tags: [Version Control, Git, Development]
sidebar_position: 2
last_update:
  date: 2/5/2023
---


## Git Branch

**Git Branch** allows you to create parallel timelines that don't interfere with one another. Each branches will have their own set of commits that don't affect commits on another timeline.

The first branch that exists when you create a repository is the **master/main** branch. You can have multiple branches stemming from the master which will have the similar code in it.

<div style={{textAlign: 'center'}}>

![](/img/docs/git-branching.png)

</div>


From there you can work on your own feature branch while others can work on other feature branches. Some useful commands are:

## Head

An important concept to understand in Git is the **HEAD** of the branch. 

When you first create a repository, the HEAD is pointed at the default branch, which is usually the `master` or `main` branch. The HEAD is essentially a reference to the current branch or commit that you are working on.

When you create a new branch and switch to that branch, the HEAD will now be pointing to that new branch. This means any new commits you make will be added to this new branch. The process of switching branches is often done using the `git checkout` or `git switch` commands. For example:

```sh
git checkout -b new-feature
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


