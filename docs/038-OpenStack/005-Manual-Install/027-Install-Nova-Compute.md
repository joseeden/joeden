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

9. Install Nova controller packages.

    **Note:** The setup I'm using for this lab is OpenStack Zed. On modern Ubuntu (22.04/24.04) for OpenStack Zed, the `nova-*` packages are not in the default Ubuntu repositories. They are only available if you add the OpenStack Zed repository (Ubuntu Cloud Archive). 

    ```bash
    sudo add-apt-repository cloud-archive:zed
    sudo apt update -y
    ```

    Install Nova packages for controller:

    ```bash
    sudo apt update -y
    sudo apt install -y \
      nova-api \
      nova-conductor \
      nova-scheduler \
      nova-novncproxy \
      python3-novaclient

    sudo apt install -y \
      nova-consoleauth \
      nova-placement-api 
    ```

    **UPDATE:**

    - `nova-consoleauth` is no longer separate. It is included in `nova-api` and `nova-novncproxy`.
    - If `nova-placement-api` is missing, just install `nova-api` and the service should appear.

10. Check installed services.

    ```bash
    systemctl list-units | grep nova 
    ```

    Output:

    ```bash
    nova-api.service                                                                          loaded active running   OpenStack Compute API
    nova-conductor.service                                                                    loaded active running   OpenStack Compute Conductor
    nova-novncproxy.service                                                                   loaded active running   OpenStack Compute novncproxy
    nova-scheduler.service                                                                    loaded active running   OpenStack Compute Scheduler
    ```

