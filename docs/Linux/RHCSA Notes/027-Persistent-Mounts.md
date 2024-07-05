---
title: "Persistent Mounts"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 27
last_update:
  date: 11/29/2021
---

Before we go to mounting the disks persistently, we need to know about these two things:

- Non-Superuser Mounts
- UUID

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


## Systemd Mounts

Systemd provides a mechanism for managing filesystem mounts through systemd mount units. These units are configurations that specify how and where a filesystem should be mounted during the system boot process or on demand. Systemd mount units offer a more flexible options for handling dependencies, automounting, and monitoring. They are particularly useful in environments where dynamic management of mounts is required, such as with network filesystems or removable media.

![](/img/docs/sv-systemd-mounts.png)

### Systemd mount units

Here's an example of how you can define a systemd mount unit:

```bash
[root@tst-rhel ~]# systemctl cat tmp.mount

[Unit]
Description=Temporary Directory (/tmp)
Documentation=man:hier(7)
Documentation=https://www.freedesktop.org/wiki/Software/systemd/APIFileSystems
ConditionPathIsSymbolicLink=!/tmp
DefaultDependencies=no
Conflicts=umount.target
Before=local-fs.target umount.target
After=swap.target

[Mount]
What=tmpfs
Where=/tmp
Type=tmpfs
Options=mode=1777,strictatime,nosuid,nodev

# Make 'systemctl enable tmp.mount' work:
[Install]
WantedBy=local-fs.target
```

Check the status:

```bash
[root@tst-rhel ~]# systemctl status tmp.mount
● tmp.mount - Temporary Directory (/tmp)
   Loaded: loaded (/usr/lib/systemd/system/tmp.mount; disabled; vendor preset: disabled)
   Active: inactive (dead)
    Where: /tmp
     What: tmpfs
     Docs: man:hier(7)
           https://www.freedesktop.org/wiki/Software/systemd/APIFileSystems
```

Enable it: 

```bash
[root@tst-rhel ~]# systemctl enable --now tmp.mount
Created symlink /etc/systemd/system/local-fs.target.wants/tmp.mount → /usr/lib/systemd/system/tmp.mount.
```

Checking the status again, we see that the `tmp.mount` is mounted using systemd:

```bash
[root@tst-rhel ~]# systemctl status tmp.mount
● tmp.mount - Temporary Directory (/tmp)
   Loaded: loaded (/usr/lib/systemd/system/tmp.mount; enabled; vendor preset: disabled)
   Active: active (mounted) since Fri 2021-12-31 00:02:29 +08; 2min 24s ago
    Where: /tmp
     What: tmpfs
     Docs: man:hier(7)
           https://www.freedesktop.org/wiki/Software/systemd/APIFileSystems
    Tasks: 0 (limit: 100840)
   Memory: 4.0K
   CGroup: /system.slice/tmp.mount

Dec 31 00:02:29 tst-rhel systemd[1]: Mounting Temporary Directory (/tmp)...
Dec 31 00:02:29 tst-rhel systemd[1]: Mounted Temporary Directory (/tmp).
```

We can also confirm that the `tmp.mount` is mounted by running the `mount` command:

```bash
[root@tst-rhel ~]# mount | grep tmp
devtmpfs on /dev type devtmpfs (rw,nosuid,seclabel,size=8067292k,nr_inodes=2016823,mode=755)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev,seclabel)
tmpfs on /run type tmpfs (rw,nosuid,nodev,seclabel,mode=755)
tmpfs on /sys/fs/cgroup type tmpfs (ro,nosuid,nodev,noexec,seclabel,mode=755)
tmpfs on /run/user/1000 type tmpfs (rw,nosuid,nodev,relatime,seclabel,size=1620980k,mode=700,uid=1000,gid=1000)
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,seclabel)
```

### Mounting a partition

Now that we understand how systemd mount works, we'll unmount /dev/xvdb1 and remove it's entry in /etc/fstab.

```bash
[root@tst-rhel ~]# lsblk -a
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0    5G  0 disk
└─xvdb1 202:17   0 1023M  0 part /mnt/diskb1
xvdc    202:32   0   25G  0 disk
└─xvdc1 202:33   0   25G  0 part
```

