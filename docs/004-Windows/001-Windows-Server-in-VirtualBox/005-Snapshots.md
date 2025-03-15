---
title: "Snapshots"
description: "Running Snapshot in VirtualBox"
tags: 
  - Windows Server
sidebar_position: 5
last_update:
  date: 6/19/2021
---


## Pre-requites 

- [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Download the Windows Server 2019 ISO File.](/docs/004-Windows/001-Windows-Server-in-VirtualBox/002-Windows-Server-Core.md#overview)
- [Create a Windows Server VM in VirtualBox](/docs/004-Windows/001-Windows-Server-in-VirtualBox/002-Windows-Server-Core.md#windows-server-core-no-gui)


## Taking Snapshots

Snapshots allow you to capture the current state of a virtual machine, so you can return to it later. This is useful for testing, making changes, and recovering from issues.

1. To take a snapshot of a virtual machine, go to Machine > Tools > Snapshots. 

2. Then select the VM > Take > Provide a snapshot name > Ok.

    ![](/img/docs/12082024-windows-10-vm-taking-snapshots.png)

3. You should see the snapshot created.

    ![](/img/docs/12082024-windows-10-vm-snapshots-created.png)


## Restoring from Snapshots 

Virtual machines can be restored to a previous state through the use of Snapshots

1. Make sure to turn off the VM first.
2. Select the VM and the snapshot, then click Restore. 
3. Go through the warning message before clicking Restore.

    ![](/img/docs/12082024-windows-10-vm-snapshots-restore-2.png)