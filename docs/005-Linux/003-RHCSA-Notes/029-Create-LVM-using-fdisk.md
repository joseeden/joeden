---
title: "Create LVMs using fdisk"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 29
last_update:
  date: 3/21/2021
---

## Logical Volume Groups 

A **Logical Volume Group (LVM)** is a way to aggregate multiple physical disks into a single, contiguous space, which can then be divided into logical volumes. This abstraction allows for more flexible disk management by enabling dynamic resizing of file systems, making it easier to expand or contract the available space as needed. 

Using an LVM means you can combine several smaller disks into one larger volume, simplifying storage management. This approach is especially useful in environments where disk usage patterns are unpredictable, as it allows for seamless scaling of storage capacity without the need for significant reconfiguration.

## Install and enable LVM

It's possible that when you run **pvdisplay** or any of the LVM commands for the first time, you may see an error message saying that the command is not found. LVM should come as default in most RHEL installation but in some cases, you may need to install the package separately.

First, verify if the package exists in your system:

```bash
rpm -qa |grep -i lvm
```

To install the LVM packages:

```bash
yum install lvm2*
```

Verify again:

```bash
$ sudo rpm -qa |grep -i lvm

lvm2-2.03.12-10.el8.x86_64
lvm2-dbusd-2.03.12-10.el8.noarch
lvm2-lockd-2.03.12-10.el8.x86_64
lvm2-libs-2.03.12-10.el8.x86_64
```

Check the version:

```bash
$ sudo lvm version

  LVM version:     2.03.12(2)-RHEL8 (2021-05-19)
  Library version: 1.02.177-RHEL8 (2021-05-19)
  Driver version:  4.43.0
```

To see the LVM commands, use help:

```bash
$ lvm help
  WARNING: Running as a non-root user. Functionality may be unavailable.
  Available lvm commands:
  Use 'lvm help <command>' for more information

  config          Display and manipulate configuration information
  devtypes        Display recognised built-in block device types
  dumpconfig      Display and manipulate configuration information

*output omitted.
```

<small>Reference: https://www.unixarena.com/2013/08/how-to-install-lvm-on-linux-and-disk.html/</small>



## Creating LVMs using fdisk

Outline: 

1. Create partitions
2. Instead of writing immediately, we specify the type as **LVM**
3. Write and save.
4. Repeat steps 1-3 for other disks that will belong to the same group.
5. Create the LV assembly using `pvcreate`
6. Create the volume group using `vgcreate`
7. Create the logical volume group using `lvcreate`
8. Format the LV group using `mkfs`
9. Mount the LV group to a  using `mount`


### Lab Setup 

In this section, we deleted all the partitions in all our three existing secondary disks from the previous labs. 

```bash
$ sudo fdisk -l
Disk /dev/xvda: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: F34B923A-6CE9-4CEF-841E-82EC5D63653C
```
```bash 
Disk /dev/xvdd: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```
```bash 
Disk /dev/xvdc: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```
```bash
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

None of the disks are mounted. 

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


### Create the partitions 

First, we need to create partitions on the physical disks. This step is crucial because the partitions will be used to create the physical volumes for the LVM.

```bash
$ sudo fdisk /dev/xvdb

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xa782f8bf.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-209715199, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199):

Created a new partition 1 of type 'Linux' and of size 100 GiB.
```

Next, change the type from Linux to Linux LVM. Enter `t' to view all the available types.

```bash
Command (m for help): t

Selected partition 1
Hex code (type L to list all codes): L

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

We need to use the **Linux LVM**, which is **8e**.

```bash
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'.
```

Verify and write:

```bash
Command (m for help): v

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

We can verify the configuration by printing the details:

```bash
Command (m for help): p
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xa782f8bf

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 8e Linux LVM
```

Repeat steps for other disks that will belong in the same LVM.

```bash
$ sudo fdisk /dev/xvdc

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xf52b87f4.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-209715199, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199):

Created a new partition 1 of type 'Linux' and of size 100 GiB.

Command (m for help): t
Selected partition 1
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'.

Command (m for help): v

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

```bash
$ sudo fdisk /dev/xvdd

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xea43c836.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-209715199, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199):

Created a new partition 1 of type 'Linux' and of size 100 GiB.

Command (m for help): t
Selected partition 1
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'.

Command (m for help): v

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

Checking the disks again:

```bash
sudo fdisk -l
```

We;ll get the following output: 

