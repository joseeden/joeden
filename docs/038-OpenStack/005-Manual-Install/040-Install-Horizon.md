---
title: "Install Horizon"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 40 
last_update:
  date: 9/15/2023
---


## Overview

Horizon provides the web dashboard for OpenStack. It allows administrators and users to manage instances, networks, volumes, and other resources through a browser instead of using the CLI.

- Installed only on the controller node
- Runs through the Apache web server
- Configured mainly through `local_settings.py`

After installation and configuration, the dashboard becomes available through a web browser.

:::info 

**NOTES:** The hostnames of all the nodes in this lab are configured in the `/etc/hosts` file in each node (See [Networking and Security](/docs/038-OpenStack/005-Manual-Install/017-Networking-and-Security.md#hosts-file-configuration-basic-name-resolution)).

:::

As a recap, below is the lab diagram.

<div class='img-center'>

![](/img/docs/all-things-openstack-manual-install-V2.png)

</div>


## Install the Horizon Dashboard

Start by installing the Horizon package on the controller node.

1. Log in to controller node and switch to root.

    ```bash
    ssh -i ~/.ssh/vbox jmeden@10.0.0.11
    sudo su  
    ```

2. Install the required package.

    ```bash
    sudo apt install -y openstack-dashboard
    ```

    This installs:

    - Horizon dashboard
    - Required Python components
    - Apache configuration for the web interface

    Once installed, the main configuration file will be located at:

    ```bash
    /etc/openstack-dashboard/local_settings.py
    ```

    This file controls how Horizon connects to OpenStack services.

## Configure the Horizon Settings 

Horizon uses a Python configuration file instead of the usual standard `.conf` format used by most OpenStack services. Because of this, tools like `crudini` are usually not used.

Edit the configuration file using an editor.

```bash
sudo vi /etc/openstack-dashboard/local_settings.py
```

Several parameters must be adjusted so Horizon can communicate with the OpenStack controller.

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': 'controller:11211',
         #'LOCATION': '127.0.0.1:11211',
    },
}

OPENSTACK_HOST = "controller"
#OPENSTACK_HOST = "127.0.0.1"

OPENSTACK_KEYSTONE_URL = "http://%s:5000/v3" % OPENSTACK_HOST
#OPENSTACK_KEYSTONE_URL = "http://%s/identity/v3" % OPENSTACK_HOST

OPENSTACK_KEYSTONE_MULTIDOMAIN_SUPPORT = True
OPENSTACK_KEYSTONE_DEFAULT_ROLE = "user"
OPENSTACK_API_VERSIONS = {
    "identity": 3,
    "image": 2,
    "volume": 3,
}

SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
#SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'
```


These parameters allow Horizon to connect to the controller node, authenticate users through Keystone, and communicate with other OpenStack services.

| Setting                                  | Description                                                                                                                                                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OPENSTACK_HOST`                         | Defines the controller node that Horizon connects to. Older configs used `127.0.0.1`, but hostname is recommended so Horizon can correctly reach the OpenStack APIs. |
| `CACHES`                                 | Horizon stores session data in memcached, and the `LOCATION` value points to the memcached service running on the controller node.                        |
| `SESSION_ENGINE`                         | Tells Horizon to store login sessions using the cache backend so user sessions are managed efficiently.                                                                                                    |
| `OPENSTACK_KEYSTONE_URL`                 | Defines the Keystone authentication endpoint used by Horizon for user login.                                                                                                                               |
| `OPENSTACK_KEYSTONE_MULTIDOMAIN_SUPPORT` | Enables multi-domain authentication. When enabled, the login screen allows users to specify a domain name during login.                                                                                    |
| `OPENSTACK_KEYSTONE_DEFAULT_ROLE`        | Defines the default role assigned to users in Horizon. Older configs used `"member"`, but `"user"` is standard role in modern deployments. 

**UPDATE:** Modern OpenStack versions use **Keystone API v3**, so the `/v3` path must be included in the `OPENSTACK_KEYSTONE_URL`.

Horizon must also know which API versions to use when communicating with OpenStack services.

| API Setting   | Service                                |
| ------------- | -------------------------------------- |
| `identity: 3` | Refers to the Keystone Identity API v3 |
| `image: 2`    | Refers to the Glance Image API         |
| `volume: 3`   | Refers to the Cinder Block Storage API |

**UPDATE:** Some older documentation used `volume: 2`, but newer OpenStack releases such as **Zed** recommend using **volume API v3**.

## Configure Apache for Horizon

Horizon runs through the Apache web server, so Apache must include the correct configuration.

Edit the Apache configuration file.

```bash
sudo vi /etc/apache2/conf-available/openstack-dashboard.conf
```

Check for the following:

```apache
WSGIProcessGroup horizon
WSGIApplicationGroup %{GLOBAL}
```

If it is missing, add it to the configuration file.

This setting helps prevent Python application conflicts when running Horizon under Apache.

After editing the file, reload the Apache service.

```bash
sudo systemctl reload apache2
sudo systemctl status apache2
```

Reloading Apache applies the Horizon configuration changes.

## Verify the Horizon Dashboard

Once installation and configuration are complete, open a web browser and access the dashboard.

```
http://CONTROLLER_IP/horizon
```

Since we're testing this in VirtualBox, we can use the VM's management IP:

```
http://10.0.0.11/horizon
```

You should see the **OpenStack login page**.

Example login details:

- Username: `admin`
- Password: `ENTER-YOUR-PASSWORD`
- Domain: `Default`

If the login page loads successfully, the Horizon dashboard is installed correctly.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-10230235.png)

</div>

The dashboard now provides a graphical interface to manage the OpenStack environment, which confirms that Horizon is properly integrated with the controller node.
