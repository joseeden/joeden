---
title: "Network Policy"
description: "Network Policy"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 24
last_update:
  date: 3/11/2022
---


## Network Policies (netpol)

In Kubernetes, **Network Policies** control communication between pods, enforcing security and isolation by defining rules for traffic flow.  

- Ensure controlled access between pods and services.  
- Apply at pod and namespace levels for granular management.  

## Key Components  

1. **Selector Labels**  
   - Identify pods using label selectors to apply rules.  

2. **Ingress & Egress Rules**  
   - **Ingress**: Controls incoming traffic to pods.  
   - **Egress**: Controls outgoing traffic from pods.  

3. **Default Deny**  
   - Pod communication is denied by default unless explicitly allowed.  

4. **Namespaces**  
   - Policies apply within specific namespaces.
   - Affects only pods in that scope.  

## Sample Scenario 

Consider a Kubernetes cluster with a frontend application and a backend database. To enhance security, you want to ensure only the frontend pods can communicate with the backend database, blocking access from all other pods.

To restrict access so only frontend pods can communicate with backend pods:  

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: my-namespace
spec:
  podSelector:
    matchLabels:
      app: frontend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: backend
```

Apply the policy:  

```bash
kubectl apply -f network-policy.yaml
```

## Network Policy Support

Network Policies are enforced by the network solution implemented on the Kubernetes cluster. 

**Supports Network Policies:**  
- Kube-router  
- Calico  
- Romana  
- Weave Net  

**Does Not Support Network Policies:**  
- Flannel  


 

 
