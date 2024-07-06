---
title: "NFS file share"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 42
last_update:
  date: 1/7/2022
---

## What is RPCBIND?

`rpcbind` is a critical service required for the Network File System (NFS) to function properly. It serves as the remote procedure call (RPC) binding service, which is essential for enabling communication between systems over a network using TCP or UDP ports.

Remote Procedure Calls (RPCs) enable systems to communicate remotely over a network. Both the client and the server need to have RPC capabilities. One of the challenges with RPC is allowing the necessary ports through the firewall. This challenge is mitigated with NFS version 4, which simplifies port management.

```bash
$ sudo cat /proc/fs/nfsd/versions
-2 +3 +4 +4.1 +4.2
```

## NFS V3 or V4?

When deciding between NFSv3 and NFSv4, there are several factors to consider:

- **NFSv3**: Provides backward compatibility with older systems that do not support NFSv4. This is beneficial in environments with legacy systems.
- **NFSv4**: Offers enhanced security by requiring fewer open ports in the firewall. This makes it a more secure choice for modern systems.

With NFS version 4, you no longer need to install `rpcbind`, as it simplifies the network communication process and requires fewer open ports, enhancing security. To check the available NFS versions on your system, you can run the following command. Notice the `-2` in the output, indicating that version 2 support is currently turned off.

```bash
$ sudo cat /proc/fs/nfsd/versions

-2 +3 +4 +4.1 +4.2
```

To view the NFS configuration file, use the following command:

```bash
sudoedit /etc/nfs.conf
```


## Configuring a Base NFS Server

Setting up an NFS (Network File System) server on RHEL can be a bit tricky. By default, RHEL installs the NFS client, not the NFS server. This guide walks you through configuring an NFS server from scratch.

### Setup 

:::note

I encountered many errors while working on NFS labs. Initially, I used a hybrid setup with a local VM as the client and an EC2 instance as the NFS server. After extensive troubleshooting, I switched to a full cloud setup with both machines in the same VPC.

:::

Initially, this was my setup:

- **tst-rhel-a1**: EC2 instance serving as the remote NFS server.
- **tst-rhel-local**: RHEL VM in VirtualBox serving as the client.

After a day of troubleshooting, I switched to the following setup:

- **nfsserver**: EC2 instance serving as the remote NFS server.
- **nfsclient**: EC2 instance serving as the NFS client.

