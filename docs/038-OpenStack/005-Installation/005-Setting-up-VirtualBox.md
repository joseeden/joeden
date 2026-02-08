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

## Download And Prepare Files

Get the minimal CentOS ISO before starting the VM setup.

1. Download ISO image.
2. Save file locally

Using the minimal ISO keeps installation fast and simple. Having the file ready locally avoids delays during VM creation and keeps the process smooth.

Reference: 

- [CentOS Stream 9 DVD ISO](https://www.centos.org/download/)
- [AlmaLinux 8.10 Minimal ISO](https://almalinux.org/get-almalinux/)

**UPDATE**: Due to compatibility issues with CentOS Stream 9 and 10 and the many problems encountered during installation, I have switched to using AlmaLinux 8.10.

## Create Virtual Machine

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


## Configure the VM 

Select the VM and click **Settings** to configure networking before installation. We need to use two adapters to separate internet access from internal OpenStack lab traffic.


#### Adapter 1 — Bridged Adapter (Internet Access)

This adapter provides internet access and connects your VM directly to your host machine’s network.

| Setting          | Value                       |
| ---------------- | --------------------------- |
| Network Adapter  | Enabled                     |
| Attached To      | Bridged Adapter             |
| Promiscuous Mode | Deny (default)              |

This provides external connectivity for package installation and updates.

- Used for `yum/dnf` installs 
- Keep default NAT settings
- DHCP enabled by default

<div class='img-center'>

<!-- ![](/img/docs/Screenshot-2026-02-08-191048.png) -->

![](/img/docs/Screenshot-2026-02-08-222452.png)

</div>


#### Adapter 2 — Host-Only 

This adapter is dedicated to internal OpenStack networking and lab communication.

| Setting          | Value             |
| ---------------- | ----------------- |
| Network Adapter  | Enabled           |
| Attached To      | Host-Only Adapter |
| Promiscuous Mode | Deny              |

This setup allows the VM and host to communicate internally.

- Used for host ↔ VM communication
- Used for Packstack internal networking and testing
- No internet access required

**Notes**

- Promiscuous mode not needed for single-node Packstack labs
- NAT + Host-Only keeps internet separate from OpenStack traffic
- Avoid Bridged mode unless external network testing is required

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-191113.png)

</div>

#### System 

Go to **System** and ensure that Optical is set as the first boot device. You can click the arrow keys beside it to move the device.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-051455.png)

</div>

#### Storage 

1. In **Storage**, click the plus button, and choose **Optical Drive**:

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-041828.png)

    </div>

2. Select VBoxGuestAdditions.iso and click **Choose.**

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-041921.png)

    </div>

3. Make sure there are two devices under **Controller: SATA.** 

    Enable both options below:

    ✅ Hot-pluggable
    ✅ Live CD/DVD

    Then click **OK.**

    <div class='img-center'>

    <!-- ![](/img/docs/Screenshot-2026-02-08-042025.png) -->
    ![](/img/docs/Screenshot-2026-02-08-043223.png)

    </div>



## Start the VM

Start the machine and complete the installation using the GUI installer.

**Note:** If you get a `No bootable medium found` error, please see [Manually Load ISO.](#manually-load-iso)

1. Select a language and click **Done.** 

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-192103.png)

    </div>

2. Click **Installation Destination**

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

6. In the main menu, click **Security Policy** and then disable it for now.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-02-08-053802.png)

    </div>

7. Before proceeding to the next step, you need to get the IP of your host machine (not the VM).

    Open command prompt and run:

    ```bash
    ipconfig 
    ```

    This returns you host network info. For example:

    ```bash
    Ethernet adapter Ethernet:

      Connection-specific DNS Suffix  . :
      IPv4 Address. . . . . . . . . . . : 192.168.1.9
      Subnet Mask . . . . . . . . . . . : 255.255.255.0
      Default Gateway . . . . . . . . . : 192.168.1.1

    Wireless LAN adapter Wi-Fi:

      Connection-specific DNS Suffix  . :
      IPv4 Address. . . . . . . . . . . : 192.168.1.8
      Subnet Mask . . . . . . . . . . . : 255.255.255.0
      Default Gateway . . . . . . . . . : 192.168.1.1
    ```

    Since we are using a host-only adapter mode, the VM will need to be assigned a static IP that is in the same range as your host machine.  
    
    We'll use this configuration for the VM in the next step:

    ```bash
    IP Address: 192.168.1.130   (must be unused)
    Subnet:     255.255.255.0
    Gateway:    192.168.1.1
    DNS:         8.8.8.8
    ```


8. In the main menu, click **Network and Hostname**. There should be two interface here.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-192519.png)

    </div>

    The interfaces:

    - `enp0s3` is the first adapter, usually NAT or bridged, used for the main network.
    - `enp0s8` is the second adapter and can be ignored if not needed.

    For a simple lab setup, you only need one active interface to connect the VM to your network. Typically, you use `enp0s3`.

    - Set the host name > **Apply**
    - Enable the Ethernet interface (enp0s3)

        <div class='img-center'>
        
        ![](/img/docs/Screenshot2026-02-08194748.png)
        
        </div>
        
    - Click **Configure**

      <div class='img-center'>
      
      ![](/img/docs/Screenshot2026-02-08054752.png)
      
      </div>
    
9. For the configuration, we'll use this:

    ```bash
    IP Address: 192.168.1.130   (must be unused)
    Subnet:     255.255.255.0
    Gateway:    192.168.1.1
    DNS:         8.8.8.8
    ```

    <div class='img-center'>
    
    ![](/img/docs/Screenshot-2026-02-08-225018.png)
    
    </div>

    Click **Save**. The interface should show as **Connected** with its details displayed.

    <div class='img-center'>
    
    ![](/img/docs/Screenshot-2026-02-08-195936.png)
    
    </div>
    


10. Finally, set the root password and create another user.

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
    
11. Back in the main menu, click **Begin Installation**

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-200109.png)

    </div>

12. The installation will proceed and may take a few minutes. Once it’s complete, click **Reboot System**.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-08-201744.png)

    </div>


## Verify Network Connectivity

Log in to the VM as root using the password you set during installation.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-202302.png)

</div>


Check interface status using the interface name `enp0s3`.

```bash
ip a show enp0s3
```

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-202636.png)

</div>


Test connectivity to the configured gateway: 

```bash
ping -c 3 192.168.1.1
```

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-09-002443.png)

</div>


Test DNS and internet access:

```bash
ping -c 3 8.8.8.8
ping -c 3 www.google.com
```

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-09-002536.png)

</div>



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


### Kernel Panic 

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

Note that if disable EFI, you may hit the [kernel panic](#kernel-panic) issue (again). At this point, the better option would be to use a different ISO. Here are some alternatives:

- CentOS Stream 9
- AlmaLinux 10
- AlmaLinux 8


