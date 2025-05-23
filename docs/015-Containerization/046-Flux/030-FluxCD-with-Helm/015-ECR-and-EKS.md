---
title: "AWS ECR and EKS"
description: "Using FluxCD with Helm Charts in AWS EKS and ECR"
tags:
  - Cloud
  - Amazon Web Services
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
  date: 8/24/2022
---


## Overview

This guide shows how to use FluxCD to deploy Helm charts from a private ECR repository in AWS EKS.

- AWS ECR can host private Helm charts
- FluxCD uses service accounts to pull Helm charts from ECR
- EKS pods need access to ECR using IAM roles

This setup uses IAM roles instead of plain secrets for a more secure connection between FluxCD and ECR.

**A few notes:**

- I'm running the lab in a Windows 10 machine
- Tools used: Docker Desktop, WSL2
- A Kubernetes cluster is using `kind`
- Flux is running inside the Kubernetes cluster 
- Gitlab is used for the Git repositories


## Pre-requisites 

- [Setting Up Git](/docs/015-Containerization/044-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/015-Containerization/044-GitOps/017-Setting-Up-Kubernetes.md)
- [Setting Up Flux](/docs/015-Containerization/046-Flux/015-Setting-Up-Flux.md)

## Project Directory 

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

3 directories, 6 files
```

To organize the manifests, we will create folders for each lab, along with their respective `kustomization.yaml` file.

For this lab, create the `helm-repos-ecr` directory:

```bash
mkdir -p clusters/eks/helm-repos-ecr
```

Also create the `charts` directory.

```bash
mkdir -p charts
```



## Install AWS CLI and eksctl

First, install tools needed to interact with AWS and create EKS clusters.

- [Install AWS CLI](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#aws-cli)
- [Install `eksctl`](/docs/001-Personal-Notes/050-Project-Pre-requisites/010-Containers/020-Kubernetes-Labs.md#install-cli-tools)
- [Configure your AWS credentials](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#access-keys)

These tools help in managing the cluster and set up authentication with ECR.

## Create an ECR Repository

To host your Helm charts in Amazon ECR, first create a repository:

```bash
# Create ECR repository
aws ecr create-repository \
  --repository-name apache \
  --region ap-southeast-1 \
  --image-scanning-configuration scanOnPush=false \
  --image-tag-mutability MUTABLE
```

Login to AWS --> **Amazon ECR**. Verify that the repository is created.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-18-193542.png)

</div>



## Create EKS Cluster with OIDC Enabled 

Use `eksctl` to create an EKS cluster where pods can use IAM roles. Make sure to enable OIDC to allow IAM roles for service accounts

```bash
eksctl create cluster \
  --name dev-flux \
  --region ap-southeast-1 \
  --version auto \
  --nodegroup-name dev-ngroup \
  --node-type t3.large \
  --nodes 1 \
  --nodes-min 1 \
  --nodes-max 2 \
  --managed \
  --with-oidc
```

Login to AWS --> **Amazon Elastic Kubernetes Service**. Verify that the cluster is created.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-05-18-193542.png)

</div>

Click the cluster and locate the **API server endpoint**. Copy the OIDC ID. 

For example:

```bash
https://8CC6F95944D3F2C4618CB7758EC104EA.gr7.ap-southeast-1.eks.amazonaws.com 
```

Here, the OIDC ID is:

```bash
8CC6F95944D3F2C4618CB7758EC104EA
```


## Set Up Trust Policy and IAM Role

We need to create a trust policy so that AWS knows which pod can assume a specific IAM role.

- Create a JSON file called `trust-policy.json`
- Replace `ACCOUNT_ID` and `CLUSTER_NAME` in the policy
- Trust the `source-controller` service account in `flux-system`

This trust allows the FluxCD controller to use the IAM role to access ECR.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<OIDC_ID>"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.<REGION>.amazonaws.com/id/<OIDC_ID>:sub": "system:serviceaccount:flux-system:source-controller"
        }
      }
    }
  ]
}
```

:::info 

The `sub` is the subject of the OIDC token. It identifies the Kubernetes service account that is allowed to assume the role.

The `aud` is the audience field of the token. AWS expects this to be  sts.amazonaws.com , indicating that the token is intended to be used with the AWS Security Token Service (STS).

:::

Next, create the actual IAM role and attach a `AmazonEC2ContainerRegistryReadOnly policy to allow ECR read access. This policy gives the controller permission to read from the private ECR repository.

```bash
# Create the role
aws iam create-role \
  --role-name FluxCDECR \
  --assume-role-policy-document file://trust-policy.json

