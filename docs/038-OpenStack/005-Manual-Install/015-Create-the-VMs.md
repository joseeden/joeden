---
title: "Create the VMs"
description: "Create the Virtual Machines"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 15
last_update:
  date: 9/15/2023
---

## Overview

We'll use VirtualBox to create three VMs with the specifications outlined in the lab architecture. Each VM will have:

- Ubuntu Server 22.04 LTS
- Headless (no GUI)

**NOTE:** It is recommended to select "Skip unattended install" during VM creation because there is a chance the OS installation will fail.

<!-- You can allow "Unattended Install" to allow the OS to be automatically installed in the background without showing the user setup screens.  -->

## Create the Virtual Machines 

Open Oracle VirtualBox and click the "+" button to create the virtual machines. Follow the details for each node. 

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


### Controller VM

| Setting           | Configuration                   | Notes                                          |
| ----------------- | ------------------------------- | ---------------------------------------------- |
| Name              | `controller`                    |                                                |
| RAM (Base Memory) | 6 GB (6144 MB)                  | Enough for Keystone, Glance, Nova API, Neutron |
| CPU (Processors)  | 2 cores                         | Minimum 2                                      |
| Storage           | 20 GB                           | System disk only                               |
| Display           | 16 MB                           | Only needed for console access, no GUI         |
| Network Adapters  | 3                               |                                                |
| Adapter 1         | Host-Only                       | Select the created Host-Only Adapter network   |
| Adapter 2         | NAT Network (`ProviderNetwork`) | Set **Promiscuous Mode: Allow All**            |
| Adapter 3         | NAT Network (`Internet`)        | Enable DHCP                                    |

Make sure to select the **Host-Only Adapter (Management Network)** created from previous step

- Adapter 1 (Host-Only) is mandatory; all OpenStack nodes communicate here.
- Adapter 3 (NAT) allows the VM to reach Ubuntu repositories.
- The IP address and Gateway will be set in the next step (step 3).
- Display memory is minimal; no GUI needed.


### Compute VM

| Setting           | Configuration                   | Notes                                                    |
| ----------------- | ------------------------------- | -------------------------------------------------------- |
| Name              | `compute1`                      |                                                          |
| RAM (Base Memory) | 4 GB (4096 MB)                  | Enough for running VMs via Nova                          |
| CPU (Processors)  | 2 cores                         | At least 2                                               |
| Storage           | 10 GB                           | System only; ephemeral VM disks handled by Cinder/Glance |
| Display           | 16 MB                           | Console only                                             |
| Network Adapters  | 3                               |                                                          |
| Adapter 1         | Host-Only                       | Select the created Host-Only Adapter network             |
| Adapter 2         | NAT Network (`ProviderNetwork`) | Set **Promiscuous Mode: Allow All**                      |
| Adapter 3         | NAT Network (`Internet`)        | Enable DHCP                                              |

**Notes:**

- Only 2 adapters needed, compute doesn’t need internet unless for updates.
- Adapter 1 (Host-Only) ensures communication with controller and other nodes.
- Adapter 2 (NAT Network) connect VMs launched by OpenStack to provider network


### Storage (Block Storage) VM

| Setting          | Configuration            | Notes                                        |
| ---------------- | ------------------------ | -------------------------------------------- |
| Name             | `block1`                 |                                              |
| RAM              | 4 GB (4096 MB)           | Minimum for Cinder services                  |
| CPU              | 2 cores                  | Minimum 1, more if heavy testing             |
| Storage          | 20 GB                    | Storage space for volumes                    |
| Display          | 16 MB                    | Console only                                 |
| Network Adapters | 2                        | Each adapter has a purpose                   |
| Adapter 1        | Host-Only                | Select the created Host-Only Adapter network |
| Adapter 2        |                          | Disabled                                     |
| Adapter 3        | NAT Network (`Internet`) | Enable DHCP                                  |

**Notes:**

- Primary disk larger because it hosts Cinder volumes for testing.
- Adapter 1 (Host-Only) allows communication with controller for service API.

## Configure the VM Settings 

Once you launch the VMs, it will go through the installation wizard. Use the arrow keys to select the option and press Enter.

**NOTE:** The configurations are the same for all three nodes except for the network and hostname configurations.

### OS Installation Options

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

### Language

<div>

![](/img/docs/Screenshot-2026-02-17-213809.png)

</div>

### Keyboard

<div>

![](/img/docs/Screenshot-2026-02-17-214039.png)

</div>

### Installation Type 

<div>

![](/img/docs/Screenshot-2026-02-17-214200.png)

</div>

### Network Configurations 

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

### Proxy and Mirror Configurations 

You can leave the proxy configuration blank. 

<div>

![](/img/docs/Screenshot-2026-02-17-224938.png)

</div>

For the mirror, you can wait for the mirror location test passes then press Enter on **Done**

<div>

![](/img/docs/Screenshot-2026-02-17-225143.png)

</div>

### Storage Configuration

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

### Username 

<div>

![](/img/docs/Screenshot-2026-02-17-230046.png)

</div>

### SSH Configuration

Make sure to install OpenSSH so you can SSH to the VM from your host machine.

You can import the SSH key later.

<div>

![](/img/docs/Screenshot-2026-02-17-230236.png)

</div>

### Featured Snaps 

You can skip the snaps for now. Choose **Done.**

<div>

![](/img/docs/Screenshot-2026-02-17-230436.png)

</div>

### Installation Complete 

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


### Add an SSH Key 

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

## Next Steps 

Next, configure the networking and security settings on each node.

See [Networking and Security.](/docs/038-OpenStack/005-Manual-Install/017-Networking-and-Security.md)
