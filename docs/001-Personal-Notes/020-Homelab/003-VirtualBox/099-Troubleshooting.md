---
title: "Troubleshooting"
tags: 
- DevOps
- Virtualization
- Personal Notes
- Development
sidebar_position: 99
last_update:
  date: 11/22/2023
---


## VirtualBox Conflicts with WSL 

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


## Reconfigure Interface 

If your host machine suddenly changes internet connections, the gateway may change. This can affect the VM if it was previously configured with static network settings or tied to the old adapter.

To fix this:

1. From your host machine's terminal, check the new gateway and interface being used.

    - **Linux / macOS**

        ```bash
        ip route | grep default
        route -n
        ```

    - **Windows (PowerShell / CMD)**

        ```powershell
        ipconfig
        ```

        :::info 

        Do not check the host machine's configuration from WSL since WSL uses a virtual network interface that may not reflect the actual host network configuration.

        Better to check from Powershell or Command Prompt.

        :::

    Take note of:

    - active network adapter
    - default gateway
    - subnet


2. Verify VirtualBox Network Adapter

    ```
    VirtualBox Manager → VM → Settings → Network
    ```

    Check:

    - Adapter type (NAT / Bridged / Host-only)
    - If Bridged → confirm it’s mapped to the **current active host adapter**
    - Example: WiFi changed from Ethernet

    If unsure:

    - Temporarily switch to **NAT**
    - Start VM and test connectivity


3. Check VM Network Interface

    Inside AlmaLinux VM:

    ```bash
    ip a
    ```

    Verify interface name:

    - Usually `enp0s3`, `enp0s8`, or similar

    Check routes:

    ```bash
    ip route
    ```


4. Update Gateway (if static IP configured)

    Edit connection:

    ```bash
    nmcli connection show
    ```

    Modify gateway:

    ```bash
    sudo nmcli connection modify <connection-name> ipv4.gateway <new-gateway>
    sudo nmcli connection up <connection-name>
    ```

    Or if using config file:

    ```bash
    sudo vi /etc/sysconfig/network-scripts/ifcfg-<interface>
    ```

    Update:

    ```
    GATEWAY=<new-gateway>
    ```

    Restart network:

    ```bash
    sudo systemctl restart NetworkManager
    ```

5. Test Connectivity

    ```bash
    ping -c 3 8.8.8.8
    ping -c 3 google.com
    ```


## Manually Load ISO

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


## Kernel Panic 

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

## Warning: deprecated hardware is detected: `x86_64-v2`

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

Note that if disable EFI, you may hit the [kernel panic](#kernel-panic) issue (again). At this point, the better option would be to use a different ISO. 

If you are using CentOS Stream 10, you can use some alternatives:

- CentOS Stream 9
- AlmaLinux 10
- AlmaLinux 8

