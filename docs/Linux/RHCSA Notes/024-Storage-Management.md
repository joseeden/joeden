---
title: "Storage and Filesystems"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 24
last_update:
  date: 11/29/2021
---


## Disk Layout

Disk layout involves organizing a disk into partitions, which can then be assigned to different directories to segregate data and manage storage efficiently. The disk is identified by a device name, typically formatted as:

```bash
/dev/device-name
```

When setting up disk partitions, it's important to consider the system type, which can be either BIOS or UEFI.

### BIOS

BIOS (Basic Input/Output System) is an older firmware interface that initializes and tests hardware during the booting process. It uses the MBR (Master Boot Record) partitioning scheme, which has several limitations.

- Limited to 4 primary partitions.
- Only has 64 bytes to store partition information.
- Because there's only 4 partitions, **logical partitions** are invented.
- Logical partitions are created in the extended partition.
- Cannot handle disks larger than 2TB.

Diagram: 

![](/img/docs/sv-bios.png)
![](/img/docs/sv-bios-2.png)

### UEFI

UEFI (Unified Extensible Firmware Interface) is a modern firmware interface designed to replace BIOS. It uses the GPT (GUID Partition Table) partitioning scheme, which offers several advantages over MBR.

- Supports up to 128 partitions.
- Provides better support for large drives and modern hardware.
- Includes a secure boot feature to ensure that only trusted software is loaded at boot time.
- Faster boot times and more advanced graphical interfaces during startup.

Diagram: 

![](/img/docs/sv-bios-uefi.png)

## Listing Block Devices

The `lsblk` command lists block devices, displaying their names, sizes, and mount points. This helps in understanding the current disk layout and identifying available devices.

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

## Accessing Devices

Devices are accessible in the `/dev/` directory. This is where all the device files are located, allowing interaction with hardware components.

```bash
$ ll /dev/xvd*
brw-rw----. 1 root disk 202,  0 Dec 23 22:27 /dev/xvda
brw-rw----. 1 root disk 202,  1 Dec 23 22:27 /dev/xvda1
brw-rw----. 1 root disk 202,  2 Dec 23 22:27 /dev/xvda2
brw-rw----. 1 root disk 202, 16 Dec 23 22:27 /dev/xvdb
brw-rw----. 1 root disk 202, 32 Dec 23 22:27 /dev/xvdc
brw-rw----. 1 root disk 202, 33 Dec 23 22:27 /dev/xvdc1
```

From the kernel's perspective, block devices can also be viewed in `/proc/partitions`. This file shows a list of partitions recognized by the kernel.

