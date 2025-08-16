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

- Each node is assigned a fixed IPv4 address for network communication
- The lab network uses 192.168.1.0/24 to match the existing DNS resolver
- Ubuntu 18.04 is used as the client operating system

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

### Download and Install Ubuntu

We need to install Ubuntu on a virtual machine to act as the DNS client.

1. Download Ubuntu 18.04 LTS desktop ISO from the official website
2. Create a new VirtualBox VM named `dns-client`
3. Assign 4GB memory and 40GB disk space
4. For disk space, use dynamically allocated storage

### Configure the VM

Once installed, adjust the settings to allow the VM to boot correctly and communicate with other lab nodes.

- **Boot order**: Set optical disk first and disable floppy
- **Storage**: Attach the downloaded Ubuntu ISO
- **Network**: Use a bridged adapter to match lab network

### Install Guest Additions

Enhance the VM performance and enable extra features.

- Insert Guest Additions CD from VirtualBox menu
- Install required packages using the terminal:

    ```bash
    sudo apt-get update -y && sudo apt-get install -y virtualbox-guest-utils virtualbox-guest-dkms
    sudo reboot
    ```

After reboot, enable full-screen mode from the View menu


### Set Hostname

Give the VM a meaningful hostname for identification.

```bash
sudo hostnamectl set-hostname dns-client
hostname
```

The hostname `dns-client` will be displayed in the terminal, which will make it easy to identify.

### Configure IP Address

Assign the client a static IP as per the lab plan.

- Check current interfaces first:

    ```bash
    ifconfig
    ```

- Assign static IP `192.168.1.10`:

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
