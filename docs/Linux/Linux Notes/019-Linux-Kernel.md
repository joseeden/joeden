---
title: "Linux Kernel"
tags: [Linux, Red Hat, Certifications]
sidebar_position: 19
last_update:
  date: 11/29/2021
---


The Linux kernel is the core of the Linux operating system, acting as a bridge between the hardware and software. It interacts with hardware devices through drivers, known as **modules**, which are essential for the system's functionality.

![Linux Kernel](/img/docs/sv-linux-kernel.png)

These drivers include:

- **initramfs**: The initial RAM drive loaded when Linux boots up.
- **systemd-udevd**: Recognizes external hardware, such as thumb drives.

To manually load the drivers, we can use `modprobe`. Once the kernel is loaded with all the drivers, you can access it through the **shell**. Commands typed into the shell send **syscalls** to the kernel.

## Kernel Modules and modprobe

Kernel modules are essential components that provide the necessary drivers for the system's hardware. They can be loaded and unloaded dynamically, allowing for flexibility and customization of the system.

- Linux drivers are implemented as kernel modules. 
- Most are loadeded automatically through `initramfs` or `systemd-udevd`
- Use `modprobe` to manually load a kernel module
- To load specific modules, edit the `/etc/modprobe.conf' file.

### Loading the Module

Loading a module is necessary when a particular hardware device is not automatically recognized by the system or when you need to use a specific feature that is not loaded by default.

You can check if a module is loaded using `lsmod` and load it using `modprobe` if it isn't.

```bash
lsmod | grep vfat
```

```bash 
modprobe vfat
```

Check for the module again:

```bash 
$ lsmod | grep vfat
vfat                   20480  0
fat                    81920  1 vfat
```

### Unloading the Module

Unloading a module is useful when you no longer need a specific driver or want to free up system resources. It helps in maintaining a clean and efficient system environment.

To unload a module, use the `modprobe -r` command.

```bash 
$ lsmod | grep vfat
vfat                   20480  0
fat                    81920  1 vfat
```
```bash
modprobe -r vfat
```

Check once again:

```bash
$ lsmod | grep vfat
```

### Changing Module Parameters

Changing module parameters allows you to customize the behavior of the kernel modules to suit your specific needs. This can include adjusting settings for performance, compatibility, or functionality.

To change module parameters, modify the configuration files.

```bash
$ ll /etc/mod
modprobe.d/     modules-load.d/

$ ll /etc/modprobe.d/
total 20
-rw-r--r--. 1 root root   18 May  4  2021 blacklist-nouveau.conf
-rw-r--r--. 1 root root  747 Jul 28 19:19 lockd.conf
-rw-r--r--. 1 root root 1004 May 10  2021 mlx4.conf
-rw-r--r--. 1 root root   92 May 14  2021 truescale.conf
-rw-r--r--. 1 root root  674 Jul 21 18:41 tuned.conf
```

After modifying the config file, load the module again using `modprobe` to reflect the changes.

## Tuning Kernel Behavior

Tuning the kernel involves adjusting settings to optimize system performance, security, and functionality. The `/proc` directory contains information about running processes and system settings, allowing for dynamic adjustments.

The `/proc` directory is a pseudo-filesystem that provides an interface to kernel data structures. It allows users and administrators to query the system and make runtime changes to kernel parameters.

- `/proc` provides access to kernel information, such as PID directories and status files.
- Write the parameters to `/etc/sysctl.conf` to make them persistent.
<!-- The 'number' directories are PID of processes. When you run **ps**, the information will come from these files. -->

To display information about filesystems that are mounted on directories related to the `proc` filesystem:

```bash
$ mount | grep proc
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
systemd-1 on /proc/sys/fs/binfmt_misc type autofs (rw,relatime,fd=37,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=2903)
```

`/proc/meminfo` provides detailed information on what's happening in memory, which can be useful for monitoring and debugging.

```bash
$ cat /proc/meminfo

