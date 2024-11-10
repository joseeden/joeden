---
title: "Enabling API versions"
description: "Enabling API versions"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 41
last_update:
  date: 7/7/2022
---

## Overview 

> *This scenario was encountered during CKA and CKAD exam study.*

To enable the v1alpha1 version for the `rbac.authorization.k8s.io` API group on the control plane node, follow the steps below.

:::info[NOTE]

Incorrect changes to the config file may make the API server unavailable and potentially break the cluster.

:::


## Steps

1. Check the available resources:

    ```bash
    kubectl api-resources | grep authorization.k8s.io
    ```

    Output:

    ```bash
    localsubjectaccessreviews                      authorization.k8s.io/v1                true         LocalSubjectAccessReview
    selfsubjectaccessreviews                       authorization.k8s.io/v1                false        SelfSubjectAccessReview
    selfsubjectrulesreviews                        authorization.k8s.io/v1                false        SelfSubjectRulesReview
    subjectaccessreviews                           authorization.k8s.io/v1                false        SubjectAccessReview
    clusterrolebindings                            rbac.authorization.k8s.io/v1           false        ClusterRoleBinding
    clusterroles                                   rbac.authorization.k8s.io/v1           false        ClusterRole
    rolebindings                                   rbac.authorization.k8s.io/v1           true         RoleBinding
    roles                                          rbac.authorization.k8s.io/v1           true         Role  
    ```

2. Backup the API server manifest file before making any changes:

    ```bash
    cp /etc/kubernetes/manifests/kube-apiserver.yaml /etc/kubernetes/manifests/kube-apiserver.yaml.bak
    ```

3. Modify `kube-apiserver.yaml` to include the `--runtime-config` flag:

    ```bash
    apiVersion: v1
    kind: Pod
    metadata:
        name: kube-apiserver
        namespace: kube-system
    spec:
        containers:
        - command:
            - kube-apiserver
            - --runtime-config=rbac.authorization.k8s.io/v1alpha1
            - --other-flags...
    ```

4. After saving the changes, the kubelet will recreate the apiserver pod. Ensure that the `kube-apiserver` pod is running.

    ```bash
    kubectl get po -n kube-system
    ```

    ```bash
    NAME                                   READY   STATUS    RESTARTS      AGE
    coredns-5d78c9869d-s664z               1/1     Running   0             33m
    coredns-5d78c9869d-xvhgl               1/1     Running   0             33m
    etcd-controlplane                      1/1     Running   0             33m
    kube-apiserver-controlplane            1/1     Running   0             109s
    kube-controller-manager-controlplane   1/1     Running   2 (40s ago)   33m
    kube-proxy-p24r9                       1/1     Running   0             33m
    kube-scheduler-controlplane            1/1     Running   2 (41s ago)   33m 
    ```
