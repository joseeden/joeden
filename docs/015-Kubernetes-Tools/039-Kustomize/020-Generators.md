---
title: "Generators"
description: "Generators"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 20
last_update:
  date: 4/19/2022
---

## Overview 

Generators are used to create new Kubernetes resources automatically.

- Used to create config maps and secrets
- Can be written inline or defined in a YAML file
- Support advanced settings like behavior and naming

Generators help you generate multiple resources easily without creating each file manually.


:::info 

You will need a Kubernetes cluster to try out the examples.

To setup a basic cluster, you can use [k3d](/docs/015-Containerization/020-Kubernetes/011-Setting-Up-Kubernetes-using-k3d.md).

:::


## Clone the Repository  

To try out the examples in the succeeding sections, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-kustomize](https://github.com/joseeden/labs-kustomize/tree/master)

Clone the repository:

```bash
git clone https://github.com/joseeden/labs-kustomize.git 
```

<!-- Project directory structure:

```bash

``` -->

## Before Generators 



## Common Generators

Kustomize mainly uses two types of generators:

- **ConfigMapGenerator** creates one or more ConfigMaps
- **SecretGenerator** creates Kubernetes Secrets

Here’s a simple config map generator:

```yaml
configMapGenerator:
  - name: app-config
    behavior: create
    files:
      - app.properties
    literals:
      - mode=dev
```

This will create a ConfigMap named `app-config` with values from both file and literal inputs.

- `name` sets the name of the generated config map
- `behavior` defines how to treat existing config maps
- `files` and `literals` allow data to come from files or inline

You can also generate multiple ConfigMaps:

```yaml
configMapGenerator:
  - name: app-config
    behavior: create
    files:
      - app.properties
    literals:
      - mode=dev
  - name: test-config
    behavior: merge
    files:   
  - name: dev-config
    behavior: merge
    literals:  
```
 
To learn more, please see [ConfigMap Generators.](#configmap-generators) 

## Defining Generators/Transformers

Generators are defined just like transformers. You can set them up in a few simple ways:

- Use a separate configuration file  
- Write them as inline YAML  
- Use convenience fields provided by Kustomize

:::info 

You can use all three of these methods when setting up generators too.

::: 

For more information, please see [Defining Transformers/Generators.](/docs/015-Kubernetes-Tools/039-Kustomize/016-Transformers.md#defining-transformersgenerators)



## ConfigMap Generators



## Secret Generators

Secrets are generated similarly, but values must be base64 encoded:

```yaml
secretGenerator:
  - name: app-secret
    type: Opaque
    files:
      - username.txt
      - password.txt
```

Where: 

- `type` is optional but recommended (default is Opaque)
- Values from files become keys inside the secret


## Behavior Field

The `behavior` field controls what happens if the config map already exists.

- `create` makes a new one
- `merge` adds new values to existing
- `replace` fully replaces any existing version

Use this to manage how your customizations affect the base configuration.

## Generator Options

You can use `generatorOptions` in your `kustomization.yaml` to control generator behavior globally.

```yaml
generatorOptions:
  disableNameSuffixHash: true
  labels:
    env: dev
  annotations:
    owner: ops-team
```

This will: 

- Disables random suffix added to generated resources
- Applies the same labels and annotations to all generated items

These settings help ensure consistent metadata and stable resource names.
