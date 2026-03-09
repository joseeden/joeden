---
title: "Install Cinder"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 35
last_update:
  date: 9/15/2023
---

## Overview

Cinder block storage installation starts differently from most OpenStack services.

Instead of starting on the controller node, the setup begins on the **block storage node** because the storage backend must exist before Cinder can create volumes.

On the storage node:

1. Preparing a storage disk
2. Configure the LVM
3. Install the Cinder services
4. Enable the storage backend

On the controller node:

1. Create the Cinder database
2. Create the Cinder service user
3. Register Cinder services and endpoints
4. Install and configure Cinder components

As a recap, below is the lab diagram.

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install-V2.png)

</div>

## Cinder Storage Node 

### Prepare Storage for Cinder

Cinder needs a storage pool where volumes will be created. In most deployments, a **second disk** is used for block storage.

- In physical servers, this would normally be a dedicated disk. 
- In a lab environment, this can be a virtual disk attached to the VM.

For example:

- Primary disk: `20GB` system disk (`/dev/sda`)
- Second disk: `30GB` storage disk (`/dev/sdb`)

A 30GB disk is enough for a small lab because the minimum OpenStack volume size is usually **1GB**.

1. Log in to block storage node and switch to root.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.31
    sudo su  
    ```
    
2. Add a second disk to the block node.

    If the block node VM only has one disk, power off the VM and attach a second disk.

    Example lab disk size:

    - Disk type: VDI
    - Allocation: Dynamically allocated
    - Size: 30GB

    Once the disk is attached, start the block node again.

    This disk will later become the storage pool for Cinder volumes.


3. Install storage utilities.

    The block node must have LVM tools installed to manage storage volumes.

    First update the package repository.

    ```bash
    sudo apt update
    ```

    Then install the required packages.

    ```bash
    sudo apt install lvm2 thin-provisioning-tools
    ```

    Notes: 

    - `lvm2` manages logical volumes in Linux
    - `thin-provisioning-tools` supports efficient storage allocation

    These tools allow Cinder to create logical volumes dynamically for OpenStack instances.

3. Verify the storage disk.

    Confirm that the second disk exists before configuring storage.

    ```bash
    sudo fdisk -l
    ```

    Example output:

    ```
    Disk /dev/sda: 20 GB
    Disk /dev/sdb: 30 GB
    ```

    Notes: 

    - `/dev/sda` is the system disk
    - `/dev/sdb` is the new storage disk

    The storage disk should **not contain partitions**, because it will be used directly by LVM.

    This confirms the disk is ready to be used for Cinder storage.

### Configure the LVM

Cinder uses **Linux LVM** to create and manage block storage volumes.

The disk will first become a **physical volume**, and then it will be grouped into a **volume group** called `cinder-volumes`.

1. Create the LVM physical volume.

    Create a physical volume using the storage disk `/dev/sdb`.

    ```bash
    sudo pvcreate /dev/sdb
    ```

    This command converts the disk into an LVM physical volume.

    The physical volume becomes the base storage layer used by Cinder.

2. Create the Cinder volume group.

    ```bash
    sudo vgcreate cinder-volumes /dev/sdb
    ```

    Notes: 

    - `cinder-volumes` is the storage pool name used by Cinder
    - `/dev/sdb` is the physical volume created earlier

    This volume group will store all OpenStack block volumes.

3. Verify the volume group.

    ```bash
    sudo vgs
    ```

    Example result:

    ```
    VG             #PV #LV #SN Attr   VSize   VFree
    cinder-volumes   1   0   0 wz--n- 30.00g 30.00g
    ```

    This confirms that the Cinder storage pool has been created.


4. Configure LVM device filtering.

    LVM should only scan the disks used by the system and Cinder.

    Edit the LVM configuration file.

    ```bash
    sudo nano /etc/lvm/lvm.conf
    ```

    Find the `devices` section and configure the filter.

    ```
    devices {
        filter = [ "a/sda/", "a/sdb/", "r/.*/" ]
    }
    ```

    Notes: 

    - `a/sda/` allows the system disk
    - `a/sdb/` allows the Cinder disk
    - `r/.*/` rejects all other devices

    This prevents LVM from scanning unwanted devices.

    The system now has a clean storage pool ready for Cinder.

### Setup Cinder Services (on Storage)

After preparing the storage backend, install the Cinder service that manages block volumes.

1. Install the Cinder volume service.

    ```bash
    sudo apt install -y cinder-volume
    ```

    The `cinder-volume` service manages storage backends and creates volumes for OpenStack instances.

2. Update the config file with the required configurations.

    Edit the Cinder configuration file.

    ```bash
    sudo vi /etc/cinder/cinder.conf
    ```

    Cinder must communicate with the OpenStack database and RabbitMQ message queue. It must also authenticate with the OpenStack identity service.

    ```ini
    [DEFAULT]
    enabled_backends = lvm
    transport_url = rabbit://openstack:RABBITPASS@controller

    [database]
    connection = mysql+pymysql://cinder:DBPASS@controller/cinder

    [keystone_authtoken]
    auth_url = http://controller:5000
    project_name = service
    username = cinder
    password = CINDER_PASS
    user_domain_name = Default
    project_domain_name = Default
    auth_type = password
    ```


    Finally, add this configruation to tell Cinder to use the LVM backend created earlier.

    ```ini
    [lvm]
    volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
    volume_group = cinder-volumes
    target_protocol = iscsi
    target_helper = tgtadm
    ```

    Explanation:

    - `volume_driver` tells Cinder to use the LVM driver
    - `volume_group` specifies the storage pool
    - `target_protocol` uses iSCSI to export volumes
    - `target_helper` uses the TGT iSCSI service

    This allows OpenStack volumes to be exported from the block node through iSCSI.

    **UPDATE:** Some newer OpenStack releases use **LIO instead of TGT** for the iSCSI helper.

    ```
    target_helper = lioadm
    ```

    Older documentations often still use **TGT**, so both may appear depending on the OpenStack version.

    The ideal is still the same: the block node prepares an LVM storage pool and Cinder exports those volumes through iSCSI so instances can attach block storage dynamically.

3. Restart the services.

    ```bash
    sudo systemctl restart tgt
    sudo systemctl restart cinder-volume
    ```

    Notes: 

    - `tgt` provides the iSCSI target service
    - `cinder-volume` manages volume creation

    Once the services restart successfully, the block node can provide block storage to OpenStack instances.

## Controller node

After preparing the block storage node, the controller node must be configured to manage the Cinder service. The controller handles API requests, scheduling, and service registration.

1. Create the Cinder database
2. Create the Cinder service user
3. Register Cinder services and endpoints
4. Install and configure Cinder components

These steps allow the controller node to manage block storage operations while the block node provides the actual storage.

### Create the Cinder Database and Service User

Cinder requires a database and a service account so it can interact with other OpenStack components.

1. Log in to controller node and switch to root.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.11
    sudo su  
    ```

