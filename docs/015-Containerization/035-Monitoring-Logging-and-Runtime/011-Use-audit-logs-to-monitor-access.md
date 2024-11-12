---
title: "Audit Logs to Monitor Access"
description: "Mutable and Immutable Infrastructure"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Auditing 

Kubernetes auditing is managed by the kube-apiserver and must be enabled. The audit process tracks each request through several stages to log activity, identify errors, and monitor system interactions.

**Request Flow**

1. The request is sent to kube-apiserver.
2. **RequestReceived**: logs the event upon receipt, regardless of approval.
3. **RequestStarted**: for requests taking longer to complete.
4. **RequestComplete**: generates a log with response details once completed.
5. **Panic**: logs any invalid requests or errors.

Logging every event generates extensive logs, so we can create a **Policy** object to specify conditions for logging.


## Enabling Auditing in Kubernetes

A Policy object defines kube-apiserver rules to log specific events.

```yaml
## /etc/kubernetes/audit-policy.yaml 

apiVersion: audit.k8s.io/v1
kind: Policy
omitStages: ["RequestReceived"]
metadata:
  name: sample-policy
rules:
  - namespaces: ["prod-namespace"]
    verb: ["delete"]               
    resources: 
    - groups: "" 
      resources: ["pods"]
      resourceNames: ["webapp-pod"]
    level: RequestResponse   

  - level: Metadata 
    resources:
    - groups: "" 
      resources: ["secrets"]
```

To activate auditing, specify the audit and policy files in the kube-apiserver manifest.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - name: kube-apiserver
    image: k8s.gcr.io/kube-apiserver:v1.21.3
    command:
    - kube-apiserver
    - --advertise-address=0.0.0.0
    - --allow-privileged=true
    - --authorization-mode=Node,RBAC
    ...
    - --audit-log-path=/var/log/k8s-audit.log
    - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
    - --audit-log-maxage=10
    - --audit-log-maxbackup=5
    - --audit-log-maxsize=100
```

For kube-apiserver running as a service, add the files in the service unit configuration:

```bash
ExecStart=/usr/local/bin/kube-apiserver 
  --advertise-address=0.0.0.0 
  --allow-privileged=true 
  --authorization-mode=Node,RBAC 
  ...
  --audit-log-path=/var/log/k8s-audit.log
  --audit-policy-file=/etc/kubernetes/audit-policy.yaml 
  --audit-log-maxage=10  
  --audit-log-maxbackup=5  
  --audit-log-maxsize=100
```

## Logging Levels

Kubernetes logging levels help manage audit log detail, focusing on relevant data while conserving storage.

- **None**  
  - No logging for the event.

- **Metadata**  
  - Logs request method, URL, and resource type  
  - Does not log request or response body  

- **Request**  
  - Logs metadata and request body  
  - Does not log response body  

- **RequestResponse**  
  - Logs metadata, request, and response bodies 
