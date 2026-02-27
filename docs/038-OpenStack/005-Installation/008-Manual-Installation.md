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

#### 1. VirtualBox

VirtualBox is a free hypervisor used to create and manage virtual machines for lab and testing environments.

- Used to create and run the virtual machines
- Available on Windows, macOS, and Linux
- See: [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)

Other hypervisors such as Hyper-V, VMware, or KVM can also be used with minor configuration adjustments.

A few notes: 

- The compute node runs inside a VirtualBox VM.
- QEMU is used as the hypervisor
- KVM is not available inside this nested setup

QEMU is fine for learning and testing. It is not intended for production workloads. In real environments, compute nodes use KVM on physical servers.

#### 2. Operating System

This lab uses [Ubuntu Server 22.04.5 LTS](https://ubuntu.com/download/server), but other Linux distributions can also be used, including:

- AlmaLinux
- Rocky Linux
- OpenSUSE

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
| Compute    | Runs virtual machine instances (Nova compute service)                       | 2     | 4 GB  | 10 GB |
| Storage    | Provides block storage (Cinder with LVM backend)                            | 2     | 4 GB  | 20 GB |

Diagram: 

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install.png)

</div>

#### 1. Resource Considerations 

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

#### 2. Virtual Networks

Three virtual networks are used to separate traffic.

The network configurations can be found here: [Create the Virtual Networks.](#1-create-the-virtual-networks)

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

#### 3. Storage Backend

The storage node uses LVM as the backend.

- Simple to configure
- Suitable for labs and testing

Production environments often use more advanced backends such as Ceph. 

For learning purposes, LVM keeps the setup simple and focused on OpenStack itself.


#### 4. Neutron Networking Backend

Linux Bridge is easier to configure and suitable for a basic learning environment.

- Linux Bridge agent is used
- Open vSwitch can also be used in other setups

## Installation Checklist

This guide provides a simplified checklist for installing OpenStack in virtual or bare metal environments. 

#### Passwords

| Description                  | Parameter       | Value     |
| ---------------------------- | --------------- | --------- |
| SQL Database `root` password | `MYSQL_ROOT`      | openstack |
| `admin` user password        | `ADMIN_PASS`      | openstack |
| Cinder database password     | `CINDER_DBPASS`   | openstack |
| `cinder` user password       | `CINDER_PASS`     | openstack |
| Horizon database password    | `DASH_DBPASS`     | openstack |
| `demo` user password         | `DEMO_PASS`       | openstack |
| Glance database password     | `GLANCE_DBPASS`   | openstack |
| `glance` user password       | `GLANCE_PASS`     | openstack |
| Keystone database password   | `KEYSTONE_DBPASS` | openstack |
| Metadata secret              | `METADATA_SECRET` | openstack |
| Neutron database password    | `NEUTRON_DBPASS`  | openstack |
| `neutron` user password      | `NEUTRON_PASS`    | openstack |
| Nova database password       | `NOVA_DBPASS`     | openstack |
| `nova` user password         | `NOVA_PASS`       | openstack |
| `placement` user password    | `PLACEMENT_PASS`  | openstack |
| RabbitMQ password            | `RABBIT_PASS`     | openstack |

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
| controller | `jmeden` | openstack |
| compute1   | `jmeden` | openstack |
| compute2   | `jmeden` | openstack |
| block1     | `jmeden` | openstack |

Commands to check or disable firewall:

```bash
sudo ufw status verbose
sudo ufw disable
```

## Installation Workflow

Steps:

1. Create the Virtual Networks
2. Create the Virtual Machines and install Linux
3. Configure the VM Settings
4. Install infrastructure services
5. Install OpenStack services


### 1. Create the Virtual Networks 

In VirtualBox, you will need to create the networks that will be used by the nodes.

| VirtualBox Network Type | Network Name         | Purpose / Network Type          | CIDR / Address                               | DHCP                           |
| ----------------------- | -------------------- | ------------------------------- | -------------------------------------------- | ------------------------------ |
| Host-Only Adapter       | ManagementNetwork    | Management (Controller ↔ Nodes) | 10.0.0.0/24                                  | Disabled                       |
| NAT Network             | ProviderNetwork      | Provider / VM traffic           | 10.10.10.0/24                                | Disabled (manual IPs optional) |
| NAT Network             | Internet             | Internet access / Updates       | 10.0.2.0/24                                  | Enabled                        |

To create the networks, go to Tools → Network → NAT Network.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-16-175206.png)

