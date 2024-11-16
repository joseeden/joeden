---
title: "Kubernetes Patterns"
description: "Kubernetes Patterns for Application Developers"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 30
last_update:
  date: 7/7/2022
---



## Multi-container Patterns 

**Multiple Containers in a Pod**. Pods provide an abstraction layer above containers, and simplifies container runtime management. 

- Pods allow containers to be tightly coupled
- Co-located containers, and managed as a single unit
- Improved separation of concerns and reusability. 

The following patterns illustrate common multi-container strategies:

- Sidecar-container Pattern
- Ambassador Pattern
- Adapter Pattern

### Sidecar-container Pattern

The sidecar pattern involves using a helper container alongside a primary container to extend its functionality. The advantage of this pattern is that it isolates failures. If the sidecar (e.g., a logging agent) fails, the primary container can still operate.

Common uses include:
- Shipping logs to a central system
- Syncing files with external systems

**Example:**  

A primary container writes log files, while a sidecar container sends the logs to a central S3 bucket.

<div class='img-center'>

![](/img/docs/k8s-pattern-sidecar-2.png)

</div>

<!-- Photo from [Multi-Container Pods](https://ansilh.com/08-multi_container_pod/04-pod-patterns/)  -->


### Ambassador Pattern

The ambassador pattern proxies connections from a primary container to the outside world. The primary container communicates only with localhost, while the ambassador handles the connection routing to different environments. Since containers in the same Pod share the same network space, they can communicate via localhost. 

Common uses:

- Proxying connections to databases
- Connecting to different environments
- Supports multiple applications, different languages

As an example, we could have a web app (primary container), and a database proxy container:

- A web app (primary container) sends requests to a database.
- The request is routed through a proxy container.
- The proxy forwards the request to the appropriate database backend.
- The database can have a single instance or multiple instances.
- The ambassador manages how requests are distributed to the database instances.

<div class='img-center'>

![](/img/docs/k8s-pattern-ambassador.png)

</div>

<!-- Photo from [Kubernetes multi-container patterns](https://raghavramesh.github.io/posts/kubernetes-multi-container-patterns/) -->




### Adapter Pattern

The adapter pattern provides a standardized interface for an application across multiple Pods. The difference with ambassador pattern:

- **Adapter pattern**: simplifies the application's view to the outside world.
- **Ambassador pattern**: simplifies the view for the primary container.

Common uses:

- Normalizing output logs and monitoring data
- Supporting legacy applications that produce non-standard metrics
- Integrating with third-party software

**Example:**  

If an application needs to transform heterogeneous monitoring data into a unified format, we can either refactor the application or use an adapter container specifically for this transformation.

<div class='img-center'>

![](/img/docs/k8s-pattern-adapter-2.png)

</div>

<!-- Photo from [Adapter containers](https://kubernetes.io/blog/2015/06/the-distributed-system-toolkit-patterns/#example-3-adapter-containers) -->



## Networking 

### IP-per-Pod 

In Kubernetes, each **Pod** gets its own unique IP address.

- Containers within the same Pod share this IP address.
- They communicate with each other via localhost.

Pods are temporary and get a new IP each time they restart. Multiple replicas of Pods can be spread across different nodes.

### Services 

Kubernetes Services manage communication between Pods as they are created or removed.

- A Service forwards requests to any Pod.
- Clients only need to know the Service, not the individual Pods.
- Pods discover Services through environment variables or DNS.
- Assigned with **Cluster IP**, accessible only inside the cluster.

There are several types of Services:

- **Cluster IP**: Access within the cluster.
- **Node Port**: Opens a port on each node for external access.
- **LoadBalancer**: Exposes the service externally.
- **External Name**: Uses DNS CNAME to access external services.

For more information, please see [Kubernetes Services.](/docs/015-Containerization/020-Kubernetes/021-Kubernetes-Services.md)

### Network Policies 

Network Policies (netpol) are like security groups for controlling access between Pods.

- Restricts access to certain Pods in a namespace.
- The cluster’s network plugin must support policies.

### Isolated vs. Non-Isolated Pods 

By default, Pods allow traffic from any source, making them non-isolated. When a Pod is selected by a network policy, it becomes isolated. Pods are grouped using labels, which are a key part of Kubernetes' organization.

## Leveraging kubectl 

- Enable shell completion for `kubectl` commands.

  ```bash
  source <(kubectl completion bash)
  ```

- Place manifest files in a directory and apply all at once:

  ```bash
  kubectl apply -f my-files/
  ```

- Generate a manifest file for a resource:

  ```bash
  kubectl create namespace my-namespace -o yaml --dry-run > myname.yaml
  kubectl apply -f myname.yaml
  ```

- List all available API resources with shorthand names:

  ```bash
  kubectl api-resources
  ```


## Resources 

- [Kubernetes Patterns for Application Developers](https://cloudacademy.com/course/kubernetes-patterns-for-application-developers/introduction/)



 

 
