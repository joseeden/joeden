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

## Create the Windows Server VM 

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

A new window will open. In the starup page, select the Language, Time, and Keyboard method, and click Next > Install Now.

![](/img/docs/12072024-vbox-vm-windows-setup.png)

Select the Windows Server 2019 Standard Evaluation. Accept the licensing agreement and click Next.

![](/img/docs/12072024-vbox-vm-windows-SELECT-OS.png)

Select Custom Install > Next. It will now go through the installation. Once done, the VM will reboot.

![](/img/docs/12072024-vbox-vm-windows-custom-install.png)

After reboot, you'll be prompted to change the administrator's password. Click OK.

![](/img/docs/12072024-vbox-vm-windows-CHANGE-PW.png)

Enter the password, then press Tab to proceed to the next line. Confirm the password by typing again, then hit Enter.

![](/img/docs/12072024-vbox-vm-windows-CHANGE-PW-2.png)

Next, click