---
title: "Persistent Volumes"
description: "Persistent Volumes"
tags: 
 
  - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 16
last_update:
  date: 7/7/2022
---


## Deployment vs. StatefulSet

- **Deployments with Persistent Volumes**  

  When using EBS volumes with deployments, the volume must be attached to a specific node. As a result, Pods can only run on that node to access the volume.

  <div class='img-center'>
  
  ![](/img/docs/persistenvolumes-deployments.png)

  </div>

- **StatefulSet with Persistent Volumes**  

  StatefulSets are ideal for applications like Kafka, Zookeeper, and Cassandra. They allow multiple Pods to run across different nodes, with each Pod having its own attached persistent volume.

  <div class='img-center'>
  
  ![](/img/docs/persistenvolumes-statefulsets.png)

  </div>


## Amazon EBS Volumes 

Key points about using EBS volumes for persistent storage in EKS:

- EBS volumes are tied to a specific Availability Zone (AZ).
- Pods must start in the same AZ as the EBS volume.
- Pods in the same AZ can share the volume, but not across nodes.
- Each AZ requires its own EBS volume.

For multi-AZ storage, use **Amazon EFS**, which supports cross-AZ access.

<div class='img-center'>

![](/img/docs/lab57-ebs-efs.png)

</div>

## Amazon EFS

[Amazon EFS](https://aws.amazon.com/efs/) is a managed file system that can be shared across multiple EC2 instances and availability zones:

- Spans across availability zones (AZs)
- Instances in different AZs can share the same EFS
- Highly scalable, available, but is very expensive
- You pay per amount of storage you use 

<div class='img-center'>

![](/img/docs/what-is-efs-file-system.png)  

</div>


## EFS for Kubernetes

Once we use EFS as the persistent storage for our cluster, we can no launch the Pods in any of the availability zones in a region.

- EFS is mounted onto the worker nodes
- instances can start sharing state config files



 

  