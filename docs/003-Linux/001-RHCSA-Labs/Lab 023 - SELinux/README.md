---
title: SELinux
tags: [Linux, Red Hat, Certifications, Labs]
sidebar_position: 23 
last_update:
  date: 3/27/2021
---

## Tasks

1. Ensure SELinux is enabled and enforcing
2. Some files in /etc are configured with context label that doesn't match the one set in SELinux policy. Fix it.

----

## Solution

### 1. SELinux in Enforcing mode

Check SELinux Status:

```bash
sestatus
```

To enable SELinux and set it to enforcing mode, edit the `/etc/selinux/config` file:

```bash
sudo nano /etc/selinux/config
```

Ensure the following settings are present and set:

```
SELINUX=enforcing
```

After making changes, reboot your system for SELinux to be fully enforced:

```bash
sudo reboot
```

After rebooting, verify SELinux status again:

```bash
sestatus
```

Ensure it shows `SELinux status: enabled` and `Current mode: enforcing`.


### 2. Fix context labels on files

If some files in `/etc` have contexts that do not match the SELinux policy, you can restore the contexts using the `restorecon` command.

```bash
sudo restorecon -Rv /etc
```

This command recursively (`-R`) restores (`restorecon`) the SELinux contexts for all files and directories in `/etc`, and it operates in verbose mode (`-v`) to display the changes made.

After running `restorecon`, verify the file contexts have been restored to match the SELinux policy:

```bash
sudo restorecon -Rv /etc | grep 'Restored'
```

