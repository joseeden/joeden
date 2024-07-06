---
title: "Encrypted Partitions"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 35
last_update:
  date: 12/31/2021
---

## Encrypted Partitions

Encrypting partitions ensures data security on your systems. By encrypting partitions, you protect sensitive data from unauthorized access. In this guide, we'll set up encrypted partitions using `dm_crypt`, a Linux kernel module that provides transparent encryption of block devices.

![](/img/docs/sv-luks.png)
![](/img/docs/sv-luks-2.png)

## Lab Setup 

I'm performing this lab on an EC2 instance with multiple EBS volumes attached. I also used this same setup for the Stratis and VDO labs. We'll specifically use the `/dev/xvdf` disk to test out partition encryption.

```bash
$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  10G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  10G  0 part /
xvdb    202:16   0  10G  0 disk
xvdf    202:16   0  10G  0 disk
```


## Steps to Encrypt Partitions

### 1. Compile System to Support Encryption

First, ensure your system supports encryption by checking if the `dm_crypt` module is compiled and loaded into your kernel.

Check the current kernel version:
```bash
$ uname -r

4.18.0-348.2.1.el8_5.x86_64
```

```bash
$ ll /boot/config-$(uname -r)

-rw-r--r--. 1 root root 193933 Nov  9 03:36 /boot/config-4.18.0-348.2.1.el8_5.x86_64
```

Check if `CONFIG_DM_CRYPT` is enabled in the kernel configuration:

```bash
$ grep -i config_dm_crypt /boot/config-$(uname -r)

CONFIG_DM_CRYPT=m
```

Check the status of loaded modules, specifically looking for `dm_crypt`:
```bash
$ lsmod | grep dm

dm_multipath           40960  0
dm_mirror              28672  0
dm_region_hash         20480  1 dm_mirror
dm_log                 20480  2 dm_region_hash,dm_mirror
dm_mod                151552  7 dm_multipath,dm_log,dm_mirror
```


If `dm_crypt` is not loaded, load it using `modprobe`:
```bash
modprobe dm_crypt
```

If `modprobe` fails due to permission issues, use `sudo`:
```bash
$ modprobe dm_crypt
modprobe: ERROR: could not insert 'dm_crypt': Operation not permitted
```
```bash 
sudo modprobe dm_crypt
```

Verify that `dm_crypt` is now loaded:
```bash
$ lsmod | grep dm_crypt

dm_crypt               49152  0
dm_mod                151552  8 dm_crypt,dm_multipath,dm_log,dm_mirror
```


### 2. Format Partition

Formatting a partition is a necessary step to prepare it for use. In this example, we'll create and format a new partition on `/dev/xvdf`.

```bash
$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  10G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  10G  0 part /
xvdb    202:16   0  10G  0 disk
xvdf    202:16   0  10G  0 disk
```

First, check the existing partition layout on `/dev/xvdf`:
```bash
$ sudo fdisk /dev/xvdf -l

Disk /dev/xvdf: 10 GiB, 10737418240 bytes, 20971520 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

Create a new partition on `/dev/xvdf` using `fdisk`:
```bash
sudo fdisk /dev/xvdf
```

Within the `fdisk` interface, follow these steps:

1. Create a new partition:
    - Press `n` to create a new partition.
    - Select `p` for primary partition (default).
    - Press `Enter` to accept the default partition number.
    - Press `Enter` to accept the default first sector.
    - Press `Enter` to accept the default last sector (uses the entire disk).

    ```bash
    Command (m for help): n
    Partition type
    p   primary (0 primary, 0 extended, 4 free)
    e   extended (container for logical partitions)
    Select (default p): p
    Partition number (1-4, default 1):
    First sector (2048-20971519, default 2048):
    Last sector, +sectors or +size{K,M,G,T,P} (2048-20971519, default 20971519):
    Created a new partition 1 of type 'Linux' and of size 10 GiB.
    ```

2. Verify the partition:

    ```bash
    Command (m for help): v
    ```

3. Write the changes to the disk:

    ```bash
    Command (m for help): w
    The partition table has been altered.
    Calling ioctl() to re-read partition table.
    Syncing disks.
    ```

### 3. Setup Partition Using `cryptsetup`

Encrypting a partition involves setting up **LUKS (Linux Unified Key Setup)** on the partition. Note that this process will overwrite any existing data on the partition. For this lab, we're using a 10GB disk.

First, install `cryptsetup`:
```bash
sudo yum install -y cryptsetup
```

Set up LUKS format for the partition using `cryptsetup`:
```bash
cryptsetup -y luksFormat /dev/xvdf1
```

If you encounter a permission error, use `sudo`:

```bash
$ cryptsetup -y luksFormat /dev/xvdf1
Device /dev/xvdf1 does not exist or access denied. 
```
```bash
sudo cryptsetup -y luksFormat /dev/xvdf1
```

You'll be prompted to confirm the operation and create a passphrase:

```bash
WARNING!
========
This will overwrite data on /dev/xvdf1 irrevocably.

