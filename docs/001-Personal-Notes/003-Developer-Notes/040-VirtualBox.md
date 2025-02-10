---
title: "VirtualBox"
tags: [DevOps, Personal Notes, Development]
description: "VirtualBox NOtes"
sidebar_position: 22
last_update:
  date: 11/22/2023
---


## Installation 

VirtualBox releases updates every couple of years so it's best  to rely on the official documentation on how to install VirtualBox.

For more information, please see [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)


## Mounting a Fileshare to VMs 

Steps:

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

## VirtualBox conflicts with WSL 

Reference: [How to get VirtualBox 6.0 and WSL working at the same time [closed]](https://stackoverflow.com/questions/58031941/how-to-get-virtualbox-6-0-and-wsl-working-at-the-same-time)

To run off hypervisor:

1. Go to Control Panel > Programs and Features
2. Click Turn Windows features on or off
3. Uncheck the following features:
    - Containers  
    - Hyper-V     

4. Check the following features: 
    - Virtual Machine Platform
    - Windows Hypervisor Platform
    - Windows Sandbox

5. Open Powershell with elevated privileges (Run as Administrator) then run:

    ```bash
    bcdedit /set hypervisorlaunchtype off
    ```

6. Restart the Computer.

To enable WSL again and disable virtualbox:

1. Run in Powershell:

    ```bash
    bcdedit /set hypervisorlaunchtype auto 
    ```

2. Restart the Computer.
