---
title: Setting up a Repository
tags: [Linux, Red Hat, Certifications]
sidebar_position: 35
last_update:
  date: 7/8/2022
---


![](/img/docs/sv-rpm-repo.png)
![](/img/docs/sv-rpm-repo-1.png)
![](/img/docs/sv-rpm-repo-2.png)


> 30-Dec-2021
> Decided to come back to this again after I installed VirtualBox again on my personal laptop, downloaded the RHEL 8 iso file from developer.redhat.com site and run a VM. I also remember the reason why i stop using VirtualBox. My laptop had a 4gb ram back then and launching VMs quickly make my laptop laggy.
> Since I have upgraded it to 8gb, it seems to work better now, although everything seems to slow down when I try to run more than 1 VM.
> Going back to the topic, I followed the steps provided above.

I first switched to **root** and checked the repolist in my RHEL8 VM, then checked the block devices.
![](/img/docs/sv-repo.png)

I loaded the ISO file onto the sr0 through the **Devices > Optical Devices > rhel-xxx.iso** tab and then checked again.
![](/img/docs/sv-repo-2.png)
![](/img/docs/sv-repo-3.png)

Created the entry in /etc/fstab first,
```bash
$ sudo vim /etc/fstab

# Setup local repo access
/rhel8.iso    /repo   iso9660   defaults      0 0
```
![](/img/docs/sv-repo-4.png)

Create the **repo** directory and then create the iso image from the loaded image in /dev/sr0. This will take a few minutes.
```bash
sudo mkdir /repo
sudo dd if=/dev/sr0 of=/rhel8.iso bs=10M
```

![](/img/docs/sv-repo-6.png)
![](/img/docs/sv-repo-7.png)

Reload the daemon and mount the new **repo** entry from fstab. Afterwards, the **repo** directory should now have files inside.
```bash
sudo systemctl daemon-reload
mount -a
```
![](/img/docs/sv-repo-8.png)

Created the **appstream.repo** and **base.repo**,
```bash
$ vim /etc/yum.repos.d/appstream.repo

[apptream]
name=appstream
baseurl=file:///repo/Appstream
gpgcheck=0
```
```bash
$ vim /etc/yum.repos.d/base.repo

[base]
name=base
baseurl=file:///repo/BaseOS
gpgcheck=0
```
![](/img/docs/sv-repo-9.png)
![](/img/docs/sv-repo-10.png)
![](/img/docs/sv-repo-11.png)
![](/img/docs/sv-repo-12.png)
![](/img/docs/sv-repo-13.png)

Checking the repolist again,
```bash
$ sudo yum repolist
```
![](/img/docs/sv-repo-14.png)

