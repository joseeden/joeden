---
title: "Cluster AutoScaler"
description: "Cluster AutoScaler in EKS"
tags: 
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 13
last_update:
  date: 7/7/2022
---



## Overview

The Cluster AutoScaler automatically adjusts the number of nodes in a node group based on demand.

- Not AWS-specific; applies to all Kubernetes environments.
- Scales based on resource availability or usage.
- Can scale out if nodes are under-utilized.
- Supports both on-demand and spot instances.
- Ensures similar RAM and CPU across nodes.

For stateful workloads:

- Use a node group in a single availability zone (AZ).
- EBS volumes cannot be shared across AZs.

For stateless workloads:

- Use a node group across multiple availability zones (AZs).

For more information, visit the [Github repository](https://github.com/kubernetes/autoscaler).




 

  