For additional guidance, I followed this detailed instruction: [How to Setup NFS Server on CentOS 8 / RHEL 8](https://www.linuxtechi.com/setup-nfs-server-on-centos-8-rhel-8/).

### Steps

1. **Install and Configure NFS on the NFS Server**

   Install the necessary packages and start the NFS server:

   ```bash
   sudo dnf install nfs-utils -y
   sudo systemctl enable --now nfs-server.service rpcbind
   sudo systemctl status nfs-server.service
   ```

   To check the version of NFS:

   ```bash 
   rpcinfo -p | grep nfs
   ```

2. **Create the Shared Directory**

   Create a shared directory structure and set appropriate permissions:

   ```bash
   sudo mkdir -p /shared/nfsshare
   sudo mkdir -p /shared/nfsshare-backups
   sudo chown -R root: /shared/*
   sudo chmod -R 777 /shared/*
   ```

   Restart the NFS service to apply changes:

   ```bash
   sudo systemctl restart nfs-utils.service
   ```

3. **Create the Exports File**

   Define the directories to be shared by editing the `/etc/exports` file:

   ```bash
   sudo vim /etc/exports
   ```

   Example configuration:

   ```bash
   /shared                   *(rw,sync,no_all_squash,root_squash)
   /shared/nfsshare          *(rw,sync,no_all_squash,root_squash)
   /shared/nfsshare-backups  *(rw,sync,no_all_squash,root_squash)

   /shared                   10.0.0.0/24(rw,sync,no_all_squash,root_squash)
   /shared/nfsshare          10.0.0.0/24(rw,sync,no_all_squash,root_squash)
   /shared/nfsshare-backups  10.0.0.0/24(rw,sync,no_all_squash,root_squash)
   ```

   Explanation:
   - `*`: All clients.
   - `sync`: Writes changes to disk before accepting new changes.
   - `root_squash`: Removes root permissions for clients acting as root.

   Export the directories:

   ```bash
   sudo exportfs -arv
   ```

   Verify the export list:

   ```bash
   sudo exportfs -s
   ```

4. **Configure Firewall**

   If `firewalld` is not installed, install and configure it to allow NFS-related services:

   ```bash
   sudo yum install -y firewalld 
   sudo systemctl enable --now firewalld
   sudo systemctl start firewalld
   sudo systemctl status firewalld
   ```

   Allow necessary services through the firewall:

   ```bash
   sudo firewall-cmd --permanent --add-service={nfs,mountd,rpc-bind}
   sudo firewall-cmd --reload
   sudo firewall-cmd --list-all
   ```


## Configure the NFS Client

### Mounting NFS Shares

Mounting NFS (Network File System) shares is a crucial step in configuring an NFS client. This allows the client machine to access directories on the NFS server as if they were local. The `_netdev` option in the mount command specifies that the mount should occur only after the network has been activated, ensuring network dependencies are met.


### Setup Considerations

:::note 

I encountered alot of error while working on this lab. After what seems to be rabbithole-path, I decided to change my setup from hybrid (client is local VM and NFS-Server is an EC2 instance in the cloud) to a full cloud-setup (both machine residing in the same VPC in the cloud)

:::

To ensure proper hostname resolution, add the remote machine's IP address and hostname to the `/etc/hosts` file on the client machine:

```bash
vim /etc/hosts
```

Add the following lines:

```bash
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

# Remote NFS-Share
1.2.3.4    nfsserver
```

### Steps

1. **Install Required NFS Packages**: Install the necessary NFS utilities and ensure `rpcbind` is enabled and running.

    ```bash
    sudo dnf install nfs-utils nfs4-acl-tools -y
    sudo systemctl enable --now rpcbind
    sudo systemctl status rpcbind
    ```

2. **Troubleshooting Showmount**: This was the part that cost me a lot of time troubleshooting. Initially, mounting doesn't also proceed. But when I moved both machine to the cloud, the mounting part occured but `showmount` still showed error. You can bypass this and check if you'll be able to mount the share. 

    If you encounter issues with the `showmount` command, you can skip it and proceed with mounting the NFS share directly.

    ```bash
    showmount -e 10.0.0.195
    clnt_create: RPC: Timed out

    showmount -e nfsserver
    clnt_create: RPC: Timed out
    ```

3. **Create Mount Directories**: Create the directories where the NFS shares will be mounted.

    ```bash
    sudo mkdir -p /mnt/client_share
    sudo mkdir -p /mnt/client_backups
    ```

4. **Mount the NFS Shares**: Mount the NFS shares and verify they are correctly mounted.

    ```bash
    sudo mount -vvvv -t nfs 10.0.0.195:/shared/nfsshare /mnt/client_share
    sudo mount -vvvv -t nfs 10.0.0.195:/shared/nfsshare-backups /mnt/client_backups
    ```

    Verify the mounts:

    ```bash
    mount | grep /mnt/client
    ```

5. **Make the Mounts Persistent**: Add entries to the `/etc/fstab` file to ensure the mounts persist across reboots.

    First, unmount the shares:

    ```bash
    umount /mnt/client_share
    ```

    Edit the `/etc/fstab` file:

    ```bash
    vim /etc/fstab
    ```

    Add the following lines:

    ```
    # NFS Shares
    10.0.0.195:/shared/nfsshare      /mnt/client_share                 nfs     _netdev         0 0
    10.0.0.195:/shared/nfsshare-backups      /mnt/client_backups                 nfs     _netdev         0 0
    ```

    Verify the mounts:

    ```bash
    mount | grep /mnt/client
    ```

    Expected output:

    ```
    10.0.0.195:/nfsshare on /mnt/client_share type nfs4 (rw,relatime,vers=4.2,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=10.0.0.90,local_lock=none,addr=10.0.0.195)
    ```

6. **Test Persistence After Reboot**: Ensure the NFS mounts persist after a system reboot.

    Unmount the share and reboot:

    ```bash
    umount /mnt/client_share
    reboot
    ```

    Verify the mounts again after reboot:

    ```bash
    mount | grep /mnt/client
    ```

    Expected output:

    ```
    10.0.0.195:/nfsshare on /mnt/client_share type nfs4 (rw,relatime,vers=4.2,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=10.0.0.90,local_lock=none,addr=10.0.0.195)
    ```


## NFS Errors

### clnt_create: RPC: Timed out

One of the early errors I encountered was I was not able to show the NFS exports when running the command below in the client. It just returns a timeout error.

```bash
[root@localhost ~]# showmount -e tst-rhel-a1
clnt_create: RPC: Timed out
[root@localhost ~]# 
[root@localhost ~]# rpcinfo -p tst-rhel-a1
tst-rhel-a1: RPC: Remote system error - Connection timed out
```

Searching online, I found this: [How to troubleshoot RPC: Port mapper failure – Timed out error](https://kerneltalks.com/troubleshooting/how-to-troubleshoot-rpc-port-mapper-failure-timed-out-error/)

From the link:

1. Check NFS service on NFS server.

   ```bash
   $ systemctl status nfs-server.service
   ● nfs-server.service - NFS server and services
      Loaded: loaded (/usr/lib/systemd/system/nfs-server.service; enabled; vendor preset: disabled)
   Drop-In: /run/systemd/generator/nfs-server.service.d
            └─order-with-mounts.conf
      Active: active (exited) since Wed 2022-01-05 02:46:09 UTC; 43min ago
   ```

2. Check connectivity between NFS server and client. Make sure you are able to reach the NFS server from your client. Check using ping and telnet to NFS ports like 111 and 2049 over both protocols TCP and UDP.

   ```bash
   [root@localhost ~]# ping tst-rhel-a1
   PING tst-rhel-a1 (1.2.3.4) 56(84) bytes of data.
   64 bytes from tst-rhel-a1 (1.2.3.4): icmp_seq=1 ttl=47 time=47.1 ms
   64 bytes from tst-rhel-a1 (1.2.3.4): icmp_seq=2 ttl=47 time=45.8 ms
   64 bytes from tst-rhel-a1 (1.2.3.4): icmp_seq=3 ttl=47 time=46.5 ms
   64 bytes from tst-rhel-a1 (1.2.3.4): icmp_seq=4 ttl=47 time=46.7 ms
   64 bytes from tst-rhel-a1 (1.2.3.4): icmp_seq=5 ttl=47 time=46.1 ms
   ```
   ```bash
   [root@localhost ~]# telnet tst-rhel-a1 2049
   Trying 1.2.3.4...
   Connected to tst-rhel-a1.
   Escape character is '^]'.
   ```
   ```bash
   [root@localhost ~]# nc -v -u tst-rhel-a1 111
   Ncat: Version 7.70 ( https://nmap.org/ncat )
   Ncat: Connected to 1.2.3.4:111.
   ^C
   [root@localhost ~]# nc -v -u tst-rhel-a1 2049
   Ncat: Version 7.70 ( https://nmap.org/ncat )
   Ncat: Connected to 1.2.3.4:2049.
   ^C
   ```

3. In addition, I also ran nmap.

   ```bash
   [root@tst-rhel-local ~]# nmap tst-rhel-a1
   Starting Nmap 7.70 ( https://nmap.org ) at 2022-01-05 20:12 PST
   Nmap scan report for tst-rhel-a1 (1.2.3.4)
   Host is up (0.061s latency).
   Not shown: 989 filtered ports
   PORT    STATE SERVICE
   22/tcp  open  ssh
   25/tcp  open  smtp
   110/tcp open  pop3
   111/tcp open  rpcbind
   119/tcp open  nntp
   143/tcp open  imap
   465/tcp open  smtps
   563/tcp open  snews
   587/tcp open  submission
   993/tcp open  imaps
   995/tcp open  pop3s

   Nmap done: 1 IP address (1 host up) scanned in 35.01 seconds
   ```

4. Check if RPC info is reachable from client.
    
   ```bash
   [root@localhost ~]# rpcinfo -p tst-rhel-a1
   tst-rhel-a1: RPC: Remote system error - Connection timed out
   ```

5. If you are running it on AWS Linux EC2 instances then you might need to check security groups to allow proper traffic. This looks like the culprit. So I added the NFS rule in the security group where my NFS server belongs.

   ![](/img/docs/sv-nfs-issue.png)

   After enabling the NFS rule. This still didn't resolved the issue. On the client machine, I went over the man page for showmount, and tried another flag.

   ```bash
   clnt_create: RPC: Program not registered
   ```

### clnt_create: RPC: Program not registered

Found this online: [Linux: clnt_create: RPC: Program not registered](https://unix.stackexchange.com/questions/82290/linux-clnt-create-rpc-program-not-registered). This one is quite a bit old and the RHEL involved was still RHEL6 and RHEL7, but might as well try it.

Checked rpcbind status on both machines.

```bash
[eden@localhost ~]$ service rpcbind status
Redirecting to /bin/systemctl status rpcbind.service
● rpcbind.service - RPC Bind
   Loaded: loaded (/usr/lib/systemd/system/rpcbind.service; enabled; vendor pre>
   Active: active (running) since Wed 2022-01-05 11:53:09 PST; 9min ago
     Docs: man:rpcbind(8)
 Main PID: 830 (rpcbind)
    Tasks: 1 (limit: 4820)
   Memory: 712.0K
   CGroup: /system.slice/rpcbind.service
           └─830 /usr/bin/rpcbind -w -f

Jan 05 11:53:08 localhost.localdomain systemd[1]: Starting RPC Bind...
Jan 05 11:53:09 localhost.localdomain systemd[1]: Started RPC Bind.
[eden@localhost ~]$ 
[eden@localhost ~]$ systemctl enable --now rpcbind
[eden@localhost ~]$ 
[eden@localhost ~]$ showmount -a
clnt_create: RPC: Program not registered
```
```bash
$ service rpcbind status
Redirecting to /bin/systemctl status rpcbind.service
● rpcbind.service - RPC Bind
   Loaded: loaded (/usr/lib/systemd/system/rpcbind.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2022-01-05 03:59:31 UTC; 2min 33s ago
     Docs: man:rpcbind(8)
 Main PID: 873 (rpcbind)
    Tasks: 1 (limit: 204057)
   Memory: 2.2M
   CGroup: /system.slice/rpcbind.service
           └─873 /usr/bin/rpcbind -w -f

Jan 05 03:59:31 tst-rhel-a1 systemd[1]: Starting RPC Bind...
Jan 05 03:59:31 tst-rhel-a1 systemd[1]: Started RPC Bind.
```

From the same link:
> *It could be that your NFS is running on version 4 only*
> *try mounting on client using following if it successfully executes then assume that NFS is only allowing NFSv4:*
>   mkdir /mount_point
>   mount -t nfs4 nfs_servername:/ /mount_point*

Tried this on the client, but returned another error message.

```bash
[root@localhost ~]# mount tst-rhel-a1:/data /mnt/nfs
mount.nfs: Operation not permitted
```

Most of the resources I found suggested restarting rpcbind then nffs on the nfs-server but this didn't solved the issue.

**SOLUTION: Update-07-Jan**

Finally able to resolve this particular error. Found a bunch of links from 2012 to 2017 (I think), and then I found this Youtube video which solved the error: [NFS Error : clnt create: RPC Program not registered](https://www.youtube.com/watch?v=IaXNF6d2CPw)

Summary: Looks like you just need to restart rpc and nfs in both the client and server *in a specific irder*.

```bash
[root@tstclient ~]# cat  /etc/redhat-release
Red Hat Enterprise Linux release 8.5 (Ootpa)
```
```bash
[root@tstsvr ~]# cat /etc/redhat-release
Red Hat Enterprise Linux release 8.5 (Ootpa)
```
```
1. Go to client machine first.
2. systemctl stop rpcbind
3. systemctl stop {nfs-mountd,nfs-utils}
4. systemctl restart rpcbind
5. systemctl start {nfs-mountd,nfs-utils}
6. Go to NFS server.
7. systemctl stop nfs-server.service
8. systemctl stop rpcbind.service
9. systemctl start rpcbind.service
10. systemctl start nfs-server.service
```

Testing:

```bash
[root@tstclient ~]# showmount
Hosts on tstclient:
[root@tstclient ~]# showmount -e
Export list for tstclient:
[root@tstclient ~]#
[root@tstclient ~]# showmount -e tstclient
Export list for tstclient:
[root@tstclient ~]#
[root@tstclient ~]# showmount -e localhost
Export list for localhost:
```
```bash
root@tstclient ~]# showmount -e tstsvr
clnt_create: RPC: Timed out
[root@tstclient ~]# showmount -e 10.0.0.98
clnt_create: RPC: Timed out
```
```bash
[root@tstsvr ~]# showmount -e tstclient
clnt_create: RPC: Timed out
[root@tstsvr ~]# showmount -e 10.0.0.68
clnt_create: RPC: Timed out
```

Testing rpcinfo returned new error for the server.

```bash
[root@tstsvr files]# rpcinfo -p 10.0.0.68
10.0.0.68: RPC: Remote system error - No route to host
[root@tstsvr files]#
[root@tstsvr files]# rpcinfo -p tstclient
tstclient: RPC: Remote system error - No route to host
```
```bash
[root@tstclient ~]# rpcinfo -p tstsvr
   program vers proto   port  service
    100000    4   tcp    111  portmapper
    100000    3   tcp    111  portmapper

*Output is shortened
```

### RPC: Remote system error - No route to host

This one was a bit of a quick solve. I just tried enabling the **rpc-bind** in the client side's firewalld. Then tried the to run rpcinfo from the server again.

```bash
[root@tstsvr ~]# rpcinfo -p tstclient
   program vers proto   port  service
    100000    4   tcp    111  portmapper
[root@tstsvr ~]#
[root@tstsvr ~]# rpcinfo -p 10.0.0.68
   program vers proto   port  service
    100000    4   tcp    111  portmapper
    100000    3   tcp    111  portmapper


*Output is shortened
```

### mount.nfs: Operation not permitted

Another error that sprung up while trying other flags for showmount is this.

```bash
[root@localhost ~]# mount tst-rhel-a1:/data /mnt/nfs
mount.nfs: Operation not permitted
```

From another link [Trying to mount an NFS share with NFSv4, and I'm receiving the following error: mount.nfs4: Operation not permitted](https://access.redhat.com/solutions/435703):

> - Add fsid=0 as an option to the share in the /etc/exports file on the server,
> - Disable SELinux temporarily:
> - Flush and/or disable the software firewall, iptables:
> - Set file permissions on files or directories being accessed on the share temporarily to 777 as a test case:

Following the link: 

```bash
$ vim /etc/exports
# Note that this is an insecure setup, but this is okay for labbing.
# Our target will be on the connectivity.
/data   *(rw,fsid=0,no_root_squash)
```
```bash
$ getenforce
Enforcing

$ setenforce 0
$ getenforce
Permissive
```
```bash
$ iptables -F
$ ll /data/
total 0

$ chmod -R 777 /data/
```

This isn't much of a relevant error and I really didn't dived in much into details but basically, this error seems to come up when you're using the older version of *mount.nfs* and *mount.cifs*. It's recommended not to use it since it's insecure.

### mount.nfs: portmap query retrying: RPC: Timed out

Got this more detailed error when I added the verbose flag.

```bash
[root@localhost ~]# mount -t nfs4 tst-rhel-a1:/data /mnt/nfs -v
mount.nfs4: timeout set for Wed Jan  5 13:30:58 2022
mount.nfs4: trying text-based options 'vers=4.2,addr=1.2.3.4,clientaddr=10.0.2.15'
mount.nfs4: mount(2): Operation not permitted
mount.nfs4: Operation not permitted

[root@localhost ~]# mount tst-rhel-a1:/data /mnt/nfs -v
mount.nfs: timeout set for Wed Jan  5 13:31:12 2022
mount.nfs: trying text-based options 'vers=4.2,addr=1.2.3.4,clientaddr=10.0.2.15'
mount.nfs: mount(2): Operation not permitted
mount.nfs: trying text-based options 'addr=1.2.3.4'
mount.nfs: prog 100003, trying vers=3, prot=6
mount.nfs: trying 1.2.3.4 prog 100003 vers 3 prot TCP port 2049
mount.nfs: prog 100005, trying vers=3, prot=17
mount.nfs: portmap query retrying: RPC: Timed out
mount.nfs: prog 100005, trying vers=3, prot=6
mount.nfs: trying 1.2.3.4 prog 100005 vers 3 prot TCP port 20048
mount.nfs: portmap query failed: RPC: Remote system error - Connection timed out
mount.nfs: Operation not permitted
```

I tried searching for this online, found some useful links:

- [mount.nfs: portmap query failed: RPC: Unable to receive - Connection refused in Centos 7 client](https://serverfault.com/questions/1016675/mount-nfs-portmap-query-failed-rpc-unable-to-receive-connection-refused-in)
- [Why this error occuring "mount.nfs: portmap query failed: RPC: Remote system error - Connection timed out" while mounting NFS share?](https://access.redhat.com/solutions/1356253)

The second linke provided some detailed explanation although its not exactly what I'm looking for because the version involved was RHEL5 and RHEL6, while I am using RHEL8.

> **Root Cause**
> NFSv3 relies on portmap to assign the ports on which it will listen. One side effect of this is that the ports are randomly assigned, so each time NFS is restarted the ports will change. This can make it difficult to run an NFS server behind a firewall which only allows access to specific ports on the system.

> **Resolution**
> To address this problem assign a permanent port number to each of the NFS services (rquotad, mountd, statd, and lockd).
> You may use your own custom port numbers. Please find more details in the below article regarding this: https://access.redhat.com/solutions/3258


Then I learned this [link](https://forums.fedoraforum.org/showthread.php?251021-mount-System-Error-No-route-to-host)
> The package that supports portmapper is "rpcbind" (it does the same function bug is not quite the same code).
> If you are trying to mount using NFS, both sides (the exporting side and the mounting side) nee to have a special service running, called "portmapper". It is a helper application which keeps track on which ports the NFS exporrting daemon (nfsd) is bound to on the exporting side.


### Finally! Able to make it work 

**Finally! Able to make it work - but showmount is not working.**

I've been troubleshooting for a day at this point and I've decided to scrap my hybrid setup where my client is a VM in VirtualBox and my NFS Server as an EC2 instance in the cloud.

I've gone over a dozens links and it seems the timing-out issue is still not resolved, that's why i've decided to have both client and NFS server as both EC2 instances in the cloud. That way, I'm sure to rule out any networking issue since they now both reside in the same VPC, with the same seucrity groups.

Followed the exact same steps, but proceeded with a much more detailed instructions from one of the links I found online: [How to Setup NFS Server on CentOS 8 / RHEL 8](https://www.linuxtechi.com/setup-nfs-server-on-centos-8-rhel-8/)

Still got the time-out error when trying to run the showmount:

```bash
[root@nfsclient ~]# showmount -e 10.0.0.195
clnt_create: RPC: Timed out
[root@nfsclient ~]# showmount -e nfsserver
clnt_create: RPC: Timed out
```

But unlike the earlier attempts of mounting the NFS shared directory on the client where I'm getting a "not permitted" error, this time it succeeded:

```bash
[root@nfsclient ~]# mount -vvvv -t nfs 10.0.0.195:/nfsshare /mnt/client_share
mount.nfs: timeout set for Wed Jan  5 16:53:32 2022
mount.nfs: trying text-based options 'vers=4.2,addr=10.0.0.195,clientaddr=10.0.0.90'
[root@nfsclient ~]#
[root@nfsclient ~]# mount | grep /mnt/client
10.0.0.195:/nfsshare on /mnt/client_share type nfs4 (rw,relatime,vers=4.2,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=10.0.0.90,local_lock=none,addr=10.0.0.195)
```

Tried it for a couple of times, and I'm still able to unmount and mount it again and again.

```bash
[root@nfsclient ~]# umount /mnt/client_share
[root@nfsclient ~]#
[root@nfsclient ~]# mount -vvvv -t nfs 10.0.0.195:/nfsshare /mnt/client_share
mount.nfs: timeout set for Wed Jan  5 16:53:32 2022
mount.nfs: trying text-based options 'vers=4.2,addr=10.0.0.195,clientaddr=10.0.0.90'
[root@nfsclient ~]#
[root@nfsclient ~]# mount | grep /mnt/client
10.0.0.195:/nfsshare on /mnt/client_share type nfs4 (rw,relatime,vers=4.2,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=10.0.0.90,local_lock=none,addr=10.0.0.195)
```

Finally, check if it becomes persistent:

```bash
[root@nfsclient ~]# vim /etc/fstab


UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0

# NFS Shares
10.0.0.195:/nfsshare      /mnt/client_share                 nfs     _netdev         0 0
```
