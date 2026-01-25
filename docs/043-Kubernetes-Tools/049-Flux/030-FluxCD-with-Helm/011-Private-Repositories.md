---
title: "Private Repositories"
description: "Private Repositories"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - GitOps
  - ArgoCD
  - Git
  - Flux
  - Helm
sidebar_position: 11
last_update:
  date: 8/19/2022
---

## Overview

This guide explains how to use FluxCD to work with private Helm chart repositories.

- Helm charts can come from public or private sources
- Private Helm repos need authentication to access
- We'll set up a private repo using ChartMuseum

FluxCD supports private chart repositories by using basic authentication. This can be simulated using ChartMuseum and Docker.

## Pre-requisites 

- [Setting Up Git](/docs/043-Kubernetes-Tools/047-GitOps/016-Setting-Up-Git.md)
- [Setting Up Kubernetes](/docs/040-Containerization/020-Kubernetes/010-Setting-Up-Kubernetes-using-Kind.md)
- [Setting Up Flux](/docs/043-Kubernetes-Tools/049-Flux/015-Setting-Up-Flux.md)


## Using ChartMuseum

ChartMuseum is an open source tool that can be used to host a private Helm repo using Docker.

1. Create a Docker volume to store your charts. This ensures the charts stay intact even if the container restarts.

    ```bash
    docker volume create chartmuseum-storage
    ```

2. Run ChartMuseum using a Docker container

    ```bash
    docker run -d \
      --name chart-museum-helm-repo \
      -p 8080:8080 \
      -v chartmuseum-storage:/bitnami \
      -e STORAGE=local \
      -e STORAGE_LOCAL_ROOTDIR=/charts \
      -e ALLOW_OVERWRITE=true \
      -e AUTH_ENABLE=true \
      -e BASIC_AUTH_USER=chartuser \
      -e BASIC_AUTH_PASS=************* \
      -e DEBUG=true \
      --user 0:0 \
      ghcr.io/helm/chartmuseum:v0.14.0
    ```

    :::info 

    Official website: [Get ChartMuseum](https://chartmuseum.com/)

3. Verify its running:

    ```bash
    $ docker ps
    CONTAINER ID   IMAGE                              COMMAND                  CREATED          STATUS          PORTS                                                                 NAMES
    117701a6fe26   ghcr.io/helm/chartmuseum:v0.14.0   "/chartmuseum"           27 seconds ago   Up 26 seconds   0.0.0.0:8080->8080/tcp                                                chart-museum-helm-repo
    ff5adef26bf3   kindest/node:v1.29.2               "/usr/local/bin/entr…"   28 hours ago     Up 28 hours     0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp, 127.0.0.1:33783->6443/tcp   kind-control-plane 
    ```

4. Verify access with authentication:

    ```bash
    curl -u chartuser:<your_password> http://localhost:8080/index.yaml
    ```

    If it works, you should see:

    ```bash
    apiVersion: v1
    entries: {}
    generated: "2025-05-17T18:29:46Z"
    serverInfo: {} 
    ```


Now we have a private chart repo running locally with basic auth.

## Create the Helm Chart

Create a new Helmchart and upload it to the private repository.

:::info 

Make sure you are in the user's home. You can also go to `/tmp` and run the command.

:::

```bash
helm create busybox 
```

By default, Helm will use Nginx as the server whenever we create a new Helm chart. Modify it to use BusyBox instead of Nginx.

```bash
cd busybox 
vi templates/deployment.yaml
```

Remove this:

```yaml
## templates/deployment.yaml

    ports:
      - name: http
        containerPort: {{ .Values.service.port }}
        protocol: TCP
    {{- with .Values.livenessProbe }}
    livenessProbe:
      {{- toYaml . | nindent 12 }}
    {{- end }}
    {{- with .Values.readinessProbe }}
    readinessProbe:
      {{- toYaml . | nindent 12 }}
    {{- end }}
    {{- with .Values.resources }} 
```

And then replace with this:

```yaml
    command:
      - sleep
      - infinity
```

BusyBox doesn’t auto-run, so add the `command` section will ensure it's always running.

Next, update the `values.yaml` to use the busybox image:

```yaml
image:
  repository: busybox
  tag: latest
  pullPolicy: IfNotPresent
```

## Package and Push

Package the chart first. The command below will create a gzipped tar archived with the chart name and version.

```bash
helm package .
```

Next, push this artifact to the private Helm repository:

```bash
curl -u chartuser --data-binary "@busybox-0.1.0.tgz" http://localhost:8080/api/charts
```

If successful, it should return:

```json
{"saved":true}
```

Now the chart is stored in the private repository.

## Access the Private Repository

We need to confirm that Helm can access the repo before FluxCD does.

- Add the private repo to Helm:

    ```bash
    helm repo add chart-museum-helm-repo --username chartuser http://localhost:8080
    ```

- Search the repo to confirm it works:

    ```bash
    $ helm search repo busybox
    NAME                            CHART VERSION    APP VERSION    DESCRIPTION
    chart-museum-helm-repo/busybox  0.1.0            1.16.0         A Helm chart for Kubernetes
    ```

This confirms Helm can access and use the private chart. FluxCD will use the same endpoint and credentials.
