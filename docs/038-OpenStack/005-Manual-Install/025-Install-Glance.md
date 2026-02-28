---
title: "Install Glance"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 25
last_update:
  date: 9/15/2023
---


## Overview

Glance is the OpenStack Image Service. It stores and serves virtual machine images and other compute-related images. The installation is straightforward and is done on the controller node.

1. Set up the SQL database for Glance
2. Create the Glance user and assign roles
3. Create the Glance service and endpoints
4. Install the Glance package
5. Configure API and registry files
6. Populate the database and restart services

These steps ensure Glance is ready to manage and serve images in your OpenStack cloud.

**NOTE:** The succeeding steps are performed **on the controller node only.**

## Configure SQL Database

Start on the controller node as a superuser. 

```bash
ssh -i ~/.ssh/vbox jmeden@10.0.0.11
sudo su
```

Create the database and grant privileges to the `glance` user:

```sql
sudo mysql
CREATE DATABASE glance;
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' IDENTIFIED BY 'openstack';
GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' IDENTIFIED BY 'openstack';
FLUSH PRIVILEGES;
EXIT
```

Notes: 

- `glance` user has full access to the Glance database
- Password for `glance` is `openstack`

This prepares the database for Glance to store its state and image metadata.

## Create Glance User and Assign Role

Authenticate to OpenStack CLI using the [client environment script:](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#create-admin-environment-script)
 
```bash
source admin-openrc.sh 
```

Create the Glance user in Keystone:

```bash
openstack user create \
--domain default \
--password-prompt glance
```

Provide a password when prompted:

```bash
User Password:
Repeat User Password:
```

Assigns `admin` role in the `service` project:

```bash
openstack role add \
--project service \
--user glance admin
```

This allows Glance to authenticate with Keystone and operate as a service.

## Create Glance Service and Endpoints

Register the Glance service and its three endpoints (public, internal, admin), all pointing to the same URL for simplicity:

```bash
openstack service create \
--name glance \
--description "OpenStack Image" image

openstack endpoint create \
--region RegionOne image public http://controller:9292

openstack endpoint create \
--region RegionOne image internal http://controller:9292

openstack endpoint create \
--region RegionOne image admin http://controller:9292
```

This exposes the image service to users and other OpenStack components.

Verify:

1. Confirm Glance is registered:

    ```bash
    openstack service list
    ```

    Output:

    ```bash
    +----------------------------------+----------+----------+
    | ID                               | Name     | Type     |
    +----------------------------------+----------+----------+
    | 2527ec34edbc471b9fcd4d22390b5b17 | keystone | identity |
    | 81096520cafe403384b652442a6c00d9 | glance   | image    |
    +----------------------------------+----------+----------+
    ```

2. List the Glance endpoints:

    ```bash
    openstack endpoint list --service image
    ```

    Output:

    ```bash
    +----------------------------------+-----------+--------------+--------------+---------+-----------+------------------------+
    | ID                               | Region    | Service Name | Service Type | Enabled | Interface | URL                    |
    +----------------------------------+-----------+--------------+--------------+---------+-----------+------------------------+
    | 0f0a4ded78fd4b45af3946b3d1622f9b | RegionOne | glance       | image        | True    | public   
    | http://controller:9292 |
    | 45c5095f9b004ae2993fe557630dba8c | RegionOne | glance       | image        | True    | admin    
    | http://controller:9292 |
    | 6a19f9490ad246c09cebabb699f158bd | RegionOne | glance       | image        | True    | internal 
    | http://controller:9292 |
    +----------------------------------+-----------+--------------+--------------+---------+-----------+------------------------+
    ```

## Install Glance Package

Update repositories and install Glance:

```bash
sudo apt update
sudo apt install -y glance
```

This installs the API and registry services needed for Glance to operate.

Check the status:

```bash
systemctl status glance-api 
```

## Configure API and Registry

### Glance API

Update the `/etc/glance/glance-api.conf` and setup database connection, Keystone authentication, and image storage. 

1. In our setup, we can use [Crudini](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md#install-required-packages) to configure the database for Glance.

    ```bash
    crudini --set /etc/glance/glance-api.conf \
    database connection mysql+pymysql://glance:openstack@controller/glance
    ```

2. Next, configure the identity service access.

    If you are using modern OpenStack, Keystone should use port 5000 only. Port 35357 is no longer required.

    ```bash
    crudini --set /etc/glance/glance-api.conf keystone_authtoken auth_uri http://controller:5000
    crudini --set /etc/glance/glance-api.conf keystone_authtoken auth_url http://controller:5000
    crudini --set /etc/glance/glance-api.conf keystone_authtoken memcached_servers controller:11211
    crudini --set /etc/glance/glance-api.conf keystone_authtoken auth_type password
    crudini --set /etc/glance/glance-api.conf keystone_authtoken project_domain_name default
    crudini --set /etc/glance/glance-api.conf keystone_authtoken user_domain_name default
    crudini --set /etc/glance/glance-api.conf keystone_authtoken project_name service
    crudini --set /etc/glance/glance-api.conf keystone_authtoken username glance
    crudini --set /etc/glance/glance-api.conf keystone_authtoken password openstack
    crudini --set /etc/glance/glance-api.conf paste_deploy flavor keystone    
    ```

3. Set the local filesystem as the default image store

    ```bash
    crudini --set /etc/glance/glance-api.conf glance_store stores "file,http"
    crudini --set /etc/glance/glance-api.conf glance_store default_store file
    crudini --set /etc/glance/glance-api.conf glance_store filesystem_store_datadir /var/lib/glance/images/
    ```

4. Check the configuration file (`/etc/glance/glance-api.conf`).

    ```ini
    [database]
    connection = mysql+pymysql://glance:openstack@controller/glance

    [glance_store]
    stores = file,http
    default_store = file
    filesystem_store_datadir = /var/lib/glance/images/

    [image_format]
    disk_formats = ami,ari,aki,vhd,vhdx,vmdk,raw,qcow2,vdi,iso,ploop.root-tar

    [keystone_authtoken]
    auth_uri = http://controller:5000
    auth_url = http://controller:5000
    memcached_servers = controller:11211
    auth_type = password
    project_domain_name = default
    user_domain_name = default
    project_name = service
    username = glance
    password = openstack

    [paste_deploy]
    flavor = keystone
    ```

### Glance Registry

> `glance-registry` has been removed in newer releases (Queens and later). 
> Glance now runs API-only mode. You can skip this step.

The steps for configuring database and Keystone authentication for Glance registry is similar with the Glance API.

1. Configure the database access for Glance Registry.

    ```bash
    crudini --set /etc/glance/glance-registry.conf \
    database connection mysql+pymysql://glance:openstack@controller/glance
    ```

2. Configure the identity service access for Glance Registry.

    If you are using modern OpenStack, Keystone should use port 5000 only. Port 35357 is no longer required.

    ```bash
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken auth_uri http://controller:5000
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken auth_url http://controller:5000
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken memcached_servers controller:11211
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken auth_type password
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken project_domain_name default
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken user_domain_name default
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken project_name service
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken username glance
    crudini --set /etc/glance/glance-registry.conf keystone_authtoken password openstack
    crudini --set /etc/glance/glance-registry.conf paste_deploy flavor keystone
    ```

3. Check the configuration file (`/etc/glance/glance-registry.conf`).

    ```ini
    [database]
    connection = mysql+pymysql://glance:openstack@controller/glance

    [keystone_authtoken]
    auth_uri = http://controller:5000
    auth_url = http://controller:5000
    memcached_servers = controller:11211
    auth_type = password
    project_domain_name = default
    user_domain_name = default
    project_name = service
    username = glance
    password = openstack

    [paste_deploy]
    flavor = keystone
    ```

4. (Optional) You can verify if the services are using the correct ports.

    Check if Glance is listening on 9292:

    ```bash
    root@controller:/home/jmeden# ss -ltnp | grep 9292

    LISTEN 0      4096         0.0.0.0:9292       0.0.0.0:*    users:(("glance-api",pid=28136,fd=4),("glance-api",pid=28135,fd=4),("glance-api",pid=28128,fd=4))
    ```

    Check if Keystone is listening on 5000:

    ```bash
    root@controller:/home/jmeden# ss -ltnp | grep 5000

    LISTEN 0      511                *:5000             *:*    users:(("apache2",pid=17401,fd=6),("apache2",pid=17400,fd=6),("apache2",pid=17394,fd=6)) 
    ```

    Verify Glance API directly with curl:

    ```bash
    curl http://controller:9292 | jq
    ```

5. After changing the config files, restart the services.

    ```bash
    systemctl restart glance-api  
    systemctl restart glance-registry 
    ```

    **UPDATE:** You may get this error when restarting `glance-registry`:

    ```bash
    Failed to restart glance-registry.service: Unit glance-registry.service not found. 
    ```

    This is normal in modern OpenStack. In OpenStack Queens (and other newer releases),the `glance-registry` service is fully removed. Glance runs in API-only architecture.

## Populate Database and Restart Services

Populates database tables required for Glance:

```bash
su -s /bin/sh -c "glance-manage db_sync" glance
```

Output:

```bash
Upgraded database to: wallaby_contract01, current revision(s): wallaby_contract01
INFO  [alembic.runtime.migration] Context impl MySQLImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
Database is synced successfully. 
```

Finally, enable and restart API and registry services:

```bash
sudo systemctl restart glance-api
sudo systemctl enable glance-api
sudo systemctl status glance-api

## SKIP: glance-registry has been removed in OpenStack
sudo systemctl restart glance-registry 
sudo systemctl enable glance-registry 
sudo systemctl status glance-registry
```

Glance is now fully installed and ready to manage images in OpenStack.

## Verify Glance: Upload a Test Image

After installing Glance, test it by uploading a small image. This will confirm that the image service works correctly.

1. Download a small test image
2. Upload the image to OpenStack
3. Verify the image appears in the list
4. Optionally upload another version

### Download a Test Image

Use a small Linux test image like Cirros. It is lightweight and made for OpenStack testing. Download the `cirros-0.3.5-x86_64-disk.img` file using `wget`.

```bash
wget http://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
```

Result:

- The file downloads successfully
- The file appears in your current directory

You can confirm:

```bash
root@controller:/home/jmeden# ls -lh

total 32M
-rw-r--r-- 1 root   root    264 Feb 28 17:26 admin-openrc.sh
-rw-r--r-- 1 root   root    13M Dec  7  2021 cirros-0.3.5-x86_64-disk.img
-rw------- 1 root   root    262 Feb 28 17:09 demo-openrc.sh
drwxr-xr-x 3 jmeden jmeden 4.0K Feb 28 11:54 etcd-v3.5.0-linux-amd64
-rw-rw-r-- 1 jmeden jmeden  19M Dec  6  2021 etcd-v3.5.0-linux-amd64.tar.gz
```

If the file exists, the download worked and you are ready to upload it.

### Upload the Image to Glance

Now create an image in OpenStack using the downloaded file.

In the example below:

- The image name is `cirros-0.3.5`
- The file is `cirros-0.3.5-x86_64-disk.img`
- The disk format is `qcow2`
- The container format is `bare`
- The image is public

```bash
openstack image create "cirros-0.3.5" \
  --file cirros-0.3.5-x86_64-disk.img \
  --disk-format qcow2 \
  --container-format bare \
  --public
```

Output:

```bash
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| Field            | Value
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| container_format | bare
| created_at       | 2026-02-28T21:16:11Z
| disk_format      | qcow2
| file             | /v2/images/a3900299-cd8e-4d78-887a-dfb047fa4d12/file
| id               | a3900299-cd8e-4d78-887a-dfb047fa4d12
| min_disk         | 0
| min_ram          | 0
| name             | cirros-0.3.5
| owner            | 2448a3bc5e264464a3d20ed6012206bf
| properties       | os_hidden='False', owner_specified.openstack.md5='', owner_specified.openstack.object='images/cirros-0.3.5', owner_specified.openstack.sha256='' |
| protected        | False
| schema           | /v2/schemas/image
| status           | queued
| tags             |
| updated_at       | 2026-02-28T21:16:11Z
| visibility       | public
+------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
```

This confirms that Glance successfully stored the image.


### Verify the Image List

List all images currently stored in Glance.

```bash
openstack image list
```

Output:

```bash
+--------------------------------------+--------------+--------+
| ID                                   | Name         | Status |
+--------------------------------------+--------------+--------+
| a3900299-cd8e-4d78-887a-dfb047fa4d12 | cirros-0.3.5 | active |
+--------------------------------------+--------------+--------+
```

This confirms that the image service can list stored images correctly.


### Upload Another Version

You can upload another version to confirm multiple images work properly.

In the example below, we download `cirros-0.4.0-x86_64-disk.img`.

```bash
wget http://download.cirros-cloud.net/0.4.0/cirros-0.4.0-x86_64-disk.img
```

Now create the second image named `cirros-0.4.0`.

```bash
openstack image create "cirros-0.4.0" \
  --file cirros-0.4.0-x86_64-disk.img \
  --disk-format qcow2 \
  --container-format bare \
  --public
```

List images again:

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

This confirms that Glance handles multiple images correctly.

