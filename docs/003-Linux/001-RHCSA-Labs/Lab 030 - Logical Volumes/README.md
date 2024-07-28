---
title: Logical Volumes
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 30
last_update:
  date: 2/27/2022
---

## Tasks

1. Create a 2 GiB LVM with name **vgdata**.
2. In this volume group, create a 1 GiB logical volume named **lvdata**.
3. Format it with xfs file system and mount it persistently on /lvdata.
4. Reboot and check.
5. Add another 500MiB to the created xfs file system.

## Solution

### 1. Create a 2 GiB LVM 

Assuming you have an additional disk or partition available (e.g., `/dev/sdc`), create a physical volume:

```bash
sudo pvcreate /dev/sdc
```

Create a volume group named `vgdata` using the physical volume `/dev/sdc`:

```bash
sudo vgcreate vgdata /dev/sdc
```

### 2. Create a 1 GiB Logical Volume

Create a logical volume `lvdata` with a size of 1 GiB within the `vgdata` volume group:

```bash
sudo lvcreate -L 1G -n lvdata vgdata
```


### 3. Format and mount persistently 

Format the logical volume `lvdata` with XFS filesystem:

```bash
sudo mkfs.xfs /dev/vgdata/lvdata
```

Create a mount point `/lvdata`:

```bash
sudo mkdir /lvdata
```

Add an entry to `/etc/fstab` for persistent mounting. Edit `/etc/fstab`:

```bash
sudo nano /etc/fstab
```

Add the following line:

```fstab
/dev/vgdata/lvdata  /lvdata  xfs  defaults  0  0
```

Mount all filesystems listed in `/etc/fstab`:

```bash
sudo mount -a
```

Check if `/lvdata` is mounted:

```bash
df -h /lvdata
```


### 4. Reboot and Verify

Reboot the system:

```bash
sudo reboot
```

After rebooting, check if `/lvdata` is still mounted and accessible:

```bash
df -h /lvdata
```


### 5. Add another 500MiB 

You can extend an XFS filesystem while it's mounted:

```bash
sudo lvextend -L +500M /dev/vgdata/lvdata
```

Resize the XFS filesystem to utilize the additional space:

```bash
sudo xfs_growfs /dev/vgdata/lvdata
```