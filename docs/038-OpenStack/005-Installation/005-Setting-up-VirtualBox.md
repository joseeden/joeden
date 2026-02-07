---
title: "Setting up VirtualBox"
description: "Setting up VirtualBox"
tags: 
- Cloud
- DevOps
- OpenStack
- VirtualBox
sidebar_position: 5
last_update:
  date: 9/15/2023
---

## Overview

The goal is to set up a minimal system that uses a simple CentOS virtual machine with working network access.

1. Download Centos minimal iso 
2. Create virtual machine
3. Configure network settings
4. Install and verify system

## 1. Download And Prepare Files

Get the minimal CentOS ISO before starting the VM setup.

1. Download minimal iso image  
2. Save file locally

Using the minimal ISO keeps installation fast and simple. Having the file ready locally avoids delays during VM creation and keeps the process smooth.

Reference: [CentOS website.](https://www.centos.org/download/)

## 2. Create Virtual Machine

Create a VM with enough resources so CentOS runs properly.

#### Name and Operating System

1. Open VirtualBox and click **New** 
2. Set the VM name, the VM folder, and the ISO image
3. Set the type to **Linux**

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-014814.png)

</div>

#### Unattended Install

1. Set the username and password
2. Enable the **Guest Additions**
3. Select the **VBoxGuestAdditions.iso**

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-015338.png)

</div>

#### Hardware and Hard Disk

The amount of memory you can allocate to your VM depends on how much RAM your host machine has.
If your system has limited RAM, you can assign less memory to the VM, but overall performance may be affected.

Below are the recommended VM specifications for single-node OpenStack labs (Packstack) based on different host RAM sizes:

| Host RAM | Recommended VM RAM | vCPU | Disk     | Swap   |
| -------- | ------------------ | ---- | -------- | ------ |
| 8 GB     | 4–6 GB             | 2    | 20–30 GB | 2–4 GB |
| 16 GB    | 6–8 GB             | 2–4  | 30–40 GB | 2–4 GB |
| 32 GB    | 8–12 GB            | 4–6  | 40–60 GB | 4–6 GB |
| 64 GB    | 12–16 GB           | 6–8  | 60–80 GB | 4–8 GB |


**Notes:**

- Base memory in VirtualBox is in MB, e.g. 12 GB = 12288 MB.
- These are for **single-node OpenStack labs (Packstack)**.
- More RAM → smoother install and better performance when running test instances.
- Disk sizes can be adjusted depending on how many OpenStack images/instances you plan to create.

In my case, I allocated 12 GB RAM and 6 vCPU:

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-021603.png)

</div>

For the **Hard Disk**, select **Create a Virtual Hard Disk Now.**

1. The hard disk file location will be auto-selected.
2. Set the disk szie according to the table above.
3. Enable **Dynamically allocated** (if there is an option)

Note that VirtualBox skips the “dynamically allocated vs fixed” option in some flows if the VM wizard detects certain defaults (sometimes depends on VirtualBox version or OS type). 

:::info 

Not pre-allocating lets VirtualBox grow the disk file as needed (if you wanted to change VM size later)

:::

Once you're okay with the specs, click **Finish.**

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-024348.png)

</div>

You should now see the new VM created.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-025115.png)

</div>

:::info["Cant run guest install"]

It means that CentOS Stream 10 (or CentOS 10) is too new for VirtualBox to recognize for unattended installation. The unattended install feature only supports certain Windows versions and a limited set of Linux distributions.

This does **not** affect the normal operation of the VM, it only impacts automatic Guest Additions installation.

You can safely ignore this for now and install Guest Additions manually later.

:::


## 3. Configure VirtualBox Network

Select the VM and click  **Settings** to adjust the VM network before installation.

1. Click **Adapter 1** and toggle **Enable Network Adapter**.
2. Use **Bridged Adapter** mode
3. Enable promiscuous mode: **Allow All**
4. Click **OK**

Bridged mode allows the VM to behave like a normal device on the network. Promiscuous mode helps with traffic visibility when needed in lab environments.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-030003.png)

</div>


## 4. Install CentOS System

Start the machine and complete the installation using the GUI installer.

**Note:** If you get 

1. Select language and timezone
2. Configure disk partitioning
3. Disable kdump
4. Disable security policy
5. Set root password
6. Configure static ip address

Automatic partitioning is fine for most labs. A static IP keeps the system reachable and predictable. Disabling unused features helps keep the setup simple and lightweight.

## 5. Verify Network Connectivity

Log in as root and confirm the interface `enp0s3` is working correctly.

Check interface status using the interface name `enp0s3`.

```bash
ip a show enp0s3
```

Expected result shows the interface is UP and has the configured IP address.

Test connectivity to the gateway `192.168.0.1`.

```bash
ping -c 3 192.168.0.1
```

Expected result shows successful replies from the gateway.

Test DNS and internet access using `google.com`.

```bash
ping -c 3 google.com
```

Expected result shows successful replies which confirms DNS and internet connectivity.

Successful checks confirm the CentOS VM is running with network access and the base setup is complete for lab use.
