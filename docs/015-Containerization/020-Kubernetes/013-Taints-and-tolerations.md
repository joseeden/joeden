---
title: "Taints and Tolerations"
description: "Influencing the scheduling of Pods"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 13
last_update:
  date: 4/7/2022
---


## Overview

Taints and tolerations in Kubernetes help control where Pods can be scheduled in a cluster.

- **Taints** are applied to nodes to repel certain Pods.
- **Tolerations** are applied to Pods, allows them to be scheduled on tainted nodes.

When nodes are tainted, only Pods with matching tolerations can run on them, ensuring Pods are placed only on compatible nodes.

## System Pods

Even if no custom applications are deployed ina Kubernetes cluster, system Pods will still run in the cluster. For example, the `kube-proxy` DaemonSet runs a Pod on each node to manage network traffic. Since DaemonSets run a Pod on every node, if there are three nodes, there will also be three `kube-proxy` Pods:

```bash
kubectl get pods -A
```

Example output:

```bash
NAMESPACE     NAME                       READY   STATUS    RESTARTS   AGE
kube-system   aws-node-fbd7z             1/1     Running   0          6h40m
kube-system   aws-node-kg7tn             1/1     Running   0          6h40m
kube-system   aws-node-kqxqn             1/1     Running   0          6h40m
kube-system   coredns-6d8cc4bb5d-2xkxp   1/1     Running   0          6h51m
kube-system   coredns-6d8cc4bb5d-6wpbx   1/1     Running   0          6h51m
kube-system   kube-proxy-cb687           1/1     Running   0          6h40m
kube-system   kube-proxy-dt5xd           1/1     Running   0          6h40m
kube-system   kube-proxy-h9s8l           1/1     Running   0          6h40m 
```    

To view tolerations for a specific `kube-proxy` Pod, you can use:

```bash
kubectl get pod kube-proxy-cb687 -n kube-system -o yaml
```

The `tolerations` section in the Pod's YAML shows settings that allow the Pod to run on nodes with certain conditions, like disk pressure or memory constraints.


```yaml
    tolerations:
    - operator: Exists
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
    - effect: NoExecute
      key: node.kubernetes.io/unreachable
      operator: Exists
    - effect: NoSchedule
      key: node.kubernetes.io/disk-pressure
      operator: Exists
    - effect: NoSchedule
      key: node.kubernetes.io/memory-pressure
      operator: Exists
    - effect: NoSchedule
      key: node.kubernetes.io/pid-pressure
      operator: Exists
    - effect: NoSchedule
      key: node.kubernetes.io/unschedulable
      operator: Exists
    - effect: NoSchedule
      key: node.kubernetes.io/network-unavailable
      operator: Exists 
```

To learn more, check out [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/).



## Tainting the Node 

To reserve a node for high-priority workloads, add a **high-priority** taint. This restricts the node so only Pods with a matching toleration can be scheduled on it.

1. List the nodes:

    ```bash
    kubectl get nodes
    ```

2. Apply a taint:

    ```bash
    kubectl taint node <node-name> priority=high:NoSchedule
    ```

There are three taint effects:

Taint effect        | Description |
--------------------|-------------|
`NoSchedule`       | Prevents Pods from being scheduled on the node.   
`PreferNoSchedule` | Tries to avoid scheduling Pods on the node, but not guaranteed. 
`NoExecute`        | Evicts existing Pods and prevents new Pods from being scheduled unless they tolerate the taint.

Verify the taint with:

```bash
kubectl describe <node-name> | grep Taint
```

Tainted nodes will display output like this:

```bash 
Taints:             priority=high:NoSchedule
```

Nodes without any taints will show:

```bash 
Taints:             <none>
```


## Example: Testing the Taint

To see the effect of a taint, create a test namespace and deploy an NGINX app with multiple replicas:

```bash
kubectl create namespace testing
kubectl create deployment my-deployment -n testing --image=nginx --replicas=4
```

Check the nodes the Pods are running on:

```bash
kubectl get pods -n testing -o wide
```

The Pods should only be scheduled on nodes without the **high-priority** taint.


## Example: Removing the Taint 

To remove the taint, delete the test deployment and then run:

```bash
kubectl delete deployment -n testing my-deployment 
kubectl taint node <node-name> priority=high:NoSchedule 
```

Check the taint:

```bash
kubectl describe node<node-name> | grep Taint
```

It should return:

```bash
Taints:             <none> 
```


 

 
