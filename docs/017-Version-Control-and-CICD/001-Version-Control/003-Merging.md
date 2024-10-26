---
title: "Merging"
tags: [Version Control, Git, Development]
sidebar_position: 3
last_update:
  date: 2/5/2023
---



## Merging

Merging combines branches into a single timeline, unifying the commit history. It serves as the opposite of branching: while branching creates separate versions with independent changes, merging brings all those versions together.

<div style={{textAlign: 'center'}}>

![](/img/docs/merge2.png)

</div>

Every merge involves two branches:

- **Target Branch**: The branch from which changes are pulled (e.g., the feature branch).
- **Receiving Branch**: The branch where changes are applied (the current branch).

To merge your branch into the master branch, run:

```bash
git merge add-about-page
```

Sample output:

```bash
Updating 2dca417..cc021b0
Fast-forward
 about.html | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 about.html
ca-labs:~/example-git-repo$ git log --oneline
cc021b0 (HEAD -> master, add-about-page) add an about page
2dca417 (origin/master, origin/HEAD) Merge pull request 
f2d9c95 (origin/feature/update-title) update title 
```

Notice that you ran the git merge command from inside the master branch. The branch you run a merge command from is the branch that will accept the changes from another branch.

## Fast-forward Merge

This is basically having a feature branch and merging your changes to the master branch which doesn't have any additional commits since the feature branch were created.

What this means is that no other changes were introduced to the master branch since feature branch were created. When it's time to merge your feature branch, you're just moving the "master tip-node" in front of the feature branch.


<div style={{textAlign: 'center'}}>

![](/img/docs/mergeff2.png)

</div>


## 3-Way Merge

If you did some changes on both the feature branch and the master branch, youcant simply move the master tip-node and do a fast-forward merge because you might lose some commits.What you want is to save the commits on the feature branch and the commits on the master branch and combine them into a single commit


<div style={{textAlign: 'center'}}>

![](/img/docs/mergeff3.png)

</div>


## Conflicts

While git will try to merge the changes seamlessly, there will be some conflicts that will arise sometimes. These conflicts will need to be resolved manually. If errors are encountered during merging, you can stop before anything permanent is done in the code in your current working branch

```bash
git merge --abort
```

## Common Commands

- Merge our upstream master branch with our local branch.

    ```bash
    git merge upstream/master
    ```

- Merge a branch into the active branch.

    ```bash
    git merge [branch name]	
    ```

- Merge a branch into a target branch
    
    ```bash
    git merge [source branch] [target branch]
    ```
