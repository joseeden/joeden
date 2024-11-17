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

Note that when you added a submodule inside another Git repository, you need to commit and push the changes from inside the submodule directory, then you also need to commit and push the changes from the root of the parent repo.

Go inside the submodule directory: 

```bash
cd parent-repo/submodule-name 
git add .
git commit -m "Added submodule inside parent repo"
git push  
```

Then go up to the root of the parent repo:


```bash
cd parent-repo
git add .
git commit -m "Update changes on the submodule-name"
git push  
```

## Cloning Parent Repo with Submodules 

> The assumption here is you want to clone the parent repo from another machine.

When you clone a parent repository from a remote source like GitHub, you can successfully pull down the main repository. However, the contents of the submodules are not automatically included. If you check the GitHub repository and click on a submodule, you will be directed to a separate remote repository.

<div class='img-center'>

![](/img/docs/1031-recall-remote-github-repo-submodules-are-pointerss.png)

</div>


Essentially, submodules in the remote repository act as pointers. Thus, when you clone the parent repository, the submodules will be empty.

```bash
$ tree test-repos/
test-repos/
├── go-webapp-sample
├── test-jenkins-project
└── test-static-site

4 directories, 0 files 
```

If you need to get the contents of the submodules, you need to go inside each submodule and then do a `git pull` to pull the contents of that repo.

```bash
cd test-static-site
git pull
```

## Cloning Specific Directory (With Trailing Directories)

> The assumption here is you want to clone the parent repo from another machine.

Let's say you have the following in your remote Github repository:

```bash
$ tree main-repo

    └── .git
    └── directory-a
        └── file-x.txt
        └── file-y.txt
    └── directory-b
        └── directoryc
            └── nested-directory
                ├── README.md
                ├── test1.txt
                └── test2.txt
                └── test3.txt
```

If you want other users to pull down just the `nested-directory` without pulling down the entire parent repo, you can use the commands below to pull down the code

:::info[Note]

Before doing this, make sure you have the absolute path of the nested directory inside the parent repo. You can check this in the remote GIthub repository. In this example, the absolute path is:

```bash
directory-b/directory-c/nested-directory
```

:::

```bash
git clone  -n --depth=1 --filter=tree:0 https://github.com/username/main-repo.git
```
```bash
$ ls -al main-repo/
total 0
drwxrwxrwx 1 username username 512 Oct 31 18:38 .
drwxrwx--- 1 username username 512 Oct 31 18:38 ..
drwxrwxrwx 1 username username 512 Oct 31 18:40 .git 
```

Go inside the parent repo and run the `sparse-checkout` commands:

```bash 
cd main-repo
git sparse-checkout set --no-cone directory-b/directory-c/nested-directory
git checkout
```

Note that this will include the first layers "directory-b/directory-c/nested-directory".

```bash
$ tree main-repo

    └── .git
    └── directory-b
        └── directory-c
            └── nested-directory
                ├── README.md
                ├── test1.txt
                └── test2.txt
                └── test3.txt
```

## Cloning Specific Directory (Without Trailing Directories)

:::info[Note]

The steps here actually pulls the entire parent repo and remove the unnecessary files, leaving only the specific directory. I wouldn't recommend this since the code base could be large and downloading all of it might take time and network bandwidth.

:::

There is another way to rewrite the repo so that only the specific directory is cloned even if that directory is nested deep inside layers of directories.

```bash
git clone --depth 1 https://github.com/username/main-repo.git nested-directory
cd nested-directory
```

Then use the `filter-branch` to delete all other files/directories except the desired sub-directory.

```bash
git filter-branch --prune-empty --subdirectory-filter directory-b/directory-c/nested-directory HEAD 
```

```bash
$ tree nested-directory

    ├── README.md
    ├── test1.txt
    └── test2.txt
    └── test3.txt
```