Are you sure? (Type 'yes' in capital letters): YES
Enter passphrase for /dev/xvdf1:
Verify passphrase:
```

To verify the encryption details, you can read `/proc/crypto` (this will return a long output):

```bash
cat /proc/crypto
```    


### 4. Open Partition and Format

To access the encrypted partition, we need to open it and assign it a name. Then, we can format it with a filesystem.

Open the encrypted partition with `cryptsetup` and give it a name:
```bash
$ sudo cryptsetup luksOpen /dev/xvdf1 myencryption

Enter passphrase for /dev/xvdf1:
```

Format the opened partition. Note that you must use the name you assigned (in this case, `myencryption`):
```bash
sudo mkfs -t ext4 /dev/mapper/myencryption
```

Attempting to format the raw partition directly will result in an error:
```bash
sudo mkfs -t ext4 /dev/xvdf1
mke2fs 1.45.6 (20-Mar-2020)
/dev/xvdf1 contains a crypto_LUKS file system
Proceed anyway? (y,N) y
/dev/xvdf1 is apparently in use by the system; will not make a filesystem here!
```

### 5. Mount the Partition

After opening and formatting the encrypted partition, the next step is to mount it to a directory so that it can be used like any other filesystem. 

Create a mount directory and mount the encrypted partition to it:
```bash
sudo mkdir /mnt/diskencrypt
```

Verify the creation of the directory:
```bash
$ ll /mnt

total 4
drwxr-xr-x. 2 root root    6 Dec  6 06:08 diskb1
drwxr-xr-x. 2 root root    6 Dec  6 06:26 diskc1
drwxr-xr-x. 2 root root    6 Dec  6 06:26 diskc2
drwxr-xr-x. 2 root root    6 Dec  6 06:26 diskc3
drwxr-xr-x. 2 root root    6 Dec  7 14:04 diskencrypt
drwxr-xr-x. 3 root root 4096 Dec  6 13:22 disklvm
```

Mount the encrypted partition:

```bash
sudo mount /dev/mapper/myencryption /mnt/diskencrypt/
```

Check the mounted filesystems:

```bash
$ df -h

Filesystem                    Size  Used Avail Use% Mounted on
devtmpfs                      7.7G     0  7.7G   0% /dev
tmpfs                         7.8G     0  7.8G   0% /dev/shm
tmpfs                         7.8G   17M  7.8G   1% /run
tmpfs                         7.8G     0  7.8G   0% /sys/fs/cgroup
/dev/xvda2                     10G  2.8G  7.3G  28% /
tmpfs                         1.6G     0  1.6G   0% /run/user/1000
/dev/mapper/myvolumes-group1  196G   60M  186G   1% /mnt/disklvm
/dev/mapper/myencryption      9.8G   37M  9.3G   1% /mnt/diskencrypt
```

Nice. Disk is ready to use. 

To close it, unmount it first then use the cryptsetup tool.

```bash
sudo umount /mnt/diskencrypt/
sudo cryptsetup luksClose myencryption
```

### 6. Ready to Use

The real benefit of the encryption is that no one can simply access the files in the encrypted partition. To access the file, you must do the following steps.

1. Open the disk using **cryptsetup**.
2. Mount the partition to the mountpoint.
3. Once you're done, unmount the partition.
4. Close the disk using **cryptsetup**.

For example, initially, the directory `/mnt/diskencrypt` is empty:

```bash
$ ll /mnt/
total 4
drwxr-xr-x. 2 root root    6 Dec  6 06:08 diskb1
drwxr-xr-x. 2 root root    6 Dec  6 06:26 diskc1
drwxr-xr-x. 2 root root    6 Dec  6 06:26 diskc2
drwxr-xr-x. 2 root root    6 Dec  6 06:26 diskc3
drwxr-xr-x. 2 root root    6 Dec  7 14:04 diskencrypt
drwxr-xr-x. 3 root root 4096 Dec  6 13:22 disklvm

$ ll /mnt/diskencrypt/
total 0
```

Open the encrypted partition and mount it:

```bash
$ sudo cryptsetup luksOpen /dev/xvdf1 myencryption
Enter passphrase for /dev/xvdf1:
```
```bash
sudo mount /dev/mapper/myencryption /mnt/diskencrypt/
```

Create a file inside the mounted directory:

```bash
cd /mnt/diskencrypt/
sudo touch treadstonefile
```

Verify the file creation:
```bash
$ ll
total 16
drwx------. 2 root root 16384 Dec  7 14:01 lost+found
-rw-r--r--. 1 root root     0 Dec  7 14:20 treadstonefile
```

Go back one directory and unmount and close the encrypted partition:
```bash
cd ..
sudo umount /mnt/diskencrypt/
sudo cryptsetup luksClose myencryption
```

Attempting to access the encrypted partition without opening it will result in an error:

```bash
$ sudo mount /dev/xvdf1 /mnt/diskencrypt/
mount: /mnt/diskencrypt: unknown filesystem type 'crypto_LUKS'.
```
```bash
$ sudo mount /dev/xvdf1 /mnt/diskb1
mount: /mnt/diskb1: unknown filesystem type 'crypto_LUKS'.
```
```bash
$ sudo mount /dev/xvdf1 /mnt/diskc1
mount: /mnt/diskc1: unknown filesystem type 'crypto_LUKS'.
```
```bash
$ sudo mount /dev/xvdf1 /mnt/disklvm
mount: /mnt/disklvm: unknown filesystem type 'crypto_LUKS'.
```