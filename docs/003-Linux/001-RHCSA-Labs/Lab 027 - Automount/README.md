---
title: Automount 
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 27
last_update:
  date: 3/27/2021
---


## Tasks

Here we'll have two servers:

- tstsvr - nfs server
- tstclient - nfs-client

To-dos: 

1. On your server 1, set hostname to **tstsvr**. Set server 2 to **tstclient**
2. Configure tstsvr to offer RW access to 2 NFS shares:
	- /home/ldap/
	- /data
3. Ensure /home/ldap contains a subddirectory for LDAP users
4. LDAP user home directories should be available on th NFS share.
5. Configure automount to automatically mount user's home directories.
6. Configure NFS client to automatically mount the share:
	- tstsvr:/data


## Solution


### Server 1: NFS Server

1. **Set Hostname**
   ```bash
   hostnamectl set-hostname tstsvr
   ```

2. **Configure NFS Shares**

   Edit `/etc/exports` to define the NFS shares:
   ```plaintext
   /home/ldap *(rw,sync,no_root_squash)
   /data *(rw,sync,no_root_squash)
   ```
   Ensure to run `exportfs -a` after editing to apply changes.

3. **Prepare /home/ldap**
   Create a subdirectory for LDAP users:
   ```bash
   mkdir /home/ldap/ldap_users
   ```

4. **LDAP User Home Directories on NFS**
   Ensure LDAP user home directories are mounted from NFS. This typically involves configuring LDAP to use NFS for home directories (`/home/ldap/ldap_users`).

5. **Configure Automount**

   Install autofs if not already installed:
   ```bash
   sudo yum install autofs
   ```
   
   Edit `/etc/auto.master` to include:
   ```plaintext
   /home/ldap /etc/auto.ldap
   ```
   
   Create `/etc/auto.ldap` with content:
   ```plaintext
   * -rw,sync tstsvr:/home/ldap/&
   ```
   
   Restart autofs:
   ```bash
   sudo systemctl restart autofs
   ```

### Server 2: NFS Client

6. **Configure NFS Client on tstclient**

   Set the hostname for tstclient:
   ```bash
   hostnamectl set-hostname tstclient
   ```

   Edit `/etc/fstab` on tstclient to automatically mount `/data` from tstsvr:
   ```plaintext
   tstsvr:/data /mnt/data nfs defaults 0 0
   ```

   Mount the NFS share:
   ```bash
   mount /mnt/data
   ```   

### Notes

- Ensure NFS server (`rpcbind`, `nfs-server`) and client (`rpcbind`, `nfs-utils`) packages are installed and running on both servers.
- Replace `tstsvr` and `tstclient` with actual IP addresses if DNS resolution is not available.
- Adjust NFS export options (`rw`, `sync`, `no_root_squash`, etc.) according to your security requirements.
  