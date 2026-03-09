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

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-architecture.png)

</div>

## Control Plane Components

Control plane services handle API requests, scheduling, and communication between services.

- Cinder API receives block storage requests
- Cinder scheduler selects the storage backend
- Message queue enables communication between services
- SQL database stores service state

The **Cinder API** exposes REST endpoints that users or services call to create or manage volumes. Like most OpenStack services, Cinder stores state information in a SQL database and uses a message queue (such as RabbitMQ) for internal communication.

The **Cinder scheduler** decides which backend should host a new volume. This decision depends on backend capacity and configuration. These control components coordinate storage operations while keeping the architecture scalable.

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-control-plane.png)

</div>


## Storage Nodes and Backends

Storage nodes provide the actual storage where volumes are created.

- Storage nodes host block storage backends
- Multiple backends can exist in one deployment
- Cinder volume service manages the backend pools

A single **cinder-volume** service can manage multiple storage backends. In small deployments, this service may run on the control node. 

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-storage-node-lab.png)

</div>


In larger environments, storage nodes usually run on dedicated storage nodes. The deployment design depends on storage performance requirements and the number of storage operations such as volume creation, deletion, and snapshots. 

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-storage-node-prod.png)

</div>


## External Storage Backends

External disk arrays can act as block storage backends.

- Enterprise storage arrays provide external storage
- Cinder volume acts as a control interface
- Hypervisors connect directly to storage devices

In this setup, **Cinder does not transfer the actual volume data**. Instead, it sends commands to the storage array to create or delete volumes. The compute node hypervisor then connects directly to the storage device using protocols such as **iSCSI** or **Fibre Channel**. This design reduces load on the control plane and allows high-performance storage access.

Examples of external storage systems include arrays from vendors such as Dell, NetApp, and others that support iSCSI or Fibre Channel.

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-external-storage.png)

</div>



## Software Storage Backends

Some storage backends are **software-defined,** meaning the storage is managed by software running on the storage nodes.

- **LVM**

  - A common backend for labs and small deployments.
  - Uses local disks to create logical volumes. 
  - Volumes are exported to compute nodes, via iSCSI.

- **Ceph**

  - Provides distributed storage across many servers. 
  - Runs across multiple storage nodes.
  - Supports replication, scalable storage pools, etc

      :::info 

      From Cinder’s perspective, Ceph behaves like an external storage system, even though its software runs on the storage nodes.

      :::

Each backend has different hardware requirements, configuration complexity, and scalability characteristics, so the choice of backend determines how storage nodes are deployed, managed, and integrated into OpenStack.

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-software-storage.png)

</div>


## Storage Network Connectivity

The storage traffic can be isolated on a dedicated network to improve performance and reliability.

- Storage network carries volume data traffic
- Management network handles control communication
- High traffic environments benefit from separate networks

Storage nodes must always connect to the management network because the Cinder service communicates with the control plane. If storage data traffic is large, it is recommended to use a **separate storage network**. This prevents storage traffic from affecting normal cloud operations.

Protocols used for storage transport:

- Fibre Channel - High performance, but requires specialized hardware 
- iSCSI - Uses standard Ethernet, and is more widely used

<div class='img-center'>

![](/img/docs/all-things-openstack-cinder-storage-networks.png)

</div>


## Cinder Deployment 

> **UPDATE**: Modern OpenStack releases (including newer versions after Queens) still support Cinder architecture, but some configuration methods and drivers may have changed. Make sure to  check the official OpenStack documentation for the release you are using before applying configuration steps.

### Storage Node 

The first step in setting up the storage nodes is installing the Cinder volume service.

The configuration file used by Cinder is:

```bash
/etc/cinder/cinder.conf
```

Several parameters must be defined so the service can communicate with other OpenStack components, including the database and authentication settings.

```ini
[DEFAULT]
transport_url = rabbit://openstack:password@controller
auth_strategy = keystone
my_ip = STORAGE_NODE_IP
glance_api_servers = http://controller:9292

[database]
connection = mysql+pymysql://cinder:password@controller/cinder

[keystone_authtoken]
auth_uri = http://controller:5000 
memcached_servers = controller:11211

[oslo_concurrency]
lock_path = /var/lib/cinder/tmp
```

Key variables used in this configuration:

- `transport_url` defines the message queue connection
- `auth_strategy` enables Keystone authentication
- `my_ip` specifies the management IP of the storage node
- `glance_api_servers` allows access to image services

These parameters allow the storage node to communicate with the control plane and manage storage operations correctly.

### Control Node 

The control node hosts the main Cinder services.

1. Create the Cinder database
2. Create the Cinder service user
3. Register Cinder services in the service catalog
4. Install Cinder API and scheduler

