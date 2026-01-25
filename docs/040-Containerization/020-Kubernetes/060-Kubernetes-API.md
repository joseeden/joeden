---
title: "Kubernetes API"
description: "Container Management Challenges"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 60

last_update:
  date: 4/7/2022
---

## Kubernetes API Server

The Kubernetes API Server is the main interface for interacting with the cluster. It is a RESTful API that communicates over HTTP/HTTPS using JSON.

- Composed of **API Objects** that define the system's state.
- All interactions are persisted and serialized to the data store.

It supports **declarative configuration**, where you define the desired final state instead of specifying the individual steps to achieve it.


## Kubernetes API 

The Kubernetes API is a collection of APIs that define the resources within the Kubernetes environment. These are used in Kubernetes YAML files and are organized into groups:

- `/version`
- `/healthz`
- `/metrics`
- `/logs`
- `/api`

The two APIs used for cluster functionality are:

- `/api` - core APi, represented by "v1"
- `/apis` - named group

The core groups is where all the core functionalities exist.

<div class='img-center'>

![](/img/docs/kubernetesapicoregroup.png)

</div>

The named group is where all the newer API features are added. The sample below are just a few.

<div class='img-center'>

![](/img/docs/kubernetesnamedapigroup.png)

</div>


To list available API groups on a local cluster (*localhost* assumes that Kubernetes cluster is deployed locally):

```bash
curl https://localhost:6443 -k  
```

Output: 

```bash 
{
  "paths": [
     "/api",
     "/api/v1",
     "/apis",
     "/apis/",
     "/healthz",
     "/logs",
     "/metrics",
     "/openapi/v2",
     "/version
```

To show the resource group for a specific API group:

```bash
curl https://localhost:6443/apis -k  | grep "name"
```

Output: 

```bash 
  "name": "extensions",
  "name": "apps",
  "name": "events.k8s.io",
  "name": "authentication.k8s.io",
  "name": "authorization.k8s.io",
  "name": "autoscaling",
  "name": "batch",
```

If you encounter a **Forbidden** error, it means you lack access to certain APIs. You will need to provide the certificate and key:

```bash
curl https://localhost:6443 -k \
--cacert ca.crt \
--cert admin.crt \
--key admin.key 
```


## API Resources

The `kubectl` command-line tool allows you to interact with Kubernetes API resources, enabling you to view and manage resources within your cluster.

- To show the list of resources defined in the API:

     ```bash
     kubectl api-resources 
     ```

     Output: 

     ```bash 
     NAME                        SHORTNAMES   APIVERSION  NAMESPACED   KIND
     bindings                                 v1          true         Binding
     componentstatuses           cs           v1          false        ComponentStatus
     configmaps                  cm           v1          true         ConfigMap
     endpoints                   ep           v1          true         Endpoints
     events                      ev           v1          true         Event
     limitranges                 limits       v1          true         LimitRange
     namespaces                  ns           v1          false        Namespace
     nodes                       no           v1          false        Node
     persistentvolumeclaims      pvc          v1          true         PersistentVolumeClaim
     persistentvolumes           pv           v1          false        PersistentVolume
     pods                        po           v1          true         Pod
     podtemplates                             v1          true         PodTemplate
     replicationcontrollers      rc           v1          true         ReplicationController
     resourcequotas              quota        v1          true         ResourceQuota
     secrets                                  v1          true         Secret
     serviceaccounts             sa           v1          true         ServiceAccount
     services                    svc          v1   
     ```


- To show the resource versions:

     ```bash
     kubectl api-versions 
     ```

     Output: 

     ```bash 
     admissionregistration.k8s.io/v1beta1
     apiextensions.k8s.io/v1beta1
     apiregistration.k8s.io/v1
     apiregistration.k8s.io/v1beta1
     apps/v1
     apps/v1beta1
     apps/v1beta2
     authentication.k8s.io/v1
     authentication.k8s.io/v1beta1
     authorization.k8s.io/v1
     authorization.k8s.io/v1beta1
     autoscaling/v1
     autoscaling/v2beta1
     autoscaling/v2beta2
     batch/v1
     batch/v1beta1
     ```

- To get more details about a resource:

     ```bash
     kubectl explain <resource>
     ```

     Example:

     ```bash
     kubectl explain deploy
     ```

     Output: 

     ```bash 
     KIND:     Deployment
     VERSION:  extensions/v1beta1 <== API Version

     DESCRIPTION:
          DEPRECATED - This group version of Deployment is deprecated by
          apps/v1beta2/Deployment. See the release notes for more information.
          Deployment enables declarative updates for Pods and ReplicaSets.

     FIELDS:
     apiVersion   <string>
          APIVersion defines the versioned schema of this representation of an
          object. Servers should convert recognized schemas to the latest internal
          value, and may reject unrecognized values. More info:
          https://git.k8s.io/community/contributors/devel/api-conventions.md#resources  
     ```

- To explain further:

     ```bash
     kubectl explain <resource>.spec  
     ```

     Example: 

     ```bash
     kubectl explain deployment.spec.strategy
     ```

     Output: 

     ```bash 
     RESOURCE: strategy <Object>
     DESCRIPTION:
          The deployment strategy to use to replace existing pods with new ones.
     DeploymentStrategy describes how to replace existing pods with new ones.
     FIELDS:
     rollingUpdate <Object>
          Rolling update config params. Present only if DeploymentStrategyType =
          RollingUpdate.
     type <string>
          Type of deployment. Can be "Recreate" or "RollingUpdate". Default is
          RollingUpdate.  
     ```

API versions are updated every 3 months, which may include changes to APIs, syntax, or parameters that need to be reflected in our Kubernetes YAML files.


## Resources

- https://kubernetes.io/docs/concepts/overview/kubernetes-api/

- https://stackoverflow.com/questions/52711326/kubernetes-how-to-know-latest-supported-api-version



 

 
