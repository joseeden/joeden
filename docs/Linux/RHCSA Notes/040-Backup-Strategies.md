---
title: "Backup and Recovery Strategies"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 40
last_update:
  date: 11/29/2021
---

## Backup using `dd`

**dd** allows us to take backups of files or entire filesystems and store them as images. It's a powerful tool for creating snapshots that capture the state of a disk at a specific moment.

For this lab, I deleted all the EBS volumes and created a fresh one, `/dev/xvdb`, then partitioned and formatted it with EXT3, mounting it to `/mnt/diskb1`. For detailed instructions on disk partitioning and mounting, please refer to sections on [Managing partitions.](./025-Managing-Partitions.md)

```bash
eden@tst-rhel:mnt $ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda2       10G  2.8G  7.3G  28% /
/dev/xvdb1      9.8G   23M  9.3G   1% /mnt/diskb1
```
```bash
eden@tst-rhel:mnt $ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb
└─xvdb1 ext3         5bae5568-d137-495f-b2f5-e0518b1c6d71 /mnt/diskb1 
```

To backup a filesystem, specify:

- `if`: input file or device
- `of`: output file or image

Here, we're backing up `/dev/xvdb1` to an image file in our home directory:

```bash
$ ll
total 0
```
```bash
$ sudo dd if=/dev/xvdb1 of=/home/eden/mybackup.img

[sudo] password for eden:
15215337+0 records in
15215336+0 records out
7790252032 bytes (7.8 GB, 7.3 GiB) copied, 71.3802 s, 109 MB/s
```
```bash
$ ll
total 7607672
-rw-r--r--. 1 root root 7790252032 Dec  7 15:34 mybackup.img 
```

## Restore using `dd`

For this lab, I created another EBS volume, `/dev/xvdc`, alongside `/dev/xvdb` which we backed up in the previous step. Both disks have been partitioned, formatted with EXT3, and mounted (`/mnt/diskc1` for `/dev/xvdc`). Refer to earlier sections for disk partitioning and mounting details.

> Note: Expanding the root volume from 10G to 50GB is in progress, so I couldn't include the restore output here.

To restore the backup, reverse the process, specifying the backup image as **if** and the target partition as **of**:

```bash
sudo dd if=/home/eden/mybackup.img of=/dev/xvdc1
```

:::info[note]

Always restore to an unmounted partition (`/dev/xvdc1` in this case). This ensures data integrity and prevents conflicts with active filesystem operations.

:::