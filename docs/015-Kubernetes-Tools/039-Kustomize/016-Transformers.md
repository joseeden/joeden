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

Transformers let you apply changes across Kubernetes YAML files without editing each one manually.

- Built into Kustomize
- Help apply consistent changes to all resources
- Avoid repetitive edits in multiple YAML files

Instead of modifying every file, you define transformations once, and Kustomize applies them automatically.

:::info 

You will need a Kubernetes cluster to try out the examples.

To setup a basic cluster, you can use [k3d](/docs/015-Containerization/020-Kubernetes/011-Setting-Up-Kubernetes-using-k3d.md).

:::


## Clone the Repository  

To try out the examples in the succeeding sections, clone the project repository from GitHub. 

- Github repo: [joseeden/test-kustomize-labs](https://github.com/joseeden/test-kustomize-labs/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/test-kustomize-labs.git 
cd code-samples/04-transformers/basic-sample
```

Project directory structure:

```bash
basic-sample
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1
│   ├── kustomization.yaml
│   ├── transformers
│   │   ├── label.yaml
│   │   └── name-prefix.yaml
│   └── v1-results.yaml
├── v2
│   ├── kustomization.yaml
│   └── v2-result.yaml
└── v3
    └── kustomization.yaml
```



## Defining Transformers/Generators

You can define transformers in three main ways:

- Use a **separate configuration file**
- Use **inline configuration** inside the `kustomization.yaml`
- Use **convenience fields** like `namePrefix`, `commonLabels`, etc.

:::info 

You can use all three of these methods when setting up generators too.

::: 


## Using a Configuration File

Instead of adding everything to one file, you can separate your transformer settings into their own YAML files. This makes your configuration cleaner and easier to manage.

In this example, the `base` folder holds the main Kubernetes resources. The `v1` folder is a versioned overlay that adds custom transformations.

```
basic-sample
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

## Using an Inline Configuration

Instead of a separate file, you can also declare the transformer inline.

In this example, we are still using the same base configs in the `base` folder.  The `v2` folder is a versioned overlay that adds custom transformations.

```
basic-sample
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1
├── v2
│   ├── kustomization.yaml
```

The entire transformer configuration can simply added in the Kustomization files. This way, you only manage a single file.

```yaml
resources:
  - ../base

transformers:
  - |
    apiVersion: builtin
    kind: PrefixTransformer
    metadata:
      name: inline-prefix
    prefix: v2-inline-
    fieldSpecs:
      - path: metadata/name
```

:::info 

Inline config is flexible for quick edits, but requires careful indentation.

:::

Run the `build` command to see the expected YAML files:

```bash
kustomize build ./v2 > ./v2/v2-result.yaml
```

Open the `v2-result.yaml` and check the `metadata.name` fields. It should now have the prefix `v1-` added.

```yaml
metadata:
  name: v2-inline-wordpress
```

To apply the actual changes, create the namespace first:

```bash
kubectl create ns test-lab-v2 
```

Then apply the changes:

```bash
kubectl apply -k ./v2 -n test-lab-v2
```

The resources should have the prefix `v2-inline-` prefix.

```bash
$ kubectl get all -n test-lab-v2

NAME                                      READY   STATUS    RESTARTS   AGE
pod/v2-inline-wordpress-c456476df-r4sjx   1/1     Running   0          5s

NAME                          TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/v2-inline-wordpress   NodePort   10.43.155.219   <none>        80:30001/TCP   5s

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/v2-inline-wordpress   1/1     1            1           5s

NAME                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/v2-inline-wordpress-c456476df   1         1         1       5s
```

## Using Convenience Fields

Instead of writing a custom transformer or inline config, you can use simple built-in fields like namePrefix.

- namePrefix adds a prefix to all resource names
- No need for extra files or complex setup

In this example, we'll use the `v3` files:

```
basic-sample
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1
├── v2
├── v3
│   ├── kustomization.yaml
```

Unlike inline configurations that define custom transformers manually, you can just use simple fields like `namePrefix`.

```yaml
namePrefix: v3-convenience-

resources:
  - ../base
```

:::info 

To update suffixes, use `nameSuffix` instead.

:::


Run the `build` command to see the expected YAML files:

```bash
kustomize build ./v3 > ./v3/v3-result.yaml
```

In the `v3-result.yaml`, you should see this in the `metadata` sections.

```yaml
metadata:
  name: v1-convenience-wordpress
```

To apply the actual changes, create the namespace first:

```bash
kubectl create ns test-lab-v3 
```

Then apply the changes:

```bash
kubectl apply -k ./v3 -n test-lab-v3
```

You’ll see:

```bash
service/v3-convenience-wordpress created
deployment.apps/v3-convenience-wordpress created
```

Verify:

```bash
$ kubectl get pods -n test-lab-v3

NAME                                       READY   STATUS              RESTARTS   AGE
v3-convenience-wordpress-c456476df-w9fk5   1/1     Running             0          76s
```

```bash
$ kubectl get services -n test-lab-v3

NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
v3-convenience-wordpress   NodePort   10.43.209.123   <none>        80:30001/TCP   81s
```



## Cleanup 

To remove the resources across all the created namespaces:

```bash
kubectl delete all --all -n test-lab-v1
kubectl delete all --all -n test-lab-v2
kubectl delete all --all -n test-lab-v3
```

Then delete the namespaces:

```bash
kubectl delete ns test-lab-{v1,v2,v3}
```

Output:

```bash
namespace "test-lab-v1" deleted
namespace "test-lab-v2" deleted
namespace "test-lab-v3" deleted
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