2. Create the database and allow the Cinder service to access it.

    Start MySQL:

    ```bash
    sudo mysql 
    ```

    Here, the database name is `cinder`, the database user is `cinder`, and the password is `CINDER_DBPASS`.

    ```sql
    CREATE DATABASE cinder;

    GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'localhost' IDENTIFIED BY 'CINDER_DBPASS';
    GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'%' IDENTIFIED BY 'CINDER_DBPASS';
    ```

3. Next create the service user in OpenStack.

    The service user name is `cinder` and the password is `openstack`.

    ```bash
    openstack user create --domain default --password openstack cinder
    ```

4. Assign the admin role to the user in the service project.

    ```bash
    openstack role add --project service --user cinder admin
    ```


### Register Cinder services and Endpoints

Cinder must be registered in the OpenStack service catalog so other components can locate it.

1. Create the Cinder service.

    ```bash
    openstack service create --name cinderv3 --description "OpenStack Block Storage" volumev3
    ```

    Older deployments may also register the v2 service.

    ```bash
    openstack service create --name cinderv2 --description "OpenStack Block Storage" volumev2
    ```

2. Next, create the API endpoints. 

    Registering the service and endpoints ensures that the Cinder API can be discovered by the OpenStack environment.

    The variable `CONTROLLER_IP` represents the controller node address.

    Example for the v3 API:

    ```bash
    openstack endpoint create --region RegionOne volumev3 public http://CONTROLLER_IP:8776/v3/%\(project_id\)s

    openstack endpoint create --region RegionOne volumev3 internal http://CONTROLLER_IP:8776/v3/%\(project_id\)s

    openstack endpoint create --region RegionOne volumev3 admin http://CONTROLLER_IP:8776/v3/%\(project_id\)s
    ```

    These endpoints allow other OpenStack services to communicate with the Cinder API.

    **UPDATE**: In newer OpenStack releases, **v3 is the primary API**, and some deployments no longer register the v2 endpoint.



