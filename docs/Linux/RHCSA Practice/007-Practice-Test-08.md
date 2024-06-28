---
title: Practice Test 08
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->

## Lab 01 - Networking

**Tasks:**

Create a New connection with a static network connection using the settings given below. Be sure to replace the X with the correct number of your system. 

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



## Lab 02 - Hostnames

**Tasks:**

Set the device hostname to phoenix.anaheim.lab.example.com.


<details>
  <summary> **Solution** </summary>

```bash
sudo hostnamectl set-hostname phoenix.anaheim.lab.com
```
 

</details>



## Lab 03 - Repositories

**Tasks:**

Configure your anaheim.example.com as yum client so that you can download and install package from
your yum repository at
- http://anaheim.example.com/rhel8.2/x86_64/dvd/BaseOS
- http://anaheim.example.com/rhel7.0/x86_64/dvd/AppStream


<details>
  <summary> **Solution** </summary>



```bash
cd /etc/yum/repos.d
ll

# if there are other repo, delete them.
rm -f *

# create the repo config files
touch BaseOS.repo
touch AppStream.repo

vim BaseOS.repo
[BaseOS]
name=BaseOS
baseurl=http://anaheim.example.com/rhel8.2/x86_64/dvd/BaseOS
gpgcheck=0
enabled=1

vim AppStream.repo
[AppStream]
name=AppStream
baseurl=http://anaheim.example.com/rhel7.0/x86_64/dvd/AppStream
gpgcheck=0
enabled=1
```
 


</details>



## Lab 04 - File Permissions

**Tasks:**

1. Create "form.doc" and give them permission such that root have read, group have full permission and other user have write permission.
2. Create "update.doc" and give them permission such that root have full permission, group have read and other user have read & execute permission.


<details>
  <summary> **Solution** </summary>

```bash
touch form.doc
chmod 472 form.doc
```

```bash
touch update.doc
chown root: update.doc
chmod 745 update.doc
```

</details>



## Lab 05 - ACL 

**Tasks:**

1. Copy directory /etc/fstab to /var/tmp/fstab. 
2. Assign user Michael read,write ACL permission on /var/tmp/fstab.
3. Assign user Pete read only permission on /var/tmp/fstab.
4. Tony has no permission, while other users have read only permission


<details>
  <summary> **Solution** </summary>


```bash
sudo su -
cp /etc/fstab /var/tmp/fstab
setfacl -m u:michael:rw /var/tmp/fstab
setfacl -m u:pete:r /var/tmp/fstab
setfacl -m u:tony:--- /var/tmp/fstab
setfacl -m o:r /var/tmp/fstab
getfacl /var/tmp/fstab
chmod 3770 /var/tmp/fstab
```
 

</details>



## Lab 06 - Users and Groups

**Tasks:**

1. Add user Henry, John, and Will.
2. Set "password" as password. 
3. Create a group uxdevs. 
4. Henry and John are secondary member of group of uxdevs group. 
5. Will should not have interactive shell prompt. 
6. Make a directory /mnt/reports.
7. Group uxdevs must belong to the directory. 
8. All user in the group have read and write each other files.


<details>
  <summary> **Solution** </summary>


```bash
sudo su -
groupadd uxdevs
useradd -G uxdevs henry
useradd -G uxdevs john
useradd -s /sbin/nologin will
echo 'password' | passwd --stdin henry
echo 'password' | passwd --stdin john
echo 'password' | passwd --stdin will
mkdir /mnt/reports
cho.
chown uxdevx: /mnt/reports
chmod 2660 /mnt/reports
```

</details>

