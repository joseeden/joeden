---
title: "Pod Operations"
description: "Container Management Challenges"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 4
last_update:
  date: 7/7/2022
---


## Overview

When deploying a cluster with a ReplicaSet of 5 using kubectl, the steps are as follows:

1. The request is sent from kubectl to the API Server.
2. The API Server logs the info to the cluster store.
3. The Controller Manager spins up 5 Pods per the ReplicaSet, then sends this to the Scheduler.
4. The Scheduler assigns the Pods to two Nodes for deployment.
5. Each Node’s kubelet queries the API Server for updates.
6. Node 1 starts three Pods, and Node 2 starts the remaining two.
7. The Controller Manager tracks the state of the replicas.

<div class='img-center'>
![](/img/docs/k8sscenario1.png)
</div>


## One Node Fails

If Node 2 fails:

1. Node 2 stops responding, and the Controller Manager identifies a state mismatch.
2. The Controller Manager requests rescheduling from the Scheduler.
3. The Scheduler assigns the two down Pods to Node 1.
4. Node 1’s kubelet detects the state change and starts the additional Pods.

<div class='img-center'>
![](/img/docs/node2goesdownk8sscenario.png)
</div>

 

 
