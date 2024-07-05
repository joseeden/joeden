---
title: Permissions
tags: [Linux, Red Hat, Certifications]
sidebar_position: 7
last_update:
  date: 12/23/2021
---



## Managing Permissions in Linux

In Linux, file and directory permissions control the level of access users have. These permissions are assigned to three classes: 

- the file owner (user)
- the group 
- others (everyone else)

Permissions determine whether a user can read, write, or execute a file or directory.

| Permission    | If applied to Files   | If applied to Directory   |
|---------------|-----------------------|---------------------------|
| read (r)      | read                  | list the contents         |
| write (w)     | modify                | delete/create             |
| execute (x)   | run the file          | can run `cd`              |

To see the current ownership and associatged permissions, use `ls -l`:

```bash
root@localhost:~# ls -la
total 44
drwx------  5 root root 4096 Jun 30 11:28 .
drwxr-xr-x 19 root root 4096 Jun 17 13:40 ..
-rw-------  1 root root  306 Jun 18 12:42 .bash_history
-rw-r--r--  1 root root 3106 Oct 15  2021 .bashrc
drwx------  2 root root 4096 Jun 15 09:23 .cache 
```

## Changing Permissions

To change permissions of a file using the `chmod` command, you can use either text-based or binary-based methods.

### Text-based 

This method specifies who the changes apply to (user, group, others), what changes to make (add, remove, set), and which permissions to alter (read, write, execute).

Examples:

1. Add read, write, and execute permissions (RWX) to all users for `file.txt`.

    ```bash
    chmod a+rwx file.txt
    ```

2. Add RWX permissions to the group for `file.txt`.

    ```bash
    chmod g+rwx file.txt
    ```

### Binary-Based

In this method, permissions are represented by numbers. The permissions for user, group, and others are combined together to form a three-digit number.

- read (r) = 4
- write (w) = 2
- execute (x) = 1 

Examples: 

1. Allow full RWX for All Users:

    ```bash
    chmod 777 file.txt
    ```

2. Allow RWX only for the User:

    ```bash
    chmod 700 file.txt
    ```

3. Allow RWX for User, Read-Only for Group and Others:

    ```bash
    chmod 744 file.txt
    ```

4. Allow RWX for User, Execute Only for Group and Others: 

    ```bash
    chmod 755 file.txt
    ```

## Changing Ownership

Examples: 

1. Change the ownership of `file` to the specified `owner` and `group`.

    ```bash
    chown <owner>:<group> <file>
    ```
    
    or
        
    ```bash
    chown <owner>.<group> <file>
    ```

2. Change the ownership of `file` to the specified `owner` or `group`.

    ```bash
    chown <owner> <file>
    ```
    or
    ```bash
    chown <group> <file>
    ```

3. Change the ownership of `dir` and everything under it to the specified `owner` and `group` recursively.

    ```bash
    chown -R <owner>:<group> <dir>
    ```

4. Change the group ownership of `filename` to the specified `groupname`.

    ```bash
    chgrp <groupname> <filename>
    ```

## Changing File Attributes

1. Make `file` immutable, meaning it cannot be edited even by root.

    ```bash
    chattr +i <file>
    ```

2. Change `file` back to non-immutable.

    ```bash
    chattr -i <file>
    ```

3. Make `file` append-only, meaning new data can be added, but existing data cannot be modified or deleted.

    ```bash
    chattr +a <file>
    ```

4. List the attributes of files in the directory.

    ```bash
    lsattr
    ```

## Umask

The `umask` is a shell setting that subtracts the umask value from the default permissions, determining the default permissions for newly created files and directories.

- Default permissions for a file: `666`
- Default permissions for a directory: `777`
- Configured in `/etc/profile`

To change umask:

```bash
umask <value>
```

## Special Permissions

Special permissions provide additional access control capabilities that are not used on a daily basis.

