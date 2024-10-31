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
git clone git@github.com:username/submodule-name.git
```

In the subrepo, I ran:

```bash
submodule-name$ git remote -v
origin  git@github.com:username/submodule-name.git (fetch)
origin  git@github.com:username/submodule-name.git (push)
```

Checking the git status:

```bash
submodule-name$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Next, I moved up to the root of the parent repo:

```bash
parent-repo$ git remote -v
origin  git@github.com:username/parent-repo.git (fetch)
origin  git@github.com:username/parent-repo.git (push)
```

The git status of the parent repo shows:

```bash
parent-repo$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        submodule-name/
```

Since I haven't made any changes in the subrepo, there's nothing to commit there. However, the parent repo sees the new subrepo as an untracked change that needs to be committed. When I tried to commit, I got this message:

```bash
parent-repo$ git add .; git commit -m "Added subrepo"; git push

warning: adding embedded git repository: submodule-name
hint: You've added another git repository inside your current repository.
hint: Clones of the outer repository will not contain the contents of
hint: the embedded repository and will not know how to obtain it.
hint: If you meant to add a submodule, use:
hint: 
hint:   git submodule add <url> submodule-name        
hint: 
hint: If you added this path by mistake, you can remove it from the
hint: index with:
hint: 
hint:   git rm --cached submodule-name
hint: 
hint: See "git help submodule" for more information.
[master 47bb7e6] Added subrepo
 2 files changed, 5 insertions(+), 4 deletions(-)
```

It looks like Git is treating the `submodule-name` as a submodule and suggests that I should use a submodule. When I check GitHub, I can see the subrepo has been pushed, but I can’t open it after clicking on it. The folder icon shows an "arrow pointing to the right," which means Git is indeed treating it as a submodule.

<div class='img-center'>

![](/img/docs/1031-added-subrepo-but-it-was-treated-as-a-submodule.png)

</div>


## Submodules are pointers 

For submodules, the remote repository doesn’t display the subrepo inside it but rather points to another remote repository. So when I click the embedded subrepo with the "arrow pointing to the right," it should redirect me to the remote repository of the submodule.

<div class='img-center'>

![](/img/docs/all-things-devops-sub-module.png)

</div>

To set the subrepo as a submodule, run the command below. The name of the folder in my case is **submodule-name**, but you can set it to any name you want.

```bash
git submodule add <http-url-of-the-remote-repo> submodule-name  
```

If you are using SSH keys to authenticate to Github, use this command:

```bash
git submodule add git@github.com:username/submodule-name.git submodule-name
```

## Not Intended for Submodule 

However, I didn’t want to set up the repository as a submodule on my local machine. I just want it to be a child repo inside of the a parent repo. So locally, it’s not a submodule and isn’t linked to any remote repository. Yet, when I commit and push the parent repo, the embedded subrepo gets treated as a submodule. That’s why I can see the subrepo on GitHub, but I can’t open it.



## Convert Directory to Submodule 

To convert the embedded subrepo to a submodule, you need to do this steps:

1. Delete the folder of the subrepo. 

    ```bash
    rm -rf submodule-name 
    ```

2. Add it as a submodule using the command below. It will clone the remote repository to this directory.

    ```bash
    git submodule add git@github.com:username/submodule-name submodule-name  
    ```

    If you are using SSH keys to authenticate to Github, use this command:

    ```bash
    git submodule add git@github.com:username/submodule-name.git submodule-name
    ```

3. If you encounter an error, remove the deleted submodule from Git index and then try doing step 2 again.

    ```bash
    git rm --cached submodule-name
    ```

4. The parent repo and submodule should now be pointing to different remote repositories. 
    From your parent repo:

    ```bash
    $ git remote -v
    origin  git@github.com:username/parent-repo.git (fetch)
    origin  git@github.com:username/parent-repo.git (push)      
    ```

    From the submodule:

    ```bash
    $ cd submodule-name 
    $ git remote -v
    origin  git@github.com:username/submodule-name (fetch)
    origin  git@github.com:username/submodule-name (push)
    ```

5. From the root of the parent repo, push the changes to Github.

    ```bash
    git add .; git commit -m "Added submodule"; git push 
    ```

6. In Github, you can see the submodule inside the parent repo. In my case, the submodule name is **jenkins-project** but the name will appear different because it's actually a pointer.

    ![](/img/docs/1031-added-submodule-successss.png)

## Deleting a Submodule 

There are three steps to delete a submodule inside a parent repo:

1. Clear the submodule from the Git index.

    ```bash
    git rm --cached /path/to/submodule-name 
    ```

2. Delete the directory. You may also just move the directory on a different directory outside of the repo.

    ```bash
    rm -rf submodule-name
    ```

3. If you want to keep the directory, move it to a different directoy outside of the parent repo and delete .git folder inside the submodule directory.

    ```bash
    cd submodule-name 
    rm -rf .git 
    cd ..
    mv submodule-name /another-directory/outside/repo 
    ```

4. There may still be remnants of the submodule so go back to the parent repo and find any .gitmodule file. 

    ```bash
    cd parent-repo
    ls -la .gitmodules 
    ls -la .git/modules

    rm -rf .git/modules/
    ```

5. If you have a .gitmodules file  at the root of the parent directory, you can simply **delete its contents.**

    ```bash
    $ cat .gitmodules

    [submodule "path/to/submodule-name"]
            path = path/to/submodule-name
            url = git@github.com:username/remote-repository
    ```

6. To verify, run the command below:

    ```bash
    git submodule
    ```