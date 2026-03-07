---
title: "Install Neutron"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 30
last_update:
  date: 9/15/2023
---

## Overview

OpenStack networking is provided by **Neutron**. The installation flow is similar to other OpenStack services like Nova or Glance.

Steps:

1. Create the Neutron SQL database
2. Create the Neutron service user and endpoints
3. Install Neutron packages
4. Configure Neutron and ML2 plugin
5. Populate the database and restart services

After these steps, the controller will manage networking services for the OpenStack environment.

As a recap, below is the lab diagram.

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install-V2.png)

</div>



## Controller Node Setup

### Database, User, and Service 

1. Log in to controller and switch to root.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.11
    sudo su  
    ```

2. Create the Neutron Database.

    Neutron stores its state in a SQL database. The database and permissions must be created first. Start MySQL:

    ```bash
    sudo mysql 
    ```

    Run the following commands inside MySQL.

    **Note:** The database name is `neutron` and the password is `openstack`.

    ```sql
    CREATE DATABASE neutron;

    GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'%' IDENTIFIED BY 'openstack';

    FLUSH PRIVILEGES;
    EXIT
    ```

    The database is now ready for the Neutron service to use.

    To verify:

    ```sql
    show databases; 
    ```

    Output:

    ```bash
    +--------------------+
    | Database           |
    +--------------------+
    | glance             |
    | information_schema |
    | keystone           |
    | mysql              |
    | neutron            |
    | nova               |
    | nova_api           |
    | nova_cell0         |
    | performance_schema |
    | placement          |
    | sys                |
    +--------------------+
    11 rows in set (0.007 sec)      
    ```

3. Before running OpenStack commands, make sure to [source the client environment script.](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)

    ```bash
    source admin-openrc.sh
    ```

4. Create the Neutron Service User

    Neutron must authenticate with the **Identity service (Keystone)**.

    Create the Neutron user and assign the admin role

    ```bash
    openstack user create --domain default --password openstack neutron
    openstack role add --project service --user neutron admin
    ```

    The user is `neutron` and the password is `openstack`.

5. Create the Neutron service entry.

    This will allow other OpenStack services to locate and use the Neutron API.

    ```bash
    openstack service create --name neutron \
    --description "OpenStack Networking" network
    ```

    Output:

    ```
    +-------------+----------------------------------+
    | Field       | Value                            |
    +-------------+----------------------------------+
    | description | OpenStack Networking             |
    | enabled     | True                             |
    | id          | a0be92e24edd416f9b34c001e4dac4b4 |
    | name        | neutron                          |
    | type        | network                          |
    +-------------+----------------------------------+
    ```


### Neutron API Endpoints

Endpoints allow OpenStack services to reach the Neutron API.

- Public endpoint for external access
- Internal endpoint for service communication
- Admin endpoint for administrative access

In many lab environments, these endpoints use the same URL.

:::info 

Neutron runs an API service called neutron-server. By default it listens on port 9696, which is defined in the Neutron configuration.

::: 

In the commands below, the API runs on port `9696`.

```bash
openstack endpoint create --region RegionOne network public http://controller:9696
openstack endpoint create --region RegionOne network internal http://controller:9696
openstack endpoint create --region RegionOne network admin http://controller:9696
```

Neutron endpoints are now registered in Keystone.

To verify, list the network service endpoints:

```bash
openstack endpoint list --service network
```

Output:

```bash
+----------------------------------+-----------+--------------+--------------+---------+-----------+------------------------+
| ID                               | Region    | Service Name | Service Type | Enabled | Interface | URL                    |
+----------------------------------+-----------+--------------+--------------+---------+-----------+------------------------+
| 0cc909e9ad2046ae961beea5d1f8273a | RegionOne | neutron      | network      | True    | public    | http://controller:9696 |
| ca24596e7e5e46f283c805301b0d3152 | RegionOne | neutron      | network      | True    | internal  | http://controller:9696 |
| f4165332d457456186458f00d182ca00 | RegionOne | neutron      | network      | True    | admin     | http://controller:9696 |
+----------------------------------+-----------+--------------+--------------+---------+-----------+------------------------+
```

The output should show three endpoints for the network service: `public`, `internal`, and `admin`. This confirms that the Neutron API endpoints are correctly registered in Keystone and are reachable through port `9696`.

**NOTE:** In many production deployments, the endpoint does not directly expose port 9696. Instead, the flow may look like this:

```bash
Client
  ↓
HAProxy / Nginx
  ↓
Neutron API (9696) 
```

The sample endpoint may look like this:

```bash
http://openstack.example.com:9696
https://openstack.example.com/network
```

But internally the Neutron API service still runs on port 9696.


### Install Neutron Packages

Update the package list and install the required packages.

```bash
sudo apt update -y
```

Install Neutron server and related components.

```bash
sudo apt install -y \
  neutron-server \
  neutron-plugin-ml2 \
  neutron-linuxbridge-agent \
  neutron-dhcp-agent \
  neutron-metadata-agent \
  neutron-l3-agent
