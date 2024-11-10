---
title: "Changing deprecated API versions"
description: "Changing deprecated API versions"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 12
last_update:
  date: 7/7/2022
---


## Overview 

> *This scenario was encountered during CKA and CKAD exam study.*

As Kubernetes evolves, some API versions become deprecated. It's important to update these to newer, supported versions to avoid issues in future updates.


## Install the kubectl convert 

To install the `kubectl convert` plugin on the control plane node, follow these steps:

1. Download the latest version:

    ```bash
    curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl-convert
    ```

2. Change the file permissions and move it to `/usr/local/bin/`:

    ```bash
    chmod +x kubectl-convert
    mv kubectl-convert /usr/local/bin/
    ```

3. Use the `--help` option to confirm the plugin is correctly configured:

    ```bash
    kubectl-convert --help
    ```


## Verify the Conversion 

1. Example manifest with a deprecated API version:

    ```yaml
    # ingress-old.yml
    apiVersion: networking.k8s.io/v1beta1  # Deprecated version
    kind: Ingress
    metadata:
        name: ingress-space
        annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
    spec:
        rules:
        - http:
            paths:
            - path: /video-service
            pathType: Prefix
            backend:
                serviceName: ingress-svc
                servicePort: 80
    ```

2. Use `kubectl-convert` to update the deprecated API version:

    ```bash
    kubectl-convert -f ingress-old.yaml --output-version networking.k8s.io/v1
    ```

    This will output the new file format.

    ```bash
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
    annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
    creationTimestamp: null
    name: ingress-space
    spec:
    rules:
    - http:
        paths:
        - backend:
            service:
                name: ingress-svc
                port:
                number: 80
            path: /video-service
            pathType: Prefix
    status:
    loadBalancer: {} 
    ```                 

3. Save the converted version to a new file:

    ```bash
    kubectl-convert -f ingress-old.yaml --output-version networking.k8s.io/v1 > ingress-new.yaml
    ```

4. Apply the new manifest:

    ```bash
    kubectl apply -f ingress-new.yaml
    ```

5. Verify the changes. Check the ingress resource:

    ```bash
    kubectl get ing ingress-space -o yaml | grep -i apiversion
    ```


 

 
