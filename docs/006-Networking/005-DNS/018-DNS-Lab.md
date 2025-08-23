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
- Ubuntu 18.04 Desktop is used as the client OS
- Ubuntu 18.04 Server is used the DNS Server OS

**NOTE:** The network `192.168.1.0/24` is used because `192.168.1.1` is the private IP of my actual home router, which also functions as the DNS resolver. If your setup is different, adjust the IP address plan to match your own DNS resolver.


## Recommended Hardware

Recommended:

- 16GB RAM
- 200GB disk space

VirtualBox is used to create virtual machines for this lab

## Pre-requisites 

### Install VirtualBox

VirtualBox is a free hypervisor used to run virtual machines for the lab.

1. Download VirtualBox from Oracle's website
2. Choose the package for your operating system
3. Follow the installation wizard and accept default settings
4. Reboot the system after installation

### Creating the VM

We need to create the VM machines and install the correct Ubuntu on them.

1. Download the following ISO file from the [official website](https://ubuntu.com/download/desktop)

    | VM         | Operating System         |
    | ---------- | ------------------------ |
    | DNS Client | Ubuntu 18.04 LTS Desktop |
    | DNS Server | Ubuntu 18.04 LTS Server  |


2. In VirtualBox, create a new VirtualBox VM named `dns-client`

    :::info 

    Perform the steps 2 to 5 for all the VMs.

    Make sure to choose the correct ISO file for each VM.

    :::

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-020906.png)

    </div>

3. Set the username and password.

    Then check the box for **Guest Additions** and choose the downloaded ISO file.

    :::info
    
    Make sure to choose the correct ISO image.

    :::


    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-021006.png)

    </div>

4. Assign 4GB memory (4096 MB) and 40 GB hard disk space. 

    

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-021218.png)

    </div>

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18021325.png)

    </div>

5. Click **Finish**. The VM will now try to power on.


### Install Ubuntu 

Go through the setup process:

1. Choose your language
2. Select your keyboard layout
3. Create your account
4. Select your timezone
- Other steps 

### Configure the VM Settings 

:::info 

Perform the steps below for all the VMs.

:::

Once Ubuntu is installed, adjust the settings to allow the VM to boot correctly and communicate with other lab nodes. Right-click on the VM and click **Settings**

1. **General**: Choose Birectional for both Shard Clipboard and Drag'n'Drop 

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-18-000351.png)

    </div>

2. **System**: Set optical disk first and disable floppy

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-223001.png)

    </div>


2. **Storage**: Attach the downloaded Ubuntu ISO

    :::info 

    The DNS Client and DNS Server uses different ISO files

    :::

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-232822.png)

    </div>

   

4. **Network**: Use a bridged adapter to match lab network

    <div class="img-center"> 

    ![](/img/docs/Screenshot-2025-08-17-233149.png)

    </div>

5.  Finally, click **Ok**. When prompted, click **Keep changes.**




## Setting Up the DNS Client

We will start with setting up a DNS client using Ubuntu Linux. The client will be used to test DNS queries within the lab.


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


    **NOTE:** The Guest Additions ISO is a read-only CD image, so Linux mounts it as read-only. The output below just tells you that you cannot write to the ISO, which is fine; you only need to read and execute the installer from it.

    ```bash
    WARNING: source write-protected, mounted read-only
    ```

4. Install required packages using the terminal:

    :::info 

    Copy-paste doesn't work (yet) so you'll have to type the commands on the terminal inside the VM.

    :::

    ```bash
    sudo apt update -y 
    sudo apt install -y virtualbox-guest-utils \
        build-essential \
        linux-headers-$(uname -r) \
        dkms gcc make perl
    sudo /mnt/VBoxLinuxAdditions.run
    ```

    If you get a message like:

    ```bash
    Look at /var/log/vboxadd-setup.log to find out what went wrong 
    ```

    Then its possible you encountered a Kernel issue, which could be any of these:

    - Missing kernel headers or `build-essential` tools
    - Mismatch between VirtualBox version and Guest Additions
    - Old or conflicting Guest Additions already installed

    You can check the logs for more details:

    ```bash
    cat  /var/log/vboxadd-setup.log
    ```


