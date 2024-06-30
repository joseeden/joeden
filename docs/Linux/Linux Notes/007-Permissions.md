---
title: Permissions
tags: [Linux, Red Hat, Certifications]
sidebar_position: 7
last_update:
  date: 7/8/2022
---




## Permissions

![](/img/docs/sv-permissions.png)
![](/img/docs/sv-permissions-2.png)

## Managing permissions

| Permission | If applied to Files | If applied to Directory
| --- | --- | --- |
| read (r) | read  | list the contents |
| write (W) | modify | delete /create |
| execute (x) |  run the file | can run "cd" |    


```bash
# to change permissions of a file
# to add RWX permissions for file.txt to all users 
chmod a+rwx file.txt

# to add RWX permissions for file.txt to group where ownner belongs
chmod g+rwx file.txt

# Note that we can add/remove permission through 2 methods
- text-based
- binary-based

# r=4, w=2, x=1 ,  then you just add them 
# to give all users, groups, others a full-RWX to file.txt, 
# then you just give them 7 each
chmod 777 file.txt

# to allow only user RWX
chmod 700 file.txt

# to allow only the user and the group he belongs to
chmod 770 file.txt

# to allow user=RWX and read-only to group and others
chmod 744 file.txt

# to allow user=RWX and allow group and others to execute file
# but not modify and write
chmod 755 file.txt

#

# to all users, groups, and others full-RWX, give them 

# to change ownership of a file to OWNER:GRP      
chown <owner>:<group> <file>
chown <owner>.<group> <file>

# to change ownership of file to to just owner or group
chown <owner> <file>
chown <group> <file>



# to change ownership  of dir and everything under it, "R" means recursive                     
chown -R <owner>:<grp> <dir>

# to change group ownership of a file
chgrp <groupname> <filename>

# to make a file immutable    
# this means file can't be edited even by root
chattr +i <file> 

# to change back a file to non-immutable
chattr -i <file>

# to make a file a "append-only mode"
chattr +a <file>

# to list the attributes      
lsattr
```

### Umask 

Shell setting that substracts the umask from the default permissions
- default permissions for a file is 666
- default permissions for a directory are 777
- configured in /etc/profile

```bash
## to change umask
umask <value>
```
----

### Special Permissions

These are permissions that you don't use on a daily basis.

| Permission | If applied to Files | If applied to Directory
| --- | --- | --- |
| setuid (4) | run as owner | none |
| setguid (2) | run as group owner | all files inside the dir will inherit the dir's group owner |
| sticky bit (!) |  none | delete only if owner of file/dir |    

**setuid** - only applies to executable files
**setgroupid** - sguid

![](/img/docs/sv-special-perm-3.png)

Files with sticky bits set will have "T" in their permission
![](/img/docs/sv-special-perm-4.png)
 
example:
here we see that the /etc/shadow has no permissions/special permission
```bash
[root@tst-rhel ~]# ll /etc/sh*
----------. 1 root root 1711 Dec 23 23:54 /etc/shadow
----------. 1 root root 1681 Dec 23 23:54 /etc/shadow-
```
The shadow file is being modified by the **passwd** command. This has no permission and can only be accessed by those who has root privileges.
```bash
[root@tst-rhel ~]# ls -l /usr/bin/passwd /etc/shadow
----------. 1 root root  1711 Dec 23 23:54 /etc/shadow
-rwsr-xr-x. 1 root root 33544 Dec 14  2019 /usr/bin/passwd
```

----

### Sticky Bit

Prevents users from modifying files unless the user owns the file/directory or as root.

```bash
- to set sticky bit to a          chmod o+t <dir>    
  directory

- another way to set sticky       chmod 1755 <dir>    
  bit to a directory
```

------------------------------------------------

### ACLs - Access Control Lists

![](/img/docs/sv-acl.png)
![](/img/docs/sv-acl-1.png)

In the command above, the '-m' means **to modify** and '-R' mans **recursive** which means the acls will be applied on all existing files or directories inside the directory. Note that if a new file is created inside that directory, it won't inherit the acl.

To make sure that all future files will have the same acls. we can set a **default** acl at the top-level directory by using 'd'.

In the example below, we created two groups with their own directories: account and sales
```bash
$ groupadd account
$ groupadd sales
$ 
$ mkdir account
$ mkdir sales
$ ll
total 0
drwxr-xr-x. 2 root root 6 Dec 25 15:02 account
drwxr-xr-x. 2 root root 6 Dec 25 15:02 sales
$
$ chown :sales sales/
$ chown :account account/
$ ll
total 0
drwxr-xr-x. 2 root account 6 Dec 25 15:02 account
drwxr-xr-x. 2 root sales   6 Dec 25 15:02 sales
$
$ chmod 770 sales/
$ chmod 770 account/
$ ll
total 0
drwxrwx---. 2 root account 6 Dec 25 15:02 account
drwxrwx---. 2 root sales   6 Dec 25 15:02 sales
```
Let's try to see the acls set on the sales directory.
We see that there's currently no acls set.
```bash
$ ll
total 0
drwxrwx---. 2 root account 6 Dec 25 15:02 account
drwxrwx---. 2 root sales   6 Dec 25 15:02 sales
$
$ getfacl sales/
# file: sales/
# owner: root
# group: sales
user::rwx
group::rwx
other::---

$
```

To set a default acls that will be inherited of all existing and future files/dirs inside the sales directory,
```bash
$ setfacl -m d:g:sales:rx sales/
$ getfacl sales/
# file: sales/
# owner: root
# group: sales
user::rwx
group::rwx
other::---
default:user::rwx
default:group::rwx
default:group:sales:r-x
default:mask::rwx
default:other::---

$
```

We can also see that there's now a '+' at the end of the permissions of the sales directory
```bash
$ ll
total 0
drwxrwx---. 2 root account 6 Dec 25 15:02 account
drwxrwx---+ 2 root sales   6 Dec 25 15:02 sales
```

If we now create files inside the top-level directory, it will inherit the acls.
```bash
$ touch sales/sales-2021
$ touch sales/sales-2020
$ touch sales/sales-2022
$
$ ll sales/
total 0
-rw-rw----+ 1 root root 0 Dec 25 15:11 sales-2020
-rw-rw----+ 1 root root 0 Dec 25 15:11 sales-2021
-rw-rw----+ 1 root root 0 Dec 25 15:11 sales-2022

$ getfacl sales/sales-2020
# file: sales/sales-2020
# owner: root
# group: root
user::rw-
group::rwx                      #effective:rw-
group:sales:r-x                 #effective:r--
mask::rw-
other::---
```