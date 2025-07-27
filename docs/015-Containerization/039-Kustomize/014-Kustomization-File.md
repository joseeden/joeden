---
title: "Kustomization File"
description: "Kustomization File"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 14
last_update:
  date: 4/19/2022
---



## Overview

A **Kustomization file** is a YAML file that defines how to customize your Kubernetes resources. It lets you apply changes like adding labels, setting a namespace, or generating new resources without modifying the original YAML files.

Example:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml

namespace: my-namespace

commonLabels:
  app: my-app
  environment: staging
```

In this example:

- `deployment.yaml` and `service.yaml` are the base resources.
- All resources are set to use the `my-namespace` namespace.
- Common labels (`app` and `environment`) are added to all resources.

You can also use Kustomize to generate things like Secrets or ConfigMaps from files or data—more on that in later videos.

## `apiVersion` and `kind` 

In a simple `kustomization.yaml` file, you can set values like `apiVersion` and `kind`.

- These fields tell Kubernetes what type of file this is
- `apiVersion` and `kind` are optional but recommended
- Default values will be used if not set manually
- It’s safer to hardcode them

Hardcoding these values helps avoid future issues if the tool updates or changes default behavior.

Example: 

```yaml
apiVersion: kustomize.config.k8s.io/v1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml
```

     
## Lab: NGINX

To set things up quickly, we’ll use **Killercoda**, a free online Kubernetes playground. It includes a working cluster, so there's nothing to install.

1. Go to [Killercoda](https://killercoda.com/playgrounds/scenario/kubernetes)
2. Sign in using your GitHub or Gmail account

    :::info

    You can also [setup a local cluster using Kind.](/docs/015-Containerization/020-Kubernetes/001-Setting-Up-Kubernetes-using-Kind.md) 

    Note that you will need to add `--context kind-kind` when running a `kubectl` command.

    :::

3. Once the terminal loads, run the following command to clone the lab files:

    ```bash
    git clone https://github.com/joseeden/test-kustomize-labs.git
    ```

4. Navigate to the NGINX sample project folder where the NGINX manifests are:

    ```bash
    cd test-kustomize-labs/code-samples/01-sample-nginx-project/
    ```
    ```bash
    01-sample-nginx-project/
    ├── nginx-deployment.yaml
    └── nginx-service.yaml
    ```

5. Create the Kustomization file which should contain the **resources** section: 

    ```bash
    $ cat > kustomization.yaml

    resources: 
    - nginx-deployment.yaml
    - nginx-service.yaml

    commonLabels:
      company: marine-parade
    ```

    It will also the customizations that we want to apply, such as adding a common label to all the resources that will be created.

    :::info

    The `commonLabels` field has been deprecated. Please use `labels` instead.

    :::

    The new Kustomization should look like this:

    ```bash
    resources: 
    - nginx-deployment.yaml
    - nginx-service.yaml

    labels:
    - includeSelectors: true 
      pairs:
        company: marine-parade
    ```


6. Run the kustomize build command in the folder with your kustomization.yaml:

    ```bash
    kustomize build . 
    ```

This command finds the kustomization.yaml, loads the listed resources, applies the transformations (like labels), and prints the final YAML output.

Example output:

```bash
apiVersion: v1
kind: Service
metadata:
  labels:
    company: marine-parade
  name: nginx-service
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: nginx
    company: marine-parade
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    company: marine-parade
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
      company: marine-parade
  template:
    metadata:
      labels:
        app: nginx
        company: marine-parade
    spec:
      containers:
      - image: nginx:latest
        name: nginx
        ports:
        - containerPort: 80 
```

As you can see, both the Service and Deployment now include the label company: marine-parade.

```bash
metadata:
  labels:
    company: marine-parade 
```

You will also get the same output when you run the `kubectl` command:

```bash
kubectl kustomize .   # directory containing the kustomization 
```

### Creating the Resources 

Note that the build command combines all the manifests and applies the defined transformations, **but it does not deploy the Kubernetes resources.** To apply the output directly to your cluster, pipe it to kubectl apply:

```bash
kustomize build . | kubectl apply -f 
```

If you [setup a local cluster using Kind.](/docs/015-Containerization/020-Kubernetes/001-Setting-Up-Kubernetes-using-Kind.md), you will need to pass the `context` argument.

```bash
$ kustomize build . | kubectl --context kind-kind apply -f -

service/nginx-service created
deployment.apps/nginx-deployment created
```

Check if the resources are created:

```bash
$ kubectl get pods -A  | grep nginx

default              nginx-deployment-9d64c6656-6ww4w             1/1     Running            0                6m5s
```

```bash
$ kubectl get svc -A   | grep nginx

default       nginx-service             ClusterIP   10.96.158.6     <none>        80/TCP                   6m30s 
```

To access the NGINX service, you can use port-forwarding to map your local port 8080 to the service's port 80:

```bash
kubectl  port-forward svc/nginx --address 0.0.0.0 8080:80 
```

Once the port-forwarding is active, open your web browser and navigate to http://localhost:8080:

<div class="img-center"> 

![](/img/docs/07282025-sample-nginx-page.PNG)

</div>



### Deleting the Resources 

You can use the previous command but change the `apply` to delete:

```bash
kustomize build . | kubectl delete -f 
```

You can also delete it by passing `-k` to `kubectl`:

```bash
kubectl delete -k . 
```

The `-k` flags means Kustomize in this case.

