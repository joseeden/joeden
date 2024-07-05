---
title: "Formatting and Mounting Disks"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 26
last_update:
  date: 11/29/2021
---


## Understanding Mounts

In Linux, everything is treated as a file, forming a **file hierarchy system (FHS)**. This system sets how files are organized, starting from the root directory. Different devices can be integrated into the FHS using mounts, allowing seamless expansion of storage. For instance, if a directory becomes too large, you can mount it to a larger device without disrupting the file structure.

In the image below, we see directories mounted on different disk devices. This means if one directory gets too big, you can connect it to a larger device.

![](/img/docs/sv-mounts.png)

## Formatting Disks for Filesystem

After partitioning disks, they need to be formatted before they can be used. This involves creating a filesystem on the partition, which prepares it for storing files.

First, check the current filesystem status to understand the existing setup and space utilization:

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

Next, format the drive to use the EXT4 filesystem: 

```bash
sudo mkfs -t ext4 /dev/xvdb
```
Respond `y` to any prompts to proceed. This command creates the filesystem and allocates necessary tables, making the disk ready for use.

```bash
mke2fs 1.45.6 (20-Mar-2020)
Found a dos partition table in /dev/xvdb
Proceed anyway? (y,N) y
Creating filesystem with 26214400 4k blocks and 6553600 inodes
Filesystem UUID: 6ddbb1c5-76e0-4585-8a73-393e7308977b
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000, 7962624, 11239424, 20480000, 23887872

Allocating group tables: done
Writing inode tables: done
Creating journal (131072 blocks): done
Writing superblocks and filesystem accounting information: done
```

## /mnt vs. /media

Linux uses two common mount directories: **/mnt** and **/media**. These directories serve as mount points, but they are intended for different types of mounts. 

Main differences:

- **/media**: 
  - Intended for removable media (e.g., USB drives, CDs)
  - Auto-mounts devices
  - Typically used for GUI mounts
  - User-specific mounts
  - Listing contents of /media:
      
    ```bash
    $ ls -la /media

    total 8
    drwxr-xr-x  2 root root 4096 Nov 23  2023 .
    drwxr-xr-x 19 root root 4096 Jul  4 09:19 ..
    ```

- **/mnt**:
  - An all-purpose mount directory
  - Used for temporary mounts initiated by the user
  - Suitable for manually mounted filesystems
  - Listing contents of /mnt:

    ```bash
    $ ls -la /mnt

    total 8
    drwxr-xr-x 11 root     root     4096 Jul  4 09:19 .
    drwxr-xr-x 19 root     root     4096 Jul  4 09:19 ..
    drwxrwxrwx  1 joseeden joseeden  512 Jul  2 01:04 c
    drwxrwxrwx  1 joseeden joseeden  512 Jul  2 01:04 d
    drwxrwxrwx  1 joseeden joseeden  512 Jul  2 01:04 e
    drwxrwxrwx  1 joseeden joseeden 4096 Jul  2 01:04 f
    drwxrwxrwx  1 joseeden joseeden 4096 Jul  2 01:04 g
    drwxrwxrwx  1 joseeden joseeden 4096 Jul  2 01:04 h
    drwxrwxrwx  1 joseeden joseeden  512 Jan  1  1980 i
    drwxrwxrwt  3 root     root       80 Jul  4 09:20 wsl
    drwxrwxrwt  8 root     root      320 Jul  4 09:20 wslg
    ```

**References**:

