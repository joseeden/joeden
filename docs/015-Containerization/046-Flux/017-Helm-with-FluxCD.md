---
title: "Helm with FluxCD"
description: "Helm with FluxCD"
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
sidebar_position: 17
last_update:
  date: 8/19/2022
---


## Overview

This is a simple guide on how to use Flux CD to automatically deploy a Helm chart to Kubernetes.

- Helm charts can be deployed using source code or packaged charts
- Flux CD detects and deploys the changes from Git automatically

Helm is like a tool that bundles your Kubernetes setup into charts. Flux CD then watches your Git repo to make sure your cluster always matches the setup you saved there.

## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/044-GitOps/017-Setting-Up-Kubernetes.md)
- [Setting Up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md)


## Helm

Helm helps you package, deploy, and manage apps in Kubernetes using a structure called **charts**.

- Charts group related Kubernetes resources
- You can version your app deployments with Helm

Charts are like *blueprints*. With Helm, you install or upgrade apps using those blueprints without writing YAML files from scratch each time.

## Helm with Flux CD

You can store Helm charts and their configs in Git and let Flux CD manage them.

- Flux can deploy Helm charts from Git or Helm repos
- You define what you want using YAML files in Git
- Flux applies the Helm chart to your cluster

Flux CD tracks updates to Helm charts or container images and apply them.

- It checks for new chart versions in Helm repos
- It can update charts and values automatically
- You define rules or policies for updates

For example, if a new chart version comes out, Flux can update your app without you doing anything manually.


## `HelmRelease` Resource

Flux adds a special object called `HelmRelease` to manage Helm deployments declaratively.

- `HelmRelease` defines the chart, version, and values
- You commit the `HelmRelease` file to Git
- Flux reads it and applies the Helm release

You don’t need to run Helm commands manually. Just update the YAML file in Git, and Flux will do the rest.

Sample `HelmRelease`:

```yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: my-app
  namespace: default
spec:
  chart:
    spec:
      chart: my-chart
      sourceRef:
        kind: HelmRepository
        name: my-repo
        namespace: flux-system
  interval: 5m
  values:
    replicaCount: 3
```

This file tells Flux to deploy `my-chart` from `my-repo` every 5 minutes with 3 replicas.



## Ways to Use Helm Charts

There are two main ways to use Helm charts with Kubernetes.

- Use chart source code stored locally
- Use pre-packaged charts from repositories

Using source code is good for testing while using packaged charts is better for production.

## Lab: Helm Chart for Nginx

### Project Directory 

:::info 

Make sure to go through the [pre-requisites](#pre-requisites) before proceeding to the next steps 

:::


If you followed the steps in [setting up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md), your project directory should have the following files:

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
            ├── podinfo-customization.yaml
            └── podinfo-repo.yaml

3 directories, 6 files
```

### Prepare the Local Helm Chart

Create a `charts` directory at the root of the project directory:

```bash
mkdir charts
cd charts
```

Next, scaffold a new chart, for example, nginx:

```bash
helm create nginx
```

This creates a simple web server chart with settings we can customize before deploying.

Open `charts/nginx/values.yaml` and update: 

```yaml
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: ""
```

### Create the Helm Release 

Create a `HelmRelease` YAML file in directory containing the Kubernetes manifests:

```yaml
## clusters/dev/flux-system/nginx-helm-release.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: nginx
  namespace: default
spec:
  interval: 1m
  chart:
    spec:
      interval: 1m
      chart: ./charts/nginx
      sourceRef:
        kind: GitRepository
        name: flux-system
        namespace: flux-system
```

Note:
- Set the release name, chart path, and intervals
- Reference the local Git repository as the chart source

### Add the Files in `kustomization.yaml` 

This ensures that Flux also watches for the `podinfo` manifests.

```bash
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- gotk-components.yaml
- gotk-sync.yaml
- podinfo-repo.yaml
- podinfo-customization.yaml
- nginx-helm-release.yaml
```

### Commit and Push Changes

To follow GitOps, commit the changes and create a merge request.

```bash
## Create a new branch for the change
git checkout -b nginx-helm  

## Stage, commit, and push to the Git repository
git add -A
git commit -m "Add nginx Helm chart and release config"
git push --set-upstream origin nginx-helm
```

After pushing, merge the changes to the main branch. Since we are using Gitlab in this setup, login to the Gitlab UI and go to the repository. We should see a `Create merge request` at the top. Click it.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-17-181001.png)

</div>

Provide a title and description to the merge request and click the **Create merge request** button at the bottom.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-17-181210.png)

</div>

In a typical team setting, developers create merge requests which are then reviewed and approved by other team members. For this lab, you can go ahead and click **Approve** and **Merge** directly.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-17-181445.png)

</div>

### Trigger Flux to Reconcile

You can wait for Flux to detect changes, or you can also trigger it manually by running:

```bash
flux reconcile kustomization flux-system --with-source
```

Next, check the Helm release:

```bash
kubectl get helmrelease
```

You might initially get this if you immediately run the `kubectl` command:

```bash
$ kubectl get helmrelease
NAME    AGE   READY     STATUS
nginx   13s   Unknown   Running 'install' action with timeout of 5m0s  
```

After a few seconds, it should change to `Helm install succeeded`:

```bash
$ kubectl get helmrelease
NAME    AGE   READY   STATUS
nginx   72s   True    Helm install succeeded for release default/nginx.v1 with chart nginx@0.1.0
```

Finally, check if pods, services, and ingress objects are created

```bash
flux reconcile kustomization flux-system --with-source
```


**Different status**

You may see two different status:

- `Helm install succeeded for release default/nginx.v1 with chart nginx@0.1.0`

  - This message comes from Helm via Flux
  - It means release is successfully installed.
  - Kubernetes accepted the resulting resources.
  - This happens **right after Helm completes the install step**.

- `Release reconciliation succeeded` 

  - This is a higher-level Flux message.
  - Flux reconciled the state (HelmRelease → Kubernetes resources).
  - It verified the resources are in the desired state
  - It may appear a **few seconds after install**, once everything settles and Flux re-evaluates the state.


You should see an NGINX pod running and the service created:

```bash
$ kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
nginx-7fc44c46f6-7fr7q     1/1     Running   0          8m4s
podinfo-5d9db9b467-9h26p   1/1     Running   0          5h46m
podinfo-5d9db9b467-mldhr   1/1     Running   0          5h46m

$ k get svc
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)             AGE
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP             21h
nginx        ClusterIP   10.96.69.189   <none>        80/TCP              9m47s
podinfo      ClusterIP   10.96.103.28   <none>        9898/TCP,9999/TCP   5h48m
```

You can also access the welcome page when visiting the cluster IP.


