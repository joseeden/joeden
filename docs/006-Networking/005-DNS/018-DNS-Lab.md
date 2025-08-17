---
title: "DNS Lab"
description: "DNS Lab"
tags: 
- Networking
- Cybersecurity
sidebar_position: 18
last_update:
  date: 1/16/2018
---



## Overview

This lab simulates a typical DNS infrastructure. It includes:

- A client machine to send DNS queries
- A cache-only DNS server that forwards queries to public resolvers
- A public DNS resolver for external lookups
- Two authoritative DNS servers for internal domains

This setup mirrors real DNS infrastructures for practicing both private and public name resolution.

<div class="img-center"> 

![](/img/docs/all-things-network-basics-dns-lab-config.png)

</div>

## Environment

Lab details:

- Each node is assigned a fixed IPv4 address 
- Ubuntu 18.04 is used as the client operating system

**NOTE:** The network `192.168.1.0/24` is used because `192.168.1.1` is the private IP of my actual home router, which also functions as the DNS resolver. If your setup is different, adjust the IP address plan to match your own DNS resolver.


## Recommended Hardware

Recommended:

- 16GB RAM
- 200GB disk space

VirtualBox is used to create virtual machines for this lab

## Install VirtualBox

VirtualBox is a free hypervisor used to run virtual machines for the lab.

1. Download VirtualBox from Oracle's website
2. Choose the package for your operating system
3. Follow the installation wizard and accept default settings
4. Reboot the system after installation

## Setting Up the DNS Client

We will start with setting up a DNS client using Ubuntu Linux. The client will be used to test DNS queries within the lab.

### Install and Configure the VM

We need to install Ubuntu on a virtual machine to act as the DNS client.

1. Download Ubuntu 18.04 LTS desktop ISO from the official website
2. Create a new VirtualBox VM named `dns-client`
3. Assign 4GB memory and 40GB disk space
4. For disk space, use dynamically allocated storage

Once installed, adjust the settings to allow the VM to boot correctly and communicate with other lab nodes.

- **Boot order**: Set optical disk first and disable floppy

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-223001.png)

    </div>


- **Storage**: Attach the downloaded Ubuntu ISO

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-232822.png)

    </div>

    When prompted, click **Keep changes.**

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-232822.png)

    </div>


- **Network**: Use a bridged adapter to match lab network

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-233149.png)

    </div>

- **General**: Choose Birectional for both Shard Clipboard and Drag'n'Drop 

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-000351.png)

    </div>

After configuring the VM, start the VM (Normal start).


### Install Guest Additions

1. On the VM window, click **Devices** → **Insert Guest Additions CD image**

    > If you get the `VERR_PDM_MEDIA_LOCKED`, click **Devices** → **Optical Drives** → **Remove Disk from Virtual Drive. **
    > Then retry  **Devices** → **Insert Guest Additions CD image**

2. Inside the VM, click the **Open apps** icon on the bottom left and open **Terminal**

3. Mount the ISO (if not already):

    ```bash
    sudo mount /dev/cdrom /mnt
    ls -la /mnt
    ```

    You should see:

    ```bash
    autorun.sh
    VBoxLinuxAdditions.run
    ...
    ```

4. Install required packages using the terminal:

    ```bash
    sudo apt update -y 
    sudo apt install -y virtualbox-guest-utils \
        build-essential \
        linux-headers-$(uname -r) \
        dkms 
    sudo /mnt/VBoxLinuxAdditions.run
    sudo reboot
    ```

5. After reboot, enable full-screen mode from the View menu

### Enable Shared Clipboard and Drag-Drop

These settings should already be enabled if you folow the steps in the [Install Guest Additions](#install-guest-additions) step. To verify:

1. On the VM window, click **Devices** → **Shared clipboard** → It should show **Bidirectional**

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-003755.png)

    </div>


2. Click **Devices** → **Drag and Drop** → It should show **Bidirectional**

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-003916.png)

    </div>

3. Open a terminal and run:

    ```bash
    ps aux | grep VBoxClient
    ```

    You should now see:

    ```bash
    VBoxClient --clipboard
    VBoxClient --draganddrop
    VBoxClient --seamless
    VBoxClient --display
    ```
4. If the `ps aux` didn't return the `VBoxClient` processes, you can try:

    ```bash
    # Stop the modules temporarily
    sudo systemctl stop virtualbox-guest-utils

    # Removes the loaded modules.
    sudo rmmod vboxsf vboxvideo vboxguest

    # Re-run the Guest Additions installer
    sudo /mnt/VBoxLinuxAdditions.run

    # Start the services again
    sudo systemctl start virtualbox-guest-utils
    VBoxClient --clipboard
    VBoxClient --draganddrop
    VBoxClient --seamless
    VBoxClient --display
    ```


### Set Hostname

Give the VM a meaningful hostname for identification.

```bash
sudo hostnamectl set-hostname dns-client
hostname
```

The hostname `dns-client` will be displayed in the terminal, which will make it easy to identify.

### Configure Client IP Address

Assign the client a static IP as per the lab plan.

1. Check current interfaces first:

    ```bash
    ifconfig
    ```

    If its not yet installed, run:

    ```bash
    sudo apt install net-tools 
    ```

    Check the interfaces. For example:

    ```bash
    enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 192.168.1.10  netmask 255.255.255.0  broadcast 192.168.1.255

    lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
            inet 127.0.0.1  netmask 255.0.0.0
    ```
2. Assign static IP `192.168.1.10`:

   ```bash
    sudo ifconfig enp0s3 192.168.1.10 netmask 255.255.255.0
    ifconfig enp0s3
    ```

The client now has a fixed IP for predictable network communication in the lab.


### Configure DNS Server

Set the client to query the lab's cache-only DNS server.

- Edit `/etc/resolv.conf`:

    ```bash
    sudo vi /etc/resolv.conf
    ```

- Add the following line:

    ```
    nameserver 192.168.1.254
    ```

- Remove any `search` entries and save the file

This setup ensures the client is fully ready to test DNS resolution within the simulated lab environment.
