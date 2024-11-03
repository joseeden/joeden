---
title: "VSCode Source Control Extension"
sidebar_position: 21
description: "Issues encountered on VSCode Source Control Extension"
tags: [Development, Terminal, IDE, Visual Studio Code, DevOps]
---

## Unable to Push Changes through Source Control Extension

I was previously using the Source Control extension to push changes to remote repositories, but it suddenly stopped working. Now, when I try to sync my local changes with the remote repository, I get an error.

<div class='img-center'>

![](/img/docs/11032024-vscode-issue-on-source-control-extension.png)

</div>

However, when I open the terminal in VSCode and navigate to the local repository, `git status` shows everything is up to date on the main branch:

```bash
$ git status 

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean  
```

The issue may be related to the `known_hosts` file. I have two such files: one in WSL and another on the C drive, which VSCode appears to be using. To verify, I checked both file locations, and each has its own set of files.

```bash
joseeden@EdenJose:~$ ls -la ~/.ssh/
total 32
drwx------  2 joseeden joseeden 4096 Nov  1 21:13 .
drwxr-x--- 19 joseeden joseeden 4096 Nov  3 08:58 ..
-rw-------  1 joseeden joseeden 3381 Jun 15 09:36 id_rsa
-rw-r--r--  1 joseeden joseeden  743 Jun 15 09:36 id_rsa.pub     
-rw-------  1 joseeden joseeden 5254 Nov  1 21:13 known_hosts    
-rw-------  1 joseeden joseeden 4418 Nov  1 21:13 known_hosts.old

joseeden@EdenJose:~$ ls -la /mnt/c/Users/Eden.Jose/.ssh/
total 16
drwxrwxrwx 1 joseeden joseeden  512 Nov  3 08:49 .
drwxrwxrwx 1 joseeden joseeden  512 Nov  2 16:57 ..
-rw-r--r-- 1 joseeden joseeden  374 Dec 29  2023 config     
-rwxrwxrwx 1 joseeden joseeden 3381 Nov  3 08:35 id_rsa     
-rwxrwxrwx 1 joseeden joseeden  743 Nov  3 08:35 id_rsa.pub 
-rwxrwxrwx 1 joseeden joseeden 1132 Nov  3 08:50 known_hosts 
```

Since the keys were old, I decided to generate a new keypair with a passphrase. I logged into GitHub, deleted the old SSH key, and uploaded the new public key.

```bash
ssh-keygen -t ed25519
```

To upload the key, go to GitHub > Settings > SSH and GPG Keys.

<div class='img-center'>

![](/img/docs/11032024-vscode-source-control-issue-create-new-key.png)

</div>

Next, I rescanned the key and saved it to the `known_hosts` file on the C drive.

```bash
ssh-keyscan -t rsa github.com >> /mnt/c/Users/Eden.Jose/.ssh/known_hosts 
```

I then confirmed the connection from the terminal:

```bash
$ ssh -T git@github.com

Enter passphrase for key '/home/joseeden/.ssh/id_ed25519':
Hi joseeden! You've successfully authenticated, but GitHub does not provide shell access.
```

Finally, I tried to sync changes from the VSCode Source Control extension, and this time it worked.

**Update .bashrc**

I also updated the .bashrc to use the new key.

```bash
$ vi ~/.bashrc 

# SSH Key
eval `ssh-agent`
ssh-add ~/.ssh/id_ed25519
```