---
title: "File Transfer"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 16
last_update:
  date: 7/8/2022
---




## File Transfer

Add short intro here 

![](/img/docs/sv-scp.png)

### SCP

Add short intro here 

Pre-requisites
- rsa keys should be generate (id_rsa and id_rsa.pub)
- contents of id_rsa.pub of source-svr should be added to the authorized_keys of dest. server

```bash
To copy a file from source-svr to dest-svr:

    scp -i ~/.ssh/id_rsa-rhel ~/1-transfers/hello.txt eden@1.1.1.1:/home/eden

Note that it consists of the following:
- "-i <path-of-private-key>"    --- this is the generated rsa key 
- "<path/file.txt>              --- this is the file to be copied across
- "username@<ip>:<path-on-dest> --- this is the path on the destination svr

Note that the specific folder on the destination server should be specified.
If folder exists, file will be copied there.
If not, folder will be created and the file will be copied there.
```

In my local VM, I created two local files and then transferred it to the remote EC2 machine, specifically to the /tmp.

```bash
[root@localhost ~]# touch /tmp/edenlocalfile-1
[root@localhost ~]# touch /tmp/edenlocalfile-2
[root@localhost ~]# 
[root@localhost ~]# ll /tmp/edenlocalfile-*
-rw-r--r--. 1 root root 0 Jan  3 23:16 /tmp/edenlocalfile-1
-rw-r--r--. 1 root root 0 Jan  3 23:16 /tmp/edenlocalfile-2
[root@localhost ~]# 
[root@localhost ~]# scp /tmp/edenlocalfile-* root@1.2.3.4:/tmp
Enter passphrase for key '/root/.ssh/id_rsa': 
edenlocalfile-1                                                 100%    0     0.0KB/s   00:00    
edenlocalfile-2                                                 100%    0     0.0KB/s   00:00   
```

Checking on my remote machine:

```bash
$ ll /tmp/edenlocalfile-*
-rw-r--r--. 1 root root 0 Jan  3 15:17 /tmp/edenlocalfile-1
-rw-r--r--. 1 root root 0 Jan  3 15:17 /tmp/edenlocalfile-2
```


### SFTP

add short intro here 

SFTP is enabled by default. You can find it in /etc/ssh/sshd_config.
Search for "Sftp"

```bash
137 # override default of no subsystems
138 Subsystem sftp  /usr/libexec/openssh/sftp-server
```

You first need to connect via sftp (from source) to the destserver.

```bash
$ sftp -i .ssh/id_rsa-rhel eden@1.1.1.1
Enter passphrase for key '.ssh/id_rsa-rhel':
Connected to eden@1.1.1.1
sftp>
sftp>
```

Once connected, source-svr has access to the files inside dest-svr. To grab the file and copy:
```bash
sftp> get howdy.txt
Fetching /home/eden/howdy.txt to howdy.txt
/home/eden/howdy.txt 
```
Files can also be renamed: 
```bash 
sftp> get howdy.txt howdy-yall.txt
Fetching /home/eden/howdy.txt to howdy-yall.txt
/home/eden/howdy.txt                                                     
sftp>
```

### Sync files using rsync

add short intro here 


![](/img/docs/sv-rsync.png)

On my remote EC2 machine, I created a few files:

```bash
$ touch /tmp/edenremotefile{1..10}
$ ls /tmp/edenremotefile*
/tmp/edenremotefile1   /tmp/edenremotefile2  /tmp/edenremotefile4  /tmp/edenremotefile6  /tmp/edenremotefile8
/tmp/edenremotefile10  /tmp/edenremotefile3  /tmp/edenremotefile5  /tmp/edenremotefile7  /tmp/edenremotefile9
```

On my local machine, I ran the rsync to sync the remote's tmp files to my local /tmp/data/.

```bash
[root@localhost ~]# mkdir /tmp/data
[root@localhost ~]# ll /tmp/data/
total 0
[root@localhost ~]# rsync -ar root@1.2.3.4:/tmp/eden* /tmp/data/
Enter passphrase for key '/root/.ssh/id_rsa': 
[root@localhost ~]# 
[root@localhost ~]# ls /tmp/data/
edenremotefile1   edenremotefile2  edenremotefile4  edenremotefile6  edenremotefile8
edenremotefile10  edenremotefile3  edenremotefile5  edenremotefile7  edenremotefile9
```

Let's say I delete some of the files in my remote EC2.

```bash
$ ll /tmp/edenremotefile*
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile1
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile10
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile2
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile3
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile4
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile5
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile6
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile7
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile8
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile9

$ rm -f /tmp/edenremotefile{5..8}

$ ll /tmp/edenremotefile*
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile1
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile10
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile2
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile3
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile4
-rw-r--r--. 1 root root 0 Jan  3 15:31 /tmp/edenremotefile9
```

Now I want to sync these files to another folder in my local machine.

```bash
[root@localhost ~]# rsync -ar root@1.2.3.4:/tmp/eden* /tmp/data/
Enter passphrase for key '/root/.ssh/id_rsa': 
[root@localhost ~]# 
[root@localhost ~]# ll /tmp/data2/
total 0
-rw-r--r--. 1 root root 0 Jan  3 23:31 edenremotefile1
-rw-r--r--. 1 root root 0 Jan  3 23:31 edenremotefile10
-rw-r--r--. 1 root root 0 Jan  3 23:31 edenremotefile2
-rw-r--r--. 1 root root 0 Jan  3 23:31 edenremotefile3
-rw-r--r--. 1 root root 0 Jan  3 23:31 edenremotefile4
-rw-r--r--. 1 root root 0 Jan  3 23:31 edenremotefile9
```

