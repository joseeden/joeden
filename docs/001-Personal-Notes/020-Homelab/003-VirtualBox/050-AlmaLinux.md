---
title: "AlmaLinux Versions"
tags: 
- DevOps
- Virtualization
- Personal Notes
- Development
sidebar_position: 50
last_update:
  date: 11/22/2023
---


## Creating a VM 

You can create a VirtualBox VM using an AlmaLinux 9 Minimal ISO, which is suitable for most general lab environments and server-based testing.

During creation, you can configure the VM name, OS type, memory, CPU, and disk according to your lab requirements.

For more information, please see [Setting Up.](/docs/001-Personal-Notes/020-Homelab/003-VirtualBox/010-Setting-Up.md)


## Network Configuration: v8 vs v9

AlmaLinux 8 uses **legacy network-scripts**, while AlmaLinux 9 uses **NetworkManager*- with `.nmconnection` files. Because of this change, some familiar settings (like `BOOTPROTO`) no longer exist in EL9 systems.

**Configuration File Locations:**

| Version     | Configuration Location                                  |
| ----------- | ------------------------------------------------------- |
| AlmaLinux 8 | `/etc/sysconfig/network-scripts/ifcfg-*`                |
| AlmaLinux 9 | `/etc/NetworkManager/system-connections/*.nmconnection` |

**Common Setting Differences:**

| AlmaLinux 8      | AlmaLinux 9      | Description             |
| ---------------- | ---------------- | ----------------------- |
| `BOOTPROTO=dhcp` | `method=auto`    | DHCP configuration      |
| `BOOTPROTO=none` | `method=manual`  | Static IP configuration |
| `IPADDR`         | `address1=`      | Static IP address       |
| `PREFIX`         | `/xx` in address | Network prefix          |
| `GATEWAY`        | `gateway=`       | Default gateway         |
| `DNS1`           | `dns=`           | DNS server              |

Example mapping:

- AlmaLinux 8:

    ```bash
    BOOTPROTO=none
    IPADDR=192.168.1.130
    PREFIX=24
    GATEWAY=192.168.1.1
    DNS1=8.8.8.8
    ```

- AlmaLinux 9:

    ```ini
    [ipv4]
    address1=192.168.1.130/24
    gateway=192.168.1.1
    dns=8.8.8.8;
    method=manual
    ```

**Notes**

- `BOOTPROTO` is deprecated in AlmaLinux 9.
- NetworkManager manages all interfaces by default.
- Static IP configuration uses `method=manual`.
