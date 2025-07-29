---
title: "Troubleshooting"
description: "Troubleshooting"
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
sidebar_position: 99
last_update:
  date: 8/22/2022
---


## Stuck at Reconciliation 

If the `flux reconcile` command get stuck, or if the page did not load:

```bash
$ flux reconcile kustomization flux-system --with-source

► annotating GitRepository flux-system in flux-system namespace
✔ GitRepository annotated
◎ waiting for GitRepository reconciliation
✔ fetched revision main@sha1:0719c1a070824be83fce24f70fcc3e5b91389c8f
► annotating Kustomization flux-system in flux-system namespace
✔ Kustomization annotated
◎ waiting for Kustomization reconciliation
```

You can try checking the logs for any error:

```bash
kubectl logs -n flux-system deployment/kustomize-controller 
```

## Check if Helm Respository is Created 


To check if the Helm repository is created:

```bash
$ flux get sources helm -A

NAMESPACE       NAME            REVISION        SUSPENDED  READY   MESSAGE
default         local-http-repo    sha256:a1af7d4c False      True    stored artifact: revision 'sha256:a1af7d4c'
```

## Confirm the OCI Chart exists 

Double-check that the chart name and version exist at the repo:

```bash
helm show chart oci://registry-1.docker.io/bitnamicharts/mysql --version 9.10.9
```

If this fails, either:

- The version doesn't exist
- You're not authenticated 
- The chart is not publicly accessible (Docker Hub's OCI support can be flaky)

## Check the HelmChart Resource directly

Check the helm chart:

```bash
kubectl get helmchart -n default
```

Then inspect the one Flux generated:

```bash
kubectl describe helmchart default-mysql -n default
```

Look for:

- Errors under `Status.conditions`
- Events mentioning authentication, network, or chart-not-found issues

## Check Image Pull Permissions

Bitnami's OCI charts on Docker Hub sometimes require authentication.

If you're not using Helm registry login, try authenticating manually:

```bash
export HELM_EXPERIMENTAL_OCI=1
helm registry login registry-1.docker.io
```

Then see if `flux` can pull it with:

```bash
flux reconcile source helmrepository mysql --namespace=default
```

You may also need to provide image pull secrets in the namespace if Docker Hub requires authentication.

## Check Project OCI URLs (GitLab)

First login using the Gitlab token :

```bash
helm registry login -u johnsmith@gmail.com registry.gitlab.com
# Enter token when prompted
``` 

Check for the projects and their URL first:

```bash
curl -s --header "PRIVATE-TOKEN: enter-token-her" https://gitlab.com/api/v4/projects?membership=true | jq -r '.[] | "\(.name) | oci://registry.gitlab.com/\(.path_with_namespace)"'
```
