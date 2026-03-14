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

**NOTE:** 

The hostnames of all the nodes in this lab are configured in the `/etc/hosts` file in each node (See [Networking and Security](/docs/038-OpenStack/005-Manual-Install/017-Networking-and-Security.md#hosts-file-configuration-basic-name-resolution)).

The number of compute nodes will be increased to two in a later step.

:::

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install.png)

</div>

## Snapshot the VMs

Before setting up Nova Compute, make sure to snapshot all three virtual machines. This allows you to revert to a clean state if needed during installation.

In VirtualBox, make sure all the three nodes are shut down.

1. Click the menu icon on the controller node ➔ Snapshots ➔ Take

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01200929.png)

    </div>

2. Click Ok.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01201044.png)

    </div>

3. Click the compute node ➔ Take ➔ Ok

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-01201207.png)

    </div>

4. Click the block node ➔ Take ➔ Ok

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

2. Start MySQL and create the databases: nova API, nova main, and placement

    ```bash
    sudo mysql 

    CREATE DATABASE nova_api;
    CREATE DATABASE nova;
    CREATE DATABASE nova_cell0;
    CREATE DATABASE placement;
    ```

3. Grant appropriate privileges to Nova and placement users:

    ```bash
    GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' IDENTIFIED BY 'openstack';

    ## Placement
    GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'localhost' IDENTIFIED BY 'openstack';
    GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'%' IDENTIFIED BY 'openstack';

    FLUSH PRIVILEGES;
    EXIT;
    ```

    Exit the database:

    ```bash
    EXIT 
    ```

4. Verify that the databases and user privileges are correctly set.

    Login to the database:

    ```bash
    ## Enter password
    sudo mysql -uroot -p 
    ```

    Inside MySQL:

    ```bash
    -- List databases
    SHOW DATABASES;

    -- Check privileges for Nova
    SHOW GRANTS FOR 'nova'@'localhost';
    SHOW GRANTS FOR 'nova'@'%';

    -- Check privileges for Placement
    SHOW GRANTS FOR 'placement'@'localhost';
    SHOW GRANTS FOR 'placement'@'%';
    ```

    Example:

    ```bash
    MariaDB [(none)]> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | glance             |
    | information_schema |
    | keystone           |
    | mysql              |
    | nova               |
    | nova_api           |
    | nova_cell0         |
    | performance_schema |
    | placement          |
    | sys                |
    +--------------------+
    10 rows in set (0.006 sec)
    ```

    ```bash
    MariaDB [(none)]> SHOW GRANTS FOR 'nova'@'localhost';
    +-------------------------------------------------------------------------------------------------------------+
    | Grants for nova@localhost
        |
    +-------------------------------------------------------------------------------------------------------------+
    | GRANT USAGE ON *.* TO `nova`@`localhost` IDENTIFIED BY PASSWORD '*3A4A03AC22526F6B591010973A741D59A71D728E' |
    | GRANT ALL PRIVILEGES ON `nova`.* TO `nova`@`localhost`
        |
    | GRANT ALL PRIVILEGES ON `nova_api`.* TO `nova`@`localhost`
        |
    | GRANT ALL PRIVILEGES ON `nova_cell0`.* TO `nova`@`localhost`
        |
    +-------------------------------------------------------------------------------------------------------------+
    4 rows in set (0.001 sec)
    ```

    ```bash
    MariaDB [(none)]> SHOW GRANTS FOR 'nova'@'%';
    +-----------------------------------------------------------------------------------------------------+ 
    | Grants for nova@%                                                                                   | 
    +-----------------------------------------------------------------------------------------------------+ 
    | GRANT USAGE ON *.* TO `nova`@`%` IDENTIFIED BY PASSWORD '*3A4A03AC22526F6B591010973A741D59A71D728E' | 
    | GRANT ALL PRIVILEGES ON `nova`.* TO `nova`@`%`                                                      | 
    | GRANT ALL PRIVILEGES ON `nova_api`.* TO `nova`@`%`                                                  | 
    | GRANT ALL PRIVILEGES ON `nova_cell0`.* TO `nova`@`%`                                                | 
    +-----------------------------------------------------------------------------------------------------+ 
    4 rows in set (0.000 sec)
    ```

    ```bash
    MariaDB [(none)]> SHOW GRANTS FOR 'placement'@'localhost';
    +------------------------------------------------------------------------------------------------------------------+
    | Grants for placement@localhost
            |
    +------------------------------------------------------------------------------------------------------------------+
    | GRANT USAGE ON *.* TO `placement`@`localhost` IDENTIFIED BY PASSWORD '*3A4A03AC22526F6B591010973A741D59A71D728E' |
    | GRANT ALL PRIVILEGES ON `placement`.* TO `placement`@`localhost`
            |
    +------------------------------------------------------------------------------------------------------------------+
    2 rows in set (0.001 sec)
    ```

    ```bash
    MariaDB [(none)]> SHOW GRANTS FOR 'placement'@'%';
    +----------------------------------------------------------------------------------------------------------+
    | Grants for placement@%
    |
    +----------------------------------------------------------------------------------------------------------+
    | GRANT USAGE ON *.* TO `placement`@`%` IDENTIFIED BY PASSWORD '*3A4A03AC22526F6B591010973A741D59A71D728E' |
    | GRANT ALL PRIVILEGES ON `placement`.* TO `placement`@`%`
    |
    +----------------------------------------------------------------------------------------------------------+
    2 rows in set (0.000 sec)
    ```

