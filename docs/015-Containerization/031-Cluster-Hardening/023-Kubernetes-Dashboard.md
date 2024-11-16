---
title: "Kubernetes Dashboard"
description: ""
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 23
last_update:
  date: 7/7/2022
---


## Kubernetes Dashboard 

The **Kubernetes Dashboard** is a web-based UI for managing and troubleshooting Kubernetes clusters.  

- View workloads, Pods, Deployments, and other resources  
- Explore resources across namespaces  
- Manage Services, Nodes, and Storage  
- Display usage metrics (requires Heapster or similar monitoring tools)  
- Secure access via **HTTPS** and **Bearer tokens**  
- Granular access control through **RBAC**  

The dashboard runs in a Pod and includes:  
- A REST endpoint with SSL and authentication  
- Metrics add-ons like **Heapster** or **InfluxDB** for resource usage tracking  

To access the dashboard from your terminal, use:  

```bash  
kubectl proxy  
```  

For more information, please see [official Kubernetes Dashboard Github](https://github.com/kubernetes/dashboard) page.


## Access to the Kubernetes Dashboard 

By default, the Kubernetes Dashboard is exposed via **ClusterIP**, making it accessible only within the cluster. To access it externally:  

1. Use `kubectl proxy` and port forwarding.  
2. From a laptop or external device, launch a proxy for secure access.  

    <div class='img-center'>

   ![](/img/docs/k8s-security-kubernetes-dashboards.png)  

    </div>

## Changing Service Types  

### LoadBalancer (Not Recommended)

Exposing the dashboard via **LoadBalancer** makes it accessible outside the cluster but poses security risks.  

<div class='img-center'>

![](/img/docs/exposing-k8s-dashboard-via-loadbalancer-service-type.png)  

</div>

### NodePort

This exposes the Kubernetes Dashboard to a port in the nodes. This is a viable solution if you are sure that your cluster is secured.

<div class='img-center'>

![](/img/docs/exposing-k8s-dashboard-via-nodeport.png)  

</div>

### Auth Proxy

Configure an authentication proxy to validate requests and securely route traffic to the dashboard. For more information, please see [Oauth2 Proxy](https://geek-cookbook.funkypenguin.co.nz/recipes/kubernetes/oauth2-proxy/).  


## Logging In 

When we access the Kubernetes Dashboard, we are asked to provide a token or kubeconfig file. To provide the token, we must first create a user and then provide it role-based  permissions.

<div class='img-center'>

![](/img/docs/kubernetes-dashboard-login-page.png)

</div>

For more information, please see the [official Kubernetes Dashboard Github](https://github.com/kubernetes/dashboard) page.

## Resources 

- [Deploy and Access the Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

- [kubernetes/dashboard](https://github.com/kubernetes/dashboard)

- [Securing the k8s dashboard and beyond!](https://www.youtube.com/watch?v=od8TnIvuADg) 

- [On Securing the Kubernetes Dashboard](https://blog.heptio.com/on-securing-the-kubernetes-dashboard-16b09b1b7aca)

- [Creating sample user](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)





 

 
