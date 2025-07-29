---
title: "Helm as Alternative"
description: "Using Helm as an Alternative"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
- Helm
sidebar_position: 11
last_update:
  date: 4/19/2022
---


## Helm for Kubernetes Configuration

Helm is another tool used to manage Kubernetes configs across environments. It's more powerful than Kustomize, but also more complex.

- Uses variables and templates
- Lets you reuse configs for multiple environments
- Works like a package manager for Kubernetes

Helm makes it easier to customize settings like image versions or replica counts without rewriting full files. Instead of editing raw YAML, you use variables that get replaced at deploy time.

## How Helm Templates Work

Helm uses a special format called Go Templates to define variables inside YAML files.

- Variables look like `{{ .Values.<name> }}`
- These variables are replaced using values from a `values.yaml` file
- You can have different values files for each environment

This lets you define a single config and customize it with just a few values.

**Example:**

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: my-app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

You don’t hard-code values like the number of replicas or image version. Instead, you set them in a separate file.

## Setting Values Per Environment

To assign actual values to the variables, you create separate `values.yaml` files.

- `values.dev.yaml` for dev
- `values.staging.yaml` for staging
- `values.prod.yaml` for production

Each file contains only the values that change between environments.

**Example:**

```yaml
# values.dev.yaml
replicaCount: 3
image:
  repository: nginx
  tag: 1.19
```
```yaml
# values.staging.yaml
replicaCount: 5
image:
  repository: nginx
  tag: 1.19
```
```yaml
# values.prod.yaml
replicaCount: 7
image:
  repository: nginx
  tag: 1.23
```

When you deploy, Helm replaces the variables in the templates with the values from the chosen file. So the same template can produce different results based on the environment.

**Expected Output for Dev:**

```yaml
replicas: 1
image: nginx:1.19
```

**Expected Output for Prod:**

```yaml
replicas: 5
image: nginx:1.23
```

You can switch between environments just by changing which `values.yaml` file you pass in.

## Helm Project Structure

A typical Helm project looks like this:

- `charts/` holds other Helm charts (optional)
- `templates/` holds all the Kubernetes manifests with the inserted variables
- `values.yaml` is the default config
- `values.dev.yaml`, `values.staging.yaml`, etc. override default values

This keeps your templates clean and reusable, while your values are kept separate and easy to update.

```bash
sample-wordpress/
├── environments/
│   └── values.dev.yaml
│   └── values.staging.yaml
│   └── values.prod.yaml
├── templates/
│   └── nginx-deployment.yaml
│   └── nginx-service.yaml
│   └── db-deployment.yaml
└── └── db-service.yaml
```

To deploy in dev:

```bash
helm install marina-dev ./sample-wordpress -f environments/values.dev.yaml
```

To deploy in staging:

```bash
helm install marina-staging ./sample-wordpress -f environments/values.staging.yaml
```

To deploy in prod:

```bash
helm install marina-prod ./sample-wordpress -f environments/values.prod.yaml
```



## Extra Features and Trade-offs

Helm also includes extra features beyond templates:

- Conditionals (if/else)
- Loops
- Built-in functions
- Lifecycle hooks

This gives you more power—but also more complexity.

- Templates are harder to read
- Not valid YAML until rendered
- Hard to know what the final config looks like

Because of these variables and logic blocks, some Helm files can become messy and hard to follow.

:::info 

Kustomize uses plain YAML with simple patches, so it’s easier to read. 

Helm offers more control and power, but it takes more time to learn and maintain.

:::

## Helm versus Kustomize

Both tools solve the same problem: customizing Kubernetes configs across environments.

- **Kustomize** is simple and easy to read
- **Helm** is powerful and flexible

If you want clean YAML and just need basic environment overrides, Kustomize works great. 

If your app needs dynamic configs, conditionals, or packaging, Helm might be a better fit.

**So the idea is:** use Helm when you need more features—just be ready for extra complexity.
