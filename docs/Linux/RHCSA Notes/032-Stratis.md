---
title: "Stratis"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 32
last_update:
  date: 12/31/2021
---




## Overview 

Stratis is designed to make managing storage easier for users and administrators. It provides a modern approach to storage management, combining the features of traditional file systems with the ease of use and flexibility of volume managers. 

- Red Hat's answer to Btrfs and ZFS. 
- It is built on top of any block devices, including LVM devices. 
- Stratis Pool is created from one or more storage devices (blockdev). 
- Stratis creates a `/dev/stratis/pool-name` directory for each pool. 
- This directory contains links to devices that represent the filesystems.

Stratis automates many tasks, such as snapshotting, thin provisioning, and data integrity checking, making it an excellent choice for modern storage needs.

- XFS filesystem is put in a volume on top of the pool. 
- Each pool can contain one or more filesystems. 
- Filesystems are thin provisioned and do not have a fixed size. 
- Partitions are NOT supported, and block device must be atleast 1 GB.

## Lab Setup 

I'm performing this lab on an EC2 instance with multiple EBS volumes attached.

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

## Steps 

### 1. Create the Stratis Pool 

Create a Stratis Pool:

```bash
sudo stratis pool create mypool /dev/xvdc
```

:::info[note]

The block device should not have partitions created on it. 
Please see [Error: Block device appears to be owned.](#error-block-device-appears-to-be-owned)

:::

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

To add new block devices later:

```bash
stratis blockdev add-data 
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

## Persistent Stratis 

To ensure that your Stratis configurations and settings remain intact after a system reboot, you need to make the Stratis setup persistent. This involves configuring your Stratis pools, filesystems, and block devices to be recognized and automatically mounted during the boot process.

To start with, get the UUID of the statis pool first. Notice that when you run the command below, it will return two block devices. We need the second one.

```bash
[root@tst-rhel ~]# blkid | grep stratis
/dev/xvdc: UUID="5ec2b078ec234af58998ee9c812a486a" POOL_UUID="d6ed18ce28cd4a959fb539f639616f85" BLOCKDEV_SECTORS="18874368" BLOCKDEV_INITTIME="1640958133" TYPE="stratis"
/dev/mapper/stratis-1-d6ed18ce28cd4a959fb539f639616f85-thin-fs-7c73f2718b0a4aa2957e9686b3733f3a: UUID="7c73f271-8b0a-4aa2-957e-9686b3733f3a" BLOCK_SIZE="512" TYPE="xfs"
```

Since we already manually mounted the stratis pool, we need to unmount it.

```bash
sudo umount /mnt/diskmyfs
```

Add an entry in `/etc/fstab`:

```bash
[root@tst-rhel ~]# vim /etc/fstab

# STRATIS
UUID="49e5d8a1-78e5-4fde-ad6d-b5692f697058"     /mnt/diskfs       xfs     nofail,x-systemd.device-timeout=1ms 0 0
```

Restart the EC2 instance and verify once its up again.

```bash
sudo reboot  
```
```bash
blkid | grep stratis 
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

## Error: fstab issue after restarting instance 

I encountered this error when I was trying to mount the Stratis device persistently through `/etc/fstab`. I initially ran `mount -a` and it did not returned any issue so I was a bit sure adding the `/etc/fstab` entry will not cause any issue. 

After rebooting the system, the EC2 instance became unreachable. After some troubleshooting, I attached the EBS volume to another instance, access it, and commented out the line for the stratis volume in the `/etc/fstab`. 

After it worked on the test EC2 instance, I detached the EBS volume returned it to the original EC2 instance. It worked perfectly after that. At this point I double-checked the UUID of the stratis pool and nothing seems wrong.

After some searching online, I found a solution that worked: [Slow boot - "a start job is running for dev-disk-by..."](https://askubuntu.com/questions/711016/slow-boot-a-start-job-is-running-for-dev-disk-by)

To resolve the issue of EC2 instance being unreachable after rebooting the system, I modified the Stratis entry in the `/etc/fstab.` Instead of **defaults**, I used other options:

```bash
$ vim /etc/fstab

UUID="49e5d8a1-78e5-4fde-ad6d-b5692f697058"     /mnt/diskfs       xfs     nofail,x-systemd.device-timeout=1ms 0 0
```

Afterwards, I restarted the EC2 instance, logged back, and verified that it worked.