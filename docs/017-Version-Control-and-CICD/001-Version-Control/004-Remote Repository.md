---
title: "Remote Repositories"
tags: [Version Control, Git, Development]
sidebar_position: 4
last_update:
  date: 2/5/2023
---



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


### Git Push and Git Pull


Git Push and Pull allows commits from one repo to be synchronized to another repo.

- You can push your commits to Github.
- Your teammates can pull changes on the central repo.
- You can also and pull between your repo and your teammates.

Here is an informative diagram that shows the difference between the commands:


<div style={{textAlign: 'center'}}>

![](/img/docs/git-push--and-pulll.png)

</div>


### Pushing Changes from Local to Remote

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


### Fetching and Pulling

It's best practice to regularly fetch repo from remote to your local repo so that you always have an updated repo. This is useful if you're working with other developers who are touching and intorducing changes to the same local repo.

Some common commands:

- Fetch all the commits.

    ```bash
    git fetch -all
    ```

- Pull all commits done in the origin remote and master branch. 
  Note this pulls all commits done in YOUR LOCAL REPO and master branch.
    
    ```bash
    git pull origin master
    ```

- Pull all commits done in the UPSTREAM repo.

    ```bash
    git pull upstream master
    ```

- Pull from a different branch.

    ```bash
    git pull upstream <branch_2>
    ```



## Pull Request

In any project, especially open-source ones with multiple developers working on the same codebase, it's important to control how changes are integrated into the main branch. Allowing any change to be directly synchronized with the master branch could disrupt the work of other developers.

To prevent issues and ensure smooth integration, all changes must go through a formal review process.

- To include your changes in the master branch, create a **pull request**.
- This outlines the changes you wish to introduce to the remote project.
- The project administrator will the review your pull request.
- The administrator decides whether to merge the changes or reject them.
