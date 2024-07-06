---
title: Practice Test 04
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->


## Lab 01 - Grep 

**Tasks:**

Find out the list of all users in the /etc/passwd file who have not been assigned a “/bin/bash” shell. Save this list in a file named /tmp/non_bash_user_list.txt. This list should be alphabetically arranged from z-a.

<details>
  <summary> **Solution** </summary>

Use grep:

```bash
grep -v "/bin/bash$" /etc/passwd | sort > /tmp/non_bash_user_list.txt
```


</details>







## Lab 02 - Users

**Tasks:**

Create a user named James with UID of 3151 and default login shell as “/bin/ksh” This user’s password should e set to "P@$$w0rdabc123"

<details>
  <summary> **Solution** </summary>

```bash
useradd -s /bin/ksh -u 3151 James
echo 'P@$$w0rdabc123' | passwd --stdin James
```


</details>



## Lab 03 - Cron

**Tasks:**

Setup a cron job for user James to execute a command /bin/echo “Hi How are you” at 1:20 PM on January 18, 2012.

<details>
  <summary> **Solution** </summary>

```bash
#Cron isn't really not suited with this scenario, better to use atd
# need to install atd first to run AT
# create script 'test.sh' which will contain command 
vim test.sh
  #!/bin/bash
  logger -p notice 'Hi How are you'

# Give execute permissions
chmod +x test.sh

# Schedule time
at -f /root/test.sh 13:20 01/18/2012
```

</details>



## Lab 04 - Users, Groups, and Permissions

**Tasks:**

Download a file named budget.xlxs from the ftp server 172.35.10.200. The ftp server is configured as an anonymous FTP server. The file has been kept inside /finance directory of the ftp server. When you download the file, keep it in the /tmp directory with a name of budget-draft.xlxs. Set up the permissions and ownership on this file as follows.

1. Owner of file: Ted
2. All users from the “finance” group should be able to read and write to this file.
3. User named “Ronald” should not be able to modify any contents of this file even if he is a member of “finance” group.

<details>
  <summary> **Solution** </summary>

Get the file. 

```bash
ftp 172.35.10.200
cd pub
ls
get budget.xlxs
exit
ll
cp budget.xlxs /tmp/budget-draft.xlxs
ll /tmp/budget-draft.xlxs
```

Set the permissions. 

```bash 
chown ted:finance /tmp/budget-draft.xlxs
ll /tmp/budget-draft.xlxs
chmod 660 /tmp/budget-draft.xlxs
ll /tmp/budget-draft.xlxs

#restrict write acces for ronald
grep '^sales' /etc/group
id ronald
setfacl -m u:uid:r budget-draft.xlxs

# test
grep '^finance' /etc/group
su - member1
vim budget-draft.xlxs
su - ronald
vim budget-draft.xlxs
```

</details>



## Lab 05 - Permissions

**Tasks:**

Create a directory named /PLATFORM. This directory should be owned by root. Set up this directory in such a way that:

1. Any member of group “platform” should be able to create files in this directory.
2. Any member of the “platform” group should not be able to delete any file other that the files created by him/her in this directory.
3. Members are Ted, John, Tim, Jim.

<details>
  <summary> **Solution** </summary>


```bash
mkdir /PLATFORM
ll

# get gid
grep '^sales' /etc/group

# change ownership
chown root:platform /PLATFORM
chmod 3770 /PLATFORM
ll /

# using root, create a file in the directory
touch /PLATFORM/root.txt

# test using Ted
grep '^sales' /etc/group
su - ted 
touch /PLATFORM/Ted1.txt
touch /PLATFORM/Ted2.txt
rm -f /PLATFORM/Ted1.txt
rm -f /PLATFORM/root.txt

# test using other members john, jim, tim
su - john
touch /PLATFORM/john1.txt
touch /PLATFORM/john2.txt
ll /PLATFORM
rm -f /PLATFORM/john1.txt
ll /PLATFORM
rm -f /PLATFORM/root.txt

su - jim
touch /PLATFORM/jim1.txt
touch /PLATFORM/jim2.txt
ll /PLATFORM/
rm -f /PLATFORM/jim1.txt
rm -f /PLATFORM/root.txt
rm -f /PLATFORM/john2.txt
m -f /PLATFORM/Ted2.txt
ll /PLATFORM
```

</details>


## Lab 06 - Storage   

**Tasks:**

