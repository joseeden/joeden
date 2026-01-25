---
title: "Static Pods"
description: "Pods managed directly by the kubelet"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 29
last_update:
  date: 4/7/2022
---


## Overview 

Static Pods are managed by the node's kubelet, not the Kubernetes API server. They are always scheduled by the kubelet, bypassing the Kubernetes scheduler.

- Used for critical components like the API server and etcd.
- They are defined in manifests and monitored by the kubelet.

## Static Pod Manifests

A **Static Pod Manifest** defines the configuration of a Pod. These manifests are created by `kubeadm init` for essential cluster components like:

- etcd
- API server
- Controller manager
- Scheduler

The **kubelet** monitors the manifest directory and starts Pods as defined. This allows core components to start without the cluster running.

By default, static pod manifests are stored in:

```bash
/etc/kubernetes/manifests
```

The kubelet checks this directory periodically. If files are updated, it recreates the Pods. If a file is removed, the associated Pod is also deleted.


## Setting a Directory for the Static Pod Manifests

To use a different directory, edit the **kubelet.service** file and specify the *pod-manifest-path* in **ExecStart**:

```bash
# /etc/systemd/system/kubelet.service
.....
ExecStart=/usr/bin/kubelet \
    --kubeconfig=/var/lib/kubelet/kubeconfig \
    --pod-manifest-path=/etc/kubernetes/manifests
```

You can also configure the kubelet to use a custom **kubeconfig.yaml** file to specify the **staticPodPath**:

```bash
# /etc/systemd/system/kubelet.service
.....
ExecStart=/usr/bin/kubelet \
    --kubeconfig=/var/lib/kubelet/kubeconfig \
    --config=kubeconfig.yaml
```

In the kubeconfig.yaml, you can define the static pod manifest path: 

```yaml
# kubeconfig.yaml
    
staticPodPath: /etc/kubernetes/manifests
```



 

 
