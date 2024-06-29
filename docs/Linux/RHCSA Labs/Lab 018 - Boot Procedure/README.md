---
title: 018 - Boot Procedure
tags: [Linux, Red Hat, Certifications]
# sidebar_position: 1 
last_update:
  date: 2/27/2022
---

## Tasks

1. Configure your system to boot in **multi-user target** by default.
2. Persistently remove the options that hide startup messages while booting.

----

## Solution

### 1. Configure mult-user target

Check the current default target:

```sh
sudo systemctl get-default
```

Set the multi-user target as the default:

```sh
sudo systemctl set-default multi-user.target
```

Verify the default target is set correctly:

```sh
sudo systemctl get-default
```

Ensure that the output confirms `multi-user.target` as the default target.


```sh
sudo systemctl get-default
```


### 2. Hide startup messages


By default, some Linux distributions hide startup messages during boot for a cleaner boot experience. To show these messages persistently, edit the GRUB configuration file:

```sh
sudo nano /etc/default/grub
```

Find the line containing `GRUB_CMDLINE_LINUX_DEFAULT`. Look for a line similar to:

```sh
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

Remove `quiet` and `splash` from the line to display startup messages. After editing the file, update the GRUB configuration:

```sh
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

Or, for UEFI-based systems:

```sh
sudo grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg
```

After updating GRUB, reboot your system to apply the changes:

```sh
sudo reboot
```