You've asked to plan for the future disk space requirement of your server. As a first step towards this task, you are required to find out the following information about your server. Please run appropriate commands to gather the information.

- Names of the disks attached to your server.
- What are their sizes?
- How much of free space is left on each disk?

You are also required to find out the following.
- Names of the partitions, their sizes and their mount points?
- How much of free space is left in each partition?
- Which of these partitions can be resized, if necessary?

<details>
  <summary> **Solution** </summary>

```bash
lsblk
blkid
df -h
lsblk 
```


</details>

## Lab 07 - LVM

**Tasks:**

Is LVM implemented for any of the partitions. If yes, find out the following information.

- Physical Volumes
  - Names of all Physical volumes
  - Sizes of all Physical volumes
- Volume Groups
  - Names of all Volume groups
  - Sizes of all Volume groups
  - Size of the physical extent of each volume group.
  - How many physical extents are present in each volume group.
  - How much of free space is left in each Volume Group
  - How many extents are free in each volume group
- Logical Volume
  -  Names of all LVs and the VG that they belong to
  - Sizes of all Logical volumes
  - Mount points for each Logical volume, if mounted

<details>
  <summary> **Solution** </summary>

```bash
pvs
pvdisplay

vgs
vgdisplay

lvs
lvdisplay
lsblk
```

</details>


## Lab 08 - Swap 

**Tasks:**

You have recently deployed a new web application on your Red Hat server. You have realized that the memory requirement of this web application is high. You, therefore, have decided to increase the swap space to take care of this issue. In such a situation, configure your server to have additional swap space of 500 MB. This additional swap should be made available to the system when the server reboots.

<details>
  <summary> **Solution** </summary>


```bash
# check devices
lsblk

# create partition on the available device
sudo fdisk /dev/xxx
n > p > enter 
first sector: default
last sector: +500M

# change type to swap
t > L > 82

# save
v

# set swap device
sudo mkswap /dev/xxx
swapon -a

# edit /etc/fstab
vim /etc/fstab
/dev/xxx   swap   swap   defaults  0  0

# mount
mount -a
lsblk
```

</details>


## Lab 09 - Extend Storage

**Tasks:**

A new project has been started in your organization. The developers of this project need additional disk space for the source code programs related to this project to be stored in their respective home directories. Increase the size of /home to 427MB. If for some reason your are unable to resize it to 427MB, any size between 380MB and 400 MB will suffice.

Note: While performing the above operation there should not be any data loss of existing data in the /home directory.

In addition to this, there is a need to keep large data files on the server. You need to create a separate mount point named /finance_data for this purpose. Create a new volume group and a logical volume for this purpose from the remaining free space on your disk/s. The size of Physical extent of the volume group should be 21MB. The logical volume should have 46 extents. This mount point should get automatically mounted at the boot time.


<details>
  <summary> **Solution** </summary>

Use growpart. 

```bash
sudo growpart /dev/xxx 427
```

Create the mountpoint, VG, LV, and physical extent. 

```bash
sudo su -
mkdir /sales_data
lsblk
lvs 
vgs 
pvs 

fdisk /dev/xxx
n > p/e > p.no > first > last 
t > L > 82 
w 

## pV
pvcreate /dev/xxx2
pvs 
pvdisplay

vgcreate -s size vgname /dev/xxx2 
vgs 
vgdisplay 

## LV
lvcreate -l size -n lvname vgname 
lvs 
lvdisplay 
mkfs.xfs /dev/vgname/vname 

## Mount.=
vim /etc/fstab 
  /dev/vgname/lvname  /sales_data   xfs   defaults    0   0
mount -a 
lsblk 
lsblk -f
```

</details>



## Lab 10 - Networking

**Tasks:**

Create a new connection with a static network connection using the settings given below. Be sure to replace the X with the correct number of your system. 

Parameter Settings:
- IP ADDRESS 172.25.250.252
- NETMASK 255.255.255.0 
- GATEWAY 172.25.250.254 
- NAME SERVER 172.25.254.254

<details>
  <summary> **Solution** </summary>

Use nmcli to configure: 

```bash
nmcli 
nmcli device status 
nmcli connection eth0 edit
set ipv4.method manual
set ipv4.addr 172.25.250.252/24
set ipv4.gateway 172.25.250.254 
set ipv4.dns 172.25.254.254
save persistent
```

Restart: 

```bash 
nmcli connection down eth0
nmcli connection up eth0 
nmcli device status 
ping gw-ip 
ping dns-ip 
```
 

</details>



