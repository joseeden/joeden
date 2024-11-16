---
title: "Deployments"
description: "Deployments"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 18
last_update:
  date: 7/7/2022
---



## Overview 

A **Deployment** simplifies Pod management in Kubernetes, ensuring they meet the desired state. It handles scaling, updates, and rollbacks.

- Manages Pods' desired state
- Scales by creating replicas
- Adjusts state during changes
- Supports rolling updates with configurable behaviors


## Deployment Manifest

The Deployment manifest defines key components to manage Pod creation and updates:

- **replicas**: Specifies how many Pod replicas should be created
- **selector**: Uses label selectors to track Pods, ensuring the correct Pods are managed by the Deployment
- **template**: Defines the desired behavior of the Pods (similar to a Pod manifest)

Example Deployment Manifest:

```bash title="data-tier.yml"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: data-tier
  namespace: deployment
  labels:
    app: microservices
    tier: data
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: data
  template:
    metadata:
      labels:
        app: microservices
        tier: data
    spec:
      containers:
      - name: redis
        image: redis:latest
        imagePullPolicy: IfNotPresent
        ports:
          - containerPort: 6379  
```

To create the Deployment:

```bash
kubectl apply -f data-tier.yml
```

To view Deployment details, use the `describe` command:

```bash
kubectl describe deployments data-tier
```

Example output:

```bash
Name:                   data-tier
Namespace:              deployment
CreationTimestamp:      Thu, 5 Jul 2022 16:18:28 +0000
Labels:                 app=microservices
                        tier=data
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               tier=data
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
    Labels:  app=microservices
            tier=data
    Containers:
    redis:
    Image:        redis:latest
    Port:         6379/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:       <none>
    Volumes:        <none>
Conditions:
    Type           Status  Reason
    ----           ------  ------
    Available      True    MinimumReplicasAvailable
    Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   data-tier-d45bbd7dc (1/1 replicas created)
Events:
    Type    Reason             Age   From                   Message
    ----    ------             ----  ----                   -------
    Normal  ScalingReplicaSet  11s   deployment-controller  Scaled up replica set data-tier-d45bbd7dc to 1
```
    
Key highlights from the output:

- **StrategyType**: Defines the update method
  - **RollingUpdate**: Ensures incremental updates to Pods

- **RollingUpdateStrategy**: Controls the rolling update process
  - **max unavailable**: Limits unavailable Pods during updates
  - **max surge**: Limits Pods exceeding the desired count during updates

For more information, please see [Rollouts and Rollbacks.](/docs/015-Containerization/020-Kubernetes/019-Rollouts-and-Rollbacks.md)





 

 
