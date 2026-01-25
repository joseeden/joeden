---
title: Managing Partitions
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 29
last_update:
  date: 3/27/2021
---


## Tasks

1. In the remaining disks space on your server hard disk, add  a 1GiB paetition. 
2. Do this in such a way that it's possible to add more partitions later.
2. Format partition with ex4 file system and set label **Dbfiles** on the partition.
3. Mount this partition persistently on the directory /dbfiles, using partition label.

## Solution 


### 1. Add a 1GiB partition 

There are two steps here: 
   
- **Identify the remaining disk space:**

   Determine the available disk space and identify where you want to create the new partition. This typically involves using tools like `fdisk`, `parted`, or `gparted` to manage disk partitions.

   Let's assume you have identified an unallocated space on `/dev/sdb`.

- **Create a new partition:**

   Use `fdisk` or `parted` to create a new partition.

   ```bash
   sudo fdisk /dev/sdb
   ```

   Notes: 
   - Type `n` for a new partition.
   - Choose the default or specify the partition type (primary or extended).
   - Specify the partition size as 1GiB (e.g., `+1G`).
   - Write changes (`w`) and exit (`q`).


### 2. Format partition and set label

- **Format the partition with ext4:**

   Format the newly created partition `/dev/sdb1` with ext4 filesystem:

   ```bash
   sudo mkfs.ext4 /dev/sdb1
   ```

- **Set label on the partition:**

   Assign the label **Dbfiles** to the partition `/dev/sdb1` using `e2label` command:

   ```bash
   sudo e2label /dev/sdb1 Dbfiles
   ```


### 3. Configure persistent mounting

- **Create a mount point for the partition:**

   Create a directory where you want to mount the partition. In this case, create `/dbfiles`:

   ```bash
   sudo mkdir /dbfiles
   ```

- **Configure persistent mount using partition label:**

   Add an entry to `/etc/fstab` for persistent mounting. Edit `/etc/fstab` with your preferred text editor:

   ```bash
   sudo nano /etc/fstab
   ```

   Add the following line at the end of the file:

   ```fstab
   LABEL=Dbfiles  /dbfiles  ext4  defaults  0  2
   ```

   Notes: 

   - `LABEL=Dbfiles`: Mount by label **Dbfiles**.
   - `/dbfiles`: Mount point directory.
   - `ext4`: Filesystem type.
   - `defaults`: Mount options (default options).
   - `0 2`: Filesystem check order during boot (0 = skip, 2 = check after root filesystem).

- **Mount the partition persistently:**

   Mount all filesystems listed in `/etc/fstab`:

   ```bash
   sudo mount -a
   ```

- **Verify persistent mount:**

   Check if the partition `/dev/sdb1` is mounted on `/dbfiles`:

   ```bash
   df -h /dbfiles
   ```

