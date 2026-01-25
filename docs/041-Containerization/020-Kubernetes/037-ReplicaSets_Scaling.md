---
title: "ReplicaSets and Scaling"
description: "ReplicaSets and Scaling"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 37
last_update:
  date: 4/7/2022
---

## ReplicaSets

A **ReplicaSet** defines how many replicas (identical Pods) should run in the system at any time to ensure availability. It keeps the specified number of replicas stable.

We typically don’t create ReplicaSets directly. Instead, we create **Deployments** and specify the number of replicas there.

<div class='img-center'>

![](/img/docs//deploy-replset-pods.png)

</div>

To check or modify a deployment:

```bash
kubectl edit deployment -n kube-system
```

To view running ReplicaSets:

```bash
kubectl get rs -n kube-system
```

For more information, please see [ReplicaSets in Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).



## Scaling

Scaling in Kubernetes is managed by the **Replication Controller**.

- Ensures the specified number of replicas stay running
- Replaces Pods if they fail, are deleted, or terminated
- Useful even with one Pod to ensure it is always active


 

 
