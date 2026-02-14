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

