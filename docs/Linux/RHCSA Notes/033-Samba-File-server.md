---
title: "Samba file server"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 33
last_update:
  date: 1/7/2022
---


## Samba Server 

Configuring a Samba server allows you to share files and printers across a network with systems running different operating systems, such as Windows, Linux, and macOS. Samba implements the SMB/CIFS networking protocol, enabling seamless file sharing and integration with Windows networks.

Outline of steps: 

- Install the Samba server package .
- Create a directory to share. 
- Create a local Linux user. 
- Set Linux permissions. 
- Use `smbpasswd -a` to add a Samba user account. 
- Enable the share in `/etc/samba/smb.conf`. 
- Use `systemctl start smb` to start the service. 
- Allow the Samba service through the firewall.


## Early errors

:::note

Spent half a day on this lab because I was having issue on the part where the shar eis mounted on the client. Thought I'd put them upfront in this section.

:::

Some of the issues that occured:

- **mount error(2): No such file or directory**
    This was an unhelpful error message because I learned that a lot of people has encountered it on different issues, meaning it's like a catch-all error which doesn't really show any useful details.
    Note that on my first set of attempts, I created and used **/mnt/smbshare**
      
   ```bash
   [root@smbclient ~]# mount -o username=samba //smbsvr/mnt/samba /mnt/sambaclient -vvvv
   Password for samba@//smbsvr/mnt/samba:  ********
   mount.cifs kernel mount options: ip=10.0.0.138,unc=\\smbsvr\mnt,user=samba,prefixpath=samba,pass=********
   mount error(2): No such file or directory
   Refer to the mount.cifs(8) manual page (e.g. man mount.cifs) and kernel log messages (dmesg)
   ```
   ```bash
   [ 3040.142998] CIFS: Attempting to mount //smbsvr/mnt/samba
   [ 3040.161454] CIFS: VFS:  BAD_NETWORK_NAME: \\smbsvr\mnt
   [ 3040.168191] CIFS: VFS: cifs_mount failed w/return code = -2
   ```
   ```bash
   [root@smbclient ~]# mount -o username=samba,vers=1.0 //smbsvr/mnt/samba /mnt/sambaclient -vvvv
   Password for samba@//smbsvr/mnt/samba:  ********
   mount.cifs kernel mount options: ip=10.0.0.138,unc=\\smbsvr\mnt,vers=1.0,user=samba,prefixpath=samba,pass=********
   mount error(95): Operation not supported
   Refer to the mount.cifs(8) manual page (e.g. man mount.cifs) and kernel log messages (dmesg)
   ```
   ```bash
   [root@smbclient ~]# mount -o username=samba,vers=2.0 //smbsvr/mnt/samba /mnt/sambaclient -vvvv
   Password for samba@//smbsvr/mnt/samba:  ********
   mount.cifs kernel mount options: ip=10.0.0.138,unc=\\smbsvr\mnt,vers=2.0,user=samba,prefixpath=samba,pass=********
   mount error(2): No such file or directory
   Refer to the mount.cifs(8) manual page (e.g. man mount.cifs) and kernel log messages (dmesg)
   ```

- **SMB1 disabled -- no workgroup available**
    Was able to resolve this but it just returned to the previous "no such file" error.
      
   ```bash
   # smbclient -L smbsvr
   Enter SAMBA\root's password:
   Anonymous login successful

         Sharename       Type      Comment
         ---------       ----      -------
         print$          Disk      Printer Drivers
         samba           Disk      samba share
         IPC$            IPC       IPC Service (Samba 4.14.5)
   SMB1 disabled -- no workgroup available
   ```

- **Noticed something on "unc path" + the directory name**
    Not sure if this really solved it, but samba client doesn't seem to read well if the shared directory is a *subdirectory*. Previously used */mnt/samba* which returns the 'no such file error'.
    However, if I used "samba" as the shared directory's name and at the same time, set username to "samba" too on the samba server, the mount seem to proceed. 


## Steps

:::note 

