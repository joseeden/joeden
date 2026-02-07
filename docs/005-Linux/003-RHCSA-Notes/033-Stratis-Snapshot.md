---
title: "Stratis Snapshots"
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 33
last_update:
  date: 12/31/2021
---



## Snapshots 

Stratis Snapshots are a feature that allows users to capture the state of a filesystem at a specific point in time. These snapshots provide a read-only view of the filesystem as it existed when the snapshot was taken. This capability is particularly useful for data protection, system rollback, and creating consistent backups without disrupting ongoing operations.

- Captures filesystem states instantly.
- Maintains data integrity by freezing filesystems.
- Saves space by sharing data blocks initially.

Features: 

- A snapshot is an individual file system that can be mounted. 
- After creation, snapshots can be modified.
- A snapshot and its origin are not linked.
- The snapshotted file system can live longer than the filesystem it was created from. 
- Each snapshot needs at least half a Gigabyte of backing storage for the XFS log.




## Creating a Snapshot

Creating snapshots is a crucial part of managing and backing up filesystems. Snapshots allow you to capture the state of a filesystem at a specific point in time, providing a reliable way to revert to a known good state if necessary. Stratis makes creating snapshots straightforward, helping ensure data integrity and availability.

First, list the existing filesystems in the Stratis pool to identify the filesystem you want to snapshot.

```bash
$ stratis filesystem
Pool Name   Name   Used      Created             Device                     UUID
mypool      myfs   545 MiB   Jan 02 2022 14:08   /dev/stratis/mypool/myfs   49e5d8a1-78e5-4fde-ad6d-b5692f697058
```

The `stratis filesystem snapshot` command requires the pool name, origin filesystem name, and the desired snapshot name. Running the command without parameters shows the usage.

```bash
$ stratis filesystem snapshot
usage: stratis filesystem snapshot [-h] pool_name origin_name snapshot_name
stratis filesystem snapshot: error: the following arguments are required: pool_name, origin_name, snapshot_name
```

Create a snapshot of the filesystem by specifying the pool name, origin filesystem name, and the snapshot name.

```bash
stratis filesystem snapshot mypool myfs myfs-snap
```

After creating the snapshot, list the filesystems again to verify the snapshot has been created.

```bash
$ stratis filesystem
Pool Name   Name        Used      Created             Device                          UUID
mypool      myfs-snap   545 MiB   Jan 02 2022 15:04   /dev/stratis/mypool/myfs-snap   84cba158-24c5-4679-9892-4b662ca72ac1
mypool      myfs        545 MiB   Jan 02 2022 14:08   /dev/stratis/mypool/myfs        49e5d8a1-78e5-4fde-ad6d-b5692f697058
```


## Mounting the Snapshot

Snapshots in Stratis can be treated as regular filesystems, meaning they can be mounted and accessed. This is useful for accessing the state of the filesystem at the time the snapshot was taken, allowing for data recovery and integrity checks.

Before mounting the snapshot, ensure the target mount directory exists and is empty.

```bash
$ ll /mnt/
total 0
drwxr-xr-x. 2 root root 6 Jan  2 14:08 diskfs
```

Create a sample file in the original filesystem to demonstrate the data present at the time of the snapshot.

```bash
$ cat > /mnt/diskfs/sample.txt
# EDEN: This file should be restored in case the filesystem gets corrupted
```

List the contents of the original filesystem to verify the sample file.

```bash
$ ll /mnt/diskfs
total 4
-rw-r--r--. 1 root root 62 Jan  2 15:13 sample.txt
```

Display the contents of the sample file to confirm its data.

```bash
$ cat /mnt/diskfs/sample.txt
# EDEN: This file should be restored in case the filesystem gets corrupted
```

Create a new directory to mount the snapshot.

```bash
mkdir /mnt/diskfs2
```

List the contents of the `/mnt` directory to ensure the new mount point is created.

```bash
$ ll /mnt/
total 0
drwxr-xr-x. 2 root root 6 Jan  2 14:08 diskfs
drwxr-xr-x. 2 root root 6 Jan  2 14:08 diskfs2
```

Mount the snapshot to the new mount point.

```bash
mount /dev/stratis/mypool/myfs-snap /mnt/diskfs2
```

Check the mounted filesystems to verify the snapshot is mounted.

```bash
$ mount | grep diskfs
/dev/mapper/stratis-1-1f2ae191f25d4715bf14e80448521775-thin-fs-5535567659734250a5c3b12d6c06b313 on /mnt/diskfs type xfs (rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=128k,sunit=256,swidth=2048,noquota,x-systemd.device-timeout=1ms)
/dev/mapper/stratis-1-1f2ae191f25d4715bf14e80448521775-thin-fs-143d3d0fdf47438a82e89547262ee0b3 on /mnt/diskfs2 type xfs (rw,relatime,seclabel,attr2,inode64,logbufs=8,logbsize=128k,sunit=256,swidth=2048,noquota)
```

Verify that the contents of the original filesystem and the snapshot are identical.

Original filesystem:

```bash
$ ll /mnt/diskfs
total 4
-rw-r--r--. 1 root root 68 Jan  2 15:42 sample.txt
```

Snapshot:

```bash
$ ll /mnt/diskfs2
total 4
-rw-r--r--. 1 root root 68 Jan  2 15:42 sample.txt
```

## Restoring from snapshot

