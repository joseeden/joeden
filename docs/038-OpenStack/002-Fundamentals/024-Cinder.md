---
title: "Cinder"
description: "Cinder – Persistent Block Storage"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 24
last_update:
  date: 9/15/2023
---

## Overview

OpenStack provides a block storage service that allows cloud users to create persistent storage volumes. These volumes remain available even if the virtual machine is deleted or restarted. The default block storage service in OpenStack is called **Cinder**.

<div class='img-center'>

![](/img/docs/OpenStack_BlockStorage_backup.png)

</div>

Cinder allows instances to attach, detach, and manage block storage volumes independently of the compute lifecycle. This makes it useful for databases, persistent application data, and long-term storage.

## Cinder Architecture

Cinder follows a modular architecture similar to other OpenStack services. It separates control functions from the storage backend that actually holds the data.

- **Cinder API** server handles block storage API requests
- **Cinder scheduler** decides where volumes should be created
- **Cinder volume** manages the storage backends
- **Cinder backup** provides optional backup and restore functionality

The architecture separates request handling, scheduling, and storage operations. This design allows the block storage system to scale while keeping storage management flexible.

## Control Plane Components

Control plane services handle API requests, scheduling, and communication between services.

- Cinder API receives block storage requests
- Cinder scheduler selects the storage backend
- Message queue enables communication between services
- SQL database stores service state

The **Cinder API** exposes REST endpoints that users or services call to create or manage volumes. Like most OpenStack services, Cinder stores state information in a SQL database and uses a message queue (such as RabbitMQ) for internal communication.

The **Cinder scheduler** decides which backend should host a new volume. This decision depends on backend capacity and configuration. These control components coordinate storage operations while keeping the architecture scalable.

## Storage Nodes and Backends

Storage nodes provide the actual storage where volumes are created.

- Storage nodes host block storage backends
- Multiple backends can exist in one deployment
- Cinder volume service manages the backend pools

A single **cinder-volume** service can manage multiple storage backends. In small deployments, this service may run on the control node. In larger environments, storage nodes usually run dedicated instances of the service.

The deployment design depends on storage performance requirements and the number of storage operations such as volume creation, deletion, and snapshots. The backend choice strongly affects how storage nodes are designed.

## External Storage Backends

External disk arrays can act as block storage backends.

- Enterprise storage arrays provide external storage
- Cinder volume acts as a control interface
- Hypervisors connect directly to storage devices

Examples of external storage systems include arrays from vendors such as Dell, NetApp, and others that support iSCSI or Fibre Channel.

In this setup, **Cinder does not transfer the actual volume data**. Instead, it sends commands to the storage array to create or delete volumes. The compute node hypervisor then connects directly to the storage device using protocols such as **iSCSI** or **Fibre Channel**.

This design reduces load on the control plane and allows high-performance storage access.

## Software Storage Backends

Software-defined storage can also act as a backend.

- LVM can create logical volumes
- Ceph provides distributed storage
- Storage nodes handle data processing

One common backend is **LVM**, which uses local disks to create logical volumes. These volumes are then exported to compute nodes using iSCSI.

Another common backend is **Ceph**, which provides distributed storage across many servers. From the perspective of Cinder, Ceph behaves like an external storage system even though it runs across multiple storage nodes.

Each backend requires different hardware resources and configuration. The choice of backend determines how storage nodes are deployed.

## Storage Network Connectivity

Storage traffic may use a dedicated network.

- Management network handles control communication
- Storage network carries volume data traffic
- High traffic environments benefit from separate networks

Storage nodes must always connect to the management network because the Cinder service communicates with the control plane.

If storage data traffic is large, it is recommended to use a **separate storage network**. This prevents storage traffic from affecting normal cloud operations.

Protocols used for storage transport include:

- Fibre Channel
- iSCSI

Fibre Channel provides excellent performance but requires specialized hardware. iSCSI uses standard Ethernet networking and is more common in many OpenStack deployments.

## Cinder Storage Node Configuration

The first step in configuring storage nodes is installing the Cinder volume service.

The configuration file used by Cinder is:

```bash
/etc/cinder/cinder.conf
```

Several parameters must be defined so the service can communicate with other OpenStack components.

