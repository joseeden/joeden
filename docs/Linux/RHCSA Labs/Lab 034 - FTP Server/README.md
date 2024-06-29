---
title: 034 - FTP Server
tags: [Linux, Red Hat, Certifications]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---


## FTP Server

From [Install and configure FTP server on Linux Mint 20:](https://linuxhint.com/installing_ftp_server_linux_mint/)

> FTP or the File Transfer Protocol is the most popular network protocol that is used to transfer files and information between two systems over a network. However, the FTP by default does not encrypt the traffic, which is not a secure method and can result in an attack on a server. This is where VSFTPD comes which stands for Very Secure FTP Daemon and is a secure, stable, and fast FTP server.

Note that for this lab, I'm running two Amazon EC2-instances in my VPC.
- storesvr - FTP server
- tstrhel2 - FTP client 

On the FTP server, install VSFTPD.
```bash
$ sudo yum install -y vsftpd 
```

Configure the vsftpd.conf file.
```bash
$ sudo vim /etc/vsftpd/vsftpd.conf
```
```bash
listen=NO
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=Yes
pasv_enable=Yes
pasv_min_port=10000
pasv_max_port=10100
allow_writeable_chroot=YES
ssl_tlsv1=YES
ssl_sslv2=NO
ssl_sslv3=NO 
```

You may also add/enable this parameters in the file. **Make sure that you research, read, and understand what each of this parameters mean.**
```bash
anonymous_enable=YES
anon_upload_enable=YES
anon_mkdir_write_enable=YES
userlist_enable=NO
tcp_wrappers=YES
```

Reload VSFTPD after configuring the file.
```bash
$ sudo systemctl restart vsftpd 
```

Allow FTP on your firewall.
```bash
$ sudo firewall-cmd --add-port=21/tcp
$ sudo firewall-cmd --add-port=21/tcp --permanent
$ sudo firewall-cmd --add-service=ftp 
$ sudo firewall-cmd --add-service=ftp --permanent
$ sudo firewall-cmd --reload
$ sudo firewall-cmd --list-all
```

Since I'm using EC2, I have to configure the security group to allow FTP connections within the security group. We need to also allow some ports which will be used for the connection. Since this is a test lab, we can create a second rule which will allow ALL TCP connections from within the VPC.

![](Images/lab33sgallowftp.png)
![](Images/lab33sgallowftp3.png)

Now, to test. Try to FTP to the localhost. But first, let's create a **pub** directory in our $HOME directory. Inside **pub**, create an empty file named **sample.txt**.
```bash
$ mkdir pub
$ touch pub/sample.txt
```

Try to FTP. It will ask you for credentials. You cna use the current user.
```bash
[eden@storesvr ~]$ ftp 10.0.0.10
Connected to 10.0.0.10 (10.0.0.10).
220 (vsFTPd 3.0.2)
Name (10.0.0.10:eden): eden
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
ftp>
```

List down the files inside the FTP server.
```bash
ftp> ls
227 Entering Passive Mode (10,0,0,10,12,92).
150 Here comes the directory listing.
drwxrwxr-x    2 1000     1000           24 Mar 20 16:20 pub
226 Directory send OK.
```

To quit, type **quit** or **exit**.
```bash
ftp> exit
221 Goodbye.
[eden@storesvr ~]$
[eden@storesvr ~]$
```

Create a second user named **ted**.
```bash
$ sudo useradd ted
$ sudo passwd ted
```

Try to ftp again but this time, use the new user. You'll see that **pub** is not there. This is because when you FTP, you access the directory for the particular user. 
```bash
[eden@storesvr ~]$ ftp 10.0.0.10
Connected to 10.0.0.10 (10.0.0.10).
220 (vsFTPd 3.0.2)
Name (10.0.0.10:eden): ted
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
ftp>
```
```bash
ftp> ls
227 Entering Passive Mode (10,0,0,10,21,3).
150 Here comes the directory listing.
226 Directory send OK. 
```
Let's create a directory **designs** and some files inside it.
```bash
$ mkdir designs
$ touch designs/bprint1.txt 
$ touch designs/bprint2.txt 
$ touch designs/bprint3.txt 
$ touch designs/bprint{4..6}.txt 
```
```bash
[ted@storesvr ~]$ ll designs/
total 0
-rw-rw-r--. 1 ted ted 0 Mar 20 17:15 bprint2.txt
-rw-rw-r--. 1 ted ted 0 Mar 20 17:15 bprint3.txt
-rw-rw-r--. 1 ted ted 0 Mar 20 17:15 bprint4.txt
-rw-rw-r--. 1 ted ted 0 Mar 20 17:15 bprint5.txt
-rw-rw-r--. 1 ted ted 0 Mar 20 17:15 bprint6.txt
-rw-rw-r--. 1 ted ted 0 Mar 20 17:00 bprint.txt 
```

Note that the user must be created on the FTP server. If you try to connect using a user account that doesn't exit on the FTP server, you'll get an error.
```bash
[eden@storesvr ~]$ ftp 10.0.0.10
Connected to 10.0.0.10 (10.0.0.10).
220 (vsFTPd 3.0.2)
Name (10.0.0.10:eden): paul
331 Please specify the password.
Password:
530 Login incorrect.
Login failed.
ftp>
```
```bash
ftp> ls
530 Please login with USER and PASS.
Passive mode refused.
ftp>
ftp> 
```

----------------------------------------------

## FTP Client

For the client, you will need to install FTP.
```bash
$ sudo yum install -y ftp 
```

Configure firewall to allow FTP connections.
```bash
$ firewall-cmd --add-port=21/tcp
$ firewall-cmd --add-port=21/tcp --permanent
$ firewall-cmd --list-all
$ firewall-cmd --add-service=ftp
$ firewall-cmd --add-service=ftp --permanent
$ firewall-cmd --reload
$ firewall-cmd --list-all
```

----------------------------------------------

## Running FTP Commands

And that's it. But before we start, let's create a file named **plans.txt** in our $HOME directory.
```bash
[root@tstrhel2 ~]# touch plans{1..6}.txt
[root@tstrhel2 ~]# ll
total 0
-rw-r--r--. 1 root root 0 Mar 21 01:06 plans1.txt
-rw-r--r--. 1 root root 0 Mar 21 01:06 plans2.txt
-rw-r--r--. 1 root root 0 Mar 21 01:06 plans3.txt
-rw-r--r--. 1 root root 0 Mar 21 01:06 plans4.txt
-rw-r--r--. 1 root root 0 Mar 21 01:06 plans5.txt
-rw-r--r--. 1 root root 0 Mar 21 01:06 plans6.txt
```

Try to FTP to the FTP server using the user **ted**.
```bash
[root@tstrhel2 ~]# ftp 10.0.0.10
Connected to 10.0.0.10 (10.0.0.10).
220 (vsFTPd 3.0.2)
Name (10.0.0.10:root): ted
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
ftp>
```
```bash
ftp> ls
227 Entering Passive Mode (10,0,0,10,28,182).
150 Here comes the directory listing.
drwxrwxr-x    2 1001     1001           24 Mar 20 17:00 designs
226 Directory send OK. 
```
```bash
ftp> ls designs
227 Entering Passive Mode (10,0,0,10,21,216).
150 Here comes the directory listing.
-rw-rw-r--    1 1001     1001            0 Mar 20 17:00 bprint.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint2.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint3.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint4.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint5.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint6.txt
226 Directory send OK.
```

Let's download the **brpint1.txt** from the FTP server.
```bash
ftp> cd designs
250 Directory successfully changed.
```
```bash
ftp> get bprint.txt
local: bprint.txt remote: bprint.txt
227 Entering Passive Mode (10,0,0,10,28,229).
150 Opening BINARY mode data connection for bprint.txt (0 bytes).
226 Transfer complete. 
```
```bash
ftp> quit
221 Goodbye. 
```

After exiting out of the FTP connection, check if the file was copied locally.
```bash
[root@tstrhel2 ~]# ll
total 0
-rw-r--r--. 1 root root 0 Mar 21 01:21 bprint.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans1.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans2.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans3.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans4.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans5.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans6.txt
```

Connect to the FTP server again and this time, copy multiple files. Enter 'y' when asked if you want to proceed with mget.
```bash
ftp> mget bprint4.txt bprint5.txt bprint6.txt

mget bprint4.txt? y
227 Entering Passive Mode (10,0,0,10,26,154).
150 Opening BINARY mode data connection for bprint4.txt (0 bytes).
226 Transfer complete.

mget bprint5.txt? y
227 Entering Passive Mode (10,0,0,10,28,145).
150 Opening BINARY mode data connection for bprint5.txt (0 bytes).
226 Transfer complete.

mget bprint6.txt? y
227 Entering Passive Mode (10,0,0,10,24,97).
150 Opening BINARY mode data connection for bprint6.txt (0 bytes).
226 Transfer complete.

```

Exit out again and check if the files were copied locally.
```bash
[root@tstrhel2 ~]# ll
total 0
-rw-r--r--. 1 root root 0 Mar 21 01:27 bprint4.txt
-rw-r--r--. 1 root root 0 Mar 21 01:27 bprint5.txt
-rw-r--r--. 1 root root 0 Mar 21 01:27 bprint6.txt
-rw-r--r--. 1 root root 0 Mar 21 01:26 bprint.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans1.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans2.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans3.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans4.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans5.txt
-rw-r--r--. 1 root root 0 Mar 21 01:20 plans6.txt
```

What if we want to upload  **plans1.txt** file onto the FTP server. To do that, connect again and use **put**.
```bash
ftp> put plans1.txt
local: plans1.txt remote: plans1.txt
227 Entering Passive Mode (10,0,0,10,31,35).
150 Ok to send data.
226 Transfer complete.
```

Of course if we run this command, the file will be copied outside the **designs** directory. To delete this file,
```bash
ftp> delete plans1.txt
250 Delete operation successful.
```
```bash
ftp> ls
227 Entering Passive Mode (10,0,0,10,12,231).
150 Here comes the directory listing.
drwxrwxr-x    2 1001     1001          119 Mar 20 17:15 designs
226 Directory send OK. 
```

To upload the file to the **designs** folder, go to the folder and run the command.
```bash
ftp> cd designs
250 Directory successfully changed.
ftp>
ftp> put plans1.txt
local: plans1.txt remote: plans1.txt
227 Entering Passive Mode (10,0,0,10,17,39).
150 Ok to send data.
226 Transfer complete.
ftp>
ftp> ls
227 Entering Passive Mode (10,0,0,10,15,155).
150 Here comes the directory listing.
-rw-rw-r--    1 1001     1001            0 Mar 20 17:00 bprint.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint2.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint3.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint4.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint5.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint6.txt
-rw-r--r--    1 1001     1001            0 Mar 20 17:33 plans1.txt
226 Directory send OK.
ftp> 
```

To upload multiple files, 
```bash
ftp> mput plans2.txt plans3.txt plans4.txt
mput plans2.txt? y
227 Entering Passive Mode (10,0,0,10,17,151).
150 Ok to send data.
226 Transfer complete.
mput plans3.txt? y
227 Entering Passive Mode (10,0,0,10,27,254).
150 Ok to send data.
226 Transfer complete.
mput plans4.txt? y
227 Entering Passive Mode (10,0,0,10,30,237).
150 Ok to send data.
226 Transfer complete.
ftp>
ftp> ls
227 Entering Passive Mode (10,0,0,10,24,225).
150 Here comes the directory listing.
-rw-rw-r--    1 1001     1001            0 Mar 20 17:00 bprint.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint2.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint3.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint4.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint5.txt
-rw-rw-r--    1 1001     1001            0 Mar 20 17:15 bprint6.txt
-rw-r--r--    1 1001     1001            0 Mar 20 17:33 plans1.txt
-rw-r--r--    1 1001     1001            0 Mar 20 17:34 plans2.txt
-rw-r--r--    1 1001     1001            0 Mar 20 17:34 plans3.txt
-rw-r--r--    1 1001     1001            0 Mar 20 17:34 plans4.txt
226 Directory send OK.
ftp> 
```

Here are some common FTP commands.

| FTP Commands | Purpose | 
|----|-----|
| help or ? | list all available FTP commands.
| cd | change directory on the remote machine.
| lcd | change directory on the local machine.
| ls | list the names of the files and directories in the current remote directory.
| mkdir | create a new directory within the current remote directory.
| pwd | print the current working directory on the remote machine.
| delete | remove a file in the current remote directory.
| rmdir | remove a directory in the current remote directory.
| get | copy one file from the remote to the local machine.
| mget | copy multiple files from the remote to the local machine.
| put | copy one file from the local to the remote machine.
| mput | copy multiple files from the local to the remote machine.

----------------------------------------------

## Errors Encountered


#### Timing out when trying to connect to the FTP server
```bash
[root@tstrhel2 ~]# ftp 10.0.0.10

 
```
First things first, ensure that your EC2 instance's security group allows FTP connections from within the securty group.

![](Images/lab33alowftp21.png)


#### 227 Entering Passive Mode and then Connection Timed Out
```bash
ftp> ls
227 Entering Passive Mode (10,0,0,10,21,105).
ftp: connect: Connection timed out
```

The error could be caused by the passive port range being blocked on the FTP server's side. To resolve this, edit the EC2 instance's security group and create a second rule (in addition to rule for port 21) that allows a range of ports that can be used as passive ports.

![](Images/lab33sgallowftp.png)
![](Images/lab33sgallowftp3.png)

Next, ensure your machine's firewall is allowing the connection.
```bash
$ sudo firewall-cmd --add-port=21/tcp
$ sudo firewall-cmd --add-port=21/tcp --permanent
$ sudo firewall-cmd --add-service=ftp 
$ sudo firewall-cmd --add-service=ftp --permanent
$ sudo firewall-cmd --reload
$ sudo firewall-cmd --list-all
```

#### Connection refused

Encountered this one day after my finished my lab. 
```bash
[eden@tstrhel2 ~]$ ftp 10.0.0.10
ftp: connect: Connection refused 
```

I managed to make it work by simply restarting the VSFTPD on the FTP server.
```bash
[root@storesvr ~]# sudo systemctl restart vsftpd 
```

Back on the client,
```bash
[root@tstrhel2 ~]# ftp 10.0.0.10
Connected to 10.0.0.10 (10.0.0.10).
220 (vsFTPd 3.0.2)
Name (10.0.0.10:root): eden
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
ftp>
ftp> ls
227 Entering Passive Mode (10,0,0,10,9,78).
150 Here comes the directory listing.
drwxrwxr-x    2 1000     1000           19 Mar 21 03:26 pub
226 Directory send OK.
```

----------------------------------------------

## References

- [Install and configure FTP server on Linux Mint 20:](https://linuxhint.com/installing_ftp_server_linux_mint/)

- [How to Use Linux FTP Command to Transfer Files](https://linuxize.com/post/how-to-use-linux-ftp-command-to-transfer-files/)

- [How to Upload & Download Files From FTP in Linux](https://fedingo.com/how-to-upload-download-files-from-ftp-in-linux/)

- [227 entering passive mode ftp connect connection timed out – How we nailed it](https://bobcares.com/blog/227-entering-passive-mode-ftp-connect-connection-timed-out/)

- [227 Entering Passive Mode (0,0,0,0,...) when connecting to vsftpd FTP server](https://superuser.com/questions/1502015/227-entering-passive-mode-0-0-0-0-when-connecting-to-vsftpd-ftp-server)

- [Problems with FTP file access to VirtualBox guest running Windows 2008 Server R2 x64](https://superuser.com/questions/1094347/problems-with-ftp-file-access-to-virtualbox-guest-running-windows-2008-server-r2)

- [The remote server returned an error: 227 Entering Passive Mode (67,228,53,42,12,130)](https://social.msdn.microsoft.com/Forums/azure/en-US/0128e595-c8e2-4f5e-9426-fd93eb510cab/the-remote-server-returned-an-error-227-entering-passive-mode-67228534212130?forum=netfxnetcom)

- [227 Entering Passive Mode (124,153,94,30,242,138)](https://stackoverflow.com/questions/19603593/227-entering-passive-mode-124-153-94-30-242-138)

----------------------------------------------