---
title: "Infrastructure Planning"
description: "OpenStack Control Plane and Infrastructure Planning"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 5
last_update:
  date: 9/15/2023
---

## Overview

OpenStack needs careful planning because it runs on real infrastructure and depends on many supporting components. 

- OpenStack runs on existing infrastructure
- Services communicate through APIs
- Control plane and user plane are separated

OpenStack depends on servers, networks, storage, and supporting software to function reliably. The goal is to design a stable control plane, reliable compute resources, and scalable network and storage backends.

## Core Infrastructure Requirements

OpenStack services are mostly API-driven applications running on Linux. They need several core infrastructure components to work correctly.

| Component      | Purpose                         | Common Options             |
| -------------- | ------------------------------- | -------------------------- |
| Web servers    | Expose service APIs             | Apache, Nginx              |
| Databases      | Store service state and data    | MySQL, MariaDB, PostgreSQL |
| Message queues | Handle internal async messaging | RabbitMQ                   |
| Cache services | Improve performance             | Memcached                  |

## Control Plane 

The control plane contains all management and decision-making components in OpenStack.

- API endpoints for all services
- Authentication and authorization
- Scheduling and coordination logic

Services like compute and networking split their components between control plane and user plane. Agents running on compute nodes cannot directly access databases. Instead, conductor services in the control plane relay and filter communication. 

<div class='img-center'>

![](/img/docs/all-things-openstack.png)

</div>

## Control Plane High Availability

The control plane uses several mechanisms to stay stable and highly available. These mechanisms keep OpenStack services accessible during failures, reduce downtime, and support reliable scaling as the cloud grows.

| Mechanism               | Purpose                                    | Common Tools |
| ----------------------- | ------------------------------------------ | ------------ |
| Database clustering     | Prevent data loss and improve availability | Galera       |
| Load balancing for APIs | Distribute traffic and detect failures     | HAProxy      |
| Service orchestration   | Monitor and restart failed services        | Pacemaker    |


## Compute Resource Pool Planning

OpenStack supports multiple compute models, with virtual machines being the most common. Compute resources can be grouped, scheduled, and sized based on workload requirements and host capabilities.

| Factor                      | Description                                                                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hypervisor support          | <ul><li>Supports multiple hypervisors such as KVM and ESXi</li><li>The choice depends on cost, team skills, and existing workloads</li></ul>                                                                                           |
| Compute pools               | <ul><li>Hosts can be grouped into separate resource pools</li></ul>                                                                                                                                                                    |
| Capability-based scheduling | <ul><li>Instances are scheduled based on host features like SSDs or GPUs</li></ul>                                                                                                                                                     |

Availability zones and host aggregates ensure that workloads run on the most suitable hosts and improve performance and efficiency. 


## Compute Hardware Considerations 

When selecting compute hardware, several factors must be considered to ensure optimal performance and resource utilization.

| Factor                               | Description                                                                                                                                                                                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instance density & workload patterns | <ul><li>Flavors define VM CPU, memory, and storage sizes</li><li>Server configuration should consider cost and performance</li><li>Use COTS rack servers, blade servers, or HCI as appropriate</li><li>Plan for power and cooling density</li></ul> |
| Overcommit ratios                    | <ul><li>CPU default ratio is 16:1</li><li>RAM default ratio is 1.5:1</li></ul>                                                                                                                                                                      |
| Hardware acceleration                | <ul><li>GPUs for compute-intensive workloads</li><li>SSDs and NVMe drives for faster storage performance</li></ul>                                                                                                                                  |

These factors define how VMs are sized and how resources are allocated. Overcommitment allows physical hardware to host more virtual resources than its actual capacity, and improves efficiency while maintaining predictable performance.

The table below illustrates how overcommitment works in practice:

| Resource          | Physical Hardware | Virtual Allocation | Notes                                                                |
| ----------------- | ----------------- | ------------------ | -------------------------------------------------------------------- |
| CPU               | 12 cores          | 192 vCPUs          | With default 16:1 ratio, each physical core supports 16 virtual CPUs |
| RAM               | 256 GB            | 384 GB             | With 1.5:1 ratio, virtual memory exceeds physical memory             |
| VM Flavor Example | 4 vCPUs, 8 GB RAM | 48 instances       | Scheduler can run 48 M1 Large instances on this node                 |

Overcommitment ratios can be changed based on workload requirements or operational priorities. This helps administrators maintain a balance between efficiency, cost, and performance.


## Physical Network Design

The physical network, or **underlay**, carries all OpenStack traffic. It must be reliable, redundant, and high-performing to support production workloads.

| Factor                | Details                                                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Traffic segmentation  | <ul><li>Management network</li><li>External/provider network</li><li>Storage network</li><li>Internal/user network</li></ul>                                      |
| VLAN vs VXLAN         | <ul><li>VLAN for smaller or legacy deployments</li><li>VXLAN for large-scale overlay networks</li><li>VXLAN allows easier network isolation and scaling</li></ul> |
| Redundant paths       | <ul><li>Multiple NICs on compute nodes</li><li>Redundant switching layers</li></ul>                                                                               |
| Performance & latency | <ul><li>Throughput planning to meet workload demands</li><li>Low latency for real-time systems</li><li>Quality of Service for critical traffic</li></ul>          |
| Network acceleration  | <ul><li>Intelligent NICs</li><li>SR-IOV</li><li>Hardware VTEPs</li><li>VXLAN termination in switches</li></ul>                                                    |

High network performance is essential for demanding workloads such as telecom or real-time systems. Acceleration technologies improve throughput and reduce latency, which ensures predictable and efficient operations.


## Software-Defined Networking

Most OpenStack networking is implemented in software.

- Virtual networks and subnets
- VXLAN tunneling between hosts
- Multiple SDN options

Common solutions include Linux Bridge for small setups and Open vSwitch for larger environments. More complex deployments may integrate with external SDN platforms like NSX or ACI. This software-defined approach provides flexibility while still using standard network hardware.

## Storage Backend Planning

Storage design depends heavily on what already exists in the data center.

- Hardware or software-defined storage
- Performance and reliability requirements
- Data path design

Backends like LVM and Ceph are common choices. The key concern is how data moves between compute nodes and storage devices. Good storage planning ensures acceptable performance and scalability for workloads.

## Planning for Additional Services

Core services are only part of a full OpenStack deployment.

- Monitoring and telemetry
- Database and container services
- Future expansion needs

Telemetry services generate extra network traffic and storage usage. Database and container services may require large instances and replication. Planning ahead prevents resource shortages later. OpenStack architecture becomes manageable when each service and its impact are clearly understood.

OpenStack architecture planning requires understanding control plane design, infrastructure dependencies, and workload needs. Careful design ensures the cloud is scalable, resilient, and ready for future growth.