```bash
$ ll /proc/partitions
-r--r--r--. 1 root root 0 Dec 23 22:27 /proc/partitions

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

There are several storage options available, including partitions, LVM (Logical Volume Manager), Stratis, and VDO (Virtual Data Optimizer). Each option offers different features and benefits, depending on the use case.

- **Partitions**

  - Classical solution which can be used in all cases. 
  - It can be utilized to allocate dedicated storage to specific types of data.

- **LVM (Logical Volume Manager)**

  - Used at default installation of RHEL.
  - Supports resizing volumes and adding new disks without downtime.
  - Adds flexibility to storage (resize, snapshots, and more).

- **Stratis**
  
  - Offers features like snapshots and data integrity checking.
  - Next generation volume management filesystem that uses thin provisioning by default.
  - Creates a unified storage pool, and is implemented in user space, making API access possible.

- **VDO (Virtual Data Optimizer)**

  - Focused on storing files in the most efficient way.
  - Provides block-level deduplication, compression, and thin provisioning.

## GPT vs. MBR

Comparing GPT and MBR partitioning schemes, GPT is the modern choice offering better features and flexibility, while MBR is the older, more limited option.


- **MBR**
  
  - Limited to disks up to 2TB.
  - Supports only 4 primary partitions (extendable with logical partitions).
  - 512 bytes to store boot information, 64 bytes to store partitions.
  - Does not include redundancy.

- **GPT**
  
  - Supports larger disks (up to 9.4 ZB).
  - Allows for more partitions (up to 128 max).
  - Includes redundancy with a backup partition table.



## File Systems

Different file systems are optimized for various use cases, such as general-purpose storage or high-performance applications. Creating a file system is similar to formatting partitions in other operating systems. The process prepares a partition to store data.

To create an XFS Filesystem:

```bash
mkfs.xfs
```

To create an EXT4 Filesystem:

```bash
mkfs.ext4
```

If no filesystem is specified, it will create an Ext2 file system.

```bash
mkfs
```

Use `mount` to mount it in runtime and `umount` before disconnecting device.


### EXT4 Filesystem

EXT4 is widely used for its reliability and performance. It's suitable for most general-purpose storage needs and is known for its journaling feature, which helps in preventing data corruption.

When to Use EXT4:

- Default in RHEL 6, and is still used.
- Backward compatible with EXT2 and EXT3.
- Uses Journal to guarantee data integrity.
- Size can be increased and decreased.
- Prevents data corruption by tracking uncommitted changes.
- Supported by most Linux distributions, ensuring broad compatibility.


Some limitations:

- Single-threaded I/O  
- Limited resources:
  - Less than 1000 IOPS 
  - Less than 200MB/s bandwidth 
  - Limited CPU availability


### XFS Filesystem

XFS is designed for high-performance and large-scale data management. It's particularly effective for large storage servers due to its scalability and efficiency in handling large files.

- Default filesystem, uses CoW to guarantee data integrity.
- Optimized for environments with heavy I/O operations.
- Supports extremely large files and file systems.
- Size can be increased, but not decreased.
- Uses extent-based allocation to reduce fragmentation.
- Allocates inodes dynamically for better disk space utilization.

The `xfsdump` utility can be used for creating backups of XFS formatted devices and considers specific XFS attributes.

  - `xfsdump` only works on a complete XFS device.
  - `xfsdump` can make full backups or different levels of incremental backups.

Commands:
      
- To create a full backup of the  contents of the `/data` directory:

  ```bash
  xfsdump -1 0 -f /backupfiles/data.xfsdump /data  
  ```

- To restore a backup that was made with xfsdump:

  ```bash
  xfsrestore -f /backupfiles/data.xfsdump /data  
  ```

- To manually repair broken XFS file systems:

  ```bash
  xfsrepair 
  ```

## Partitions

Managing disk partitions is a critical task for organizing and utilizing storage effectively. Tools like `parted`, `gparted`, and `fdisk` are commonly used for partitioning disks.

### parted

The `parted` tool is a powerful command-line utility for managing disk partitions.

![](/img/docs/sv-parted.png)

Steps:

![](/img/docs/sv-parted-2.png)
![](/img/docs/sv-parted-3.png)

Example using `/dev/xvdb`:

```bash
[root@tst-rhel ~]# cat /proc/partitions
major minor  #blocks  name

202        0   52428800 xvda
202        1       1024 xvda1
202        2   52426735 xvda2
202       16    5242880 xvdb
202       32   26214400 xvdc
202       33   26213376 xvdc1

[root@tst-rhel ~]# lsblk -a
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  50G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  50G  0 part /
xvdb    202:16   0   5G  0 disk
xvdc    202:32   0  25G  0 disk
└─xvdc1 202:33   0  25G  0 part
```
Running parted on the disk, it returns an error complaining about unrecognized disk label. This means we have to set a label.

```bash
[root@tst-rhel ~]# parted /dev/xvdb
GNU Parted 3.2
Using /dev/xvdb
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted)
(parted) print
Error: /dev/xvdb: unrecognised disk label
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 5369MB
Sector size (logical/physical): 512B/512B
Partition Table: unknown
Disk Flags:
(parted)
```

We set label to gpt and then print again.

```bash
(parted) mklabel gpt
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 5369MB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start  End  Size  File system  Name  Flags

(parted)
```

Next is we set the partitions. To save the changes, type `quit`.

```bash
(parted) mkpart one 1GB 2GB
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 5369MB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  1074MB  1073MB               one

(parted)
(parted) quit
Information: You may need to update /etc/fstab.
```

To make sure device names have been properly updated, run the command below.
Check the block devices afterwards to make sure partition has been created on `/dev/xvdb`.

```bash
[root@tst-rhel ~]# udevadm settle
[root@tst-rhel ~]# cat /proc/partitions
major minor  #blocks  name

 202        0   52428800 xvda
 202        1       1024 xvda1
 202        2   52426735 xvda2
 202       16    5242880 xvdb
 202       17    1047552 xvdb1
 202       32   26214400 xvdc
 202       33   26213376 xvdc1

