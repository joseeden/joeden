---
title: "HTTP Helm Repositories"
description: "HTTP Helm Repositories"
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
sidebar_position: 22
last_update:
  date: 8/19/2022
---

## Overview

This guide shows how to connect FluxCD to a Helm chart repository hosted over HTTP.

- Create a Helm Repository resource
- Add authentication details if required
- Create a Helm Release using the repo
- Push changes and trigger FluxCD sync

## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/044-GitOps/017-Setting-Up-Kubernetes.md)
- [Setting Up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md)
- [Deploy ChartMuseum](/docs/015-Containerization/046-Flux/021-Private-Helm-Repositories.md)


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
            ├── podinfo-customization.yaml
            └── podinfo-repo.yaml

3 directories, 6 files
```

We also 

## Create the Helm Repository

:::info 

Make sure ChartMuseum is deployed and listening on port 8080 before proceeding with the steps below.

:::

Start by defining the Helm repository resource in your cluster directory.
In the cluster folder, create a new YAML file for the `HelmRepository`

```yaml
# clusters/dev/flux-system/localhttprepo.yaml
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
# clusters/dev/flux-system/busybox-helm-release.yaml
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
        name: local-http-repo        ## Created in the previous step
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
