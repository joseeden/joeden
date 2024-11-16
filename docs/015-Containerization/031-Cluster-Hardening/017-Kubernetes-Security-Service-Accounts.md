---
title: "Service Accounts"
description: "Service Accounts"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 17
last_update:
  date: 7/7/2022
---



## Overview

Service accounts provide identities for Pods in a Kubernetes cluster. Unlike user accounts, which are for human use and managed externally, service accounts are designed for Pods to authenticate and interact with the cluster.

- **User accounts**: For humans
- **Service accounts**: For machines (Pods)
- **Authentication**: Used for Pod authentication
- **RBAC**: Works with role-based access control
- **Image pull secrets**: Stores credentials for private image registries

Each namespace has a **default** service account, which has no additional permissions.

For more details, visit the [Service Accounts page](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/).

## Creating Service Accounts 

To create a service account named **sample-sa** through kubectl:

```bash
kubectl create serviceaccount sample-sa 
```

<div class='img-center'>

![](/img/docs/k8sk8s-security-create-sa-sample-sa.png)

</div>


Similarly, we can also create the service account using a YAML file. 

```bash
## sample-sa.yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: sample-sa
```

And then apply:

```bash
kubectl apply -f sample-sa.yml 
```

To associate a Pod with this service account:

```bash
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  serviceAccountName: sample-sa
```


## Default Service Accounts 

Every namespace automatically creates a **default** service account. This service account is associated with each Pod created in that namespace.

<div class='img-center'>

![](/img/docs/k8sk8s-security-default-svc-account-created-every-namespace.png)

</div>

Whenever a pod is created, the default service account and its created token are automatically mounted to that pod as a volume mount.

<div class='img-center'>

![](/img/docs/k8sdefault-svc-accounts-auto-mounted.png)

</div>



## Tokens 

When a service account is created, it does the following:

- Creates the service account
- Generates a token
- Creates a secret with the token
- Links the secret to the service account

This token can then be used as an authentication bearer token when making REST calls to the Kubernetes API.

Key points about the JWT (token):

- No expiration (in Kubernetes <1.24)
- Not audience-bound
- Not object-bound

## Kubernetes v.1.24 Update: Token Expiry 

Starting with Kubernetes 1.24, tokens are no longer auto-generated. Tokens must be created separately:

<div class='img-center'>

![](/img/docs/k8sk8s-security-update-124.png)

</div>

To create the token:

```bash
kubectl create token sample-sa 
```

This creates a separate secret (token) that needs to be associated with the Pod.

<div class='img-center'>

![](/img/docs/k8sk8s-security-create-separate-token.png)

</div>

## Kubernetes v.1.24 Update - Creating Non-expiring Tokens

To create non-expiring tokens, create a secret and define the service account name in annotations:

```yaml 
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: mysecret
  annotations:
    kubernetes.io/service-account.name: myserviceaccount
```





 

 