5. Before running the OpenStack commands, make sure to [source the client environment script.](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)

    ```bash
    source admin-openrc.sh
    ```

6. Create OpenStack service users for Nova.

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

    Verify:

    ```bash
    openstack role assignment list --user nova --project service
    ```

    Output:

    ```bash
    +----------------------------------+----------------------------------+-------+----------------------------------+--------+--------+-----------+
    | Role                             | User                             | Group | Project                          | Domain | System | Inherited | 
    +----------------------------------+----------------------------------+-------+----------------------------------+--------+--------+-----------+ 
    | 39fc9013a56b409f8cb15cfeae1e1a6a | ddbb9586104e45949a4166b53fea1d94 |       | 297c43239a924e3b831dbd2cedb8f6d7 |        |        | False     | 
    +----------------------------------+----------------------------------+-------+----------------------------------+--------+--------+-----------+ 
    ```

7. Create another service user for the Placement service.

    ```bash
    openstack user create \
    --domain default \
    --password-prompt placement
    ```

    Add the admin role:

    ```bash
    openstack role add --project service --user placement admin
    ```

    Verify that the users:

    ```bash
    root@controller:/home/jmeden# openstack user list
    +----------------------------------+-----------+
    | ID                               | Name      |
    +----------------------------------+-----------+
    | 9deb02e4c0df40349976aaccd6a2683c | admin     |
    | cb17f17c923e471f8eb380fd9a570921 | demo      |
    | c3e98b280b254a679616e3115bbcaae7 | glance    |
    | ddbb9586104e45949a4166b53fea1d94 | nova      |
    | ce32f7827d714a43a05a1eb76ef2b8b3 | placement |
    +----------------------------------+-----------+
    ```

8. Create services and API endpoints for Nova.

    **Note:** For OpenStack Zed, the endpoints and ports have mostly stayed the same as in previous releases for Nova and Placement services.

    Default port is 8774 for HTTP (or HTTPS if using TLS).

    If you enable HTTPS on Nova or Placement, you need to change `http://` to `https://` and make sure certificates are in place.

    ```bash
    openstack service create --name nova --description "OpenStack Compute" compute
    openstack endpoint create --region RegionOne compute public http://controller:8774/v2.1
    openstack endpoint create --region RegionOne compute internal http://controller:8774/v2.1
    openstack endpoint create --region RegionOne compute admin http://controller:8774/v2.1
    ```

9.  Create services and API endpoints for the Placement service.

    Placement API default port is 8778, which is unchanged in OpenStack Zed and in other newer releases.

    ```bash
    openstack service create --name placement --description "Placement API" placement
    openstack endpoint create --region RegionOne placement public http://controller:8778
    openstack endpoint create --region RegionOne placement internal http://controller:8778
    openstack endpoint create --region RegionOne placement admin http://controller:8778
    ```


