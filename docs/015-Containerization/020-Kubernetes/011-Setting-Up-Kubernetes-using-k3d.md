---
title: "Setting Up Kubernetes using k3d"
description: "Setting Up Kubernetes using k3d"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
sidebar_position: 11
last_update:
  date: 8/19/2022
---


## Overview

This is a simple guide to set up a Kubernetes cluster locally using `k3d`.

- `k3d` lets you run Kubernetes in Docker containers
- Requires Docker and `kubectl` installed beforehand
- Automatically manages Kubernetes context after cluster creation

Once it's set up, you’ll be able to start running apps locally using Kubernetes commands.

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

## Install k3d

Install `k3d` by running the official install script.

```bash
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
```

This downloads and installs `k3d` on your machine. Make sure Docker and `kubectl` are already installed.

To verify:

```bash
k3d version
```

Output: 

```bash
k3d version v5.8.3
k3s version v1.31.5-k3s1 (default)
```

Reference: [k3d official documentation](https://k3d.io/stable/)



## Create a Cluster

You can create a new Kubernetes cluster using:

```bash
k3d cluster create test-k8s --servers 2 --agents 2
```

Where: 

- `--servers 2` sets up two control-plane nodes
- `--agents 2` sets up two worker nodes
- You can name your cluster anything you like

This ensures you have enough resources for running multiple apps later on.

## Check Your Kubernetes Context

After creating the cluster, `k3d` automatically sets your current `kubectl` context.

To confirm:

```bash
kubectl config get-contexts
```

You should see the context named after your cluster, and it should be selected (with a `*`).

```bash
CURRENT   NAME           CLUSTER        AUTHINFO             NAMESPACE
*         k3d-test-k8s   k3d-test-k8s   admin@k3d-test-k8s   
          kind-kind      kind-kind      kind-kind
```

This means `kubectl` is now connected to your new local Kubernetes cluster.

## View Your Cluster

To list all clusters created by `k3d`, run:

```bash
k3d cluster list
```

You’ll see the cluster name, number of servers and agents, and status. If everything looks good, you're ready to use it.

```plaintext
NAME       SERVERS   AGENTS   LOADBALANCER
test-k8s   2/2       2/2      true 
```

Your `kubectl` context is already set, so you can now deploy apps and services without additional setup.

```bash
$ kubectl get nodes

NAME                    STATUS   ROLES                       AGE   VERSION
k3d-test-k8s-agent-0    Ready    <none>                      66s   v1.31.5+k3s1
k3d-test-k8s-agent-1    Ready    <none>                      66s   v1.31.5+k3s1
k3d-test-k8s-server-0   Ready    control-plane,etcd,master   87s   v1.31.5+k3s1
k3d-test-k8s-server-1   Ready    control-plane,etcd,master   70s   v1.31.5+k3s1 
```