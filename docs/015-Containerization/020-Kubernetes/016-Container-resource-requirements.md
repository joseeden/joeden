---
title: "Container Resource Requirements"
description: "Container Resource Requirements"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 16
last_update:
  date: 7/7/2022
---



## Static Pods 

Static pods are pods that are managed directly by the nodes kubelet and not through the Kubernetes' API server. Unlike regular pods, they are not scheduled by the Kubernetes scheduler but are always placed on the node by the kubelet.

To learn more, check out [Static Pods.](/docs/015-Containerization/020-Kubernetes/009-Static-Pods.md)

## Resource Requirements

We can define resource requirements for containers in the Pod spec, specifying:

- CPU (in cores)
- Memory (in bytes)

While optional, setting these requests and limits helps the Kubernetes scheduler make better decisions when placing Pods. The scheduler ensures a Pod is scheduled only on nodes with enough available resources to meet the Pod's **Resource Requests**, which are the sum of all containers' resource requests.

On the other hand, **Limits** help prevent resource contention and improve performance predictability.

To view more details, use the `explain` command:
```bash
kubectl explain pod.spec.containers.resources
```      

Example output: 

```bash      
KIND:     Pod
VERSION:  v1

RESOURCE: resources <Object>

DESCRIPTION:
     Compute Resources required by this container. Cannot be updated. More info:
     https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

     ResourceRequirements describes the compute resource requirements.

FIELDS:
   limits       <map[string]string>
     Limits describes the maximum amount of compute resources allowed. More
     info:
     https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

   requests     <map[string]string>
     Requests describes the minimum amount of compute resources required. If
     Requests is omitted for a container, it defaults to Limits if that is
     explicitly specified, otherwise to an implementation-defined value. More
     info:
     https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
 
```




 

 