10. Install the Placement API

    Although Nova uses Placement, the Placement API runs as a **separate service** under Apache WSGI.
    You need to install and configure it before starting Nova services.

    Install the Placement API package.

    ```bash
    sudo apt install -y placement-api
    ```

    This installs:

    - Placement API service
    - Apache WSGI configuration
    - Placement management utilities

    Verify the Apache site configuration exists.

    ```bash
    ls -la /etc/apache2/sites-enabled/
    ```

    Output:

    ```bash
    lrwxrwxrwx 1 root root   35 Feb 28 16:36 000-default.conf -> ../sites-available/000-default.conf
    lrwxrwxrwx 1 root root   32 Feb 28 16:36 keystone.conf -> ../sites-available/keystone.conf
    lrwxrwxrwx 1 root root   37 Mar  7 08:43 placement-api.conf -> ../sites-available/placement-api.conf
    ```

    If the file is not enabled (doesn't exist yet), enable it manually:

    ```bash
    a2ensite placement-api
    systemctl restart apache2
    ```


11. Configure the Placement service.

    Edit the configuration file:

    ```bash
    sudo vi /etc/placement/placement.conf
    ```

    Add the following configuration.

    ```ini
    #Placement database connection
    [placement_database]
    connection = mysql+pymysql://placement:openstack@controller/placement
    #connection = sqlite:////var/lib/placement/placement.sqlite

    #Keystone authentication
    [api]
    auth_strategy = keystone

    [keystone_authtoken]
    auth_url = http://controller:5000/v3
    memcached_servers = controller:11211
    auth_type = password
    project_domain_name = Default
    user_domain_name = Default
    project_name = service
    username = placement
    password = openstack
    ```


12. Initialize the Placement database schema.

    ```bash
    su -s /bin/sh -c "placement-manage db sync" placement
    ```

    Restart Apache to load the Placement API.

    ```bash
    systemctl restart apache2
    ```

    Confirm the Placement API is listening.

    ```bash
    ss -lntp | grep 8778
    ```

    Output:

    ```bash
    LISTEN 0      511                *:8778             *:*    users:(("apache2",pid=10903,fd=8),("apache2",pid=10902,fd=8),("apache2",pid=10891,fd=8))
    ```

    Test the Placement API endpoint.

    ```bash
    curl -s http://controller:8778 | jq
    ```

    Expected response:

    ```json
    {
      "versions": [
        {
          "id": "v1.0",
          "max_version": "1.39",
          "min_version": "1.0",
          "status": "CURRENT",
          "links": [
            {
              "rel": "self",
              "href": ""
            }
          ]
        }
      ]
    }
    ```

    If you receive this output, the Placement API is functioning correctly.



13. Verify Placement Setup and Sync Aggregates.

    Once the Placement service is installed and configured, we need to verify that it can be used by Nova.

    First, make sure to [source the client environment script.](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)

    ```bash
    source admin-openrc.sh
    ```

    Verify that the `service` project exists:

    ```bash
    root@controller:/home/jmeden# openstack project list

    +----------------------------------+---------+
    | ID                               | Name    |
    +----------------------------------+---------+
    | 2448a3bc5e264464a3d20ed6012206bf | admin   |
    | 297c43239a924e3b831dbd2cedb8f6d7 | service |
    | 635187ee20ca40228ddef1bd4fb85600 | demo    |
    +----------------------------------+---------+
    ```

    Now, sync the placement aggregates:

    ```bash
    su -s /bin/sh -c "nova-manage placement sync_aggregates" nova 
    ```

    If successful, this command will not return any errors.

    If it returns `HTTP 401 Unauthorized`, the `placement` user missing the admin role. See step 7.



14. Install Nova controller packages.

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

    ## SKIP THIS PART
    sudo apt install -y \
      nova-consoleauth \
      nova-placement-api 
    ```

    **UPDATE:**

    - `nova-consoleauth` is no longer separate. It is included in `nova-api` and `nova-novncproxy`.
    - Placement API is packaged separately as `placement-api` for Ubuntu Zed packages.




15. Check installed services.

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

16. Configure `/etc/nova/nova.conf` on the controller.

    - Set MySQL connection parameters for API and main database
    - Configure RabbitMQ access
    - Configure identity service access
    - Enable networking service with Neutron
    - Set VNC proxy addresses
    - Configure Glance endpoint and log paths
    - Configure placement API

    To simplify the steps, we will use [Crudini](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#install-required-packages). Proceed with the next steps.

17. Configure MySQL & RabbitMQ parameters.

    ```bash
    crudini --set /etc/nova/nova.conf api_database connection mysql+pymysql://nova:openstack@controller/nova_api
    crudini --set /etc/nova/nova.conf database connection mysql+pymysql://nova:openstack@controller/nova
    crudini --set /etc/nova/nova.conf DEFAULT transport_url rabbit://openstack:openstack@controller
    ```

18. Configure the identity service access.

    If you are using modern OpenStack, Keystone should use port 5000 only. Port 35357 is no longer required.

    ```bash
    crudini --set /etc/nova/nova.conf api auth_strategy keystone
    crudini --set /etc/nova/nova.conf keystone_authtoken auth_uri http://controller:5000
    crudini --set /etc/nova/nova.conf keystone_authtoken auth_url http://controller:5000
    crudini --set /etc/nova/nova.conf keystone_authtoken memcached_servers controller:11211
    crudini --set /etc/nova/nova.conf keystone_authtoken auth_type password
    crudini --set /etc/nova/nova.conf keystone_authtoken project_domain_name Default
    crudini --set /etc/nova/nova.conf keystone_authtoken user_domain_name Default
    crudini --set /etc/nova/nova.conf keystone_authtoken project_name service
    crudini --set /etc/nova/nova.conf keystone_authtoken username nova
    crudini --set /etc/nova/nova.conf keystone_authtoken password openstack
    ```

19. Configure support for Networking Service (Neutron).

    This will allow Nova to delegate networking tasks to Neutron and the instances will get proper network connectivity.

    ```bash
    crudini --set /etc/nova/nova.conf DEFAULT service_user_token_roles_required True
    crudini --set /etc/nova/nova.conf DEFAULT my_ip 10.0.0.11
    crudini --set /etc/nova/nova.conf DEFAULT use_neutron True
    crudini --set /etc/nova/nova.conf DEFAULT firewall_driver nova.virt.firewall.NoopFirewallDriver
    ```

    **Note**: `my_ip` ➔ IP of your controller node’s management interface

20. Enable service user token roles required.

    The `service_user` in Nova is used for internal API calls that Nova services make to Keystone.

    By setting `service_user_token_roles_required` to `True`, you ensure that when Nova uses the `service_user` token to authenticate with Keystone, it must have the appropriate roles assigned. This is a security best practice that prevents unauthorized access to Keystone when Nova services communicate with it.

    ```bash
    # Ensure [DEFAULT] has only the service_user reference:
    crudini --set /etc/nova/nova.conf DEFAULT service_user nova
    crudini --set /etc/nova/nova.conf DEFAULT service_user_token_roles_required True

    # Ensure [service_user] is correct:
    crudini --set /etc/nova/nova.conf service_user username nova
    crudini --set /etc/nova/nova.conf service_user password openstack
    crudini --set /etc/nova/nova.conf service_user project_name service
    crudini --set /etc/nova/nova.conf service_user user_domain_name Default
    crudini --set /etc/nova/nova.conf service_user project_domain_name Default
    crudini --set /etc/nova/nova.conf service_user auth_type password
    crudini --set /etc/nova/nova.conf service_user auth_url http://controller:5000/v3
    crudini --set /etc/nova/nova.conf service_user service_user_token_roles_required True
    ```


21. Configure VNC proxy on Controller Node.

    You need to configure VNC console proxy to access VM consoles via Horizon or CLI.

    ```bash
    crudini --set /etc/nova/nova.conf vnc enabled True
    crudini --set /etc/nova/nova.conf vnc vncserver_listen 10.0.0.11
    crudini --set /etc/nova/nova.conf vnc vncserver_proxyclient_address 10.0.0.11
    ```

    **Notes:**

    - `vncserver_listen` ➔ the IP the VNC server listens on (usually the controller).
    - `vncserver_proxyclient_address` ➔ IP used by clients connecting through the proxy.

 
22. Configure the Glance location.

    This allows Nova to download images for new instances. Make sure the URL matches the [Glance endpoint](/docs/038-OpenStack/005-Manual-Install/025-Install-Glance.md#create-glance-service-and-endpoints) created when setting up Glance. 

    ```bash
    crudini --set /etc/nova/nova.conf glance api_servers http://controller:9292
    ```

23. Configure Lock Path for Oslo Concurrency.

    Nova uses Oslo concurrency for database and resource locks. You must set a valid path for temporary lock files.

    ```bash
    crudini --set /etc/nova/nova.conf oslo_concurrency lock_path /var/lib/nova/tmp
    ```

24. Configure Placement API.

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

25. Remove `log_dir` parameter from `DEFAULT` section.

    In modern Ubuntu packages for Zed, the `log_dir` parameter can conflict with systemd logging. 

    Remove it:

    ```bash
    crudini --del /etc/nova/nova.conf DEFAULT log_dir  
    ```


26. Populate the `nova_api` Database.

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


27. Register the `cell0` Database and create the `cell1` Cell.

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

28. Populate the Nova database with initial schema and API data.

    This ensures the database is ready for Nova to track instances, networks, and compute nodes

    ```bash
    su -s /bin/sh -c "nova-manage db sync" nova
    ```

29. Verify the configuration of Cells.

    ```bash
    nova-manage cell_v2 list_cells
    ```

    Output:

    | Name  | UUID                                 | Transport URL                      | Database Connection                             | Disabled |
    | ----- | ------------------------------------ | ---------------------------------- | ----------------------------------------------- | -------- |
    | cell0 | 00000000-0000-0000-0000-000000000000 | none:/                             | mysql+pymysql://nova:****@controller/nova_cell0 | False    |
    | cell1 | d181ba72-3ed3-42d4-8d3a-082db4037430 | rabbit://openstack:****@controller | mysql+pymysql://nova:****@controller/nova       | False    |


30. Restart Nova services so the change takes effect.

    ```bash
    sudo systemctl restart nova-api nova-scheduler nova-conductor nova-novncproxy
    ```

    Confirm all Nova services are running:
    
    ```bash
    systemctl status nova-api 
    systemctl status nova-scheduler
    systemctl status nova-conductor
    systemctl status nova-novncproxy
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

    :::info 

    **For later setup**: Make sure to use `10.0.0.22` as `my_ip` for `compute2`

    :::

    ```bash
    crudini --set /etc/nova/nova.conf DEFAULT my_ip 10.0.0.21
    crudini --set /etc/nova/nova.conf DEFAULT use_neutron True
    crudini --set /etc/nova/nova.conf DEFAULT firewall_driver nova.virt.firewall.NoopFirewallDriver
    ```

    For multiple compute nodes, the `my_ip` is the compute node’s management IP.
    This ensures Nova on the compute node advertises its own IP to the controller and integrates with Neutron.

6. Configure VNC console access on the compute node.

    :::info 

    **For later setup**: Make sure to use `10.0.0.22` as `vncserver_proxyclient_address` for `compute2`

    :::

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

11. **If you are using VirtualBox**, you need to set the virtualization type to `QEMU`.

    ```bash
    crudini --set /etc/nova/nova-compute.conf libvirt virt_type qemu
    ```

12. **If you are using bare metal hosts**, set the virtualization type to `KVM`.

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

1. Login to the controller node again and run:

    ```bash
    sudo su
    su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
    ```

    Output:

    ```bash
    Found 2 cell mappings.
    Skipping cell0 since it does not contain hosts.
    Getting computes from cell 'cell1': d181ba72-3ed3-42d4-8d3a-082db4037430
    Checking host mapping for compute host 'compute1': 44c813e6-c2d1-48df-8d13-0e3eb4e4775b
    Creating host mapping for compute host 'compute1': 44c813e6-c2d1-48df-8d13-0e3eb4e4775b
    Found 1 unmapped computes in cell: d181ba72-3ed3-42d4-8d3a-082db4037430
    ```

2. Before proceeding, do some quick checks:

    - List the mapped cells:

        ```bash
        su -s /bin/sh -c "nova-manage cell_v2 list_cells" nova
        ```

        Output: 

        ```bash 
        +-------+--------------------------------------+------------------------------------+-------------------------------------------------+----------+
        |  Name |                 UUID                 |           Transport URL            |               Database Connection               | Disabled 
        |
        +-------+--------------------------------------+------------------------------------+-------------------------------------------------+----------+
        | cell0 | 00000000-0000-0000-0000-000000000000 |               none:/               | mysql+pymysql://nova:****@controller/nova_cell0 |  False   
        |
        | cell1 | d181ba72-3ed3-42d4-8d3a-082db4037430 | rabbit://openstack:****@controller |    mysql+pymysql://nova:****@controller/nova    |  False   
        |
        +-------+--------------------------------------+------------------------------------+-------------------------------------------------+----------+ 
        ```

    - List the host in the cells:

        ```bash
        su -s /bin/sh -c "nova-manage cell_v2 list_hosts" nova
        ```

        Output: 

        ```bash 
        +-----------+--------------------------------------+----------+
        | Cell Name |              Cell UUID               | Hostname |
        +-----------+--------------------------------------+----------+
        |   cell1   | d181ba72-3ed3-42d4-8d3a-082db4037430 | compute1 |
        +-----------+--------------------------------------+----------+
        ```

3. Make sure to [source the client environment script.](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)

    ```bash
    source admin-openrc.sh
    ```

4. Verify compute services:

    ```bash
    openstack compute service list
    ```

    Output:

    ```bash
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+
    | ID                                   | Binary         | Host       | Zone     | Status  | State | Updated At                 |
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+
    | 581b85d1-692d-424a-9243-f0643b476a12 | nova-conductor | controller | internal | enabled | up    | 2023-03-07T09:42:58.000000 |
    | 63f0da09-4fa5-4915-af27-b7cbf66937e9 | nova-scheduler | controller | internal | enabled | up    | 2023-03-07T09:42:58.000000 |
    | 1cf5dcc4-f3cd-434e-9622-55e8fd24cce5 | nova-compute   | compute1   | nova     | enabled | up    | 2023-03-07T09:42:58.000000 |
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+
    ```

5. Perform some additional verifications:

    - Check the service catalog:

        ```bash
        openstack catalog list
        ```

        Output:

        ```bash
        +-----------+-----------+-----------------------------------------+
        | Name      | Type      | Endpoints                               |
        +-----------+-----------+-----------------------------------------+
        | placement | placement | RegionOne                               |
        |           |           |   public: http://controller:8778        |
        |           |           | RegionOne                               |
        |           |           |   internal: http://controller:8778      |
        |           |           | RegionOne                               |
        |           |           |   admin: http://controller:8778         |
        |           |           |                                         |
        | keystone  | identity  | RegionOne                               |
        |           |           |   public: http://controller:5000/v3/    |
        |           |           | RegionOne                               |
        |           |           |   internal: http://controller:5000/v3/  |
        |           |           | RegionOne                               |
        |           |           |   admin: http://controller:5000/v3/     |
        |           |           |                                         |
        | glance    | image     | RegionOne                               |
        |           |           |   public: http://controller:9292        |
        |           |           | RegionOne                               |
        |           |           |   admin: http://controller:9292         |
        |           |           | RegionOne                               |
        |           |           |   internal: http://controller:9292      |
        |           |           |                                         |
        | nova      | compute   | RegionOne                               |
        |           |           |   internal: http://controller:8774/v2.1 |
        |           |           | RegionOne                               |
        |           |           |   public: http://controller:8774/v2.1   |
        |           |           | RegionOne                               |
        |           |           |   admin: http://controller:8774/v2.1    |
        |           |           |                                         |
        +-----------+-----------+-----------------------------------------+
        ```

    - Check available images:

        ```bash
        openstack image list
        ```

        Output:

        ```bash
        +--------------------------------------+--------------+--------+
        | ID                                   | Name         | Status |
        +--------------------------------------+--------------+--------+
        | a3900299-cd8e-4d78-887a-dfb047fa4d12 | cirros-0.3.5 | active |
        | b76c870f-944a-47af-acf1-7996f92b18e8 | cirros-0.4.0 | active |
        +--------------------------------------+--------------+--------+
        ```

6. Verify databases and overall Nova health:

    ```bash
    nova-status upgrade check
    ```

    Output: 

    ```bash
    +---------------------------------------------------------------------+
    | Upgrade Check Results                                               |
    +---------------------------------------------------------------------+
    | Check: Cells v2                                                     |
    | Result: Success                                                     |
    | Details: None                                                       |
    +---------------------------------------------------------------------+
    | Check: Placement API                                                |
    | Result: Success                                                     |
    | Details: None                                                       |
    +---------------------------------------------------------------------+
    | Check: Cinder API                                                   |
    | Result: Success                                                     |
    | Details: None                                                       |
    +---------------------------------------------------------------------+
    | Check: Policy File JSON to YAML Migration                           |
    | Result: Success                                                     |
    | Details: None                                                       |
    +---------------------------------------------------------------------+
    | Check: Older than N-1 computes                                      |
    | Result: Success                                                     |
    | Details: None                                                       |
    +---------------------------------------------------------------------+
    | Check: hw_machine_type unset                                        |
    | Result: Success                                                     |
    | Details: None                                                       |
    +---------------------------------------------------------------------+
    ```

    **Note:** You may see a failure for **Service User Token Configuration**:

    ```bash
    +---------------------------------------------------------------------+
    | Check: Service User Token Configuration                             |
    | Result: Failure                                                     |
    | Details:  Service user token configuration is required for all Nova |
    |   services. For more details see the following: https://docs        |
    |   .openstack.org/latest/nova/admin/configuration/service-           |
    |   user-token.html                                                   |
    +---------------------------------------------------------------------+
    ```

    **This can be safely skipped for now.** 
    Nova services (API, scheduler, compute, etc.) will continue to work.
    However, you should revisit this configuration before upgrading Nova or enabling features that require service tokens. It’s not a blocker for initial deployment or testing.


## Adding a Second Compute Node

You can expand your OpenStack setup by adding more compute nodes. This improves resource management and lets you schedule or migrate virtual machines across hosts.

Updated diagram:

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install-V2.png)

