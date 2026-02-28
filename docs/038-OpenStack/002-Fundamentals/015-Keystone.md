---
title: "Keystone"
description: "Keystone – Identity Service"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 15
last_update:
  date: 9/15/2023
---

## Overview

Keystone is OpenStack’s identity service that handles authentication and authorization. Every user must pass through Keystone before accessing any service.

- **Identity** manages users and groups
- **Resource** manages domains and projects
- **Role** assigns permissions inside projects
- **Token** issues authentication tokens
- **Service catalog** lists available services

Keystone connects users to projects using roles. This keeps access controlled and organized.

<div class='img-center'>

![](/img/docs/ostack5-keystone.png)

</div>

## How Keystone Works

Keystone runs as a REST API service. Other OpenStack services talk to it to verify users.

- Runs as a server application
- Uses port 5000 by default
- Stores data in a backend database
- Supports SQL or LDAP identity backends

By default, Keystone uses an SQL database. This is the simplest and most common setup for labs.

<div class='img-center'>

![](/img/docs/all-things-openstack-keystone.png)

</div>

Keystone can integrate with external identity systems. This allows users to log in using existing authentication providers instead of local SQL users.

- SAML v2 
- OAuth v1.0a
- OpenID Connect 

Keystone checks who you are, what project you belong to, and what role you have. That is how access is controlled.

## Main Configuration File

This file controls how Keystone connects to the database and manages identity data.

```bash
/etc/keystone/keystone.conf
```

Example minimal configuration:

```ini
[database]
connection = mysql+pymysql://keystone:KEYSTONE_DBPASS@controller/keystone

[token]
provider = fernet

[identity]
driver = sql
domain_specific_drivers_enabled = True 
domain_config_dir = /etc/keystone/domains

[catalog]
driver = sql
```

In this example:

- `KEYSTONE_DBPASS` is the database password
- `controller` is the database host
- `keystone` is the database name

:::warn 

Note that sensitive information like the password is available in clear text in the Keystone configuration file, which is stored at each controller nodes.

:::

## Domain Specific Identity Configuration

Keystone allows different domains to use different identity backends. This means one domain can use SQL, while another can use LDAP.

- Each domain can use its own identity driver
- A domain can point to a specific LDAP server
- Different domains can use different LDAP servers

This increases isolation between domains and improves security separation.

To enable domain-specific configuration, set this in `keystone.conf`:

```ini
[identity]
domain_specific_drivers_enabled = true
domain_config_dir = /etc/keystone/domains
```

Then create a domain configuration file.

```bash
/etc/keystone/domains/keystone.my-domain.conf
```

Example content:

```ini
[identity]
driver = ldap

[ldap]
url = ldap://ldap-host
```

In this example:

- `my-domain` is the domain name
- `ldap-host` is the LDAP server address
- `driver = ldap` tells Keystone to use LDAP for this domain

Now this specific domain uses LDAP, while others can still use SQL. This allows flexible and secure identity separation inside the same OpenStack cloud.


## Keystone Initialization

After configuration, Keystone must be initialized.

1. Initialize database:

    ```bash
    sudo keystone-manage db_sync
    ```

2. Set up Fernet tokens:

    ```bash
    sudo keystone-manage fernet_setup \
    --keystone-user keystone \
    --keystone-group keystone

    sudo keystone-manage credential_setup \
    --keystone-user keystone \
    --keystone-group keystone
    ```

3. Bootstrap Keystone with admin user and endpoints:

    ```bash
    sudo keystone-manage bootstrap \
      --bootstrap-password ADMIN_PASS \
      --bootstrap-admin-url http://controller:35357/v3/ \
      --bootstrap-internal-url http://controller:5000/v3/ \
      --bootstrap-public-url http://controller:5000/v3/ \
      --bootstrap-region-id RegionOne
    ```

    In this command:

    - `ADMIN_PASS` is the initial admin password
    - `controller` is your controller hostname

4. After bootstrap, change the admin password if needed.

Keystone is now ready to authenticate users and manage access in OpenStack.
