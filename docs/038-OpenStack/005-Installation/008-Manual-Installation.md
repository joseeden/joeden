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



### 4. Configure Networking and Security 

The following steps are the applicable on all three nodes.

To login to each node:

- Controller node:

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.11
    ```

- Compute node:

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.21
    ```

- Storage node:

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.31
    ```

#### 4.1 Grant Passwordless Sudo to User

Edit sudoers file:

```bash
sudo visudo
```

Add your username at the end:

```
jmeden ALL=(ALL) NOPASSWD:ALL
```

This will your user to run any command with `sudo` without a password prompt. You can test this by running:

```bash
sudo su 
```

#### 4.2 Hosts File Configuration (Basic Name Resolution)

Edit `/etc/hosts` on all nodes to include the other nodes:

```bash
sudo vi /etc/hosts
```

Example:

```bash
127.0.0.1 localhost
# 127.0.1.1 ---> If this present, remove or comment out
10.0.0.11 controller
10.0.0.21 compute1
10.0.0.31 block1
```

This allows simple hostname-based pinging between nodes.

**Optional**: In production, use proper DNS instead.

#### 4.3 (OUTDATED) Disable Predicatable Network Interface Names 

:::info 

This step is not necessary in newer Ubuntu versions.
You can skip this step.

::: 

To revert to traditional interface names (e.g., `eth0`), edit the GRUB configuration file:

```bash
sudo vi /etc/default/grub
``` 

Then add this:

```bash
GRUB_CMDLINE_LINUX="net.ifnames=0 biosdevname=0"
```

This forces:

- `enp0s3` → `eth0`
- `enp0s8` → `eth1`
- `enp0s9` → `eth2`

This was commonly done in:

- Ubuntu 14.04 / 16.04
- Older OpenStack guides
- Legacy documentation

#### 4.4 (OUTDATED) Configure Network Interfaces

:::info 

This step is not necessary in newer Ubuntu versions.
You can skip this step.

::: 

**Note:** `enp0s*` corresponds to traditional `eth0`, `eth1`, `eth2`.
Do **not** rename unless necessary; OpenStack will work with `enp0s*`.

Below is a sample `Netplan` configuration for the controller node:

```yaml
network:
  version: 2
  ethernets:
    enp0s3:       # Host-only (management)
      addresses:
        - 10.0.0.11/24
      gateway4: 10.0.0.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 1.1.1.1

    enp0s8:       # Provider network
      dhcp4: no
      optional: true
      addresses: []

    enp0s9:       # Internet access (NAT Network)
      dhcp4: yes
```

- **Controller:** `.11` on management, provider manual, internet via DHCP
- **Compute:** `.21` on management, provider manual, internet via DHCP
- **Block:** `.31` on management, provider manual, internet via DHCP

Apply the config:

```bash
sudo netplan apply
```

Verify interfaces:

```bash
ip a
ping -c3 10.0.0.21
ping -c3 8.8.8.8
```

#### 4.5 Verify Network Configuration

Perform the following on each node:

1. Check interface addresses:

    ```bash
    ip a
    ```

    You should see:

    | Interface | Purpose        | IP               | Status |
    | --------- | -------------- | ---------------- | ------ |
    | enp0s3    | Management     | 10.0.0.11        | ✅ UP   |
    | enp0s8    | Provider       | 10.10.10.11      | ✅ UP   |
    | enp0s9    | Internet (NAT) | 10.0.2.17 (DHCP) | ✅ UP   |

2. Check default route:

    ```bash
    ip route
    ```

    Sample output:

    ```bash
    default via 10.0.2.1 dev enp0s9 proto dhcp src 10.0.2.17 metric 100 
    10.0.0.0/24 dev enp0s3 proto kernel scope link src 10.0.0.11
    10.0.2.0/24 dev enp0s9 proto kernel scope link src 10.0.2.17 metric 100
    10.0.2.1 dev enp0s9 proto dhcp scope link src 10.0.2.17 metric 100   
    10.10.10.0/24 dev enp0s8 proto kernel scope link src 10.10.10.11     
    192.168.1.1 via 10.0.2.1 dev enp0s9 proto dhcp src 10.0.2.17 metric 100 
    ```

    Most important line:

    ```bash
    default via 10.0.2.1 dev enp0s9
    ```

    This means:

    ✔ Internet traffic goes out NAT (correct)
    ✔ Management network has NO gateway (correct)
    ✔ Provider network isolated (correct)

    The extra line is just VirtualBox NAT internal routing. Ignore it.

    ```bash
    192.168.1.1 via 10.0.2.1
    ```

3. Check DNS:

    ```bash
    resolvectl status
    ```

    The output is coming from VirtualBox NAT DHCP. Perfectly fine.

    ```bash
    Current DNS Server: 192.168.1.1
        DNS Servers: 192.168.1.1
    ```

    You can also run:

    ```bash
    cat /etc/resolv.conf
    ```

    Output:

    ```bash
    nameserver 127.0.0.53
    options edns0 trust-ad
    search .
    ```

    That’s systemd-resolved stub. Normal for Ubuntu.
    DNS is working correctly.


If you got the same configurations, then that means:

✔ Correct 3-NIC separation
✔ Correct routing
✔ Correct DNS
✔ Static management & provider
✔ DHCP internet
✔ No conflicting gateways


#### 4.6 Verify Connectivity

From any node, test:

```bash
# Ping other OpenStack nodes
ping -c3 10.0.0.11
ping -c3 10.0.0.21
ping -c3 10.0.0.31

