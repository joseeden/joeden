---
title: Practice Test 07
tags: 
- Linux
- Red Hat
- Certifications
sidebar_position: 1
last_update:
  date: 4/22/2021
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




## Lab 02 - Reset Password

**Tasks:**

Reset a serverb password as Account5.and all user should have a password Redhat.

<details>
  <summary> **Solution** </summary>

```bash
sudo su -
reboot 
e
rd.break
mount -o remount,rw /sysroot
chroot /sysroot
passwd root
  redhat 
  redhat
touch /.autorelabel 
exit 
```
 

</details>


## Lab 03 - NTP

**Tasks:**

Configure a NTP server as platform.opsteam.com

<details>
  <summary> **Solution** </summary>

```bash
sudo su -
timedatectl
vim /etc/chrony.conf
  platform.opsteam.com
  :wq!

systemctl enable --now chronyd
systemctl restart chronyd
systemctl status chronyd
timedatectl 
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


## Lab 07 - Volumes

**Tasks:**

1. Create a volume group named "vg1" and set 16M as a extends.
2. Divide the volume group which has  50 extends on volume group lv.
3. Format it as ext4 file system and mount it automatically under /mnt/data.
 
```bash
# There's two partitions that needs to be combined into one VG actually:  /dev/sdb   /dev/sdc  
# Still needs to determine if wee're to combine partitions or the empty drives

lsblk -pfs 
mkdir /mnt/data

pvcreate /dev/sdb 
vgcreate -s 16M vg1 /dev/sdb 
lvcreate -l 50 -n lv vg1 
lsblk

mkfs.ext4 /dev/vg1/lv 
lsblk -f 

vim /etc/fstab
/dev/vg1/lv   /mnt/data   ext4    defaults    0   0

mount -a
lsblk

umount -a 
lsblk 
lsblk -f 

mount -a 
lsblk 
lsblk pfs 
```

## Lab 08 - Upgrading the Kernel

**Tasks:**

1. Upgrade the kernel to 3.6.24.1.5, and configure the system to Start the default kernel.
2. Make sure to keep the old kernel available.

<details>
  <summary> **Solution** </summary>

```bash
# Check kernel version 
uname -r 
yum update kernel 
uname -r 

# if kernel is still not updated to new version 
sudo yum install  -y kernel 

# then check 
grubby --default-kernel
grubby --info=ALL | grep kernel 
# then get the path for the new kernel 

# then set the new default kernel
grubby --set-default /path/to/new/kernel 
```


</details>

## Lab 09 - Adjusting an LVM

**Tasks:**

1. You need to adjust the size of an existing logical volume.
2. Set the file system size to 290M and ensure that the content is complete.
3. The partition size range 270M to 320M is acceptable.


<details>
  <summary> **Solution** </summary>


```bash
# THIS IS NO EXTEND 
sudo su -
lsblk

# assume we're using /dev/vo/lo, and mounted to /mnt/data
umount /mnt/data
lvresize -rL 290M /dev/vo/lo
lsblk

# re-mount and verify
mount -a
lsblk
```

</details>


## Lab 10 - Shared Directory


**Tasks:**

1. Create a shared directory /home/devteama.
2. The /home/devteama belongs to group devadmins.
3. This directory can be read and written by members of group devadmins. 
4, Any files created in /home/devteama group should automatically set devadmins as the owner

<details>
  <summary> **Solution** </summary>

```bash
sudo su -
grep devadmins. /etc/group

# if group doesnt exist
groupadd devadmins.

mkdir /home/devteama
cd /home 
chown :devadmins. admins 
chmod 2770 admins
```


</details>
