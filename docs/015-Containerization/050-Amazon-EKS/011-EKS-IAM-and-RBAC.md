---
title: "IAM and RBAC"
description: "Authentication and Authorization in EKS"
tags: 
    - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Overview  

Kubernetes integrates seamlessly with IAM for authentication and RBAC for authorization:  

- IAM handles authentication.  
- Kubernetes RBAC manages authorization.  

IAM entities can be directly assigned RBAC permissions to access Kubernetes clusters.  

<div class='img-center'>  

![](/img/docs/eks-iam-rbac.drawio.png)

</div>  

## Worker Nodes  

Worker nodes join the cluster with an IAM role mapped to RBAC groups, allowing them to connect:  

- `system:bootstrappers` for initial setup.  
- `system:nodes` for ongoing operations.  

To edit the configuration, modify the `aws-auth` ConfigMap:  

```bash  
kubectl edit -n kube-system configmap/aws-auth  
```  

<div class='img-center'>  

![](/img/docs/readmeconfigmapphoto.png)

</div>  

## IAM Users  

Examples of IAM roles and permissions:  

- **Cluster admin**: Full administrative privileges.  
- **Read-only user**: Restricted to specific namespaces.  

For more information, please see [Using RBAC Authorization.](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).



 

  