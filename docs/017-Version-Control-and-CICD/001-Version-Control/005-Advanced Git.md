---
title: "Advanced Git"
description: "More advance Git commands"
tags: [Version Control, Git, Development]
sidebar_position: 5
last_update:
  date: 2/5/2023
---



## `git restore`

If you can't undo changes in your file editor, Git offers an option to do so. In the output of the `git status` command, you'll see the message suggesting you use `git restore -- <file>...` to discard changes in your working directory. You can use this command to undo changes as shown below:

```bash
git restore -- index.html
```



## `git reset`

The `git reset` command is used to undo commits and move your current branch pointer to a different commit. It can change the commit history while preserving or discarding changes in your working directory.

To reset to the commit before the latest one while keeping your changes staged, use:

```bash
git reset --soft HEAD~1
```

The `HEAD~1` flag tells Git to move your current branch back by one commit, effectively removing the last commit. The `--soft` flag ensures that any changes made since that commit remain in the staging area.

If you want to completely discard changes made since the specified commit, use:

```bash
git reset --hard HEAD~1
```

Sample output:

```bash
HEAD is now at 2dca417 Merge pull request #1 from cloudacademy/feature/update-title
```

The `--hard` flag will delete all changes made since the specified commit, including any new files. Be cautious when using hard resets, as they are one of the few actions in Git that cannot be easily undone.



## `git stash`

Stashing means placing all your uncommited changes on a stack so they are safe for later access. Note that when you run this, your uncommited change will be discarded and the file will revert to its original state.

Some common commands:

- Saves local modifications and reverts working directory to match the HEAD commit.
    ```bash
    git stash
    ```

- Lists all the stashes you have saved.

    ```bash
    git stash list
    ```

- Reappliy the most recently stashed changes to your working directory. 
  The stash remains in the stash list after applying.

    ```bash
    git stash apply
    ```

- Reappliy a specific stash identified by its index (e.g., stash@{0} for the most recent stash).

    ```bash
    git stash apply stash@{index}
    ```

- Remove the most recently stashed changes from the stash list.    

    ```bash
    git stash drop
    ```

- Remove a specific stash identified by its index.

    ```bash
    git stash drop stash@{index}
    ```

- Reapply the most recently stashed changes and removes the stash from the stash list.

    ```bash
    git stash pop
    ```

- Create a Stash with a Message.

    ```bash
    git stash save "your message"
    ```

- Stash changes, including untracked files.

    ```bash
    git stash -u
    ```
- Stash changes, including untracked and ignored files.

    ```bash
    git stash -a
    ```


## `git rebase`

Instead of merging branches, which creates a commit history that can include multiple merge commits, rebasing creates a linear, cleaner commit history. Note that rebasing will wipe out everything that is changed in the code.

Some common commands:

- Rebase the current branch onto another branch.

    ```bash
    git rebase <base-branch>
    ```

- Use the -i flag to start an interactive rebase.

    ```bash
    git rebase -i <base-branch>
    ```



## `git log`

The `git log` command displays a list of commits made to the repository. 

```bash
git log
```

Sample output:

```bash
commit 2dca4178sdsdd86789as7ea157dsdsd67sdff3d6 (HEAD -> new_branch, origin/master, origin/HEAD, master)
Merge: ae05432 f2d9c95
Author: John Smith <johnsmith@gmail.com>
Date:   Wed Nov 20 16:50:24 2019 -0600

    Merge pull request 
    
    update title

commit f2d9c95f623c8d69193680732b69c21e50828914 (origin/feature/update-title)
Author: Matthew Martinez <johnsmith@gmail.com>
Date:   Wed Nov 20 16:40:40 2019 -0600

    update title

commit ae05432ea07eaf8e2d5232b6a40345f1bb33c9ac
Author: Ted Mosby <tedmosby@gmail.com>
Date:   Tue Nov 19 15:31:36 2019 -0700

    Initial commit 
```


Using the `--oneline` flag provides a simple, summarized view:

```bash
git log --oneline
```

Sample output:

```bash
e7a1f6d Update README.md
b1c3e44 Add feature/update-title branch
f3d2a8b Initial commit
```

Each commit shows a short ID, branch names (e.g., `master`, `origin/feature/update-title`), and a commit message. Branches can be seen as pointers to specific commits, allowing you to track changes across different branches.

For a visual of branch history, add the `--graph` flag:

```bash
git log --oneline --graph
```

Sample output:

```bash
* e7a1f6d Update README.md
* b1c3e44 Add feature/update-title branch
| * f3d2a8b Initial commit
|/
* 8c4d7e1 Merge pull request #1 from origin/feature/update-title
```

This version includes a graphical representation of branch history. Notice the `origin/feature/update-title` branch next to one of the commits.

You can see that the commit the branch points to splits from the main branch (the `master` branch). This shows where changes on the `origin/feature/update-title` branch began, and any changes made there do not affect the `master` branch.

