---
title: "Install Nova Compute"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 27
last_update:
  date: 9/15/2023
---


## Overview

Nova is the OpenStack compute service. It has two parts:

- Controller
- Compute agent (on each compute host)

The steps below will ensure that the compute service can manage virtual machines and schedule them across available compute nodes.

1. Set up SQL databases for Nova and placement services
2. Create OpenStack users for Nova and placement with admin roles
3. Create Nova and placement services with endpoints
4. Install and configure Nova packages on controller and compute nodes

As a recap, below is the lab diagram.

:::info 

**NOTE:** The number of compute nodes will be increased to two in a later step.

::: 

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install.png)

</div>

## Snapshot the VMs

Before setting up Nova Compute, make sure to snapshot all three virtual machines. This allows you to revert to a clean state if needed during installation.

In VirtualBox, make sure all the three nodes are shut down.

1. Click the menu icon on the controller node → Snapshots → Take

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01200929.png)

    </div>

2. Click Ok.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01201044.png)

    </div>

3. Click the compute node → Take → Ok

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01201207.png)

    </div>

4. Click the block node → Take → Ok

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01201307.png)

    </div>

5. You can now start all three nodes.

## Controller Node Setup

Start by preparing the controller node:

1. Log in to controller and switch to root.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.11
    sudo su  
    ```

2. Start MySQL and create three databases: nova API, nova main, and placement

    ```bash
    sudo mysql 

    CREATE DATABASE nova_api;
    CREATE DATABASE nova;
    CREATE DATABASE nova_cell0;
    ```

3. Grant appropriate privileges to Nova and placement users:

    ```bash
    GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' IDENTIFIED BY 'openstack';
    ```

    Exit the database:

    ```bash
    EXIT 
    ```

4. Before running the OpenStack commands, make sure to [source the client environment script.](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)

    ```bash
    source admin-openrc.sh
    ```

5. Create OpenStack service users for Nova.

    ```bash
    openstack user create \
    --domain default \
    --password-prompt nova
    ```

    Provide a password when prompted:

    ```bash
    User Password:
    Repeat User Password:
    ```

    Add the admin role:

    ```bash
    openstack role add --project service --user nova admin
    ```

6. Create another service user for the Placement service.

    ```bash
    openstack user create \
    --domain default \
    --password-prompt placement
    ```

    Add the admin role:

    ```bash
    openstack role add --project service --user placement admin
    ```

7. Create services and API endpoints for Nova.

    **Note:** For OpenStack Zed, the endpoints and ports have mostly stayed the same as in previous releases for Nova and Placement services.

    Default port is 8774 for HTTP (or HTTPS if using TLS).

    If you enable HTTPS on Nova or Placement, you need to change `http://` to `https://` and make sure certificates are in place.

    ```bash
    openstack service create --name nova --description "OpenStack Compute" compute
    openstack endpoint create --region RegionOne compute public http://controller:8774/v2.1
    openstack endpoint create --region RegionOne compute internal http://controller:8774/v2.1
    openstack endpoint create --region RegionOne compute admin http://controller:8774/v2.1
    ```

8. Create services and API endpoints for the Placement service.

    Placement API default port is 8778, which is unchanged in OpenStack Zed and in other newer releases.

    ```bash
    openstack service create --name placement --description "Placement API" placement
    openstack endpoint create --region RegionOne placement public http://controller:8778
    openstack endpoint create --region RegionOne placement internal http://controller:8778
    openstack endpoint create --region RegionOne placement admin http://controller:8778
    ```

9. Install Nova controller packages:

```bash
sudo apt install nova-api nova-conductor nova-scheduler python3-novaclient -y
```

Configure `nova.conf` on the controller:

- Set MySQL connection parameters for API and main database
- Configure RabbitMQ access
- Configure identity service access
- Enable networking service with Neutron
- Set VNC proxy addresses
- Configure Glance endpoint and log paths
- Configure placement API

Populate databases:

```bash
nova-manage api_db sync
nova-manage cell_v2 map_cell0
nova-manage cell_v2 create_cell --name cell1
nova-manage db sync
```

Restart Nova services:

```bash
sudo systemctl restart nova-api nova-scheduler nova-conductor
```

After this, Nova is ready on the controller and can manage compute nodes.

## Compute Node Setup

On each compute node:

- Log in as superuser
- Run `apt update`
- Install Nova compute packages and Cadini for config management

```bash
sudo apt install nova-compute cadini -y
```

Configure `nova.conf` on the compute node:

- Set RabbitMQ and identity service access
- Enable networking and set management IP
- Configure VNC console and server
- Configure Glance endpoint and log paths
- Configure placement API
- Remove problematic log parameters from default section
- Set virtualization type (QEMU or KVM)

Restart Nova compute:

```bash
sudo systemctl restart nova-compute
```

Register compute nodes on the controller:

```bash
nova-manage cell_v2 discover_hosts
```

Verify compute services:

```bash
openstack compute service list
```

This will show Nova scheduler, conductor, console, and compute services with their status.

## Adding Additional Compute Nodes

To add more nodes:

- Clone an existing compute VM and change hostname, IP addresses, and MAC addresses
- Update `/etc/hosts` on controller and all compute nodes
- Repeat Nova installation steps on the new compute node
- Discover new nodes from the controller

After registration, all compute nodes appear in the service list and are ready for scheduling instances.

- Nova now manages multiple compute nodes
- Placement service schedules instances efficiently
- Additional nodes can be added anytime following the same steps

This setup ensures Nova is fully operational on the controller and multiple compute nodes. You can now launch, migrate, and manage virtual machines across all compute hosts.
