---
title: Automate Installs
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 25
last_update:
  date: 3/27/2021
---

## Tasks

1. Create a kickstart file named **myks.cfg** for automated installs with the following requirements:
    - Installed should prompt for a password
    - Network connectivity is enabled on boot
    - Local machine name should be set to "rhcsa2022.sample.com


## Solution

Create the kickstart file:

```bash
# Kickstart file for automated installs

# System language
lang en_US.UTF-8

# Keyboard layouts
keyboard us

# System timezone
timezone --utc UTC

# Root password hash (replace '<password_hash>' with the hashed password)
rootpw --iscrypted <password_hash>

# Network information
network --bootproto=dhcp --device=eth0 --onboot=yes

# System bootloader configuration
bootloader --location=mbr

# Partition clearing information
clearpart --all --initlabel

# Disk partitioning information
autopart

# System authorization information
auth --enableshadow --passalgo=sha512

# Use text mode install
text

# Firewall configuration
firewall --enabled --service=ssh

# System services
services --enabled=network,sshd

# SELinux configuration
selinux --enforcing

# Reboot after installation
reboot

# System hostname
network --hostname=rhcsa2022.sample.com

# Package installation
%packages
@core
%end

# Post-installation script
%post
echo "Post-installation script execution..."
%end
```