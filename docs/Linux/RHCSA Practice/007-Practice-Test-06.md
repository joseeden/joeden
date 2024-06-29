---
title: Practice Test 06
tags: [Linux, Red Hat, Certifications]
sidebar_position: 1
last_update:
  date: 7/8/2022
---

<!-- ***************************************************************************************************************************** -->

<!-- NOTE: If you're going to update this, make sure to comment out "last_update" and "date" in the first few lines. -->

<!-- ***************************************************************************************************************************** -->


## Lab 01 - Cron

**Tasks:**

set a cronjob for user ben that run every 5 minutes.

<details>
  <summary> **Solution** </summary>

```bash
sudo su -
cron -u ben -e 
/5 * * * * job.sh 
:wq! 
crontab -u ben -l
```
 
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



## Lab 07 - Autofs

**Tasks:**

Install Autofs.

<details>
  <summary> **Solution** </summary>

```bash
sudo su -
yum install -y autofs 
vim /etc/auto.master.d/direct.autofs 
vim /etc/auto.direct 
  /external   -rw,sync,fstpe=url
systemctl enable --now autofs
sustemctl status autofs 
```

</details>



## Lab 08 - Tar

**Tasks:**

Create a tar file /tmp/root.tar.gz that compress the /root


<details>
  <summary> **Solution** </summary>


```bash
sudo su -
tar -czvf /tmp/root.tar.gz /root 
ll /tmp/*gz
```

</details>


## Lab 09 - Find

**Tasks:**

Find all files owned by user Thomas, and copy it to catalog: /tmp/inventory.

<details>
  <summary> **Solution** </summary>

```bash
ls -la /tmp/inventory
mkdir -p /tmp/inventory
find / -user 'thomas' 
find / -user 'thomas' -exec cp {} /tmp/inventory \;
ll /tmp/inventory 
```
 


</details>


## Lab 10 - Grep

**Tasks:**

Copy all occurence of ‘strato’ from /usr/share/dict/words to the directory /tmp/data.

<details>
  <summary> **Solution** </summary>

```bash
grep 'strato' /usr/share/dict/words > /tmp/datbudget.xlxs 
cat /tmp/datbudget.xlxs 
```


</details>
