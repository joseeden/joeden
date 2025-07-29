---
title: "Public OCI Repositories"
description: "Public OCI Repositories"
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
sidebar_position: 13
last_update:
  date: 8/23/2022
---


## Overview

This guide shows how to use public and private OCI Helm repositories with Flux CD to install applications like MySQL and Apache on Kubernetes clusters.

**A few notes:**

- I'm running the lab in a Windows 10 machine
- Tools used: Docker Desktop, WSL2
- A Kubernetes cluster is using `kind`
- Flux is running inside the Kubernetes cluster 
- Gitlab is used for the Git repositories


## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/047-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/020-Kubernetes/010-Setting-Up-Kubernetes-using-Kind.md)
- [Setting Up Flux](/docs/015-Containerization/049-Flux/015-Setting-Up-Flux.md)


## Project Directory 

:::info 

Make sure to go through the [pre-requisites](#pre-requisites) before proceeding to the next steps 

:::


If you followed the steps in [setting up Flux](/docs/015-Containerization/049-Flux/015-Setting-Up-Flux.md), your project directory should have the following files:

```bash
$ tree
.
├── README.md
└── clusters
    └── dev
        └── flux-system
            ├── gotk-components.yaml
            ├── gotk-sync.yaml
            ├── kustomization.yaml

3 directories, 6 files
```

To organize the manifests, we will create folders for each lab, along with their respective `kustomization.yaml` file.

For this lab, create the `helm-repos-oci-mysql` directory:

```bash
mkdir clusters/dev/helm-repos-oci-mysql 
```


## Open Container Initiative (OCI)

**Open Container Initiative (OCI)** defines a standard way to share software like container images and Helm charts.

- Uses digests for better security
- Can be used by many tools

OCI registries support stronger security features than basic HTTP Helm repos and are becoming a common choice for hosting Helm charts.


## Using a Public OCI Helm Repository

This section shows how to deploy MySQL using a public OCI Helm chart. 

First, create a new branch for your work:

```bash
## Make sure main branch is updated 
git checkout main 
git pull

## Create new branch
git checkout -b public-oci
```

### Prepare the Manifests 

Add a new `HelmRepository` file and set the type to `oci` and provide the OCI URL. This lets Flux CD know that the chart source is an OCI registry, not a regular HTTP one.

```yaml
## clusters/dev/helm-repos-oci-mysql/bitnami-oci.yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: mysql
  namespace: default
spec:
  type: oci
  interval: 5m0s
  url: oci://registry-1.docker.io/bitnamicharts
```

Now we install the MySQL chart from the public OCI repo. Create a HelmRelease file for MySQL

```yaml
## clusters/dev/helm-repos-oci-mysql/mysql-release.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: mysql
  namespace: default
spec:
  interval: 5m
  chart:
    spec:
      chart: mysql
      version: '9.10.9'
      interval: 1m
      sourceRef:
        kind: HelmRepository
        name: mysql
        namespace: default
  values:
    auth:
      username: "johnsmith"
      password: "mypass"
      database: "testdb"
```

Add the files to `kustomization.yaml`:

```yaml
## clusters/dev/helm-repos-oci-mysql/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- mysql-release.yaml
- bitnami-oci.yaml
```

Commit and push:

```bash
git add -A
git commit -m 'Add the Bitnami OCI repository and the MySQL Helm
release'
git push --set-upstream origin public-oci
```

After pushing, merge the changes to the main branch. Since we are using Gitlab in this setup, login to the Gitlab UI and go to the repository. We should see a `Create merge request` at the top. Click it and provide a title and description to the merge request in the next step.

<div class="img-center"> 

![](/img/docs/create-merge-reqeust.png)

</div>

In a typical team setting, developers create merge requests which are then reviewed and approved by other team members. For this lab, you can go ahead and click **Approve** and **Merge** directly.


### Trigger Reconciliation

Once changes are merged, tell FluxCD to sync the state.

```bash
flux reconcile kustomization flux-system --with-source
```

Verify deployment:

```bash
$ kubectl get helmrelease  
NAME                  AGE   READY   STATUS
mysql                 16m   True    Helm install succeeded for release default/mysql.v1 with chart mysql@9.10.9

$ kubectl get helmrepo
NAME              URL                                        AGE    READY   STATUS
mysql             oci://registry-1.docker.io/bitnamicharts   7m9s

$ kubectl get po
NAME                                   READY   STATUS    RESTARTS         AGE
mysql-0                                1/1     Running   0                3m57s
```

### Access the MySQL Pod 

You can check the pod and access the database like this:

```bash
kubectl get pods
kubectl exec -it mysql-0 -- mysql -u johnsmith -p testdb
```

This shows the MySQL chart from the public OCI repo is working correctly with Flux CD.

```bash
mysql> status
--------------
mysql  Ver 8.0.34 for Linux on x86_64 (Source distribution) 
```







