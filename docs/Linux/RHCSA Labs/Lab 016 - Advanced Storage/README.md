---
title: 016 - Advanced Storage
tags: [Linux, Red Hat, Certifications, Labs]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---

## Tasks

Note: You will need an additional 10GiB additional ahrddisk on your virtual machine. This will be divided into three parts

Part 1

1. Create an LVM with the name **lvdb** with a size of 1GiB.
2. Create the VG and PV.
3. Format the LV with xfs file system.
4. Mount it on /mounts/lvdb.

Part 2

5. Create a 10TiB thin provisioning volume.

Part 3

6. Create a 1GiB LUKX encrypted volume with the name **secret**.
7. Mount it persistently but not automatically on /mounts/secret.


## Solution

### Part 1

Create a physical volume (PV) on the disk (/dev/sdb in this example):

```sh
sudo pvcreate /dev/sdb
```

Create a volume group (VG) named `vgdb`:

```sh
sudo vgcreate vgdb /dev/sdb
```

Create a logical volume (LV) named `lvdb` with a size of 1GiB:

```sh
sudo lvcreate -L 1G -n lvdb vgdb
```

Format the logical volume with xfs file system:

```sh
sudo mkfs.xfs /dev/vgdb/lvdb
```

Create a mount point and mount the LV persistently:

```sh
sudo mkdir -p /mounts/lvdb
sudo nano /etc/fstab
```

Add the following line to `/etc/fstab` to mount the LV persistently:

```sh
/dev/vgdb/lvdb /mounts/lvdb xfs defaults 0 0
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`). Mount the LV:

```sh
sudo mount -a
```

### Part 2

Create a logical volume (LV) with thin provisioning:

```sh
sudo lvcreate -L 10T -V 10T --thinpool vgdb/thinpool
```

This creates a thin provisioning logical volume of 10TiB size named `thinpool` in the `vgdb` volume group.


### Part 3

Create a LUKS encrypted volume. Follow the prompts to set a passphrase for encryption.

```sh
sudo cryptsetup luksFormat /dev/sdb1
```

Open the encrypted volume:

```sh
sudo cryptsetup luksOpen /dev/sdb1 secret
```

Format the encrypted volume with a file system (e.g., ext4):

```sh
sudo mkfs.ext4 /dev/mapper/secret
```

Create a mount point and mount the encrypted volume persistently but not automatically:

```sh
sudo mkdir -p /mounts/secret
sudo nano /etc/crypttab
```

Add the following line to `/etc/crypttab` to configure the encrypted volume:

```sh
secret /dev/sdb1 none luks
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`).
Edit `/etc/fstab` to add the mount point:

```sh
sudo nano /etc/fstab
```

Add the following line to `/etc/fstab` to mount the encrypted volume persistently:

```sh
/dev/mapper/secret /mounts/secret ext4 defaults 0 0
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`).