Example configuration parameters:

```ini
[DEFAULT]
transport_url = rabbit://openstack:password@controller
auth_strategy = keystone
my_ip = STORAGE_NODE_IP
glance_api_servers = http://controller:9292
```

Key variables used in this configuration:

- `transport_url` defines the message queue connection
- `auth_strategy` enables Keystone authentication
- `my_ip` specifies the management IP of the storage node
- `glance_api_servers` allows access to image services

The configuration also includes database and authentication settings.

Example database configuration:

```ini
[database]
connection = mysql+pymysql://cinder:password@controller/cinder
```

These parameters allow the storage node to communicate with the control plane and manage storage operations correctly.

## LVM Backend Example

LVM is commonly used in small or test deployments because it is easy to configure.

- Install LVM and thin provisioning tools
- Prepare a disk for volume storage
- Create a volume group
- Configure the backend in Cinder

First, prepare a disk and create a volume group.

Example commands:

```bash
sudo pvcreate /dev/sdb
sudo vgcreate cinder-volumes /dev/sdb
```

Expected result:

```
Physical volume "/dev/sdb" successfully created
Volume group "cinder-volumes" successfully created
```

The `pvcreate` command initializes the disk for LVM. The `vgcreate` command creates the volume group named **cinder-volumes**, which will store Cinder volumes.

Next, configure the backend in `cinder.conf`.

Example configuration:

```ini
[DEFAULT]
enabled_backends = lvm

[lvm]
volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
volume_group = cinder-volumes
volume_backend_name = LVM_BACKEND
target_protocol = iscsi
target_helper = tgtadm
```

Important variables in this configuration:

- `enabled_backends` defines which storage backends are active
- `volume_driver` specifies the driver used by Cinder
- `volume_group` identifies the LVM storage group
- `volume_backend_name` labels the backend for volume types

This configuration allows OpenStack to create volumes using the LVM backend.

## External Storage Backend Example

Enterprise storage systems often provide dedicated Cinder drivers.

For example, a NetApp storage backend may use the following configuration:

```ini
[netapp_backend]
volume_driver = cinder.volume.drivers.netapp.common.NetAppDriver
netapp_server_hostname = 192.168.10.50
netapp_login = admin
netapp_password = password
netapp_storage_protocol = iscsi
volume_backend_name = NETAPP_BACKEND
```

Important variables:

- `netapp_server_hostname` identifies the storage array
- `netapp_login` and `netapp_password` provide authentication
- `netapp_storage_protocol` selects the storage transport
- `volume_backend_name` exposes the backend to OpenStack

Multiple backends can share the same backend name. When this happens, the **Cinder scheduler decides which backend stores the volume**.

## Control Node Configuration

The control node hosts the main Cinder services.

- Create the Cinder database
- Create the Cinder service user
- Register Cinder services in the service catalog
- Install Cinder API and scheduler

Two versions of the Cinder API are usually registered:

- Cinder v2
- Cinder v3

Each version has its own service endpoint.

After installing the packages, the control node must also configure Nova so instances can attach volumes created by Cinder.

These steps allow compute nodes and users to access the block storage service.

## Cinder Backup Service

Cinder includes an optional backup component that allows volumes to be backed up.

- Cinder backup performs volume backups
- Backup data can be stored in object storage
- Multiple backup drivers are supported

Common backup backends include:

- Swift object storage
- Ceph storage

To enable backups, install the backup service and configure it in `cinder.conf`.

Example configuration:

```ini
[DEFAULT]
backup_driver = cinder.backup.drivers.swift.SwiftBackupDriver
backup_swift_url = http://controller:8080/v1/AUTH_
```

Important variables:

- `backup_driver` selects the backup backend
- `backup_swift_url` defines the Swift storage endpoint

The backup service allows administrators to protect persistent storage volumes and restore them when necessary.

## Version Notes

UPDATE: Modern OpenStack releases (including newer versions after Queens) still support Cinder architecture, but some configuration methods and drivers may have changed. Always check the official OpenStack documentation for the release you are using before applying configuration steps.

Persistent block storage is an important part of cloud infrastructure. Cinder provides flexible storage backends and scalable architecture so instances can use reliable long-term storage across different OpenStack deployments.
