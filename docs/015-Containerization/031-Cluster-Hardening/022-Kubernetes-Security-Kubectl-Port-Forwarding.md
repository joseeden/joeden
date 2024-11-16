---
title: "Proxy and Port Forwarding"
description: "Kubectl Proxy and Port Forwarding"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 22
last_update:
  date: 7/7/2022
---


## kubectl  

`kubectl` is the command-line tool for managing Kubernetes clusters, enabling tasks like deploying apps, inspecting resources, and managing configurations.  

```bash
kubectl get nodes  
kubectl get pods  
```  
It uses the kubeconfig file for authentication, so no explicit credentials are needed.

## Curl to Port 6443  

You can use `curl` to interact with the Kubernetes API on port 6443. Without proper keys and certificates, you’ll encounter a "forbidden" error. 

<div class='img-center'>

![](/img/docs/k8s-security-curl-to-port-6443-forbidden.png)

</div>

To authenticate, pass the required credentials.  

<div class='img-center'>

![](/img/docs/k8s-security-curl-to-port-6443-with-parameters.png)

</div>


## kubectl Proxy  

`kubectl proxy` creates a local proxy server to securely interact with the API server. It runs on port 8001 by default, using the keys and certificates in the kubeconfig file for authentication.

<div class='img-center'>

![](/img/docs/kubectl-proxy-uses-port-8001.png)

</div>

## Kubectl Port Forward  

`kubectl port-forward` forwards traffic from your local machine to a pod in the cluster. Example:  

```bash
kubectl port-forward <pod-name> [LOCAL_PORT:]REMOTE_PORT
```  

You can access services or pods without exposing them publicly, such as forwarding local port 28080 to a pod's port 80.

<div class='img-center'>

![](/img/docs/kubectl-port-forwarding.png)

</div>