MemTotal:        3918724 kB
MemFree:         1816232 kB
MemAvailable:    2543220 kB
Buffers:          265312 kB
Cached:           625512 kB
SwapCached:         1116 kB
Active:           568072 kB
Inactive:        1003320 kB
Active(anon):       2648 kB
Inactive(anon):   681140 kB
Active(file):     565424 kB
Inactive(file):   322180 kB 
```

The tuning interface is in **/proc/sys**, which allows for dynamic adjustments to various system parameters.

```bash
$ ll /proc/sys
total 0
dr-xr-xr-x. 1 root root 0 Jan  3 07:49 abi
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 crypto
dr-xr-xr-x. 1 root root 0 Jan  3 07:49 debug
dr-xr-xr-x. 1 root root 0 Jan  3 07:49 dev
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 fs
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 kernel
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 net
dr-xr-xr-x. 1 root root 0 Jan  3 07:49 sunrpc
dr-xr-xr-x. 1 root root 0 Jan  3 07:49 user
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 vm
```

### IP Settings

You can navigate through the `/proc/sys/net/` directory to access and modify network-related settings.

```bash
$ ll /proc/sys/net/
total 0
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 core
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 ipv4
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 ipv6
dr-xr-xr-x. 1 root root 0 Jan  3 07:50 mptcp
dr-xr-xr-x. 1 root root 0 Jan  3 07:50 netfilter
dr-xr-xr-x. 1 root root 0 Jan  2 16:19 unix

$ ll /proc/sys/net/ipv4/ip*
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_default_ttl
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_dynaddr
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_early_demux
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_forward
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_forward_update_priority
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_forward_use_pmtu
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ipfrag_high_thresh
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ipfrag_low_thresh
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ipfrag_max_dist
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ipfrag_secret_interval
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ipfrag_time
-rw-r--r--. 1 root root 0 Jan  3 00:00 /proc/sys/net/ipv4/ip_local_port_range
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_local_reserved_ports
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_nonlocal_bind
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_no_pmtu_disc
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_unprivileged_port_start
```

### Changing ip_forward Setting

The `ip_forward` setting determines whether the system can forward packets between network interfaces. By default, it is set to 0 (disabled).

```bash
$ ll /proc/sys/net/ipv4/ip_forward
-rw-r--r--. 1 root root 0 Jan  3 07:50 /proc/sys/net/ipv4/ip_forward

$ cat /proc/sys/net/ipv4/ip_forward
0
```

If we want our machine to act as a router and be able to forward packets, we can set `ip_forward` to 1..

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
```
```bash
$ cat /proc/sys/net/ipv4/ip_forward

1
```

Verify the current setting:

```bash
[root@server ~]# sysctl -a | grep ip_forward

net.ipv4.ip_forward = 1
net.ipv4.ip_forward_update_priority = 1
net.ipv4.ip_forward_use_pmtu = 0
```

Note that these changes will be wiped out when system is restarted. To make them persistent across reboots, they need to be added to `/etc/sysctl.conf`.

```bash
$ ll /etc/sysctl.
sysctl.conf  sysctl.d/

$ ll /etc/sysctl.conf
-rw-r--r--. 1 root root 449 Dec 10 09:31 /etc/sysctl.conf
```

Edit `/etc/sysctl.conf`:

```bash
$ vim /etc/sysctl.conf
# sysctl settings are defined through files in
# /usr/lib/sysctl.d/, /run/sysctl.d/, and /etc/sysctl.d/.
#
# Vendor settings live in /usr/lib/sysctl.d/.
# To override a whole file, create a new file with the same name in
# /etc/sysctl.d/ and put new settings there. To override
# only specific settings, add a file with a lexically later
# name in /etc/sysctl.d/ and put new settings there.
#
# For more information, see sysctl.conf(5) and sysctl.d(5).
#
net.ipv4.ip_forward = 1
```

## Updating the Kernel

Updating the kernel ensures you have the latest features and security patches. This is crucial for maintaining system security and stability.

- Linux kernels are not technically updated, a new kernel is install beside the old one.
- This allows sysadmins to boot the old kernels in case anything goes wrong.


Use either of the command below to update the kernel:

```bash
yum update kernel
yum install kernel  
```

By keeping your kernel up to date, you benefit from performance improvements, bug fixes, and enhanced hardware support, which collectively contribute to a more secure and efficient system.