What I did is followed another link besides the tutorial video of Sander Vugt. I found this link: [How to Install and Configure Samba on CentOS 8](https://www.linuxtechi.com/install-configure-samba-centos-8/)

::: 

The steps below involves the steps in that link and the steps from Sander Vugt's course.Also, before anything else, I installed these packages first on the EC2 instances and updated them.

```bash
sudo yum install -y {vim,bash-completion,firewalld}
sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo yum update -y
```

Let's first install the Samba package.

```bash
yum install -y samba samba-common samba-client
```

Create the directory to share. Then create the Linux user account.
Note that you don't have to set the password. For that we'll use the **smbpasswd**.

```bash
mkdir /samba 
useradd samba -s /sbin/nologin
```
```bash
smbpasswd -a samba
```

Then set the permissions of the shared directory.

```bash
chmod -R 0777 /samba 
chown -R samba:samba /samba
chcon -Rt samba_share_t /samba
```

Define the shared directory at the end of the smb.conf file. "Write list" is the samba user to be used.

```bash
[root@tstserver ~]# vim /etc/samba/smb.conf

[samba]
        comment = samba share
        path = /samba
        write list = samba
        browsable =yes
        writable = yes
        guest ok = yes
        read only = no
```

Save and close the configuration file. To verify:

```bash
[root@tstsvr ~]# testparm
Load smb config files from /etc/samba/smb.conf
Loaded services file OK.
Weak crypto is allowed

Server role: ROLE_STANDALONE

Press enter to see a dump of your service definitions
```

Last part is to configure the firewalld.

```bash
[root@tstserver ~]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: eth0
  sources:
  services: cockpit dhcpv6-client ssh
  ports:
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```
```bash
[root@tstserver ~]# firewall-cmd --add-service samba --zone=public --permanent
success
[root@tstserver ~]# firewall-cmd --reload
success
[root@tstserver ~]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: eth0
  sources:
  services: cockpit dhcpv6-client samba ssh
  ports:
  protocols:
  forward: no
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

Enable and restart SMB and NMB:

```bash
systemctl enable --now {smb,nmb}
systemctl restart {smb,nmb}
systemctl status {smb,nmb}
```

## Mounting Samba Shares

Mounting Samba shares enables access to files and directories shared over a network using the SMB/CIFS protocol. This process allows seamless integration with Windows-based file sharing systems, facilitating easy file access and management across diverse operating environments.

Outline of steps:

- Install the `cif-utils` and `samba-client` RPM packages. 
- Use `smbclient -L //sambahost` to discover shares. 
- Mount the share.
- Make the mount persistent through `/etc/fstab`.


On the client machine, let's check for the NFS client package:

```bash
[root@tstclient ~]# yum groups list
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

Last metadata expiration check: 0:00:23 ago on Thu 06 Jan 2022 06:43:47 AM UTC.
Available Environment Groups:
   Server with GUI
   Server
   Minimal Install
   Workstation
   Virtualization Host
   Custom Operating System
Available Groups:
   RPM Development Tools
   Container Management
   .NET Core Development
   Legacy UNIX Compatibility
   Development Tools
   Headless Management
   Security Tools
   Scientific Support
   System Tools
   Graphical Administration Tools
   Network Servers
   Smart Card Support
```
```bash
[root@tstclient ~]# yum groups list --hidden | less
```
```bash
[root@tstclient ~]# yum groups list --hidden | less | grep Client
   Virtualization Client
   Printing Client
   Remote Desktop Clients
   Backup Client
   Network File System Client
```


Install the package:

```bash
yum groups install -y  "Network File System Client"
```

Before we proceed, let's create the mountpoint on the client: 

```bash
mkdir /mnt/sambaclient
```

Connect and discover the available share on the Samba server by running the command below. This will prompt for the Samba root user. Since this is the first time we run this, we're sure that there's still no root password so we could just press enter.

```bash
[root@tstclient ~]# smbclient -L tstserver
Enter SAMBA\root password:
Anonymous login successful

        Sharename       Type      Comment
        ---------       ----      -------
        print$          Disk      Printer Drivers
        samba           Disk      samba share
        IPC$            IPC       IPC Service (Samba 4.14.5)
SMB1 disabled -- no workgroup available
```

Still on the client, mount the share. This will require the password.

```bash
[root@tstclient ~]# mount -o user=samba //tstsvr/samba /mnt/sambaclient/
Password for samba@//smbsvr/samba:  ********
```

Test.

```bash
[root@tstclient ~]# mount | grep cifs
//smbsvr/samba on /mnt/sambaclient type cifs (rw,relatime,vers=3.1.1,cache=strict,username=samba,uid=0,noforceuid,gid=0,noforcegid,addr=10.0.0.164,file_mode=0755,dir_mode=0755,soft,nounix,serverino,mapposix,rsize=4194304,wsize=4194304,bsize=1048576,echo_interval=60,actimeo=1,user=samba)
```

To make it persistent, add an entry to /etc/fstab. Let's first unmount.

```bash
umount /mnt/sambaclient
```
```bash
vim /etc/fstab

//tstsvr/samba     /mnt/sambaclient      cifs       _netdev,username=samba,password=edenjose     0 0
```

Test again.

```bash
[root@tstclient ~]# mount -a
[root@tstclient ~]# mount | grep cifs
//smbsvr/samba on /mnt/sambaclient type cifs (rw,relatime,vers=3.1.1,cache=strict,username=samba,uid=0,noforceuid,gid=0,noforcegid,addr=10.0.0.164,file_mode=0755,dir_mode=0755,soft,nounix,serverino,mapposix,rsize=4194304,wsize=4194304,bsize=1048576,echo_interval=60,actimeo=1,_netdev)
```

Finally, test after reboot.

```bash
umount /mnt/samba
reboot
```
```bash
[root@smbclient ~]# mount | grep cifs
//smbsvr/samba on /mnt/sambaclient type cifs (rw,relatime,vers=3.1.1,cache=strict,username=samba,uid=0,noforceuid,gid=0,noforcegid,addr=10.0.0.164,file_mode=0755,dir_mode=0755,soft,nounix,serverino,mapposix,rsize=4194304,wsize=4194304,bsize=1048576,echo_interval=60,actimeo=1,_netdev)
```