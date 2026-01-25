---
title: "Secrets"
description: "Storing sensitive information"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 45
last_update:
  date: 4/7/2022
---



## Secrets

Like ConfigMaps, secrets store configuration outside of container images or Pod specs. However, Secrets are specifically for sensitive data. 

- Reduce risk of accidental exposure compared to secrets
- Stores sensitive data as **key-value pairs**.
- Supports **Docker credentials** and **TLS certificates**.

## Base64 Encoded

Secrets are **base64 encoded**, not encrypted

- They can be easily decoded.
- Safer than plain text, but needs proper security.

In general, it's not the secret itself that is safe, it is the practices around it. 

## Best Practices

Secrets are not encrypted, so it is not safer in that sense. However, some best practices around using secrets make it safer:

- Do not store Secrets in source control.
- Enable **Encryption at Rest** for Secrets in ETCD.
- Use Kubernetes RBAC to control access separately.


## How Kubernetes Handles Secrets

Kubernetes also handles secrets in various ways:

- Secrets are sent to nodes only when needed.
- Stored in **tmpfs** (memory), not on disk.
- Removed when the Pod using them is deleted.

For enhanced security, consider using tools like **Helm Secrets** or **HashiCorp Vault**.

## Ways to Create a Secret


- **Imperative Method** (using commands):

    ```bash
    kubectl create secret generic <secret-name> --from-literal=<key>=<value>
    kubectl create secret generic <secret-name> --from-file=<filename>
    ```

- **Declarative Method** (using YAML):

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
    name: mysecret
    type: Opaque
    data:
    variable1: sdferr==
    ```

    (Note: Secret values must be base64 encoded.)


## Retrieving Secrets

To retrieve the secrets:

```bash
kubectl get secrets
kubectl describe secrets
```

## Injecting Secrets into Pods

- **As Environment Variables:**

    ```yaml
    envFrom:
    - secretRef:
        name: USERNAME
    ```

- **As a Single Environment Variable:**

    ```yaml
    env:
    - name: DB_Username
        valueFrom:
        secretKeyRef:
            name: app_secret
            key: DB_Username
    ```

- **Mount as a Volume:**

    ```yaml
    volumes:
    - name: app-secret-volumes
        secret:
        secretName: app-secret
    ```

## Notes

Best practices around using secrets

- Secrets are **not encrypted**, only base64 encoded.
- Avoid checking Secrets into source code.
- Use **Encryption at Rest** for better security.
- Restrict access to Secrets using [least privilege principles.](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege)
- Consider third-party secret management solutions: AWS, Azure, Vault.

Also, consider the way kubernetes handles secrets:

- Secrets are only sent to nodes when needed by a Pod.
- Stored in **tmpfs**, not written to disk.
- Deleted when the Pod that uses them is deleted.