# Attach read-only access to ECR
aws iam attach-role-policy \
  --role-name FluxCDECR \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly

# Copy the role ARN for later (output includes Role.Arn)
```

Login to AWS --> **IAM** --> **Roles** --> Find  `FluxCDECR` and copy the **ARN**:

```bash
arn:aws:iam::123456789000:role/FluxCDECR 
```

## Install FluxCD on EKS

:::info 

Make sure to go through the [pre-requisites](#pre-requisites) to setup the Git repository.

:::

On your terminal, go to the directory of your Git repository. Switch to your local repository and ensure you're on the `main` branch with the latest updates:

```bash
git checkout main
git pull 
```

To install FluxCD on your EKS cluster, export your Git token and run the `flux bootstrap` command. You don’t need to manually access the cluster, Flux will handle the setup remotely.

```bash
export GIT_TOKEN=<your-token>

## Replace owner ID
flux bootstrap gitlab  \
  --owner=josemanuelitoeden  \     
  --repository=flux-lab  \
  --branch=main  \
  --path=clusters/eks  \
  --token-auth --personal 
```

Flux will deploy the necessary controllers and CRDs to your EKS cluster and push configuration files to the `flux-system` directory. Do another pull to update your local repository with the changes.

```bash
git pull 
```

## Annotate the Service Account 

To allow Flux to access your ECR repository, add a patch in your `kustomization.yaml` that attaches the IAM role to the `source-controller` service account:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - gotk-components.yaml
  - gotk-sync.yaml
patches:
  - patch: |
      apiVersion: v1
      kind: ServiceAccount
      metadata:
        name: source-controller
        annotations:
          eks.amazonaws.com/role-arn: "arn:aws:iam::<ACCOUNT_ID>:role/FluxCDECR"
    target:
      kind: ServiceAccount
      name: source-controller
```

Commit and push the changes:

```bash
git add -A
git commit -m "Add IAM role annotation to FluxCD service account"
git push
```

To apply the changes immediately, manually trigger a reconciliation:

```bash
flux reconcile kustomization flux-system --with-source
```


## Push a Helm Chart to ECR

As a test, create a new chart and package it:

```bash
cd charts
helm create apache

cd apache
helm package apache
```

Authenticate with ECR:

```bash
aws ecr get-login-password --region Pap-southeast-1 \
  | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
```

Push the chart:

```bash
helm push apache-0.1.0.tgz oci://<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
```

The Helm chart is now stored in private ECR repo, ready to be pulled by FluxCD.





## Create `HelmRepository` and `HelmRelease` 

As good practice, create a new branch in your repository:

```bash
git checkout -b ecr
```

To tell FluxCD where to find your chart and how to deploy it, create two YAML files below:

```yaml
# clusters/eks/helm-repos-ecr/apache-repo.yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: ecr-apache
  namespace: default
spec:
  type: oci
  provider: aws
  url: oci://<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com
  interval: 5m0s
```
 
```yaml
# clusters/eks/helm-repos-ecr/apache-release.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: apache
  namespace: default
spec:
  chart:
    spec:
      chart: apache
      version: "0.1.0"
      sourceRef:
        kind: HelmRepository
        name: apache
        namespace: flux-system
  interval: 5m
```

Commit and push these files.

```bash
git add -A
git commit -m "Adds the ECR repository and the Apache Helm release"
git push --set-upstream origin ecr 
```

After pushing, merge the changes to the main branch. Since we are using Gitlab in this setup, login to the Gitlab UI and go to the repository. We should see a `Create merge request` at the top. Click it and provide a title and description to the merge request in the next step.

:::info 

In a typical team setting, developers create merge requests which are then reviewed and approved by other team members. For this lab, you can go ahead and click **Approve** and **Merge** directly.

:::


## Deploy and Verify Helm Release

Apply changes and confirm everything is running.

```bash
# Force reconciliation
flux reconcile kustomization flux-system --with-source

# Verify setup
kubectl get helmrepository -n flux-system
# NAME    URL                                                    READY  STATUS
# apache  oci://<ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com  True

kubectl get helmrelease -n default
# NAME     READY  STATUS   REVISION
# apache   True   Deployed 1

kubectl get pods -n default
# NAME                     READY  STATUS   RESTARTS  AGE
# apache-5d9f5d6c5b-abcde  1/1    Running  0         2m
```

This confirms FluxCD has deployed your chart from ECR to EKS.

## Cleanup 

Once we're done with the lab, we need to delete the EKS cluster:

```bash
eksctl delete cluster --name <cluster-name> --region <region>
```

