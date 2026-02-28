---
title: "Infrastructure Services"
description: "Prepare the Infrastructure Services"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 20
last_update:
  date: 9/15/2023
---


## Overview

On all nodes, install:

- NTP for time synchronization
- OpenStack repository packages

On the controller node, install:

- MariaDB for database
- RabbitMQ for message queue
- Memcached
- etcd

## Configure Time Sync Between Nodes

All nodes must have the same time. This prevents errors during OpenStack installation and keeps services stable.

- The controller will act as the time server
- Compute and block nodes will sync their time from the controller

#### On the controller node

1. Install the chrony package:

    ```bash
    sudo apt install chrony -y 
    ```

2. Next, edit the configuration file `chrony.conf`:

    ```bash
    sudo vi /etc/chrony/chrony.conf
    ```

    Keep the default pool lines. These allow the controller to sync with public NTP servers.

    Add this line at the bottom to allow your management network (10.0.0.0/24):

    ```bash
    allow 10.0.0.0/24 
    ```

    This allows compute and block nodes to get time from the controller.

3. Restart the service:

    ```bash
    sudo systemctl restart chrony
    sudo systemctl status chrony
    ```

    The controller now syncs from the internet and serves time to other nodes.

4. Verify the time sync:

    ```bash
    chronyc sources 
    ```

    It should show the external public NTP servers.

    ```bash
    MS Name/IP address         Stratum Poll Reach LastRx Last sample       

    ===============================================================================
    ^- alphyn.canonical.com          2   7   301   123   -459us[+6127us] +/-  157ms
    ^- prod-ntp-4.ntp4.ps5.cano>     2   6   377     2    -37ms[  -37ms] +/-  121ms
    ^- prod-ntp-5.ntp4.ps5.cano>     2   7   301   122    -51ms[  -45ms] +/-  143ms
    ^- prod-ntp-3.ntp4.ps5.cano>     2   6   203    56    -43ms[  -40ms] +/-  127ms
    ^+ sin1.sg.ntp.li                3   6   377     3    +12ms[  +12ms] +/-   36ms
    ^+ sin.time.unun.fi              4   6   377     6  -1862us[+1120us] +/-   37ms
    ^* kaguaani.miuku.net            2   6   377     5  -1864us[+1127us] +/-   12ms
    ^- bkk-sin.clearnet.pw           2   6   377     4  -9092us[-9092us] +/-   75ms 
    ```


#### On the compute and block nodes

1. Install the chrony package:

    ```bash
    sudo apt install chrony -y 
    ```

2. Edit the configuration file `chrony.conf`:

    ```bash
    sudo vi /etc/chrony/chrony.conf
    ```

    Comment out the existing pool lines:

    ```bash
    #pool ntp.ubuntu.com        iburst maxsources 4
    #pool 0.ubuntu.pool.ntp.org iburst maxsources 1
    #pool 1.ubuntu.pool.ntp.org iburst maxsources 1
    #pool 2.ubuntu.pool.ntp.org iburst maxsources 2 
    ```

    Add this line to use the controller as the time server:

    ```bash
    server controller iburst
    ```

    Here, controller must resolve to the management IP (`10.0.0.11`). 
    
    **NOTE:** Make sure it exists in `/etc/hosts`.


3. Restart the service:

    ```bash
    sudo systemctl restart chrony
    sudo systemctl status chrony
    ```

    The compute and block node now syncs time from the controller.


4. Verify the time sync:

    ```bash
    chronyc sources 
    ```

    Both node should show the controller as their time source:

    ```bash
    MS Name/IP address         Stratum Poll Reach LastRx Last sample  

    ===============================================================================
    ^* controller                    3   6    37    32    +41us[ +502us] +/-   16ms 
    ```

## Install Required Packages

On all three nodes:

1. Install the base packages:

    ```bash
    sudo apt install software-properties-common -y
    ```

2. Set the OpenStack release for the installation. 

    In this setup, the release name is **zed**.

    ```bash
    sudo add-apt-repository cloud-archive:zed -y 
    ```

