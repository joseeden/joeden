---
title: "Helm Package Manager"
description: "Helm Package Manager"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes, Helm]
sidebar_position: 10
last_update:
  date: 7/7/2022
---

## Pre-requisites 

- A basic understanding of Kubernetes
- Experience in deploying Kubernetes resources 

## Helm 

**Helm** is the Kubernetes package manager that simplifies package installation and manages dependencies. In a typical 3-tier architecture, each tier consists of a **Deployment**, **ConfigMap**, and **Service**, as shown below:

<div class='img-center'>

![](/img/docs/helm-typical-3tier-arch.png)

</div>

Before Helm, each of these components required running separate manifests:  

```bash
kubectl apply -f frontend-deployment.yml 
kubectl apply -f frontend-configmap.yml 
kubectl apply -f frontend-service.yml 

kubectl apply -f app-deployment.yml 
kubectl apply -f app-configmap.yml 
kubectl apply -f app-service.yml 

kubectl apply -f data-deployment.yml 
kubectl apply -f data-configmap.yml 
kubectl apply -f data-service.yml
```

This process can be tedious and raises questions like:

- How to parameterize?
- How to add application lifecycle hooks?
- How to manage versions of related resources?

This is where **Helm** helps. Helm uses **charts** (similar to Linux packages) to bundle all the necessary parts for a Kubernetes deployment. With Helm, you can deploy multiple resources with a single command.

**Benefits of Helm**:

- Simplifies deployments by running everything in one go
- Tracks versioned history of changes
- Easy to create and share charts
- Charts can be stored in a repository

To learn more, visit the official [Helm website](https://helm.sh/).

## Concepts 

| **Concept**         | **Description**                                         |  
|---------------------|---------------------------------------------------------|  
| **Chart**           | Contains all components needed to deploy a Kubernetes cluster. |  
| **Templates**       | Components that make up a chart.                       |  
| **Config**          | Optional configurations to override default settings.   |  
| **Release**         | A running instance of a chart.                         |  
| **Chart Repository**| A centralized location for storing and sharing charts.  |

<div class='img-center'>

![](/img/docs/helm-workflow.png)  

</div>


## Helm 2 vs. Helm 3 

Helm 3 introduces several differences from Helm 2:

- Helm 2 uses a different architecture and CLI command structure.
- Helm 2 charts are compatible with Helm 3.
- Helm 2 relies on a "Tiller" component for authentication.
- Helm 3 communicates directly with the Kubernetes API server.
- Helm 3 uses the same credentials as those in the `.kube/config` file.

## Architecture 

- **Helm Client**: 
  - Manages charts and releases.  
  - Sends requests to the Kubernetes API server.  
  - Handles install, upgrade, and uninstall commands.  

- **Helm Library**: 
  - Manages operations with the Kubernetes API server.  
  - Handles communication between Helm client and Kubernetes.  
  - Handles chart installations and upgrades.  
  - Executes Helm operations within Kubernetes.  

## Setting up Helm 

Helm can be installed from source or pre-built binaries. Here's how to set it up:

- [Install Helm](https://helm.sh/docs/intro/install/)
- [Initialize a Helm Chart Repository](https://helm.sh/docs/intro/quickstart/#initialize-a-helm-chart-repository)


### Install Helm 

For Windows with WSL2 (Ubuntu), run these commands:

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

For auto-completion, use:

```bash
source <(helm completion bash)
echo "source <(helm completion bash)" >> ~/.bash_profile
```


### Initialize a Repository

With Helm v3, no repositories are installed by default. Add a repository with:

```bash
helm repo add stable https://charts.helm.sh/stable
```

Add another repo (e.g., Bitnami):

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

To list added repositories:

```bash
helm repo list
```

Update the repositories:

```bash
helm repo update
```

Search for charts in the repositories:

```bash
helm search repo
```

### Deploy a Sample Chart 

Install a Redis chart:

```bash
helm install my-test-redis1 bitnami/redis
```

Check running pods:

```bash
kubectl get pods
```

List deployed charts:

```bash
helm ls
```

### Delete the Chart 

Uninstall a chart:

```bash
helm uninstall my-test-redis1
```