---
title: "HTTP Repositories"
description: "HTTP Repositories"
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
  - Helm
sidebar_position: 12
last_update:
  date: 8/19/2022
---


## Overview

This guide shows how to connect FluxCD to a Helm chart repository hosted over HTTP. 

For simplicity, we'll be using the private repository ChartMuseum (from previous lab) as the HTTP Helm repository.

A few notes:

- I'm running the lab in a Windows 10 machine
- Tools used: Docker Desktop, WSL2
- A Kubernetes cluster is using `kind`
- Flux is running inside the Kubernetes cluster 
- Gitlab is used for the Git repositories

Flux connecting to the HTTP repository:

- The private repository is deployed as a container in the same Windows machine 
- For user to connect to the private repository via HTTP, use the `127.0.0.1:8080`
- For Flux to connect to the private repository via HTTP, use the `host.docker.internal:8080`


## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/020-Kubernetes/001-Cluster-Setup-using-Kind.md)
- [Setting Up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md)
- [Deploy ChartMuseum](/docs/015-Containerization/046-Flux/030-FluxCD-with-Helm/011-Private-Repositories.md)


## Project Directory 

:::info 

Make sure to go through the [pre-requisites](#pre-requisites) before proceeding to the next steps 

:::


If you followed the steps in [setting up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md), your project directory should have the following files:

```bash
$ tree
.
├── README.md
└── charts
└── clusters
    └── dev
        └── flux-system
            ├── gotk-components.yaml
            ├── gotk-sync.yaml
            ├── kustomization.yaml

3 directories, 6 files
```

To organize the manifests, we will create folders for each lab, along with their respective `kustomization.yaml` file.

For this lab, create the `helm-repos-http` directory:

```bash
mkdir clusters/dev/helm-repos-http  
```

## Create the Helm Repository

:::info 

Make sure ChartMuseum is deployed and listening on port 8080 before proceeding with the steps below.

:::

Start by defining the Helm repository resource in your cluster directory.
In the cluster folder, create a new YAML file for the `HelmRepository`

```yaml
# clusters/dev/helm-repos-http/localhttprepo.yaml
---
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: local-http-repo
  namespace: default
spec:
  interval: 5m0s
  url: http://host.docker.internal:8080  ## this is the ChartMuseum address
  secretRef:
    name: local-http-repo-secret
---
apiVersion: v1
kind: Secret
metadata:
  name: local-http-repo-secret
  namespace: default
stringData:
  username: chartuser
  password: ***********
```

This tells FluxCD to pull charts from the HTTP Helm repo every 5 minutes.


## Create Helm Release Resource

Now define the `HelmRelease` that will use the repository.

```yaml
# clusters/dev/helm-repos-http/busybox-helm-release.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: helmrelease-busybox
  namespace: default
spec:
  interval: 1m
  chart:
    spec:
      chart: busybox            ## Chart name and version
      version: 0.1.0
      interval: 1m
      sourceRef:
        kind: HelmRepository    
        name: local-http-repo   ## Created in the previous step
        namespace: default
```

This will deploy the `busybox` chart from the defined repo every 1 minute.

## Add to `kustomization` 

Add the files to the `kustomization.yaml` to ensre Flux watch for the changes:

```bash
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- gotk-components.yaml
- gotk-sync.yaml
- podinfo-repo.yaml
- podinfo-customization.yaml
- nginx-helm-release.yaml
- busybox-helm-release.yaml
- localhttprepo.yaml
```

## Commit and Push the Changes

After writing the YAML, commit and push it to your Git repository.

```bash
## Make sure main branch is updated 
git checkout main 
git pull

## Create the new branck then push
git checkout -b local-http-helm-repo
git add .
git commit -m "Add Helm repo and busybox release"
git push origin local-http-helm-repo
```

After pushing, merge the changes to the main branch. Since we are using Gitlab in this setup, login to the Gitlab UI and go to the repository. We should see a `Create merge request` at the top. Click it and provide a title and description to the merge request in the next step.

<div class="img-center"> 

![](/img/docs/create-merge-reqeust.png)

</div>

In a typical team setting, developers create merge requests which are then reviewed and approved by other team members. For this lab, you can go ahead and click **Approve** and **Merge** directly.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-18-012256.png)

</div>

## Trigger Reconciliation

Once changes are merged, tell FluxCD to sync the state.

```bash
flux reconcile kustomization flux-system --with-source
```

Verify deployment:

```bash
$ kubectl get helmrelease  
NAME                  AGE   READY   STATUS
helmrelease-busybox   8m    True    Helm install succeeded for release default/helmrelease-busybox.v1 with chart busybox@0.1.0

$ kubectl get helmrepo
NAME              URL                                AGE    READY   STATUS
local-http-repo   http://host.docker.internal:8080   8m5s   True    stored artifact: revision 'sha256:be893c02c34a98008a65f26812c0492525896cc686e3946e58637cc026451211'

$ kubectl get po
NAME                                   READY   STATUS             RESTARTS        AGE
helmrelease-busybox-64cbf9fb98-xhh7g   1/1     Running            0               87s  
```


## Troubleshooting 

To check if the Helm repository is created:

```bash
$ flux get sources helm -A

NAMESPACE       NAME            REVISION        SUSPENDED  READY   MESSAGE
default         local-http-repo    sha256:a1af7d4c False      True    stored artifact: revision 'sha256:a1af7d4c'
```

If you're running the test locally inside a Windows machine, you may need to se the `url` for the ChartMuseum address to:

```bash
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: local-http-repo
  namespace: default
spec:
  interval: 5m0s
  url: http://host.docker.internal:8080  ## this is the ChartMuseum address
  secretRef:
    name: local-http-repo-secret
```


For other errors, please see [General Troubleshooting.](/docs/015-Containerization/046-Flux/099-Troubleshooting.md)
