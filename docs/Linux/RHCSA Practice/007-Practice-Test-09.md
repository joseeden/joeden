---
title: Practice Test 09
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
 

</details>



## Lab 02 - Autofs

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



## Lab 03 - Tar

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


## Lab 04 - Find

**Tasks:**

Find all files owned by harry, and copy it to catalog: /opt/dir.

<details>
  <summary> **Solution** </summary>

```bash
mkdir -p /opt/dir
find / -user 'harry' -exec cp {} /opt/dir \;
ll /opt/dir 
```
 


</details>


## Lab 05 - Grep

**Tasks:**

Copy all occurence of ‘strato’ from /usr/share/dict/words to the directory /tmp/data.

<details>
  <summary> **Solution** </summary>

```bash
grep 'strato' /usr/share/dict/words > /tmp/datbudget.xlxs 
cat /tmp/datbudget.xlxs 
```


</details>


## Lab 06 - Reset Password

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


## Lab 07 - NTP

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

