---
sidebar_position: 5
---


# Advanced Git




## Stashing

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



## Rebase

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



## Viewing Logs 

To view all the commit made in your local branch, run the command below. You can also add some other options.

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

