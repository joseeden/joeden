---
title: "Pod Affinity"
description: "Container Management Challenges"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 15
last_update:
  date: 4/7/2022
---


## Overview

**Pod Affinity** is similar to Node Affinity, but instead of constraining nodes, it ensures that Pods are scheduled based on the labels of existing Pods running on those nodes. 

Key Differences:

- **Node Affinity**: Ensures Pods are placed on specific nodes.
- **Pod Affinity**: Ensures Pods are co-located on the same node as other Pods with matching labels.

Pod Affinity supports the same operators as Node Affinity:
    
- `In`
- `NotIn`
- `Exists`
- `DoesNotExist`
- `Gt`
- `Lt`

## Considerations

When using Pod Affinity, keep the following in mind:

- More computationally expensive than Node Affinity.
- Not recommended for large clusters.
- Pod labels are namespaced, just like Pods themselves.

After evaluating the conditions, the **topology key** is used to decide which node the Pod will be scheduled on. This key typically refers to physical domains such as data centers, regions, or server racks.


 

 