</div>

#### 1.1 Host-Only Adapter (Management Network)

**Note:** You cannot rename Host-Only adapters in VirtualBox on Windows. VirtualBox does not allow renaming in the GUI, because it links directly to a network interface in Windows.

1. Click `+` to create a new host-only adapter.
2. Select the adapter → click Edit:

   - IPv4 Address: `10.0.0.1`
   - IPv4 Network Mask: `255.255.255.0`
   - DHCP: Disabled (we’ll assign static IPs for the VMs)

3. Click Apply to save.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-16-181024.png)

</div>


#### 1.2 NAT Network (Provider Network)

1. Click `+` to create a new NAT network.
2. Click the Edit (gear icon) and update based on the table above.
3. Click Apply to save.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-16-175736.png)

    </div>

#### 1.3 NAT Network (Internet)

1. Click `+` to create a new NAT network.
2. Click the Edit (gear icon) and update based on the table above.
3. Click Apply to save.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-17-180706.png)

    </div>



### 2. Create the Virtual Machines 

We'll use VirtualBox to create three VMs with the specifications outlined in the lab architecture. Each VM will have:

- Ubuntu Server 22.04 LTS
- Headless (no GUI)

<!-- You can allow "Unattended Install" to allow the OS to be automatically installed in the background without showing the user setup screens.  -->

**NOTE:** It is recommended to select "Skip unattended install" during VM creation because there is a chance the OS installation will fail.

<div class='img-center'>

<!-- ![](/img/docs/Screenshot-2026-02-17-170456.png) -->
![](/img/docs/Screenshot-2026-02-17-213937.png)

</div>

<!-- During unattended install, VirtualBox already:

- Creates partitions (usually with LVM)
- Creates a user
- Installs GRUB
- Sets the timezone
- Installs OpenSSH (if selected)
- Auto-configures networking with DHCP (temporarily) -->


#### 2.1 Controller VM

| Setting           | Configuration                     | Notes                                          |
| ----------------- | --------------------------------- | ---------------------------------------------- |
| Name              | `controller`                      |                                                |
| RAM (Base Memory) | 6 GB (6144 MB)                    | Enough for Keystone, Glance, Nova API, Neutron | 
| CPU (Processors)  | 2 cores                           | Minimum 2                                      | 
| Storage           | 20 GB                             | System disk only                               | 
| Display           | 16 MB                             | Only needed for console access, no GUI         | 
| Network Adapters  | 3                                 |                                                | 
| Adapter 1         | Host-Only                         | Select the created Host-Only Adapter network   | 
| Adapter 2         | NAT Network (`ProviderNetwork`)   | Set **Promiscuous Mode: Allow All**            |
| Adapter 3         | NAT Network (`Internet`)          | Enable DHCP                                    | 

Make sure to select the **Host-Only Adapter (Management Network)** created from previous step

- Adapter 1 (Host-Only) is mandatory; all OpenStack nodes communicate here.
- Adapter 3 (NAT) allows the VM to reach Ubuntu repositories.
- The IP address and Gateway will be set in the next step (step 3).
- Display memory is minimal; no GUI needed.


#### 2.2 Compute VM