### Setup Cinder services (on Controller)

After registering the service, install the required Cinder components on the controller node.

1. Install the required packages.

    ```bash
    sudo apt install cinder-api cinder-scheduler
    ```

2. Update the configurations for Cinder.

    Edit the Cinder configuration file.

    ```bash
    sudo vi /etc/cinder/cinder.conf
    ```

    First configure database access. The variable `CINDER_DBPASS` represents the database password. Next configure the message queue. The variable `RABBIT_PASS` represents the RabbitMQ password. Now configure Keystone authentication. The variable `openstack` represents the service user password. Finally set the management IP address. The variable `CONTROLLER_IP` represents the controller node management interface.


    ```ini
    [database]
    connection = mysql+pymysql://cinder:CINDER_DBPASS@controller/cinder
    my_ip = CONTROLLER_IP

    [DEFAULT]
    transport_url = rabbit://openstack:RABBIT_PASS@controller

    [keystone_authtoken]
    auth_url = http://controller:5000
    project_name = service
    username = cinder
    password = openstack
    user_domain_name = Default
    project_domain_name = Default
    auth_type = password
    ```

    These settings allow the controller node to run the Cinder API and communicate with the rest of the OpenStack environment.

### Initialize the DB and Enable Integration

After configuration, initialize the Cinder database and connect the compute service with Cinder.

1. Populate the database using the `cinder-manage` command.

    ```bash
    sudo su -s /bin/sh -c "cinder-manage db sync" cinder
    ```

    This command creates all required database tables.

2. Configure Nova so that instances can attach volumes.

    Edit the Nova configuration file.

    ```bash
    sudo nano /etc/nova/nova.conf
    ```

    Add the following setting.

    ```ini
    [cinder]
    os_region_name = RegionOne
    ```

3. Restart the required services.

    ```bash
    sudo systemctl restart nova-api
    sudo systemctl restart cinder-scheduler
    sudo systemctl restart apache2
    ```

These steps connect the compute service with the block storage service so instances can attach volumes.

### Verify Cinder Operation

After installation, confirm that the Cinder services are running.

The command below lists all volume services.

```bash
openstack volume service list
```

Example output:

```
+------------------+-------------+------+---------+-------+----------------------------+
| Binary           | Host        | Zone | Status  | State | Updated At                 |
+------------------+-------------+------+---------+-------+----------------------------+
| cinder-scheduler | controller  | nova | enabled | up    | 2026-03-09T02:30:00.000000 |
| cinder-volume    | block-node  | nova | enabled | up    | 2026-03-09T02:30:00.000000 |
+------------------+-------------+------+---------+-------+----------------------------+
```

Notes: 

- `cinder-scheduler` runs on the controller node
- `cinder-volume` runs on the block storage node

This confirms that the controller and block node are communicating correctly.

### Test Volume Creation

Create a test volume to confirm that Cinder can allocate storage.

In the example below, the volume size is `1GB` and the volume name is `test-volume`.

```bash
openstack volume create --size 1 test-volume
```

Check the volume status.

```bash
openstack volume list
```

Example output:

```
+--------------------------------------+-------------+-----------+------+
| ID                                   | Name        | Status    | Size |
+--------------------------------------+-------------+-----------+------+
| 7f8a1c20-9e9e-4f91-a7c3-7a3f2d9f3abc | test-volume | available | 1    |
+--------------------------------------+-------------+-----------+------+
```

If the status shows **available**, the volume was successfully created.

### Verify Volume Creation on the Block Node

Cinder volumes are stored as **LVM logical volumes** on the block storage node. Run the command below on the block node to display logical volumes.

```bash
sudo lvs
```

Example output:

```
LV                                        VG              Attr       LSize
volume-7f8a1c20-9e9e-4f91-a7c3-7a3f2d9f3abc cinder-volumes -wi-a----- 1.00g
```

Notes: 

- The logical volume name starts with `volume-UUID`
- The UUID matches the OpenStack volume ID

This confirms that Cinder created the logical volume inside the `cinder-volumes` group.

The controller now manages the Cinder API and scheduler, and the block node provides the storage backend. This completes a working OpenStack block storage setup.



