---
title: Linux Kernel
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 17 
last_update:
  date: 2/27/2022
---

## Tasks

1. Install a new version of the kernel.
2. Enable packet forwarding.


## Solution

### 1. Install a new kernel version

Before installing a new kernel, it's useful to check which versions are available in your distribution's repositories.

```sh
sudo yum list available kernel
```

Choose the kernel version you want to install based on the output of the previous command. Replace `<kernel-version>` with the actual version number you want to install.

```sh
sudo yum install kernel-<kernel-version>
```

For example, to install kernel version `5.15.0`, you would run:

```sh
sudo yum install kernel-5.15.0
```

After installing the new kernel, update the bootloader configuration to ensure it is included in the boot menu.

```sh
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

Or, for UEFI-based systems:

```sh
sudo grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg
```

To start using the new kernel, reboot your system:

```sh
sudo reboot
```

After rebooting, check that the new kernel version is running:

```sh
uname -r
```

This command will display the currently running kernel version.



### 2. Enable packet forwarding

Packet forwarding allows a Linux system to forward network packets from one network interface to another. Here’s how to enable it:

Temporary enablement (until next reboot):

```sh
sudo sysctl -w net.ipv4.ip_forward=1
```

To make this change persistent across reboots, edit `/etc/sysctl.conf`:

```sh
sudo nano /etc/sysctl.conf
```

Uncomment or add the following line to enable packet forwarding:

```sh
net.ipv4.ip_forward = 1
```

Save and exit the editor (`Ctrl+X`, then `Y` and `Enter`). Apply the changes:

```sh
sudo sysctl -p
```

This command reloads the `sysctl` settings from `/etc/sysctl.conf` and applies them.
