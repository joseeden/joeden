---
title: "Custom Resource"
description: "Custom Kuberenetes resource types"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 43
last_update:
  date: 7/7/2022
---

## Custom Resource 

A Custom Resource (CR) is an extension of the Kubernetes API that allows new resource types.

- Specialized configurations for specific applications
- Automation of complex tasks through custom objects
- Extends Kubernetes functionality without core modifications


## CRD Manifest 

Below is an example Custom Resource Definition (CRD):

- Name: `internals.datasets.kodekloud.com`
- Group: `datasets.kodekloud.com`
- Scope: Namespaced, meaning it’s only accessible within a specific namespace.

```yaml
## crd.yaml 
---
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: internals.datasets.kodekloud.com 
spec:
  group: datasets.kodekloud.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                internalLoad:
                  type: string
                range:
                  type: integer
                percentage:
                  type: string
  scope: Namespaced 
  names:
    plural: internals
    singular: internal
    kind: Internal
    shortNames:
    - int
```

After creating the CRD, you can define custom resources based on it:

```yaml
## custom.yaml  
---
kind: Internal
apiVersion: datasets.kodekloud.com/v1
metadata:
  name: internal-space
  namespace: default
spec:
  internalLoad: "high"
  range: 80
  percentage: "50"
```


Ensure both files are ready:

```bash
controlplane ~ ➜  ls -l
total 8
-rw-rw-rw- 1 root root 678 Jan  6 01:56 crd.yaml
-rw-rw-rw- 1 root root 171 Dec  1 06:17 custom.yaml
```

Create the CRD first, followed by the custom resource:

- Apply the `crd.yaml`:

  ```bash
  kubectl apply -f crd.yaml 
  ```

  Output: 

  ```bash 
  customresourcedefinition.apiextensions.k8s.io/internals.datasets.kodekloud.com created
  ```

- Apply the `custom.yaml`:

  ```bash 
  kubectl apply -f custom.yaml 
  ```

  Output: 

  ```bash 
  internal.datasets.kodekloud.com/internal-space created
  ```

Verify CRDs:

```bash
kubectl get crd
```

Output:
    
```bash 
NAME                               CREATED AT
collectors.monitoring.controller   2024-01-06T06:20:57Z
globals.traffic.controller         2024-01-06T06:20:58Z
internals.datasets.kodekloud.com   2024-01-06T07:00:06Z
```

## Example: Datacenter Resource 

Define another custom resource, `datacenter`, with `apiVersion` set to `traffic.controller/v1`. Set `dataField` length to 2 and `access` permission to `true`:

```yaml
## datacenter.yaml
kind: Global 
apiVersion: traffic.controller/v1
metadata:
  name: datacenter
spec:
  dataField: 2
  access: true
```

Create the resource:

```bash
kubectl apply -f datacenter.yaml 
```

Output:
    
```bash 
global.traffic.controller/datacenter created 
```

Check the created resource:

```bash
kubectl get global
```

Output:
    
```bash 
NAME         AGE
datacenter   64s 
```

 

 
