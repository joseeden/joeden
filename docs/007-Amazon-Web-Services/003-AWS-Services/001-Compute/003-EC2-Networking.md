---
title: "EC2 Networking"
description: "ENIs, ENAs, and the sorts"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 3
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## IP Addresses 

EC2 instances are not aware of their public IP address. It only knows it's private IP address. On the other hand, the Internet Gateway is the only component that knows all of the public IP addresses of instances.

- **Public IP address**

  - Lost when the instance is stopped
  - Used in Public Subnets
  - No charge
  - Associated with a private IP address on the Instance

- **Private address**

  - Retained when the instance is stopped
  - Used in Public and Private Subnets

- **Elastic IP address**

  - Static Public IP address
  - You are charged if not used
  - Associated with a private IP address on the instance


## Enhanced Networking 

Uses single root I/O virtualization (SR-IOV) to provide high-performance networking capabilities on supported instance types.

- More Packets per Second >> PPS
- Lower Latency
- BGP Routing

## Elastic Network Interface (ENI) 

ENIs are logical networking components in a VPC that represents a virtual network card.

- Can include attributes such as 
    - IP addresses
    - security groups
    - MAC address 
    - source/destination check flag
    - description 
- You can create and configure network interfaces in your account and attach them to instances in your VPC
- eth0 is the primary network interface and cannot be moved or detached 
- an ENI is bound to an AZ and you can specify which subnet/AZ you want the ENI to be added in. 

## Elastic Network Adapter (ENA)

Used for enhanced networking.

- Provides higher bandwidth, higher packet-per-second (PPS) performance and lower latency 
- Must launch an HVM AMI 
- Available for certain instance types within a VPC 

## Elastic Fabric Adapter (EFA)

An EFA is similar to ENA but with added capabilities.

- EFA enables customers to run applications requiring higher levels of inter-node communications at scale on AWS 
- High Performance Computing (HPC) applications using the Message Passing Interface (MPI) and Machine Learning (ML) applications using NVIDIA Collective Communications Library (NCCL) can scale to thousands of CPUs or GPUs.

## ENI vs ENA vs EFA 

- **When to use ENI:**

  - This is the basic adapter type for when you don't have any high-performance requirements. 
  - Can use with all instance types.  

- **When to use ENA:**

  - Good for use cases that require higher bandwidth and lower inter-instance latency. 
  - Supported for limited instance types (HVM only).  

- **When to use EFA:**

  - High Performance Computing. 
  - MPL and ML use cases.
  - Tightly coupled applications. 
  - Can use with all instance types.


  
