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

- Github repo: [joseeden/test-kustomize-labs](https://github.com/joseeden/test-kustomize-labs/tree/master)

Clone and move into the project directory:

```bash
git clone https://github.com/joseeden/test-kustomize-labs.git 
cd code-samples/04-transformers/common-transformers
```

Project directory structure:

```bash
├── base
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── base-img
│   ├── deployment.yaml
│   └── kustomization.yaml
├── base-v3
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── v1
│   ├── kustomization.yaml
│   └── transformers
│       └── label.yaml
├── v2
│   ├── kustomization.yaml
│   └── transformers
│       └── name-prefix.yaml
├── v3
│   └── kustomization.yaml
├── v4
│   ├── kustomization.yaml
│   └── transformers
│       └── annotations.yaml
├── v5
│   └── kustomization.yaml
├── v5-b
│   └── kustomization.yaml
└── v5-c
    └── kustomization.yaml
```


## Label Transformer

Use this when you want to add detailed labels with control over where they are applied.

- **v1/transformers/label.yaml**

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

- **v2/transformers/name-prefix.yaml**

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

:::info 

You can define the transformer either as in-line configuration, through a separate config file, or through using convenience fields.

For more information, please see [Ways to Define Transformers](/docs/015-Kubernetes-Tools/039-Kustomize/016-Transformers.md#ways-to-define-transformers)

:::

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

In this example, we'll use the config files in the `v4` folder:

- **v4/transformers/annotations.yaml**

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

Create the namespace for the resources:

```bash
kubectl create ns test-lab-v4 
```

Deploy the resources:

```bash
kubectl apply -k ./v4 -n test-lab-v4 
```

Then verify:

```bash
kubectl get deployment myapp -n test-lab-v4  -o yaml | grep -A 5 annotations
kubectl get service myapp-service -n test-lab-v4  -o yaml | grep -A 5 annotations
```

You should see annotations:

```yaml
annotations:
  managed-by: kustomize
  team: devops
```

## Image Transformer 

We can use an image transformer to change container images or just their tags in Kubernetes manifests.

- Can update image name or tag
- Helps manage different environments

This lets you avoid editing YAML files directly and keeps things cleaner.

### Replace Image Name

We can change the container image from one to another, like from NGINX to HAProxy.

- Use `name` to match the original image
- Use `newName` to set the new image

In this example, we'll use the base configs in the `base-img` folder:

```bash
base-img
├── deployment.yaml
├── kustomization.yaml
```

The base configs:

- **base-img/deployment.yaml**

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: web
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: web
      template:
        metadata:
          labels:
            app: web
        spec:
          containers:
            - name: web
              image: nginx
    ```

- **base-img/kustomization.yaml**

    ```yaml
    resources:
      - deployment.yaml
    ```

The transformers are defined in the `v5` folder:

- **v5/kustomization.yaml**

    ```yaml
    resources:
    - ../base-img

    images:
      - name: nginx
        newName: haproxy
    ```

Create the namespace first:

```bash
kubectl create ns test-lab-v5
```

Next, apply the overlay config in `v5`:

```bash
kubectl apply -k ./v5 -n test-lab-v5
```

After applying the changes, the image in your deployment becomes `haproxy`.

```bash
$ kubectl describe deployment web -n test-lab-v5 | grep "Pod Template" -A 5

Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:         haproxy
    Port:          <none>
```

As an additional test, you can update the `v5/kustomization.yaml` to use `nginx` again:

```yaml
resources:
- ../base-img

images:
  - name: haproxy
    newName: nginx
```

And then apply the changes:

```bash
kubectl apply -k ./v5 -n test-lab-v5
```

The image should now switch back to `nginx`:

```bash
```bash
$ kubectl describe deployment web -n test-lab-v5 | grep "Pod Template" -A 5

Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:         nginx
    Port:          <none>
``` 

### Replace Image Tag Only

If you want to keep the image but change the tag, you can just use `newTag`.

- Use `name` to match the image
- Use `newTag` to change the version

This is useful when promoting a new version without changing the image base.

In this example, we'll still use the base config in `base-img`, but we'll use the transformer defined in `v5-b/kustomization.yaml':

```yaml
resources:
- ../base-img

images:
  - name: nginx
    newTag: "2.4"
```

Apply the changes:

```bash
kubectl apply -n test-lab-v5 -k ./v5-b
```

Now your image becomes `nginx:2.4`.

```bash
$ kubectl describe deployment web -n test-lab-v5 | grep "Pod Template" -A 5 

Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:         nginx:2.4
    Port:          <none>
```

If you'd like to play around, you can update the `v5-b/kustomization.yaml' and use a different tag:

```yaml
images:
  - name: nginx
    newTag: "2.4.10-staging"
```

Apply the changes once again:

```bash
kubectl apply -n test-lab-v5 -k ./v5-b
```

The image tag will now be set to `nginx:2.4.10-staging`.

```bash
Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:         nginx:2.4.10-staging
    Port:          <none>
```


### Replace Both Image and Tag

Finally, you can change both image name and tag in one go.

- Use both `newName` and `newTag` together
- Applies changes across all matching containers

The `v5-c/kustomization.yaml`:

```yaml
resources:
- ../base-img

images:
  - name: nginx
    newName: haproxy
    newTag: "3.0-most-latest"
```

Apply the changes:

```bash
kubectl apply -n test-lab-v5 -k ./v5-c
```

The final result will be `haproxy:3.0-most-latest`.

```bash
$ kubectl describe deployment web -n test-lab-v5 | grep "Pod Template" -A 5 

Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:         haproxy:3.0-most-latest
    Port:          <none>
```

This makes it simple to manage deployments across multiple environments by keeping all image changes in one place.


### Image Name vs Container Name

Be careful not to confuse `image` names with `container` names.

- `name` in `kustomization.yaml` refers to the image name
- `name` in the pod spec is the container name

Even if the container name is `web`, Kustomize looks only at the image (`nginx` in this case).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx 
```


## Cleanup 

To remove the resources across all the created namespaces:

```bash
kubectl delete all --all -n test-lab-dev
kubectl delete all --all -n test-lab-v1
kubectl delete all --all -n test-lab-v2
kubectl delete all --all -n test-lab-v3
kubectl delete all --all -n test-lab-v4
kubectl delete all --all -n test-lab-v5
```

You can then delete the namespaces by repeating the `delete all` command multiple times, or you can also define the namespaces in this way:

```bash
kubectl delete ns test-lab-{dev,v1,v2,v3,v4,v5}
```

Output:

```bash
namespace "test-lab-v1" deleted
namespace "test-lab-v2" deleted
namespace "test-lab-v3" deleted
namespace "test-lab-v4" deleted
namespace "test-lab-v5" deleted
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