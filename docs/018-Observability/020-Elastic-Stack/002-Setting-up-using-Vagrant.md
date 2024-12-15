---
title: "Setting up Elastic"
description: "Setting up Elastic Stack using Vagrant"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Elasticsearch
- DevOps
sidebar_position: 2
last_update:
  date: 3/28/2023
---


## Overview

This lab demonstrates how to set up the Elastic Stack using Vagrant and VirtualBox.  

## Pre-requisites 

- Install VirtualBox 
- Install Vagrant on Windows 

## Setup the Virtual Machines 

1. Download the Vagrant files here:
2. Unzip the Files. Open Powershell and proceed to Elastic directory.
3. Run the command below. This will create four virtual machines in VirtualBox

  ```bash
  vagrant up 
  ```

  If you encounter any error, you can add the `--debug` parameter:

  ```bash
  vagrant up --debug
  ```

  Since having multiple Virtual machines can be resource-intensive, you can modify the `Vagrantfile` and comment out the `config` blocks for the other VMs.

4. Run the `vagrant` command below to list the VMs:

    ```bash
    vagrant ssh-config 
    ```

    Output:

    ```bash
    Host node1
      HostName 127.0.0.1
      User vagrant
      Port 2222
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node1/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa

    Host node2
      HostName 127.0.0.1
      User vagrant
      Port 2200
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node2/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa

    Host node3
      HostName 127.0.0.1
      User vagrant
      Port 2201
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node3/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa

    Host node4
      HostName 127.0.0.1
      User vagrant
      Port 2202
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/virtual-machines/elastic/.vagrant/machines/node4/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
      PubkeyAcceptedKeyTypes +ssh-rsa
      HostKeyAlgorithms +ssh-rsa      
    ```

5. Open VirtualBox. You should see all VMs running.

    ![](/img/docs/12152021-vm-setup-virtualbox-vagrant.png)

6. To login to the node, run:

    ```bash
    vagrant ssh node1 
    ```


## Install Elasticsearch 8.17 

On Node1, switch to **root** user and perform the steps below:

1. Download and install the public signing key:

    ```bash
    wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
    ```

2. Install the `apt-transport-https` package on Debian before proceeding:

    ```bash
    sudo apt-get install apt-transport-https
    ```

3. Save the repository definition to `/etc/apt/sources.list.d/elastic-8.x.list:`

    ```bash
    echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list 
    ```
4. Install the Elasticsearch Debian package

    ```bash
    sudo apt-get update && sudo apt-get install elasticsearch 
    ```

5. Enable and start the service.

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable --now elasticsearch.service
    sudo systemctl status elasticsearch.service 
    ```

6. Reset the password for the `elastic` user.

    ```bash
    /usr/share/elasticsearch/bin/elasticsearch-reset-password -i -u elastic 
    ```

    Press `y` when prompted and then provide your new password.

    ```bash
    Please confirm that you would like to continue [y/N]y

    Enter password for [elastic]:
    Re-enter password for [elastic]:
    Password for the [elastic] user successfully reset.      
    ```

7. Verify the access:

    ```bash
    curl -k -u elastic:<add-password>  https://localhost:9200
    ```

    Output:

    ```bash
    {
      "name" : "node1",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "fXtr5JJZSHGcVV5p19OCqQ",
      "version" : {
        "number" : "8.17.0",
        "build_flavor" : "default",
        "build_type" : "deb",
        "build_hash" : "2b6a7fed44faa321997703718f07ee0420804b41",
        "build_date" : "2024-12-11T12:08:05.663969764Z",
        "build_snapshot" : false,
        "lucene_version" : "9.12.0",
        "minimum_wire_compatibility_version" : "7.17.0",
        "minimum_index_compatibility_version" : "7.0.0"
      },
      "tagline" : "You Know, for Search"
    }
    ```

## Tune Down the Memory (Optional)

Since we're using virtual machines on a Windows computer, we can set the memory limit used by Elasticsearch. 

1. Login to Node1 and edit the config file:

    ```bash
    sudo vi /etc/default/elasticsearch
    ```

2. Set the max and minimum memory to 512MB. Save afterwards.

    ```bash
    ES_JAVA_OPTS="-Xms512m -Xmx512m"
    ```

3. Restart the service.

    ```bash
    sudo systemctl restart elasticsearch.service 
    sudo systemctl status elasticsearch.service 
    ```

## Configure SSL on Elasticsearch

To establish the trust relationship, perform the steps below:

1. Copy the certificate to the trusted certificates directory:

    ```bash
    cp /etc/elasticsearch/certs/http_ca.crt /usr/share/ca-certificates/elastic-ca.crt 
    ```

2. If you're using Ubuntu or Debian-based system, run the command below.

    ```bash
    dpkg-reconfigure ca-certificates
    ```

4.  When prompted, click Yes. 

![](/img/docs/12152024-Observability-elastic-config-ssl.png)

4. Select the copied certificate by pressing spacebar > Enter 

![](/img/docs/12152024-Observability-elastic-config-ssl-2.png)

5. Verify that the SSL certificate works.

    ```bash
    curl -u elastic:<add-password>  https://localhost:9200
    ```

    Output:

    ```bash
    {
      "name" : "node1",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "fXtr5JJZSHGcVV5p19OCqQ",
      "version" : {
        "number" : "8.17.0",
        "build_flavor" : "default",
        "build_type" : "deb",
        "build_hash" : "2b6a7fed44faa321997703718f07ee0420804b41",
        "build_date" : "2024-12-11T12:08:05.663969764Z",
        "build_snapshot" : false,
        "lucene_version" : "9.12.0",
        "minimum_wire_compatibility_version" : "7.17.0",
        "minimum_index_compatibility_version" : "7.0.0"
      },
      "tagline" : "You Know, for Search"
    }
    ```