---
title: "Common Transformers"
description: "Common Transformers"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 17
last_update:
  date: 4/19/2022
---


## Overview

Kustomize includes several common transformers out of the box.

- **commonLabels** – Add the same labels to all resources
- **namePrefix/nameSuffix** – Add a prefix/suffix to resource names
- **namespace** – Place all resources in a given namespace
- **commonAnnotations** – Add metadata annotations to all resources

These are simple fields you can set in your `kustomization.yaml`. They apply to every resource listed under `resources`.


## Clone the Repository  

To try out the examples in the sections below, clone the project repository from GitHub. 

- Github repo: [joseeden/test-kustomize-labs](https://github.com/joseeden/test-kustomize-labs/tree/master/code-samples/03-multi-tier-app)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/test-kustomize-labs.git 
cd code-samples/04-transformers/common-transformers
```

Project directory structure:

```bash
common-transformers/
├── base/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1/
│   ├── kustomization.yaml
│   └── transformers/
│       └── label.yaml
├── v2/
│   ├── kustomization.yaml
│   └── transformers/
│       └── name-prefix.yaml
├── v3/
│   ├── kustomization.yaml
│   └── transformers/
│       └── namespace.yaml
├── v4/
│   ├── kustomization.yaml
│   └── transformers/
│       └── annotations.yaml
```


## Label Transformer

Use this when you want to add detailed labels with control over where they are applied.

- **transformers/label.yaml**

    ```yaml
    apiVersion: builtin
    kind: LabelTransformer
    metadata:
      name: label-transformer
    labels:
      environment: dev
      version: v1
    fieldSpecs:
      - path: metadata/labels
        create: true
    ```

- **v1/kustomization.yaml**

    ```yaml
    resources:
      - ../base

    transformers:
      - transformers/label.yaml
    ```

Deploy and verify:

```bash
kubectl apply -k ./v1
kubectl get deployment myapp --show-labels
kubectl get service myapp-service --show-labels
```

Check that both Deployment and Service have labels: `environment=dev` and `version=v1`.


## Name Prefix/Suffix Transformer

Add a prefix to resource names to easily group or version them.

- **transformers/name-prefix.yaml**

    ```yaml
    apiVersion: builtin
    kind: PrefixSuffixTransformer
    metadata:
      name: prefix-transformer
    prefix: v2-
    fieldSpecs:
      - path: metadata/name
    ```

- **v2/kustomization.yaml**

    ```yaml
    resources:
      - ../base

    transformers:
      - transformers/name-prefix.yaml
    ```

Deploy and verify:

```bash
kubectl apply -k ./v2
kubectl get all
```

You should see resources named `v2-myapp` and `v2-myapp-service`.




## Namespace Transformer 

Assign all resources to a specific namespace.

- **transformers/namespace.yaml**

    ```yaml
    apiVersion: builtin
    kind: NamespaceTransformer
    metadata:
      name: namespace-transformer
    namespace: test-lab-dev
    fieldSpecs:
      - path: metadata/namespace
        create: true
    ```

- **v3/kustomization.yaml**

    ```yaml
    resources:
      - ../base

    transformers:
      - transformers/namespace.yaml
    ```

Deploy and verify:

```bash
kubectl apply -k ./v3
kubectl get all -n test-lab-dev
```

All resources should be created inside the `test-lab-dev` namespace.




## CommonAnnotations Transformer 


Add common annotations to all resources for metadata tagging.

- **transformers/annotations.yaml**

    ```yaml
    apiVersion: builtin
    kind: AnnotationsTransformer
    metadata:
      name: annotations-transformer
    annotations:
      team: devops
      managed-by: kustomize
    fieldSpecs:
      - path: metadata/annotations
        create: true
    ```

- **v4/kustomization.yaml**

    ```yaml
    resources:
      - ../base

    transformers:
      - transformers/annotations.yaml
    ```

Deploy and verify:

```bash
kubectl apply -k ./v4
kubectl get deployment myapp -o yaml | grep -A 5 annotations
kubectl get service myapp-service -o yaml | grep -A 5 annotations
```

You should see annotations:

```yaml
annotations:
  managed-by: kustomize
  team: devops
```

