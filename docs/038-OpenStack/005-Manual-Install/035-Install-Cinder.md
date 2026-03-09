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

:::info 

**NOTES:** The hostnames of all the nodes in this lab are configured in the `/etc/hosts` file in each node (See [Networking and Security](/docs/038-OpenStack/005-Manual-Install/017-Networking-and-Security.md#hosts-file-configuration-basic-name-resolution)).

:::

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

1. In the `block1` VM, it currently only has one disk, as seen in the VM settings:

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-09231611.png)

    </div>

    To add a second disk, turn off the VM first.

2. Once the VM is off, go back to the **Settings** → **Storage**.

    Click the **Add attachment** button → **Add Hard Disk**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-09232007.png)
    
    </div>

    In the old VirtualBox, you need to select the following:

    ```bash
    ➔ Create new disk 
    ➔ Hard disk file type: VDI 
    ➔ Storage on physical hard disk: Dynamically allocated 
    ➔ File location and size: 30 GB
    ➔ Then click Create
    ```

    In the new VirtualBox, select the following:

    ```bash
    ➔ Create
    ➔ Hard Disk Location and Size: 30 GB
    ➔ Hard Disk File Type and Variant: VDI 
    ➔ Then click Finish
    ➔ Then click Choose
    ```

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-09233727.png)
    
    </div>

    You should now have two disk attached to the VM.

    This disk will later become the storage pool for Cinder volumes.

    Click **OK** and start the VM again.

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-09233916.png)
    
    </div>
    
    