3. Update the package list and upgrade installed packages.

    ```bash
    sudo apt update
    sudo apt upgrade -y 
    ```

4. If the kernel or core libraries were updated, reboot the system.

    ```bash
    sudo reboot
    ```

5. Install the OpenStack command-line client.

    ```bash
    sudo apt install python3-openstackclient -y
    ```

    Verify installation:

    ```bash
    openstack --version 
    ```

    Output:

    ```bash
    openstack 6.0.0  
    ```

## Install and Configure MariaDB

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

RabbitMQ handles messaging between OpenStack services.

1. Install MariaDB and the Python connector package.

    ```bash
    sudo apt install mariadb-server python3-pymysql -y
    ```

2. Check the MariaDB configuration files:

    ```bash
    jmeden@controller:~$ ls -lrt /etc/mysql/mariadb.conf.d/

    total 20
    -rw-r--r-- 1 root root  570 Oct 11 03:03 60-galera.cnf
    -rw-r--r-- 1 root root 3572 Oct 11 03:03 50-server.cnf
    -rw-r--r-- 1 root root  927 Oct 11 03:03 50-mysqld_safe.cnf
    -rw-r--r-- 1 root root  231 Oct 11 03:03 50-mysql-clients.cnf
    -rw-r--r-- 1 root root  575 Oct 11 03:03 50-client.cnf
    ```

    If it doesn't exist, create the custom config file:

    ```
    sudo vi /etc/mysql/mariadb.conf.d/99-openstack.cnf
    ```

    Add basic settings:

    ```ini
    [mysqld]
    bind-address = 10.0.0.11
    default-storage-engine = innodb
    innodb_file_per_table = on
    max_connections = 4096
    collation-server = utf8_general_ci
    character-set-server = utf8
    ```

    Here, `bind-address` must match the controller management IP.

3. Restart MariaDB:

    ```bash
    sudo systemctl restart mariadb
    sudo systemctl status mariadb
    ```

4. Verify its listening on the management IP:

    ```bash
    sudo ss -lntp | grep 3306
    ```

    Output:

    ```bash
    LISTEN 0      869        10.0.0.11:3306       0.0.0.0:*    users:(("mariadbd",pid=3120,fd=19))
    ```

5. Now secure the database:

    ```bash
    sudo mysql_secure_installation
    ```

    During the setup:

    | Action                                | Choice |
    | ------------------------------------- | ------ |
    | Press Enter for current root password | Enter  |
    | Change the root password?             | No     |
    | Switch to unix_socket authentication  | No     |
    | Remove anonymous users                | Yes    |
    | Disallow root login remotely          | No     |
    | Remove test database and access to it | Yes    |
    | Reload privileges tables              | Yes    |

    This should return:

    ```bash
    Cleaning up...

    All done!  If you've completed all of the above steps, your MariaDB    
    installation should now be secure.

    Thanks for using MariaDB!
    ```

    MariaDB is now installed and secured, which prepares the database layer for OpenStack.


## Install and Configure RabbitMQ

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

RabbitMQ handles messaging between OpenStack services.

1. Install the package:

    ```bash
    sudo apt install rabbitmq-server -y
    ```

2. Add the `openstack` user. Replace `RABBIT_PASS` with your chosen password.

    ```bash
    sudo rabbitmqctl add_user openstack RABBIT_PASS
    ```

3. Set permissions for the `openstack` user:

    ```bash
    sudo rabbitmqctl set_permissions openstack ".*" ".*" ".*"
    ```

RabbitMQ is now ready to handle internal service communication.


## Install and Configure Memcached

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

Memcached stores authentication tokens for faster access.

1. Install packages:

    ```bash
    sudo apt install memcached python3-memcache -y
    ```

2. Edit configuration file:

    ```
    sudo vi /etc/memcached.conf
    ```

    Find the `-l` option and set it to the controller management IP:

    ```bash
    -l 10.0.0.11
    ```

3. Restart the service:

    ```bash
    sudo systemctl restart memcached
    sudo systemctl status memcached
    ```

Memcached is now configured for token caching on the controller.