- [Need newbie explanation on /mnt versus /media](https://forums.linuxmint.com/viewtopic.php?t=262268)
- [The difference between dev, media and mnt?](https://itectec.com/unixlinux/the-difference-between-dev-media-and-mnt/)

## Mounting Disks

Once a disk has a filesystem, it needs to be mounted so that files can be copied onto it. Mounting integrates the disk into the file hierarchy, making its storage space available for use.

### Steps to mount the disk

1. First, list the available disks to identify which ones are partitioned and ready for mounting:

    ```bash
    sudo fdisk -l
    ```

    For this lab, we have four disks:

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
    Disk /dev/xvdb: 100 GiB, 107374182400 bytes, 209715200 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x89d943aa

    Device     Boot Start       End   Sectors  Size Id Type
    /dev/xvdb1       2048 209715199 209713152  100G 83 Linux
    ```

    ```bash
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

    ```bash
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
    ```

2. Check the current mounted disks to see the existing mounts. From here we can see that four partitions have not been mounted yet.

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

3. Navigate to the mount directory and create a new directory where the disk will be mounted:

    ```bash
    cd /mnt/
    sudo mkdir diskb1
    ```

4. Mount the `/dev/xvdb` disk to the newly created directory:

    ```bash
    sudo mount -t ext4 /dev/xvdb /mnt/diskb1
    ```

5. Verify the mount by listing the mounted filesystems again:

    ```bash
    eden@tst-rhel:mnt $ df -h

    Filesystem      Size  Used Avail Use% Mounted on
    devtmpfs        7.7G     0  7.7G   0% /dev
    tmpfs           7.8G     0  7.8G   0% /dev/shm
    tmpfs           7.8G   17M  7.8G   1% /run
    tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
    /dev/xvda2       10G  2.8G  7.3G  28% /
    tmpfs           1.6G     0  1.6G   0% /run/user/1000
    /dev/xvdb        98G   61M   93G   1% /mnt/diskb1
    ```

### More examples 

We'll follow the same steps to mount the rest of the other partitions. 

1. Check the partitions for `/dev/xvdc`

    ```bash
    eden@tst-rhel:mnt $ sudo fdisk /dev/xvdc -l
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

2. Create the mounting directory for the each partition of the disk:

    ```bash
    eden@tst-rhel:mnt $ sudo mkdir diskc1 diskc2 diskc3
    eden@tst-rhel:mnt $ ls -la
    total 4
    drwxr-xr-x.  6 root root   62 Dec  6 06:26 .
    dr-xr-xr-x. 18 root root  251 Nov 18 06:00 ..
    drwxr-xr-x.  3 root root 4096 Dec  6 06:16 diskb1
    drwxr-xr-x.  2 root root    6 Dec  6 06:26 diskc1
    drwxr-xr-x.  2 root root    6 Dec  6 06:26 diskc2
    drwxr-xr-x.  2 root root    6 Dec  6 06:26 diskc3
    ```

3. Format the 3 disk partitions with EXT3 Filesystem:
    
    ```bash
    eden@tst-rhel:mnt $ sudo mkfs -t ext3 /dev/xvdc1
    mke2fs 1.45.6 (20-Mar-2020)
    Creating filesystem with 8650496 4k blocks and 2162688 inodes
    Filesystem UUID: 52545136-5e0e-4022-86c0-7845250d5263
    Superblock backups stored on blocks:
            32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
            4096000, 7962624
    ```

    ```bash
    eden@tst-rhel:mnt $ sudo mkfs -t ext3 /dev/xvdc2
    mke2fs 1.45.6 (20-Mar-2020)
    Creating filesystem with 8650752 4k blocks and 2162688 inodes
    Filesystem UUID: 7d123d52-b4c3-4a03-b077-c03761f57d0e
    Superblock backups stored on blocks:
            32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
            4096000, 7962624  
    ```

    ```bash
    eden@tst-rhel:mnt $ sudo mkfs -t ext3 /dev/xvdc3
    mke2fs 1.45.6 (20-Mar-2020)
    Creating filesystem with 8912384 4k blocks and 2228224 inodes
    Filesystem UUID: b8c13319-646e-4933-87e0-27bf530e04ec
    Superblock backups stored on blocks:
            32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
            4096000, 7962624  
    ```

4. Before mounting, we confirm again the list of mounted disks:

    ```bash
    eden@tst-rhel:mnt $ df -h

    Filesystem      Size  Used Avail Use% Mounted on
    devtmpfs        7.7G     0  7.7G   0% /dev
    tmpfs           7.8G     0  7.8G   0% /dev/shm
    tmpfs           7.8G   17M  7.8G   1% /run
    tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
    /dev/xvda2       10G  2.8G  7.3G  28% /
    tmpfs           1.6G     0  1.6G   0% /run/user/1000
    /dev/xvdb        98G   61M   93G   1% /mnt/diskb1  
    ```

5. Finally, mount the partitions to their respective mounting directories:

    ```bash
    eden@tst-rhel:mnt $ sudo mount -t ext3 /dev/xvdc1 /mnt/diskc1
    eden@tst-rhel:mnt $ sudo mount -t ext3 /dev/xvdc2 /mnt/diskc2
    eden@tst-rhel:mnt $ sudo mount -t ext3 /dev/xvdc3 /mnt/diskc3
    ```

6. Checking the mounted disks:

    ```bash
    eden@tst-rhel:mnt $ df -h

    Filesystem      Size  Used Avail Use% Mounted on
    devtmpfs        7.7G     0  7.7G   0% /dev
    tmpfs           7.8G     0  7.8G   0% /dev/shm
    tmpfs           7.8G   17M  7.8G   1% /run
    tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
    /dev/xvda2       10G  2.8G  7.3G  28% /
    tmpfs           1.6G     0  1.6G   0% /run/user/1000
    /dev/xvdb        98G   61M   93G   1% /mnt/diskb1
    /dev/xvdc1       33G   49M   31G   1% /mnt/diskc1
    /dev/xvdc2       33G   49M   31G   1% /mnt/diskc2
    /dev/xvdc3       34G   49M   32G   1% /mnt/diskc3  
    ```

7. We can also check the details about the block devices:

    ```bash
    eden@tst-rhel:mnt $ lsblk -f

    NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
    xvda
    ├─xvda1
    └─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
    xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
    xvdc
    ├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
    ├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
    └─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
    xvdd
    ├─xvdd1
    ├─xvdd2
    ├─xvdd3
    └─xvdd4  
    ```

### References 

- [How to Format Disk Partitions in Linux](https://phoenixnap.com/kb/linux-format-disk)
- [mkfs fails complaining that: "/dev/sdb is apparently in use by the system; will not make a filesystem here"](https://serverfault.com/questions/345971/mkfs-fails-complaining-that-dev-sdb-is-apparently-in-use-by-the-system-will)
- [How to correct 512-byte sector MBR on a 4096-byte sector disk?](https://superuser.com/questions/679725/how-to-correct-512-byte-sector-mbr-on-a-4096-byte-sector-disk)
- [Unable to format drive - "is apparently in use by the system"](https://www.overclockers.com/forums/showthread.php/667317-Unable-to-format-drive-quot-is-apparently-in-use-by-the-system-quot)
- [Disk apparently in use by the system; will not make a filesystem here](https://forums.centos.org/viewtopic.php?t=74469)
- [mkfs refuses to make filesystem with message “is apparently in use by the system; will not make a filesystem here!”](https://www.systutorials.com/mkfs-refuses-to-make-filesystem-with-message-is-apparently-in-use-by-the-system-will-not-make-a-filesystem-here/)
- [Disk is apparently in use by the system](https://superuser.com/questions/447462/disk-is-apparently-in-use-by-the-system)
- [Ubuntu: /dev/sdb1 is apparently in use by the system; will not make a filesystem here](https://www.titanwolf.org/Network/q/09591191-1d3d-455d-a207-5fa68a2e94bf/x)


## Unmounting disks 

To do the reverse, we can simple unmount any of partitions.

1. Checking before we unmount:

    ```bash
    eden@tst-rhel:mnt $ df -h
    Filesystem      Size  Used Avail Use% Mounted on
    devtmpfs        7.7G     0  7.7G   0% /dev
    tmpfs           7.8G     0  7.8G   0% /dev/shm
    tmpfs           7.8G   17M  7.8G   1% /run
    tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
    /dev/xvda2       10G  2.8G  7.3G  28% /
    tmpfs           1.6G     0  1.6G   0% /run/user/1000
    /dev/xvdb        98G   61M   93G   1% /mnt/diskb1
    /dev/xvdc1       33G   49M   31G   1% /mnt/diskc1
    /dev/xvdc2       33G   49M   31G   1% /mnt/diskc2
    /dev/xvdc3       34G   49M   32G   1% /mnt/diskc3
    ```
    ```bash 
    eden@tst-rhel:mnt $ lsblk -f
    NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
    xvda
    ├─xvda1
    └─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
    xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
    xvdc
    ├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
    ├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
    └─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
    xvdd
    ├─xvdd1
    ├─xvdd2
    ├─xvdd3
    └─xvdd4
    ```


2. Now, to unmount the second partition of '/dev/xvdc':

    ```bash
    sudo umount /mnt/diskc2
    ```
    ```bash
    eden@tst-rhel:mnt $ df -h
    Filesystem      Size  Used Avail Use% Mounted on
    devtmpfs        7.7G     0  7.7G   0% /dev
    tmpfs           7.8G     0  7.8G   0% /dev/shm
    tmpfs           7.8G   17M  7.8G   1% /run
    tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
    /dev/xvda2       10G  2.8G  7.3G  28% /
    tmpfs           1.6G     0  1.6G   0% /run/user/1000
    /dev/xvdb        98G   61M   93G   1% /mnt/diskb1
    /dev/xvdc1       33G   49M   31G   1% /mnt/diskc1
    /dev/xvdc3       34G   49M   32G   1% /mnt/diskc3
    ```

3. Verify:

    ```bash
    eden@tst-rhel:mnt $ lsblk -f
    NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
    xvda
    ├─xvda1
    └─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
    xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
    xvdc
    ├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
    ├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e
    └─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
    xvdd
    ├─xvdd1
    ├─xvdd2
    ├─xvdd3
    └─xvdd4
    ```

## Accessing the Mounted Disks

Once the disks are mounted, they are accessible through the directories they are mounted to. To show how files are managed on mounted disks, let's create a file and copy it onto a mounted directory `/mnt/diskc1`.

Create a file named `file-copy-1` and copy the file to the mounted directory `/mnt/diskc1`:

```bash
$ touch file-copy-1
$ sudo cp file-copy-1 /mnt/diskc1
$ ll /mnt/diskc1
total 16
-rw-r--r--. 1 root root     0 Dec  6 09:48 file-copy-1
drwx------. 2 root root 16384 Dec  6 08:39 lost+found
```

Write to the file:

```bash
$ cat > /mnt/diskc1/file-copy-1

This is a test file created on the mounted disk.
```

```bash
$ cat /mnt/diskc1/file-copy-1

This is a test file created on the mounted disk.
```

### Unmounting the Partition

If we unmount the partition '/dev/xvdc1', the file created on that partition will be inaccesible. The file is not deleted, but the partition is *disconnected* from the mountpoint so that when the system checks the mountpoint, which is the directory, it's not able to see the file.

```bash
$ sudo umount /mnt/diskc1
$ ll /mnt/diskc1
total 0
```

### Remounting the Partition

If we mount the partition back, ("connecting" the disk to the mountpoint in a sense), we see that the file is again accesible.

```bash
$ sudo mount /dev/xvdc1 /mnt/diskc1
$ ll /mnt/diskc1
total 16
-rw-r--r--. 1 root root     0 Dec  6 09:48 file-copy-1
drwx------. 2 root root 16384 Dec  6 08:39 lost+found
```
```bash
$ cat /mnt/diskc1/file-copy-1

This is a test file created on the mounted disk. 
```

### Multiple Partitions, Same Directory

Since I was curious, I wanted to re-mount two partitions to the same directory, Currently, we have this:

```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
```

We'll mount '/dev/xvdc1' to `/mnt/diskc2' so that now `/mnt/diskc2' has two partitions mounted onto it.

```bash
$ sudo umount /mnt/diskc1
$ sudo mount /dev/xvdc1 /mnt/diskc1
```
```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc2
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
xvdd
├─xvdd1
├─xvdd2
├─xvdd3
└─xvdd4
```

Checking the both directories again:

```bash
$ ll /mnt/diskc1
total 16
-rw-r--r--. 1 root root     0 Dec  6 09:48 file-copy-1
drwx------. 2 root root 16384 Dec  6 08:39 lost+found

$ ll /mnt/diskc2
total 16
-rw-r--r--. 1 root root     0 Dec  6 09:48 file-copy-1
drwx------. 2 root root 16384 Dec  6 08:39 lost+found
```

:::note 

I think this might require further trial and error. I might just come back to this once I finish the RHCSA curriculum or once I get back to preparing for the RHCSA exam.

:::


In this example, mounting multiple partitions to the same directory does not delete the files but can lead to confusion. It is generally advisable to avoid such configurations to maintain a clear and organized file system.


## Non-Superuser Mounts

Normally, only the superuser can mount filesystems. However, when fstab contains the user option on a line, anybody can mount the corresponding system. By default, only the user that mounted a filesystem can unmount it.

Reference: ~[Non-Superuser Mounts](https://www.computerhope.com/unix/umount.htm#:~:text=Non%2DSuperuser%20Mounts,can%20mount%20the%20corresponding%20system.&text=By%20default%2C%20only%20the%20user,a%20filesystem%20can%20unmount%20it)

## UUID

This is the **Universally Unique Identifier**. Similar to a MAC address, it is a way to identify the correct drive even if the drive letter or partition number changes. This is automatically created anytime a filesystem is added to the system.

To see the UUIDs associated with our drives:

```bash
$ ll /dev/disk

total 0
drwxr-xr-x. 2 root root 220 Dec  6 08:38 by-partuuid
drwxr-xr-x. 2 root root 140 Dec  6 09:19 by-uuid

$ ll /dev/disk/by-uuid/

total 0
lrwxrwxrwx. 1 root root 11 Dec  6 08:40 52545136-5e0e-4022-86c0-7845250d5263 -> ../../xvdc1
lrwxrwxrwx. 1 root root 11 Dec  6 08:41 7d123d52-b4c3-4a03-b077-c03761f57d0e -> ../../xvdc2
lrwxrwxrwx. 1 root root 10 Dec  6 08:36 b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e -> ../../xvdb
lrwxrwxrwx. 1 root root 11 Dec  6 09:19 b8c13319-646e-4933-87e0-27bf530e04ec -> ../../xvdc3
lrwxrwxrwx. 1 root root 11 Dec  6 08:04 d35fe619-1d06-4ace-9fe3-169baad3e421 -> ../../xvda2
```

Another command to see the UUIDs:

```bash
# Note that the IDs may now be different since I added this part on a much later date.

[root@tst-rhel ~]# blkid

/dev/xvda2: UUID="d35fe619-1d06-4ace-9fe3-169baad3e421" BLOCK_SIZE="512" TYPE="xfs" PARTUUID="25a742d0-6b18-4c26-951a-2b99f1be934d"
/dev/xvdc1: UUID="d6eaa147-9986-4af3-bd28-f776b4628643" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="dc5fac76-01"
/dev/xvda1: PARTUUID="07c6574c-7f85-4859-9689-c8090f35545a"
/dev/xvdb1: UUID="d3e1da6b-5577-4d21-8f78-af81b31246c6" BLOCK_SIZE="512" TYPE="xfs" PARTLABEL="one" PARTUUID="56ffe2f0-90c9-4555-9d0d-49c63b2c8192"


## Labeling using tune2fs

Besides getting the specific UUID of the partitions, we can also assign labels to them and we can refer to this labels. To do this, we can use the **tune2fs** utility.

```bash
[root@tst-rhel ~]# tune2fs --help
tune2fs 1.45.6 (20-Mar-2020)
tune2fs: invalid option -- '-'
Usage: tune2fs [-c max_mounts_count] [-e errors_behavior] [-f] [-g group]
        [-i interval[d|m|w]] [-j] [-J journal_options] [-l]
        [-m reserved_blocks_percent] [-o [^]mount_options[,...]]
        [-r reserved_blocks_count] [-u user] [-C mount_count]
        [-L volume_label] [-M last_mounted_dir]
        [-O [^]feature[,...]] [-Q quota_options]
        [-E extended-option[,...]] [-T last_check_time] [-U UUID]
        [-I new_inode_size] [-z undo_file] device
```

Note that tune2fs can only be used for ext2, ext3, and ext4 file types. For XFS types, tune2fs cannot be interpreted. When tune2fs is used on a xfs, it will return an error:

```bash
Bad magic number in super-block
```

This simply means that tune2fs doesn't understand the filesystem type. As an example, we have `/dev/xvdb1` which we set to xfs filesystem. 

```bash
[root@tst-rhel ~]# blkid | grep xvdb
/dev/xvdb1: UUID="8371f83f-8715-4e38-a3c9-fde7d10a7c97" BLOCK_SIZE="4096" TYPE="ext4" PARTLABEL="one" PARTUUID="56ffe2f0-90c9-4555-9d0d-49c63b2c8192"
```      
```bash       
[root@tst-rhel ~]# mkfs.xfs /dev/xvdb1
mkfs.xfs: /dev/xvdb1 appears to contain an existing filesystem (ext4).
mkfs.xfs: Use the -f option to force overwrite.
```
```bash 
[root@tst-rhel ~]# mkfs.xfs /dev/xvdb1 -f
meta-data=/dev/xvdb1             isize=512    agcount=4, agsize=65472 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1
data     =                       bsize=4096   blocks=261888, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=1566, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```
```bash 
[root@tst-rhel ~]# blkid | grep xvdb
/dev/xvdb1: UUID="69e31de4-d231-4b80-9fcb-40ee1aef0150" BLOCK_SIZE="512" TYPE="xfs" PARTLABEL="one" PARTUUID="56ffe2f0-90c9-4555-9d0d-49c63b2c8192"
```
```bash 
[root@tst-rhel ~]# tune2fs -L "Section-B" /dev/xvdb1
tune2fs 1.45.6 (20-Mar-2020)
tune2fs: Bad magic number in super-block while trying to open /dev/xvdb1
/dev/xvdb1 contains a xfs file system
```

Because of this, we'll need to change the filesystem to Ext4 and retry tune2fs again.

```bash
[root@tst-rhel ~]# blkid | grep xvdb
/dev/xvdb1: UUID="69e31de4-d231-4b80-9fcb-40ee1aef0150" BLOCK_SIZE="512" TYPE="xfs" PARTLABEL="one" PARTUUID="56ffe2f0-90c9-4555-9d0d-49c63b2c8192"
```
```bash
[root@tst-rhel ~]# mkfs.ext4 /dev/xvdb1
mke2fs 1.45.6 (20-Mar-2020)
/dev/xvdb1 contains a xfs file system
Proceed anyway? (y,N) y
Creating filesystem with 261888 4k blocks and 65536 inodes
Filesystem UUID: 53120174-378d-4db6-978b-d672660e2b06
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376

Allocating group tables: done
Writing inode tables: done
Creating journal (4096 blocks): done
Writing superblocks and filesystem accounting information: done
```
```bash
[root@tst-rhel ~]# blkid | grep xvdb
/dev/xvdb1: UUID="53120174-378d-4db6-978b-d672660e2b06" BLOCK_SIZE="4096" TYPE="ext4" PARTLABEL="one" PARTUUID="56ffe2f0-90c9-4555-9d0d-49c63b2c8192"
```

Retrying tune2fs again:

```bash
[root@tst-rhel ~]# tune2fs -L 'Section-B' /dev/xvdb1
tune2fs 1.45.6 (20-Mar-2020)

[root@tst-rhel ~]# blkid | grep xvdb
/dev/xvdb1: LABEL="Section-B" UUID="53120174-378d-4db6-978b-d672660e2b06" BLOCK_SIZE="4096" TYPE="ext4" PARTLABEL="one" PARTUUID="56ffe2f0-90c9-4555-9d0d-49c63b2c8192"
```

We can now use the label in fstab to refer to this partition.

```bash
[root@tst-rhel ~]# vim /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0
UUID=e6bcc068-628c-4555-b06e-9cda9563cf8c swap                    swap    defaults        0 0

LABEL=Section-B                          /mnt/diskb1              xfs     defaults        0 0
```

When we run the mount command again, the system will go through the `/etc/fstab` and it will see the new entry for `/mnt/diskb1` which is pointing to the newly created label.

```bash
[root@tst-rhel ~]# mount | grep diskb1
[root@tst-rhel ~]# mount -a
[root@tst-rhel ~]# mount | grep diskb1
/dev/xvdb1 on /mnt/diskb1 type ext4 (rw,relatime,seclabel)
``` 

## Persistently mount filesystems 

In the previous sections, we did a manual mounting of partitions. To automatically mount them during system start, we specify the partitions and their respective mountpoints in the `/etc/fstab` file.

![](/img/docs/sv-fstab.png)
 
```bash
$ vi /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0
```

As an example, we can mount '/dev/xvdb1' on bootup by adding its **UUID** and the mountpoint to the **fstab**.

```bash
$ ll /dev/disk/by-uuid/

total 0
lrwxrwxrwx. 1 root root 11 Dec  6 08:40 52545136-5e0e-4022-86c0-7845250d5263 -> ../../xvdc1
lrwxrwxrwx. 1 root root 11 Dec  6 08:41 7d123d52-b4c3-4a03-b077-c03761f57d0e -> ../../xvdc2
lrwxrwxrwx. 1 root root 10 Dec  6 08:36 b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e -> ../../xvdb
lrwxrwxrwx. 1 root root 11 Dec  6 09:19 b8c13319-646e-4933-87e0-27bf530e04ec -> ../../xvdc3
lrwxrwxrwx. 1 root root 11 Dec  6 08:04 d35fe619-1d06-4ace-9fe3-169baad3e421 -> ../../xvda2
```   

From the output above, we can see that `/dev/xvdb1` has a `UUID=b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e`. Add this to the `/etc/fstab` and indicate EXT4 as the filesystem. 

```bash     
$ sudo vi /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0

# EDEN: Mount /dev/xvdb1 during bootup
UUID=b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1             ext4    defaults        1 1
```

Before we test this, we check again the block devices:

```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
```

### Restart 

As mentioned in the previous sections, we can use the `mount` command to mount the disks during runtime. This is also the recommended way because if there are issues in the `/etc/fstab`, we can immediately catch the error after running the `mount` command. 

But since we only added one entry in the `/etc/fstab` file, we'll proceed with the reboot. After restarting the instance, we see that all the mounted partitions are removed except for **xvdb**.

```bash
sudo reboot 
```
```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec
```

### `mount -a` 

We now know that the entry in `/etc/fstab` works. Let's now add the other partitions. 

```bash
$ ll /dev/disk/
total 0
drwxr-xr-x. 2 root root 220 Dec  6 11:05 by-partuuid
drwxr-xr-x. 2 root root 140 Dec  6 11:05 by-uuid

$ ll /dev/disk/by-uuid/
total 0
lrwxrwxrwx. 1 root root 11 Dec  6 11:05 52545136-5e0e-4022-86c0-7845250d5263 -> ../../xvdc1
lrwxrwxrwx. 1 root root 11 Dec  6 11:05 7d123d52-b4c3-4a03-b077-c03761f57d0e -> ../../xvdc2
lrwxrwxrwx. 1 root root 10 Dec  6 11:05 b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e -> ../../xvdb
lrwxrwxrwx. 1 root root 11 Dec  6 11:05 b8c13319-646e-4933-87e0-27bf530e04ec -> ../../xvdc3
lrwxrwxrwx. 1 root root 11 Dec  6 11:05 d35fe619-1d06-4ace-9fe3-169baad3e421 -> ../../xvda2
```
```bash 
$ sudo vi /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0
UUID=b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1             ext4    defaults        1 1
UUID=52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1             ext3    defaults        1 1
UUID=7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2             ext3    defaults        1 1
UUID=b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3             ext3    defaults        1 1
```

Before we test again, make sure only one disk is mounted.

```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec
```

This time, run the `mount -a` command and verify. This will scan the `/etc/fstab` and mount all filesystems for us instead of us manually mounting each partition. This is also especially useful when you cannot restart the server and you need to mount new disks.

```bash
sudo mount -a 
```
```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3 
```

This works. Now unmount the four partitions and verify that nothing is mounted.

```bash
sudo umount /mnt/diskb1 
sudo umount /mnt/diskc1
sudo umount /mnt/diskc2
sudo umount /mnt/diskc3
```
```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e 
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e 
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec 
```

Restart the instance once again and see if all the partitions are automatically mounted during bootup. This last step is optional. We just want to demonstrate here that if `mount -a` worked with no errors, then we shouldn't have any issues restarting the server.

```bash
sudo reboot 
```

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        7.7G     0  7.7G   0% /dev
tmpfs           7.8G     0  7.8G   0% /dev/shm
tmpfs           7.8G   17M  7.8G   1% /run
tmpfs           7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2       10G  2.8G  7.3G  28% /
/dev/xvdb        98G   61M   93G   1% /mnt/diskb1
/dev/xvdc3       34G   49M   32G   1% /mnt/diskc3
/dev/xvdc1       33G   49M   31G   1% /mnt/diskc1
/dev/xvdc2       33G   49M   31G   1% /mnt/diskc2
tmpfs           1.6G     0  1.6G   0% /run/user/1000
```
```bash
$ lsblk -f
NAME    FSTYPE LABEL UUID                                 MOUNTPOINT
xvda
├─xvda1
└─xvda2 xfs          d35fe619-1d06-4ace-9fe3-169baad3e421 /
xvdb    ext4         b3475d34-e9cb-4e8e-9ace-a1fdf7ed508e /mnt/diskb1
xvdc
├─xvdc1 ext3         52545136-5e0e-4022-86c0-7845250d5263 /mnt/diskc1
├─xvdc2 ext3         7d123d52-b4c3-4a03-b077-c03761f57d0e /mnt/diskc2
└─xvdc3 ext3         b8c13319-646e-4933-87e0-27bf530e04ec /mnt/diskc3
```
