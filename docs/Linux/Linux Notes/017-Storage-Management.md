---
title: "Storage Management"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 17
last_update:
  date: 11/29/2021
---



## Disk Layout

You can divide a disk into partitions and then assign different directories to different partitions to isolate data.

Your disk will have a device name, and is normally in this format:

```bash
/dev/device-name
```

Another important thing that is related to disk partitioning is the system type. There are two options:

1. **BIOS**
  - was designed for the old systems
  - typically come with MBR - Master Boot Record
  - MBR has alot of limitations
  - one limitation is it only has 64 bytes to store partition information
  - only 4 partitions can be used
  - because there's only 4 partitions, **logical partitions** are invented
  - logical partitions are created in the extended partition

  ![](/img/docs/sv-bios.png)
  ![](/img/docs/sv-bios-2.png)
  
2. **UEFI**
  - typically come with GPT - GUID Partition Table
  - can have up to 128 partitions

  ![](/img/docs/sv-bios-uefi.png)


## lsblk, dev

lsblk lists block devices:

```bash
$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  50G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  50G  0 part /
xvdb    202:16   0   5G  0 disk
xvdc    202:32   0  25G  0 disk
└─xvdc1 202:33   0  25G  0 part
```

To access devices, go to `/dev/`:

```bash
$ ll /dev/xvd*
brw-rw----. 1 root disk 202,  0 Dec 23 22:27 /dev/xvda
brw-rw----. 1 root disk 202,  1 Dec 23 22:27 /dev/xvda1
brw-rw----. 1 root disk 202,  2 Dec 23 22:27 /dev/xvda2
brw-rw----. 1 root disk 202, 16 Dec 23 22:27 /dev/xvdb
brw-rw----. 1 root disk 202, 32 Dec 23 22:27 /dev/xvdc
brw-rw----. 1 root disk 202, 33 Dec 23 22:27 /dev/xvdc1
```

From the kernel perspective, the block devices can also be seen in the `/proc/partitions`: 

```bash
$ ll /proc/partitions
-r--r--r--. 1 root root 0 Dec 23 22:27 /proc/partitions
$
$ cat /proc/partitions
major minor  #blocks  name

 202        0   52428800 xvda
 202        1       1024 xvda1
 202        2   52426735 xvda2
 202       16    5242880 xvdb
 202       32   26214400 xvdc
 202       33   26213376 xvdc1
```


## Storage Options 

Partitions, LVM, Stratis, VDO

![](/img/docs/sv-stor-options.png)


## GPT vs. MBR

![](/img/docs/sv-gpt-mbr-2.png)


## File Systems

![](/img/docs/sv-file-systems.png)

Making a file systems is similar to formatting partitions in other operating systems.

![](/img/docs/sv-fs-1.png)


### EXT4 Filesystem

When to use EXT4:

![](/img/docs/whentouseEXT4.png)


### XFS Filesystem

![](/img/docs/sv-fs-2.png)