[root@tst-rhel ~]# lsblk -a
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0    5G  0 disk
└─xvdb1 202:17   0 1023M  0 part
xvdc    202:32   0   25G  0 disk
└─xvdc1 202:33   0   25G  0 part
```


### gparted

`gparted` (GNOME Partition Editor) is a GUI-based partition editor for Linux, providing a user-friendly interface for managing disk partitions. It supports a wide range of filesystem types and partitioning tasks, making it an excellent tool for both novice and advanced users.

On a RHEL-based system, you can install `gparted` using:

```bash
sudo yum install -y gparted
```

For Debian-based systems, use:

```bash
sudo apt-get install -y gparted
```

### fdisk

`fdisk` is a powerful command-line utility used for partitioning disks on Linux systems, particularly well-suited for managing disks with the MBR (Master Boot Record) partitioning scheme.

For this particular lab, I created another EBS volume, **tst-rhel-partitioning** and attached it to my **tst-rhel** server. This will appear as disk **/dev/xvdb**.

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        7.7G     0  7.7G   0% /dev
tmpfs           7.8G     0  7.8G   0% /dev/shm
tmpfs           7.8G   17M  7.8G   1% /run
tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2       10G  2.8G  7.3G  28% /
tmpfs           1.6G     0  1.6G   0% /run/user/1000
```

List all available disks:

```bash
$ sudo fdisk -l
Disk /dev/xvda: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: F34B923A-6CE9-4CEF-841E-82EC5D63653C

Device     Start      End  Sectors Size Type
/dev/xvda1  2048     4095     2048   1M BIOS boot
/dev/xvda2  4096 20971486 20967391  10G Linux filesystem

Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

The added storage is `/dev/xvdb`. When we check this, we see that it's still in "Raw" and non-partitioned yet.


```bash
$ sudo fdisk /dev/xvdb
Welcome to fdisk (util-linux 2.32.1).
Command (m for help): m
...
Command (m for help): p
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
```


If we add "m" key, we'll see options available:
 
```bash
Command (m for help): m

Help:

  DOS (MBR)
   a   toggle a bootable flag
   b   edit nested BSD disklabel
   c   toggle the dos compatibility flag

  Generic
   d   delete a partition
   F   list free unpartitioned space
   l   list known partition types
   n   add a new partition
   p   print the partition table
   t   change a partition type
   v   verify the partition table
   i   print information about a partition

  Misc
   m   print this menu
   u   change display/entry units
   x   extra functionality (experts only)

  Script
   I   load disk layout from sfdisk script file
   O   dump disk layout to sfdisk script file

  Save & Exit
   w   write table to disk and exit
   q   quit without saving changes

  Create a new label
   g   create a new empty GPT partition table
   G   create a new empty SGI (IRIX) partition table
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table
```

To list partition types:

```bash
# The one we're interested in is 82 and 83.
Command (m for help): l

 0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris
 1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden or  c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx
 5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data
 6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility
 8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt
 9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access
 a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi ea  Rufus alignment
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         eb  BeOS fs
 f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ee  GPT
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        ef  EFI (FAT-12/16/
11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f0  Linux/PA-RISC b
12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f1  SpeedStor
14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f4  SpeedStor
16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      f2  DOS secondary
17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fb  VMware VMFS
18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fc  VMware VMKCORE
1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fd  Linux raid auto
1c  Hidden W95 FAT3 75  PC/IX           bc  Acronis FAT32 L fe  LANstep
1e  Hidden W95 FAT1 80  Old Minix       be  Solaris boot    ff  BBT
```

## Managing Partitions

Managing partitions is essential for organizing and optimizing storage. Tools like `parted`, `gparted`, and `fdisk` offer various features for different needs and preferences.


### Adding partitions

Still on the fdisk utility, we put "n" key to add a new partition.

It is then followed by the following
- **Select partition type [primary | extended]** - primary are normally the bootable partitions. For now, we can select primary.
- **Partition Number** - since this is the first partition, we can select 1.
- **First sector** - we can set by default by leaving it blank
- **Last sector** - defines the sizes. If we set the default, then the partition size will be the entire volume size

```bash
Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-209715199, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199):

Created a new partition 1 of type 'Linux' and of size 100 GiB.
```

If we print the partition again and compare with before:

```bash
# Before partitioning
Command (m for help): p
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d
```

```bash
# After partitioning
Command (m for help): p

Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 83 Linux
```

Now, this isn't saved yet. To write the data onto the disk, **Verify** and **Write**: 

```bash
Command (m for help): v

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