Later, the `origin/feature/update-title` branch rejoins the `master` branch in the next commit, which is noted as a merge:

Sample output:

```bash
*   8c4d7e1 Merge pull request #1 from origin/feature/update-title
|\
| * f3d2a8b Add feature/update-title branch
|/
* e7a1f6d Update README.md
```

This indicates that the changes from the `origin/feature/update-title` branch were successfully merged back into the `master` branch.


Some common commands:

- View changes

    ```bash
    git log
    git log --summary
    git log --stat
    git log --graph
    git log --oneline
    git log --oneline --decorate=no
    git log --walk-reflogs
    ```

- Preview changes before merging

    ```bash
    git diff [source branch] [target branch]	
    ```

- Recover lost commits or branches by showing all actions performed in the repository.

    ```bash
    git reflog
    ```
- Show details about a specific state of the repository as recorded in the reflog.

    ```bash
    git show HEAD@{index}
    ```


## `git show`

The `git show` command displays detailed information about various Git objects, with the default action being to show details of the last commit. It combines commit details, similar to the `git log` command, with content changes like the `git diff` command, making it a great option for quickly gathering information about a commit.

To view the latest commit details, you can run:

```bash
git show
```

Sample output:

```bash
commit 2dca4178sdsdd86789as7ea157dsdsd67sdff3d6 (HEAD -> new_branch, origin/master, origin/HEAD, master)
Merge: ae05432 f2d9c95
Author: Matt Martinez <matthewmartinez1003@gmail.com>
Date:   Wed Nov 20 16:50:24 2019 -0600

    Merge pull request #1 from cloudacademy/feature/update-title

    update title
```

By default, the output resembles that of `git log`, showing the most recent commit. It also includes any content changes made in that commit, similar to the `diff` command. 

You can also specify a commit ID to see details for a specific commit. For example:

```bash
git show 2dca417
```

**Sample Output for Specific Commit:**

```bash
commit 2dca4178sdsdd86789as7ea157dsdsd67sdff3d6
Author: Matt Martinez <matthewmartinez1003@gmail.com>
Date:   Wed Nov 20 16:50:24 2019 -0600

    Merge pull request #1 from cloudacademy/feature/update-title

diff --git a/README.md b/README.md
index ae05432..f2d9c95 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,2 @@
 Static Website Example
-Update this title
+Updated this title
```

This command provides both the commit details and the changes made in that specific commit.


## `git blame`

The `git blame` command helps you identify who made changes to specific lines in a file. It displays each line of a file alongside the commit information, making it easy to track changes over time.

You can use the command like this:

```bash
git blame README.MD
```

Sample output:

```bash
homelabs:~/example-git-repo$ git blame README.MD
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  1) Static Website Example
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  2) ----------------------
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  3) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  4) To be used with Cloud Academy labs.
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  5) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  6) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  7) License
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  8) ----------------------
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700  9) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 10) This static website is based on the Dimension template by [HTML5 UP](https://html5up.net/)
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 11) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 12) Creative Commons License
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 13) All of the site templates I create for [HTML5 UP](https://html5up.net/) are licensed under the Creative Commons Attribution 3.0 License, which means you can:
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 14)  - Use them for personal stuff
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 15)  - Use them for commercial stuff
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 16)  - Change them however you like
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 17) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 18) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 19) ... all for free, yo. In exchange, just give HTML5 UP credit for the design and tell your friends about it :)
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 20) 
^ae05432 (Ted Mosby 2019-11-19 15:31:36 -0700 21) More info [here](https://html5up.net/license).
```

The output from the `git blame` command shows each line of a file as a row. From left to right, each row includes:

- A commit ID
- The name of the committer
- The timestamp of when the change was made
- The content of the line

Developers use this command to find out who made specific changes and when those changes were made.



## `git tag`

The `git tag` command lets you create tags, which are Git objects that point to specific commits. Tags are useful for tracking versions of your codebase and are often used to mark release versions (like `v1.0.0`).

To create a tag, run:

```bash
git tag 0.1.0
```

**Sample Command and Output:**

```bash
$ git tag
0.1.0
```

After creating the tag, you can view it with the `git tag` command, which lists all tags in the repository.

When you look at the commit history with:

```bash
git log --oneline
```

**Sample Output:**

```bash
2dca417 (HEAD -> new_branch, tag: 0.1.0, origin/master, origin/HEAD, master) Merge pull request #1 from cloudacademy/feature/update-title
f2d9c95 (origin/feature/update-title) update title
ae05432 Initial commit
```

In this output, the tag `0.1.0` is associated with the commit `2dca417`. This demonstrates how tags point to specific commits, providing an easy way to reference important points in your project's history.

Tags are static and will not change, unlike branches, which move as new commits are added. This makes tags ideal for marking stable releases or versions of your codebase.

You can also use tags in various commands, like checking out, pushing, and pulling, ensuring you manage a specific version of the codebase.