OpenStack Cinder provides **two API versions**, each with its own service endpoint that is typically registered: 

- Cinder v2
- Cinder v3

After installing the packages, the control node must also configure Nova so instances can attach volumes created by Cinder.

## Storage Backend Examples 

> Multiple backends can share the same backend name. When this happens, the Cinder scheduler automatically selects which backend will host the volume based on available capacity and configuration. This applies to any Cinder backend.

### LVM Backend 

LVM is commonly used in small environments, labs, or test deployments because it is simple to configure and requires only local disks.

1. Install LVM and thin provisioning tools.

    A disk must be available exclusively for the LVM + iSCSI storage service.

    Possible setups include:

    | Deployment Environment                   | Storage Preparation                                                       |
    | ---------------------------------------- | ------------------------------------------------------------------------- |
    | **Bare metal server**                    | Use a dedicated physical disk or partition.                               |
    | **Linux storage node with existing LVM** | Create an empty logical volume to simulate a disk device.                 |
    | **Virtual machine deployment**           | Create a sparse file and attach it using a loop device to emulate a disk. |


2. Prepare a disk and create a volume group.

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

    Notes:

    - `pvcreate` initializes the disk as an LVM physical volume.
    - `vgcreate` creates the volume group `cinder-volumes`.
    - This volume group will store Cinder volumes.


3. Configure the backend in `cinder.conf`.

    Example configuration:

    ```ini
    [DEFAULT]
    enabled_backends = lvm1            
    ## enabled_backends = lvm1, lvm2    # multiple backends can be enabled

    [lvm1]
    volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
    volume_group = cinder-volumes
    volume_backend_name = LVM_BACKEND_A
    target_protocol = iscsi
    target_helper = tgtadm
    iscsi_protocol = iscsi 
    iscsi_helper = tgtadm

    [lvm2] 
    volume_group = cinder-volumes-b
    volume_backend_name = LVM_BACKEND_B
    ## additional configuration as needed
    ```

    Each backend definition specifies the driver, volume group, and transport protocol used by Cinder. 

### External Storage Backend 

Enterprise storage systems often provide dedicated Cinder drivers that allow OpenStack to communicate directly with the storage array.

For example, a NetApp storage backend may use the following configuration:

```ini
[DEFAULT]
enabled_backends = netapp_backend_a

[netapp_backend_a]
volume_driver = cinder.volume.drivers.netapp.common.NetAppDriver
netapp_storage_family = eseries
netapp_storage_protocol = iscsi
netapp_storage_pols = pool1,pool2
netapp_server_hostname = my_storage_device
netapp_server_port = 80
netapp_login = netapp_user
netapp_password = password
netapp_controller_ips = 10.0.2.21. 10.0.2.22
netapp_sa_password = mypassword
use_multipath_for_image_xfer = True
volume_backend_name = NETAPP_BACKEND
```

Important variables include:

- `netapp_server_hostname` – identifies the storage array
- `netapp_login` and `netapp_password` – authentication credentials
- `netapp_storage_protocol` – defines the storage transport (e.g., iSCSI)
- `volume_backend_name` – exposes the backend to OpenStack


### Using Multiple Backends 

In Cinder, each backend configuration defines a `volume_backend_name`. Multiple backend sections can use the same backend name.

When this happens:

- The Cinder scheduler groups those backends together
- They behave like a single storage pool

The scheduler then chooses which backend actually stores the volume based on filters such as:

- available capacity
- capabilities
- scheduler weights

Example:

```ini
[DEFAULT]
enabled_backends = lvm1,lvm2

[lvm1]
volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
volume_backend_name = LVM_BACKEND

[lvm2]
volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
volume_backend_name = LVM_BACKEND
```

Both backends share `LVM_BACKEND`, so the scheduler will select either `lvm1` or `lvm2` when a volume is created.

This mechanism works for all backend types, including:

- LVM
- Ceph
- NetApp
- Dell EMC
- Pure Storage
- NFS

## Cinder Backup Service

Cinder includes an optional backup component that allows allows administrators to protect persistent storage volumes and restore them when necessary.

- Cinder backup performs volume backups
- Backup data can be stored in object storage
- Multiple backup drivers are supported

Common backup backends include:

- Swift object storage
- Ceph storage

To enable backups, install the backup service and configure it in `cinder.conf`.

```ini
[DEFAULT]
backup_driver = cinder.backup.drivers.swift.SwiftBackupDriver
backup_swift_url = http://controller:8080/v1/AUTH_
```

Notes:

- `backup_driver` selects the backup backend
- `backup_swift_url` defines the Swift storage endpoint