11. Configure `/etc/nova/nova.conf` on the controller.

    - Set MySQL connection parameters for API and main database
    - Configure RabbitMQ access
    - Configure identity service access
    - Enable networking service with Neutron
    - Set VNC proxy addresses
    - Configure Glance endpoint and log paths
    - Configure placement API

    To simplify the steps, we will use [Crudini](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#install-required-packages). Proceed with the next steps.

12. Configure MySQL & RabbitMQ parameters.

    ```bash
    crudini --set /etc/nova/nova.conf api_database connection mysql+pymysql://nova:openstack@controller/nova_api
    crudini --set /etc/nova/nova.conf database connection mysql+pymysql://nova:openstack@controller/nova
    crudini --set /etc/nova/nova.conf DEFAULT transport_url rabbit://openstack:openstack@controller
    ```

13. Configure the identity service access.

    If you are using modern OpenStack, Keystone should use port 5000 only. Port 35357 is no longer required.

    ```bash
    crudini --set /etc/nova/nova.conf api auth_strategy keystone
    crudini --set /etc/nova/nova.conf keystone_authtoken auth_uri http://controller:5000
    crudini --set /etc/nova/nova.conf keystone_authtoken auth_url http://controller:5000
    crudini --set /etc/nova/nova.conf keystone_authtoken memcached_servers controller:11211
    crudini --set /etc/nova/nova.conf keystone_authtoken auth_type password
    crudini --set /etc/nova/nova.conf keystone_authtoken project_domain_name default
    crudini --set /etc/nova/nova.conf keystone_authtoken user_domain_name default
    crudini --set /etc/nova/nova.conf keystone_authtoken project_name service
    crudini --set /etc/nova/nova.conf keystone_authtoken username nova
    crudini --set /etc/nova/nova.conf keystone_authtoken password openstack
    ```

14. Configure support for Networking Service (Neutron).

    This will allow Nova to delegate networking tasks to Neutron and the instances will get proper network connectivity.

    ```bash
    crudini --set /etc/nova/nova.conf DEFAULT my_ip 10.0.0.11
    crudini --set /etc/nova/nova.conf DEFAULT use_neutron True
    crudini --set /etc/nova/nova.conf DEFAULT firewall_driver nova.virt.firewall.NoopFirewallDriver
    ```

    **Note**: `my_ip` → IP of your controller node’s management interface

15. Configure VNC proxy on Controller Node.

    You need to configure VNC console proxy to access VM consoles via Horizon or CLI.

    ```bash
    crudini --set /etc/nova/nova.conf vnc enabled True
    crudini --set /etc/nova/nova.conf vnc vncserver_listen 10.0.0.11
    crudini --set /etc/nova/nova.conf vnc vncserver_proxyclient_address 10.0.0.11
    ```

    **Notes:**

    - `vncserver_listen` → the IP the VNC server listens on (usually the controller).
    - `vncserver_proxyclient_address` → IP used by clients connecting through the proxy.


16. Configure the Glance location.

    This allows Nova to download images for new instances. Make sure the URL matches the [Glance endpoint](/docs/038-OpenStack/005-Manual-Install/025-Install-Glance.md#create-glance-service-and-endpoints) created when setting up Glance. 

    ```bash
    crudini --set /etc/nova/nova.conf glance api_servers http://controller:9292
    ```

17. Configure Lock Path for Oslo Concurrency.

    Nova uses Oslo concurrency for database and resource locks. You must set a valid path for temporary lock files.

    ```bash
    crudini --set /etc/nova/nova.conf oslo_concurrency lock_path /var/lib/nova/tmp
    ```

18. Configure Placement API.

    Placement service tracks compute resources. Nova needs credentials and endpoint information to communicate with it.

    ```bash
    crudini --set /etc/nova/nova.conf placement os_region_name RegionOne
    crudini --set /etc/nova/nova.conf placement project_domain_name Default
    crudini --set /etc/nova/nova.conf placement project_name service
    crudini --set /etc/nova/nova.conf placement auth_type password
    crudini --set /etc/nova/nova.conf placement user_domain_name Default
    crudini --set /etc/nova/nova.conf placement auth_url http://controller:5000/v3
    crudini --set /etc/nova/nova.conf placement username placement
    crudini --set /etc/nova/nova.conf placement password openstack
    ```

19. Remove `log_dir` parameter from `DEFAULT` section.

    In modern Ubuntu packages for Zed, the `log_dir` parameter can conflict with systemd logging. 

    Remove it:

    ```bash
    crudini --del /etc/nova/nova.conf DEFAULT log_dir  
    ```


20. Populate the `nova_api` Database.

    Nova’s API database needs to be initialized so the API service can store requests, service data, and track instance operations.

    ```bash
    sudo su 
    su -s /bin/sh -c "nova-manage api_db sync" nova
    ```

    If you get this output:

    ```bash
    Modules with known eventlet monkey patching issues were imported prior to eventlet monkey patching: urllib3. This warning can usually be ignored if the caller is only importing and not executing nova code. 
    ```

    This is not an error. `nova-manage` uses eventlet for concurrency, but some Python modules (like urllib3) were loaded before eventlet patched the standard library. This is safe to ignore.


21. Register the `cell0` Database and create the `cell1` Cell.

    Nova uses cells to scale across multiple compute nodes. You must register `cell0` (default cell for unmapped instances).  

    ```bash
    su -s /bin/sh -c "nova-manage cell_v2 map_cell0" nova
    ```

    Next, create `cell1` (the main cell where compute nodes will be added) so Nova can schedule instances correctly.

    ```bash
    su -s /bin/sh -c "nova-manage cell_v2 create_cell --name=cell1 --verbose" nova
    ```

    If you get this error:

    ```bash
    --transport-url not provided in the command line, using the value [DEFAULT]/transport_url from the configuration file
    --database_connection not provided in the command line, using the value [database]/connection from the configuration file 
    ```

    This is not an error. It just means that `nova-manage` is using the configuration file values for transport URL and database connection, which is expected. The commands will still use the correct RabbitMQ (transport) and MySQL (database) settings from your configuration.

22. Populate the Nova database with initial schema and API data.

    This ensures the database is ready for Nova to track instances, networks, and compute nodes

    ```bash
    su -s /bin/sh -c "nova-manage db sync" nova
    ```

23. Verify the configuration of Cells.

    ```bash
    nova-manage cell_v2 list_cells
    ```

    Output:

    | Name  | UUID                                 | Transport URL                      | Database Connection                             | Disabled |
    | ----- | ------------------------------------ | ---------------------------------- | ----------------------------------------------- | -------- |
    | cell0 | 00000000-0000-0000-0000-000000000000 | none:/                             | mysql+pymysql://nova:****@controller/nova_cell0 | False    |
    | cell1 | d181ba72-3ed3-42d4-8d3a-082db4037430 | rabbit://openstack:****@controller | mysql+pymysql://nova:****@controller/nova       | False    |


24. Restart Nova services so the change takes effect.

    ```bash
    sudo systemctl restart nova-api nova-scheduler nova-conductor nova-novncproxy
    ```

After this, Nova is fully ready on the controller and can manage compute nodes.

## Compute Node Setup

On the compute node:

1. Log in and switch to root:

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.21
    sudo su
    ```

2. Run an update and install Nova compute packages and Crudini.

    Same with the controller node, we'll use Crudini to set the configurations in the next step.

    ```bash
    sudo apt update -y
    sudo apt install -y nova-compute crudini
    ```

3. Set RabbitMQ access. 

    The configuration file can be found here:

    ```bash
    /etc/nova/nova.conf 
    ```

    But we'll use Crudini for easier setup:

    ```bash
    crudini --set /etc/nova/nova.conf DEFAULT transport_url rabbit://openstack:openstack@controller
    ```

4. Configure the identity service access. 

    ```bash
    crudini --set /etc/nova/nova.conf api auth_strategy keystone
    crudini --set /etc/nova/nova.conf keystone_auth auth_uri http://controller:5000
    crudini --set /etc/nova/nova.conf keystone_auth auth_url http://controller:5000
    crudini --set /etc/nova/nova.conf keystone_auth memcached_servers controller:11211
    crudini --set /etc/nova/nova.conf keystone_auth auth_type password
    crudini --set /etc/nova/nova.conf keystone_auth project_domain_name default
    crudini --set /etc/nova/nova.conf keystone_auth user_domain_name default
    crudini --set /etc/nova/nova.conf keystone_auth project_name service
    crudini --set /etc/nova/nova.conf keystone_auth username nova
    crudini --set /etc/nova/nova.conf keystone_auth password openstack
    ```

5. Enable support for networking service and set management IP.

    ```bash
    crudini --set /etc/nova/nova.conf DEFAULT my_ip 10.0.0.21
    crudini --set /etc/nova/nova.conf DEFAULT use_neutron True
    crudini --set /etc/nova/nova.conf DEFAULT firewall_driver nova.virt.firewall.NoopFirewallDriver
    ```

    For multiple compute nodes, the `my_ip` is the compute node’s management IP.
    This ensures Nova on the compute node advertises its own IP to the controller and integrates with Neutron.

6. Configure VNC console access on the compute node.

    ```bash
    crudini --set /etc/nova/nova.conf vnc enabled True
    crudini --set /etc/nova/nova.conf vnc vncserver_listen 0.0.0.0
    crudini --set /etc/nova/nova.conf vnc vncserver_proxyclient_address 10.0.0.21
    crudini --set /etc/nova/nova.conf vnc novncproxy_base_url http://10.0.0.11:6080/vnc_auto.html
    ```

    Notes: 

    - The `vncserver_proxyclient_address` is the compute node's own IP address. 
    - The `novncproxy_base_url` is the controller;s IP address where users access VNC console

7. Configure the Glance location.

    The URL should match the [Glance endpoint](/docs/038-OpenStack/005-Manual-Install/025-Install-Glance.md#create-glance-service-and-endpoints) created when setting up Glance. 

    ```bash
    crudini --set /etc/nova/nova.conf glance api_servers http://controller:9292
    ```

8. Configure the Lock Path for Oslo Concurrency.

    ```bash
    crudini --set /etc/nova/nova.conf oslo_concurrency lock_path /var/lib/nova/tmp
    ```

9. Configure Placement API.

    ```bash
    crudini --set /etc/nova/nova.conf placement os_region_name RegionOne
    crudini --set /etc/nova/nova.conf placement project_domain_name Default
    crudini --set /etc/nova/nova.conf placement project_name service
    crudini --set /etc/nova/nova.conf placement auth_type password
    crudini --set /etc/nova/nova.conf placement user_domain_name Default
    crudini --set /etc/nova/nova.conf placement auth_url http://controller:5000/v3
    crudini --set /etc/nova/nova.conf placement username placement
    crudini --set /etc/nova/nova.conf placement password openstack
    ```

10. Remove problematic log parameters from default section.

    In modern Ubuntu packages for Zed, the `log_dir` parameter can conflict with systemd logging. 

    Remove it:

    ```bash
    crudini --del /etc/nova/nova.conf DEFAULT log_dir  
    ```

11. Since we're using VMs in VirtualBox, we need to set the virtualization type to QEMU.

    ```bash
    crudini --set /etc/nova/nova-compute.conf libvirt virt_type qemu
    ```

12. (Optional) If you are using bare metal hosts, set the virtualization type to KVM.

    If you did step 11, you can skip this step and proceed to step 13.

    First, verify the host capabilities:

    ```bash
    sudo su
    kvm-ok
    uname -m
    ```

    Install KVM and other utilities:

    ```bash
    sudo apt-get install -y qemu-kvm libvirt-bin bridge-utils
    ```

    Verify the KVM installation:

    ```bash
    virsh list --all  
    ```

    Finally, set the virtualization type:

    ```bash
    crudini --set /etc/nova/nova-compute.conf libvirt virt_type kvm
    ```

13. Restart the Nova compute service.

    ```bash
    sudo systemctl restart nova-compute
    sudo systemctl status nova-compute
    ```


## Register the Compute Node

Once we have installed Nova on compute node, we need to discover compute nodes.

Login to the controller node again and run:

```bash
su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
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
