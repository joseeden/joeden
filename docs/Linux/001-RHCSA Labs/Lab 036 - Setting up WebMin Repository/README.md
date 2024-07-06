---
title: Setting up WebMin Repository
tags: [Linux, Red Hat, Certifications]
sidebar_position: 28
last_update:
  date: 7/8/2022
---



In this lab, we'll set up the Webmin YUM repository on your system. **Webmin** is a web-based interface for system administration for Unix. Using any modern web browser, you can set up user accounts, Apache, DNS, file sharing, and much more. By setting up the YUM repository, you can easily install and update Webmin through your package manager.

To setup the Webmin YUM repo, go to their [official webpage > Webmin Installation > 
Installing the RPM](https://www.webmin.com/rpm.html).

Download and install Webmin:
```bash
wget http://prdownloads.sourceforge.net/webadmin/webmin-1.984-1.noarch.rpm
yum -y install perl perl-Net-SSLeay openssl perl-IO-Tty perl-Encode-Detect
rpm -U webmin-1.984-1.noarch.rpm
```

![](/img/docs/webminpage.png)

Similarly, you can install and update Webmin via yum by creating a repo file.
```bash
$ sudoedit /etc/yum.repos.d/webmin.repo

[Webmin]
name=Webmin Distribution Neutral
#baseurl=https://download.webmin.com/download/yum
mirrorlist=https://download.webmin.com/download/yum/mirrorlist
enabled=1
gpgkey=https://download.webmin.com/jcameron-key.asc
gpgcheck=1
```

You'll also see the new repo file.
```bash
$ ll
total 32
-rw-r--r--. 1 root root 4782 Nov 16 13:18 redhat-rhui-beta.repo.disabled
-rw-r--r--. 1 root root  482 Feb 26 06:52 redhat-rhui-client-config.repo
-rw-r--r--. 1 root root 7145 Feb 26 06:52 redhat-rhui.repo
-rw-r--r--. 1 root root 5768 Feb 26 06:49 redhat-rhui.repo.rpmsave
-rw-r--r--. 1 root root  228 Feb 27 06:33 webmin.repo
```

To disable the Webmin repository:
```bash
$ sudoedit /etc/yum.repos.d/webmin.repo

[Webmin]
name=Webmin Distribution Neutral
mirrorlist=https://download.webmin.com/download/yum/mirrorlist
enabled=0
gpgkey=https://download.webmin.com/jcameron-key.asc
gpgcheck=1
```

If we check the repolist again, we'll see that the webmin repo is now removed.
```bash
$ sudo dnf repolist
Updating Subscription Management repositories.
Unable to read consumer identity

This system is not registered with an entitlement server. You can use subscription-manager to register.

repo id                                                    repo name
ansible-2-for-rhel-8-rhui-rpms                             Red Hat Ansible Engine 2 for RHEL 8 (RPMs) from RHUI
rhel-8-appstream-rhui-rpms                                 Red Hat Enterprise Linux 8 for x86_64 - AppStream from RHUI (RPMs)
rhel-8-baseos-rhui-rpms                                    Red Hat Enterprise Linux 8 for x86_64 - BaseOS from RHUI (RPMs)
rhui-client-config-server-8                                Red Hat Update Infrastructure 3 Client Configuration Server 8
```

To temporarily enable the repo for a one-time install/update, run the command below. Note that when you list the repos, it is back to beign disabled.
```bash
$ sudo dnf install webmin --enablerepo=Webmin
```