---
title: Reset root password
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 19
last_update:
  date: 3/27/2021
---


## Tasks

1. Assume you have lost the root user password. Fix and reset it.


## Solution


### 1. Reboot into single-user mode

Start or reboot your system. When the GRUB menu appears, use the arrow keys to select the appropriate kernel entry (usually the default one) and press `e` to edit.

Find the line starting with `linux` or `linux16`, move to the end of the line containing `ro` (which stands for read-only), and add `init=/bin/bash` at the end of the line. Press `Ctrl+X` or `F10` to boot into single-user mode with a root shell.

Example:
```
linux /vmlinuz-5.15.0-1.el8.x86_64 root=/dev/mapper/rhel-root ro init=/bin/bash
```


### 2. Remount the root filesystem as read-write

The root filesystem is initially mounted as read-only. Remount it as read-write to make changes:

```sh
mount -o remount,rw /
```

### 3. Reset the root password

Use the `passwd` command to set a new password for the root user. Enter the new password when prompted:

```sh
passwd
```

Example:
```
Changing password for user root.
New password:
Retype new password:
passwd: all authentication tokens updated successfully.
```

### 4. Reboot your system

After resetting the password, reboot your system to exit the single-user mode and start up normally:

```sh
reboot
```

### 5. Login with the new root password

Once the system has restarted, login as root using the new password you just set.
