---
title: "OpenStack Overview"
description: "First things you need to know"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 1
last_update:
  date: 9/15/2023
---



## Cloud Computing Basics

Cloud is defined by NIST as a model for on-demand access to configurable resources. A virtualized data center becomes a cloud when it meets five key traits:

- **On-demand self-service**

  - Provision resources automatically without human intervention
  - In OpenStack, Horizon or CLI acts as the self-service interface

- **Broad network access**

  - Resources are reachable from laptops, phones, or CI pipelines
  - APIs behave the same whether accessed remotely or inside the data center

- **Resource pooling**

  - Multiple users share physical servers, storage, and network
  - Users get virtual resources without knowing the underlying hardware

- **Rapid elasticity**

  - Resources can scale up or down instantly based on demand
  - Supports auto-scaling of workloads during peak usage

- **Measured service**

  - Resource consumption is tracked for billing and capacity planning
  - Helps finance cross-charge departments accurately and admins plan growth

Cloud traits reduce lead time, enable pay-as-you-grow economics, and make experimentation friction-free. 

For more information, please see [Cloud Foundations.](/docs/033-Cloud-Computing/001-Cloud-Foundations/001-The-Basics.md)


## Cloud Service Models

Service models define what the provider manages and what the customer manages:

- **Infrastructure-as-a-Service (IaaS)**

  - Provider handles hardware, hypervisors, and APIs
  - Customer manages OS and applications
  - OpenStack, AWS EC2, Google Compute Engine

- **Platform-as-a-Service (PaaS)**

  - Provider also manages the runtime environment
  - Customer only deploys code
  - Examples: Heroku, Google App Engine

- **Software-as-a-Service (SaaS)**

  - Provider runs the full application
  - Customer only uses the software
  - Examples: Salesforce, Office 365


For more information, please see [Cloud Service Models.](/docs/033-Cloud-Computing/001-Cloud-Foundations/004-Cloud-Service-models.md)

OpenStack focuses on IaaS, presenting compute, storage, and networking as self-service blocks. This sets clear boundaries: 

- Admins manage hypervisors and networks
- Users manage OS and apps.

## OpenStack Architecture 

OpenStack separates control and data planes to manage resources efficiently. 

- Control plane handles requests and scheduling
- Data plane executes tasks on compute and storage hosts
- Policies are enforced automatically to reduce errors

Separating these planes ensures workloads keep running even when controllers are restarted. It also allows network traffic to be segmented for security and performance.

<div class='img-center'>

![](/img/docs/all-things-openstack.png)

</div>

## OpenStack Services

OpenStack uses multiple services to automatically deliver resources when a user requests a VM. 

- Control plane services handle requests and make decisions
- Data plane agents execute actions on the hosts. 

OpenStack orchestrates all these services so administrators set policies once and the platform enforces them automatically. This automation ensures reliable, fast, and error-free VM provisioning.

<div class='img-center'>  
![](/img/docs/openstack-marketecture-diagram.png)  
</div>  


### Control Plane Services

Control plane handles requests and scheduling. 

| Service           | Role          | Description                                        |
| ----------------- | ------------- | -------------------------------------------------- |
| Keystone          | Identity      | Authenticates users and manages credentials        |
| Glance            | Images        | Streams VM images to compute nodes                 |
| Nova API          | Compute       | Schedules VM on a hypervisor using Placement       |
| Neutron API       | Networking    | Creates network ports and sets up overlay tunnels  |
| Cinder API        | Block Storage | Attaches storage volumes to instances              |
| Heat              | Orchestration | Automates deployment of multi-service applications |
| Horizon / Skyline | Dashboard     | Web interface for managing OpenStack resources     |

### Data Plane Agents

Data plane agents run on hosts. 

| Agent             | Role       | Description                                    |
| ----------------- | ---------- | ---------------------------------------------- |
| nova-compute      | Compute    | Runs on each hypervisor to manage VM lifecycle |
| neutron-OVS-agent | Networking | Configures Open vSwitch on compute hosts       |
| cinder-volume     | Storage    | Manages backend storage volumes                |


## Node Roles

OpenStack runs on Linux servers that assume one or more roles depending on the deployment size.

<!-- - **Controller nodes**

  - Host APIs, schedulers, databases, and message queues
  - Issue work orders for the cloud operations
  - Keystone and placement live exclusively on controllers
  - Nova API and Nov Scheduler also stays here

- **Compute nodes**

  - Run nova-compute and KVM to create and manage VMs
  - Execute heavy workloads on the factory floor

- **Storage nodes**

  - Run cinder-volume or object storage daemons
  - Manage persistent storage for VMs

- **Network nodes**

  - Host Neutron L3 routers, DHCP, and load balancer agents
  - Move tenant traffic efficiently across the network -->

| Node Type  | Purpose                                                                                                                                                                 | Typical Services                                                                                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Controller | <ul><li>Host APIs, schedulers, databases, and message queues</li><li>Manage orchestration and user authentication</li><li>Coordinate control plane operations</li></ul> | <ul><li>Keystone</li><li>Placement</li><li>Nova API</li><li>Nova Scheduler</li><li>Glance API</li><li>Cinder API</li><li>Cinder Scheduler</li><li>Heat</li><li>Horizon / Skyline</li></ul> |
| Compute    | <ul><li>Run nova-compute and hypervisors like KVM</li><li>Execute VM operations and tenant workloads</li></ul>                                                          | <ul><li>nova-compute</li><li>Neutron OVS agent</li><li>Optional Glance image cache</li></ul>                                                                                               |
| Storage    | <ul><li>Manage block and object storage</li><li>Provide persistent storage for VMs and images</li></ul>                                                                 | <ul><li>cinder-volume</li><li>Object storage daemons</li><li>Optional Glance image cache</li></ul>                                                                                         |
| Network    | <ul><li>Handle routing, DHCP, and load balancing</li><li>Move tenant traffic efficiently</li></ul>                                                                      | <ul><li>Neutron L3 agent</li><li>DHCP agent</li><li>Load balancer agent</li></ul>                                                                                                          |

:::info 

Small labs may combine roles on a single host, while production clouds scale each role horizontally for performance and compliance.

:::