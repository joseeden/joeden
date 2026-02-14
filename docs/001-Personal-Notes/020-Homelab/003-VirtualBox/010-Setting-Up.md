---
title: "Setting up"
tags: 
- DevOps
- Virtualization
- Personal Notes
- Development
sidebar_position: 10
last_update:
  date: 11/22/2023
---


## Overview 

This page outlines the steps to setup a minimal system using a simple virtual machine working network access.

1. Download minimal iso 
2. Create virtual machine
3. Configure network settings
4. Install and verify system

VirtualBox releases updates every couple of years so it's best  to rely on the official documentation on how to install VirtualBox.

For more information, please see [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)

## Download And Prepare Files

Get the minimal ISO before starting the VM setup.

1. Download ISO image.
2. Save file locally

Using the minimal ISO keeps installation fast and simple. Having the file ready locally avoids delays during VM creation and keeps the process smooth.

Reference: 

- [CentOS Stream 9 DVD ISO](https://www.centos.org/download/)
- [AlmaLinux 8.10 Minimal ISO](https://almalinux.org/get-almalinux/)

**UPDATE**: Due to compatibility issues with CentOS Stream 9 and 10 and the many problems encountered during installation, I have switched to using AlmaLinux 8.10.

## Create the Virtual Machine

### Name and Operating System

1. Open VirtualBox and click **New** 
2. Set the VM name, the VM folder, and the ISO image

**UPDATE**: Due to compatibility issues with CentOS Stream 9 and 10 and the many problems encountered during installation, I have switched to using AlmaLinux 8.10.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-014814.png)

</div>

### Unattended Install

1. Set the username and password
2. Enable the **Guest Additions**
3. Select the **VBoxGuestAdditions.iso**

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-015338.png)

</div>

### Hardware 

When creating a VM, the amount of memory and CPU you assign depends on your **host machine’s resources** and the expected workload inside the VM.

- If your host has limited RAM, assign less memory to the VM
- Note that lesser memory may affect performance.
- Adjust CPU, memory, and disk size based on the type of lab

Recommended VM specifications (general guidance):

| Host RAM | Recommended VM RAM | vCPU | Disk     | Swap   |
| -------- | ------------------ | ---- | -------- | ------ |
| 8 GB     | 2–4 GB             | 1–2  | 20 GB    | 2 GB   |
| 16 GB    | 4–8 GB             | 2–4  | 30–40 GB | 2–4 GB |
| 32 GB    | 8–12 GB            | 4–6  | 40–60 GB | 4–6 GB |
| 64 GB    | 12–16 GB           | 6–8  | 60–80 GB | 4–8 GB |

Notes:

- VirtualBox memory is entered in MB (e.g., 12 GB = 12288 MB).
- More RAM → smoother performance and faster response inside the VM.
- Adjust disk size based on the number of images, software, or lab instances
- Swap is optional but recommended for Linux VMs with smaller RAM allocations.

For a general lab, you might allocate **12 GB RAM and 6 vCPU** for a single VM:

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-021603.png)

</div>

### Hard Disk

For the **Hard Disk**, select **Create a Virtual Hard Disk Now.**

1. The hard disk file location will be auto-selected.
2. Set the disk size according to the table above.
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


## Configure the VM Hardware

Select the VM and click **Settings** to configure networking before installation. 

### Network 

You can assign a single network adapter or multiple adapters to your VM, depending on your lab requirements.

- For general VM setup, a single adapter (NAT) is often sufficient.
- For advanced labs or multi-VM setups, multiple adapters can be used (e.g., NAT + Host-Only, Bridged + Host-Only).

For detailed guidance on network configurations and all common adapter combinations, see the [VirtualBox Networking.](/docs/001-Personal-Notes/020-Homelab/003-VirtualBox/013-Networking.md)

### System 

Go to **System** and ensure that Optical is set as the first boot device. You can click the arrow keys beside it to move the device.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-051455.png)

</div>

### Storage 

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



## Launch VM and Install OS

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
    - Enable the Ethernet interface (enp0s3) and click **Configure**

        <div class='img-center'>
        
        ![](/img/docs/Screenshot2026-02-08194748.png)
        
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

<div>

![](/img/docs/Screenshot-2026-02-08-202302.png)

</div>


Check the status for the interface `enp0s3` and confirm there's a route to the gateway:

```bash
ip a show
ip route
```

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-08-202636.png)

</div>


Test connectivity to the gateway: 

```bash
ping -c 3 192.168.1.1
```

<div>

![](/img/docs/Screenshot-2026-02-09-002443.png)

</div>


Test DNS and internet access:

```bash
ping -c 3 8.8.8.8
ping -c 3 www.google.com
```

<div>

![](/img/docs/Screenshot-2026-02-09-002536.png)

</div>

