---
title: "Manual Installation"
description: "Manual OpenStack Installation in Virtual Machines"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 8
last_update:
  date: 9/15/2023
---

## Overview

OpenStack can be installed manually in a virtual lab. This setup is simple to prepare and lets you experiment with VM sizing and networking before moving to physical servers.

- Use three virtual machines
- Separate traffic using three virtual networks
- Install Linux manually on each node
- Install OpenStack services step by step

Manual installation involves many steps and configuration edits. It may include over a hundred commands. While automation tools can simplify the process, doing it manually helps in understanding the service dependencies and see how components interact.

## Host System Recommendation

For a smooth experience:

| Host Specification | Recommended | Minimum (Limited Performance) |
| ------------------ | ----------- | ----------------------------- |
| RAM                | 16 GB       | 8 GB                          |
| CPU                | 4 cores     | 2 cores                       |

Running the lab on 8 GB RAM is possible but performance will be constrained, especially when launching multiple instances.
 
## Tools Used

#### VirtualBox

VirtualBox is a free hypervisor used to create and manage virtual machines for lab and testing environments.

- Used to create and run the virtual machines
- Available on Windows, macOS, and Linux

Other hypervisors such as Hyper-V, VMware, or KVM can also be used with minor configuration adjustments.

A few notes: 

- The compute node runs inside a VirtualBox VM.
- QEMU is used as the hypervisor
- KVM is not available inside this nested setup

QEMU is fine for learning and testing. It is not intended for production workloads. In real environments, compute nodes use KVM on physical servers.

#### Operating System

This lab uses **Ubuntu Server 22.04.5 LTS**, but other Linux distributions can also be used, including:

- AlmaLinux
- Rocky Linux
- openSUSE

The primary difference between distributions is the **package manager**:

| Distribution Type             | Package Manager |
| ----------------------------- | --------------- |
| Ubuntu / Debian               | `apt`           |
| RHEL-based (AlmaLinux, Rocky) | `dnf` or `yum`  |
| openSUSE                      | `zypper`        |

Most OpenStack configuration files and service concepts remain the same across distributions, although package names and file paths may differ slightly.


## Lab Architecture

The lab uses three VMs to represent a small OpenStack environment.

| Node       | Role                                                                        | vCPUs | RAM   | Disk  |
| ---------- | --------------------------------------------------------------------------- | ----- | ----- | ----- |
| Controller | Runs core OpenStack services (Identity, Image, Networking, Dashboard, etc.) | 2     | 6 GB  | 20 GB |
| Compute    | Runs virtual machine instances (Nova compute service)                       | 1     | 4 GB | 10 GB |
| Storage    | Provides block storage (Cinder with LVM backend)                            | 1     | 4 GB | 20 GB |

Diagram: 

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install.png)

</div>

#### Resource Considerations 

The values below are recommended for stable operation, but adjustments can be made depending on available hardware.

- RAM can be reduced to **2 GB** for Compute/Storage nodes if system resources are limited.
- **Controller node** requires more RAM because it runs multiple services simultaneously.
- Thin disk allocation can be enabled so disk space is consumed only as data is written.

On the Compute node:

- Approximately **0.5 GB RAM** is used by the operating system.
- Each small test instance may consume around **0.5 GB RAM**.
- Less RAM means fewer instances can run concurrently.

On the Storage node:

- Reducing RAM is possible but may impact storage performance.

#### Virtual Networks

Three virtual networks are used to separate traffic.

1. **Management Network**

    - Used for management, tunnel, and storage traffic
    - Configured as Host Only network
    - VMs can talk with each other and with the host machine.

2. **Provider Network**

    - Used for instance traffic
    - Configured as NAT Network
    - Allows instances to reach the outside network.

3. **Internet Network**

    - Provides internet access to all nodes
    - Used for installing packages and updates

      :::info 

      You can experiment with bridged networking if needed, but you may have to adjust IP addressing.

      :::

#### Storage Backend

The storage node uses LVM as the backend.

- Simple to configure
- Suitable for labs and testing

Production environments often use more advanced backends such as Ceph. For learning purposes, LVM keeps the setup simple and focused on OpenStack itself.


#### Neutron Networking Backend

Linux Bridge is easier to configure and suitable for a basic learning environment.

- Linux Bridge agent is used
- Open vSwitch can also be used in other setups

## Installation Checklist

This guide provides a simplified checklist for installing OpenStack in virtual or bare metal environments. 

#### Passwords

| Description                  | Parameter       | Value     |
| ---------------------------- | --------------- | --------- |
| SQL Database 'root' password | MYSQL_ROOT      | openstack |
| 'admin' user password        | ADMIN_PASS      | openstack |
| Cinder database password     | CINDER_DBPASS   | openstack |
| 'cinder' user password       | CINDER_PASS     | openstack |
| Horizon database password    | DASH_DBPASS     | openstack |
| 'demo' user password         | DEMO_PASS       | openstack |
| Glance database password     | GLANCE_DBPASS   | openstack |
| 'glance' user password       | GLANCE_PASS     | openstack |
| Keystone database password   | KEYSTONE_DBPASS | openstack |
| Metadata secret              | METADATA_SECRET | openstack |
| Neutron database password    | NEUTRON_DBPASS  | openstack |
| 'neutron' user password      | NEUTRON_PASS    | openstack |
| Nova database password       | NOVA_DBPASS     | openstack |
| 'nova' user password         | NOVA_PASS       | openstack |
| 'placement' user password    | PLACEMENT_PASS  | openstack |
| RabbitMQ password            | RABBIT_PASS     | openstack |

