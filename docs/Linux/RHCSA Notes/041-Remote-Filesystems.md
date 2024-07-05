---
title: "Mounting Remote Filesystems"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 41
last_update:
  date: 11/29/2021
---


## Remote Filesystems

For this topic, I didn't actually create the lab since I don't have any remote filesystem set up. However, the steps remain the same theoretically. 
Let's consider an example where we have a remote NFS filesystem with the following details:

- Name: NFS-Share
- IP: 192.168.123.123
- Filesystem: nfs
- Mountpoint: We want to mount it to `/mnt/disknfs`

The steps to mount it would be as follows:

1. Install the necessary NFS utilities on your machine.
2. Create a credentials file containing the credentials required to access the remote filesystem.
3. Add the NFS details to your `/etc/fstab`.
4. Use `mount -a` to scan the fstab and mount all entries.

Example `/etc/fstab` entry:

```bash
//192.168.123.123/NFS-Share     /mnt/disknfs    nfs     credentials=/mnt/.credentialsfile   defaults    0 0
```

To mount it:

```bash
sudo mount -a
```

To verify the mount:
```bash
df -h
```

## Diagnosing Filesystem Problems

During system boot, filesystem checks are performed on each mountpoint in `/mnt`, typically every 180 days. For diagnosing filesystem issues and performing a general health check on our disks, we can use the filesystem consistency check tool, `fsck`.

Example of scanning an unmounted disk:

```bash
sudo fsck /dev/xvdf1
```

**Note**: `fsck` cannot be run on mounted disks.