---
title: "Transformers"
description: "Transformers"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 16
last_update:
  date: 4/19/2022
---


## Overview

Transformers allow you to modify Kubernetes resources declaratively and consistently without altering your original YAML files.

- Kustomize provides several built-in transformers
- Useful for applying consistent changes to resources 

You can define transformers in three main ways:

- Use a **separate configuration file**
- Use **inline configuration** inside the `kustomization.yaml`
- Use **convenience fields** like `namePrefix`, `commonLabels`, etc.


## Clone the Repository  

To try out the examples, clone the project repository from GitHub. It contains a structured set of Kustomize samples demonstrating transformers in action.

- Github repo: [joseeden/test-kustomize-labs](https://github.com/joseeden/test-kustomize-labs/tree/master/code-samples/03-multi-tier-app)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/test-kustomize-labs.git 
cd code-samples/04-transformers/wordpress
```

Project directory structure:

```bash
wordpress
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1
│   ├── cleanup.sh
│   ├── kustomization.yaml
│   └── transformers
│       ├── label.yaml
│       └── name-prefix.yaml
├── v2
│   └── kustomization.yaml
└── v3
    ├── kustomization.yaml
    └── mysql
        ├── deployment.yaml
        ├── kustomization.yaml
        ├── secret.yaml
        └── service.yaml
```

## Ways to Define Transformers

### Using a Configuration File

Instead of adding everything to one file, you can separate your transformer settings into their own YAML files. This makes your configuration cleaner and easier to manage.

In this example, we have a `base` folder with the core Kubernetes resources. Then, we create a versioned overlay in a folder called `v1`, which applies custom transformations like adding prefixes and labels.

```
wordpress
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1
│   ├── cleanup.sh
│   ├── kustomization.yaml
│   └── transformers
│       ├── label.yaml
│       └── name-prefix.yaml
```

The `v1/kustomization.yaml` file:

- Points to `base` directory as the source of the main configs
- Applies the two transformers

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

commonLabels:
  version: v1

resources:
- ../base

transformers:
- ./transformers/name-prefix.yaml
- ./transformers/label.yaml
```

The two transformers:

- The `transformers/name-prefix.yaml` adds the `v1-` prefix to the `metadata.name` field of each resource:

    ```yaml
    apiVersion: builtin
    kind: PrefixSuffixTransformer
    metadata:
      name: my-prefix-transformer
    prefix: v1-
    # suffix: -transformers
    fieldSpecs:
    - path: metadata/name
    ```

- The `transformers/label.yaml` file adds custom labels to the resources:

    ```yaml
    apiVersion: builtin
    kind: LabelTransformer
    metadata:
      name: my-label-transformer
    labels:
      version: v1
      environment: dev
    fieldSpecs:
    - path: metadata/labels
      create: true
    ```

Before applying the overlay in `v1`, create the namespace first:

```bash
kubectl create ns test-lab-v1 
```

To preview the rendered resources without applying them, run a dry-run build using the command below. This generates the final YAML and saves it to `v1-results.yaml`.

```bash
kustomize build ./v1 > ./v1/v1-results.yaml 
```

To deploy the resources using Kustomize:

```bash
kubectl apply -n test-lab-v1  -k ./v1 
```

Output:

```bash
service/v1-wordpress created
deployment.apps/v1-wordpress created 
```

You can verify the prefix was applied by checking the created resources:

```yaml
$ kubectl get all -n test-lab-v1
NAME                                READY   STATUS    RESTARTS   AGE
pod/v1-wordpress-787fb8d554-2d25z   1/1     Running   0          23m

NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/v1-wordpress   NodePort   10.43.20.175   <none>        80:30001/TCP   23m

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/v1-wordpress   1/1     1            1           23m

NAME                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/v1-wordpress-787fb8d554   1         1         1       23m
```

To check if the labels are applied:

```bash
$ kubectl get all -n test-lab-v1 --show-labels
NAME                                READY   STATUS    RESTARTS   AGE   LABELS
pod/v1-wordpress-787fb8d554-2d25z   1/1     Running   0          24m   app=wordpress,pod-template-hash=787fb8d554,version=v1

NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE   LABELS
service/v1-wordpress   NodePort   10.43.20.175   <none>        80:30001/TCP   24m   app=wordpress,environment=dev,version=v1

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE   LABELS
deployment.apps/v1-wordpress   1/1     1            1           24m   app=wordpress,environment=dev,version=v1

NAME                                      DESIRED   CURRENT   READY   AGE   LABELS
replicaset.apps/v1-wordpress-787fb8d554   1         1         1       24m   app=wordpress,pod-template-hash=787fb8d554,version=v1
```

Notice that the Pod and ReplicaSet are missing the `environment=dev label`. This is because the `LabelTransformer` is adding labels at the `Deployment` level:

```yaml
fieldSpecs:
- path: metadata/labels
  create: true
```

ReplicaSets and Pods are generated by the **Deployment controller**, and they inherit labels defined in the `spec.template.metadata.labels`, not `metadata.labels`.

If you want to propagate the labels to the Pods and ReplicaSets, you can update the `transformers/label.yaml`:

```yaml
fieldSpecs:
- path: metadata/labels
  create: true
- path: spec/template/metadata/labels
  create: true
  kind: Deployment
```

Then rebuild your manifests and apply again:

```bash
kustomize build ./v1 > ./v1/v1-results.yaml
kubectl apply -f ./v1/v1-results.yaml
```

You should now see `environment=dev` and `version=v1` on all resources, including the Pods and ReplicaSets.

```bash
$ kubectl get all -n test-lab-v1 --show-labels
NAME                                READY   STATUS    RESTARTS   AGE    LABELS
pod/v1-wordpress-789ffff48b-smpcd   1/1     Running   0          100s   app=wordpress,environment=dev,pod-template-hash=789ffff48b,version=v1

NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE   LABELS
service/v1-wordpress   NodePort   10.43.20.175   <none>        80:30001/TCP   33m   app=wordpress,environment=dev,version=v1

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE   LABELS
deployment.apps/v1-wordpress   1/1     1            1           33m   app=wordpress,environment=dev,version=v1

NAME                                      DESIRED   CURRENT   READY   AGE    LABELS
replicaset.apps/v1-wordpress-789ffff48b   1         1         1       100s   app=wordpress,environment=dev,pod-template-hash=789ffff48b,version=v1 
```

### Using an Inline Configuration

Instead of a separate file, you can also declare the transformer inline.

Example:

```yaml
resources:
  - ../../base

transformers:
  - |
    apiVersion: builtin
    kind: PrefixTransformer
    metadata:
      name: inline-prefix
    prefix: v1-inline-
    fieldSpecs:
      - path: metadata/name
```

Run:

```bash
kustomize build . > result.yaml
```

Expected output:

```yaml
metadata:
  name: v1-inline-wordpress
```

Inline config is flexible for quick edits, but requires careful indentation.

### Using Convenience Fields

You can skip custom transformer files by using built-in fields like `namePrefix`.

Example:

```yaml
namePrefix: v1-convenience-

resources:
  - ../../base
```

Run:

```bash
kustomize build . > result.yaml
```

Output:

```yaml
metadata:
  name: v1-convenience-wordpress
```

This is the simplest way to apply a prefix or suffix to resource names.

Once your transformer is set up and tested, apply it to your cluster:

```bash
kubectl apply -k .
```

You’ll see:

```
service/v1-convenience-wordpress created
deployment.apps/v1-convenience-wordpress created
```

Verify:

```bash
kubectl get pods
kubectl get services
```

This approach helps you manage different versions or environments using consistent naming and overlays.
