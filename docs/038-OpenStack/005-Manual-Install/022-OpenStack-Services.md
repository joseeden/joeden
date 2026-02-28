---
title: "OpenStack Services"
description: "Install the OpenStack Services"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 20
last_update:
  date: 9/15/2023
---


## Overview

Each service requires configuration updates in its configuration files. These files are edited manually using a text editor.

| Node(s)                | OpenStack Service            |
| ---------------------- | ---------------------------- |
| Controller             | Keystone identity service    |
| Controller             | Glance image service         |
| Controller             | Horizon dashboard            |
| Controller and Compute | Nova compute service         |
| Controller and Compute | Neutron networking service   |
| Controller and Storage | Cinder block storage service |

## Install Keystone 

Keystone is the identity service of OpenStack. It handles authentication and authorization for all other services. The steps include:

1. Configure SQL database
2. Install required packages
3. Update keystone.conf
4. Initialize Keystone
5. Configure Apache

Each step builds the identity service, which is the core access control of OpenStack.

### Configure MySQL Database

Start by preparing the database for Keystone. Log in as root on the controller node.

1. Loging to MySQL:

    ```bash
    sudo mysql
    ```

2. Create the database:

    ```sql
    CREATE DATABASE keystone;
    ```

    Output:

    ```
    Query OK, 1 row affected
    ```

    :::info 

    Always end MySQL commands with a semicolon.

    :::

3. Grant privileges to the `keystone` user for local access:

    ```sql
    GRANT ALL PRIVILEGES ON keystone.- TO 'keystone'@'localhost' IDENTIFIED BY 'openstack';
    ```

    Output:

    ```
    Query OK, 0 row affected
    ```

4. Grant privileges for remote access:

    ```sql
    GRANT ALL PRIVILEGES ON keystone.- TO 'keystone'@'%' IDENTIFIED BY 'openstack';
    ```

    Output:

    ```
    Query OK, 0 row affected
    ```

5. Exit the database:

    ```bash
    exit 
    ```

The database is now ready for Keystone, which completes the backend setup for identity management.

### Install Required Packages

Install Keystone and its dependencies. Keystone runs as a WSGI module under Apache.

```bash
apt install -y keystone apache2 libapache2-mod-wsgi-py3 crudini
```

Packages installed:

- Keystone for identity management
- Apache2 as the HTTP server
- WSGI module for integration
- Crudini for easier configuration editing

After installation, the system is ready for configuration.

### Configure Keystone Database Access

The main configuration file is:

```
/etc/keystone/keystone.conf
```

In this setup, we can use `crudini` to set the database connection in the `[database]` section.

This command sets the `connection` parameter:

```bash
crudini --set /etc/keystone/keystone.conf \
database connection mysql+pymysql://keystone:openstack@controller/keystone
```

Here, the `openstack` is the password:

```bash
keystone:openstack
```

Output: No visible output if successful.

This connects Keystone to the MySQL database created earlier.

### Configure Token Provider

Set the token provider to `fernet` in the `[token]` section:

```bash
crudini --set /etc/keystone/keystone.conf token provider fernet
```

Output: No visible output if successful.

Fernet is the recommended token provider for secure identity tokens. This completes the main Keystone configuration.

### Initialize Keystone

Populate the database using the `keystone-manage` tool.

1. Run the database sync as the `keystone` user:

    ```bash
    su -s /bin/sh -c "keystone-manage db_sync" keystone
    ```

2. Initialize Fernet keys:

    ```bash
    keystone-manage fernet_setup \
    --keystone-user keystone \
    --keystone-group keystone
    ```

3. Initialize credential keys:

    ```bash
    keystone-manage credential_setup \
    --keystone-user keystone \
    --keystone-group keystone
    ```

4. Bootstrap the identity service with admin credentials.

    ```bash
    keystone-manage bootstrap \
      --bootstrap-password openstack \
      --bootstrap-admin-url http://controller:35357/v3/ \
      --bootstrap-internal-url http://controller:5000/v3/ \
      --bootstrap-public-url http://controller:5000/v3/ \
      --bootstrap-region-id RegionOne
    ```

    This command sets:

    - Admin password (`openstack`)
    - Admin URL (port 35357)
    - Internal URL (port 5000)
    - Public URL (port 5000)
    - Region name

Keystone is now initialized and ready to serve identity requests.

### Configure Apache Server

Keystone runs through Apache. Set the `ServerName` in the Apache configuration file.

```
sudo vi /etc/apache2/apache2.conf
```

Add this line under global configuration:

```
#ServerRoot "/etc/apache2"
ServerName controller
```

Restart Apache:

```bash
sudo systemctl restart apache2
sudo systemctl status apache2
```


Keystone is now active and accessible via Apache. The identity service is fully installed and ready to authenticate OpenStack services.
