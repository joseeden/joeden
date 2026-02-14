---
title: "Features/Tools"
tags: 
- DevOps
- Virtualization
- Personal Notes
- Development
sidebar_position: 15
last_update:
  date: 11/22/2023
---

## Overview

This page covers common features you can enable or configure after the VM is created, to improve usability and integration with the host.


## Allow Shared Clipboard 

You can enable the shared clipboard in VirtualBox to copy text between your host machine and your VM.

1. Go to **Devices** → **Shared Clipboard** → **Bidirectional**

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-14-152629.png)

    </div>

2. Inside the VM:

    ```bash
    lsmod | grep vboxguest
    ```

    If you see nothing, clipboard won’t work.

    Also check:

    ```bash
    systemctl status vboxservice
    ```

    Should be **active (running)**.

3. If NOT installed, install Guest Additions properly

    ```bash
    sudo dnf install -y gcc make perl kernel-devel kernel-headers elfutils-libelf-devel
    ```

    When you install VirtualBox Guest Additions on Linux, it often needs to compile kernel modules (like `vboxguest`) for your currently running kernel.

    Check the running kernel version: 

    ```bash
    uname -r
    ```

    Check the installed headers: 

    ```bash
    rpm -q kernel-devel kernel-headers  
    ```

    You want something like:

    ```bash
    uname -r: 5.15.0-1127.el8.x86_64
    kernel-devel-5.15.0-1127.el8.x86_64
    kernel-headers-5.15.0-1127.el8.x86_64
    ```

    If the numbers don’t match, you need to update your kernel and headers:

    ```bash
    sudo dnf update -y
    reboot
    ```


## Mounting a Fileshare to VMs 

Share a folder from your host machine with your VM to easily transfer files.

1. Open VirtualBox and select the VM in the VirtualBox Manager.

2. Go to Settings > Shared Folders > Click the `+' to add a folder.

3. Specify the folder path, foldername, and mount point.

    ![](/img/docs/12192024-vbox-mounting-fileshare-2.png)

4. Click OK > OK

6. Check if you can find it listed using this command:

    ```bash
    sudo VBoxControl sharedfolder list 
    ```

    Output:

    ```bash
    Oracle VM VirtualBox Guest Additions Command Line Management Interface Version 5.2.42_Ubuntu
    (C) 2008-2020 Oracle Corporation
    All rights reserved.

    Shared Folder mappings (2):

    01 - vagrant
    02 - fileshare 
    ```

7. If so, create directory and mount.

    ```bash
    mkdir /mnt/fileshare
    mount -t vboxsf fileshare /mnt/fileshare
    ```

8. If step 4 did not returned the shared folders, you can install `virtualbox-guest-dkms`.

    ```bash
    sudo apt-get install -y virtualbox-guest-dkms
    sudo usermod -aG vboxsf $(whoami)
    sudo VBoxControl guestproperty \
    set /VirtualBox/GuestAdd/SharedFolders/MountDir /add/your/fileshare/here 
    ```

9. Restart VM then check if you have any vb folders mounted.

    ```bash
    mount | grep vboxsf 
    ```

    Output:

    ```bash
    /vagrant on /vagrant type vboxsf (rw,nodev,relatime,_netdev)
    fileshare on /mnt/fileshare type vboxsf (rw,nodev,relatime)
    fileshare on /mnt/fileshare type vboxsf (rw,nodev,relatime)
    fileshare on /mnt/fileshare type vboxsf (rw,nodev,relatime)  
    ```

10. If so, change ownership of `/add/your/fileshare/here` to yourself.

    ```bash
    sudo chown $(whoami):$(whoami) /add/your/fileshare/here
    ```

## Drag and Drop between Host and VM

Allows copying files directly by dragging them between host and VM windows.

- Enable in VirtualBox menu:

    ```
    Devices → Drag and Drop → Bidirectional
    ```

- Requires **Guest Additions** on the VM.

- Works for both files and text (depending on OS support).

## Snapshot Management

Take snapshots to save the current state of a VM for quick rollback.

- From VirtualBox menu:

    ```
    Machine → Take Snapshot
    ```
    
- Useful before updates, configuration changes, or testing software.
- Restore a snapshot anytime to revert the VM to the saved state.


## Seamless Mode / Fullscreen Integration

Integrate the VM display with the host desktop for better workflow.

- **Fullscreen Mode**:

    ```
    View → Fullscreen Mode
    ```

- **Seamless Mode**: merges guest windows with host desktop:

    ```
    View → Seamless Mode
    ```

Notes: Requires **Guest Additions**.

## USB Device Passthrough

Allows the VM to directly access USB devices from the host.

- Connect USB devices in VirtualBox menu:

    ```
    Devices → USB → <Device Name>
    ```

- May require adding your user to `vboxusers` group on Linux:

    ```bash
    sudo usermod -aG vboxusers $USER
    ```

- Useful for USB drives, dongles, or hardware testing in the VM.

