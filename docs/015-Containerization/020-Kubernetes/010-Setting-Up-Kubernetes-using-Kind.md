---
title: "Setting Up Kubernetes using Kind"
description: "Setting Up Kubernetes using Kind"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
sidebar_position: 10
last_update:
  date: 8/19/2022
---


## Overview

This is a simple guide to set up a local Kubernetes cluster using Kind. This setup is useful for development and testing, especially before deploying to cloud environments.

- Use Docker to run containers
- Use `kubectl` to manage the cluster
- Use Kind to create a lightweight local cluster

## Install Docker

Docker is needed to run the Kubernetes cluster using containers.

```bash
## Update your package list
sudo apt update

## Install required dependencies
sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

## Add Docker’s GPG key and repo
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

## Install Docker and Containerd
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

Make Docker usable without `sudo`:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Check installation:

```bash
docker version
```

## Install kubectl

`kubectl` is the tool used to interact with Kubernetes clusters.

```bash
## Download the binary
curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

## Move it to a directory in your system path
chmod +x kubectl

## Make it executable
sudo mv kubectl /usr/local/bin/
```

Confirm the installation:

```bash
kubectl version --client
```

## Install Helm

You will need Helm to deploy Helm charts automatically to a Kubernetes cluster.

You can install Helm using the official installation script:

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

After installation, confirm Helm is available:

```bash
helm version
```

**Optional: Install via Package Manager (Alternative)**

If you prefer installing via `apt`, you can use this method:

```bash
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

## Install Kind

Kind creates a local Kubernetes cluster using Docker containers.

- Download Kind binary from GitHub
- Move it to a path directory
- Make it executable

Example:

```bash
curl -Lo kind https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-amd64
chmod +x kind
sudo mv kind /usr/local/bin/
```

Check Kind version:

```bash
kind version
```


## Create a Cluster with Ingress

You can create a simple cluster or one with extra features like Ingress.

Example `cluster.yaml`:

```yaml
# cluster.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP

```

Create the cluster:

```bash
kind create cluster --config cluster.yaml
```

The cluster runs in a Docker container, so it's lightweight and fast to reset or recreate.

**Optional:** You might need to verify if `~/.kube/config` is created:

```bash
ls -la ~/.kube/config 
```

If it doesn't exist yet, create it:

```bash
mkdir -p ~/.kube/config 
```

Then set the custom KUBECONFIG path temporarily:

```bash
export KUBECONFIG=~/.kube/config
```


## Use kubectl with the Cluster

`kind` automatically sets up `kubectl` to connect to your new cluster.

- No extra steps are needed for Kind
- For cloud clusters (like GKE, EKS, AKS), follow their setup guides

To get information about the cluster:

```bash
$ kubectl cluster-info --context kind-kind 

Kubernetes control plane is running at https://127.0.0.1:33783
CoreDNS is running at https://127.0.0.1:33783/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

To check the nodes:

```bash
$ kubectl get nodes --context kind-kind

NAME                 STATUS   ROLES           AGE   VERSION
kind-control-plane   Ready    control-plane   72d   v1.29.2
```

## Setting the Context

Before running any commands, ensure you're targeting the correct Kubernetes cluster by verifying your current context.

```bash
kubectl config get-contexts
```

Sample output:

```bash
CURRENT   NAME        CLUSTER     AUTHINFO    NAMESPACE
*         kind-kind   kind-kind   kind-kind
```

:::info

The asterisk (*) indicates the active context that kubectl is using.

:::

To check the current context:

```bash
kubectl config current-context
```

If no context is set, you'll see:

```bash
error: current-context is not set
```

To set the desired context (e.g., `kind-kind`):

```bash
kubectl config use-context kind-kind
```

Once set, you can use `kubectl` commands without specifying a context:

```bash
$ kubectl cluster-info

Kubernetes control plane is running at https://127.0.0.1:33783
CoreDNS is running at https://127.0.0.1:33783/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'. 
```
```bash
$ kubectl get nodes

NAME                 STATUS   ROLES           AGE   VERSION
kind-control-plane   Ready    control-plane   73d   v1.29.2 
```

## Deleting the Cluster 

Once you're done with the labs, delete the cluster:

```bash
kind delete cluster
```