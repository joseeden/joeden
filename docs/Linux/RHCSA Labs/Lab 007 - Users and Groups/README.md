---
title: 007-Users and Groups 
tags: [Linux, Red Hat, Certifications]
last_update:
  date: 2/27/2022
---

## Tasks

1. Make sure new users' passwords are 6-characters minimum and wth a maximum validity of 90 days.
2. Ensure that an empty file **newfil** is created on the home directory when new users are created.
3. Create users **ted, barney, robin, lily,** and **marshall**.
4. Set passwords for ted, barney, and robin to 'password'
5. Disable passwords for lily and marshall.
6. Create groups **teamted** and **teamrobin** and assign them the users:
	- TeamTed: ted, barney, marshall
	- TeamRobin: robin, lily

## Solution

### 1. Set password length and validity

Make sure new users' passwords are 6-characters minimum and wth a maximum validity of 90 days.

```bash
sudo sed -i 's/^PASS_MIN_LEN.*/PASS_MIN_LEN 6/' /etc/login.defs
```
```bash
sudo sed -i 's/^PASS_MAX_DAYS.*/PASS_MAX_DAYS 90/' /etc/login.defs 
```

### 2. Auto-create a file on new home directories

Ensure that an empty file **newfil** is created on the home directory when new users are created.
Create the file in the /etc/skel directory:

```bash
sudo touch /etc/skel/newfil
```

Check:

```bash
$ ll /etc/skel/
total 20
drwxr-xr-x  2 root root 4096 Jun 16 06:52 ./
drwxr-xr-x 75 root root 4096 Jun 29 11:30 ../
-rw-r--r--  1 root root  220 Jan  7  2022 .bash_logout
-rw-r--r--  1 root root 3771 Jan  7  2022 .bashrc
-rw-r--r--  1 root root  807 Jan  7  2022 .profile 
-rw-r--r--  1 root root  807 Jan  7  2022 newfil 
```


### 3. Create users

Create users **ted, barney, robin, lily,** and **marshall**.

```bash
sudo useradd ted
sudo passwd ted

sudo useradd barney
sudo passwd barney

sudo useradd robin
sudo passwd robin

sudo useradd lily
sudo passwd lily

sudo useradd marshall 
sudo passwd marshall
```

### 4. Set passwords for specific users

Set passwords for ted, barney, and robin to 'password'

```bash
echo "ted:password" | sudo chpasswd
echo "barney:password" | sudo chpasswd
echo "robin:password" | sudo chpasswd
```

### 5. Disable passwords for specific users

Disable passwords for lily and marshall.

```bash
sudo usermod -s /sbin/nologin lily
sudo usermod -s /sbin/nologin marshall
```

Now, when you try to login, it will automatically fail.

```bash
$ su - lily
Password:
su: Authentication failure 
```

### 6. Create groups and assign users

Create groups **teamted** and **teamrobin** and assign them the users:

- teamted: ted, barney, marshall
- teamrobin: robin, lily

Create the groups:

```bash
sudo groupadd teamted
sudo groupadd teamrobin
```

Add users to teamted:

```bash
sudo usermod -aG teamted ted
sudo usermod -aG teamted barney
sudo usermod -aG teamted marshall
```

Add users to teamrobin:

```bash
sudo usermod -aG teamrobin robin
sudo usermod -aG teamrobin lily
```