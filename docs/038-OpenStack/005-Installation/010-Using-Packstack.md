---
title: "Using Packstack"
description: "Using Packstack to Setup OpenStack"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 10
last_update:
  date: 9/15/2023
---


## Overview

Packstack is an automated installer that uses Puppet scripts to deploy OpenStack quickly on a single machine or small lab environment. The core OpenStack services are: 

- Compute Service
- Block Storage Service
- Image Service
- Identity Service
- Networking Service
- Object Storage Service
- Web Dashboard

Summary of steps:

1. Prepare the system
2. Install required packages
3. Run Packstack installer
4. Configure networking and external access

## System Requirements

Basic requirements: 

- Minimum 16GB RAM recommended
- Minimum 20GB disk space
- 64 Bit CPU with virtualization support

A few notes:

- Increase disk space if you plan to run multiple virtual machines
- The CPU must support hardware virtualization
- Enable virtualization in BIOS before installation

:::info 

While 16GB RAM is recommended, a small lab can run with about 4GB to 6GB RAM but with limited performance. 

::: 

## Install VirtualBox 

The lab deploys OpenStack inside a virtual machine on VirtualBox. The VM uses CentOS 8 or AlmaLinux 8 as the operating system, which provides a stable base for the OpenStack installation.

For more information, please see [Setting up VirtualBox.](/docs/038-OpenStack/005-Installation/005-Setting-up-VirtualBox.md)


## Prepare the system 

1. Login to the virtual machine:

    ```bash
    ssh <user>@<vm-ip>
    ```

    If you have added the SSH keys, you can run:

    ```bash
    ssh -i ~/.ssh/<name-of-your-key> <user>@<vm-ip>
    ```

2. Set locale values in `/etc/environment` to avoid language related issues:

    ```bash
    sudo vi /etc/environment
    ```

    Add variables:

    ```bash
    LANG=en_US.utf-8 
    LC_ALL=en_US.utf-8 
    ```

3. Services like `firewalld` and `NetworkManager` can interfere with networking.

    Check the status first:

    ```bash
    sudo systemctl status firewalld
    ```

    Stop the Firewalld to prevent installation conflicts and keeps network configuration simple.

    ```bash 
    sudo systemctl stop firewalld
    sudo systemctl disable firewalld
    sudo systemctl status firewalld
    ```