| Permission        | If applied to Files   | If applied to Directory                                                   |
|-------------------|-----------------------|---------------------------------------------------------------------------|
| setuid (4)        | run as owner          | none                                                                      |
| setguid (2)       | run as group owner    | all files inside the directory will inherit the directory's group owner   |
| sticky bit (1)    | none                  | delete only if owner of file/directory                                    |    

**setuid**: Applies only to executable files. When set, the file runs with the privileges of the file owner.

```bash
chmod 4770 filename.txt 
chmod u+s filename.txt 
```

**setgid**: Also known as sgid. When applied to files, they run with the privileges of the group owner. When applied to directories, all files created inside inherit the directory's group owner.

```bash
chmod 2770 /path/to/directory 
chmod g+s /path/to/directory
```

**Sticky bit**: When set on a directory, only the file's owner or root can delete or rename the files within that directory.

```bash
chmod 1770 /path/to/directory 
chmod +t /path/to/directory
```

Files with the sticky bit set will have a "T" in their permissions.

Example:

Here we see that the `/etc/shadow` file has no permissions set (only accessible by root).

```bash
[root@localhost ~]# ll /etc/sh*
----------. 1 root root 1711 Dec 23 23:54 /etc/shadow
----------. 1 root root 1681 Dec 23 23:54 /etc/shadow-
```
The `/etc/shadow` file is modified by the **passwd** command. It has no permissions and can only be accessed by users with root privileges.

```bash
[root@localhost ~]# ls -l /usr/bin/passwd /etc/shadow
----------. 1 root root  1711 Dec 23 23:54 /etc/shadow
-rwsr-xr-x. 1 root root 33544 Dec 14  2019 /usr/bin/passwd
```


## Sticky Bit

The sticky bit prevents users from modifying or deleting files unless they own the file/directory or have root privileges.

To set the sticky bit on a directory:

```bash
chmod o+t <dir>    
```

Another way to set the sticky bit on a directory:

```bash
chmod 1755 <dir>    
```

## ACLs - Access Control Lists

ACLs provide more flexible permissions by allowing you to set permissions for any user or group.

To modify ACLs and apply them recursively:

```bash
setfacl -m -R  g:somegroup:rx  /path/to/directory
setfacl -m     d:somegroup:rx  /path/to/directory
```

In the above command, `-m` means **to modify** and `-R` means **recursive**, which means the ACLs will be applied to all existing files or directories inside the specified directory. Note that new files created inside the directory won't inherit the ACL unless a **default** ACL is set. To ensure all future files will have the same ACLs, you can set a **default** ACL at the top-level directory using 'd'.

In the example below, two groups, `account` and `sales`, are created along with their respective directories.

```bash
$ groupadd account
$ groupadd sales

$ mkdir account
$ mkdir sales

$ ll
total 0
drwxr-xr-x. 2 root root 6 Dec 25 15:02 account
drwxr-xr-x. 2 root root 6 Dec 25 15:02 sales

$ chown :sales sales/
$ chown :account account/

$ ll
total 0
drwxr-xr-x. 2 root account 6 Dec 25 15:02 account
drwxr-xr-x. 2 root sales   6 Dec 25 15:02 sales

$ chmod 770 sales/
$ chmod 770 account/

$ ll
total 0
drwxrwx---. 2 root account 6 Dec 25 15:02 account
drwxrwx---. 2 root sales   6 Dec 25 15:02 sales
```

Check the ACLs set on the `sales` directory:

```bash
$ getfacl sales/
# file: sales/
# owner: root
# group: sales
user::rwx
group::rwx
other::---
```

Set a default ACL that will be inherited by all existing and future files/directories inside the `sales` directory:

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
```

Now, there is a '+' at the end of the permissions of the `sales` directory:

```bash
$ ll
total 0
drwxrwx---. 2 root account 6 Dec 25 15:02 account
drwxrwx---+ 2 root sales   6 Dec 25 15:02 sales
```

Creating files inside the top-level directory will now inherit the ACLs:

```bash
$ touch sales/sales-2021
$ touch sales/sales-2020
$ touch sales/sales-2022

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