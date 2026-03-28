---
title: "Making Changes"
description: "Comparing files and repositories at different times"
tags: 
- Version Control
- Git
- Software Development
sidebar_position: 4
last_update:
  date: 8/11/2019
---


## `git log` 

Shows a history of commits, including author, date, and commit message.  

```bash
git log --oneline
```

Sample output:

```
* 7f71eade (HEAD -> main) Adding fresh data for the survey.
* 1182c282 Added CSV data file
* 36b761e4 Added reminder to cite funding sources.
* e39ecc89 Added summary report file.
```

To find which commit caused an issue, note the first 6-8 characters of the commit hash, then use `git show` to inspect it:  

```bash
git show 36b761e4  
```

To look at the git history of a particular file:

```bash
git log sample-report.md 
```

## Customize Log Output 

To look at the git history of a particular file:

```bash
git log sample-report.md 
```

To limit the number of commits displayed:

```bash
git log -3    # limit to 3 commits  
```

Restrict log by date:

```bash
git log --since='Month Day Year'
```

As an example:

- Commits since 27 May 2019:

    ```bash
    git log --since='May 27 2019'
    ```

- Commits between April 19 to June 30 2019:

    ```bash
    git log --since='April 19  2019' --until='June 30 2019
    ```


## `git diff` 

This command shows changes in your files compared to previous commits or between specific commits. It works with both Git-tracked and untracked files.

```bash
git diff
```

Common ways to use `git diff`:

1. Compare working directory with the last commit:

    ```bash
    git diff <file-path>
    ```

    Example:

    ```bash
    git diff report.md  
    ```

    Sample output:

    ```bash
    diff --git a/report.md b/report.md
    index e69de29..d95f3ad 100644
    --- a/report.md
    +++ b/report.md
    @@ -1,3 +1,5 @@
    +Reminder: Cite funding sources.
    Data analysis results:
    - Survey responses processed.
    ```

2. Compare working directory with a specific commit:

    ```bash
    git diff <commit-id> <file-path>
    ```

    Example:

    ```bash
    git diff 123456 report.md  
    ```

    Sample output:

    ```bash
    diff --git a/report.md b/report.md
    index d95f3ad..f3a1b2c 100644
    --- a/report.md
    +++ b/report.md
    @@ -2,3 +2,4 @@
    - Survey responses processed.
    +Add final review comments.
    ```

3. Compare two commits for a specific file:

    ```bash
    git diff <commit-id-1> <commit-id-2> <file-path>
    ```

    Example:

    ```bash
    git diff 123456 abcdef report.md
    ```

    Sample output:

    ```bash
    diff --git a/report.md b/report.md
    index e69de29..f3a1b2c 100644
    --- a/report.md
    +++ b/report.md
    @@ -1,3 +1,5 @@
    +Reminder: Cite funding sources.
    Data analysis results:
    - Survey responses processed.
    +Add final review comments.
    ```


4. Compare two files in the working directory or on disk:

    ```bash
    git diff <file-path-1> <file-path-2>
    ```

    Example:

    ```bash
    git diff report_v1.md report_v2.md  
    ```

    Sample output:

    ```bash
    diff --git a/report_v1.md b/report_v2.md
    index e69de29..f3a1b2c 100644
    --- a/report_v1.md
    +++ b/report_v2.md
    @@ -1,2 +1,3 @@
    -Data analysis results:
    +Data analysis results:
    +Add final review comments.
    ```

5. Compare the working directory with the latest commit for all files:

    ```bash
    git diff -r HEAD
    ```

    Sample output:

    ```bash
    diff --git a/report.md b/report.md
    index e69de29..d95f3ad 100644
    --- a/report.md
    +++ b/report.md
    @@ -1,3 +1,5 @@
    +Reminder: Cite funding sources.
    Data analysis results:
    - Survey responses processed.
    ```




## `.diff` File

A `.diff` file shows the differences between two versions of a file. It uses special symbols to indicate changes, which can be read by other systems to apply updates. Developers often use `.diff` files as patches to submit changes. Because all changes are in a single file, it’s called a **unified diff**.

Symbols in a unified diff:

| Symbol      | Meaning                                    |
| ----------- | ------------------------------------------ |
| `+`         | Line has been added                        |
| `-`         | Line has been removed                      |
| `/dev/null` | Indicates a file has been added or removed |
| `(blank)`   | Context lines around changes               |
| `@@`        | Marks the start of a new block of changes  |
| `index`     | Shows the commits being compared           |

Here’s a sample unified diff for a file named `check-network.yml`:

