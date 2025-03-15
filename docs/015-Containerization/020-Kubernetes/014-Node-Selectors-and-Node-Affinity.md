---
title: "nodeSelectors and nodeAffinity"
description: "nodeSelectors and nodeAffinity"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 14
last_update:
  date: 4/7/2022
---


## nodeSelector 

A `nodeSelector` is used to attract Pods to specific nodes based on labels. Unlike taints, which repel Pods, a nodeSelector filters nodes by their labels, and only the nodes with matching labels will be selected for Pod scheduling.

For example, if a label is set on a node, only Pods with a matching label will be scheduled on that node.

## nodeAffinity 

`nodeAffinity` is another way to attract Pods to certain nodes, offering more flexibility than `nodeSelector`. It allows Pods to be scheduled on nodes that meet specific conditions using **Supported Operators**:

- `In`
- `NotIn`
- `Exists`
- `DoesNotExist`
- `Gt`
- `Lt`

There are three types of node affinity:

- **requiredDuringSchedulingIgnoredDuringExecution**: 
  - Scheduler places Pod only on a node matching the affinity rule.  
  - Similar to `nodeSelector` but more complex.

- **preferredDuringSchedulingIgnoredDuringExecution**: 
  - Scheduler prefers a node matching the rule.  
  - Pod can still be scheduled on any available node.

- **requiredDuringSchedulingIgnoredDuringExecution** (introduced recently): 
  - Evicts running Pods if the node no longer matches the affinity rule.

## Affinity Behavior

Affinity behavior depends on when the affinity rules are evaluated:

- `DuringScheduling`: The Pod is being scheduled (first-time placement).
- `DuringExecution`: The Pod is already running and a change occurs that could affect node affinity.

| Type | DuringScheduling | DuringExecution |
|------|------------------|-----------------|
| 1    | Required         | Ignored         |
| 2    | Preferred        | Ignored         |
| 3    | Required         | Required        |

`IgnoredDuringExecution` means that once a Pod is scheduled, changes to node affinity won't affect its running state.
 

## Sample Lab: Using required node affinity

Create a Kubernetes cluster in Amazon EKS and use node affinity to schedule Pods based on node labels.

#### Step 1: Create the Cluster

Use the following manifest to create the cluster:

```bash title="eksops.yml"
---
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
    version: "1.23"
    name: eksops
    region: ap-southeast-1
nodeGroups:
    -   name: ng-dover
        instanceType: t3.large
        minSize: 0
        maxSize: 5
        desiredCapacity: 3
        ssh:
            publicKeyName: "k8s-kp"
```

Create the cluster with the command:

```bash
kubectl apply -f eksops.yml
```

Check the nodes:

```bash
kubectl get nodes
```     

Example output: 

```bash             
NAME                STATUS   ROLES    AGE   VERSION
ip-192-168-11-247   Ready    <none>   8h    v1.23.13-eks-fb459a0
ip-192-168-56-187   Ready    <none>   8h    v1.23.13-eks-fb459a0
ip-192-168-81-3     Ready    <none>   8h    v1.23.13-eks-fb459a0
```

#### Step 2: Label the First Node

Add the `disktype=ssd` label to the first node:

```bash
kubectl label nodes ip-192-168-11-247 disktype=ssd
```

Verify the label:

```bash
kubectl get nodes --show-labels | grep ssd
```

Example output:

```bash     
ip-192-168-11-247   Ready    <none>   8h    v1.23.13-eks-fb459a0   ....disktype=ssd...
```

#### Step 3: Create a Pod with Required Node Affinity

Use the following manifest to create a Pod with `requiredDuringSchedulingIgnoredDuringExecution` node affinity. This will schedule the Pod only on a node with the `disktype=ssd` label.

```bash
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd            
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
```

Apply the manifest:

```bash
kubectl apply -f https://k8s.io/examples/pods/pod-nginx-required-affinity.yaml
```

#### Step 4: Verify the Pod

The Pod will be scheduled on the node with the matching label (`disktype=ssd`), which in this case is `ip-192-168-11-247`.

```bash
kubectl get pods -o wide
```

Example output: 
    
```bash 
NAME    READY   STATUS    RESTARTS   AGE   IP              NODE                                                NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          3s    192.168.8.176   ip-192-168-11-247   <none>           <none>
```

#### Step 5: Delete the Pod

To delete the Pod, run:

```bash
kubectl delete -f https://k8s.io/examples/pods/pod-nginx-required-affinity.yaml
```

## Sample Lab: Using preferred node affinity

In this example, use `preferredDuringSchedulingIgnoredDuringExecution` node affinity to launch a Pod that prefers nodes with the `disktype=ssd` label.

This is similar to required affinity, but with the added option to specify a weight for each preference. The scheduler considers this weight when making scheduling decisions.


```bash
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd          
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent 
```

Apply the manifest:

```bash
kubectl apply -f https://k8s.io/examples/pods/pod-nginx-preferred-affinity.yaml
```


 

 
