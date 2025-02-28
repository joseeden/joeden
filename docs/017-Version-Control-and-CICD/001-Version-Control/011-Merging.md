---
title: "Merging"
description: "Combining branches into a single timeline"
tags: 
- Version Control
- Git
- Software Development
sidebar_position: 11
last_update:
  date: 2/5/2020
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

Sometimes, when merging changes, Git may encounter conflicts that it can't resolve automatically. These conflicts must be fixed manually. If you run into errors during a merge, you can cancel the merge process and revert to the previous state of your branch with the following command:

```bash
git merge --abort
```

Sample output:

```bash
Merge failed. Please resolve conflicts and try again.
Aborting merge.
```

This command stops the merge before any changes are made, ensuring your current working branch remains intact.


## `git diff`

The `git diff` command is used to show the differences between files in your working directory and the last commit. This is helpful for reviewing changes before staging or committing them.


```bash
git diff
```

Sample output:

```bash 
diff --git a/index.html b/index.html
index 69ab9f0..256eea0 100644
--- a/index.html
+++ b/index.html
@@ -358,3 +358,4 @@ print 'It took ' + i + ' iterations to sort the deck.';</code></pre>
 
        </body>
 </html>
```

In the output, you can see a detailed log of any tracked changes since your last commit. The lines prefixed with a `+` indicate additions, while those prefixed with a `-` (if present) would indicate deletions. Notice the green "new line" text corresponding to the change you made in the last Lab step.

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
