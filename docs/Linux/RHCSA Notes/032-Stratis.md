---
title: "Stratis"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 32
last_update:
  date: 11/29/2021
---




## Overview 

Stratis is designed to make managing storage easier for users and administrators. It provides a modern approach to storage management, combining the features of traditional file systems with the ease of use and flexibility of volume managers. 

![](/img/docs/sv-stratis.png)
![](/img/docs/sv-stratis-2.png)

Stratis automates many tasks, such as snapshotting, thin provisioning, and data integrity checking, making it an excellent choice for modern storage needs.


## Steps for Creating Stratis

Below are the steps to create and manage storage with Stratis. 

![Stratis Creation 1](/img/docs/sv-stratis-1.png)
![Stratis Creation 2](/img/docs/sv-stratis-2.png)
![Stratis Creation 3](/img/docs/sv-stratis-3.png)


## Installation 

Install Stratis:
```bash
sudo dnf install stratisd stratis-cli
```

Enable and Start Stratis Daemon:
```bash
sudo systemctl enable stratisd
sudo systemctl start stratisd
```

## Lab Setup 

I'm performing this lab on an EC2 instances with multiple EBS volumes attached.

```bash
[root@tst-rhel ~]# lsblk
NAME              MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda              202:0    0   50G  0 disk
├─xvda1           202:1    0    1M  0 part
└─xvda2           202:2    0   50G  0 part /
xvdb              202:16   0   10G  0 disk
├─xvdb1           202:17   0  953M  0 part
├─xvdb2           202:18   0  954M  0 part [SWAP]
├─xvdb3           202:19   0  954M  0 part
│ └─vgdata-lvdata 253:0    0  1.9G  0 lvm  /mnt/diskblvm
└─xvdb4           202:20   0    1G  0 part
  └─vgdata-lvdata 253:0    0  1.9G  0 lvm  /mnt/diskblvm
xvdc              202:32   0    9G  0 disk
```

## Steps 

### 1. Create the Stratis Pool 

Create a Stratis Pool:

```bash
sudo stratis pool create mypool /dev/xvdc
```

Verify: 

```bash
[root@tst-rhel ~]# stratis pool
Name                   Total Physical   Properties                                   UUID
mypool   9 GiB / 37.63 MiB / 8.96 GiB      ~Ca,~Cr   d6ed18ce-28cd-4a95-9fb5-39f639616f85
```

### 2. Create the file system

When we create the file system, we don't need to specify the file system to use. It uses **xfs** as its file system as this is the only option.

```bash
sudo stratis fs create mypool myfs1 
```

After creating the file system, we can check it using `stratis fs`. We can notice in the output the **Used** column but there is no **Available** or **Free**. This is because stratis stratis is not set with an upper boundary and it is only bounded by the physical size of the pool. 

```bash
[root@tst-rhel ~]# stratis fs
Pool Name   Name    Used      Created             Device                      UUID
mypool      myfs1   545 MiB   Dec 31 2021 21:45   /dev/stratis/mypool/myfs1   7c73f271-8b0a-4aa2-957e-9686b3733f3a 
```

### 3. Mount the Stratis Filesystem

Create the mount point first:

```bash
[root@tst-rhel ~]# ll /mnt/
total 0
drwxr-xr-x. 2 root root 6 Dec  7 15:21 diskb1
drwxr-xr-x. 2 root root 6 Dec 31 14:46 diskblvm
[root@tst-rhel ~]#
[root@tst-rhel ~]# mkdir /mnt/diskmyfs
```

Manually mount:

```bash
sudo mount /dev/stratis/mypool/myfs1 /mnt/diskmyfs/
```

Verify: 

```bash
[root@tst-rhel ~]# mount | tail -1
/dev/mapper/stratis-1-d6ed18ce28cd4a959fb539f639616f85-thin-fs-7c73f2718b0a4aa2957e9686b3733f3a on /mnt/diskmyfs type xfs (rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=128k,sunit=256,swidth=2048,noquota) 
```

### 4. Checking 

To see available Stratis commands, use the following command. It lists all the main functionalities:

```bash
[root@tst-rhel ~]# stratis
blockdev     filesystem   --help       pool         report
daemon       -h           key          --propagate  --version
```

To list all the Stratis pools along with their details, such as total physical size and UUID:

```bash
[root@tst-rhel ~]# stratis pool list
Name                    Total Physical   Properties                                   UUID
mypool   9 GiB / 582.65 MiB / 8.43 GiB      ~Ca,~Cr   d6ed18ce-28cd-4a95-9fb5-39f639616f85
```


To list all filesystems in Stratis pools:

```bash
[root@tst-rhel ~]# stratis fs list
Pool Name   Name    Used      Created             Device                      UUID
mypool      myfs1   545 MiB   Dec 31 2021 21:45   /dev/stratis/mypool/myfs1   7c73f271-8b0a-4aa2-957e-9686b3733f3a
```

To list all block devices in Stratis pools:

