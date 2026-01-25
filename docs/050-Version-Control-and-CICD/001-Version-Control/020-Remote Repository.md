---
title: "Remote Repositories"
description: "Using remote repositories"
tags: 
- Version Control
- Git
- Software Development
sidebar_position: 20
last_update:
  date: 8/11/2019
---

## Remote vs. Local  

Local and remote repositories can have different files. We can compare them to see what's missing or new.  

- Local repo: Where we work on changes  
- Remote repo: Where others collaborate and updates are stored  
- Differences: Remote may have extra files or changes  

When working with a team, the remote repo is the main source of truth.  

- Team members fetch updates from the remote  
- They edit files locally and commit changes  
- Changes are pushed back to keep the remote up to date  

## Github

You can create a Github account by going to the [Github](https://github.com/) site and click Sign Up.

![](/img/docs/github.png)

The Github URL is formatted as <code>github.com/username/repository</code>.
As example, one of my repositories has a URL like this: <code>https://github.com/joseeden/Git-Commands</code>

To search for beginner-friendly issues in Github, we can go to the search bar at upper left of github page and type in:
```bash
label:"beginner-friendly" is:issue is:open
``` 

![](/img/docs/github1.png)



## Forking

Forking means recreating a copy of a repo. This is useful if you want to make a copy of the repo in your account and you want to do some changes. All these changes will only reflect in your copy of the repo.

As an example, here we're forking a repo.

![](/img/docs/fork1.png)

After forking, you should have your own copy of the repo. You can now play around with these repo and this won't have any effect on the original owner's repo.

![](/img/docs/fork2.png)


## Cloning

Cloning is a way to create a repository in your local system by copying an existing repository from a remote location into your local machine. You can clone from different places:

- ssh
- http
- git
- a local folder from your file system

Going back to the repo we just forked, this repo only exists in your remote repo - in Github.
To have a copy of the remote repo in your local environment, click "Code", then copy the HTTPS link provided.

![](/img/docs/clone3.png)

Now go to your terminal and type in:

```bash
$ git clone https://github.com/joseeden/Git-Commands.git

Cloning into 'Git-Commands'...
remote: Enumerating objects: 110, done.
remote: Total 110 (delta 0), reused 0 (delta 0), pack-reused 110
Receiving objects: 100% (110/110), 20.47 KiB | 209.00 KiB/s, done.
Resolving deltas: 100% (29/29), done.
```

Another way to clone a repo is by downloading it as a zip file. This is essentially like zipping up a file, download it to your local machine, and unzip it. To do this, just click the **Download zip** from the Code tab.


## `git remote`

The `git remote` command lists all your remotes, which are other repositories that share the same codebase. This allows you to push and pull code between repositories, showcasing Git's distributed nature. When you clone a repository, its location is set as your first remote, named `origin`.

To add another remote, use the following commands:

```bash
additional_remote_url=git://10.1.2.3.eu-west-3.compute.amazonaws.com/lab.git   ## set this to your remote Git repository
git remote add second_remote $additional_remote_url
git remote
```

These commands add a new remote called `second_remote` using the specified URL. The `git remote` command then confirms that the new remote has been successfully added.


## Upstream 

In Git, upstream refers to the main repository from which your repository was forked. It is essentially the source repository that you want to keep in sync with. By default, when you clone a repository, the remote named origin is created, pointing to the URL of the cloned repository.

```bash
/Git-Commands$ git remote -v
origin  https://github.com/joseeden/Git-Commands.git (fetch)
origin  https://github.com/joseeden/Git-Commands.git (push)
```

To tell your local repository about the upstream repository (the original repository from which you forked), you need to add it manually. This can be done with the following commands:

```bash
git remote add upstream https://github.com/joseeden/Git-Commands.git
git remote -v
```

This adds a new remote named upstream that points to the original repository. After adding the upstream, you can fetch updates from it to keep your fork in sync with the original repository.

Other useful commands:

```bash
# Add a remote repository
git remote add origin ssh://git@github.com/[username]/[repository-name].git

# Set a repository's origin branch to SSH
git remote set-url origin ssh://git@github.com/[username]/[repository-name].git	
```

## Fetching from a Remote  

To check for remote updates, we fetch the latest changes without merging them.  

```sh
git fetch origin main
```

Where: 

- `origin`: The remote repository  
- `main`: The branch to fetch  
- Output: Shows the URL, branch, and last commit  

To fetch all the commits:

```bash
git fetch -all
```

It's best practice to regularly fetch repo from remote to your local repo so that you always have an updated repo. This is useful if you're working with other developers who are touching and intorducing changes to the same local repo.

## Fetching a Specific Branch  

We can fetch updates from a different branch if needed.  

```sh
git fetch origin report
```

- `report`: The branch being fetched  
- Fetching doesn’t change local files, only updates the remote info  

## Synchronizing Content  

After fetching, we need to merge remote changes into our local branch.  

```sh
git merge origin/main
```

- If the local branch is behind, Git performs a fast-forward merge  
- Example output:  
  - `2 files changed`  
  - `3 lines added to data.csv`  
  - `1 line added to report.md`  

## Pulling from a Remote 

Instead of fetching and merging separately, we can pull in one step.  

- Your teammates can pull changes on the central repo.
- You can also push your commits to the remote repository.

To pull from the remote repo:

```sh
git pull origin main
```

- Combines `git fetch` and `git merge`  
- Ensures the local branch is up to date  

This will return:


1. Fetch details (remote URL, branch)  
2. Merge details (files updated, lines changed)  

Example output:  

```sh
Fetching origin  
Updating 123abc..456def  
Fast-forward  
 report.md | 1 line added  
```

## Pulling with Unsaved Local Changes  

Git prevents pulling if there are uncommitted changes to avoid data loss.  

Example:  

```sh
git pull origin main
```

Output:  

```sh
error: Your local changes would be overwritten by merge.  
Please commit or stash your changes before you pull.
```

Solution:  

```sh
git commit -am "Save changes"
git pull origin main
```



## Pushing Changes from Local to Remote

As best practice, we only push to a secondary branch ("feature branch") and not the master branch. This ensures that these only affect "our branch" in the remote repo.

Some common commands:

- Push the change from local environment to your remote repo.

    ```bash
    git push origin
    ```

- Push a change to a branch in the remote repo.

    ```bash
    git push origin [branch name]
    ```

- Push changes to remote repository (and remember the branch).

    ```bash
    git push -u origin [branch name]	
    ```

- Push changes to remote repository (remembered branch).
    ```bash
    git push	
    ```

- Delete a remote branch.
    ```bash
    git push origin --delete [branch name]	
    ```

## Push vs. Pull 

Here is an informative diagram that shows the difference between the commands:

<div style={{textAlign: 'center'}}>

![](/img/docs/git-push--and-pulll.png)

</div>


## Pull Request

In any project, especially open-source ones with multiple developers working on the same codebase, it's important to control how changes are integrated into the main branch. Allowing any change to be directly synchronized with the master branch could disrupt the work of other developers.

To prevent issues and ensure smooth integration, all changes must go through a formal review process.

- To include your changes in the master branch, create a **pull request**.
- This outlines the changes you wish to introduce to the remote project.
- The project administrator will the review your pull request.
- The administrator decides whether to merge the changes or reject them.
