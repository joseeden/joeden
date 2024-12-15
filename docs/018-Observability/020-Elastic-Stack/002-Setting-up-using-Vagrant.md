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

On Node1, perform the steps below:

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