# Ping the hostnames
ping -c 3 controller
ping -c 3 compute1
ping -c 3 block1

# Ping internet
ping -c3 8.8.8.8
ping openstack.org
```

Notes: 

- All nodes should reach each other and the internet.
- SSH should work from host to all nodes

#### 4.7 Install Basic Linux Utilities

Update and upgrade first:

```bash
sudo apt update
sudo apt upgrade -y
```

If prompted to load the new kernel, press **Ok.**

<div class='img-center'>

![](/img/docs/Screenshot2026-02-28184453.png)

</div>

Leave the default. Press tab to select **Ok** and press Enter.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-28184737.png)

</div>

Next, install useful utilities:

```bash
sudo apt install -y vim htop glances curl wget net-tools
```

- **vim:** text editing
- **htop/glances:** system monitoring
- **curl/wget:** download files
- **net-tools:** legacy networking commands (`ifconfig`, etc.)

Finally, reboot to apply kernel updates:

```bash
sudo reboot
```

#### 4.8 Optional Firewall Configuration

Ubuntu minimal installs typically have the firewall disabled.

Check status:

```bash
sudo ufw status
```

If needed, enable firewall and allow OpenStack-related ports.

For lab setups, you can leave it disabled to avoid blocking inter-node communication.



### 5. Prepare Infrastructure Services

On all nodes, install:

- NTP for time synchronization
- OpenStack repository packages

On the controller node, install:

- MariaDB for database
- RabbitMQ for message queue
- Memcached
- etcd

#### 5.1 Configure Time Sync Between Nodes

All nodes must have the same time. This prevents errors during OpenStack installation and keeps services stable.

- The controller will act as the time server
- Compute and block nodes will sync their time from the controller

On the controller node: 

1. Install the chrony package:

    ```bash
    sudo apt install chrony -y 
    ```

2. Next, edit the configuration file `chrony.conf`:

    ```bash
    sudo vi /etc/chrony/chrony.conf
    ```

    Keep the default pool lines. These allow the controller to sync with public NTP servers.

    Add this line at the bottom to allow your management network (10.0.0.0/24):

    ```bash
    allow 10.0.0.0/24 
    ```

    This allows compute and block nodes to get time from the controller.

3. Restart the service:

    ```bash
    sudo systemctl restart chrony
    sudo systemctl status chrony
    ```

    The controller now syncs from the internet and serves time to other nodes.

4. Verify the time sync:

    ```bash
    chronyc sources 
    ```

    It should show the external public NTP servers.

    ```bash
    MS Name/IP address         Stratum Poll Reach LastRx Last sample       

    ===============================================================================
    ^- alphyn.canonical.com          2   7   301   123   -459us[+6127us] +/-  157ms
    ^- prod-ntp-4.ntp4.ps5.cano>     2   6   377     2    -37ms[  -37ms] +/-  121ms
    ^- prod-ntp-5.ntp4.ps5.cano>     2   7   301   122    -51ms[  -45ms] +/-  143ms
    ^- prod-ntp-3.ntp4.ps5.cano>     2   6   203    56    -43ms[  -40ms] +/-  127ms
    ^+ sin1.sg.ntp.li                3   6   377     3    +12ms[  +12ms] +/-   36ms
    ^+ sin.time.unun.fi              4   6   377     6  -1862us[+1120us] +/-   37ms
    ^* kaguaani.miuku.net            2   6   377     5  -1864us[+1127us] +/-   12ms
    ^- bkk-sin.clearnet.pw           2   6   377     4  -9092us[-9092us] +/-   75ms 
    ```

On the compute and block nodes:

1. Install the chrony package:

    ```bash
    sudo apt install chrony -y 
    ```

2. Edit the configuration file `chrony.conf`:

    ```bash
    sudo vi /etc/chrony/chrony.conf
    ```

    Comment out the existing pool lines:

    ```bash
    #pool ntp.ubuntu.com        iburst maxsources 4
    #pool 0.ubuntu.pool.ntp.org iburst maxsources 1
    #pool 1.ubuntu.pool.ntp.org iburst maxsources 1
    #pool 2.ubuntu.pool.ntp.org iburst maxsources 2 
    ```

    Add this line to use the controller as the time server:

    ```bash
    server controller iburst
    ```

    Here, controller must resolve to the management IP (`10.0.0.11`). 
    
    **NOTE:** Make sure it exists in `/etc/hosts`.


3. Restart the service:

    ```bash
    sudo systemctl restart chrony
    sudo systemctl status chrony
    ```

    The compute and block node now syncs time from the controller.


4. Verify the time sync:

    ```bash
    chronyc sources 
    ```

    Both node should show the controller as their time source:

    ```bash
    MS Name/IP address         Stratum Poll Reach LastRx Last sample  

    ===============================================================================
    ^* controller                    3   6    37    32    +41us[ +502us] +/-   16ms 
    ```

#### 5.2 Install Required Packages

On all three nodes:

1. Install the base packages:

    ```bash
    sudo apt install software-properties-common -y
    ```

2. Set the OpenStack release for the installation. 

    In this setup, the release name is **zed**.

    ```bash
    sudo add-apt-repository cloud-archive:zed -y 
    ```

3. Update the package list and upgrade installed packages.

    ```bash
    sudo apt update
    sudo apt upgrade -y 
    ```

4. If the kernel or core libraries were updated, reboot the system.

    ```bash
    sudo reboot
    ```

5. Install the OpenStack command-line client.

    ```bash
    sudo apt install python3-openstackclient -y
    ```

    Verify installation:

    ```bash
    openstack --version 
    ```

    Output:

    ```bash
    openstack 6.0.0  
    ```

#### 5.3 Install and Configure MariaDB

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

RabbitMQ handles messaging between OpenStack services.


1. Install MariaDB and the Python connector package.

    ```bash
    sudo apt install mariadb-server python3-pymysql -y
    ```

2. Check the MariaDB configuration files:

    ```bash
    jmeden@controller:~$ ls -lrt /etc/mysql/mariadb.conf.d/

    total 20
    -rw-r--r-- 1 root root  570 Oct 11 03:03 60-galera.cnf
    -rw-r--r-- 1 root root 3572 Oct 11 03:03 50-server.cnf
    -rw-r--r-- 1 root root  927 Oct 11 03:03 50-mysqld_safe.cnf
    -rw-r--r-- 1 root root  231 Oct 11 03:03 50-mysql-clients.cnf
    -rw-r--r-- 1 root root  575 Oct 11 03:03 50-client.cnf
    ```

    If it doesn't exist, create the custom config file:

    ```
    sudo vi /etc/mysql/mariadb.conf.d/99-openstack.cnf
    ```

    Add basic settings:

    ```ini
    [mysqld]
    bind-address = 10.0.0.11
    default-storage-engine = innodb
    innodb_file_per_table = on
    max_connections = 4096
    collation-server = utf8_general_ci
    character-set-server = utf8
    ```

    Here, `bind-address` must match the controller management IP.

3. Restart MariaDB:

    ```bash
    sudo systemctl restart mariadb
    sudo systemctl status mariadb
    ```

4. Verify its listening on the management IP:

    ```bash
    sudo ss -lntp | grep 3306
    ```

    Output:

    ```bash
    LISTEN 0      869        10.0.0.11:3306       0.0.0.0:*    users:(("mariadbd",pid=3120,fd=19))
    ```

5. Now secure the database:

    ```bash
    sudo mysql_secure_installation
    ```

    During the setup:

    | Action                                | Choice |
    | ------------------------------------- | ------ |
    | Press Enter for current root password | Enter  |
    | Change the root password?             | No     |
    | Switch to unix_socket authentication  | No     |
    | Remove anonymous users                | Yes    |
    | Disallow root login remotely          | No     |
    | Remove test database and access to it | Yes    |
    | Reload privileges tables              | Yes    |

    This should return:

    ```bash
    Cleaning up...

    All done!  If you've completed all of the above steps, your MariaDB    
    installation should now be secure.

    Thanks for using MariaDB!
    ```

    MariaDB is now installed and secured, which prepares the database layer for OpenStack.


#### 5.4 Install and Configure RabbitMQ

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

RabbitMQ handles messaging between OpenStack services.

1. Install the package:

    ```bash
    sudo apt install rabbitmq-server -y
    ```

2. Add the `openstack` user. Replace `RABBIT_PASS` with your chosen password.

    ```bash
    sudo rabbitmqctl add_user openstack RABBIT_PASS
    ```

3. Set permissions for the `openstack` user:

    ```bash
    sudo rabbitmqctl set_permissions openstack ".*" ".*" ".*"
    ```

RabbitMQ is now ready to handle internal service communication.


#### 5.5 Install and Configure Memcached

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

Memcached stores authentication tokens for faster access.

1. Install packages:

    ```bash
    sudo apt install memcached python3-memcache -y
    ```

2. Edit configuration file:

    ```
    sudo vi /etc/memcached.conf
    ```

    Find the `-l` option and set it to the controller management IP:

    ```
    -l 10.0.0.11
    ```

3. Restart the service:

    ```bash
    sudo systemctl restart memcached
    sudo systemctl status memcached
    ```

Memcached is now configured for token caching on the controller.

#### 5.6 Install and Configure etcd

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

etcd stores distributed configuration data.

1. Create group and user:

    ```bash
    sudo groupadd --system etcd
    sudo useradd -s /sbin/nologin --system -g etcd etcd
    ```

2. Create required directories:

    ```bash
    sudo mkdir -p /etc/etcd /var/lib/etcd
    sudo chown -R etcd:etcd /var/lib/etcd
    ```

3. Download and extract etcd:

    ```bash
    wget https://github.com/etcd-io/etcd/releases/download/v3.5.0/etcd-v3.5.0-linux-amd64.tar.gz
    tar xvf etcd-v3.5.0-linux-amd64.tar.gz
    sudo mv etcd-v3.5.0-linux-amd64/etcd* /usr/local/bin/
    ```

    Verify:

    ```bash
    jmeden@controller:~$ ls -la /usr/local/bin/

    total 56236
    drwxr-xr-x  2 root   root       4096 Feb 28 11:54 .
    drwxr-xr-x 10 root   root       4096 Sep 11  2024 ..
    -rwxr-xr-x  1 jmeden jmeden 23560192 Jun 15  2021 etcd
    -rwxr-xr-x  1 jmeden jmeden 17969152 Jun 15  2021 etcdctl
    -rwxr-xr-x  1 jmeden jmeden 16048128 Jun 15  2021 etcdutl
    ```

4. Create configuration file:

    ```
    sudo vi /etc/etcd/etcd.conf.yml
    ```

    Example content:

    ```yaml
    name: controller
    data-dir: /var/lib/etcd
    listen-peer-urls: http://10.0.0.11:2380
    listen-client-urls: http://10.0.0.11:2379
    advertise-client-urls: http://10.0.0.11:2379
    initial-cluster: controller=http://10.0.0.11:2380
    initial-cluster-state: new
    initial-cluster-token: etcd-cluster-01
    ```

    Here, `10.0.0.11` is the controller management IP.

5. Create systemd service file:

    ```
    sudo vi /etc/systemd/system/etcd.service
    ```

    Example content:

    ```ini
    [Unit]
    Description=etcd key-value store
    Documentation=https://etcd.io/docs/
    After=network.target

    [Service]
    Type=notify
    User=etcd
    Group=etcd
    ExecStart=/usr/local/bin/etcd \
      --name controller \
      --data-dir=/var/lib/etcd \
      --listen-client-urls=http://0.0.0.0:2379 \
      --advertise-client-urls=http://127.0.0.1:2379
    Restart=always
    RestartSec=5s
    LimitNOFILE=65536

    [Install]
    WantedBy=multi-user.target
    ```

6. Enable and start etcd:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable etcd
    sudo systemctl start etcd
    sudo systemctl status etcd
    ```

etcd is now running as a system service.


### 6. Install Core OpenStack Services

Each service requires configuration updates in its configuration files. These files are edited manually using a text editor.

| Node(s)                | OpenStack Service            |
| ---------------------- | ---------------------------- |
| Controller             | Keystone identity service    |
| Controller             | Glance image service         |
| Controller             | Horizon dashboard            |
| Controller and Compute | Nova compute service         |
| Controller and Compute | Neutron networking service   |
| Controller and Storage | Cinder block storage service |