5. If there are no issues, reboot the machine:

    ```bash
    sudo reboot 
    ```

6. After reboot, enable full-screen mode from the View menu

### Shared Clipboard and Drag-Drop

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


### Configure the VM

1. In the terminal, run `hostnamectl` to give the VM a name:

    ```bash
    sudo hostnamectl set-hostname dns-client
    hostname
    ```


2. Next, check current interfaces:

    ```bash
    ifconfig
    ```

    Sample output:

    ```bash
    enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
            inet 192.168.1.10  netmask 255.255.255.0  broadcast 192.168.1.255

    lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
            inet 127.0.0.1  netmask 255.0.0.0
    ```

    If `ifconfig` is not yet installed, run:

    ```bash
    sudo apt install net-tools 
    ```


3. Assign static IP `192.168.1.10`:

   ```bash
    sudo ifconfig enp0s3 192.168.1.10 netmask 255.255.255.0
    ifconfig enp0s3
    ```

4. Set the client to query the lab's cache-only DNS server. To do this, edit `/etc/resolv.conf`:

    ```bash
    sudo vi /etc/resolv.conf
    ```

2. Add the following line:

    ```
    nameserver 192.168.1.254
    ```

- Remove any `search` entries and save the file

This setup ensures the client is fully ready to test DNS resolution within the simulated lab environment.



## Setting Up a DNS Cache Server

The DNS cache server helps the client resolve domain names faster by storing previous queries and forwarding requests as needed.

- Forwards public queries to the DNS resolver
- Forwards internal queries to authoritative servers
- Caches responses to reduce repeated queries

The cache server improves network efficiency by answering repeated requests locally while still forwarding new queries.

### Installing the Server

Steps:

1. Download the Ubuntu 18.04 LTS Server ISO from the [official website](https://ubuntu.com/download/desktop)
2. Create a VirtualBox VM with Linux, 64-bit, 4GB RAM, 50GB disk
3. Disable unnecessary devices like floppy and audio
4. Assign a bridged network adapter

After installation:

```bash
sudo apt update -y
sudo apt install bind9 bind9utils -y
dpkg -s bind9 | more
```

This confirms BIND9 is installed and ready.

### Configure Network Interface

Check interfaces: 

```bash 
ifconfig
```

Assign the IP address:

```bash
sudo ifconfig ens0 192.168.1.254 netmask 255.255.255.0
```

Verify assignment: 

```bash 
ifconfig ens0
```

This ensures the server can communicate with clients and forwarders.

### Configuring BIND

BIND is the software that runs a DNS server. It handles queries from clients, forwards requests, and stores DNS records. Basically, it makes your server act as a DNS cache or authoritative server.

BIND uses configuration files to control its behavior and zones:

- `/etc/bindnamed.conf`
- `/etc/bindnamed.conf.options`
- `/etc/bindnamed.conf.local`

Start with editing the options file:

```bash
sudo vi /etc/bind/named.conf.options
```

Define ACL for trusted clients:

```bash
acl "trusted" { 192.168.1.0/24; };
recursion yes;
allow-query { localhost; trusted; };
allow-query-cache { localhost; trusted; };
allow-recursion { localhost; trusted; };
forwarders { 192.168.1.1; };
forward only;
```

Configure internal zone:

```bash
sudo vi /etc/bind/named.conf.local
```
```bash
zone "intranet.local" {
  type forward;
  forwarders { 192.168.1.100; 192.168.1.101; };
  forward only;
};
```

Verify configuration:

```bash
sudo named-checkconf /etc/bind/named.conf
sudo systemctl restart bind9
sudo systemctl status bind9
```

### Testing the Cache Server

Check server is listening on port 53:

```bash
sudo netstat -tulnp | grep 53
```

Capture traffic while querying from client:

```bash
sudo tcpdump -i any port 53
dig example.com
```

Notes: 

- First query forwards to resolver, second query uses cached response
- Clear cache: `sudo rndc flush` to test fresh forwarding again

### Best Practices

- Use ACLs to restrict access to trusted clients
- Comment configuration options for clarity
- Avoid chaining forwarders to prevent delays and failures

A properly configured DNS cache server reduces repeated queries, forwards new requests efficiently, and ensures faster, reliable name resolution.
