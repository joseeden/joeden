---
title: Repositories
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 28
last_update:
  date: 3/27/2021
---

## Tasks

1. Loop mount the install disk/ISO that you've used to set up RHEL 8.
2. Configure the loop-mounted ISO as a repo.
3. Configure your system to use this repo as the only repo.


## Solution

### 1. Loop mount the ISO file

Assuming your RHEL 8 ISO file is located at `/path/to/rhel8.iso`.

Create a Mount Point:
```bash
sudo mkdir /mnt/iso
```

Loop Mount the ISO:
```bash
sudo mount -o loop /path/to/rhel8.iso /mnt/iso
```

### 2. Configure loop-mounted ISO as a repo.

Create a new repository file (e.g., `rhel8.repo`) under `/etc/yum.repos.d/`:
```bash
sudo vi /etc/yum.repos.d/rhel8.repo
```

Add the following content to `rhel8.repo`:

```bash
[rhel8-dvd]
name=RHEL 8 DVD Repository
baseurl=file:///mnt/iso/AppStream
gpgcheck=1
enabled=1
gpgkey=file:///mnt/iso/RPM-GPG-KEY-redhat-release

[rhel8-dvd-extras]
name=RHEL 8 DVD Extras Repository
baseurl=file:///mnt/iso/Extras
gpgcheck=1
enabled=1
gpgkey=file:///mnt/iso/RPM-GPG-KEY-redhat-release
```

Adjust `baseurl` paths (`AppStream` and `Extras`) according to your ISO structure. These paths assume standard RHEL 8 ISO layout.

Next, import the `RPM-GPG-KEY-redhat-release` from the mounted ISO to `/etc/pki/rpm-gpg/` and set appropriate permissions if needed:
```bash
sudo cp /mnt/iso/RPM-GPG-KEY-redhat-release /etc/pki/rpm-gpg/
sudo chmod 644 /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release
```

Clean YUM Cache and Test:
```bash
sudo yum clean all
sudo yum makecache
```

### 3. Use this repo as the only repo.

List Existing Repositories:
```bash
sudo yum repolist all
```

Disable all existing repositories except for `rhel8-dvd` and `rhel8-dvd-extras` (or whatever names you used in `rhel8.repo`).

```bash
sudo yum-config-manager --disable '*'
```

Then enable only the new repositories:
```bash
sudo yum-config-manager --enable rhel8-dvd
sudo yum-config-manager --enable rhel8-dvd-extras
```

Verify Repository Configuration:
```bash
sudo yum repolist
```

This should show only the repositories configured in `rhel8.repo`.

