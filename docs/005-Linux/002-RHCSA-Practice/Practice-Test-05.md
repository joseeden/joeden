---
title: Practice Test 05
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


:::info[Note]

These are some of the scenarios that I haven't tried to simulate yet. 

:::

## Lab 01 - Configure an HTTP Server


**Tasks:**

Configure the http server so that it can render html pages from his Document Root directory. Download an already developed HTML page from an ftp server 10.11.11.11. The name of this HTML page file is webpage.html. Configure your web server so that this web page will be displayed when a user hits your web site. You may rename this HTML file if necessary.

Open the appropriate port of your firewall for this web site to be accessible from other machines.


<details>
  <summary> **Solution** </summary>

```bash
sudo su -
yum install -y httpd 

firewall-cmd --list-all
firewall-cmd --add-service=httpd
firewall-cmd --add-service=httpd --permanent
firewall-cmd --add-port=80/tcp 
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload 
```

</details>



## Lab 02 - Creating a YUM repository

**Tasks:**

You need to create YUM repository on your YUM server. For this reason, a RPM package named “createrepo” has to be installed on your YUM server. 
The “createrepo” RPM and its dependent RPMs are kept in /tmp/rpm directory.

<details>
  <summary> **Solution** </summary>


</details>


## Lab 03 - Modifying Boot Loader

**Tasks:**

You are required to change Boot Loader’s Splash Screen to display the name of your Organization ‘webpage Corporation’ instead of the default ‘Red Hat Enterprise Linux’ at the boot time.

<details>
  <summary> **Solution** </summary>


</details>



## Lab 04 - Upgrading the Kernel 

**Tasks:**

A new version of Linux Kernel is available. As a System Administrator you have been given a task to upgrade your existing kernel to the new one. You must keep the old kernel on the system as a backup. Make your system to boot with the newer kernel. The newer kernel is available at ftp://server1.example.com/finance/updates

<details>
  <summary> **Solution** </summary>


</details>


## Lab 05 - Setting the system time

**Tasks:**

There is a need for a cluster setup in your company for providing high availability of production servers. For this reason, all servers in the cluster must have the exact system time. You are required to setup your current server’s system time to sync with the TIME server in your organization as your current is part of a cluster. The IP address of the Time Server is 10.11.11.11.

VM (no servers to be installed):

1. /boot – partition – 100MB
2. / - partition – 3GB
3. Swap – vg1 – lv1 (pe size = 4M for vg1) – 500MB
4. /home – vg1 – lv2 (400MB)


<details>
  <summary> **Solution** </summary>


</details>


## Lab 06 - Resizing a directory 

**Tasks:**

Resize the file system /opt from its current size of 500 MB to 400 MB. Do not lose any data while performing the resizing.

<details>
  <summary> **Solution** </summary>


</details>


## Lab 07 - Configuring an HTTP Server 

**Tasks:**

Configure a HTTP server, which should be accessible via the URL http://internal.platform.com.
Use wget to download the releases from http://dev.platform.com

<details>
  <summary> **Solution** </summary>


</details>


## Lab 08 - Configuring Autofs 

1. You need to configure autofs to make sure after login successfully.
2. The home directory "autofs" is shared as /home/svcuser at the ip: 10.11.12.13. 
3. Other ldap users can use the home directory normally.

<details>
  <summary> **Solution** </summary>


</details>

```bash
sudo su -
ll /etc/auto* 
yum install -y autofs 

vim /etc/auto.master 
/home   /etc/auto.ldap 

vim /etc/auto.ldap
svcuser  -rw,soft,intr 10.11.12.13:/svcuser 

systemctl enable --now autofs
systemctl start autofs 
systemctl status autofs 

showmount -e
```