---
title: User Administration
tags: [Linux, Red Hat, Certifications]
sidebar_position: 2
last_update:
  date: 7/8/2022
---


## Task 01

How to create user Ted's user account?

```bash
sudo useradd ted 
sudo passwd ted
```

## Task 02

How do you assign a password of "Qi5#1k" to user ted?
```bash
echo "Qi5#1k" | passwd --stdin ted 
```

## Task 03

What command would show the groups ted is a member of?
```bash
id ted
groups ted
```

## Task 04

How do you delete ted's user account?
```bash
sudo userdel -r ted 
```

## Task 05

How do you create a user named ted with a primary group of cprog and the secondary group of jprog?

```bash
groupadd cprog
groupadd jprog
useradd -g cprog -G jprog ted
```

Please note that the –g is used for assigning a primary group and –G is used for assigning a secondary group to a user.

## Task 06

What command would lock ted’s account?
```bash
sudo usermod -L ted
```

When an account is locked, user cannot log into his/her account even if the password is known. The first exclamation mark (!) in the /etc/shadow file will confirm that the account is locked.


## Task 07

What command would unlock ted’s account?
```bash
sudo usermod -U ted
```

## Task 08

What command would cause ted’s account to expire on march 15th 2012?
```bash
chage -E 2012-03-15 ted
```

## Task 09

How do you force a user ted to change his password on his next logon?
```bash
chage -d 0
```


## Task 10

How do you force user ted to have his password validity to 30 days? In other words ted’s password is valid only for 30 days since his last password change.

```bash
chage -M 30 ted
```

Information regarding the users’ password policy is stored in the /etc/shadow file.

## Task 11

How do you create a user named ted whose UID is 2013?

```bash
useradd -u 2013 ted
```
Note: UID is a unique number assigned to each user. This number is stored as a third field in the /etc/passwd file.


## Task 12

How do you create a user named ted who has access to an interactive shell? 

```bash
useradd -s /bin/bash ted
```

Note: There are multiple interactive shells like /bin/ksh, /bin/csh, /bin/bash etc. In the above example we have assigned /bin/bash to user ted.

## Task 13

Create user ted with non-interactive shell.
```bash
useradd ted -s /sbin/nologin  
```
If you want user ted to have a non-interactive shell - in other words you don’t want user ted to log in, you must assign a shell named /sbin/nologin as follows

