---
title: "Managing Directories"
description: "Managing Directories"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 15
last_update:
  date: 4/19/2022
---


## The Problem with Too Many YAML Files

When all YAML files are in one folder, applying them is easy. For example:

```
project-abc/
├── api-deployment.yaml
├── api-service.yaml
├── db-deployment.yaml
└── db-service.yaml
```

You can apply all these YAMLs at once using:

```bash
kubectl apply -f project-abc/
```

As the number of YAML files grows, keeping them in one place becomes messy. It's best to split them into subdirectories for better organization:

```
project-abc-configs/
├── api/
│   ├── deployment.yaml
│   └── service.yaml
├── db/
│   ├── deployment.yaml
│   └── service.yaml
├── ingress/
│   └── ingress.yaml
└── config/
    └── configmap.yaml
```


## The Drawback of Subdirectories

Once files are moved into subdirectories, you need to apply each folder separately.

- Run `kubectl apply -f project-abc/api` 
- Then run `kubectl apply -f project-abc/db` and so on
- Must repeat for each new subdirectory
- Adds effort every time you update or deploy

This makes automation harder and wastes time as your project scales.

## Using `Kustomization.yaml` in Root

You can solve the issue of repeated `kubectl` by adding a `kustomization.yaml` file in your root `project-abc/` directory.

```
project-abc-configs/
├── kustomization.yaml
├── api/
│   ├── deployment.yaml
│   └── service.yaml
└── db/
    ├── deployment.yaml
    └── service.yaml
```

In the `kustomization.yaml`, you need to list all YAML files using their relative paths:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 

resources:
  - api/deployment.yaml
  - api/service.yaml
  - db/deployment.yaml
  - db/service.yaml
```

This helps keep things manageable and modular, especially in larger projects. To apply the resources:

```bash
kubectl apply -k project-abc
```


## Nested Kustomization Files

As the number of directories grows, the root `kustomization.yaml` becomes too long and messy. Consider the files below:

```
project-abc-configs/
├── kustomization.yaml
├── api/
│   ├── deployment.yaml
│   └── service.yaml
├── db/
│   ├── deployment.yaml
│   └── service.yaml
├── kafka/
│   ├── deployment.yaml
├── cache/
│   ├── deployment.yaml
├── ingress/
│   └── ingress.yaml
└── config/
    └── configmap.yaml
```

We can add add all the paths to the root `kustomization.yaml`, but it becomes error-prone and difficult to organize:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 

resources:
  - api/deployment.yaml
  - api/service.yaml
  - db/deployment.yaml
  - db/service.yaml
  - kafka/deployment.yaml
  - cache/deployment.yaml
  - ingress/ingress.yaml
  - config/configmap.yaml
```

Even though this works, it’s no longer neat or scalable. Instead of listing every YAML in the root file, add a `kustomization.yaml` inside each subfolder.

```
project-abc-configs/
├── kustomization.yaml
├── api/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── db/
│   ├── deployment.yaml
│   ├── kustomization.yaml
│   └── service.yaml
├── kafka/
│   ├── deployment.yaml
│   ├── kustomization.yaml
├── cache/
│   ├── deployment.yaml
│   ├── kustomization.yaml
├── ingress/
│   └── ingress.yaml
│   ├── kustomization.yaml
└── config/
    └── configmap.yaml
    └── kustomization.yaml
```

The root `kustomization.yaml` only needs to point to the folder names:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 

resources:
  - api
  - db
  - kafka
  - cache
  - ingress 
  - config
```

The Kustomization file for each subfolder will just need to list the YAML files only for that folder. For example:

- `project-abc/api/kustomization.yaml`:

    ```yaml
    resources:
      - deployment.yaml
      - service.yaml
    ```

- `project-abc/db/kustomization.yaml`:

    ```yaml
    resources:
      - deployment.yaml
      - service.yaml
    ```

- `project-abc/kafka/kustomization.yaml`:

    ```yaml
    resources:
      - deployment.yaml
    ```

- `project-abc/cache/kustomization.yaml`:

    ```yaml
    resources:
      - deployment.yaml
    ```

- `project-abc/ingress/kustomization.yaml`:

    ```yaml
    resources:
      - ingress.yaml
    ```

- `project-abc/config/kustomization.yaml`:

    ```yaml
    resources:
      - configmap.yaml
    ```

Kustomize will look into each folder and build everything based on these nested files.


## Deploy Everything

After setting it up, you only need one command to deploy all:

```bash
kustomize build project-abc | kubectl apply -f -
```

Or with kubectl only:

```bash
kubectl apply -k project-abc
```

This keeps your setup clean and scalable, no matter how many subdirectories you add later.
