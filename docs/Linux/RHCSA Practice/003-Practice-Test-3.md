---
title: Practice Test 3
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---


This labs are based on [Sander Van Vugt's O'Reailly course, "Red Hat Certified System Administrator (RHCSA), 3/e"](https://www.oreilly.com/videos/red-hat-certified/9780135656495/)


## Lab 01 - Managing Partitions

**Tasks:**

1. In the remaining disk of your server, add a 1G partition. Do this in such a way that it is possible to add more partitions later.
2. Format this partition with EXT4 filesystem and set the label "dbfiles" on the partition. Configure your system to mount this partition persistently on the directory /dbfiles, using the partition label

<details>
  <summary> **Solution** </summary>

I'll use /dev/xvdd for this lab.


```bash
[root@tst-rhcsa ~]# lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda          202:0    0   20G  0 disk
├─xvda1       202:1    0    1M  0 part
└─xvda2       202:2    0   20G  0 part /
xvdb          202:16   0   10G  0 disk
├─xvdb1       202:17   0    1G  0 part
├─xvdb2       202:18   0    1K  0 part
├─xvdb5       202:21   0  500M  0 part
└─xvdb6       202:22   0  500M  0 part
xvdc          202:32   0   10G  0 disk
├─xvdc1       202:33   0    1G  0 part
│ └─vgdc-lvdc 253:0    0 1020M  0 lvm
├─xvdc2       202:34   0    1G  0 part
└─xvdc3       202:35   0    8G  0 part
  └─vdo1      253:1    0   10T  0 vdo  /mount/vdo1
xvdd          202:48   0   10G  0 disk
[root@tst-rhcsa ~]#
[root@tst-rhcsa ~]#
[root@tst-rhcsa ~]# lsblk -f
NAME          FSTYPE      LABEL UUID                                   MOUNTPOINT
xvda
├─xvda1
└─xvda2       xfs         root  209b92d1-3b0e-4ae9-b097-6f1a28febc31   /
xvdb
├─xvdb1       ext4              7871a560-57cd-4cb9-b17f-59025eed3710
├─xvdb2
├─xvdb5       xfs               3fd91150-c499-46e9-8ab9-850263aec60c
└─xvdb6       swap              5c43e377-cffc-4ed8-afab-e0efb1713820
xvdc
├─xvdc1       LVM2_member       VCzrg0-uUEw-xnhB-afHf-9u5D-udgX-WsjacI
│ └─vgdc-lvdc xfs               e2136976-c1d0-4066-a4b3-8f4ec778ab4d
├─xvdc2       crypto_LUKS       5ff7ebc1-9011-462c-8606-d491c3525d99
└─xvdc3       vdo               ab76e682-7a3d-4fb7-9781-274f8562bfdd
  └─vdo1      xfs               eed66dc5-5a34-4f25-93d1-a4dfb23f0514   /mount/vdo1
xvdd
```

Create the partition and load the filesystem.


```bash
[root@tst-rhcsa ~]# sudo fdisk /dev/xvdd

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xd036f212.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p):

Using default response p.
Partition number (1-4, default 1):
First sector (2048-20971519, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-20971519, default 20971519): +1G

Created a new partition 1 of type 'Linux' and of size 1 GiB.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
 
```

```bash
[root@tst-rhcsa ~]# mkfs.ext4 -L dbfiles /dev/xvdd1
mke2fs 1.45.6 (20-Mar-2020)
Creating filesystem with 262144 4k blocks and 65536 inodes
Filesystem UUID: d33fe124-58e5-46be-974e-2fe5d36a7f84
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376

Allocating group tables: done
Writing inode tables: done
Creating journal (8192 blocks): done
Writing superblocks and filesystem accounting information: done
```

```bash
[root@tst-rhcsa ~]# lsblk -f
NAME          FSTYPE      LABEL UUID                                   MOUNTPOINT
xvda
├─xvda1
└─xvda2       xfs         root  209b92d1-3b0e-4ae9-b097-6f1a28febc31   /
xvdb
├─xvdb1       ext4              7871a560-57cd-4cb9-b17f-59025eed3710
├─xvdb2
├─xvdb5       xfs               3fd91150-c499-46e9-8ab9-850263aec60c
└─xvdb6       swap              5c43e377-cffc-4ed8-afab-e0efb1713820
xvdc
├─xvdc1       LVM2_member       VCzrg0-uUEw-xnhB-afHf-9u5D-udgX-WsjacI
│ └─vgdc-lvdc xfs               e2136976-c1d0-4066-a4b3-8f4ec778ab4d
├─xvdc2       crypto_LUKS       5ff7ebc1-9011-462c-8606-d491c3525d99
└─xvdc3       vdo               ab76e682-7a3d-4fb7-9781-274f8562bfdd
  └─vdo1      xfs               eed66dc5-5a34-4f25-93d1-a4dfb23f0514   /mount/vdo1
xvdd
└─xvdd1       ext4              dbf43d1c-87f9-4c23-8f17-f4f7b9108d43

```

Create mountpoint and create entry in /etc/fstab.

```bash
[root@tst-rhcsa ~]# mkdir /dbfiles
```

```bash
[root@tst-rhcsa ~]# vim /etc/fstab

UUID=209b92d1-3b0e-4ae9-b097-6f1a28febc31       /       xfs     defaults        0       0

# EDEN: VDO
/dev/mapper/vdo1        /mount/vdo1     xfs     x-systemd.requires=vdo.service  0 0

# EDEN: Lab13-Managing Paritions
LABEL=dbfiles              /dbfiles        ext4    defaults                        0 0
```

Mount the partition and verify.

```bash
[root@tst-rhcsa ~]# mount -a
[root@tst-rhcsa ~]#
[root@tst-rhcsa ~]# lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda          202:0    0   20G  0 disk
├─xvda1       202:1    0    1M  0 part
└─xvda2       202:2    0   20G  0 part /
xvdb          202:16   0   10G  0 disk
├─xvdb1       202:17   0    1G  0 part
├─xvdb2       202:18   0    1K  0 part
├─xvdb5       202:21   0  500M  0 part
└─xvdb6       202:22   0  500M  0 part
xvdc          202:32   0   10G  0 disk
├─xvdc1       202:33   0    1G  0 part
│ └─vgdc-lvdc 253:0    0 1020M  0 lvm
├─xvdc2       202:34   0    1G  0 part
└─xvdc3       202:35   0    8G  0 part
  └─vdo1      253:1    0   10T  0 vdo  /mount/vdo1
xvdd          202:48   0   10G  0 disk
└─xvdd1       202:49   0    1G  0 part /dbfiles
```

Reboot and verify.

```bash
reboot
```

```bash
[root@tst-rhcsa ~]# lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda          202:0    0   20G  0 disk
├─xvda1       202:1    0    1M  0 part
└─xvda2       202:2    0   20G  0 part /
xvdb          202:16   0   10G  0 disk
├─xvdb1       202:17   0    1G  0 part
├─xvdb2       202:18   0    1K  0 part
├─xvdb5       202:21   0  500M  0 part
└─xvdb6       202:22   0  500M  0 part
xvdc          202:32   0   10G  0 disk
├─xvdc1       202:33   0    1G  0 part
│ └─vgdc-lvdc 253:0    0 1020M  0 lvm
├─xvdc2       202:34   0    1G  0 part
└─xvdc3       202:35   0    8G  0 part
  └─vdo1      253:1    0   10T  0 vdo  /mount/vdo1
xvdd          202:48   0   10G  0 disk
└─xvdd1       202:49   0    1G  0 part /dbfiles  
```

</details>



## Lab 02 - Managing LVMs

**Tasks:**

1. Create a 2G LVM volume group with the name vgdata
2. In this volume group, create an 1G logical volume with the name lvdata
3. Format this logical volume with XFS filesystem and mount it persistently on /lvdata
4. Restart, and after restart, add another 500MB to the XFS file system that was created on top of the logical volume

<details>
  <summary> **Solution** </summary>

After the previous labs, I cleaned up the partitions and retain just the xvdd1. I currently have 3 disks ready to be used. For this lab, I'll use /dev/xvdb.

```bash
[eden@tst-rhcsa ~]$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  20G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  20G  0 part /
xvdb    202:16   0  10G  0 disk
xvdc    202:32   0  10G  0 disk
xvdd    202:48   0  10G  0 disk
└─xvdd1 202:49   0   1G  0 part /dbfiles
[eden@tst-rhcsa ~]$
[eden@tst-rhcsa ~]$ lsblk -f
NAME    FSTYPE LABEL   UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs    root    209b92d1-3b0e-4ae9-b097-6f1a28febc31 /
xvdb
xvdc
xvdd
└─xvdd1 ext4   dbfiles d33fe124-58e5-46be-974e-2fe5d36a7f84 /dbfiles
 
```

To start with, create a 2G Partition and change the type to LVM

```bash
[eden@tst-rhcsa ~]$ sudo fdisk /dev/xvdb

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p):

Using default response p.
Partition number (1-4, default 1):
First sector (2048-20971519, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-20971519, default 20971519): +2G

Created a new partition 1 of type 'Linux' and of size 2 GiB.

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
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

```

```bash
[eden@tst-rhcsa ~]$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  20G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  20G  0 part /
xvdb    202:16   0  10G  0 disk
└─xvdb1 202:17   0   2G  0 part
xvdc    202:32   0  10G  0 disk
xvdd    202:48   0  10G  0 disk
└─xvdd1 202:49   0   1G  0 part /dbfiles

```

Create the volume group and logical volume group.

```bash
[root@tst-rhcsa ~]# vgcreate vgdata /dev/xvdb1
  Physical volume "/dev/xvdb1" successfully created.
  Volume group "vgdata" successfully created
[root@tst-rhcsa ~]#
[root@tst-rhcsa ~]# lvcreate -L 1G -n lvdata vgdata
  Logical volume "lvdata" created.
```

Create the XFS Filesystem.

```bash
[root@tst-rhcsa ~]# mkfs.xfs /dev/vgdata/lvdata
meta-data=/dev/vgdata/lvdata     isize=512    agcount=4, agsize=65536 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1
data     =                       bsize=4096   blocks=262144, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

Create the mountpoint and add an entry to /etc/fstab. 

```bash
[root@tst-rhcsa ~]# mkdir /lvdata
[root@tst-rhcsa ~]# vim /etc/fstab

# EDEN: Lab13-Managing LVMs
/dev/vgdata/lvdata      /lvdata         xfs     defaults                        0 0
```

Mount and verify.

```bash
[root@tst-rhcsa ~]# mount -a
[root@tst-rhcsa ~]#
[root@tst-rhcsa ~]#
[root@tst-rhcsa ~]# lsblk
NAME              MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda              202:0    0  20G  0 disk
├─xvda1           202:1    0   1M  0 part
└─xvda2           202:2    0  20G  0 part /
xvdb              202:16   0  10G  0 disk
└─xvdb1           202:17   0   2G  0 part
  └─vgdata-lvdata 253:0    0   1G  0 lvm  /lvdata
xvdc              202:32   0  10G  0 disk
xvdd              202:48   0  10G  0 disk
└─xvdd1           202:49   0   1G  0 part /dbfiles 
```

Reboot and verify.

```bash
reboot 
```

```bash
[eden@tst-rhcsa ~]$ lsblk
NAME              MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda              202:0    0  20G  0 disk
├─xvda1           202:1    0   1M  0 part
└─xvda2           202:2    0  20G  0 part /
xvdb              202:16   0  10G  0 disk
└─xvdb1           202:17   0   2G  0 part
  └─vgdata-lvdata 253:0    0   1G  0 lvm  /lvdata
xvdc              202:32   0  10G  0 disk
xvdd              202:48   0  10G  0 disk
└─xvdd1           202:49   0   1G  0 part /dbfiles

```

Next is to extend the LVM to add another 500MB.

```bash
[root@tst-rhcsa ~]# lvextend -rL +500M /dev/vgdata/lvdata
  Size of logical volume vgdata/lvdata changed from 1.00 GiB (256 extents) to <1.49 GiB (381 extents).
  Logical volume vgdata/lvdata successfully resized.
meta-data=/dev/mapper/vgdata-lvdata isize=512    agcount=4, agsize=65536 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1
data     =                       bsize=4096   blocks=262144, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 262144 to 390144
```

```bash
[root@tst-rhcsa ~]# lsblk
NAME              MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda              202:0    0   20G  0 disk
├─xvda1           202:1    0    1M  0 part
└─xvda2           202:2    0   20G  0 part /
xvdb              202:16   0   10G  0 disk
└─xvdb1           202:17   0    2G  0 part
  └─vgdata-lvdata 253:0    0  1.5G  0 lvm  /lvdata
xvdc              202:32   0   10G  0 disk
xvdd              202:48   0   10G  0 disk
└─xvdd1           202:49   0    1G  0 part /dbfiles 
```

Reboot and verify.

```bash
reboot 
```

</details>



## Lab 03 - Scheduling Cron Jobs

**Tasks:**

1. Schedule a cron job to automatically write the text "hello world" to syslog at every 10th minute after the hour. Ensure this message is written with the "notice" priority.

<details>
  <summary> **Solution** </summary>

For this lab, we'll use **logger**. Test it first.

```bash 
[eden@tst-rhcsa ~]$ logger -p notice "hello world"

[eden@tst-rhcsa ~]$ sudo grep "hello world" /var/log/messages
Mar 13 11:54:51 localhost eden[1540]: hello world
```

Now that we know the command to use, add it to the crontab.

```bash
[eden@tst-rhcsa ~]$ crontab -e

10 * * * * logger -p notice "hello world"
```


</details>



## Lab 04 - Configuring a Repository

**Tasks:**

1. Loop mount the installation disk/ISO that you've used to setup RHEL 8. Configure the loop-mounted ISO as a repository.
2. Configure your system to use this as the only repository.

<details>
  <summary> **Solution** </summary>

Check first the memory,

```bash
$ df -h 
```

![](/img/docs/plabs15-1.png)

Since I'm using VirtualBox, I have to load the ISO back by selecting **Devices** > **Optical Drives** > select the ISO file

![](/img/docs/plabs15-2.png)

Checking again, we see that the image is now showing for /dev/sr0.

![](/img/docs/plabs15-3.png)

Let's create a mountpoint **/repo** and add an entry in /etc/fstab. Mount afterwards.


```bash
$ mkdir /repo
$ sudo vim /etc/fstab

/dev/sr0    /repo     iso9660     defaults      0  0
```

```bash
$ mount -a
```

Since the assignment requires us to use the new repo, we have to delete the existing one/s.


```bash
$ sudo yum repolist
```
![](/img/docs/plabs15-10.png)



```bash
$ cd /etc/yum.repos.d
```
![](/img/docs/plabs15-11.png)


```bash
$ sudo rm -f *
$ ls 
```
![](/img/docs/plabs15-12.png)

Next is to create the repo files.

```bash
$ sudo vim Base0S.repo

[BaseOS]
name=Base0S
baseurl=file:///repo/BaseOS
gpgcheck=0
```

```bash
$ sudo vim AppStream.repo

[AppStream]
name=AppStream
baseurl=file:///repo/AppStream
gpgcheck=0
```

To verify,

```bash
$ sudo yum repolist
```

![](/img/docs/sv-repolist-14.png)

</details>



## Lab 05 - Resetting the Root password

**Tasks:**

1. Reset the root password.

<details>
  <summary> **Solution** </summary>

Note that this won't work with EC2 instances so use VirtualBox.
To start with, run **reboot**.

```bash
$ sudo reboot
```

When you reach this part, press "e".

![](/img/docs/plabs16-reboot1.png)

It should bring you here:

![](/img/docs/plabs16-reboot2.png)

Replace **rhgb quiet** with **rd.break** then press Ctrl-X.

![](/img/docs/plabs16reboot3.png)

It should drop to the initramfs shell.
Run the commands below,

```bash
$ mount -o remount,rw /sysroot
$ chroot /sysroot
$ passwd
```

After changing the root password, ensure the filesystem will be automatically ccorrected when the system is rebooted.

```bash
$ touch /.autorelabel
```

To exit out, hit Ctrl-D twice. Once it reboot, it should prompt you to enter the new root password in the GUI.

</details>