```bash
[root@tst-rhel ~]# stratis blockdev list
Pool Name   Device Node   Physical Size   Tier
mypool      /dev/xvdc             9 GiB   Data
```

To see all block devices and their respective partitions and mount points:

```bash
[root@tst-rhel ~]# lsblk
NAME                                                                                MAJ:MIN RM  SIZE RO TYPE    MOUNTPOINT
xvda                                                                                202:0    0   50G  0 disk
├─xvda1                                                                             202:1    0    1M  0 part
└─xvda2                                                                             202:2    0   50G  0 part    /
xvdb                                                                                202:16   0   10G  0 disk
├─xvdb1                                                                             202:17   0  953M  0 part
├─xvdb2                                                                             202:18   0  954M  0 part    [SWAP]
├─xvdb3                                                                             202:19   0  954M  0 part
│ └─vgdata-lvdata                                                                   253:0    0  1.9G  0 lvm     /mnt/diskblvm
└─xvdb4                                                                             202:20   0    1G  0 part
  └─vgdata-lvdata                                                                   253:0    0  1.9G  0 lvm     /mnt/diskblvm
xvdc                                                                                202:32   0    9G  0 disk
└─stratis-1-private-d6ed18ce28cd4a959fb539f639616f85-physical-originsub             253:1    0    9G  0 stratis
  ├─stratis-1-private-d6ed18ce28cd4a959fb539f639616f85-flex-thinmeta                253:2    0   16M  0 stratis
  │ └─stratis-1-private-d6ed18ce28cd4a959fb539f639616f85-thinpool-pool              253:5    0    9G  0 stratis
  │   └─stratis-1-d6ed18ce28cd4a959fb539f639616f85-thin-fs-7c73f2718b0a4aa2957e9686b3733f3a
  │                                                                                 253:6    0    1T  0 stratis /mnt/diskmyfs
  ├─stratis-1-private-d6ed18ce28cd4a959fb539f639616f85-flex-thindata                253:3    0    9G  0 stratis
  │ └─stratis-1-private-d6ed18ce28cd4a959fb539f639616f85-thinpool-pool              253:5    0    9G  0 stratis
  │   └─stratis-1-d6ed18ce28cd4a959fb539f639616f85-thin-fs-7c73f2718b0a4aa2957e9686b3733f3a
  │                                                                                 253:6    0    1T  0 stratis /mnt/diskmyfs
  └─stratis-1-private-d6ed18ce28cd4a959fb539f639616f85-flex-mdv                     253:4    0   16M  0 stratis
```



## Error: Block device appears to be owned

I tried creating the stratis pool on a block device which already has partitions created on it - `/dev/xvdb`:

```bash
[root@tst-rhel ~]# lsblk
NAME              MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda              202:0    0   50G  0 disk
├─xvda1           202:1    0    1M  0 part
└─xvda2           202:2    0   50G  0 part /
xvdb              202:16   0   10G  0 disk
├─xvdb1           202:17   0  953M  0 part
├─xvdb2           202:18   0  954M  0 part [SWAP]
├─xvdb3           202:19   0  954M  0 part
│ └─vgdata-lvdata 253:0    0  1.9G  0 lvm  /mnt/diskblvm
└─xvdb4           202:20   0    1G  0 part
  └─vgdata-lvdata 253:0    0  1.9G  0 lvm  /mnt/diskblvm
xvdc              202:32   0    9G  0 disk
```

I ran into an error when I attempted to reuse a partitioned block device.

```bash
[root@tst-rhel ~]# stratis pool create mypool /dev/xvdb
Execution failed:
stratisd failed to perform the operation that you requested. It returned the following information via the D-Bus: ERROR: Engine error: At least one of the devices specified was unsuitable for initialization: Engine error: udev information indicates that device /dev/xvdb is a block device which appears to be owned. 
```

After some search, I found this link online: [Locate an empty block device](https://stratis-storage.github.io/howto/#locate-an-empty-block-device). Looks like **I can only run stratis on an empty block device.** This means the device should not have a partition table.

### Find an empty block device

In the example below, we ran `blkid` on two block devices. `/dev/xvdb` is not empty, but `/dev/xvdc` is.

```bash
[root@tst-rhel ~]# blkid -p /dev/xvdb
/dev/xvdb: PTUUID="52ff25af-5ff4-4c1d-8644-87c916625249" PTTYPE="gpt"
[root@tst-rhel ~]#
[root@tst-rhel ~]# blkid -p /dev/xvdc
[root@tst-rhel ~]#
```

### Clearing a block device (Optional)

If you don't have other block devices to use, you can clear an existing one.
For this example, we'll just clear the empty block device, `/dev/xvdc`, using `wipefs`.

```bash
[root@tst-rhel ~]# wipefs -a /dev/xvdc
[root@tst-rhel ~]# blkid -p /dev/xvdc
```

This solved the issue and I was able to create the Stratis pool on `/dev/xvdc`.