| Setting          | Configuration                      | Notes                                                    | 
| ---------------- | ---------------------------------- | -------------------------------------------------------- |
| Name             | `compute1`                         |                                                          | 
| RAM (Base Memory)| 4 GB (4096 MB)                     | Enough for running VMs via Nova                          | 
| CPU (Processors) | 2 cores                            | At least 2                                               | 
| Storage          | 10 GB                              | System only; ephemeral VM disks handled by Cinder/Glance | 
| Display          | 16 MB                              | Console only                                             | 
| Network Adapters | 3                                  |                                                          | 
| Adapter 1        | Host-Only                          | Select the created Host-Only Adapter network             | 
| Adapter 2        | NAT Network (`ProviderNetwork`)    | Set **Promiscuous Mode: Allow All**                      | 
| Adapter 3        | NAT Network (`Internet`)           | Enable DHCP                                              |

**Notes:**

- Only 2 adapters needed, compute doesn’t need internet unless for updates.
- Adapter 1 (Host-Only) ensures communication with controller and other nodes.
- Adapter 2 (NAT Network) connect VMs launched by OpenStack to provider network


#### 2.3 Storage (Block Storage) VM

| Setting          | Configuration                     | Notes                                                 | 
| ---------------- | --------------------------------- | ----------------------------------------------------- | 
| Name             | `block1`                          |                                                       |
| RAM              | 4 GB (4096 MB)                    | Minimum for Cinder services                           | 
| CPU              | 2 cores                           | Minimum 1, more if heavy testing                      | 
| Storage          | 20 GB                             | Storage space for volumes                             | 
| Display          | 16 MB                             | Console only                                          | 
| Network Adapters | 2                                 | Each adapter has a purpose                            | 
| Adapter 1        | Host-Only                         | Select the created Host-Only Adapter network          | 
| Adapter 2        |                                   | Disabled                                              | 
| Adapter 3        | NAT Network (`Internet`)          | Enable DHCP                                           |

**Notes:**

- Primary disk larger because it hosts Cinder volumes for testing.
- Adapter 1 (Host-Only) allows communication with controller for service API.


### 3. Configure the VM Settings 

Once you launch the VMs, it will go through the installation wizard. Use the arrow keys to select the option and press Enter.

**NOTE:** The configurations are the same for all three nodes except for the network and hostname configurations.

#### 3.1 OS Installation Options

| Option            | Recommended       | Actual            |
| ----------------- | ----------------- | ----------------- |
| Language          | English           | English           |
| Installation mode | Minimal VM        | Minimal VM        |
| Hostname          | controller        | controller        |
| User              | `jmeden`          | `jmeden`          |
| Password          | `openstack`       | `openstack`       |
| Partitioning      | Entire disk + LVM | Entire disk + LVM |
| SSH               | OpenSSH Server    | OpenSSH Server    |
| GRUB              | Yes               | Yes               |

#### 3.2 Language

<div>

![](/img/docs/Screenshot-2026-02-17-213809.png)

</div>

#### 3.3 Keyboard

<div>

![](/img/docs/Screenshot-2026-02-17-214039.png)

</div>

#### 3.4 Installation Type 

<div>

![](/img/docs/Screenshot-2026-02-17-214200.png)

</div>

#### 3.5 Network Configurations 

The network configurations will be different for each node. There will be three interface for each node:

- `enp0s3` → Host-Only (Management)
- `enp0s8` → NAT Network “Provider” (10.10.10.0/24, DHCP OFF)
- `enp0s9` → NAT Network “Internet” (DHCP ON)

Use the configurations below:

| Node       | Interface             | Subnet        | Address     | Gateway     | Name Servers |
| ---------- | --------------------- | ------------- | ----------- | ----------- | ------------ |
| Controller | enp0s3 (Host-Only)    | 10.0.0.0/24   | 10.0.0.11   | —           | —            |
| Controller | enp0s8 (Provider NAT) | 10.10.10.0/24 | 10.10.10.11 | —           | —            |
| Controller | enp0s9 (Internet NAT) | 10.0.2.0/24   | DHCP        | Auto (DHCP) | Auto (DHCP)  |
| Compute    | enp0s3 (Host-Only)    | 10.0.0.0/24   | 10.0.0.21   | —           | —            |
| Compute    | enp0s8 (Provider NAT) | 10.10.10.0/24 | 10.10.10.21 | —           | —            |
| Compute    | enp0s9 (Internet NAT) | 10.0.2.0/24   | DHCP        | Auto (DHCP) | Auto (DHCP)  |
| Storage    | enp0s3 (Host-Only)    | 10.0.0.0/24   | 10.0.0.31   | —           | —            |
| Storage    | enp0s9 (Internet NAT) | 10.0.2.0/24   | DHCP        | Auto (DHCP) | Auto (DHCP)  |

