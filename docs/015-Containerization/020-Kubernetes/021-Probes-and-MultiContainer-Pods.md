---
title: "Probes and Multi-Container Pods"
description: "Probes and Multi-Container Pods"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 21
last_update:
  date: 7/7/2022
---


## Probes

Kubernetes uses probes to monitor the health and status of Pods and containers.

- Ensure Pods are ready or restart unresponsive ones.
- Probes can use commands, HTTP, or TCP checks.

## Types of Probes

1. **Readiness Probes**  

   - Checks if a Pod is ready to handle traffic.
   - Used after startup, especially when large data is being loaded.
   - Checks for external dependencies.
   - If failing, the Pod won't receive traffic from a Service.

2. **Liveness Probes**  

   - Detects if a Pod becomes unresponsive or broken.
   - Can restart Pods in case of failure.
   - Detects issues like deadlocks or bugs.

3. **Startup Probes**  

   - Used when an app starts slowly.
   - Runs before readiness and liveness probes.
   - Prevents premature restarts by extending the startup time.


## Declaring Probes

Probes are defined in a Pod's container configuration to monitor health and readiness.

- Probes are configured within each container of a Pod.
- All probes must pass for the Pod to be considered healthy.

## Probe Actions

Probes use different actions to check container health:

| Command      | Description                                                                   | Output                                                                 |
|--------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `exec`         | Issue a command in the container.                                             | Success if exit code is zero, failure otherwise.                      |
| `httpGet`      | Send an HTTP GET request to the container at a specified path and port.       | Success if the response status is 2xx or 3xx, failure otherwise.     |
| `tcpSocket`    | Attempt to open a socket to the container on a specified port.                | Success if the connection is established, failure otherwise.          |


## Probe Configuration

Probes are run every 10 seconds by default. You can configure the following:

| Parameter            | Description                                                              |
|----------------------|--------------------------------------------------------------------------|
| `successThreshold`   | Number of successful probes needed to be considered healthy.            |
| `failureThreshold`   | Number of failed probes before a restart.                               |
| `periodSeconds`      | Time interval between each probe.                                       |
| `timeoutSeconds`     | Time the probe waits for a response.                                    |


## Multi-container Pod

In a multi-container Pod, each container should run processes that last for the Pod's entire lifecycle. For example, in a Pod with:

- A web application
- A logging agent

Both containers should remain running. If one fails, the Pod restarts. However, sometimes you may need a container to run a task that completes once, like pulling code from a repository for the main app.

- Multi-container Pods run co-located, co-managed processes. 
- **Sidecar container** assists the primary container.

If a task needs to complete before the main application starts, we use **initContainers**.


## Sidecar Containers 

Sidecar containers assist the main container with tasks like logging, monitoring, or data collection. 

- Kubernetes doesn’t natively manage sidecars
- It’s a design pattern used for these purposes.

## InitContainers

Init containers are used for tasks that need to happen before the main application starts, such as waiting for services or preparing files. Probes only start after containers run, but init containers run first.

- Pods can have multiple init containers.
- Init containers run in the order they are declared.
- Init containers can use different images.
- Each init container must finish before the next starts.
- Once all init containers are complete, the main container starts.

Init containers run **every time** a Pod is created, including when Pods restart.

## Sidecar vs. InitContainers

The main difference between sidecar and init containers:

- **Init containers** run and complete before the main application starts.
- **Sidecar containers** run alongside the main container, providing services like logging or monitoring.

## Sidecar Containers Configuration

Sidecar containers work alongside the main container to offer support services.

```yaml
apiVersion: v1
kind: Pod
metadata:
    labels:
    name: app
    name: app
spec:
    containers:
    - image: event-simulator
    name: app
    volumeMounts:
    - mountPath: /log
        name: log-volume
    - name: sidecar
    image: filebeat-configured
    volumeMounts:
    - name: log-volume
        mountPath: /var/log/event-simulator/  
```

## Init Containers Configuration

Init containers run before the main container to prepare the environment, such as downloading files or waiting for services.

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: myapp-pod
    labels:
    app: myapp
spec:
    containers:
    - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    initContainers:
    - name: init-myservice
    image: busybox
    command: ['sh', '-c', 'git clone <some-repository> ; done;'] 
```

## Multiple init containers

Multiple init containers can be used, running one after another. If an init container fails, Kubernetes will repeatedly restart the Pod until it succeeds.

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: myapp-pod
    labels:
    app: myapp
spec:
    containers:
    - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    initContainers:
    - name: init-myservice
    image: busybox:1.28
    command: ['sh', '-c', 'until nslookup myservice; do echo waiting for myservice; sleep 2; done;']
    - name: init-mydb
    image: busybox:1.28
    command: ['sh', '-c', 'until nslookup mydb; do echo waiting for mydb; sleep 2; done;'] 
```