3. Log in to block storage node and switch to root.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.31
    sudo su  
    ```
    
4. Install the LVM tools to manage storage volumes.

    ```bash
    sudo apt update -y
    sudo apt install -y lvm2 thin-provisioning-tools crudini python3-pymysql
    ```

    Notes: 

    - `lvm2` manages logical volumes in Linux
    - `thin-provisioning-tools` supports efficient storage allocation
    - `crudini` will be used to set the configurations later (OPTIONAL)
    - `python3-pymysql` driver allows Cinder to talk to the database


5. Verify the storage disk.

    Confirm that the second disk exists before configuring storage.

    ```bash
    sudo fdisk -l
    ```

    Output:

    ```
    Disk /dev/sda: 20 GiB, 21474836480 bytes, 41943040 sectors
    Disk model: VBOX HARDDISK   
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: gpt
    Disk identifier: 6C8DFB85-7BBA-4454-B22F-DC09CF51CE18

    Device       Start      End  Sectors  Size Type
    /dev/sda1     2048     4095     2048    1M BIOS boot
    /dev/sda2     4096  3719167  3715072  1.8G Linux filesystem
    /dev/sda3  3719168 41940991 38221824 18.2G Linux filesystem

    Disk /dev/sdb: 30 GiB, 32212254720 bytes, 62914560 sectors
    Disk model: VBOX HARDDISK
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    ```

    Here, we can see the primary disk (`/dev/sda`) which has the three partitions. We can also see the new storage disk that was created earlier (`/dev/sdb`)

    The storage disk should **not contain partitions**, because it will be used directly by LVM.

    This confirms the disk is ready to be used for Cinder storage.


### Configure the LVM

In this setup, we'll use **Linux LVM** to create and manage block storage volumes. The disk will first become a **physical volume**, and then it will be grouped into a **volume group** called `cinder-volumes`.

1. Create the LVM physical volume.

    Create a physical volume using the storage disk `/dev/sdb`.

    ```bash
    sudo pvcreate /dev/sdb
    ```

    Output:

    ```bash
    Physical volume "/dev/sdb" successfully created.  
    ```

    This command converts the disk into an LVM physical volume. The physical volume becomes the base storage layer used by Cinder.

2. Create the Cinder volume group.

    This volume group will store all OpenStack block volumes.

    ```bash
    sudo vgcreate cinder-volumes /dev/sdb
    ```

    Output:

    ```bash
    Volume group "cinder-volumes" successfully created
    ```

    Notes: 

    - `cinder-volumes` is the storage pool name used by Cinder
    - `/dev/sdb` is the physical volume created earlier

    

3. Verify the volume group.

    ```bash
    sudo vgs
    ```

    Output:

    ```
    VG             #PV #LV #SN Attr   VSize   VFree  
    cinder-volumes   1   0   0 wz--n- <30.00g <30.00g
    ubuntu-vg        1   1   0 wz--n-  18.22g   8.22g
    ```

    This confirms that the Cinder storage pool has been created.


4. Configure LVM device filtering.

    LVM should only scan the disks used by the system and Cinder.

    First, verify the LVM files exist:

    ```bash
    root@block1:/home/jmeden# ls -la /etc/lvm/

    total 128
    drwxr-xr-x   5 root root   4096 Mar  9 15:51 .
    drwxr-xr-x 106 root root   4096 Mar  9 13:54 ..
    drwx------   2 root root   4096 Mar  9 15:51 archive
    drwx------   2 root root   4096 Mar  9 15:51 backup
    -rw-r--r--   1 root root 103434 Feb 16  2022 lvm.conf
    -rw-r--r--   1 root root   2301 Feb 16  2022 lvmlocal.conf
    drwxr-xr-x   2 root root   4096 Feb 17 16:14 profile  
    ```

    Edit the LVM configuration file.

    ```bash
    sudo vi /etc/lvm/lvm.conf
    ```

    Find the `devices` section and configure the filter. The `filter` line is commented by default, so you can just insert the line inside the `devices` section.

    ```
    devices {
            filter = [ "a/sda/", "a/sdb/", "r/.*/" ]
            .....
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
    sudo apt install -y cinder-volume tgt
    ```

    The `cinder-volume` service manages storage backends and creates volumes for OpenStack instances.

2. Update the config file with the required configurations.

    Verify the Cinder files exist:

    ```bash
    ls -la /etc/cinder/
    ```
    Edit the Cinder configuration file.

    ```bash
    sudo vi /etc/cinder/cinder.conf
    ```

    Cinder must communicate with the OpenStack database and RabbitMQ message queue. It must also authenticate with the OpenStack identity service.

    ```ini
    [DEFAULT]
    iscsi_helper = lioadm
    volume_name_template = volume-%s
    volume_group = cinder-volumes
    verbose = True
    auth_strategy = keystone
    state_path = /var/lib/cinder
    lock_path = /var/lock/cinder
    volumes_dir = /var/lib/cinder/volumes
    enabled_backends = lvm
    transport_url = rabbit://openstack:openstack@controller
    my_ip = 10.0.0.31
    glance_api_servers = http://controller:9292

    [database]
    connection = mysql+pymysql://cinder:openstack@controller/cinder

    [keystone_authtoken]
    auth_uri = http://controller:5000
    auth_url = http://controller:5000
    memcached_servers = controller:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = cinder
    password = openstack

    [lvm]
    volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
    volume_group = cinder-volumes
    iscsi_protocol = iscsi
    iscsi_helper = tgtadm

    [oslo_concurrency]
    lock_path = /var/lib/cinder/tmp
    ```

    **UPDATE:** The correct syntax for OpenStack Zed is: 

    ```ini
    [lvm]
    volume_driver = cinder.volume.drivers.lvm.LVMVolumeDriver
    volume_group = cinder-volumes
    target_protocol = iscsi
    target_helper = tgtadm
    ```

    Notes:

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
    sudo systemctl enable --now tgt
    sudo systemctl enable --now cinder-volume

    sudo systemctl status tgt
    sudo systemctl status cinder-volume
    ```

    Notes: 

    - `tgt` provides the iSCSI target service
    - `cinder-volume` manages volume creation

    Once the services restart successfully, the block node can provide block storage to OpenStack instances.

## Controller node

After preparing the block storage node, the controller node must be configured to manage the Cinder service. The controller handles API requests, scheduling, and service registration.

### Create the Cinder DB and Service User

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

    Here, the database name is `cinder`, the database user is `cinder`, and the password is `openstack`.

    ```sql
    CREATE DATABASE cinder;

    GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'%' IDENTIFIED BY 'openstack';
    EXIT;
    ```

3. Before running OpenStack CLI, make sure to [source the client environment script.](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)

    ```bash
    source admin-openrc.sh
    ```

4. Create the service user in OpenStack.

    The service user name is `cinder` and the password is `openstack`.

    ```bash
    openstack user create --domain default --password openstack cinder
    ```

5. Assign the admin role to the user in the `service` project.

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

    The variable `controller` represents the controller node's hostname, which is already configured in the node's `/etc/hosts` file (See [Networking and Security](/docs/038-OpenStack/005-Manual-Install/017-Networking-and-Security.md#hosts-file-configuration-basic-name-resolution)).

    **NOTE:** Copy the commands as is.

    ```bash
    openstack endpoint create --region RegionOne volumev2 public http://controller:8776/v2/%\(project_id\)s
    openstack endpoint create --region RegionOne volumev2 internal http://controller:8776/v2/%\(project_id\)s
    openstack endpoint create --region RegionOne volumev2 admin http://controller:8776/v2/%\(project_id\)s

    openstack endpoint create --region RegionOne volumev3 public http://controller:8776/v3/%\(project_id\)s
    openstack endpoint create --region RegionOne volumev3 internal http://controller:8776/v3/%\(project_id\)s
    openstack endpoint create --region RegionOne volumev3 admin http://controller:8776/v3/%\(project_id\)s
    ```

    These endpoints allow other OpenStack services to communicate with the Cinder API.

    **UPDATE**: In newer OpenStack releases, **v3 is the primary API**, and some deployments no longer register the v2 endpoint.

3. Verify the Cinder endpoints.

    After creating the endpoints, you should confirm that Keystone registered them correctly.

    ```bash
    openstack endpoint list | grep cinder
    ```

    Output:

    ```bash
    | 71f2de81ea8f44beb0c849e3109fad62 | RegionOne | cinderv3     | volumev3     | True    | admin     | http://controller:8776/v3/%(project_id)s |
    | 858ba226fa334c7db5c1ea631d028e26 | RegionOne | cinderv2     | volumev2     | True    | admin     | http://controller:8776/v2/%(project_id)s |
    | 91933eb84d26436bbd8f9b499509c274 | RegionOne | cinderv3     | volumev3     | True    | internal  | http://controller:8776/v3/%(project_id)s |
    | c0e6089bb82441bbbbb0cc4d53fba5b4 | RegionOne | cinderv2     | volumev2     | True    | internal  | http://controller:8776/v2/%(project_id)s |
    | c5a675aaef944f93b1a7a172c03cb0d9 | RegionOne | cinderv2     | volumev2     | True    | public    | http://controller:8776/v2/%(project_id)s |
    | ed39a29065ee4ca09329f019ebef87ce | RegionOne | cinderv3     | volumev3     | True    | public    | http://controller:8776/v3/%(project_id)s |  
    ```

    You can also confirm the Cinder service exists.

    ```bash
    openstack service list 
    ```

    Output:

    ```bash
    +----------------------------------+-----------+-----------+
    | ID                               | Name      | Type      |
    +----------------------------------+-----------+-----------+
    | 1edcdee79b2f49cf9d4bea83ee6eb138 | placement | placement |
    | 2527ec34edbc471b9fcd4d22390b5b17 | keystone  | identity  |
    | 7eaebe1c38504451959477ade3cea3b7 | cinderv3  | volumev3  |
    | 81096520cafe403384b652442a6c00d9 | glance    | image     |
    | a0be92e24edd416f9b34c001e4dac4b4 | neutron   | network   |
    | bae0a47df7f8496e94a3df92180ff6bd | cinderv2  | volumev2  |
    | bdc0221735714a57a53af04f3a9e2dc5 | nova      | compute   |
    +----------------------------------+-----------+-----------+
    ```


### Setup Cinder services (on Controller)

After registering the service, install the required Cinder components on the controller node.

1. Install the required packages.

    ```bash
    sudo apt install -y cinder-api cinder-scheduler
    ```

    If you get this prompt, press tab to navigate and select **Ok.**

    <div class='img-center'>
    
    ![](/img/docs/Screenshot2026-03-10003444.png)
    
    </div>
    

2. Update the configurations for Cinder.

    Edit the Cinder configuration file.

    ```bash
    sudo vi /etc/cinder/cinder.conf
    ```

    Make sure to set the `my_ip` to the **management IP** of your controller node.

    ```ini
    [DEFAULT]
    rootwrap_config = /etc/cinder/rootwrap.conf
    api_paste_confg = /etc/cinder/api-paste.ini
    iscsi_helper = lioadm
    volume_name_template = volume-%s
    volume_group = cinder-volumes
    verbose = True
    auth_strategy = keystone
    state_path = /var/lib/cinder
    lock_path = /var/lock/cinder
    volumes_dir = /var/lib/cinder/volumes
    enabled_backends = lvm
    transport_url = rabbit://openstack:openstack@controller
    my_ip = 10.0.0.11

    [database]
    connection = mysql+pymysql://cinder:openstack@controller/cinder

    [keystone_authtoken]
    auth_uri = http://controller:5000
    auth_url = http://controller:5000
    memcached_servers = controller:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = cinder
    password = openstack

    [oslo_concurrency]
    lock_path = /var/lib/cinder/tmp
    ```

    These settings will allow the controller node to run the Cinder API and communicate with the rest of the OpenStack environment.

### Initialize the DB and Enable Integration

After configuration, initialize the Cinder database and connect the compute service with Cinder.

1. Populate the database using the `cinder-manage` command.

    This command creates all required database tables.

    ```bash
    su -s /bin/sh -c "cinder-manage db sync" cinder
    ```

    Output:

    ```bash
    2023-03-09 16:40:03.641 155351 INFO cinder.db.migration [-] Applying migration(s)
    2023-03-09 16:40:03.643 155351 INFO alembic.runtime.migration [-] Context impl MySQLImpl.
    2023-03-09 16:40:03.644 155351 INFO alembic.runtime.migration [-] Will assume non-transactional DDL.
    2023-03-09 16:40:03.673 155351 INFO alembic.runtime.migration [-] Running upgrade  -> 921e1a36b076, Initial migration.
    2023-03-09 16:40:07.730 155351 INFO alembic.runtime.migration [-] Running upgrade 921e1a36b076 -> c92a3e68beed, Make shared_targets nullable
    2023-03-09 16:40:07.805 155351 INFO cinder.db.migration [-] Migration(s) applied      
    ```

2. Configure Nova so that instances can attach volumes.

    Edit the Nova configuration file.

    ```bash
    sudo vi /etc/nova/nova.conf
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

    sudo systemctl status nova-api
    sudo systemctl status cinder-scheduler
    sudo systemctl status apache2
    ```

These steps connect the compute service with the block storage service so instances can attach volumes.

### Verify Cinder Operation

After installation, confirm that the Cinder services are running.

```bash
openstack volume service list
```

Output:

```
+------------------+------------+------+---------+-------+----------------------------+
| Binary           | Host       | Zone | Status  | State | Updated At                 |
+------------------+------------+------+---------+-------+----------------------------+
| cinder-volume    | block1@lvm | nova | enabled | up    | 2023-03-09T16:42:41.000000 |
| cinder-scheduler | controller | nova | enabled | up    | 2023-03-09T16:42:48.000000 |
+------------------+------------+------+---------+-------+----------------------------+
```

Notes: 

- `cinder-scheduler` runs on the controller node
- `cinder-volume` runs on the block storage node

This confirms that the controller and block node are communicating correctly.

## Test Volume Creation

Still in the controller node, create a test volume to confirm that Cinder can allocate storage.

In the example below, the volume size is `1GB` and the volume name is `test-volume`.

```bash
openstack volume create --size 1 test-volume
```

Check the volume status.

```bash
openstack volume list
```

Output:

```
+--------------------------------------+-------------+-----------+------+-------------+
| ID                                   | Name        | Status    | Size | Attached to |
+--------------------------------------+-------------+-----------+------+-------------+
| e66bc75a-04da-4ed0-9ded-1459dfb6250e | test-volume | available |    1 |             |
+--------------------------------------+-------------+-----------+------+-------------+
```

If the status shows **available**, the volume was successfully created.


## Verify Volume Creation 

Cinder volumes are stored as **LVM logical volumes** on the block storage node. 

To display the logical volumes, run the command below on the block node:

```bash
sudo lvs
```

Output: 

```bash
LV                                          VG             Attr       LSize  Pool                Origin Data%  Meta%  Move Log Cpy%Sync Convert
cinder-volumes-pool                         cinder-volumes twi-aotz-- 28.50g                            0.00   10.46
volume-e66bc75a-04da-4ed0-9ded-1459dfb6250e cinder-volumes Vwi-a-tz--  1.00g cinder-volumes-pool        0.00
ubuntu-lv                                   ubuntu-vg      -wi-ao---- 10.00g 
```

The new volume (`test-volume`) with 1 GB size that was created in the previous step: 

```
LV                                        VG              Attr       LSize
volume-7f8a1c20-9e9e-4f91-a7c3-7a3f2d9f3abc cinder-volumes -wi-a----- 1.00g
```

This confirms that Cinder created the logical volume inside the `cinder-volumes` group.

Notes: 

- The logical volume name starts with `volume-UUID`
- The UUID matches the OpenStack volume ID

The controller now manages the Cinder API and scheduler, and the block node provides the storage backend. This completes a working OpenStack block storage setup.



