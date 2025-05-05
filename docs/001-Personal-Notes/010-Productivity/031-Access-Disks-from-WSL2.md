---
title: "Access Disks from WSL2"
description: "Access Disks from WSL2"
sidebar_position: 31
tags: 
- Development
- Terminal
- IDE
- Visual Studio Code
last_update:
  date: 11/22/2023
---

## Problem 

I needed to run some scripts that will modify files on other drives (some are network shares that are mounted on a different computer) in my Windows Desktop. Since I'm using WSL2 Ubuntu, I tried accessing the files in the other drives. 

After some researching online, I learned that Windows shared drives (SMB shares) aren't automatically seen my WSL2:

- WSL2 doesn't automatically inherit Windows network mappings 
- WLS2 can't see mapped network shares unless explicity mapped


## Solution 

Install required packages in WSL2:

```bash
sudo apt update
sudo apt install cifs-utils
```

Next, create a mount point: 

```bash
sudo mkdir /mnt/share-books 
```

:::info 

If you have multiple network shares that you want to access in WSL2, create separate mount points for each. 

::: 

Mount the share. This can be done using the the `mount` command, or simply add the entry in `/etc/fstab` to mount it permanently:

```bash
\\\\ComputerA\Books /mnt/share-books drvfs 0 0
```

Note that the `\\ComputerA\Books` refers to the shared folder name on ComputerA, which points to the disk or directory being shared from that machine.

## Share Path Doesn't Exist 

If you get this error:

```bash
mount: /mnt/share-path: special device \\\\ComputerA\sharepath does not exist.
<3>WSL (7444 - ) ERROR: UtilCreateProcessAndWait:688: /bin/mount failed with status 0x2000 
```

You can check if the shared path actually exists using command prompt:

```bash
net view \\ComputerA
```

Sample output:

```bash
Shared resources at \\ComputerA

Share name  Type  Used as  Comment

-------------------------------------------------------------------------------
Lenovo      Disk  V:
Books       Disk  W:
Media       Disk  Z:
Programs    Disk  Y:
The command completed successfully.
``` 