Unmount the partition and verify that it's removed. 

```bash 
[root@tst-rhel ~]# umount /mnt/diskb1
[root@tst-rhel ~]# lsblk -a
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   50G  0 disk
├─xvda1 202:1    0    1M  0 part
└─xvda2 202:2    0   50G  0 part /
xvdb    202:16   0    5G  0 disk
└─xvdb1 202:17   0 1023M  0 part
xvdc    202:32   0   25G  0 disk
└─xvdc1 202:33   0   25G  0 part
```

Remove the entry from `/etc/fstab`: 

```bash
[root@tst-rhel ~]# vim /etc/fstab

UUID=d35fe619-1d06-4ace-9fe3-169baad3e421 /                       xfs     defaults        0 0
UUID=e6bcc068-628c-4555-b06e-9cda9563cf8c swap                    swap    defaults        0 0
```

Create a mount file for /dev/xvdb1 by simply copying the existing `tmp.mount` to the appropriate directory  `/etc/systemd/system/` and editing it. Notice that we named the mount file **mnt-diskb1.mount**. This is because the mount point is `/mnt/diskb1`. If mount point is only `diskb1`, then the mount file should be `diskb1.mount`.

```bash
cp /usr/lib/systemd/system/tmp.mount  /etc/systemd/system/mnt-diskb1.mount
```
```bash
[root@tst-rhel ~]# vim /etc/systemd/system/mnt-diskb1.mount

[Unit]
Description=Section B
Documentation=man:hier(7)
Conflicts=umount.target
Before=local-fs.target umount.target

[Mount]
What=LABEL='Section-B'
Where=/mnt/diskb1
Type=ext4
Options=defaults

# Make 'systemctl enable tmp.mount' work:
[Install]
WantedBy=local-fs.target
```

Afterwards, reload the daemon and then check the status. Notice in the **Loaded** line, it uses the mount file:

```bash
[root@tst-rhel ~]# systemctl daemon-reload
[root@tst-rhel ~]# systemctl status mnt-diskb1.mount
● mnt-diskb1.mount - Section B
   Loaded: loaded (/etc/systemd/system/mnt-diskb1.mount; static; vendor preset: disabled)
   Active: inactive (dead)
    Where: /mnt/diskb1
     What: LABEL='Section-B'
     Docs: man:hier(7)

Dec 30 23:31:20 tst-rhel systemd[1]: mnt-diskb1.mount: Succeeded.
Dec 30 23:46:24 tst-rhel systemd[1]: mnt-diskb1.mount: Succeeded.
Dec 31 00:08:41 tst-rhel systemd[1]: mnt-diskb1.mount: Succeeded.
```

Enable the unit. Disregard the warning message for now. Check the status again.

```bash
[root@tst-rhel ~]# systemctl enable --now mnt-diskb1.mount

The unit files have no installation config (WantedBy, RequiredBy, Also, Alias
settings in the [Install] section, and DefaultInstance for template units).
This means they are not meant to be enabled using systemctl.
Possible reasons for having this kind of units are:
1) A unit may be statically enabled by being symlinked from another unit's
   .wants/ or .requires/ directory.
2) A unit's purpose may be to act as a helper for some other unit which has
   a requirement dependency on it.
3) A unit may be started when needed via activation (socket, path, timer,
   D-Bus, udev, scripted systemctl call, ...).
4) In case of template units, the unit is meant to be enabled with some
   instance name specified.
```

```BASH 
[root@tst-rhel ~]# systemctl status mnt-diskb1.mount

● mnt-diskb1.mount - Section B
   Loaded: loaded (/etc/systemd/system/mnt-diskb1.mount; static; vendor preset: disabled)
   Active: active (mounted) since Fri 2021-12-31 00:33:38 +08; 13s ago
    Where: /mnt/diskb1
     What: /dev/xvdb1
     Docs: man:hier(7)
    Tasks: 0 (limit: 100840)
   Memory: 32.0K
   CGroup: /system.slice/mnt-diskb1.mount

Dec 31 00:33:37 tst-rhel systemd[1]: Mounting Section B...
Dec 31 00:33:38 tst-rhel systemd[1]: Mounted Section B.
```
