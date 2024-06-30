---
title: File Management
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 5
last_update:
  date: 2/27/2022
---


## Tasks

1. Create the following directories:
	- /tmp/files/pics
	- /tmp/files/photos
	- /tmp/files/vids
2. From /etc, copy all files with:
	- name starting with an a, b, or c to /tmp/files
3. From /tmp/files, move all files with
	- name starting with a or b to /tmp/files/photos
	- name starting with c to /tmp/files/videos
4. Find all files in /etc that's less than 1000 bytes in size then copy them to  /tmp/files/pics.
5. In /tmp/files, create a symbolic link to /var.
6. Create a compressed archive file of the /home directory
7. Extract thi compressed archive file with relative file names in /tmp/archive

## Solution

### 1. Create the following directories

Always a good practice to check contents before anything else.

```bash
~ $ ll /tmp/
total 0
drwx------. 3 root root 17 Jan  6 17:15 systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SNBAPh
```

Here we'll use a shortcut. The '-p' is to create parent directory if they're not created. In this case the parent directory is /tmp, which is already created. Inside it, the subsequent directory is 'file' which is not yet created.

To reduce time, we also defined all three subdirectories inside braces.

```bash
~ $ mkdir -p /tmp/files/{pics,photos,vids}
~ $ ll /tmp/
total 0
drwxrwxr-x. 5 eden eden 44 Jan  8 09:58 files
drwx------. 3 root root 17 Jan  6 17:15 systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SNBAPh
~ $
~ $ ll /tmp/files
total 0
drwxrwxr-x. 2 eden eden 6 Jan  8 09:58 photos
drwxrwxr-x. 2 eden eden 6 Jan  8 09:58 pics
drwxrwxr-x. 2 eden eden 6 Jan  8 09:58 vids
```

### 2. Files with names starting with specific letters

If we check contents of /etc, we'll see that it has a lot of files. We can also use **wc** to see how many lines(files), word, and size.

```bash
~ $ ll /etc/ | wc
    201    1836   12069
```

To copy specific files, run the command below. Note that will copy directories and files that can only be accessed by root.

```bash
~ $ cp /etc/[a-c]* /tmp/files/
cp: -r not specified; omitting directory '/etc/alternatives'
cp: -r not specified; omitting directory '/etc/audit'
cp: -r not specified; omitting directory '/etc/authselect'
cp: -r not specified; omitting directory '/etc/bash_completion.d'
cp: -r not specified; omitting directory '/etc/binfmt.d'
cp: -r not specified; omitting directory '/etc/chkconfig.d'
cp: cannot open '/etc/chrony.keys' for reading: Permission denied
cp: -r not specified; omitting directory '/etc/cifs-utils'
cp: -r not specified; omitting directory '/etc/cloud'
cp: -r not specified; omitting directory '/etc/corosync'
cp: -r not specified; omitting directory '/etc/cron.d'
cp: -r not specified; omitting directory '/etc/cron.daily'
cp: -r not specified; omitting directory '/etc/cron.hourly'
cp: -r not specified; omitting directory '/etc/cron.monthly'
cp: -r not specified; omitting directory '/etc/cron.weekly'
cp: -r not specified; omitting directory '/etc/crypto-policies'
cp: cannot open '/etc/crypttab' for reading: Permission denied
```
```bash
~ $ cd /tmp/files/
files $ ll
total 44
-rw-r--r--. 1 eden eden   16 Jan  8 10:04 adjtime
-rw-r--r--. 1 eden eden 1529 Jan  8 10:04 aliases
-rw-r--r--. 1 eden eden  541 Jan  8 10:04 anacrontab
-rw-r--r--. 1 eden eden   78 Jan  8 10:04 auto.files
-rw-r--r--. 1 eden eden 1061 Jan  8 10:04 auto.master.rpmsave
-rw-r--r--. 1 eden eden 3019 Jan  8 10:04 bashrc
-rw-r--r--. 1 eden eden  535 Jan  8 10:04 bindresvport.blacklist
-rw-r--r--. 1 eden eden 1168 Jan  8 10:04 chrony.conf
-rw-r--r--. 1 eden eden    0 Jan  8 10:04 cron.deny
-rw-r--r--. 1 eden eden  451 Jan  8 10:04 crontab
-rw-r--r--. 1 eden eden 1629 Jan  8 10:04 csh.cshrc
-rw-r--r--. 1 eden eden 1078 Jan  8 10:04 csh.login
drwxrwxr-x. 2 eden eden    6 Jan  8 09:58 photos
drwxrwxr-x. 2 eden eden    6 Jan  8 09:58 pics
drwxrwxr-x. 2 eden eden    6 Jan  8 09:58 vids
```

### 3. From /tmp/files, move all files with

Move the following files:

- name starting with a or b to /tmp/files/photos
- name starting with c to /tmp/files/videos

First off, all files beginning with 'a' or 'b'.

