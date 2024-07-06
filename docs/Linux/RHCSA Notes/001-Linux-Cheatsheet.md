---
title: Commands Cheatsheet
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 2/24/2021
---

<!-- > This is the first-part of a series of bite-sized Linux sessions.
> Easy to digest with only the important details you need to know!

Hey there! You're probably looking for a quick and short but concise way to get your hands dirty in the command line. In this multi-part series, we'll skip over the history lessons as I'm sure lots of tutorials have shown how Linus Torvalds came up with the idea of Linux. <br>
Now, onto the main material! 😃 -->

## Directory

| Commands | Description | 
| --- | --- |
| <code>pwd</code> | Displays the current directory |
| <code>ls </code> | Lists the contents of a directory |
| <code>ls -la</code> | Lists the contents but also shows permissions, user, group, size, and date/time created.
| <code>ls -latr</code> | Similar with ls -la, but the *t* flag sorts contents from newest to oldest. *r* flag does the reverse.<br/>Check out other flags by typing-in *man ls*
| <code>ll</code> | Shortcut for *ls -l*. Note that this doesn't always work |
| <code>cd</code> | Change directory, goes to the /root/ directory |
| <code>cd ~</code> | Goes to the root directory |
| <code>cd *directory-name*</code> | Goes to the directory selected. Change the *directory-name* to desired directory. |
| <code>cd ..</code> | Goes one-level up. Returns to previous directory. | 


## Text Files: Creating and Editing

| Commands | Description | 
| --- | --- |
| <code>touch *file-name*</code> | Creates a text file. Change *file-name*.| 
| <code>echo *text*</code> | Prints *text* onto the screen, doesn't create a file | 
| <code>echo *text* > *file-name* </code> | Doesn't print the *text* but instead redirect it to a new file called *file-name*. Note that *file-name* is now created.| 
| <code>cat *file-name*</code> | Display contents of text file| 
| <code>echo *new-text* > *file-name*</code> | Redirects *new-text* to *file-name*. Note that when using redirect, it replaces the entire content.| 
| <code>echo *newer-text* >> *file-name*</code> | Appends *newer-text* at the end of the content of *file-name*| 
| <code>vi *file-name*</code> | Edit *file-name* through vi| 
| <code>vim *file-name*</code> | Edit *file-name* through vi improved| 
| <code>nano file-name</code> | Edit *file-name* through nano| 


## Specific 

To search for a keyword in all files within a directory and its subdirectories, excluding a specific file:

```bash
grep -r --exclude="name-of-files" "keyword" /path/to/directory 
```

Example: To check the values for "sidebar_position" for all files within the current directory, wwhile excluding dummy files called "create-a-document.md":

```bash
grep -r --exclude="create-a-document.md" "sidebar_position:" . 
```

Output:

```bash
./Amazon Web Services/Troubleshooting Notes/001-Attaching-multiple-EBS.md:sidebar_position: 1
./Amazon Web Services/Troubleshooting Notes/002-Expanding-EBS-Volumes.md:sidebar_position: 2
./Amazon Web Services/Troubleshooting Notes/003-EBS-stuck-in-Attaching.md:sidebar_position: 4
./Amazon Web Services/Troubleshooting Notes/004-EC2-Stuck-in-Initializing.md:sidebar_position: 52
./intro.md:sidebar_position: 1
./Linux/Linux Security/001-IPTables.md:sidebar_position: 1
./Linux/Linux Security/009-IPTables-and-getting-locked-out.md:sidebar_position: 9
./Linux/Linux Security/010-Firewalld.md:sidebar_position: 2
./Linux/Linux Security/020-SSH-Based-Logins.md:sidebar_position: 3
./Linux/Linux Security/030-SELinux.md:sidebar_position: 4
./Linux/Linux Security/040-Security-Updates.md:sidebar_position: 99
./Linux/RHCSA Labs/Lab 000 - Exam Objectives/README.md:sidebar_position: 1
./Linux/RHCSA Labs/Lab 001 - Basic Installation/README.md:sidebar_position: 1 
```