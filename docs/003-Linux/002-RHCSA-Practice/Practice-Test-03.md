---
title: Practice Test 03
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 4/22/2021
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->

## Lab 01 - Checking Jobs 

**Tasks:**

1. Determine when will the following jobs run:

    ```bash
    00 07 25 12 * /root/backup.sh
    */5 * * * * /root/take_stats.sh
    07 03 * * * /root/email_check.sh
    30 16 * * 5 /root/check_server.sh
    00 00 * * 1-5 /root/check_server.sh 
    ```


<details>
  <summary> **Solution** </summary>

Answer:

```bash
/root/backup.sh will run at 7 AM on Christmas Day(25th of December)
/root/take_stats.sh will run every 5 minutes
/root/email_check.sh will run every day at 3:07 AM
/root/check_server.sh will run every Friday at 4:30 PM
/root/check_server.sh will run at midnight on all weekdays(M,Tu,W,Th,F)
Note: 
```

Reference: 

| field | allowed values |
|-----| --------------
| minute | 0-59
|hour | 0-23
|day of month | 1-31
| month | 1-12 (or names, see below)
| day of week | 0-7 (0 or 7 is Sun, or use names)


</details>



## Lab 02 - Creating Jobs 

**Tasks:**

1. What command shows all of user ted’s scheduled jobs?
2. What command will allow root to setup a cron schedule for user ted to run the /bin/ls command every minute?

<details>
  <summary> **Solution** </summary>

Show all of ted’s scheduled jobs:

```bash
sudo crontab -u ted -l
```

What command will allow root to setup a cron schedule for user ted to run the /bin/ls command every minute.

```bash
sudo crontab -u ted -e
```

Once you type the above command, a temporary file will be opened in vi. You will need to type the following line and just save the file.

```bash
* * * * * /bin/ls
```

</details>



## Lab 03 - Users  

**Tasks:**

1. Print all usernames that begin with the letter r.
2. Search usernames that begin with the letter k and store them in a file named /tmp/k_user_list.txt.
3. Print all accounts whose shells (last column) are /sbin/nologin.


<details>
  <summary> **Solution** </summary>

Print all usernames that begin with the letter r.
```bash
grep "^r" /etc/passwd 
```

Search usernames that begin with the letter k and store them in a file named /tmp/k_user_list.txt
```bash
grep "^k" /etc/passwd > /tmp/k_user_list.txt  
```

Print all accounts whose shells (last column) are /sbin/nologin
```bash
grep "/sbin/nologin$" /etc/passwd 
```

</details>



## Lab 04 - Files 

**Tasks:**

1. List all files in /usr/share/doc that end with the number four. 
2. Search all lines with the word 'Romeo' from file /tmp/romeo.txt and order them in a-z. These ordered lines should be stored in a new file named /tmp/new.txt
3. Find all files named a.txt on eden’s home directory.
4. Find all files on your system whose permission is 777.
5. Find all files on your system whose owner is eden and redirect them to another file named /tmp/eden1.txt. 
6. Find all files on your system whose permission is 777 and change this permission to 700.
7. Find all files on your system that are owned by user eden and copy these files in a directory named /tmp/edendir.

<details>
  <summary> **Solution** </summary>

List all files in /usr/share/doc that end with the number four.
```bash
ls  /usr/share/doc | grep "4$"
```

Search all lines with the word 'Romeo' from file /tmp/romeo.txt and order them in a-z. These ordered lines should be stored in a new file named /tmp/new.txt
```bash
grep 'Romeo' /tmp/romeo.txt | sort > /tmp/new.txt
```

Find all files named a.txt on user eden’s home directory.
```bash
ls /home/eden | grep '^a.txt$'
```
```bash
find /home/eden -name 'a.txt' -print
```

Find all files on your system whose permission is 777.
```bash
find / -perm 777
```

Find all files on your system whose owner is user eden and redirect them to another file named /tmp/eden1.txt.
```bash
find / -user eden > /tmp/eden1.txt
```

Find all files on your system whose permission is 777 and change this permission to 700.
```bash
find / -perm 777 -exec chmod 700 {} 
```

Find all files on your system that are owned by user eden and copy these files in a directory named /tmp/edendir.
```bash
mkdir -p /tmp/edendir
find / -user eden -exec cp {} /tmp/edendir \;
```

</details>


## Lab 05 - Grep

**Tasks:**

Find the rows that contain "mongodb" from file /usr/bin/app, and write it to the file /tmp/app-list.txt.