## Install and Configure etcd

> All steps below are performed **only on the controller node** because it hosts the infrastructure layer.

etcd stores distributed configuration data.

1. Create group and user:

    ```bash
    sudo groupadd --system etcd
    sudo useradd --system  --home-dir "/var/lib/etcd" --shell /bin/false -g etcd etcd
    ```

2. Create required directories:

    ```bash
    sudo mkdir -p /etc/etcd /var/lib/etcd
    sudo chown -R etcd:etcd /var/lib/etcd
    ```

3. Download and extract etcd:

    ```bash
    wget https://github.com/etcd-io/etcd/releases/download/v3.5.0/etcd-v3.5.0-linux-amd64.tar.gz
    tar xvf etcd-v3.5.0-linux-amd64.tar.gz
    sudo mv etcd-v3.5.0-linux-amd64/etcd* /usr/local/bin/
    ```

    Verify:

    ```bash
    jmeden@controller:~$ ls -la /usr/local/bin/

    total 56236
    drwxr-xr-x  2 root   root       4096 Feb 28 11:54 .
    drwxr-xr-x 10 root   root       4096 Sep 11  2023 ..
    -rwxr-xr-x  1 jmeden jmeden 23560192 Jun 15  2021 etcd
    -rwxr-xr-x  1 jmeden jmeden 17969152 Jun 15  2021 etcdctl
    -rwxr-xr-x  1 jmeden jmeden 16048128 Jun 15  2021 etcdutl
    ```

4. Create configuration file:

    ```
    sudo vi /etc/etcd/etcd.conf.yml
    ```

    Example content:

    ```yaml
    name: controller
    data-dir: /var/lib/etcd
    initial-cluster: controller=http://10.0.0.11:2380
    initial-cluster-state: new
    initial-cluster-token: etcd-cluster-01
    initial-advertise-peer-urls: http://10.0.0.11:2380
    listen-peer-urls: http://10.0.0.11:2380
    listen-client-urls: http://10.0.0.11:2379
    advertise-client-urls: http://10.0.0.11:2379
    ```

    Notes:

    - The `10.0.0.11` is the controller management IP.
    - The `listen-peer-urls` is used by etcd to communicate with other etcd nodes in the cluster.
    - On a single-node cluster, you only have one node, so `10.0.0.11:2380` is correct.

    When you later add more nodes to the etcd cluster, each node will use its own IP in listen-peer-urls and initial-cluster.

5. Create systemd service file:

    ```
    sudo vi /etc/systemd/system/etcd.service
    ```

    Example content:

    ```ini
    [Unit]
    Description=etcd - highly-available key-value store
    Documentation=https://etcd.io/docs/
    After=network.target

    [Service]
    Type=notify
    User=etcd
    Group=etcd
    ExecStart=/usr/local/bin/etcd \
      --name controller \
      --data-dir=/var/lib/etcd \
      --config-file /etc/etcd/etcd.conf.yml \
      --listen-client-urls=http://0.0.0.0:2379 \
      --advertise-client-urls=http://127.0.0.1:2379
    Restart=always
    RestartSec=5s
    LimitNOFILE=65536

    [Install]
    WantedBy=multi-user.target
    ```

6. Enable and start etcd:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable etcd
    sudo systemctl start etcd
    sudo systemctl status etcd
    ```

etcd is now running as a system service.



## Next Steps 

The controller now runs:

- MariaDB for databases
- RabbitMQ for messaging
- Memcached for token caching
- etcd for distributed coordination

With these services installed and running, the infrastructure layer is ready for OpenStack service installation.

Next, install the core Openstack Services:

| Node(s)                | OpenStack Service            |
| ---------------------- | ---------------------------- |
| Controller             | Keystone identity service    |
| Controller             | Glance image service         |
| Controller             | Horizon dashboard            |
| Controller and Compute | Nova compute service         |
| Controller and Compute | Neutron networking service   |
| Controller and Storage | Cinder block storage service |

See page for [Keystone](/docs/038-OpenStack/005-Manual-Install/022-Install-Keystone.md)

