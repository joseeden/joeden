---
title: Linux Commands Cheatsheet
tags: [Linux, Red Hat, Certifications]
sidebar_position: 2
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
| <code>ll</code> | Shortcut for *ls -l*. NOte that this doesn't always worl |
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


