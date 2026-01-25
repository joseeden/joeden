---
title: "Components"
description: "OpenStack Components"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 2
last_update:
  date: 9/15/2023
---


## Overview

OpenStack has several key components that work together to manage cloud resources. Each component has a specific role, and together they handle authentication, networking, storage, and compute for virtual machines. 

<div class='img-center'>

![](/img/docs/Screenshot-2026-01-25-101642.png)

</div>

<!-- - **Keystone** handles identity
- **Glance** manages VM images
- **Neutron** provides networking
- **Nova** manages compute instances
- **Cinder** provides persistent block storage
- **Swift** offers object storage
- **Horizon** provides the web dashboard -->


## Keystone – Identity Service

Keystone is where users and services are authenticated and authorized. It acts as the central registry for all OpenStack services so services and users know how to reach each other.

- Authenticates users and services
- Registers all OpenStack services
- Provides a service catalog

## Glance – Image Management

Glance stores and retrieves virtual machine disk images. Pre-built images are loaded into Glance so VMs can boot without installing the OS each time.

- Stores the VM images
- Retrieves images during VM provisioning
- Pre-built images save setup time


## Neutron – Networking

Neutron handles virtual networking for OpenStack. It connects VMs to networks and provides network services to other OpenStack projects. 

- Creates virtual networks
- Attaches VMs to networks
- Extensible and pluggable

Neutron's pluggable architecture supports many vendors and technologies.


## Nova – Compute Management

Nova manages the life cycle of virtual machines. It coordinates compute, storage, and networking resources through hypervisors.

- Launches and manages VMs
- Handles migration, resizing, and termination
- Coordinates compute, storage, and networking

Nova acts as the main controller for virtual machines, and ensures resources are properly allocated and VMs run smoothly.


## Cinder – Persistent Block Storage

Cinder provides block storage for instances that need to keep data after termination. Volumes can be detached and attached to other VMs, but each volume is dedicated to a single VM.

- Provides persistent block storage
- Keeps data after VM termination


## Swift – Object Storage

Swift offers simple object storage for files like videos or backups. It uses HTTP-based APIs with GET and PUT commands and scales easily for large datasets.

Swift is highly scalable and flexible, and it is ideal for storing unstructured data and powering large-scale applications like websites or media storage.


## Horizon – Web Dashboard

Horizon provides a web interface for managing OpenStack services. Users can launch instances, assign IPs, configure access, and more, all through a browser.

Horizon makes it easy for users to control cloud resources without needing command-line access.

