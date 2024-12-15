---
title: "Setting up Elastic using Vagrant"
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

4. Open VirtualBox. You should see all VMs running.

    ![](/img/docs/12152021-vm-setup-virtualbox-vagrant.png)


