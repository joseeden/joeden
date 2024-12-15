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


4. Open VirtualBox. You should see all VMs running.

    ![](/img/docs/12152021-vm-setup-virtualbox-vagrant.png)

