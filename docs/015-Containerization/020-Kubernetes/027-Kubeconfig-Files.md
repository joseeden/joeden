---
title: "Kubeconfig File"
description: "Kubeconfig File"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 27
last_update:
  date: 4/7/2022
---


## kubeconfig 

A **kubeconfig** file defines how to connect to a Kubernetes cluster. It contains:

- Certificate details for authentication
- Cluster location

If you used **kubeadm** to set up Kubernetes, you'll find the kubeconfig files stored in `/etc/kubernetes`. Some files created by kubeadm include:

- **admin.conf** - configuration for the super admin account
- **kubelet.conf** - helps kubelet locate the API server and present the right client certificate
- **controller-manager.conf** - tells kubelet the API server and client certificate to use
- **scheduler.conf** - similar to the controller-manager.conf

To connect to a specific cluster and retrieve pods, you would typically use a command like:

```bash
kubectl get pods \
--server my-k8s-cluster:6443 \
--certificate-authority ca.crt \ 
--client-certificate admin.crt \
--client-key admin.key
```

This can be tedious, especially with multiple clusters. Instead, the `$HOME/.kube/config` file is used, which `kubectl` reads by default to access servers and certificates. The kubeconfig file is divided into three sections:

- **Clusters**: Lists clusters you have access to.
- **Users**: Lists the user accounts for each cluster.
- **Contexts**: Specifies the user account and cluster to use.

<div class='img-center'>

![](/img/docs/kubeconfigfileformatandsections.png)

</div>

## kubeconfig file 

Below is an example.

```yaml
apiVersion: v1
kind: Config
current-context: "developer@dev-frontend"

clusters:
- name: development
  cluster:
    certificate-authority: /etc/kubernetes/pki/ca.crt
    server: https://1.2.3.4
- name: test
  cluster:
    insecure-skip-tls-verify: true
    server: https://5.6.7.8

contexts:
- name: dev-frontend
  context:
    cluster: development
    namespace: frontend
    user: developer
- name: dev-storage
  context:
    cluster: development
    namespace: storage
    user: developer
- name: exp-test
  context:
    cluster: test
    namespace: default
    user: experimenter

users:
- name: developer
  user:
    client-certificate: fake-cert-file
    client-key: fake-key-file
- name: experimenter
  user:
    # Documentation note (this comment is NOT part of the command output).
    # Storing passwords in Kubernetes client config is risky.
    # A better alternative would be to use a credential plugin
    # and store the credentials separately.
    # See https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins
    password: some-password
    username: exp
```

## Defining Context 

In the kubeconfig file, you define which context kubectl should use under the **current-context** field. This specifies the cluster and user for all kubectl commands. 

This means that each time you run kubectl to perform Kubernetes operations, it will always use this context which will then use the specific user to access the specific cluster.

To view the current kubeconfig file:

```bash
kubectl config view 
```

To edit the config:

```bash
sudo vi $HOME/.kube/config
```

To use a different config file:

```bash
kubectl config view --kubeconfig=my-file
```

To access a different cluster, switch the context. This updates the current context in the kubeconfig file to the new one.

```bash
kubectl config use-context <user>@<cluster-name>
```

## Defining Namespaces 

If you have multiple namespaces, you can set the default namespace for a context in the kubeconfig file. When you switch to that context, kubectl automatically uses the defined namespace.

```yaml
contexts:
- name: dev-frontend
    context:
    cluster: development
    namespace: frontend
    user: developer
```

## Defining Certificate Authority

The CA certificate in the kubeconfig file can be defined directly or encoded in base64. Here’s an example:

```yaml
clusters:
- name: development
    cluster:
    certificate-authority: /etc/kubernetes/pki/ca.crt
    server: https://1.2.3.4
```

The content of the CA certificate can also be used. The CA certificate will normally look like this:

```bash
----BEGIN CERTIFICATE----- 
AHJFHJKHDFJFHAJDHFLAHSDFJKFHSKJFHASDFHASDFHAJKSDFHDFHSASHFLAFHAHF
AFHKJAFHKDFHKJASDHFKHAKFHASDKFHKSDAHFAKJFHAKFHKAHDFFHKHFSKFHDKFSH
AHJFHJKHDFJFHAJDHFLAHSDFJKFHSKJFHASDFHASDFHAJKSDFHDFHSASHFLAFHAHF
AFHKJAFHKDFHKJASDHFKHAKFHASDKFHKSDAHFAKJFHAKFHKAHDFFHKHFSKFHDKFSH
AHJFHJKHDFJFHAJDHFLAHSDFJKFHSKJFHASDFHASDFHAJKSDFHDFHSASHFLAFHAHF
AFHKJAFHKDFHKJASDHFKHAKFHASDKFHKSDAHFAKJFHAKFHKAHDFFHKHFSKFHDKFSH
----END CERTIFICATE----- 
```

To add the base64-encoded content of the certificate:

```bash
cat ca.crt | base64
```

Then add the base64-encoded data to the kubeconfig:

```yaml
clusters:
- name: development
    cluster:
    certificate-authority-data: <base64-encoded-cert>
    server: https://1.2.3.4
```

## Resources 

- [Organizing Cluster Access Using kubeconfig Files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)

- [Kubernetes for the Absolute Beginners](https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on/)



 

 
