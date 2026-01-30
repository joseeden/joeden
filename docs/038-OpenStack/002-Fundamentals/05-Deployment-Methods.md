---
title: "Deployment"
description: "OpenStack Deployment Methods"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 5
last_update:
  date: 9/15/2023
---


## Overview 

OpenStack can be installed in many ways depending on your goals, from full production deployments to small lab setups. Each method has its pros and cons.

- **Manual installation** 

  - Detailed and provides full control
  - Time-consuming but teaches inner workings of OpenStack

- **Automated deployments** 
  
  - Simplifies deployment 
  - Reduce errors and save time
  - Suitable for production environments 

Vendor tools provide graphical interfaces, professional support, and advanced automation, which makes them well suited for production deployments.


## Manual Installation

Manual installation requires careful planning and multiple steps across nodes. 

1. You need to plan for the following:

    - Number of control, compute, and storage nodes
    - High availability setup
    - Network and storage configuration

2. After planning, the next steps are:

    - Configure physical networking
    - Install the OS on each node

3. The OpenStack infrastructure components are then deployed:

    - Network and protocol software, web servers
    - SQL database with clustering if needed
    - Message queues and caching services
    - Additional components like Etcd for newer releases

4. Once the infrastructure is ready, OpenStack services are installed:

    - Keystone (identity service) first
    - Then image, compute, network, and block storage services
    - Horizon dashboard for easier management

Each service requires configuration files, usually with `.conf` or `.ini` extensions. You set database credentials, message queue info, authentication details, and service parameters. After configuring, you populate databases and start services.



## Automated Deployment Tools

Automated tools use scripts, containers, or orchestration to simplify OpenStack installation.

### Cola

Cola packages OpenStack services in Docker containers and provides scripts for deployment:

- Cola Ansible uses Docker and Ansible for service provisioning
- Includes HA features like HAProxy and Galera
- Cola Kubernetes runs containers in Kubernetes using Helm for orchestration

You need basic knowledge of Docker and Ansible for operations, but initial deployment is straightforward.

### OpenStack Ansible

OpenStack Ansible installs many services in Linux containers (LXC) or systemd units:

- Uses Ansible roles for installing optional services
- Comes with reasonable default configurations
- Provides extensive operations and troubleshooting guides

Workflow:

1. Prepare deployment host with Ansible
2. Configure target nodes, network, storage, and SSH
3. Edit OpenStack Ansible configuration files
4. Run scripts to deploy services

### OpenStack on OpenStack (TripleO)

TripleO uses a small “undercloud” OpenStack to provision the main OpenStack (“overcloud”) nodes:

- Undercloud runs bare metal service (Ironic)
- Overcloud nodes are deployed via orchestration templates
- Adding or upgrading nodes is simplified using Ironic and orchestration

This approach is production-ready and simplifies scaling and upgrades.

## Development and POC Deployments

For learning or proof-of-voncept deployments, the following lightweight tools are available:

- **DevStack**

  - Installs OpenStack quickly from source
  - Supports single-node or multi-node setups
  - Ideal for experimentation

- **Packstack**

  - Red Hat community tool
  - Easy installation on RHEL, CentOS, Fedora
  - Supports adding compute nodes to single-node setups

These tools allow you to explore OpenStack features without heavy infrastructure.


