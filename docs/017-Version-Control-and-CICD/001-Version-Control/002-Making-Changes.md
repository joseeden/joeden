---
title: "Making Changes"
description: "Comparing files and repositories at different times"
tags: 
- Version Control
- Git
- Software Development
sidebar_position: 2
last_update:
  date: 2/5/2020
---


## `git log` 

Shows a history of commits, including author, date, and commit message.  

```bash
add sample command  
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


## View changes

Shows differences between the working directory and the latest commit.  

```bash
git diff -r HEAD 
```

Sample Output:

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


## `HEAD` 

In `git show HEAD~3`, the **`3`** represents how many commits to go back from `HEAD` (the latest commit).  

- `HEAD~1` → One commit before the latest  
- `HEAD~2` → Two commits before the latest  
- `HEAD~3` → Three commits before the latest  

So, `git show HEAD~3` displays details of the commit that is **three commits before the current `HEAD`**.  

If you run:  
```bash
git log --oneline
```

Consider the sample commits below:

```bash
$ git log --oneline

a1b2c3d4 Add user authentication feature  
e5f6g7h8 Fix database connection issue  
i9j0k1l2 Update API endpoint response format  
m3n4o5p6 Initial project setup  
```

Here, using `HEAD~3` will refer to `m3n4o5p6`, the **fourth commit in the list**, because we count back three steps from `HEAD`.

## Comparing two commits 

Shows differences between two commits.  

```bash
git diff 123456 asdfg123  
```

Alternatively, compare commits using relative references:  

```bash
git show HEAD~3 HEAD~2  
```


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

Discard changes made to a file before staging.  

```bash
git checkout -- sample-report.csv  
```  

`git checkout` reverts a file to its last committed version.  

⚠️ This action is irreversible—changes will be lost permanently.  

To undo changes in all unstaged files:  

```bash
git checkout .  
```  
