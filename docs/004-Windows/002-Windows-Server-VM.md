---
title: "Windows Server in VirtualBox"
description: "Running Windows Server in VirtualBox"
tags: 
  - Windows Server
sidebar_position: 2
last_update:
  date: 7/7/2022
---


## Overview

Windows Server is a robust operating system designed for managing network resources, hosting applications, and providing enterprise services. Using VirtualBox, you can set up a virtual environment to install and explore Windows Server features for safe and flexible testing or training without affecting physical systems.  

To download the Window Server ISO file, go to [Microsoft Evaluation Center.](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2019).

## Windows Server Core (No GUI)

Open VirtualBox > New > Enter the name and choose the ISO image.

![](/img/docs/12072024-vbox-vm-windows-server.png)

![](/img/docs/12072024-vbox-vm-windows-server-unattended-os.png)

Enter username and password. Click Next > Next > Finish

![](/img/docs/12072024-vbox-vm-windows-server-creds.png)

![](/img/docs/12072024-vbox-vm-windows-server-mem.png)

![](/img/docs/12072024-vbox-vm-windows-server-finish.png)


## Setup the Windows Server VM

Start the VM:

![](/img/docs/12072024-vbox-vm-windows-server-start-vm.png)

A new window will open. In the startup page, select the Language, Time, and Keyboard method, and click Next > Install Now.

![](/img/docs/12072024-vbox-vm-windows-setup.png)

Select the Windows Server 2019 Standard Evaluation. Accept the licensing agreement and click Next.

![](/img/docs/12072024-vbox-vm-windows-SELECT-OS.png)

Select Custom Install > Next. It will now go through the installation. Once done, the VM will reboot.

![](/img/docs/12072024-vbox-vm-windows-custom-install.png)

After reboot, you'll be prompted to change the administrator's password. Click OK.

![](/img/docs/12072024-vbox-vm-windows-CHANGE-PW.png)

Enter the password, then press Tab to proceed to the next line. Confirm the password by typing again, then hit Enter.

![](/img/docs/12072024-vbox-vm-windows-CHANGE-PW-2.png)

Next, click Devices > Insert Guest Additions CD Image. Then on the command prompt, type `d:` to switch to the D drive. Type in `VBOxWindowsAdditions.exe' and hit enter.

![](/img/docs/12072024-vbox-vm-windows-insert-guest-os.png)

Type in `VBOxWindowsAdditions.exe' and hit enter. Click Next > Next > Install.

![](/img/docs/12072024-vbox-vm-windows-VBOxWindowsAdditions.png)

It will go through the installation process.

![](/img/docs/12072024-vbox-vm-windows-install-process.png)

Select Reboot now > Finish

![](/img/docs/12072024-vbox-vm-windows-reboot-now.png)


## Server Configuration Utility 

After reboot, you'll see the command prompt again. Type in `sconfig` to open the Server Configuration utility. You can do different things using this utility.

![](/img/docs/12072024-vbox-vm-windows-sconfig.png)

Enter `2` to rename the computer. Set the name to **ServerCore**. Restart computer when prompted.

![](/img/docs/12072024-vbox-vm-windows-sconfig-change-comp-name.png)


## Isolate the VM

Since the VM is for testing, we can disable its internet access. To do this, go to Machine > Settings > Network.
On adapter 1, set **Attached to** to Host-only Adapter, then click OK.

![](/img/docs/12072024-vbox-vm-windows-HOSTONLY-ADAPTER.png)


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