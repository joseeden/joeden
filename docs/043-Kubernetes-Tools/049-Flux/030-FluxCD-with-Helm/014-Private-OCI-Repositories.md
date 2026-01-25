---
title: "Private OCI Repositories"
description: "Using a Private OCI Registry (GitLab)"
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
sidebar_position: 14
last_update:
  date: 8/23/2022
---


## Overview

In this section, we’ll push a chart to a private OCI registry (GitLab) and connect Flux CD to it.

A few notes:

- I'm running the lab in a Windows 10 machine
- Tools used: Docker Desktop, WSL2
- A Kubernetes cluster is using `kind`
- Flux is running inside the Kubernetes cluster 
- Gitlab is used for the Git repositories
- Gitlab Container Registry is used as private OCI Helm repository 


## Pre-requisites 

- [Setting Up Git](/docs/043-Kubernetes-Tools/047-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/040-Containerization/020-Kubernetes/010-Setting-Up-Kubernetes-using-Kind.md)
- [Setting Up Flux](/docs/043-Kubernetes-Tools/049-Flux/015-Setting-Up-Flux.md)

## Project Directory 

:::info 

Make sure to go through the [pre-requisites](#pre-requisites) before proceeding to the next steps 

:::


If you followed the steps in [setting up Flux](/docs/043-Kubernetes-Tools/049-Flux/015-Setting-Up-Flux.md), your project directory should have the following files:

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

For this lab, create the `helm-repos-oci-private` directory:

```bash
mkdir clusters/dev/helm-repos-oci-private 
```


## Create the Chart 

Go to the `./charts` directory and create a new Helm chart:

```bash
helm create apache
cd apache
```

Update the `appVersion` in `Chart.yaml`:

```yaml
## appVersion: "1.16.0"
appVersion: "2.4.57"
```

Next, change the image to `httpd` in `values.yaml`:

```yaml
image:
  repository: httpd
```

Now that's ready, package the chart:

```bash
helm package .
```

This prepares the Helm chart for upload to the private registry. Some common docker registry:

- Docker Hub 
- Quay 
- AWS ECR 
- Google GCR 
- Azure Container Registry


## Login to the Registry 

For this lab, we are already using Gitlab so we'll use the built-in GitLab Container Registry. On your terminal, use the Gitlab personal token to login to the GitLab registry:

```sh
export GITLAB_TOKEN=your_token_here
```

:::info 

See [Create Git Access Token.](/docs/043-Kubernetes-Tools/049-Flux/015-Setting-Up-Flux.md#create-git-access-token)

::: 

Login with your username and when prompted with the password, provide the GitLab token: 

```bash
helm registry login -u johnsmith@gmail.com registry.gitlab.com
# Enter token when prompted
``` 

Note that when you use the `helm login` command to sign-in to the contianer registry, it will create or update the `config.json` file in the user's home directory. This file contains the endpoint and the password encoded in Base64 format.

```bash
$ cat ~/.config/helm/registry/config.json

{
  "auths": {
          "registry.gitlab.com": {
                  "auth": "***************************************"
           }
}
```

You can confirm this by decoding:

```bash
echo *************************************** | base64 -d
```

This should return:

```bash
johnsmith@gmail.com:glpat-******************
```

Encode the the `config.json` contents to Base64:

```bash
$ cat ~/.config/helm/registry/config.json | base64 | tr -d "\n"

abcdefghijklmopqrstuvwyx1234567890
```

Take note of the Base64-encoded JSON output. This will be used when creating the [Kubernetes secret.](#create-a-secret)


## Push the Package 

Next step is to push the package to the GitLab container registry: 

```bash  
helm push apache-0.1.0.tgz oci://registry.gitlab.com/josemanuelitoeden/labs-flux
```

If you get an error on the OCI URL, you can check for the projects and their URL first:

```bash
curl -s --header "PRIVATE-TOKEN: enter-token-her" https://gitlab.com/api/v4/projects?membership=true | jq -r '.[] | "\(.name) | oci://registry.gitlab.com/\(.path_with_namespace)"'
```

After this, the chart is stored in GitLab’s container registry. To verify, login to your GitLan account and go to **Deploy** --> **Container Registry**.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-18-193542.png)

</div>


## Create a Secret 

Back on your terminal, switch to the `main` branch and pull the updates. 

```bash
git checkout main
git pull 
```

Create a new branch:

```bash
git checkout -b private-oci
```

We now add a Kubernetes secret so Flux CD can pull the chart. Go to your project directory and create `gitlab-oci-secret.yaml`:

```yaml
## clusters/dev/helm-repos-oci-private/gitlab-oci-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: gitlab-credentials
  namespace: default
data:
  .dockerconfigjson: abcdefghijklmopqrstuvwyx1234567890
type: kubernetes.io/dockerconfigjson
```

This secret allows Kubernetes to access the private OCI registry.

## Add the Private OCI Repository 

Now reference the private registry and the secret in a HelmRepository. Create the `gitlab-oci-repository.yaml`. This lets Flux CD connect to your private OCI repo and access the chart securely.

```yaml
## clusters/dev/helm-repos-oci-private/gitlab-oci-repository.yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: gitlab-oci-repo
  namespace: default
spec:
  type: oci
  interval: 5m
  url: oci://registry.gitlab.com/johnsmith/projectname
  secretRef:
    name: gitlab-credentials
```

Next, create the Helm release file for deploying Apache.

```yaml
## clusters/dev/helm-repos-oci-private/apache-helm-release.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: helmrelease-apache
  namespace: default
spec:
  interval: 5m
  chart:
    spec:
      chart: apache
      version: '0.1.0'
      interval: 1m
      sourceRef:
        kind: HelmRepository
        name: gitlab-oci-repo
        namespace: default
```

Finally, add both files to `kustomization.yaml`:

```yaml
## clusters/dev/helm-repos-oci-private/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- gitlab-oci-secret.yaml
- gitlab-oci-repository.yaml
- apache-helm-release.yaml
```

Commit and push the changes.

```bash
git add -A
git commit -m "Adds a private OCI repository and an Apache Helm
release that uses it"
git push --set-upstream origin private-oci
```

After pushing, merge the changes to the main branch. Since we are using Gitlab in this setup, login to the Gitlab UI and go to the repository. We should see a `Create merge request` at the top. Click it and provide a title and description to the merge request in the next step.

:::info 

In a typical team setting, developers create merge requests which are then reviewed and approved by other team members. For this lab, you can go ahead and click **Approve** and **Merge** directly.

:::


## Sync the State 

Sync the state by triggering manually:

```bash
flux reconcile kustomization flux-system --with-source
```

Verify deployment:

```bash
$ kubectl get helmrelease  
NAME                  AGE   READY   STATUS
helmrelease-apache    20m   True    Helm install succeeded for release default/helmrelease-apache.v1 with chart apache@0.1.0

$ kubectl get helmrepo
NAME              URL                                                  AGE    READY   STATUS
gitlab-oci-repo   oci://registry.gitlab.com/homelabs9424449/labs-flux   5m16s  True

$ kubectl get po
NAME                                   READY   STATUS             RESTARTS        AGE
helmrelease-apache-744c6bc456-fl2w8    1/1     Running            0               79s
```


