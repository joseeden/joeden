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

## OpenStack 

OpenStack is an open-source cloud platform that delivers IaaS capabilities. It orchestrates pools of compute, storage, and networking resources through APIs and a web dashboard.

<div class='img-center'>  
![](/img/docs/openstack-marketecture-diagram.png)  
</div>  

OpenStack turns all the hypervisors, storage, and network devices into pools of resources. Users can consume these resources without worrying about the underlying technology.

- Compute (Nova) abstracts and orchestrates all hypervisors
- Block storage (Cinder) provides persistent storage
- Object storage (Swift) handles scalable data storage
- Networking (Neutron) manages networks consistently


## OpenStack Architecture 

OpenStack is modular, with core and optional projects. Core projects are commonly deployed, while optional projects depend on the use case.

- Core projects handle essential cloud services
- Optional projects provide additional features if needed
- Horizon provides a dashboard and self-service capabilities

Using the [Project Navigator website](https://www.openstack.org/software/project-navigator/openstack-components#openstack-services), you can see all OpenStack projects, their status, maturity, and sample configurations for real-world scenarios like web hosting, e-commerce, or big data.

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-25-100628.png)

</div>


## Control and Data Planes 

OpenStack separates control and data planes to manage resources efficiently. 

- Control plane handles requests and scheduling
- Data plane executes tasks on compute and storage hosts
- Policies are enforced automatically to reduce errors

Separating these planes ensures workloads keep running even when controllers are restarted. It also allows network traffic to be segmented for security and performance.

<div class='img-center'>

![](/img/docs/all-things-openstack.png)

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

| Node Type  | Purpose                                                                                                                                                                 | Typical Services                                                                                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Controller | <ul><li>Host APIs, schedulers, databases, and message queues</li><li>Manage orchestration and user authentication</li><li>Coordinate control plane operations</li></ul> | <ul><li>Keystone</li><li>Placement</li><li>Nova API</li><li>Nova Scheduler</li><li>Glance API</li><li>Cinder API</li><li>Cinder Scheduler</li><li>Heat</li><li>Horizon / Skyline</li></ul> |
| Compute    | <ul><li>Run nova-compute and hypervisors like KVM</li><li>Execute VM operations and tenant workloads</li></ul>                                                          | <ul><li>nova-compute</li><li>Neutron OVS agent</li><li>Optional Glance image cache</li></ul>                                                                                               |
| Storage    | <ul><li>Manage block and object storage</li><li>Provide persistent storage for VMs and images</li></ul>                                                                 | <ul><li>cinder-volume</li><li>Object storage daemons</li><li>Optional Glance image cache</li></ul>                                                                                         |
| Network    | <ul><li>Handle routing, DHCP, and load balancing</li><li>Move tenant traffic efficiently</li></ul>                                                                      | <ul><li>Neutron L3 agent</li><li>DHCP agent</li><li>Load balancer agent</li></ul>                                                                                                          |

:::info 

Small labs may combine roles on a single host, while production clouds scale each role horizontally for performance and compliance.

:::

## Regions and Availability Zones

OpenStack supports multiple Regions and Availability Zones for scale, isolation, and resilience.

- **Regions**

  - Independent OpenStack deployments sharing a Keystone catalog
  - Users choose regions for latency or disaster recovery

- **Availability Zones (AZs)**

  - User-visible fault domains within a region
  - Spread redundant instances across AZs to survive hardware failures

Regions and AZs allow admins to upgrade independently, meet data laws, and provide high SLAs without complex clustering.

<div class='img-center'>

![](/img/docs/image_08_004.jpg)

</div>


## Host Aggregates and Cells

OpenStack uses **host aggregates** and **cells** to organize resources, scale efficiently, and enforce policies automatically.

### Host Aggregates

Host aggregates group hosts by metadata such as GPU, SSD, or maintenance windows. The scheduler uses these tags to place VMs on hosts that match requested traits.

Example metadata:

```bash
gpu=true
ssd=true
maintenance=windows-approved
```

Host aggregates make it easy to manage special hardware, such as GPUs or SSDs, while keeping VM placement automatic and consistent.

<div class='img-center'>

![](/img/docs/all-things-openstack-host-agg.png)

</div>


### Cells v2

Cells partition OpenStack deployments into smaller, manageable units to improve scalability and avoid database bottlenecks.

- Each cell has its own database and message queue
- The top-level **API cell** manages global requests and authentication
- **Child cells** manage local resources and compute nodes

The API cell and child cells work together to make this structure effective: 

- **API Cell**

  - Authenticates incoming requests via Keystone
  - Routes requests to the correct child cell
  - Keeps tenants unaware of internal cell structure

- **Child Cells**

  - Manage a subset of compute nodes, databases, and message queues
  - Handle local scheduling, networking, and storage operations
  - Failures in one child cell do not affect others
  - Operate independently but follow global policies from the API cell


<div class='img-center'>

![](/img/docs/all-things-openstack-cell-v2.png)

</div>


## Example Workflow

A user in Region West deploys a three-tier app with Heat:

1. Nova API authenticates through Keystone and forwards requests to the right cell
2. Scheduler picks hosts in the chosen AZs and combines resources
3. Neutron and Cinder agents manage networking and storage within each cell

Typical flow:

```bash
Region -> AZ -> Cell -> Host
```

Outcome: The app runs resiliently and efficiently, following placement policies automatically.

<div class='img-center'>

![](/img/docs/all-things-openstack-sample-workflow.png)

</div>



