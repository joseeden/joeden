---
title: Text Files
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 6
last_update:
  date: 3/27/2021
---

## Tasks

1. Display the fifth line of /etc/passwd
2. From the list of processes, filter the last column out.
3. In /etc, show the files that contain the word 'root' in them.
4. Show all lines from all files in /etc that contain exactly 2 characters.

## Solution

### 1. Display the fifth line of /etc/passwd

Use **head** to chop and get the first 5 lines. Then from this output, get last line using **tail**.

```bash
[root@tstsvr ~]# head -5 /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
[root@tstsvr ~]#
[root@tstsvr ~]# head -5 /etc/passwd | tail -1
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

We can also use **sed**.

```bash
[root@tstsvr ~]# sed -n 5p /etc/passwd
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

### 2. List specific processes and filter output

From the list of processes, list only the first five processes then filter for just the last column out.

```bash
[root@tstsvr ~]# ps aux | head -6
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  1.6 175128 13608 ?        Ss   Jan06   0:08 /usr/lib/systemd/systemd --switched-root --system --deserialize 16
root           2  0.0  0.0      0     0 ?        S    Jan06   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<   Jan06   0:00 [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<   Jan06   0:00 [rcu_par_gp]
root           6  0.0  0.0      0     0 ?        I<   Jan06   0:00 [kworker/0:0H-events_highpri]
```

Use **awk** to process the tex output to filter for only the last column.
```bash
[root@tstsvr ~]# ps aux | head -6 | awk '{print $NF}'
COMMAND
16
[kthreadd]
[rcu_gp]
[rcu_par_gp]
[kworker/0:0H-events_highpri]
```

### 3. Search for files containing a specific word

In /etc, show the files that contain the word 'root' in them. Display only the last five lines. Use **grep** then **\<word\>** to search.
```bash
grep '\<root\>' /etc/* | tail -5
```

Note that this will also return some errors. We can filter out the errors so we it just returns what we're looking for.
```bash
[root@tstsvr ~]# grep '\<root\>' /etc/* 2>/dev/null | tail -5
/etc/shadow-:root:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
/etc/sudoers:## the root user, without needing the root password.
/etc/sudoers:## Allow root to run any commands anywhere
/etc/sudoers:root       ALL=(ALL)       ALL
/etc/sudoers:## cdrom as root
```

### 4. Search for specific lines in files

Show all lines from all files in /etc that contain exactly 3 characters. 
Note that when grepping, one character is represented by '...'. So by that logic, we would assume it' simply,

```bash
grep '...' /etc/* 2>/dev/null
```

But this is incorrect because this will everything with three characters or more. To grep for words with **exactly just 3 characters**, we tell it to starts with and end with exactly three characters using '^' and '$'.

```bash
[root@tstsvr ~]# grep '^...$' /etc/* 2>/dev/null
/etc/adjtime:UTC
Binary file /etc/favicon.png matches
/etc/filesystems:hfs
/etc/krb5.conf:# }
Binary file /etc/localtime matches
/etc/sudoers:##
```

