---
title: "Create LVMs using parted"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 30
last_update:
  date: 11/31/2021
---

## Logical Volume Groups 

A **Logical Volume Group (LVM)** is a way to aggregate multiple physical disks into a single, contiguous space, which can then be divided into logical volumes. This abstraction allows for more flexible disk management by enabling dynamic resizing of file systems, making it easier to expand or contract the available space as needed. 

To learn more about LVMs and how to install it, see [LVMs.](./029-Create-LVM-using-fdisk.md#logical-volume-groups)

## Creating LVMs using parted

In this section, we'll go through the process of creating Logical Volume Managers (LVMs) using parted. The steps are similar to those covered earlier, but it's helpful to see the complete process in one place.

### Lab Setup 

We'll be working with `/dev/xvdb`, which has a total of 10GB of memory and currently only has two partitions created on it.

### Create partitions 

Using parted, we'll create another partition on it:

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
```bash 
[root@tst-rhel ~]# parted /dev/xvdb
GNU Parted 3.2
Using /dev/xvdb
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted)
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system     Name  Flags
 1      1000MB  2000MB  999MB                   one
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
```

Create the 3rd partition for LVM. Notice that we use tab completion to see all available file system types, there is none for LVM. We just press enter and let Linux set which is default for LVM.

```bash
(parted)
(parted) mkpart
Partition name?  []? lvm1
File system type?  [ext2]?
affs0            affs6            amufs3           btrfs            hfs              linux-swap(new)  reiserfs
affs1            affs7            amufs4           ext2             hfs+             linux-swap(old)  sun-ufs
affs2            amufs            amufs5           ext3             hfsx             linux-swap(v0)   swsusp
affs3            amufs0           apfs1            ext4             hp-ufs           linux-swap(v1)   xfs
affs4            amufs1           apfs2            fat16            jfs              nilfs2
affs5            amufs2           asfs             fat32            linux-swap       ntfs
File system type?  [ext2]?
Start? 3G
End? 4GB
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
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
 3      3000MB  4000MB  1000MB  ext2            lvm1
```

After setting partition 3 to LVM, you will notice that the flag for partition 3 also changes to LVM.

```bash
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system     Name  Flags
 1      1000MB  2000MB  999MB                   one
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
 3      3000MB  4000MB  1000MB  ext2            lvm1
```    
```bash     
(parted) set 3 lvm on
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system     Name  Flags
 1      1000MB  2000MB  999MB                   one
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
 3      3000MB  4000MB  1000MB  ext2            lvm1  lvm
```


### Create another LVM (Optional) 

Following the same steps as before, we create a 4th partition and set it to LVM. This time, we use **GiB** instead of GB to specify the start and end sectors, ensuring the correct sizing.

```bash
[root@tst-rhel ~]# parted /dev/xvdb
GNU Parted 3.2
Using /dev/xvdb
Welcome to GNU Parted! Type 'help' to view a list of commands.

(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system     Name  Flags
 1      1000MB  2000MB  999MB                   one
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
 3      3000MB  4000MB  1000MB                  lvm1  lvm
```
```bash 
(parted) mkpart
Partition name?  []? lvm2
File system type?  [ext2]?
Start? 4GiB
End? 5GiB
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
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
 3      3000MB  4000MB  1000MB                  lvm1  lvm
 4      4295MB  5369MB  1074MB  ext2            lvm2
```
```bash 
(parted) set 4 lvm on
(parted) print
Model: Xen Virtual Block Device (xvd)
Disk /dev/xvdb: 10.7GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system     Name  Flags
 1      1000MB  2000MB  999MB                   one
 2      2000MB  3000MB  1000MB  linux-swap(v1)  swap  swap
 3      3000MB  4000MB  1000MB                  lvm1  lvm
 4      4295MB  5369MB  1074MB  ext2            lvm2  lvm

(parted) quit
Information: You may need to update /etc/fstab.
```


### Create Physical Volume (pvcreate)

To create the underlying physical volume, we use the `pvcreate` command and specify the partition we want to use.

```bash
[root@tst-rhel ~]# lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0   10G  0 disk
├─xvdb1 202:17   0  953M  0 part
├─xvdb2 202:18   0  954M  0 part [SWAP]
├─xvdb3 202:19   0  954M  0 part
└─xvdb4 202:20   0    1G  0 part
xvdc    202:32   0    9G  0 disk
```
```bash 
[root@tst-rhel ~]# pvcreate /dev/xvdb3

  Physical volume "/dev/xvdb3" successfully created.
```

To view all available physical volume groups, use `pvs`. You'll notice that under the **VG** column, none is specified. This indicates that this PVG is not yet assigned to a volume group.

```bash
[root@tst-rhel ~]# pvs

  PV         VG Fmt  Attr PSize   PFree
  /dev/xvdb3    lvm2 ---  954.00m 954.00m
```

### Assigning the PV to a VG (vgcreate)

To assign a physical volume group to a volume group (VG), use `Vgcreate` followed by the name of the volume group. Running `pvs` again will show a value under the **VG** column, indicating that the PVG is now associated with a VG.

```bash
[root@tst-rhel ~]# vgcreate vgdata /dev/xvdb3
  Volume group "vgdata" successfully created
```

```bash 
[root@tst-rhel ~]# pvs
  PV         VG     Fmt  Attr PSize   PFree
  /dev/xvdb3 vgdata lvm2 a--  952.00m 952.00m
```
```bash 
[root@tst-rhel ~]# vgs
  VG     #PV #LV #SN Attr   VSize   VFree
  vgdata   1   0   0 wz--n- 952.00m 952.00m
```

### Create Logical Volume Group (lvcreate)

To create a logical volume group (LVM), execute `lvcreate` with the `-n` flag followed by the name of the LVM group and the size of the VG previously created. Ensure the name of the volume group is specified correctly for it to be detected.

```bash
[root@tst-rhel ~]# lvcreate -n lvdata -L 952M VGDATA
  Volume group "VGDATA" not found
  Cannot process volume group VGDATA
```
```bash 
[root@tst-rhel ~]# lvcreate -n lvdata -L 952M vgdata
  Logical volume "lvdata" created.
```

To  check the physical volume group, volume group, and LVG:

```bash
[root@tst-rhel ~]# pvs

  PV         VG     Fmt  Attr PSize   PFree
  /dev/xvdb3 vgdata lvm2 a--  952.00m    0
```
```bash 
[root@tst-rhel ~]# vgs

  VG     #PV #LV #SN Attr   VSize   VFree
  vgdata   1   1   0 wz--n- 952.00m    0
```
```bash 
[root@tst-rhel ~]# lvs

  LV     VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lvdata vgdata -wi-a----- 952.00m
```


### Make a filesystem

To avoid confusion, it's always a good practice to run `lsblk` first. Here, we can see the LVM named `vgdata-lvdata` under **xvdb**.

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
│ └─vgdata-lvdata 253:0    0  952M  0 lvm
└─xvdb4           202:20   0    1G  0 part
xvdc              202:32   0    9G  0 disk
```

When we create the file system, we'll use the path '/dev/vgname/lvname':

```bash
[root@tst-rhel ~]# mkfs -t xfs /dev/vgdata/lvdata

meta-data=/dev/vgdata/lvdata     isize=512    agcount=4, agsize=60928 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1
data     =                       bsize=4096   blocks=243712, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=1566, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

### Mount it  

After creating the LVM and file system, it's time to create the directory that will serve as the mount point. To make this mount persistent across reboots, we need to add an entry to `/etc/fstab`.

```bash
[root@tst-rhel ~]# mkdir /mnt/diskblvm
[root@tst-rhel ~]# ll /mnt/
total 0
drwxr-xr-x. 2 root root 6 Dec  7 15:21 diskb1
drwxr-xr-x. 2 root root 6 Dec 31 14:50 diskblvm
```
```bash
[root@tst-rhel ~]# vim /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0
UUID=e6bcc068-628c-4555-b06e-9cda9563cf8c swap                    swap    defaults        0 0

# SWAP
/dev/xvdb2                                swap                    swap    defaults        0 0

# LVM
/dev/vgdata/lvdata                        /mnt/diskblvm           xfs     defaults        0 0
```

Finally, mount it:

```bash
[root@tst-rhel ~]# mount -a
[root@tst-rhel ~]# mount | grep vgdata

/dev/mapper/vgdata-lvdata on /mnt/diskblvm type xfs (rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota)
```

Another useful command to see the mounts in  tree-form is `findmnt`:

```bash
[root@tst-rhel ~]# findmnt
TARGET                                SOURCE     FSTYPE     OPTIONS
/                                     /dev/xvda2 xfs        rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota
├─/sys                                sysfs      sysfs      rw,nosuid,nodev,noexec,relatime,seclabel
│ ├─/sys/kernel/security              securityfs securityfs rw,nosuid,nodev,noexec,relatime
│ ├─/sys/fs/cgroup                    tmpfs      tmpfs      ro,nosuid,nodev,noexec,seclabel,mode=755
│ │ ├─/sys/fs/cgroup/systemd          cgroup     cgroup     rw,nosuid,nodev,noexec,relatime,seclabel,xattr,release_agent=/usr
│ │ ├─/sys/fs/cgroup/cpu,cpuacct      cgroup     cgroup     rw,nosuid,nodev,noexec,relatime,seclabel,cpu,cpuacct
│ ├─/sys/kernel/debug                 debugfs    debugfs    rw,relatime,seclabel
│ └─/sys/kernel/config                configfs   configfs   rw,relatime
├─/proc                               proc       proc       rw,nosuid,nodev,noexec,relatime
│ └─/proc/sys/fs/binfmt_misc          systemd-1  autofs     rw,relatime,fd=42,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,p
├─/dev                                devtmpfs   devtmpfs   rw,nosuid,seclabel,size=8067292k,nr_inodes=2016823,mode=755
│ ├─/dev/shm                          tmpfs      tmpfs      rw,nosuid,nodev,seclabel
│ ├─/dev/pts                          devpts     devpts     rw,nosuid,noexec,relatime,seclabel,gid=5,mode=620,ptmxmode=000
│ ├─/dev/hugepages                    hugetlbfs  hugetlbfs  rw,relatime,seclabel,pagesize=2M
│ └─/dev/mqueue                       mqueue     mqueue     rw,relatime,seclabel
├─/run                                tmpfs      tmpfs      rw,nosuid,nodev,seclabel,mode=755
│ └─/run/user/1000                    tmpfs      tmpfs      rw,nosuid,nodev,relatime,seclabel,size=1620980k,mode=700,uid=1000
├─/var/lib/nfs/rpc_pipefs             rpc_pipefs rpc_pipefs rw,relatime
├─/tmp                                tmpfs      tmpfs      rw,nosuid,nodev,seclabel
└─/mnt/diskblvm                       /dev/mapper/vgdata-lvdata
                                                 xfs        rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=32k,noquota
```
