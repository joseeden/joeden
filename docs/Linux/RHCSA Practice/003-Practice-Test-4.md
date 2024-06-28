---
title: Practice Test 04
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---


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




