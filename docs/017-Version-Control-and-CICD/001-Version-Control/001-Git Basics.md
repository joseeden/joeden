---
title: "Git Basics"
tags: [Version Control, Git, Development]
sidebar_position: 1
last_update:
  date: 2/5/2023
---

## Git

Git is a widely used version control system for tracking and managing code changes. It allows developers to monitor changes, compare versions, and revert to previous states.

- Enables tracking changes through incremental commits
- Widely adopted for team collaboration and updates
- Integrates with popular hosting platforms 

## Repositories

Every repository is its own self-contained, independent store to have source-controlled versioning.

- You can use public repositories such as Github, Bitbucket, etc
- You can have your own private repositories within your local network or private repositories which you can access over a vpn


## Initializing

To initialize a git repository, go to the folder you want to enable git
and initialize git there.

```bash
git init
```

To un-initialize a local git repo/folder:
```bash
cd </folder/repo-name>
rm -rf .git
```

## User Configuration 

After initializing your git repo, you can set your Git credentials next.

```bash
git config --global user.name "johnsmith"
git config --global user.email johnsmith@gmail.com
```

This will set the name and email fields of Git's configuration. Commits made in this repository moving forward will be attributed to the name and email you set.

## Branches

Branches in Git let developers make changes safely without affecting the main codebase. Each repository has a default branch, usually "main" or "master." Changes in a branch don’t impact the main branch until merged.


<div class='img-center'>

![](/img/docs/001-gitbranches.png)  

</div>

The image shows the branch "feature/update-title" marked as "Merged," meaning its updates are now part of the default branch.

## Commits

Commits are snapshots of the codebase at different points in time. They allow you to revert the codebase to any previous state, which is especially useful for fixing bugs introduced accidentally.

<div class='img-center'>

![](/img/docs/001-gitcommits.png)  

</div>


## Cloning

Cloning creates a full copy of a Git repository on your local machine. This allows you to work on the codebase independently without affecting the original repository.

To clone the repository from Github, enter the following command and press Enter:

```bash
git clone https://github.com/name-of-repository/example-git-repo.git 
```

## `git status`

The `git status` command shows changes since the last commit. If no changes have been made, Git will indicate that the working directory matches the last commit.

```bash
git status 
```

Files in Git fall into two main types:

- **Tracked**: Files that were in the last commit and are either unmodified, modified, or staged for the next commit.
- **Untracked**: Files that were not in the last commit and are not yet part of version tracking.

After a file is tracked, it can be in one of three states:

- **Unmodified**: No edits since the last commit.
- **Modified**: Edited since the last commit but not yet staged.
- **Staged**: Edited and ready for the next commit.

Any new or ignored files in the directory that haven't been included in a previous commit are untracked and need to be added before they can be committed.

In repositories that are newly cloned with no changes, all files are tracked and unmodified.



## Staging and Commiting  

**Staging** allows you to prepare changes for the next commit. You can stage specific files, directories, or all changes at once.

**Commiting** saves changes to your local repository. A commit captures the state of your project at a specific point in time.

## `git add`

The `git add` command moves a file to the staging area, preparing it for the next commit. Files in the staging area will be included in the next commit, meaning Git will start tracking changes in that file.

```bash
git add about.html
```

Before committing, make sure to [set up your user information first](#user-configuration) so Git can attribute the changes to you.


## `git commit`

The `git commit` command saves your changes to the local repository. It creates a snapshot of the current state of your files, allowing you to track changes over time.

```bash
git commit -m "Add an about file" 
```

This command creates a commit with a message describing the changes. Once committed, your modifications are recorded in the repository's history.


## `git log`

The git log command displays all commits made, with the newest commits on top. As expected, the two commits you made are the first and second commits in the output.


```bash
git log 
```


## Common Commands

- Stage changes for all files.

    ```bash
    git add .  
    ```

- Stage changes for a specific file or directory.

    ```bash
    git add /directory/files  
    ```

- Commit the change and provide the commit message inline.

    ```bash
    git commit  -m "This is the commit  message."
    ```

- Change the commit messages:

    ```bash
    git commit --amend
    ```

- Amended message can also be provided in the command:

    ```bash
    git commit --amend -m "Updated commit message"
    ```    

Here is an informative diagram that shows the difference between the commands:

<div style={{textAlign: 'center'}}>

![](/img/docs/git-push--and-pulll.png)

</div>





## References

- [Introduction to Git and Github](https://www.coursera.org/learn/introduction-git-github#syllabus)
- [Collaborate with Git](https://www.cbtnuggets.com/it-training/skills/collaborate-git)
- [Git for Developers using Github](https://www.coursera.org/projects/git-for-developers-using-github)
- [Git Commands](https://github.com/joseeden/Git-Commands)