Use the arror keys to select and press Enter to edit the field. 

<div>

![](/img/docs/Screenshot-2026-02-17-214921.png)

</div>

To set a static IP, select IPV4 Method -> Manual:

<div>

![](/img/docs/Screenshot-2026-02-17-215001.png)

</div>

Enter the required fields, navigate to **Save**, and press Enter.

<div>

![](/img/docs/Screenshot-2026-02-17-215109.png)

</div>

#### 3.6 Proxy and Mirror Configurations 

You can leave the proxy configuration blank. 

<div>

![](/img/docs/Screenshot-2026-02-17-224938.png)

</div>

For the mirror, you can wait for the mirror location test passes then press Enter on **Done**

<div>

![](/img/docs/Screenshot-2026-02-17-225143.png)

</div>

#### 3.7 Storage Configuration

Select **Use an entire disk -> Set up this disk as an LVM group** and press Enter on **Done.**

<div>

![](/img/docs/Screenshot-2026-02-17-225500.png)

</div>

<div>

![](/img/docs/Screenshot-2026-02-17-225616.png)

</div>

When prompted to confirm destructive action, select **Continue.**

<div>

![](/img/docs/Screenshot-2026-02-17-225717.png)

</div>

#### 3.8 Username 

<div>

![](/img/docs/Screenshot-2026-02-17-230046.png)

</div>

#### 3.9 SSH Configuration

Make sure to install OpenSSH so you can SSH to the VM from your host machine.

You can import the SSH key later.

<div>

![](/img/docs/Screenshot-2026-02-17-230236.png)

</div>

#### 3.10 Featured Snaps 

You can skip the snaps for now. Choose **Done.**

<div>

![](/img/docs/Screenshot-2026-02-17-230436.png)

</div>

#### 3.11 Installation Complete 

Once the installation is finished, you should see the **Installation Complete** message.

Choose **Reboot Now.**

<div>

<!-- ![](/img/docs/Screenshot-2026-02-17-232413.png) -->
![](/img/docs/Screenshot-2026-02-17-234335.png)

</div>

After rebooting, login with the user you created.

<div>

![](/img/docs/Screenshot-2026-02-17-233255.png)

</div>

From a terminal in your host machine, try to SSH to the virtual machine.
Enter password when prompted.

<div>

![](/img/docs/Screenshot-2026-02-17-233624.png)

</div>

Exit back to your host machine and proceed to create the SSH key.

<div>

![](/img/docs/Screenshot-2026-02-17-233744.png)

</div>


#### 3.12 Add an SSH Key 

From your host machine, generate SSH Key:

```bash
ssh-keygen -t ed25519 -C "jmeden@host"
```

You can change the key name, or press **Enter** to accept default file location (`~/.ssh/id_ed25519`)

Verify key was created:

```bash
$ ls -l ~/.ssh/vbox* 

-rw------- 1 user user 505 Feb 14 17:40 /home/user/.ssh/vbox
-rw-r--r-- 1 user user 178 Feb 14 17:40 /home/user/.ssh/vbox.pub
```

Copy public key to each node.

```bash
ssh-copy-id jmeden@<VM-IP>
```

Example for controller node:

```bash
ssh-copy-id -i ~/.ssh/vbox.pub jmeden@10.0.0.11
```

This installs your public key into `~/.ssh/authorized_keys` on the VM.

<div>

![](/img/docs/Screenshot-2026-02-17-235045.png)

</div>

Test the connection:

```bash
ssh -i ~/.ssh/vbox jmeden@10.0.0.11 
```

<div>

![](/img/docs/Screenshot-2026-02-17-235207.png)

</div>



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