Restoring from a snapshot is essential when the original filesystem is corrupted or needs to be rolled back to a previous state. Snapshots provide a point-in-time copy of the filesystem, allowing for reliable recovery without affecting the current state.

First, unmount the corrupted filesystem.

```bash
umount /mnt/diskfs
```

Remove the corrupted filesystem to prepare for restoration.

```bash
stratis filesystem destroy mypool myfs
```

Check the existing filesystems to ensure only the snapshot remains.

```bash
$ stratis filesystem
Pool Name   Name        Used      Created             Device                          UUID
mypool      myfs-snap   545 MiB   Jan 02 2022 15:43   /dev/stratis/mypool/myfs-snap   143d3d0f-df47-438a-82e8-9547262ee0b3
```

Confirm that the snapshot directory still contains the necessary files.

```bash
$ ll /mnt/diskfs2
total 4
-rw-r--r--. 1 root root 68 Jan  2 15:42 sample.txt
```

Ensure the original directory is empty after unmounting and destroying the corrupted filesystem.

```bash
$ ll /mnt/diskfs
total 0
```

To restore from the snapshot, recreate the filesystem from the snapshot.

```bash
stratis filesystem snapshot mypool myfs-snap myfs
```

Check the filesystems to confirm that the new filesystem has been created from the snapshot.

```bash
$ stratis filesystem
Pool Name   Name        Used      Created             Device                          UUID
mypool      myfs-snap   545 MiB   Jan 02 2022 15:43   /dev/stratis/mypool/myfs-snap   143d3d0f-df47-438a-82e8-9547262ee0b3
mypool      myfs        545 MiB   Jan 02 2022 15:48   /dev/stratis/mypool/myfs        4d75945e-b325-4e85-96fb-4a2ef0cb4908
```

Edit the `/etc/fstab` file to reflect the new UUID of the restored filesystem.

```bash
$ vim /etc/fstab

# OLD
# UUID="55355676-5973-4250-a5c3-b12d6c06b313"   /mnt/diskfs       xfs     nofail,x-systemd.device-timeout=1ms 0 0

# NEW
UUID=4d75945e-b325-4e85-96fb-4a2ef0cb4908       /mnt/diskfs       xfs     nofail,x-systemd.device-timeout=1ms 0 0
```

Reload the systemd daemon and mount all filesystems to apply the changes.

```bash
systemctl daemon-reload
mount -a
```

List the contents of the restored filesystem to ensure that the sample file is present.

```bash
$ ll /mnt/diskfs
total 4
-rw-r--r--. 1 root root 68 Jan  2 15:42 sample.txt
```

Also, verify the snapshot directory to confirm that the files match.

```bash
$ ll /mnt/diskfs2
total 4
-rw-r--r--. 1 root root 68 Jan  2 15:42 sample.txt
```

## Destroying the snapshot

When you no longer need a snapshot or want to reclaim storage space, you can delete it. However, it's crucial to ensure the snapshot is unmounted before proceeding to avoid potential issues with the deletion process.

Before deleting a snapshot, verify its current status and ensure it is not actively in use.

```bash
$ stratis fs
Pool Name   Name        Used      Created             Device                          UUID
mypool      myfs-snap   545 MiB   Jan 02 2022 15:43   /dev/stratis/mypool/myfs-snap   143d3d0f-df47-438a-82e8-9547262ee0b3
mypool      myfs        545 MiB   Jan 02 2022 15:48   /dev/stratis/mypool/myfs        4d75945e-b325-4e85-96fb-4a2ef0cb4908
```

Ensure the snapshot is not mounted on any system path.

```bash
umount /mnt/diskfs2
```

Once unmounted, proceed with deleting the snapshot.

```bash
stratis filesystem destroy mypool myfs-snap
```

Confirm that the snapshot has been successfully deleted.

```bash
$ stratis fs
Pool Name   Name   Used      Created             Device                     UUID
mypool      myfs   545 MiB   Jan 02 2022 15:48   /dev/stratis/mypool/myfs   4d75945e-b325-4e85-96fb-4a2ef0cb4908
```


## Cleaning up resources

This wraps up all the labs for Stratis. Follow the sequence below to ensures thorough cleanup of Stratis resources from your system.

Before deleting the pool and filesystems, verify their current state.

```bash
$ stratis fs
Pool Name   Name   Used      Created             Device                     UUID
mypool      myfs   545 MiB   Jan 02 2022 15:48   /dev/stratis/mypool/myfs   4d75945e-b325-4e85-96fb-4a2ef0cb4908
```

An attempt to destroy the pool directly may fail if there are still filesystems associated with it.

```bash
$ stratis pool destroy mypool
Execution failed:
stratisd failed to perform the operation that you requested. It returned the following information via the D-Bus: BUSY: Engine error: filesystems remaining on pool.
```

First, delete the filesystem within the pool.

```bash
stratis filesystem destroy mypool myfs
```

Confirm that all filesystems and the pool are successfully removed.

```bash
$ stratis fs
Pool Name   Name   Used   Created   Device   UUID
```

Now, successfully delete the pool once all associated filesystems have been removed.

```bash
stratis pool destroy mypool
```

Ensure that the pool no longer exists in the list of pools.

```bash
$ stratis pool list
Name   Total Physical   Properties   UUID
```

Finally, verify that the block devices reflect the removal of Stratis resources.

```bash
$ lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  10G  0 disk
├─xvda1 202:1    0   1M  0 part
└─xvda2 202:2    0  10G  0 part /
xvdb    202:16   0  10G  0 disk
```