#### Firewall and Common Ports

| Service                      | Port            |
| ---------------------------- | --------------- |
| Horizon Dashboard (HTTP)     | 80              |
| SSL Enabled Services (HTTPS) | 443             |
| Block Storage iSCSI Target   | 3260            |
| MariaDB                      | 3306            |
| RabbitMQ                     | 5672            |
| Cinder Endpoints             | 8776            |
| Nova Endpoints               | 8774-8775, 8773 |
| Nova VM Consoles             | 5900-5999       |
| Nova VNC Proxy (browsers)    | 6080            |
| Nova VNC Proxy (clients)     | 6081            |
| Nova HTML5 Console           | 6082            |
| Keystone Admin Endpoint      | 35357           |
| Keystone Public Endpoint     | 5000            |
| Glance API                   | 9292            |
| Glance Registry              | 9191            |
| Neutron API                  | 9696            |

#### Host Addresses

| Name       | IPv4 Address | Netmask       | DNS     |
| ---------- | ------------ | ------------- | ------- |
| controller | 10.0.0.11    | 255.255.255.0 | 8.8.8.8 |
| compute1   | 10.0.0.31    | 255.255.255.0 | 8.8.8.8 |
| compute2   | 10.0.0.32    | 255.255.255.0 | 8.8.8.8 |
| block1     | 10.0.0.41    | 255.255.255.0 | 8.8.8.8 |

#### Host SSH Users

| Host       | Username | Password  |
| ---------- | -------- | --------- |
| controller | max      | openstack |
| compute1   | max      | openstack |
| compute2   | max      | openstack |
| block1     | max      | openstack |

Commands to check or disable firewall:

```bash
sudo ufw status verbose
sudo ufw disable
```

## Installation Checklist: Controller Node 

This section covers VM and bare metal setup for the controller node, including hardware, networking, and OS installation.

#### Hardware Configuration (VM)

| Virtual      | Recommended | Actual |
| ------------ | ----------- | ------ |
| VCPU         | 1-2+        | 2      |
| RAM          | 4+ GB       | 6 GB   |
| Primary Disk | 10+ GB      | 20 GB  |

#### Hardware Configuration (Bare Metal)

| Bare Metal   | Recommended | Actual |
| ------------ | ----------- | ------ |
| CPU          | 1+          | 4      |
| RAM          | 16+ GB      | 32 GB  |
| Primary Disk | 128+ GB SSD | 512 GB |

#### Network Interfaces

| Interface | Network    | Config Type | IP Addr   | Netmask       | Gateway  | DNS     | VirtualBox Name              |
| --------- | ---------- | ----------- | --------- | ------------- | -------- | ------- | ---------------------------- |
| Adapter 1 | Management | static      | 10.0.0.11 | 255.255.255.0 | 10.0.0.1 | 8.8.8.8 | Host Only Adapter #2         |
| Adapter 2 | Provider   | manual      | ---       | ---           | ---      | ---     | NAT Network ProviderNetwork1 |
| Adapter 3 | Internet   | DHCP        | DHCP      | DHCP          | DHCP     | DHCP    | NAT Network NatNetwork1      |

#### VirtualBox Networks

| Network              | CIDR                     | DHCP     |
| -------------------- | ------------------------ | -------- |
| Host-Only Adapter #2 | 10.0.0.1 / 255.255.255.0 | Disabled |
| NAT Provider Network | 203.0.113.0/24           | Disabled |
| NAT Internet Network | 10.10.10.0/24            | Enabled  |

#### OS Installation Options

Operating system: [Ubuntu Server 22.04 LTS](https://www.ubuntu.com/download/server)

| Option            | Recommended       | Actual            |
| ----------------- | ----------------- | ----------------- |
| Language          | English           | English           |
| Installation mode | Minimal VM        | Minimal VM        |
| Hostname          | controller        | controller        |
| User              | max               | max               |
| Password          | openstack         | openstack         |
| Partitioning      | Entire disk + LVM | Entire disk + LVM |
| SSH               | OpenSSH Server    | OpenSSH Server    |
| GRUB              | Yes               | Yes               |
| Timezone          | Eastern           | Eastern           |

Ubuntu 22.04 uses netplan for networking instead of the older `/etc/network/interfaces`. Make sure to set static IPs in netplan YAML files if using static management addresses.


## Installation Workflow

The manual installation follows a structured sequence.

1. Create virtual networks
2. Create and install Linux on three VMs
3. Configure networking on all nodes
4. Install infrastructure services
5. Install OpenStack services

### 1. Prepare Infrastructure Services

On all nodes, install:

- NTP for time synchronization
- OpenStack repository packages

On the controller node, install:

- MariaDB for database
- RabbitMQ for message queue
- Memcached
- etcd

These services support OpenStack components.

### 2. Install Core OpenStack Services

Each service requires configuration updates in its configuration files. These files are edited manually using a text editor.

| Node(s)                | OpenStack Service            |
| ---------------------- | ---------------------------- |
| Controller             | Keystone identity service    |
| Controller             | Glance image service         |
| Controller             | Horizon dashboard            |
| Controller and Compute | Nova compute service         |
| Controller and Compute | Neutron networking service   |
| Controller and Storage | Cinder block storage service |

