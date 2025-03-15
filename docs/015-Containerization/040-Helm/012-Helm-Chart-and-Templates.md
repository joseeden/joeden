---
title: "Helm Chart and Templates"
description: "Helm Chart and Templates"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes, Helm]
sidebar_position: 12
last_update:
  date: 5/21/2022 
---


## Helm Chart 

A Helm chart is simply a collection of templates plus a couple of extra metadata and default config value files which represents an application to be deployed.

- Some charts are designed to deploy a simple application.
- Ohers can be much more complex, with multiple microservices

## Helm Chart Directory Structure

To create a Helm chart, run:

```bash
helm create <chart-name>
```

This will generate the following directory structure:

```bash
└── app-tier
    ├── Chart.yml
    ├── charts
    ├── templates
    │   ├── NOTES.txt
    │   ├── _helpers.tpl
    │   ├── deployment.yml
    │   ├── hpa.yaml 
    │   ├── ingress.yaml
    │   ├── service.yaml
    │   ├── serviceaccount.yaml 
    │   └── tests
    │       └── test-connection.yaml
    └── values.yaml
```

## Templates Folder  

The **templates** folder is where all the template files for defining Kubernetes resources are stored together. 

- Each file typically defines a single resource.
- Helps organize resources into separate, reusable templates.  

## chart.yaml

The **Chart.yaml** contains top-level metadata which explains the purpose of the chart. This includes the name and other details of the chart.

- **type: application**

    When "type" is set to "application", chart becomes deployable and resources are created within the cluster.

- **type: library**

    When "type" is set to "library", the chart will host reusable functions that can be used with other charts

Sample manifest:

```yaml
apiVersion: v2
name: sample-app 
description: Custom chart of sample app 
type: application
version: 1.1.0 
appVersion: 1.0.3
```

## values.yaml

The **values.yaml** defines a structured list of default values that are injected onto the chart templates that reference them during deployment. 

Sample `values.yaml`:

```bash
replicaCount: 1

image:
    repositoryL nginx
    pullPolicy: IfNotPresent 

serviceAccount:
    name: "app-svc"
    create: true 
    annotations: {}

service:
    type: ClusterIP 
    port: 80 
```

You can override values with `helm upgrade`. In the example below, the service port is changed from 80 to 8081.

```bash
helm upgrade sample-app ./app-tier --set=service.port=8081 
```

## Packaging the Chart 

Once you're done with the development of the chart, you can now package it by running:

```bash
helm package <chart-directory> 
```

Going back to the directory structure from above, we can package the entire directory and label it as "app-tier" as it is the top-level directory that contains the chart.

```bash
└── app-tier
    ├── Chart.yml
    ├── charts
    ├── templates
    │   ├── NOTES.txt
    │   ├── _helpers.tpl
    │   ├── deployment.yml
    │   ├── hpa.yaml 
    │   ├── ingress.yaml
    │   ├── service.yaml
    │   ├── serviceaccount.yaml 
    │   └── tests
    │       └── test-connection.yaml
    └── values.yaml
```

To package this chart, we can run:

```bash
helm package app-tier 
```

This will then produce an archive file that used the name and version defined in the **Chart.yaml** file:

```bash
apiVersion: v2
name: sample-app 
description: Custom chart of sample app 
type: application
version: 1.1.0 
appVersion: 1.0.3
```

Thus the archive file will be named:

```bash
sample-app-1.1.0.tgz 
```

## Sharing the Chart 

The archived file can be shared with anyone. They can be installed simply by running: 

```bash
helm install <package-name> <chart>
```

In our case:

```bash
helm install app-tier sample-app-1.1.0.tgz 
```

To perform a dry-run installation:

```bash
helm install app-tier sample-app-1.1.0.tgz --dry-run
```

## Hosting the Chart 

To host the chart in a repository, create an index file:

```bash
helm repo index .
```

This generates an `index.yaml` file. You can then search the repository:

```bash
helm search repo app-tier
```


 

