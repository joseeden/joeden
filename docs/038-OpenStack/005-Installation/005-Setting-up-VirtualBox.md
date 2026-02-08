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

1. Download ISO image.
2. Save file locally

Using the minimal ISO keeps installation fast and simple. Having the file ready locally avoids delays during VM creation and keeps the process smooth.

Reference: 

- [CentOS Stream 9 DVD ISO](https://www.centos.org/download/)
- [AlmaLinux 8.10 Minimal ISO](https://almalinux.org/get-almalinux/)

**UPDATE**: Due to compatibility issues with CentOS Stream 9 and 10 and the many problems encountered during installation, I have switched to using AlmaLinux 8.10.

## 2. Create Virtual Machine

Create a VM with enough resources so CentOS runs properly.

#### Name and Operating System

1. Open VirtualBox and click **New** 
2. Set the VM name, the VM folder, and the ISO image

**UPDATE**: Due to compatibility issues with CentOS Stream 9 and 10 and the many problems encountered during installation, I have switched to using AlmaLinux 8.10.

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

:::info[Can't run guest install]

It means that CentOS Stream 10 (or CentOS 10) is too new for VirtualBox to recognize for unattended installation. The unattended install feature only supports certain Windows versions and a limited set of Linux distributions.

This does **not** affect the normal operation of the VM, it only impacts automatic Guest Additions installation.

You can safely ignore this for now and install Guest Additions manually later.

:::


## 3. Configure the VM 

Select the VM and click  **Settings** to adjust the VM network before installation.

1. In **Adapter 1**, **Enable Network Adapter**.
2. Use **NAT** mode

    - Purpose → `yum/dnf` install packages
    - Leave everything default
    - DHCP enabled

3. Enable promiscuous mode: **Allow All**.
4. Click **OK**



Promiscuous mode helps with traffic visibility when needed in lab environments.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-030003.png)

</div>

Additionally, go to **Storage** click the plus button, and choose **Optical Drive**:

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-041828.png)

</div>

Select VBoxGuestAdditions.iso and click **Choose.**

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-041921.png)

</div>

Make sure there are two devices under **Controller: SATA.** 

Enable both options below:

✅ Hot-pluggable
✅ Live CD/DVD

Then click **OK.**

<div class='img-center'>

<!-- ![](/img/docs/Screenshot-2026-02-08-042025.png) -->
![](/img/docs/Screenshot-2026-02-08-043223.png)

</div>

**UPDATE:** Go to **System** and ensure that Optical is set as the first boot device. You can click the arrow keys beside it to move the device.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-051455.png)

</div>


## 4. Start the VM

Start the machine and complete the installation using the GUI installer.

**Note:** If you get a `No bootable medium found` error, please see [Manually Load ISO.](#manually-load-iso)

1. Select language and timezone
2. Click **Installation Destionation**
3. Select the **ATA VBOX Disk** and click **Custom**, then **Done.**

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-052619.png)

    </div>

4. In **Manual Partitioning** -> *Click here to create them automatically*.   

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-052850.png)

    </div>

    This will show the three partitions that will be created. Click **Done.**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot-2026-02-08-053042.png)
    
    </div>

    Click **Accept changes.**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-02-08-053231.png)
    
    </div>
    
    

5. Back in the main menu, click **KDUMP.** 

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-053413.png)

    </div>

    kdump is a kernel mechanism which consume some system memory, which we don't want.

    Disable the kdump feature and click **Done.**

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-053618.png)

    </div>

9. In the main menu, click **Security Policy** and then disable it for now.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-02-08-053802.png)

    </div>

