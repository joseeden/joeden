---
title: Practice Test 05
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->


## Lab 01 - Users and Groups

**Tasks:**

You are given a responsibility to manage the security of a new project named PLATFORM on a new production server. Create the following users and groups with appropriate password assignments. Make sure that you force the users to change their password on the first logon

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



## Lab 02 - Cron

**Tasks:**

You need to take a backup of your /etc directory every night. Build a shell script to take a backup of the /etc/directory using the tar command. The backup script should be named as /root/backup.sh. Schedule this script to run at 11:00 PM every night – except Sundays.

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



## Lab 03 - Grep 

**Tasks:**

Find out the list of all users in the /etc/passwd file who have not been assigned a “/bin/bash” shell. Save this list in a file named /tmp/non_bash_user_list.txt. This list should be alphabetically arranged from z-a.

<details>
  <summary> **Solution** </summary>

Use grep:

```bash
grep -v "/bin/bash$" /etc/passwd | sort > /tmp/non_bash_user_list.txt
```


</details>




## Lab 04 - Permissions 

**Tasks:**

No users should be able to read the file "app-license.pdf" other than the users from the “devteam” group. It is assumed that root can read any files.

<details>
  <summary> **Solution** </summary>


```bash
chown root:devteam app-license.pdf
chmod 640 app-license.pdf
```

</details>



## Lab 05 - Users

**Tasks:**

Create a user named James with UID of 3151 and default login shell as “/bin/ksh” This user’s password should e set to "P@$$w0rdabc123"

<details>
  <summary> **Solution** </summary>

```bash
useradd -s /bin/ksh -u 3151 James
echo 'P@$$w0rdabc123' | passwd --stdin James
```


</details>



## Lab 06 - Cron

**Tasks:**

Setup a cron job for user James to execute a command /bin/echo “Hi How are you” at 1:20 PM on January 18, 2012.

<details>
  <summary> **Solution** </summary>

```bash
#Cron isn't really not suited with this scenario, better to use atd
# need to install atd first to run AT
# create script 'test.sh' which will contain command 
vim test.sh
  #!/bin/bash
  logger -p notice 'Hi How are you'

# Give execute permissions
chmod +x test.sh

# Schedule time
at -f /root/test.sh 13:20 01/18/2012
```

</details>