```

**NOTE**: In modern OpenStack deployments (including Zed), many production environments prefer Open vSwitch (OVS) instead of Linux Bridge. However, **Linux Bridge is still fully supported** and commonly used for lab environments and small deployments.

Next, perform some checks:

1. Verify that the Neutron packages were installed successfully.

    ```bash
    dpkg -l | grep neutron
    ```

    Output:

    ```bash
    ii  neutron-common                         2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - common
    ii  neutron-dhcp-agent                     2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - DHCP agent
    ii  neutron-l3-agent                       2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - l3 agent
    ii  neutron-linuxbridge-agent              2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - linuxbridge agent
    ii  neutron-metadata-agent                 2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - metadata agent
    ii  neutron-plugin-ml2                     2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - ML2 plugin
    ii  neutron-server                         2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - server
    ii  python3-neutron                        2:21.2.0-0ubuntu1~cloud1                             all          Neutron is a virtual network service for Openstack - Python library
    ii  python3-neutron-lib                    3.1.2-0ubuntu1~cloud0                                all          Neutron shared routines and utilities - Python 3.x
    ii  python3-neutronclient                  1:8.1.0-0ubuntu1~cloud0                              all          client API library for Neutron - Python 3.x
    ```

2. Check that the services exist in the system service manager.

    ```bash
    systemctl list-unit-files | grep neutron
    ```

    Output:

    ```bash
    neutron-dhcp-agent.service                 enabled         enabled
    neutron-l3-agent.service                   enabled         enabled
    neutron-linuxbridge-agent.service          enabled         enabled
    neutron-linuxbridge-cleanup.service        enabled         enabled
    neutron-metadata-agent.service             enabled         enabled
    neutron-server.service                     enabled         enabled
    ```

3. After configuration and service restart, verify that the services are running.

    ```bash
    systemctl status neutron-server 
    systemctl status neutron-linuxbridge-agent
    systemctl status neutron-dhcp-agent
    systemctl status neutron-metadata-agent
    systemctl status neutron-l3-agent
    ```

    All services should show **active (running)**.

4. Finally, verify that the Neutron service is registered in OpenStack.

    ```bash
    openstack service list | grep network
    ```

    Output:

    ```bash
    | a0be92e24edd416f9b34c001e4dac4b4 | neutron   | network   | 
    ```

    This confirms that the Neutron service is registered in Keystone.
    Note that it does not confirm that the Neutron API server is running.
    This will be verified later after setting up the configuration file. 

### Setting up the Configuration

The main Neutron configuration file is:

```
/etc/neutron/neutron.conf
```

Important configuration areas include:

- Database connection
- Message queue (RabbitMQ)
- Keystone authentication

To simplify configuration, the commands below use [Crudini](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#install-required-packages) to update parameters in neutron.conf.

1. Configure Database and RabbitMQ.

    Neutron stores network state in the SQL database and uses RabbitMQ for messaging.

    ```bash
    crudini --set /etc/neutron/neutron.conf database connection mysql+pymysql://neutron:openstack@controller/neutron
    crudini --set /etc/neutron/neutron.conf DEFAULT transport_url rabbit://openstack:openstack@controller
    ```

    This connects Neutron to:

    - The MySQL database
    - The RabbitMQ message queue

    Both services must already be running on the controller node.


2. Enable the Modular Layer 2 (ML2) plug-in.

    Neutron uses plug-ins to support different networking technologies. The ML2 plug-in is the most common choice for modern OpenStack deployments.

    ```bash 
    crudini --set /etc/neutron/neutron.conf DEFAULT core_plugin ml2
    crudini --set /etc/neutron/neutron.conf DEFAULT service_plugins router
    crudini --set /etc/neutron/neutron.conf DEFAULT allow_overlapping_ips true
    ```

3. Configure Identity Service access. 

    Neutron must authenticate with Keystone.

    ```bash 
    crudini --set /etc/neutron/neutron.conf DEFAULT auth_strategy keystone
    crudini --set /etc/neutron/neutron.conf keystone_authtoken auth_uri http://controller:5000
    crudini --set /etc/neutron/neutron.conf keystone_authtoken auth_url http://controller:5000
    crudini --set /etc/neutron/neutron.conf keystone_authtoken memcached_servers controller:11211
    crudini --set /etc/neutron/neutron.conf keystone_authtoken auth_type password
    crudini --set /etc/neutron/neutron.conf keystone_authtoken project_domain_name Default
    crudini --set /etc/neutron/neutron.conf keystone_authtoken user_domain_name Default
    crudini --set /etc/neutron/neutron.conf keystone_authtoken project_name service
    crudini --set /etc/neutron/neutron.conf keystone_authtoken username neutron
    crudini --set /etc/neutron/neutron.conf keystone_authtoken password openstack
    ```

    **UPDATE:** The `auth_uri` is deprecated and replaced by `www_authenticate_uri` in newer OpenStack releases including Zed.

    ```bash
    crudini --set /etc/neutron/neutron.conf keystone_authtoken www_authenticate_uri http://controller:5000

    ```

4. Configure Networking to notify Compute of network topology changes.

    This allows Nova to update instance networking information when ports change.

    ```BASH 
    crudini --set /etc/neutron/neutron.conf DEFAULT notify_nova_on_port_status_changes true
    crudini --set /etc/neutron/neutron.conf DEFAULT notify_nova_on_port_data_changes true
    ```


5. Configure the Nova access.

    Neutron also needs credentials for Neutron to communicate with the Nova API.

    ```bash 
    crudini --set /etc/neutron/neutron.conf nova auth_url http://controller:5000
    crudini --set /etc/neutron/neutron.conf nova auth_type password
    crudini --set /etc/neutron/neutron.conf nova project_domain_name Default
    crudini --set /etc/neutron/neutron.conf nova user_domain_name Default
    crudini --set /etc/neutron/neutron.conf nova region_name RegionOne
    crudini --set /etc/neutron/neutron.conf nova project_name service
    crudini --set /etc/neutron/neutron.conf nova username nova
    crudini --set /etc/neutron/neutron.conf nova password openstack
    ```

6. Verify the Configuration.

    After running the configuration commands, verify that the settings were written correctly.

    ```bash
    grep -vE '^\s*#|^\s*$' /etc/neutron/neutron.conf 
    ```

    Output:

    ```bash
      
    ```
