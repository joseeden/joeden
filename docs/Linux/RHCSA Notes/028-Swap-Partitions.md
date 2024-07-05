---
title: "Swap Partitions"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 28
last_update:
  date: 11/29/2021
---


## Swap Partitions 

**Swap partitions** are special partitions designed for processes and for the Linux system to use if it needs "already-ready" spaces before memory is available or in cases when memory runs out. Note that it is much slower than the RAM available in your system.

![](/img/docs/sv-swap.png)

Rule of Thumb: 

- Low-RAM servers typically has 2GB of swap space as minimum
- If you're hitting swap spaces constantly, then it might be time to upgrade the physical memory or create additional swap spaces on different partitions.
- You would need a sufficient space for kernel dump. Memory should be double, up to 2gb, and additiona 1xmemory for anything over 2gb

Example:

- If you have 8gb system, divide it into two: 2gb and 6gb. 
- Then double the 2gb so you would have 4gb. 
- Then you add the 6gb on top of the 4gb, so you would need a minimum of 10gb.

To see the available swap space, we can run either of these two commands:

```bash
## In my case, I dont have a swap space set in my partitions.
eden@tst-rhel:mnt $ df -h
Filesystem                    Size  Used Avail Use% Mounted on
devtmpfs                      7.7G     0  7.7G   0% /dev
tmpfs                         7.8G     0  7.8G   0% /dev/shm
tmpfs                         7.8G   17M  7.8G   1% /run
tmpfs                         7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2                     10G  2.8G  7.3G  28% /
tmpfs                         1.6G     0  1.6G   0% /run/user/1000
/dev/mapper/myvolumes-group1  196G   60M  186G   1% /mnt/disklvm
```
```bash
eden@tst-rhel:mnt $ sudo cat /proc/swaps
Filename                                Type            Size    Used    Priority
```

There are two tools we can use to create swap partitions: 

- `fdisk`
- `Parted`

## Lab Setup 

For this lab, I added three new EBS volumes into my EC2 instance so that I now have a total of 6 secondary disks.

- /dev/xvdb - added to logical volume group
- /dev/xvdc - added to logical volume group
- /dev/xvdd - added to logical volume group
- /dev/xvde - new disk
- /dev/xvdf - new disk
- /dev/xvdg - new disk

We will be using `/dev/xvde`:

```bash
$ sudo fdisk /dev/xvde -l

Disk /dev/xvde: 24 GiB, 25769803776 bytes, 50331648 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

## Method 1: Using fdisk

Create a new partition:

```bash
$ sudo fdisk /dev/xvde

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x02a79247.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-50331647, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-50331647, default 50331647):

Created a new partition 1 of type 'Linux' and of size 24 GiB.
```

Change type to Linux Swap:

```bash
# "l" to list the types. For linux swap, the hex code is 82
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

Command (m for help): t

Selected partition 1
Hex code (type L to list all codes): 82
Changed type of partition 'Linux' to 'Linux swap / Solaris'.

Command (m for help): v

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```


To check, print the details:

```bash
$ sudo fdisk /dev/xvde

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p
Disk /dev/xvde: 24 GiB, 25769803776 bytes, 50331648 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x02a79247

Device     Boot Start      End  Sectors Size Id Type
/dev/xvde1       2048 50331647 50329600  24G 82 Linux swap / Solaris
```

Next, set up swap space using `mkswap`:

```bash
$ sudo mkswap /dev/xvde1

Setting up swapspace version 1, size = 24 GiB (25768751104 bytes)
no label, UUID=e6bcc068-628c-4555-b06e-9cda9563cf8c
```

Turn on/off swap space using `swapon/swapoff`:

```bash
$ sudo swapon /dev/xvde1 -v

swapon: /dev/xvde1: found signature [pagesize=4096, signature=swap]
swapon: /dev/xvde1: pagesize=4096, swapsize=25768755200, devsize=25768755200
swapon /dev/xvde1
```

Checking the `/proc/swaps` directory, we can see that a file has been created:

```bash
$ cat /proc/swaps
Filename                                Type            Size    Used    Priority
/dev/xvde1                              partition       25164796        0       -2
```

If we turn off swap, it would disappear from /proc/swap.

```bash
sudo swapoff  
```
```bash
$ cat /proc/swaps
Filename                                Type            Size    Used    Priority
```

Note that if we reboot the system, the configuration we did wouldn't persist. We need to add an entry to fstab.


## Method 2: Using parted

I removed the old EBS volumes and created two additional EBS volumes, attached them to my instance, and reused the same disk names - **xvdb** and **xvdc**.

```bash
$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  50G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  50G  0 part /
xvdb    202:16   0  10G  0 disk
xvdc    202:32   0   9G  0 disk
```

I then created a label and partition on it using `parted`:

```bash
(parted) mklabel gpt
(parted) mkpart one 1GB 2GB
(parted) PRINT
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size   File system  Name  Flags
 1      1000MB  2000MB  999MB               one
```

This time, we'll use mkpart in interactive mode to create the swap partition.
It's crucial to specify the filesystem type for swap space as **linux-swap**, along with setting where the partitions starts (2GB) and where it ends (3GB).

```bash
(parted) mkpart
Partition name?  []? swap
File system type?  [ext2]? linux-swap
Start? 2GB
End? 3GB
```
```bash
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system     Name  Flags
 1      1000MB  2000MB  999MB                   one
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap

(parted)  quit
Information: You may need to update /etc/fstab.
```

Next step is to format the partition to use swap. We can use `mkswap` to do this.

```bash
[root@tst-rhel ~]# lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0   10G  0 disk
├─xvdb1 202:17   0  953M  0 part
└─xvdb2 202:18   0  954M  0 part
xvdc    202:32   0    9G  0 disk
[root@tst-rhel ~]#
[root@tst-rhel ~]# mkswap /dev/xvdb2
Setting up swapspace version 1, size = 954 MiB (1000337408 bytes)
no label, UUID=b6b96d62-904b-49d8-b186-396d8f6d3d6d
```

Before we enable the swap, we need to first check the free memory. This should change after running **swapon**.

```bash
[root@tst-rhel ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:          15829         207       15243           1         379       15359
Swap:             0           0           0
```
```bash
[root@tst-rhel ~]# swapon /dev/xvdb2
[root@tst-rhel ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:          15829         208       15242           1         379       15358
Swap:           953           0         953
```

### Persistent Swap

Before we do anything, make sure `/dev/xvdb2` is not mounted. 

```bash
[root@tst-rhel ~]# lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0   10G  0 disk
├─xvdb1 202:17   0  953M  0 part
└─xvdb2 202:18   0  954M  0 part 
xvdc    202:32   0    9G  0 disk
```

Let's add an entry to the `/etc/fstab` for the swap partition. Notice that it will not be mounted to any directory but instead **directly to swap**.

```bash
[root@tst-rhel ~]# vim /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0
UUID=e6bcc068-628c-4555-b06e-9cda9563cf8c swap                    swap    defaults        0 0

/dev/xvdb2                                swap                    swap    defaults        0 0
```

Mount the filesystem:

```bash
sudo mount -a  
```

Checking the block devices again:

```bash
[root@tst-rhel ~]# lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0   10G  0 disk
├─xvdb1 202:17   0  953M  0 part
└─xvdb2 202:18   0  954M  0 part [SWAP]
xvdc    202:32   0    9G  0 disk
```