If we check again the fdisk:

```bash
$ sudo fdisk -l
Disk /dev/xvda: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: F34B923A-6CE9-4CEF-841E-82EC5D63653C

Device     Start      End  Sectors Size Type
/dev/xvda1  2048     4095     2048   1M BIOS boot
/dev/xvda2  4096 20971486 20967391  10G Linux filesystem


Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 83 Linux
```

```bash
$ sudo fdisk -l /dev/xvdb
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 83 Linux
```


### Deleting partitions

Since we now have a partitioned `/dev/xvdb`, let's try to delete it.

```bash
$ sudo fdisk -l /dev/xvdb
$ sudo fdisk /dev/xvdb

Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 83 Linux

Command (m for help): d
Selected partition 1
Partition 1 has been deleted.

Command (m for help): v
Remaining 209715199 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

Checking again:

```bash 
$ sudo fdisk -l /dev/xvdb
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d
```
```bash 
$ sudo fdisk /dev/xvdb
Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.
Command (m for help):
```

### Adding multiple partitions

For the succeeding sections on partitions, I decided to add two more volume to my instance **tst-rhel**, so that now it has a total of four volumes:  

- 1 primary, root (/dev/sda1)
- 1st secondary (/dev/sdb)
- 2nd secondary (/dev/sdc)
- 3rd secondary (/dev/sdd)


List down the existing partitions: 

```bash
$ sudo fdisk -l
Disk /dev/xvda: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: F34B923A-6CE9-4CEF-841E-82EC5D63653C

Device     Start      End  Sectors Size Type
/dev/xvda1  2048     4095     2048   1M BIOS boot
/dev/xvda2  4096 20971486 20967391  10G Linux filesystem


Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x8fa9fd3d

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 83 Linux


Disk /dev/xvdc: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/xvdd: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```


**Determining the End Sector input** 
This is one of the challenge that I had at first when I tried doing multiple partitions on the disk. When you create partitions, **fdisk** asks you to input:

- Start Sector - default is 2048
- End Sector

Not sure if its the same for all disks, but the options when I want to create a partition looks something like this:

```bash
$ sudo fdisk /dev/xvdc

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x4212ba8d.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-209715199, default 2048):
```

Let's say I have 100GB disk and I want it to have multiple partitions, with one partition having 33 GB. Now, you cannot simply enter 33GB on the end sector because **fdisk** only accepts the sizes in KB. You will need to do some conversion. 

```bash
(26gb * 2) then convert to KB, or 
(26 * 2) * 1048576
```

Thus the formula would be below, where "n" is desired size in GB:

```bash
n*2*1048576
```

**References - Partition-sizing**

- [How to calculate partition Start End Sector?](https://unix.stackexchange.com/questions/510868/how-to-calculate-partition-start-end-sector)
- [How to calculate partition Start End Sector](https://itectec.com/unixlinux/how-to-calculate-partition-start-end-sector/)
- [[SOLVED] problem in determine partition size from number of blocks shown in fdisk command](https://www.linuxquestions.org/questions/linux-newbie-8/problem-in-determine-partition-size-from-number-of-blocks-shown-in-fdisk-command-4175442789/)



### Dividing 100GB into three partitions

Here we're using the second secondary-drive and dividing it into 3 equal-sized partitions.

- partition 1: 33GB
- partition 2: 33GB
- partition 3: 34GB (almost equal)

To set partition 1, we enter correct value for end sector. This value can be solved by determining the correct end sector based on desired partition size. 

```bash
1048576*2*n
1048576*2*33gb = 69206016
```

Now, onto setting partition 1:

```bash
$ sudo fdisk /dev/xvdc

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x2a35d329.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-209715199, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199): 69206016

Created a new partition 1 of type 'Linux' 
and of size 33 GiB.

## Make sure to verify and write.
Command (m for help): v
Remaining 140509183 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

To compute the end sector for partition 2, we just add the same value to the start sector. 
Note that in our case, 33GB is equivalent to 69206016. We add this to the Start sector value

```plaintext
69206016 + 69208064 = 138414080
```

We will now use 138414080 as the end sector value for partition 2:

