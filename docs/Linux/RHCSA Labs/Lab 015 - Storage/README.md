---
title: 015 - Storage
tags: [Linux, Red Hat, Certifications]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---


## Tasks

Note: You will need an additional 10GiB additional ahrddisk on your virtual machine. This will be divided into three parts

Part 1:

1. Create a primary partition with a size of 1GiB. 
2. Format it with **ext4**.
3. Mount it persistently on /mount/files, using its UUID.

Part 2:

4. Create an extended partition that covers all remaining disk spaces.
5. On the extended partition, create a 500MiB xfs partition.
6. Mount it persistently on /mount/xfs using label **myxfs**.

Part 3:

7. Create a 500MiB swap partition.
8. Mount it persistently.

## Solution 

### Part 1

You can use tools like `fdisk` or `parted` to create the partition. Here, we'll use `fdisk` for the example.

```sh
sudo fdisk /dev/sdb
```

Note: 

- Type `n` for a new partition.
- Choose `p` for a primary partition.
- Specify the size (e.g., `+1G`).
- Type `w` to write changes.

Format the partition with ext4:

```sh
sudo mkfs.ext4 /dev/sdb1
```

Find the UUID of the partition:

```sh
sudo blkid /dev/sdb1
```

Note down the UUID that is displayed.
Create a mount point and modify the /etc/fstab to persistently mount it.

```sh
sudo mkdir -p /mount/files
sudo nano /etc/fstab
```

Add the following line to `/etc/fstab`, replacing `<UUID>` with the UUID obtained in step 3:

```sh
UUID=<UUID> /mount/files ext4 defaults 0 0
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`). Mount the partition:

```sh
sudo mount -a
```

Verify.

```bash
lsblk -f 
```

### Part 2

Use `fdisk` or `parted` similarly as in Part 1, but create an extended partition that spans the remaining disk space (`/dev/sdb2`).

Use `fdisk` to create a logical 500MiB xfs partition inside the extended partition (`/dev/sdb5` in this example):

```sh
sudo fdisk /dev/sdb
```

Note: 

- Type `n` for a new partition.
- Choose `e` for an extended partition.
- Use the default start and end values to use all remaining space.
- Type `n` again for a new logical partition.
- Specify the size (e.g., `+500M`).
- Choose `t` to change the partition type to `83` (Linux filesystem).
- Type `w` to write changes.

Format the xfs partition:

```sh
sudo mkfs.xfs /dev/sdb5 -L myxfs
```

Create a mount point and mount the xfs partition persistently:

```sh
sudo mkdir -p /mount/xfs
sudo nano /etc/fstab
```

Add the following line to `/etc/fstab`:

```sh
LABEL=myxfs /mount/xfs xfs defaults 0 0
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`). Mount the partition:

```sh
sudo mount -a
```

Verify.

```bash
lsblk -f 
```



### Part 3

Use `fdisk` or `parted` to create a 500MiB swap partition (`/dev/sdb6` in this example):

```sh
sudo fdisk /dev/sdb
```

Note: 

- Type `n` for a new partition.
- Choose `p` for a primary partition.
- Specify the size (e.g., `+500M`).
- Choose `t` to change the partition type to `82` (Linux swap).
- Type `w` to write changes.

Format the swap partition:

```sh
sudo mkswap /dev/sdb6
```

Enable the swap partition:

```sh
sudo swapon /dev/sdb6
```

Make the swap partition persistent by editing the `/etc/fstab` again:

```sh
sudo nano /etc/fstab
```

Add the following line:

```sh
/dev/sdb6 none swap defaults 0 0
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`).

Verify.

```bash
lsblk -f 
```

