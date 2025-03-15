---
title: "Linux Privilege Escalation"
description: "Linux Privilege Escalation"
tags: 
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Cybersecurity
sidebar_position: 13
last_update:
  date: 3/11/2022
---


## Overview

Privilege escalation in Linux allows unauthorized users to gain higher access, which can pose serious security risks.

- It can lead to data theft or system manipulation.
- Preventing escalation ensures system integrity.

## Common Techniques

Methods used for privilege escalation:

- **Exploiting Vulnerabilities**  
  - Targeting known security flaws.
  - Often involves outdated systems.

- **Weak Configuration**  
  - Misconfigurations in system settings.
  - Includes poor permissions or weak authentication.

- **Kernel Exploits**  
  - Targeting Linux kernel vulnerabilities.
  - Allows bypassing normal security checks.

- **SUID Binaries**  
  - Exploiting binaries with SUID permissions.
  - Gives unauthorized access to privileged actions.

## Steps to Secure

Actions to prevent privilege escalation:

- **Security/Regular Updates**  
  Keep packages and the kernel updated.

  ```bash
  sudo apt update
  sudo apt upgrade
  ```

- **Using sudo**  
  Use `sudo` instead of root for elevated privileges.

  ```bash
  sudo adduser limiteduser
  sudo usermod -aG limitedgroup limiteduser
  ```

- **Secure the sudoers file**  
  Control user privilege escalation by editing the `/etc/sudoers` file.

  ```bash
  john   ALL=(ALL) NOPASSWD: /bin/ls, /usr/bin/cat
  jane   ALL=(ALL) !/bin/rm
  ```

- **Set nologin for root**  
  Prevent root from logging in directly.

  ```bash
  root:x:0:0:root:/root:/usr/sbin/nologin
  ```

- **Audit User Permissions**  
  Regularly check user accounts and their groups.

  ```bash
  cat /etc/passwd
  groups username
  ```

- **Kernel Hardening**  
  Secure the kernel with SELinux or AppArmor.

  ```bash
  sudo apt install selinux-utils
  sestatus
  ```

- **SUID Binaries Review**  
  Monitor and limit SUID binaries usage.

  ```bash
  find / -type f -perm -4000
  ```

- **Security Tools**  
  Use tools like rootkit scanners for detection.

  ```bash
  sudo apt install rkhunter
  ```

- **Filesystem Permissions**  
  Set strict file permissions to prevent unauthorized access.

  ```bash
  chmod 600 sensitivefile
  chmod 700 sensitivefolder
  ```

- **User Authentication**  
  Enforce strong password policies and consider multi-factor authentication.

  ```bash
  sudo passwd username
  ```

- **Logging and Monitoring**  
  Regularly check system logs for unauthorized access.

  ```bash
  cat /var/log/syslog
  cat /var/log/auth.log
  ```

## Sudoers File

A typical sudoers file controls user privileges and defines allowed commands.

```bash
# /etc/sudoers
root    ALL=(ALL:ALL) ALL
%wheel   ALL=(ALL:ALL) ALL
john   ALL=(ALL) NOPASSWD: /bin/ls, /usr/bin/cat
jane   ALL=(ALL) !/bin/rm
Cmnd_Alias UPDATE = /usr/bin/apt-get update
john   ALL=(ALL) UPDATE
```

Where: 

- **%wheel**: Members of this group can use `sudo` to gain root access.
