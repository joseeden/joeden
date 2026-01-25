---
title: "Cheatsheet: Kubernetes Commands"
description: "Cheatsheet: Kubernetes Commands"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 0
last_update:
  date: 4/7/2022
---


## Pods and Parameters


| Pods                                                                  | Description                                                        |
|-----------------------------------------------------------------------|--------------------------------------------------------------------|
| `kubectl completion --help`                                           | Search for "enabling completion"                                   |
| `source <(kubectl completion bash)`                                   | Enable completion for kubectl                                      |
| `kubectl api-resources`                                               | List shortnames for resources                                      |
| `kubectl get pods`                                                    | Get information about running pods in the current namespace        |
| `kubectl describe pod <pod>`                                          | Describe a specific pod                                            |
| `kubectl expose pod <pod> --port=444 --name=frontend`                 | Expose the port of a pod (creates a new service)                   |
| `kubectl port-forward <pod> 8080`                                     | Port forward the exposed pod port to your local machine            |
| `kubectl attach <podname> -i`                                         | Attach to the pod                                                  |
| `kubectl exec <pod> -- command`                                       | Execute a command on the pod                                       |
| `kubectl exec -it pod-name bash`                                      | SSH into the pod                                                   |
| `kubectl label pods <pod> mylabel=awesome`                            | Add a label to a pod                                               |
| `kubectl run -i --tty busybox --image=busybox --restart=Never -- sh`  | Run a shell in a pod (useful for debugging)                         |


| Parameters                                                 | Description                                                     |
|------------------------------------------------------------|-----------------------------------------------------------------|
| `--all-namespaces`                                         | Display resources in all namespaces                             |
| `-l LABEL-NAME`                                            | Filter by a specific label name                                 |
| `-l LABEL-NAME1,LABEL-NAME2`                               | Filter by multiple label names                                  |
| `--sort-by=metadata.creationTimestamp`                     | Sort pods by age                                                |
| `--output=yaml`                                            | Display output in YAML format                                   |
| `--o yaml`                                                 | Display output in YAML format (can also use JSON)               |
| `--wide`                                                   | Display additional information in the output                    |
| `--show-labels`                                            | Show labels attached to the pods                                |


## `kubectl create` vs. `kubectl apply`

- **`kubectl create`** is used for **Imperative Management**, where you directly specify what you want to create, replace, or delete in the cluster.

  Example:
  ```bash
  kubectl create deployment my-deployment --image=nginx
  ```

- **`kubectl apply`** is used for **Declarative Management**, where it ensures that changes to live objects (like scaling) are preserved even if you apply further changes.

  Example:
  ```bash
  kubectl apply -f my-manifest.yaml
  ```

**Key difference:**  
- `kubectl create` will fail if the resource already exists.  
- `kubectl apply` will update the resource without error.

## Deployments 

| Deployments                                                               | Description                                                   |
|---------------------------------------------------------------------------|---------------------------------------------------------------|
| `kubectl get deployments`                                                 | Get information on current deployments                        |
| `kubectl get rs`                                                          | Get information about the replica sets                        |
| `kubectl rollout status deployment/helloworld-deployment`                 | Get the deployment status                                     |
| `kubectl set image deployment/helloworld-deployment k8s-demo=k8s-demo`    | Update deployment with the new version of the k8s-demo image  |
| `kubectl edit deployment/helloworld-deployment`                           | Edit the deployment object                                    |
| `kubectl rollout status deployment/helloworld-deployment`                 | Check the status of the rollout                               |
| `kubectl rollout history deployment/helloworld-deployment`                | View the rollout history                                      |
| `kubectl rollout undo deployment/helloworld-deployment`                   | Roll back to the previous version                             |
| `kubectl rollout undo deployment/helloworld-deployment --to-revision=n`   | Roll back to a specific version                               |


 

 