```bash
Disk /dev/xvda: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: F34B923A-6CE9-4CEF-841E-82EC5D63653C

Device     Start      End  Sectors Size Type
/dev/xvda1  2048     4095     2048   1M BIOS boot
/dev/xvda2  4096 20971486 20967391  10G Linux filesystem
```
```bash
Disk /dev/xvdd: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xea43c836

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdd1       2048 209715199 209713152  100G 8e Linux LVM
```
```bash
Disk /dev/xvdc: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xf52b87f4

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdc1       2048 209715199 209713152  100G 8e Linux LVM
```
```bash
Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xa782f8bf

Device     Boot Start       End   Sectors  Size Id Type
/dev/xvdb1       2048 209715199 209713152  100G 8e Linux LVM
```

### Create the LV assembly (pvcreate) 

Next, use `pvcreate` to initialize the partitions as physical volumes. This step prepares the partitions to be added to the volume group.

```bash
$ sudo pvcreate /dev/xvdb1 /dev/xvdc1 /dev/xvdd1

  Physical volume "/dev/xvdb1" successfully created.
  Physical volume "/dev/xvdc1" successfully created.
  Physical volume "/dev/xvdd1" successfully created.
```

To do the reverse, we can also remove the assembly if in case we make a mistake. Just make sure that when you add them as a group, you will need to remove them as a group too.

```bash
$ sudo pvremove /dev/xvdb1 /dev/xvdc1 /dev/xvdd1
  Labels on physical volume "/dev/xvdb1" successfully wiped.
  Labels on physical volume "/dev/xvdc1" successfully wiped.
  Labels on physical volume "/dev/xvdd1" successfully wiped.
```

To continue with the lab, we just need to create the assumble again by running the `pvcreate` command. After that, we can see the details by running the `pvdisplay`:

```bash
sudo pvdisplay
```

It will return the following output: 

```bash 
"/dev/xvdb1" is a new physical volume of "<100.00 GiB"
--- NEW Physical volume ---
PV Name               /dev/xvdb1
VG Name
PV Size               <100.00 GiB
Allocatable           NO
PE Size               0
Total PE              0
Free PE               0
Allocated PE          0
PV UUID               tlF3vP-hBAU-MLCK-a8FR-v011-XEtS-W1Rinf

"/dev/xvdc1" is a new physical volume of "<100.00 GiB"
--- NEW Physical volume ---
PV Name               /dev/xvdc1
VG Name
PV Size               <100.00 GiB
Allocatable           NO
PE Size               0
Total PE              0
Free PE               0
Allocated PE          0
PV UUID               UCkQXp-cLeP-VhyZ-Xu9z-CT8y-Zvhn-zNUR5u

"/dev/xvdd1" is a new physical volume of "<100.00 GiB"
--- NEW Physical volume ---
PV Name               /dev/xvdd1
VG Name
PV Size               <100.00 GiB
Allocatable           NO
PE Size               0
Total PE              0
Free PE               0
Allocated PE          0
PV UUID               neHZec-iU6u-mLvA-GNVB-c4aW-l9MK-Q2cbeK
```

### Create the volume group (vgcreate)

Here, we create the volume group using  `vgcreate` and include the disks we want. As a best practice, we will add disks B and C to the group and leave disk D for future use. This allows for easier expansion of the volume group later if needed.

```bash
$ sudo vgcreate my-volumes /dev/xvdb1 /dev/xvdc1

  Volume group "my-volumes" successfully created
```

If we check the single volume group, we can see that we were able to combine both 100GB storages into a single volume.

```bash
$ sudo vgdisplay

  --- Volume group ---
  VG Name               my-volumes
  System ID
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               199.99 GiB
  PE Size               4.00 MiB
  Total PE              51198
  Alloc PE / Size       0 / 0
  Free  PE / Size       51198 / 199.99 GiB
  VG UUID               1ngVdd-6f9x-Cv7Y-Xa1R-vK7u-z02e-kzBIs8
```

To read all physical volumes and determine if logical volume groups exist within those physical volumes: 

```bash
$ sudo vgscan

  Found volume group "my-volumes" using metadata type lvm2
```

To rename a volume group:

```bash
$ sudo vgrename my-volumes my-volumes-newname

  Volume group "my-volumes" successfully renamed to "my-volumes-newname"
```

### Create the LVM (lvcreate)

Finally, use `lvcreate` to create logical volumes within the volume group. Logical volumes can be resized as needed, providing flexibility in managing disk space.

```bash
$ sudo lvcreate --name group1 --size 99G my-volumes-newname
  Logical volume "group1" created.
```

To show detailed information about all logical volumes in the system:

