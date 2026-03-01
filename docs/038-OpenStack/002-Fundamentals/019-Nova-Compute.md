---
title: "Nova Compute"
description: "Nova – Compute Management"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 19
last_update:
  date: 9/15/2023
---

## Overview

Nova is the compute service in OpenStack. It is more complex than other services because it manages different types of compute resources.

- It creates and manages virtual machines
- It supports Linux containers and bare metal
- It uses control and compute nodes

## Control Plane And Compute Nodes

Nova is split into two main parts.

- **Controller nodes** 

  - Control nodes act as the brain of the system
  - Decide where instances should run and coordinate operations
  - Handle core services like API, scheduler, and conductor
  - Process user requests and manage orchestration

- **Compute nodes**
  
  - Run the hypervisor and actually host instances
  - Provide CPU, memory, and storage for virtual machines.
  - Report resource usage back to the control plane

In most deployments, there are only a few controller nodes but many compute nodes. Because of this, compute nodes must be deployed in a standard and repeatable way. This keeps the environment consistent and easier to scale.

## Nova Core Components

These components work together to run the compute service.

| Component      | Role                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Nova API       | <ul><li>Receives requests such as creating a virtual machine</li><li>Forwards requests to other Nova services for processing</li></ul> |
| Nova Scheduler | <ul><li>Decides where an instance should run</li><li>Uses available information to select a compute node</li></ul>       |
| Nova Conductor | <ul><li>Protects direct database access</li><li>Performs database operations on behalf of other services</li></ul>                     |
| Placement      | <ul><li>Tracks resource usage like CPU and memory</li><li>Provides resource data to help scheduling decisions</li></ul>             |
| RabbitMQ       | <ul><li>Enables communication between Nova components</li><li>Uses remote procedure calls for internal messaging</li></ul>             |

Together, these components allow Nova to receive requests, select compute nodes, manage resources, and communicate securely across the system.

<div class='img-center'>

![](/img/docs/all-things-openstack-compute-v2.png)

</div>


## Hypervisor Support

Nova supports multiple hypervisors.

- KVM on Linux (via libvirt)
- LXC Linux Containers (via libvirt)
- Xen on Linux (via libvirt)
- XenServer on Linux (with XAPI)
- Hyper-V on Windows
- PowerVM on IBM Power Platform
- QEMU (Quick Emulator on Linux)
- VMware vSphere 5.1+ vCenter
- Virtuozzo 7.0+ on Linux 

Not all features are available on every hypervisor. For example, some hypervisors support instance snapshots, while others do not. Because of these differences, you should always review the hypervisor feature support matrix before selecting one.

This flexibility allows OpenStack environments to use different virtualization platforms, but feature availability must be verified in advance.

## KVM Configuration Example

If your compute node supports virtualization and KVM is enabled in BIOS, Nova usually detects it automatically.

If you want to explicitly configure it, edit `/etc/nova/nova.conf`.

In the example below, we configure `compute_driver` and set `virt_type` to `kvm`.

```ini
[DEFAULT]
compute_driver = libvirt.LibvirtDriver

[libvirt]
virt_type = kvm
```

After editing the file, restart the compute service:

```bash
systemctl restart nova-compute
```

Expected result:

- The service restarts successfully
- The compute node registers in Nova

This confirms that the KVM driver is active and working.

## QEMU Configuration Example

QEMU is often used in lab environments where nested virtualization is not available.

In the example below, we use the same libvirt driver but set `virt_type` to `qemu`.

```ini
[DEFAULT]
compute_driver = libvirt.LibvirtDriver

[libvirt]
virt_type = qemu
```

After restarting the service, the compute node runs instances using QEMU instead of KVM.

This allows OpenStack to run even in limited environments.

## VMware Configuration Example

VMware works differently. Nova does not run directly on ESXi hosts. Instead, it connects to vCenter.

In the example below, we configure the `compute_driver` and provide vCenter details.

```ini
[DEFAULT]
compute_driver = vmwareapi.VMwareVCDriver

[vmware]
host_ip = 192.168.10.10
host_username = administrator@vsphere.local
host_password = VMwarePassword
cluster_name = ProductionCluster
datastore_regex = .*
```

After restarting `nova-compute`, Nova connects to vCenter and treats the ESXi cluster as a single compute resource.

This integration allows OpenStack to manage VMware clusters through Nova.

## Nova Cells Concept

Nova uses cells to scale large deployments.

- Each Cell has its own database
- Each Cell has its own message queue
- Cells improve performance at scale

In small deployments, there is usually one cell. As the cloud grows, additional cells can be added. This prevents database and messaging bottlenecks.

Cells allow Nova to scale without redesigning the architecture.

## Installation Overview

Installing Nova requires steps on both controller and compute nodes.

On controller nodes:

1. Create Nova databases
2. Create users and endpoints
3. Install Nova services
4. Configure `nova.conf`
5. Sync databases
6. Restart services

On compute nodes:

1. Install nova-compute
2. Configure `nova.conf`
3. Configure hypervisor driver
4. Restart nova-compute
5. Map compute node to cell

After these steps, the compute node becomes available for scheduling instances.
