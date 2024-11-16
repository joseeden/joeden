---
title: "Labels, Selectors, and Annotations"
description: "Labels, Selectors, and Annotations"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 22
last_update:
  date: 7/7/2022
---

## Labels

Labels are key-value pairs attached to Kubernetes objects like Pods to organize and categorize resources. Labels are not unique across resources of the same kind.

- Identify resources based on categories like frontend or backend
- Do not need to be unique across resources of the same type
- Multiple Pods can have the same label, such as frontend

## Selectors

Label selectors are used to identify and filter Kubernetes objects based on their labels. They define conditions for label presence and values.

- Select objects based on label criteria
- Can filter Pods by labels, like "tier=frontend"
- Support complex matching conditions

## Annotations

Annotations are key-value pairs that store non-identifying metadata for Kubernetes objects. They cannot be used to select objects like labels.

- Used for non-identifying information like contact numbers
- Often utilized by client apps (e.g., kubectl) and extensions
- Cannot filter objects based on annotations


## Sample Lab

Below is an example manifest called `pods-labels.yml` that creates a namespace called **labels** and then create Pods in that namespace. Notice that each resource definitions are separated by a `---`.

```bash title="pods-labels.yml"
---
apiVersion: v1
kind: Namespace
metadata:
  name: labels 
---
apiVersion: v1
kind: Pod
metadata:
  name: red-frontend
  namespace: labels # declare namespace in metadata 
  labels: # labels mapping in metadata
    color: red
    tier: frontend
  annotations: # Example annotation
    Lab: Kubernetes Pod Design for Application Developers
spec:
  containers:
  - image: httpd:2.4.38
    name: web-server
---
apiVersion: v1
kind: Pod
metadata:
  name: green-frontend
  namespace: labels
  labels:
    color: green
    tier: frontend
spec:
  containers:
  - image: httpd:2.4.38
    name: web-server
---
apiVersion: v1
kind: Pod
metadata:
  name: red-backend
  namespace: labels
  labels:
    color: red
    tier: backend
spec:
  containers:
  - image: postgres:11.2-alpine
    name: db
---
apiVersion: v1
kind: Pod
metadata:
  name: blue-backend
  namespace: labels
  labels:
    color: blue
    tier: backend
spec:
  containers:
  - image: postgres:11.2-alpine
    name: db
---
apiVersion: v1
kind: Pod
metadata:
  name: no-color-backend
  namespace: labels
  labels:
    tier: backend
spec:
  containers:
  - image: postgres:11.2-alpine
    name: db
---
apiVersion: v1
kind: Pod
metadata:
  name: no-color-frontend
  namespace: labels
  labels:
    tier: backend
spec:
  containers:
  - image: postgres:11.2-alpine
    name: db
```

To create the resources: 

```bash 
kubectl apply -f pod-labels.yaml
```

Use the `get` command to list all Pods in the cluster. 

```bash
$ kubectl get pods

NAME                READY   STATUS    RESTARTS   AGE
blue-backend        1/1     Running   0          25s
green-frontend      1/1     Running   0          25s
no-color-backend    1/1     Running   0          25s
no-color-frontend   1/1     Running   0          25s
red-backend         1/1     Running   0          25s
red-frontend        1/1     Running   0          25s
```

Add the `-L` flag to display labels for each Pod.

```bash
$ kubectl get pods -L color,tier

NAME                READY   STATUS    RESTARTS   AGE   COLOR   TIER
blue-backend        1/1     Running   0          50s   blue    backend
green-frontend      1/1     Running   0          50s   green   frontend
no-color-backend    1/1     Running   0          50s           backend
no-color-frontend   1/1     Running   0          50s           backend
red-backend         1/1     Running   0          50s   red     backend
red-frontend        1/1     Running   0          50s   red     frontend
```

Use `-l` to filter Pods by specific labels, such as showing only those with the "color" label. 

```bash
$ kubectl get pods -L color,tier -l color 

NAME             READY   STATUS    RESTARTS   AGE   COLOR   TIER
blue-backend     1/1     Running   0          75s   blue    backend
green-frontend   1/1     Running   0          75s   green   frontend
red-backend      1/1     Running   0          75s   red     backend
red-frontend     1/1     Running   0          75s   red     frontend
```

Filter Pods that do not have the "color" label by using `!color`.


```bash
$ kubectl get pods -L color,tier -l '!color'

NAME                READY   STATUS    RESTARTS   AGE   COLOR   TIER
no-color-backend    1/1     Running   0          96s           backend
no-color-frontend   1/1     Running   0          96s           backend
```

Use `=` to filter Pods with a specific label value, such as "red".

```bash
$ kubectl get pods -L color,tier -l color=red

NAME           READY   STATUS    RESTARTS   AGE     COLOR   TIER
red-backend    1/1     Running   0          2m36s   red     backend
red-frontend   1/1     Running   0          2m36s   red     frontend
```

Multiple conditions can also be set for filtering:

```bash
$ kubectl get pods -L color,tier -l 'color=red,tier!=frontend'

NAME          READY   STATUS    RESTARTS   AGE     COLOR   TIER
red-backend   1/1     Running   0          4m17s   red     backend
```

Use the `in` condition to specify allowed values, and `notin` to specify disallowed values.

```bash
$ kubectl get pods -L color,tier -l 'color in (blue,green)'

NAME             READY   STATUS    RESTARTS   AGE     COLOR   TIER
blue-backend     1/1     Running   0          5m32s   blue    backend
green-frontend   1/1     Running   0          5m32s   green   frontend 
```

To view annotations, use the `describe` command.

```bash
$ kubectl describe pod red-frontend | grep Annotations -A 2

Annotations:  Lab: Kubernetes Pod Design for Application Developers
              cni.projectcalico.org/podIP: 192.168.23.130/32
              cni.projectcalico.org/podIPs: 192.168.23.130/32
```

To remove an annotation, use the `annotate` command followed by the annotation name and a dash (-).

```bash
kubectl annotate pod red-frontend Lab-
```

The "Lab: Kubernetes Pod Design for Application Developers" should now be removed.

```bash
$ kubectl describe pod red-frontend | grep Annotations -A 2

Annotations:  cni.projectcalico.org/podIP: 192.168.23.130/32
              cni.projectcalico.org/podIPs: 192.168.23.130/32
```

## Resources 

- [Kubernetes Pod Design for Application Developers: Labels, Selectors, and Annotations](https://cloudacademy.com/lab/kubernetes-pod-design-application-developers-labels-selectors-and-annotations/?context_id=888&context_resource=lp)



 

 
