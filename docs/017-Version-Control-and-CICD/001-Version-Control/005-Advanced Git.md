---
title: "Advanced Git"
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

```bash
git reset --soft HEAD~1
```

Notice that the commit labeled "add new pages" has been removed from your log.

The `HEAD~1` flag tells Git to reset your current branch to one commit before the latest one, effectively removing the last commit. The `--soft` flag instructs Git to keep any changes made since that commit, so your new files remain in the staging area. 

Alternatively, you could use the `--hard` flag, which would discard all changes made since the specified commit, deleting any new files. Be cautious with hard resets, as they are one of the few actions in Git that cannot be easily undone.



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
commit 2dca4178576c12ea60c6a8417ea15763b964f3d6 (HEAD -> new_branch, origin/master, origin/HEAD, master)
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