<details>
  <summary> **Solution** </summary>

```bash
cat /usr/bin/app 
grep mongodb /usr/bin/app > /tmp/app-list.txt 
```

</details>


## Lab 06 - Autofs

**Tasks:**

Configure autofs to make sure after login successfully, it has the home directory autofs, which is shared as /home/ldapuser40 at the ip: 172.24.40.10. and it also requires that, other ldap users can use the home directory normally.

<details>
  <summary> **Solution** </summary>


```bash
sudo su -

# check if autofs exist
ll /etc/auto*
systemctl status autofs

# if the autofs are not found, install autofs
yum search autofs
yum install -y autofs
ll /etc/auto*

# edit the files
cd /etc
ll
vim auto.master
	/home	/etc/auto.ldap
vim auto.ldap
	/home/ldapuser40	-rw,soft,intr   172.24.40.10:/home/ldapuser40

# restart autofs
systemctl restart autofs
systemctl status autofs
showmount -e 172.24.40.10

# verify by loggin-in using the user
su - ldapuser40	
```
 

</details>


## Lab 07 - LVM

**Tasks:**

1. Create logical volume ‘lv1’ with volume group ‘group’.
2. The logical volume ‘lv1’ should be of size 60.
3. PE size should be 4 mb .
4. Filesystem type is ext4. This logical volume must be mounted at /mnt/redhat.
5. Extend by 10M.

<details>
  <summary> **Solution** </summary>


```bash
sudo su -
# create partition first, if created, proceed 
sudo fdisk /dev/xxx
pvcreate /dev/xxx1
pvs
vgcreate -s 4 group /dev/xxx1
vgs
lvcreate -l 60 -n lv1 group
lvs
mkfs.ext4 /dev/group/lv1

mkdir -p /mnt/redhat
vim /etc/fstab
	/dev/group/lv1	/mnt/redhat	xfs	defaults		0  0
	:wq!
lsblk
mount -a
lsblk
lsblk -f
```
```bash
lvextend -l +10 /dev/group/lv1
resize2fs /dev/group/lv1
lsblk
```

</details>



## Lab 08 - Users and Groups

**Tasks:**

1. Create the following users and groups with appropriate password assignments. 
2. Make sure that you force the users to change their password on the first logon.

| Groups | Users | Password |
|------|----------|-------|
| devteam | Tom, Pete, Vince, John | P@$$w0rdabc123  |
| devlead | James, Ben | P@$$w0rdxyz246 |


<details>
  <summary> **Solution** </summary>


Create the groups and users.

```bash
# Create groups
sudo su -
groupadd devteam
groupadd devlead

# Create users and add to respective groups
useradd -G devteam tom
useradd -G devteam pete
useradd -G devteam vince
useradd -G devteam kiran
useradd -G devlead james
useradd -G devlead ben

# Set passwords for users
echo 'P@$$w0rdabc123' | passwd --stdin tom
echo 'P@$$w0rdabc123' | passwd --stdin pete
echo 'P@$$w0rdabc123' | passwd --stdin vince
echo 'P@$$w0rdabc123' | passwd --stdin kiran
echo 'P@$$w0rdxyz246' | passwd --stdin james
echo 'P@$$w0rdxyz246' | passwd --stdin ben

# Force users to change passwords on next login
chage -d 0 tom
chage -d 0 pete
chage -d 0 vince
chage -d 0 kiran
chage -d 0 james
chage -d 0 ben
```


</details>



## Lab 09 - Cron

**Tasks:**

1. Build a shell script to take a backup of the /etc/directory every night using the tar command. 
2. The backup script should be named as /root/backup.sh. 
3. Schedule this script to run at 11:00 PM every night – except Sundays.

<details>
  <summary> **Solution** </summary>

Create the script. 

```bash
#!/bin/bash

# /root/backup.sh
# Backups /etc every night, except on Sundays

tar -czvf /etc/directory.bak.tar.gz /etc/dir
```

Add the cron schedule. 

```bash
crontab -e  
```
```bash
* 21 * * 1-6  /root/backup.sh
```
```bash
chmod +x /root/backup.sh
```
 
</details>


## Lab 10 - Permissions 

**Tasks:**

1. No users should be able to read the file "app-license.pdf" other than the users from the “devteam” group. 
2. It is assumed that root can read any files.

<details>
  <summary> **Solution** </summary>


```bash
chown root:devteam app-license.pdf
chmod 640 app-license.pdf
```

</details>