4. Next, disable `NetworkManager` and enable the traditional network service.

    :::info 

    If you are using AlmaLinux 9, don't disable `NetworkManager`
    
    :::

    Verify the `NetworkManager` service:

    ```bash
    sudo systemctl status NetworkManager
    ```

    If it's running, stop it:

    ```bash
    sudo systemctl stop NetworkManager
    sudo systemctl disable NetworkManager
    sudo systemctl enable network
    sudo systemctl start network
    sudo systemctl status network
    ```

    Using the basic network service provides a simpler configuration for OpenStack.

    If you get an this error:

    ```bash
    Failed to enable unit: Unit file network.service does not exist. 
    ```

    It means that the OS doesnt not include `network.service` and you will need to install the legacy scripts. See [Install `network-scripts`.](/docs/038-OpenStack/005-Installation/005-Setting-up-VirtualBox.md#install-network-scripts)


4. Verify the network settings. 

    **For AlmaLinux 8:** 

    The interface `enp0s3` should have static IP, gateway, and DNS configured.

    ```bash
    cat /etc/sysconfig/network-scripts/ifcfg-enp0s3
    ```

    Output:

    ```bash
    ...
    BOOTPROTO=none
    ...
    IPADDR=192.168.1.130
    PREFIX=24
    GATEWAY=192.168.1.1
    DNS1=8.8.8.8
    ```

    **For AlmaLinux 9:**

    The network profiles are stored by `NetworkManager` in keyfile format in the /etc/NetworkManager/system-connections/` directory:

    ```bash
    $ ls -la /etc/NetworkManager/system-connections/

    total 8
    drwxr-xr-x. 2 root root  60 Feb 14 11:16 .
    drwxr-xr-x. 7 root root 134 Feb 14 11:10 ..
    -rw-------. 1 root root 290 Feb 14 11:16 enp0s3.nmconnection
    -rw-------. 1 root root 208 Feb 14 11:16 enp0s8.nmconnection
    ```

    Checking the network configuration for `enp0s3`:

    ```bash
    [ipv4]
    address1=192.168.1.130/24
    dns=8.8.8.8;
    gateway=192.168.1.1
    method=manual 
    ```

    :::info 

    `BOOTPROTO=none` is equivalent to `method=manual` in AlmaLinux 9.

    :::

5. Disable SELinux permanently by editing the configuration file. 

    The variable `SELINUX` must be set to `disabled`.

    ```bash
    sudo vi /etc/selinux/config
    ```

    Change:

    ```bash
    SELINUX=disabled
    ```

    Reboot the system and verify SELinux status.

    ```bash
    sudo reboot
    getenforce
    ```

    Output:

    ```bash
    Disabled
    ```



## Install Packages and Repositories

With prerequisites done, install repositories and required tools before running Packstack. 

- Install OpenStack repository RPM
- Install yum utilities
- Enable repositories
- Update system packages

1. Install the OpenStack repository RPM so the system knows where to fetch OpenStack packages.

    ```bash
    sudo yum install -y centos-release-openstack
    ```

    If you are using AlmaLinux 9, install the RDO repository RPM:

    ```bash
    sudo dnf install -y centos-release-openstack-antelope
    sudo dnf update -y
    ```

2. Install utility tools required for repository management. 

    The variable `dnf-util` provides repository configuration commands.

    ```bash
    sudo dnf install -y dnf-utils
    ```

    Enable repositories and update packages.

    ```bash
    sudo dnf config-manager --set-enabled openstack
    sudo dnf update -y
    ```


## Install and Run Packstack

After updating packages, install Packstack and run an all in one OpenStack deployment. Packstack uses Puppet scripts to automate setup and reduce manual configuration.

- Install Packstack
- Verify network interface
- Run all in one installation

Install Packstack using yum.

```bash
sudo yum install -y openstack-packstack
```

Check the network interface before installation. The variable `enp0s3` represents the main physical interface.

```bash
ip addr show
```

Confirm the interface and IP address are correct because Packstack will modify network settings.

Run Packstack with required parameters. Variables like `ext-net` represent the external layer two segment used for external connectivity.

```bash
sudo packstack --allinone \
--os-neutron-ml2-type-drivers=flat,vlan \
--os-neutron-ml2-mechanism-drivers=openvswitch \
--os-neutron-bridge-mappings=ext-net:br-ex
```

Installation may take 30 to 60 minutes depending on system resources. Completing this step installs OpenStack services automatically and prepares networking components.


## Verify Network Changes 

Packstack modifies network interfaces and creates Open vSwitch bridges. Understanding these changes ensures external connectivity works correctly.

- Check interfaces and bridges
- Verify external bridge configuration
- Confirm physical interface changes

Check interfaces again after installation.

```bash
ip addr show
```

Output:

- New bridges created
- Physical interface without IPv4 address
- Bridge holding main IP

Open the interface configuration file to inspect changes. The variable `enp0s3` should appear as an OVS port attached to bridge `br-ex`.

```bash
sudo vi /etc/sysconfig/network-scripts/ifcfg-enp0s3
```

Confirm it is configured as an Open vSwitch port. This shows Packstack automatically configured networking.

Inspect external bridge configuration. The variable `br-ex` represents the external Open vSwitch bridge.

```bash
sudo vi /etc/sysconfig/network-scripts/ifcfg-br-ex
```

Expected values include:

```bash
DEVICETYPE=ovs
TYPE=OVSBridge
IPADDR=192.168.0.11
```

The bridge now holds the IP address instead of the physical interface, which allows OpenStack networking to function correctly.


## Create External Network and Subnet 

After installation, create external networking so instances can reach the outside world. The goal is to allow floating IP assignment and external connectivity.

- Load admin credentials
- Create external network
- Create public subnet

Load admin credentials using the variable `keystonerc_admin`.

```bash
source keystonerc_admin
```

Create an external network. The variable `ext-net` represents the external physical network mapping.

```bash
openstack network create ext-net \
--external \
--provider-network-type flat \
--provider-physical-network ext-net
```

This command defines a flat external network used by instances for outbound connectivity.

Create a public subnet with an allocation range. Variables such as `START_IP`, `END_IP`, and `GATEWAY_IP` represent your external network values.

```bash
openstack subnet create public-subnet \
--network ext-net \
--subnet-range 192.168.0.0/24 \
--allocation-pool start=192.168.0.100,end=192.168.0.200 \
--gateway 192.168.0.1
```

Instances can now receive public IP addresses from this range and communicate externally.


