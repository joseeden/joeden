---
title: "Windows Server with GUI"
description: "Running Windows Server with GUI in VirtualBox"
tags: 
  - Windows Server
sidebar_position: 3
last_update:
  date: 6/19/2021
---


## Pre-requites 

- [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Download the Windows Server 2019 ISO File.](/docs/004-Windows/001-Windows-Server-in-VirtualBox/002-Windows-Server-Core.md#overview)

## Windows Server Desktop Experience 

This is another edition of Windows Server 2019 that has a GUI console. To setup, follow the same steps of importing the ISO file and configuring the VM. You can keep the defaults and click Finish.

![](/img/docs/12082024-windows-gui.png)

From the Oracle VirtualBox, select the new VM and click Start. Go through the same setup steps. Click Next > Install.

![](/img/docs/12072024-vbox-vm-windows-setup.png)

Choose the "..Desktop Experience" edition then click Next > Accept the licensing terms > Next

![](/img/docs/12072024-vbox-vm-windows--desktop-exp.png)

Select Custom Install > Next. It will now go through the installation. Once done, the VM will reboot.

![](/img/docs/12072024-vbox-vm-windows-custom-install.png)

After reboot, set the administrator password and click Finish.

![](/img/docs/12072024-vbox-vm-windows-set-admin-pw.png)

You should now see the welcome page. To unlock, go to Input > Keyboard.

![](/img/docs/12072024-vbox-vm-windows-unlock-via-Keyboard.png)

![](/img/docs/12072024-vbox-vm-windows-unlock-enter-pw.png)

Upon login, the server manager will automatically start. You can close this for now.

![](/img/docs/12072024-vbox-vm-windows-server-manager.png)

Next, click Devices > Insert Guest Additions CD Image. It should open the CD drive.

![](/img/docs/12072024-vbox-vm-vboxguest-editionsclick.png)

Double-click on `VBOxWindowsAdditions.exe` > Next > Next > Install.

![](/img/docs/12072024-vbox-vm-vboxguest-editionsclick-next.png)

Once done, click **Reboot now** then **Finish.**

![](/img/docs/12072024-vbox-vm-vboxguest-editionsclick-reboot-now.png)