```bash
$ sudo fdisk /dev/xvdc

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (2-4, default 2): 2
First sector (69206017-209715199, default 69208064):
Last sector, +sectors or +size{K,M,G,T,P} (69208064-209715199, default 209715199): 138414080

Created a new partition 2 of type 'Linux' and of size 33 GiB.

Command (m for help): v
Remaining 71303166 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

For the final one, partition 3, we just let everything to be set on the default value since it'll be taking the remaining space on the disk.

```bash
$ sudo fdisk /dev/xvdc

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): n
Partition type
   p   primary (2 primary, 0 extended, 2 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (3,4, default 3): 3
First sector (69206017-209715199, default 138416128):
Last sector, +sectors or +size{K,M,G,T,P} (138416128-209715199, default 209715199):

Created a new partition 3 of type 'Linux' and of size 34 GiB.

Command (m for help): v
Remaining 4094 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() 
```

Checking the information for the disk, we see that it now has 3 partitions:

```bash
$ sudo fdisk /dev/xvdc -l
Disk /dev/xvdc: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x2a35d329

Device     Boot     Start       End  Sectors Size Id Type
/dev/xvdc1           2048  69206016 69203969  33G 83 Linux
/dev/xvdc2       69208064 138414080 69206017  33G 83 Linux
/dev/xvdc3      138416128 209715199 71299072  34G 83 Linux
```


### Dividing 100GB into four partitions

For the third disk, it will have four partitions. We will start with setting partition 4 and create this first, then work my way up to the last, which is partition 1. The sizing will be

- partition 4 - 26 GB
- partition 3 - 32 GB
- partition 2 - 14 GB
- partition 1 - 28 GB

Taking note of the calculations:

```plaintext
1048576*2*n
1048576*2*26 = 54525952
```

To set partition 4 (26 GB):

```bash
$ sudo fdisk /dev/xvdd

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xe64beb89.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 4
First sector (2048-209715199, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199): 54525952

Created a new partition 4 of type 'Linux' and of size 26 GiB.

Command (m for help): v
Remaining 155191294 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

To set partition 3 (32 GB), take note of another set of calculations:

```plaintext
1048576*2*32 = 67108864
```

Add this to the first sector value:

```plaintext
67108864 + 54528000 = 121636864
```

We will now use 121636864 as last sector value:

```bash
$ sudo fdisk /dev/xvdd

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-3, default 1): 3
First sector (54525953-209715199, default 54528000):
Last sector, +sectors or +size{K,M,G,T,P} (54528000-209715199, default 209715199): 121636864

Created a new partition 3 of type 'Linux' and of size 32 GiB.

Command (m for help): v
Remaining 88082429 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

To set partition 2 (14 GB), perform calculations:

```plaintext
1048576*2*n
1048576*2*14 = 29360128
```

Add this to the first sector value:

```plaintext
29360128 + 121638912 = 150999040
```

We will now use 121636864 as last sector value:

```bash
$ sudo fdisk /dev/xvdd

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type
   p   primary (2 primary, 0 extended, 2 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1,2, default 1): 2
First sector (54525953-209715199, default 121638912):
Last sector, +sectors or +size{K,M,G,T,P} (121638912-209715199, default 209715199): 150999040

Created a new partition 2 of type 'Linux' and of size 14 GiB.

Command (m for help): v
Remaining 58722300 unallocated 512-byte sectors.

Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

When setting partition 1 (28 GB), we are just prompted with the default value since partition 1 will take up the remaining unpartitioned space in the disk.

```bash
$ sudo fdisk /dev/xvdd

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type
   p   primary (3 primary, 0 extended, 1 free)
   e   extended (container for logical partitions)
Select (default e): p

Selected partition 1
First sector (54525953-209715199, default 151001088):
Last sector, +sectors or +size{K,M,G,T,P} (151001088-209715199, default 209715199):

Created a new partition 1 of type 'Linux' and of size 28 GiB.
```

Checking the details for this disk, we see that it now has 4 partitions:

```bash
$ sudo fdisk /dev/xvdd -l
Disk /dev/xvdd: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xe64beb89

Device     Boot     Start       End  Sectors Size Id Type
/dev/xvdd1      151001088 209715199 58714112  28G 83 Linux
/dev/xvdd2      121638912 150999040 29360129  14G 83 Linux
/dev/xvdd3       54528000 121636864 67108865  32G 83 Linux
/dev/xvdd4           2048  54525952 54523905  26G 83 Linux

Partition table entries are not in disk order.
```
