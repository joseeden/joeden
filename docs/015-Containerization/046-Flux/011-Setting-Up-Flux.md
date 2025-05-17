---
title: "Setting Up Flux"
description: "Setting Up Flux"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
  - Git
  - Flux
sidebar_position: 18
last_update:
  date: 8/19/2022
---

## Overview

This guide shows how to install Flux CD and link it to a Git repository. This helps automate Kubernetes setups using Git as the source of truth.

- Works on Windows, macOS, Linux
- Needs Kubernetes v1.23 or newer

Flux CD is installed as a command-line tool. It works by pulling setup files from a Git repository.

## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/044-GitOps/017-Setting-Up-Kubernetes.md)

## Download Flux CLI Tool

Install the Flux command-line tool:

- For Mac users - Using homebrew
  ```sh
  brew install fluxcd/tap/flux
  ```

- Windows users - Using the official script:

  ```bash
  curl -s https://fluxcd.io/install.sh | sudo bash
  ```

To verify:

```bash
flux --version
```

Now that Flux is installed, you can use it to bootstrap your Kubernetes cluster with your Git repo. 

## Prepare the Git Repository

:::info 

Make sure you have a [Github or Gilab account](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md) for this step.

:::

Create a Git repository to store Flux CD settings.

- Make a new Git repository (e.g. `flux-lab`)
- Clone it to your computer:

  ```sh
  git clone https://git.example.com/yourname/flux-lab.git
  cd flux-lab
  ```
- Create folder structure:

  ```sh
  mkdir -p clusters/dev/flux-system
  cd clusters/dev/flux-system
  ```

Here, "dev" is a name for the config, not the cluster itself. Same config can be reused across clusters.

## Create Flux Config Files

Create the required empty files - Flux will fill them later.

  ```sh
  touch gotk-components.yaml gotk-sync.yaml kustomization.yaml
  ```

Edit the `kustomization.yaml`. This tells Flux where to find the config files.

  ```yaml
  apiVersion: kustomize.config.k8s.io/v1beta1
  kind: Kustomization
  resources:
  - gotk-components.yaml
  - gotk-sync.yaml
  ```

- Save the files to Git.

  ```sh
  git add .
  git commit -m "initial commit"
  git push
  ```

Only the customization file has content. Flux will update the rest.

## Create Git Access Token

Flux needs permission to update the repository.

1. Go to your Git service (e.g. GitLab)
2. Create a personal access token.
3. Make sure to enable "API" permission
4. Save the token somewhere safe

This token acts like a password. You won’t see it again so make sure to write it down and store in a safe location.

Next, export the token as an environment variable in your terminal:

```sh
export GITLAB_TOKEN=your_token_here
```

## Bootstrap Flux CD to Cluster

We now install Flux to the Kubernetes cluster using the Git repo.

```sh
flux bootstrap gitlab \
  --owner=yourname \
  --repository=flux-lab \
  --branch=main \
  --path=clusters/dev \
  --token-auth \
  --personal
```

Flux connects to Git, fills in the config files, pushes changes, and installs itself to the cluster. You can verify this by going to your Git service and checking that Flux commited the new folder and files.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-16-215930.png)

</div>


## Confirm Flux is Installed

Check the running pods in the cluster:

```sh
kubectl get pods -n flux-system
```

You should see:

```
NAME                                       READY   STATUS    RESTARTS   AGE  
helm-controller-56dd4978f9-55mr8           1/1     Running   0          9m41s
kustomize-controller-7d7f548549-vrbd7      1/1     Running   0          9m41s
notification-controller-7fcdddb774-5tvnx   1/1     Running   0          9m41s
source-controller-5f9497cc5d-9kq66         1/1     Running   0          9m41s
```

These controllers handle syncing and updates from Git.

:::info 

**Difference with ArgoCD**

Unlike some tools like Argo CD, Flux doesn’t run as a single named pod. It uses multiple lightweight controllers. You don’t need a parent cluster. Just run the same bootstrap command to set up another cluster.


:::


## How Flux Connects to the Repository

FluxCD works by watching a Git repository for changes and syncing them to your Kubernetes cluster.

- It uses a custom resource called `gitrepo`
- It watches a specific branch (like `main` or `dev`)
- It checks for changes regularly and applies them

So when you install FluxCD, it knows where to look based on your setup. The Git repo CRD tells FluxCD what to watch and where. You can see this by running:

```bash
$  kubectl get gitrepo -n flux-system
NAME          URL                                               AGE   READY   STATUS
flux-system   https://gitlab.com/user/flux-lab.git   15m   True    stored artifact for revision 'main@sha1:123456789123456789123456789' 
```

## Secrets Used by FluxCD

To connect to a private Git repo, FluxCD uses a [secret token that was created in the Git service](#create-git-access-token).

- The token is stored in a Kubernetes secret
- The token gives FluxCD access to the Git repo

You can see the secret by running:

```bash
$ kubectl get secret -n flux-system
NAME          TYPE     DATA   AGE
flux-system   Opaque   2      20m 
```

You can also decode the secret using:

```bash
kubectl get secret flux-system -n flux-system -o jsonpath="{.data.password}" | base64 -d
```

This is the same token you used when bootstrapping FluxCD. Only admins should have access to this secret.


## Cluster Roles

FluxCD applies files from Git to your cluster using permissions.

- It uses a cluster role binding called `cluster-reconciler`
- This role lets it apply resources using cluster-admin access

You can view these permissions with:

```bash
$ kubectl get clusterrolebindings | grep flux
cluster-reconciler-flux-system         ClusterRole/cluster-admin                 22m
crd-controller-flux-system             ClusterRole/crd-controller-flux-system    22m
```

FluxCD checks and syncs resources regularly to keep them aligned with your Git state.