10. Before proceeding to the next step, you need to get the IP of your host machine (not the VM).

    Open command prompt and run the following:

    ```bash
    ipconfig 
    ```

    This returns you host network info. For example:

    ```bash
    Wireless LAN adapter Wi-Fi:

      Connection-specific DNS Suffix  . :
      Link-local IPv6 Address . . . . . : fe80::1995:67ee:8433:7919%13
      IPv4 Address. . . . . . . . . . . : 192.168.1.24
      Subnet Mask . . . . . . . . . . . : 255.255.255.0
      Default Gateway . . . . . . . . . : 192.168.1.254
    ```

    Since we are using a bridged adapter mode, the VM will need to be assigned a static IP that is in the same range as your host machine.  We'll use this configuration for the VM:

    ```bash
    IP Address: 192.168.1.200   (must be unused)
    Subnet:     255.255.255.0
    Gateway:    192.168.1.254
    DNS:        192.168.1.254 or 8.8.8.8
    ```


11. In the main menu, click **Network and Hostname**

    - Set the host name > **Apply**
    - Enable the Ethernet interface (enp0s3)
    - Click **Configure**

      <div class='img-center'>
      
      ![](/img/docs/Screenshot2026-02-08054752.png)
      
      </div>
      


12. Finally, set the root password and create another user.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-02-08054025.png)

    </div>
    
    Provide a root password and click **Done.**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-02-08054125.png)
    
    </div>

    As best practice, create another admin user:

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-02-08054329.png)
    
    </div>
    
    
    


11. Configure static ip address

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


## Troubleshooting

### Manually Load ISO

If you get this error when you start the VM for the first time:

```bash
The virtual machine failed to boot. That might be caused by a missing operating system or misconfigured boot order. Mounting an operating system install DVD might solve this problem. Selecting an ISO file will attempt to mount it after the dialog is closed. 
```

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-031425.png)

</div>

You can try to select the ISO file from the dropdown meny and click **Mount and Retry Boot**

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-031546.png)

</div>

Choose **Install CentOS Stream 10** and click Enter.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-031714.png)

</div>

It should go through the bootup process now.

If it shows this error, it means its hitting a **kernel panic.** 

See next section.

```bash
[ end Kernel panic - not syncing: Attempted to kill init! exit code=0x00007f00 ] -- 
```


### Kernet Panic 

If you get this error when booting up the VM for the first time,  you are hitting a kernel panic.

This usually means the VM tried to boot the kernel from the ISO but something went wrong at the very early stage of the OS startup

```bash
[ end Kernel panic - not syncing: Attempted to kill init! exit code=0x00007f00 ] -- 
```

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-033540.png)

</div>

Troubleshooting:

1. Make sure the ISO matches the VM architecture: x86_64 (64-bit).
2. Go to Settings → System → Motherboard → Enable EFI (special OSes only).
    
    - This is usually off for CentOS Stream 10.

3. Go to Settings → System → Processor → Enable PAE/NX → enable it.
4. Go to Settings → System → Acceleration → Enable the following:

    - VT-x/AMD-V (if its an option)
    - Nested Paging

It should boot successfully now. 

### Warning: deprecated hardware is detected: `x86_64-v2`

Enabling EFI may change how the CPU is exposed to the guest. The VM is reporting a CPU level (x86-64-v3) that the guest `glibc` library doesn’t understand, which causes the fatal error.

This is a common issue with Linux kernels on VirtualBox when EFI is enabled unnecessarily.

1. EFI is not required for CentOS Stream 10 on VirtualBox.
2. When EFI is enabled, VirtualBox exposes advanced CPU features to the guest (x86-64-v2, v3, etc.).
3. Some older Linux userspace libraries (`glibc`) don’t support these features 

To fix this:

1. Disable EFI in VM settings:

    ```bash
    Settings → System → Motherboard → Uncheck “Enable EFI (special OSes only)”
    ```

2. Ensure PAE/NX is enabled:

    ```bash
    Settings → System → Processor → Enable PAE/NX
    ```

3. Boot the VM again from your ISO.

Note that if disbale EFI, you may hit the [kernel panic](#kernet-panic) issue (again). At this point, the better option would be to use a different ISO: Here are some alternatives:

- CentOS Stream 9
- AlmaLinux 10
- AlmaLinux 8


