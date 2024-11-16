---
title: "Authorization Mechanisms"
description: "Authorization Mechanisms"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 15
last_update:
  date: 7/7/2022
---

## Authorization

Once the account gained accessed to the cluster, the next thing to look at is what actions they can perform. This can be defined by the following authorization mechanisms

- Node Authorization 
- RBAC Authorization 
- ABAC Authorization 
- Webhook Mode

When you send requests to Kubernetes, you are first authenticated, and then Kubernetes determines if you are authorized to complete the request. Kubernetes supports several [Authorization modules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#authorization-modules).

## Authorization Modes 

### Node Authorization

Node authorization controls access for kubelets on worker nodes within the cluster. It helps secure communication between nodes and the control plane.

- **Node Authorizer** verifies which nodes can register to API server.
- Ensures only authorized nodes can interact with the control plane.

**Registration Process:**

- When a node joins, it sends a request to the API server.
- Node Authorizer checks if node is allowed based on policies.
- Policies can be based on node identity.


### ABAC Authorization (Attribute-Based Access Control)

ABAC allows access based on attributes and is used for external API access.

- Policies are defined in a file.
- Allowed actions are based on user attributes.
- Less common than RBAC due to its global scope.

Every time you need to make a change, you need to manually edit the policy file and restart the kube-apiserver. This makes ABAC more difficult to manage.

<div class='img-center'>

![](/img/docs/abac-screenshot.png)

</div>

Below is a sample ABAC policy file. 

```yaml 
# Sample ABAC Policy File

# Define rules for access control
# Each rule specifies conditions for allowing or denying an action

# Allow all users to list pods in the 'default' namespace
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "*",
    "namespace": "default",
    "resource": "pods",
    "apiGroup": "",
    "readonly": true
  }
}

# Allow 'admin' user to perform any action across all namespaces
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "admin",
    "namespace": "*",
    "resource": "*",
    "apiGroup": "*",
    "readonly": false
  }
}

# Deny 'viewer' user the ability to delete pods in any namespace
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "viewer",
    "namespace": "*",
    "resource": "pods",
    "apiGroup": "",
    "readonly": false,
    "verbs": ["delete"]
  }
}

# Allow 'editor' user to create and update deployments in the 'production' namespace
{
  "apiVersion": "abac.authorization.kubernetes.io/v1beta1",
  "kind": "Policy",
  "spec": {
    "user": "editor",
    "namespace": "production",
    "resource": "deployments",
    "apiGroup": "apps",
    "readonly": false,
    "verbs": ["create", "update"]
  }
}  
```

### RBAC Authorization (Role-Based Access Control)

RBAC assigns roles to users or service accounts with specific permissions.

- Roles define allowed actions within a namespace.
- `RoleBindings` and `ClusterRoleBindings` associate roles with users or groups.

Role-based access controls provide a more standard approach to managing access within the Kubernetes cluster.

<div class='img-center'>

![](/img/docs/rbac-k8s-screenshot.png)

</div>

### Webhook Mode

Webhook mode allows external systems to enforce custom authorization policies.

- Integrates third-party services like Open Policy Agent (OPA).
- External API is called to decide if a request is allowed or denied.

For more information, visit [Open Policy Agent](https://www.openpolicyagent.org/).

<div class='img-center'>

![](/img/docs/k8s-opa-agent.png)

</div>


### AlwaysAllow

This allows all request without performing any authorization checks. 

### AlwaysDeny 

This mode denies all requests.


## Setting the Authorization Mode 

The authorization modes are configured in the kube-apiserver.

- If no mode is set, **AlwaysAllow** is the default.
- Multiple modes can be used in the order they are specified.

<div class='img-center'>

![](/img/docs/setting-the-authorization-mode.png)

</div>

As an example, if the modes are specified in this order:

```bash
--authorization-mode=Node,RBAC,Webhook
```

Then any API requests will go through Node authorizer first, then RBAC, then Webhook. 

- If one mode denies, the request moves to the next.
- Once a mode approves, no further checks are made.
- If none approve, the request is denied.


 

 