Reference: [Rewriting the repo](https://askubuntu.com/a/729798/1547382)


## Not Intended for Submodule 

However, I didn’t want to set up the repository as a submodule on my local machine. I just want it to be a child repo inside of the a parent repo. So locally, it’s not a submodule and isn’t linked to any remote repository. Yet, when I commit and push the parent repo, the embedded subrepo gets treated as a submodule. That’s why I can see the subrepo on GitHub, but I can’t open it.



## Convert Directory to a Submodule 

To convert the embedded subrepo to a submodule, you need to do this steps:

1. Add the directory a submodule using the command below. It will clone the remote repository to this directory.

    ```bash
    git submodule add git@github.com:username/submodule-name submodule-name  
    ```

    If you are using SSH keys to authenticate to Github, use this command:

    ```bash
    git submodule add git@github.com:username/submodule-name.git submodule-name
    ```

2. In some instances, you may need to delete the folder of the subrepo. 

    ```bash
    rm -rf submodule-name 
    ```

3. If you encounter an error, you can try removing the deleted submodule from Git index and then try doing step 2 again.

    ```bash
    git rm --cached submodule-name
    ```

4. To verify if the submodule was created, run the command below. It should return something like this:

    ```bash
    $ git submodule

    721fbdf8a89ec49f0c494ad4261d31b4335dcbd5 submodule-name
    (heads/main)
    ```

5. The parent repo and submodule should now be pointing to different remote repositories. 
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

6. From the root of the parent repo, push the changes to Github.

    ```bash
    git add .; git commit -m "Added submodule"; git push 
    ```

7. In Github, you can see the submodule inside the parent repo. In my case, the submodule name is **test-jenkins-project** but the name will appear different because it's actually a pointer.

    ![](/img/docs/1031-added-submodule-successss.png)


## Convert Submodule to a Normal Directory 

:::info[NOTE]

After an entire day of playing around nested repos, I figure it's way easier to use Submodules than using subrepos inside parent repos. There are workarounds to make subrepos work especially in Jenkins pipelines and when cloning code, but it still requires additional steps to ensure that the GIt history of the parent repo and the nested repos inside doesn't mess with each other. 

Having said, I choose to use submodules moving forward for the following reasons:

- **Separate Git History**: Each submodule retains its own history independently, which prevents conflicts or complexity in the parent repo's Git history.
  
- **Easier CI/CD Integration**: In Jenkins pipelines, you can reference the submodule’s remote repository directly if you only need to work with that specific project.

- **Selective Updates**: With submodules, you can control when to update or pull changes for each project, This makes it easy to keep some submodules stable while actively developing others.

I may still use nested repos on some cases where I don't need to use pipelines on the individual project repositories. 

:::


1. Go to your submodule directory and delete the .git folder.

    ```bash
    cd parent-repo/submodule-name 
    rm -rf .git 
    ```

2. Go one level up and remove the submodule from Git index. 

    ```bash
    git rm --cached submodule-name
    ```

3. Go back to your parent repo and clear the .gitmodules file. Note that if you have other submodules inside the parent repo, don't run the `cat` command below as it will delete the contents of the .gitmodules files. Instead just delete the specific submodule.

    ```bash
    cd parent-repo
    cat > .gitmodules   # then click Ctrl-D 
    ```

4. Still in the root of the parent repo, locate any modules folder. Delete the specific modules folder.

```bash
rm -rf .git/modules/path/to/submodule-name
```

4. Note that the parent repo's own .git/config file may also be referencing the deleted submodule. Make sure to delete the reference.

    ```bash
    cat .git/config  
    ```

    If you find these lines, remove them.

    ```bash
    [submodule "parent-repo/submodule-name"]
            url = git@github.com:username/submodule-name.git
            active = true
    ```

5. At this point, the submodule directory is now converted into a normal directory. There is now only one repo, which is the parent repo. Commit and push the changes to the parent repo's remote repo.

```bash
git add . 
git commit -m "Converted submodule  to a normal directory inside the parent repo"
```

6. Verify in Github if the *pointer* is now converted to a directory. The folder icon should not have the "arrow pointing right" and you should be able to open it after clicking.

<div class='img-center'>

![](/img/docs/1031-convnerted-submodule-to-normal-directory-but-not-yet-initializeddd.png)

</div>


7. Back in your terminal, go inside the converted submodule directory it and initialize it. Commit the changes.

    ```bash
    cd parent-repo/submodule-name       ## submodule-name is not a submodule anymore 
    git init 
    git add .
    git commit -m "Initialize project directory to its own git repo inside a parent repo."
    ```

    Verify the status:

    ```bash
    $ git status
    On branch master
    nothing to commit, working tree clean    
    ```



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