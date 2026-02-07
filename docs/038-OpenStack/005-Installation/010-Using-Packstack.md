---
title: "Using Packstack"
description: "Using Packstack to Setup OpenStack"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 10
last_update:
  date: 9/15/2023
---


## Overview

OpenStack is an open source cloud platform for running virtual machines, storage, and networking in one environment.

- Provides cloud infrastructure services
- Packaged By RPM Based Linux distributions

OpenStack delivers the core cloud features, and RPM based Linux systems provide ready to use packaged services. 

## Lab Environment 

The lab focuses on deploying OpenStack on a single machine to simplify networking and hardware needs. We'll install several core OpenStack services needed for a basic cloud platform.

- Compute Service
- Block Storage Service
- Image Service
- Identity Service
- Networking Service
- Object Storage Service
- Web Dashboard

These services provide virtual machines, networking, authentication, storage, and a web interface for management.

## System Requirements

Start simple and expand resources if you want to run more virtual machines.

- Clean Linux OS installation
- Minimum 16GB RAM recommended
- Minimum 20GB disk space
- 64 Bit CPU with virtualization support

While 16GB RAM is recommended, a small lab can run with about 4GB to 6GB RAM but with limited performance. A few notes:

- Increase disk space if you plan to run multiple virtual machines
- The CPU must support hardware virtualization
- Enable virtualization in BIOS before installation