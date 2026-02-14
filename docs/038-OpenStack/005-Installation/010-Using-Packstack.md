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

Packstack is an automated installer that uses Puppet scripts to deploy OpenStack quickly on a single machine or small lab environment. The core OpenStack services are: 

- Compute Service
- Block Storage Service
- Image Service
- Identity Service
- Networking Service
- Object Storage Service
- Web Dashboard

Summary of steps:

1. Prepare the system
2. Install required packages
3. Run Packstack installer
4. Configure networking and external access

## System Requirements

Basic requirements: 

- Minimum 16GB RAM recommended
- Minimum 20GB disk space
- 64 Bit CPU with virtualization support

:::info 

While 16GB RAM is recommended, a small lab can run with about 4GB to 6GB RAM but with limited performance. 

::: 

A few notes:

- Increase disk space if you plan to run multiple virtual machines
- The CPU must support hardware virtualization
- Enable virtualization in BIOS before installation

## Install VirtualBox 

The lab deploys OpenStack inside a virtual machine on VirtualBox. The VM uses CentOS 8 or AlmaLinux 8 as the operating system, which provides a stable base for the OpenStack installation.

For more information, please see [Setting up VirtualBox.](/docs/038-OpenStack/005-Installation/005-Setting-up-VirtualBox.md)