```bash
$ sudo lvdisplay

  --- Logical volume ---
  LV Path                /dev/my-volumes-newname/group1
  LV Name                group1
  VG Name                my-volumes-newname
  LV UUID                FyzEp5-LFr8-A6xD-6aju-EPKq-W3V0-LUBRfR
  LV Write Access        read/write
  LV Creation host, time tst-rhel, 2021-12-06 13:15:50 +0800
  LV Status              available
  # open                 0
  LV Size                99.00 GiB
  Current LE             25344
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0
```

To identify available logical volumes and their associated volume groups:

```bash
$ sudo lvscan

  ACTIVE            '/dev/my-volumes-newname/group1' [99.00 GiB] inherit
```

### Format the LV group (mkfs)

After creating the LV group, we need to format it using a filesystem so that the volume becomes usable.

```bash
$ sudo mkfs -t ext3 /dev/my-volumes-newname/group1
mke2fs 1.45.6 (20-Mar-2020)
Creating filesystem with 25952256 4k blocks and 6488064 inodes
Filesystem UUID: 5c9864ff-76a0-4c8d-9982-141cb54483e7
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000, 7962624, 11239424, 20480000, 23887872

Allocating group tables: done
Writing inode tables: done
Creating journal (131072 blocks): done
Writing superblocks and filesystem accounting information: done
```

### Mount the LV group 

To use the logical volume, you need to mount it. First, navigate to the `/mnt` directory and create a new directory where the logical volume group will be mounted. Then, proceed with the mounting process.

```bash
eden@tst-rhel:mnt $ sudo mkdir disklvm
eden@tst-rhel:mnt $ ll
total 0
drwxr-xr-x. 2 root root 6 Dec  6 06:08 diskb1
drwxr-xr-x. 2 root root 6 Dec  6 06:26 diskc1
drwxr-xr-x. 2 root root 6 Dec  6 06:26 diskc2
drwxr-xr-x. 2 root root 6 Dec  6 06:26 diskc3
drwxr-xr-x. 2 root root 6 Dec  6 13:26 disklvm
```
```bash 
sudo mount -t ext3 /dev/my-volumes-newname/group1 /mnt/disklvm
```

Verify that the logical volume group has been successfully mounted by checking the mounted filesystems:

```bash
eden@tst-rhel:mnt $ df -h
Filesystem                               Size  Used Avail Use% Mounted on
devtmpfs                                 7.7G     0  7.7G   0% /dev
tmpfs                                    7.8G     0  7.8G   0% /dev/shm
tmpfs                                    7.8G   17M  7.8G   1% /run
tmpfs                                    7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2                                10G  2.8G  7.3G  28% /
tmpfs                                    1.6G     0  1.6G   0% /run/user/1000
/dev/mapper/my--volumes--newname-group1   97G   61M   92G   1% /mnt/disklvm
```

I decided to rename the VG to **myvolumes** and LV to **myvolumes** to make it easier to type.

```bash
eden@tst-rhel:mnt $ sudo vgscan
  Found volume group "my-volumes-newname" using metadata type lvm2

eden@tst-rhel:mnt $ sudo vgrename my-volumes-newname myvolumes
  Volume group "my-volumes-newname" successfully renamed to "myvolumes"
```

Next, unmount the logical volume group:

```bash
eden@tst-rhel:mnt $ sudo umount disklvm
```

Rescan the volume groups and logical volumes to confirm the changes:

```bash
eden@tst-rhel:mnt $ sudo vgscan
  Found volume group "myvolumes" using metadata type lvm2

eden@tst-rhel:mnt $ sudo lvscan
  ACTIVE            '/dev/myvolumes/group1' [99.00 GiB] inherit
```

Finally, mount the renamed logical volume group:

```bash
eden@tst-rhel:mnt $ sudo mount -t ext3 /dev/myvolumes/group1 /mnt/disklvm
```

Verify once again that the logical volume group has been successfully mounted:

```bash 
eden@tst-rhel:mnt $ df -h
Filesystem                    Size  Used Avail Use% Mounted on
devtmpfs                      7.7G     0  7.7G   0% /dev
tmpfs                         7.8G     0  7.8G   0% /dev/shm
tmpfs                         7.8G   17M  7.8G   1% /run
tmpfs                         7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2                     10G  2.8G  7.3G  28% /
tmpfs                         1.6G     0  1.6G   0% /run/user/1000
/dev/mapper/myvolumes-group1   97G   61M   92G   1% /mnt/disklvm
```