</div>


Steps: 

1. Start by cloning the first compute VM. 

    In VirtualBox, select the `compute1` ➔ `Snapshot 1` ➔ **Clone**

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-07191225.png)

    </div>

    Rename it to `compute2` and make sure all network cards get new MAC addresses to avoid conflicts. 

    <div>

    ![](/img/docs/Screenshot2026-03-07191724.png)

    </div>

    **UPDATE:** In newer VirtualBox versions, you will need to set the following:

    | Setting                          | Recommended Option                                    | Notes                                                 |
    | -------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
    | MAC Address Policy               | Generate new MAC addresses for all network interfaces | Ensures unique network addresses and avoids conflicts |
    | Keep disk names / hardware UUIDs | Optional                                              | Preserve VM identity for snapshots if needed          |

    Click **Finish.**

    <div>

    ![](/img/docs/Screenshot2026-03-07191955.png)

    </div>

    Once done, you should now see the second compute node. 

    Start the node.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-03-07192208.png)

    </div>

2. Login to `compute2` and change hostname and management IP.

    Switch to root. 

    ```bash
    sudo su
    ```

    Since this is a clone of `compute`, it should also have the [public key that was previously copied to `compute1`](/docs/038-OpenStack/005-Manual-Install/015-Create-the-VMs.md#add-an-ssh-key). To verify, check the `~/.ssh`:

    ```bash
    ls -al ~/.ssh/

    total 12
    drwx------ 2 jmeden jmeden 4096 Feb 17 16:00 .
    drwxr-x--- 4 jmeden jmeden 4096 Feb 28 10:53 ..
    -rw------- 1 jmeden jmeden  178 Feb 17 16:01 authorized_keys 
    ```

    Check the `authorized_keys`:

    ```bash
    cat ~/.ssh/authorized_keys   
    ```

    If the public key exists, then you can SSH to `compute2` from your local terminal.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.22  
    ```

3. Change hostname and management IP inside the VM.

    Set the hostname first: 

    ```bash
    sudo su
    hostnamectl set-hostname compute2
    ```

    (OUTDATED STEP) Next, update the network configuration: 
    
    ```bash 
    vi /etc/network/interfaces   
    
    ## Update IP
    auto eth0
    iface eth0 inet static
            address 10.0.0.21
            netmask 255.255.255.0
    ```

    **UPDATE:** For newer Ubuntu (22.04+) versions, the network configuration no longer uses `/etc/network/interfaces` by default. Ubuntu now uses Netplan for network management. 

    Check the `/etc/netplan/` directory:

    ```bash
    root@compute2:/home/jmeden# ls -la /etc/netplan
    total 20
    drwxr-xr-x   2 root root  4096 Feb 17 15:59 .
    drwxr-xr-x 122 root root 12288 Mar  3 06:01 ..
    -rw-------   1 root root   689 Mar  7 08:08 50-cloud-init.yaml
    root@compute1:/home/jmeden#
    ```

    You may see `50-cloud-init.yaml`, which is **auto-generated by `cloud-init`**. Editing it directly will not survive reboot unless `cloud-init`’s network management is disabled.

    To disable, create the file: 

    ```bash 
    sudo vi /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

    Add this line:

    ```bash
    network: {config: disabled} 
    ```

    :::info 

    This tells `cloud-init` to stop overwriting your Netplan config on reboot.

    ::: 

    Now you can safely edit `/etc/netplan/50-cloud-init.yaml`:

    ```bash
    sudo vi /etc/netplan/50-cloud-init.yaml 
    ```

    Update the IP address for the management interface:

    ```yaml
    network:
        ethernets:
            enp0s3:
                addresses:
                - 10.0.0.22/24
                nameservers:
                    addresses: [8.8.8.8,8.8.8.4]
                    search: []
            enp0s8:
                dhcp4: no
                addresses:
                - 10.10.10.22/24
                nameservers:
                    addresses: []
                    search: []
            enp0s9:
                dhcp4: true
        version: 2
    ```



4. Update `/etc/hosts` on all nodes, then reboot the new node.

    On all nodes:

    ```bash
    sudo vi /etc/hosts 

    127.0.0.1 localhost
    10.0.0.11 controller
    10.0.0.21 compute1
    10.0.0.22 compute2
    10.0.0.31 block1
    ```

    On the new node:

    ```bash
    sudo reboot  
    ```

    After the reboot, make sure the `controller`, `compute1`, and `block1` can ping `compute2`:

    ```bash
    ping compute2 
    ```

5. Next, install Nova compute on the new node. 

    You will need to update packages, install Nova, and configure services.

    Perform all the steps in the [Compute Node Setup](#compute-node-setup) section.


6. Finally, go to the controller node to discover the new compute node:

    ```bash
    sudo su
    su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
    ```

    Output:

    ```bash
    Found 2 cell mappings.
    Skipping cell0 since it does not contain hosts.
    Getting computes from cell 'cell1': d181ba72-3ed3-42d4-8d3a-082db4037430      
    Checking host mapping for compute host 'compute2': 94e4a182-47fa-4ca0-bd10-3acda778b10b
    Creating host mapping for compute host 'compute2': 94e4a182-47fa-4ca0-bd10-3acda778b10b
    Found 1 unmapped computes in cell: d181ba72-3ed3-42d4-8d3a-082db4037430 
    ```

    Check the list of services: 

    ```bash
    nova service-list               
    openstack compute service list
    ```

    Output:

    ```bash
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+-----------------+-------------+
    | Id                                   | Binary         | Host       | Zone     | Status  | State | Updated_at                 | Disabled Reason | Forced down |
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+-----------------+-------------+
    | 581b85d1-692d-424a-9243-f0643b476a12 | nova-conductor | controller | internal | enabled | up    | 2023-03-07T12:28:50.000000 | -               | False       |
    | 63f0da09-4fa5-4915-af27-b7cbf66937e9 | nova-scheduler | controller | internal | enabled | up    | 2023-03-07T12:28:50.000000 | -               | False       |
    | 1cf5dcc4-f3cd-434e-9622-55e8fd24cce5 | nova-compute   | compute1   | nova     | enabled | up    | 2023-03-07T12:28:52.000000 | -               | False       |
    | 4c360d20-6029-489b-8ab6-b59e1dffe162 | nova-compute   | compute2   | nova     | enabled | up    | 2023-03-07T12:28:50.000000 | -               | False       |
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+-----------------+-------------+
    ```

    Checking the service list using OpenStack CLI:

    ```bash
    openstack compute service list  
    ```

    Output:

    ```bash
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+
    | ID                                   | Binary         | Host       | Zone     | Status  | State | Updated At  
                |
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+
    | 581b85d1-692d-424a-9243-f0643b476a12 | nova-conductor | controller | internal | enabled | up    | 2023-03-07T12:31:40.000000 |
    | 63f0da09-4fa5-4915-af27-b7cbf66937e9 | nova-scheduler | controller | internal | enabled | up    | 2023-03-07T12:31:40.000000 |
    | 1cf5dcc4-f3cd-434e-9622-55e8fd24cce5 | nova-compute   | compute1   | nova     | enabled | up    | 2023-03-07T12:31:42.000000 |
    | 4c360d20-6029-489b-8ab6-b59e1dffe162 | nova-compute   | compute2   | nova     | enabled | up    | 2023-03-07T12:31:41.000000 |
    +--------------------------------------+----------------+------------+----------+---------+-------+----------------------------+
    ```  

After registration, both compute nodes appear in the service list and are ready to run instances.

- Nova manages multiple compute nodes automatically
- Placement service schedules instances efficiently
- You can add more nodes in the future by repeating the same process

This ensures Nova is fully operational across all compute nodes, allowing you to launch, migrate, and manage virtual machines.