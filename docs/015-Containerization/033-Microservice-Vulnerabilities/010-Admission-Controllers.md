---
title: "Admission Controllers"
description: "Kubernetes plugins enforcing API policies"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 10
last_update:
  date: 7/7/2022
---

## Admission Controllers  

In Kubernetes, admission controllers are plugins that intercept API requests after authentication and authorization but before they are persisted in the cluster. They enforce custom policies and logic to accept or reject requests.  

<div class='img-center'>

![](/img/docs/admission-controollers-with-types.png)

</div>


## Request Flow  

Admission controllers enforce policies during the Kubernetes API request process:  

- Requests are sent to the Kubernetes API server.  
- They go through authentication and authorization checks.  
- They are then reviewed before finalization.  
- Policies are applied before saving changes in the cluster.  

## Types of Admission Controllers  

Kubernetes provides several admission controllers for specific use cases:  

- **NamespaceLifecycle**  
  - Manages namespace lifecycle policies.  
  - Handles namespace creation rules and deletion.  

- **ResourceQuota**  
  - Enforces resource usage limits.  
  - Prevents resource over-allocation.  

- **PodSecurityPolicy**  
  - Applies Pod security rules.  
  - Validates privilege levels and system permissions.  

- **MutatingAdmissionWebhook**  
  - Modifies resources via webhooks.  
  - Customizes resource configurations.  
  - Supports dynamic updates.  

- **ValidatingAdmissionWebhook**  
  - Validates resources using webhooks.  
  - Rejects invalid requests.  
  - Ensures compliance with policies.  


## Enabling Admission Controllers 

To view enabled admission controllers:

```bash
kube-apiserver -h | grep enable-admission-plugins  
```

<div class='img-center'>

![](/img/docs/view-enabled-admission-controllers.png)

</div>


To enable an admission controller, add it onto the kube-apiserver.service.

```bash
## /etc/kubernetes/manifests/kube-apiserver.yaml 
spec:
  containers:
    - command:
        - kube-apiserver
        - ...
        - --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
```

To disable an admission controller, add the `disable` parameter:

```bash
## /etc/kubernetes/manifests/kube-apiserver.yaml 
spec:
  containers:
    - command:
        - kube-apiserver
        - ...
        - --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision  
        - --disable-admission-plugins=DefaultStorageClass
```