```bash
diff --git a/check-network.yml b/check-network.yml
index 09b4f0c..b1978ca 100644
--- a/check-network.yml
+++ b/check-network.yml
@@ -4,7 +4,7 @@
   roles:
     - ansible-pyats
   vars:
-    snapshot_file: "{{ inventory_hostname }}_bgp.json"
+    snapshot_file: "{{ inventory_hostname }}_routes.json"
   tasks:
   - set_fact:
       snapshot_data: "{{ lookup('file', snapshot_file) | from_json }}"
@@ -13,7 +13,7 @@
 #      var: snapshot_data
 #
   - pyats_parse_command:
-      command: show ip route bgp
+      command: show ip route
       compare: "{{ snapshot_data }}"
     register: command_output
```

In this example:

- The line with `-` shows the old code
- The line with `+` shows the new code
- Context lines around changes indicates where the modification occurs

One change in this patch is renaming the snapshot file from `..._bgp.json` to `..._routes.json`.

```bash
-    snapshot_file: "{{ inventory_hostname }}_bgp.json"
+    snapshot_file: "{{ inventory_hostname }}_routes.json"
```

You can also view unified diffs for GitHub pull requests by adding `.diff` to the URL of the pull request. This format makes it easy to see changes clearly and apply them automatically if needed.


## `HEAD` 

In Git, `HEAD` points to the latest commit in your current branch. You can refer to previous commits relative to `HEAD` using `~n`, where **n** is the number of commits to go back.

- `HEAD~1` ➔ One commit before the latest
- `HEAD~2` ➔ Two commits before the latest
- `HEAD~3` ➔ Three commits before the latest

For example:

```bash
git show HEAD~3
```

This shows details of the commit three steps before `HEAD`.

When you run:

```bash
git log --oneline
```

Git displays a compact history of commits in the current branch. Each commit shows:

- A short commit hash (a unique identifier for the commit)
- The commit message

Example output:

```bash
a1b2c3d4 Add user authentication feature  
e5f6g7h8 Fix database connection issue  
i9j0k1l2 Update API endpoint response format  
m3n4o5p6 Initial project setup  
```

What happens:

- The latest commit appears at the top.
- Each line represents one commit in chronological order from newest to oldest.
- It’s a quick way to see the project’s commit history without all the detailed metadata.

You can use this output to reference commits in commands like `git show <commit>` or `git diff <commit>`.

## `git annotate`

This is used to show who last modified each line of a file along with commit details.

```bash
git annotate test-file.md  
```

Sample output:

```
a1b2c3d4 (Alice   2024-02-10 08:30:12 +0000  1) # Initial commit  
a1b2c3d4 (Alice   2024-02-10 08:30:12 +0000  2) Added authentication module  
e5f6g7h8 (Bob     2024-02-11 14:15:47 +0000  3) Refactored database connection  
i9j0k1l2 (Charlie 2024-02-12 16:50:33 +0000  4) Updated API response format  
```


## `git blame`

Similar to `git annotate`, but is the standard command for tracking line modifications.  

```bash
git blame test-file.md  
```

Sample output:

```
a1b2c3d4 (Alice   2024-02-10 08:30:12 +0000  1) # Initial commit  
a1b2c3d4 (Alice   2024-02-10 08:30:12 +0000  2) Added authentication module  
e5f6g7h8 (Bob     2024-02-11 14:15:47 +0000  3) Refactored database connection  
i9j0k1l2 (Charlie 2024-02-12 16:50:33 +0000  4) Updated API response format  
```

## Removing Files in Git

### Using `git rm`

The `git rm` command removes files both the working directory and staging area. It stages the change for the next commit.

**Note:** `<file-path>` can be an absolute or relative path

```bash 
git rm <file-path-1> ... <file-path-n>
```

To remove a file from the repository but keep it in your working directory:

```bash 
git rm --cached <file-path-1> ... <file-path-n>
```

<div class='img-center'>

![](/img/docs/devnet-gitrm1.png)

</div>

### Using filesystem commands

You can also delete files manually and then stage the removal:

```bash 
rm <file-path-1> ... <file-path-n>
git add <file-path-1> ... <file-path-n>
```

This achieves the same result as `git rm`, but does not allow you to keep the files in the working directory.


## Unstaging changes

Undo changes before committing by resetting files from the staging area.  

```bash
git reset HEAD sample-report.csv  
```  

To unstage all files:  

```bash
git reset HEAD  
```  

## Undo changes to unstaged file 

Discard changes made to a file before staging. This is also the same command used to revert the file to an old version. 

```bash
git checkout -- sample-report.csv  
```  

`git checkout` reverts a file to its last committed version.  

:::warning 

This action is irreversible. Changes will be lost permanently.

:::

To undo changes in all unstaged files:  

```bash
git checkout .  
```  

To revert to a version from a specific commit:

```bash
git checkout asdety890 sample-report.csv  ## asdety890 is the hash
```  

To restore the entire repo to a previous state, specify the commit without specifying any file.

```bash
git checkout 123hjklsd                    ## 123hjklsd is the hash
```

## Cleaning the repository 

To see which files are not being tracked:

```bash
git clean -n  
```

Next, proceed to deleting those files:

```bash
git clean -f 
```

⚠️ This action is irreversible - files will be removed for good.
