---
title: Practice Test 10
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->


## Lab 01 - Resizing Partitions

**Tasks:**

Resize the lvm size to 200M the mount point is “/sbi” and remember that lv size must in
between 180M to 220M.

Note:
- First look the size of the LV if it is more than 200M then LV must be reduce in between 180-220M and if LV size is less than 200M then LV must be extend such that 
- Example: given LV size + value that should require to extend the lv 
- Example: given LV is 100M and we should be extend by 200M then 100+100=200M

<details>
  <summary> **Solution** </summary>


If LV size=100M, extend it to 200M by adding 100:

```bash
# FIrst make sure that there's another disk that's a member of the volume. If there's none, you may need to create a new partition called '/dev/xxx' and then run the 'vgextend'
lsblk 
lsblk -f
umount /sbi 
vgextend vgname /dev/xxx
vgs
lvextend /dev/vgname/lvname -r -L +100M
lvs 
mount -a 
```

If LV size=400M, reduce it to 180M:

```bash
# Note that xfs doesn't support shrinking of volume, only ext4
lsblk 
lsblk -f 

umount /mnt/xxx 
resize2fs /dev/vgname/lvname 180M
e2fsck -f /dev/vgname/lvname 
resize2fs /dev/vgname/lvname 180M
lvreduce -L 180M /dev/vgname/lvname 
vim /etc/fstab
mount -a 
lsblk
lsblk -f
```


</details>


## Lab 02 - Tuned 

**Tasks:**

Set a tuned profile as recommended.

<details>
  <summary> **Solution** </summary>


```bash
sudo su -
tuned 
tuned-adm recommend
tuned-adm profile virtual-guest 
tuned-adm active
```
 

</details>


## Lab 03 - VDO

**Tasks:**

Create a logical vdo name “lvdo” on /dev/vxy on the size of 100GB
NOTE: VDO always done at unpartitioned disk.


<details>
  <summary> **Solution** </summary>

```bash
sudo su - 
# check first if vdo is intall, if not, install it.
systemctl status 
yum install -y vdo
```
```bash
# if vdo is already installed, proceed here.
vdo create --name=lvdo --device=/dev/vxy --vdoLogicalSize=100G
mkfs.xfs -K /dev/mapper/lvdo
udevadm settle 
lsblk 
lsblk -f

mkdir -p /mnt/vdomount 
vim /etc/fstab
  UUID="XXXXXXXXXXXX"   /mnt/vdomount   xfs   x-systemd.requires=vdo.service    0 0
mount -a
lsblk
```


</details>


## Lab 04 - Autofs

**Tasks:**

Configure the autofs automatically mount to the home directory of LDAP, as required:
- idp.platform.com use NFS to share the home to your system. 
- This file system contains a preconfigured home directory of user "ldapdev".
- Home directory of ldapdev is: idp.platform.com/home/guests/ldapuser.
- Home directory of ldapdev should automatically mount to the ldapdev of the local /home/guests.
- Home directory’s write permissions must be available for users.
- ldapdev’s password is "P@$$w0rdabc123.

<details>
  <summary> **Solution** </summary>


```bash
sudo su -
systemctl status autofs
yum install -y autofs
systemctl enable --now 
ll /etc/auto*

cd /etc
vim auto.master
	/home/guests	/etc/auto.ldap
cp auto.misc auto.ldap
vim auto.ldap
	ldapdev	-fstype=nfs,rw	idp.platform.com:/home/guests/ldapuser

#restart
systemctl restart autofs
systemctl status autofs

#verify
su - ldapdev
```
 

</details>


## Lab 05 - Swap

**Tasks:**

1. Add a swap partition.
2. Adding an extra 500M swap partition to your system, this swap partition should mount automatically when the system starts up. 
3. Don't remove and modify the existing swap partitions on your system.

<details>
  <summary> **Solution** </summary>


```bash
lsblk 
lsblk -f
fdisk -cu /dev/xxx
n > p > first > last +500M
t > partitionnumber > L > 8e
v > w

mkswap /dev/xxx1
mkdir /mnt/swapdir
vim /etc/fstab
	/dev/xxx1	swap	swap	defaults	0 0
mount -a
lsblk
swapon -a
lsblk -f
free -m
```

</details>


## Lab 06 - LVM

**Tasks:**

Create a new logical volume as required:
- 1G LVM 
- Name the logical volume as "mongodb", 
- Belongs to datastore of the volume group, 
- Size is 50 PE.
- Expansion size of each volume in volume group datastore is 16MB.
- Use ext3 to format this new logical volume, 
- This logical volume should automatically mount to /mnt/mongodb


<details>
  <summary> **Solution** </summary>


```bash
# always check first
lsblk
lsblk -f
sudo su -

# create partition
fdisk -cu /dev/xxx
n > p/e > first > +1G
t > pnum > L > 8e
v > w

# create pv, vg, lv 
pvcreate /dev/xxx1
pvs
vgcreate datastore /dev/xxx1 -s 16M
vgs
lvcreate -l 50 -n mongodb datastore
lvs

# load filesystem
mkfs.ext3 /dev/datastore/mongodb

# create directory and mount persistently
mkdir /mnt/mongodb
vim /etc/fstab
	/dev/datastore/mongodb	/mnt/mongodb	ext3	defaults		0 0
	:wq!
mount -a
mount | grep datastore
lsblk
lsblk -f
df -Th
```
 

</details>