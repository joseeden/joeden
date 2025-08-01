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

These `e simple fields you can set in your `kustomization.yaml`. They appl`to every resource listed under `resources`.

:::info 

You will need a Kubernetes cluster to try out the examples.
To setup a basic cluster, you can use [k3d](/docs/015-Containerization/020-Kubernetes/011-Setting-Up-Kubernetes-using-k3d.md).

:::

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

The base configs:

- **base/deployment.yaml**

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: myapp
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: myapp
      template:
        metadata:
          labels:
            app: myapp
        spec:
          containers:
          - name: myapp
            image: nginx:stable
            ports:
            - containerPort: 80

    ```

- **base/service.yaml**

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: myapp-service
    spec:
      selector:
        app: myapp
      ports:
        - protocol: TCP
          port: 80
          targetPort: 80
    ```

- **base/kustomization.yaml**

    ```yaml
    resources:
      - deployment.yaml
      - service.yaml
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

Create the namespace and deploy the resources.

```bash
kubectl create ns test-lab-v1 
kubectl -n test-lab-v1 apply  -k ./v1
```


Check that both Deployment and Service have labels: `environment=dev` and `version=v1`.

```bash
$ kubectl -n test-lab-v1 get deployment myapp --show-labels

NAME    READY   UP-TO-DATE   AVAILABLE   AGE   LABELS
myapp   1/1     1            1           45s   environment=dev,version=v1
```
```bash
$ kubectl -n test-lab-v1 get service myapp-service --show-labels

NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   LABELS
myapp-service   ClusterIP   10.43.174.62   <none>        80/TCP    91s   environment=dev,version=v1
```


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

Create the namespace and deploy the resources.


```bash
kubectl create ns test-lab-v2 
kubectl -n test-lab-v2 apply  -k ./v2
```

You should see resources named `v2-myapp` and `v2-myapp-service`.

```bash
$ kubectl -n test-lab-v2 get all

NAME                           READY   STATUS    RESTARTS   AGE
pod/v2-myapp-86bcdfd4f-x5k77   1/1     Running   0          2m10s

NAME                       TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
service/v2-myapp-service   ClusterIP   10.43.72.62   <none>        80/TCP    2m10s

NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/v2-myapp   1/1     1            1           2m10s

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/v2-myapp-86bcdfd4f   1         1         1       2m10s
```


## Namespace Transformer 

Namespace Transformers are used to set all resources under a specific namespace.

In this example, we’ll use the configs from `base-v3` instead of `base`, since `base` was already deployed earlier using the overlays in `v1` and `v2`.

:::info 

**Keep in mind:** If a Deployment or Service already exists in the default namespace, applying it in another namespace (e.g. test-lab-dev) won't remove the original.

:::

```bash
base-v3/
├── deployment.yaml
├── kustomization.yaml
└── service.yaml
```

Also, in this example, we are not using a separate configuration file to define the namespace transformer (or the new namespace). Instead, it is defined in-line in the `kustomization.yaml` file.

**v3/kustomization.yaml**

```yaml
resources:
  - ../base-v3

namespace: test-lab-dev
```

A few notes about the namespace: 

- The namespace field in `kustomization.yaml` does not create the namespace.
- The `NamespaceTransformer` also does not create the namespace.

Having said, you must manually create the namespace before applying the overlay

```bash
kubectl create ns test-lab-dev 
```

Then deploy the changes:

```bash
kubectl apply  -k ./v3
```

All resources should be created inside the `test-lab-dev` namespace.

```bash
$ kubectl get all -n test-lab-dev
NAME                            READY   STATUS    RESTARTS   AGE
pod/v3-myapp-677c5b7585-8jp6c   1/1     Running   0          17s

NAME                       TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
service/v3-myapp-service   ClusterIP   10.43.29.72   <none>        80/TCP    17s

NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/v3-myapp   1/1     1            1           17s

NAME                                  DESIRED   CURRENT   READY   AGE
replicaset.apps/v3-myapp-677c5b7585   1         1         1       17s
```


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

## Cleanup 

To remove the resources across all the created namespaces:

```bash
kubectl delete all --all -n test-lab-dev
kubectl delete all --all -n test-lab-v1
kubectl delete all --all -n test-lab-v2
```

Then delete the namespaces:

```bash
kubectl delete ns test-lab-{dev,v1,v2}
```

Output:

```bash
namespace "test-lab-dev" deleted
namespace "test-lab-v1" deleted
namespace "test-lab-v2" deleted
```

Confirm that all the custom namespaces are deleted:

```bash
$ kubectl get ns

NAME              STATUS   AGE
default           Active   19h
kube-node-lease   Active   19h
kube-public       Active   19h
kube-system       Active   19h
```