---
title: "Windows 10"
description: "Running Windows 10 in VirtualBox"
tags: 
  - Windows Server
sidebar_position: 4
last_update:
  date: 6/19/2021
---



## Pre-requites 

- [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)


## Download the ISO File 

Go to [Download Windows 10](https://www.microsoft.com/en-us/software-download/windows10) and click the Download button. It will download a **MediaCreationTool_22H2.exe** file.

Run the application > Accept the licensing terms > Select Create installation media > Next

![](/img/docs/12082024-windows-10-create-install-media.png)

Select ISO file > Next > Save it to a folder.

![](/img/docs/12082024-windows-10-create-install-media-next.png)

Click Finish.

![](/img/docs/12082024-windows-10-create-install-media-burn-iso.png)


## Create the Windows 10 VM in VirtualBox 

Open VirtualBox > New. Specify the VM name and select the ISO file created in the previous step. keep the other defaults. Click Finish. 

![](/img/docs/12082024-windows-10-create-vm.png)

Select the Windows 10 virtual machine and click Start.

![](/img/docs/12082024-windows-10-start-vm.png)

A new window will open. In the startup page, select the Language, Time, and Keyboard method, and click Next > Install Now.

![](/img/docs/12082024-windows-10-install-1.png)

In the Activate Windows page, click **I don't have a product key** > Next.

![](/img/docs/12082024-windows-10-install-2.png)

Choose Windows 10 Pro > Next.

![](/img/docs/12082024-windows-10-install-3.png)

Accept the license terms > Next > Select Custom install > Next

![](/img/docs/12082024-windows-10-install-4.png)

Select the region > Next > Select keyboard layout > Yes > Skip

![](/img/docs/12082024-windows-10-install-5.png)

Choose Setup for personal use.

![](/img/docs/12082024-windows-10-install-6.png)

Since this is for lab purpose, select Offline account for now.

![](/img/docs/12082024-windows-10-install-offline.png)

Select Limited experience.

![](/img/docs/12082024-windows-10-install-limited-exp.png)

Provide an admin account.

![](/img/docs/12082024-windows-10-install-admin-account.png)

You may need to provide three security questions.

![](/img/docs/12082024-windows-10-install-security-question.png)

For the last few steps, simply click Accept > Accept > Skip > Accept

![](/img/docs/12082024-windows-10-install-accept.png)

When prompted if you want your computer to be discoverable, you can select No for now, then click Continue. 
You should now be able to access the features of the Windows 10 machine.

![](/img/docs/12082024-windows-10-install-see-properties.png)