```bash
files $ mv [a,b]* photos/
files $ ll
total 16
-rw-r--r--. 1 eden eden 1168 Jan  8 10:04 chrony.conf
-rw-r--r--. 1 eden eden    0 Jan  8 10:04 cron.deny
-rw-r--r--. 1 eden eden  451 Jan  8 10:04 crontab
-rw-r--r--. 1 eden eden 1629 Jan  8 10:04 csh.cshrc
-rw-r--r--. 1 eden eden 1078 Jan  8 10:04 csh.login
drwxrwxr-x. 2 eden eden  143 Jan  8 10:08 photos
drwxrwxr-x. 2 eden eden    6 Jan  8 09:58 pics
drwxrwxr-x. 2 eden eden    6 Jan  8 09:58 vids
files $
files $ ll photos/
total 28
-rw-r--r--. 1 eden eden   16 Jan  8 10:04 adjtime
-rw-r--r--. 1 eden eden 1529 Jan  8 10:04 aliases
-rw-r--r--. 1 eden eden  541 Jan  8 10:04 anacrontab
-rw-r--r--. 1 eden eden   78 Jan  8 10:04 auto.files
-rw-r--r--. 1 eden eden 1061 Jan  8 10:04 auto.master.rpmsave
-rw-r--r--. 1 eden eden 3019 Jan  8 10:04 bashrc
-rw-r--r--. 1 eden eden  535 Jan  8 10:04 bindresvport.blacklist
```

Next, files starting with 'c'.
```bash
files $ mv c* vids/
files $ ll
total 0
drwxrwxr-x. 2 eden eden 143 Jan  8 10:08 photos
drwxrwxr-x. 2 eden eden   6 Jan  8 09:58 pics
drwxrwxr-x. 2 eden eden  91 Jan  8 10:10 vids
files $
files $ ll vids/
total 16
-rw-r--r--. 1 eden eden 1168 Jan  8 10:04 chrony.conf
-rw-r--r--. 1 eden eden    0 Jan  8 10:04 cron.deny
-rw-r--r--. 1 eden eden  451 Jan  8 10:04 crontab
-rw-r--r--. 1 eden eden 1629 Jan  8 10:04 csh.cshrc
-rw-r--r--. 1 eden eden 1078 Jan  8 10:04 csh.login
```

### 4. Files that are less than 1000 bytes in size

For this one, we'll use **find** command. Use **man find** then  **/size** to check for size
```bash
~ $ man find
       -size n[cwbkMG]
              File uses n units of space, rounding up.  The following suffixes can be used:

              `b'    for 512-byte blocks (this is the default if no suffix is used)

              `c'    for bytes

              `w'    for two-byte words

              `k'    for Kilobytes (units of 1024 bytes)

              `M'    for Megabytes (units of 1048576 bytes)

              `G'    for Gigabytes (units of 1073741824 bytes)
```
```bash
~ $ find -size -1000c /etc/
find: paths must precede expression: /etc/
Usage: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec] [path...] [expression]
~ $
~ $ find /etc -size -1000c
```

Then append **-exec** followed by the action that we want to do to these files.

```
~ # find /etc/ -size -1000c -exec cp {} /tmp/files/pics \;
pi s]# ll | wc
    407    3656   23631
```

### 5. Creating symbolic links

In /tmp/files, create a symbolic link to /var.

```
~ # cd /tmp/files/
fil s]# ll
total 16
drwxrwxr-x. 2 eden eden   143 Jan  8 10:08 photos
drwxr-xr-x. 2 root root 12288 Jan  8 10:20 pics
drwxrwxr-x. 2 eden eden    91 Jan  8 10:10 vids
fil s]#
fil s]# ln -s /var/ .
fil s]# ll
total 16
drwxrwxr-x. 2 eden eden   143 Jan  8 10:08 photos
drwxr-xr-x. 2 root root 12288 Jan  8 10:20 pics
lrwxrwxrwx. 1 root root     5 Jan  8 10:22 var -> /var/
drwxrwxr-x. 2 eden eden    91 Jan  8 10:10 vids
```

### 6. Creating a compressed archive file 

Tip: "c-compress", "z-zip". Use this if requirement is gzip.
If requirement is to use **xz**, then use "-J"

```
~ # tar -czvf home.zip /home/
tar: Removing leading `/' from member na
~ # ll home*
-rw-r--r--. 1 root root  8938 Jan  8 10:28 home
~ # file home.zip
home.zip: gzip compressed data, last modified: Sat Jan  8 10:28:31 2022, from Unix, original size 71680
```

### 7. Extracting a compressed archive file

Check the file. 

```
~ # ll /tmp/
total 0
drwxrwxr-x. 5 eden eden 55 Jan  8 10:22 files
drwx------. 3 root root 17 Jan  6 17:15 systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SNBAPh
```

Use semicolon after first command to specify the next command.
```
~ # mkdir /tmp/archive; tar xvf home.zip -C /tmp/archive
```
```
~ # ll /tmp/
total 0
drwxr-xr-x. 3 root root 18 Jan  8 10:40 archive
drwxrwxr-x. 5 eden eden 55 Jan  8 10:22 files
drwx------. 3 root root 17 Jan  6 17:15 systemd-private-b028330b03854c75a7b661162231a290-chronyd.service-SN
~ # ll /tmp/archive/ | wc
      2      11    

~ # ll /tmp/archive/
total 0
drwxr-xr-x. 6 root root 58 Jan  8 09:30 home
```




