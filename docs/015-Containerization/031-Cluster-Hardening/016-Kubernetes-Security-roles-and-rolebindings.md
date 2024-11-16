---
title: "Role-Based Access Control"
description: "Role-Based Access Control"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 16
last_update:
  date: 7/7/2022
---

## Role-Based Access Control

RBAC is a method for controlling access to Kubernetes resources using roles. 

- Configured dynamically via the Kubernetes API.
- Does not require modifying files.
- Applies to both normal users and service accounts.

RBAC can also be used on groups for easier access control management.

## Roles 

To create a role:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]  
```

In the role manifest above, we can see that the rules have three sections:

- `apiGroups` - normally left blank for core group 
- `resources` - objects that the role can access 
- `verbs` - actions that the role can perform

To allow developers to create ConfigMaps, add it as a rule.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:

- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]  

- apiGroups: [""] # "" indicates the core API group
  resources: ["ConfigMap"]
  verbs: ["create"]  
```

Apply the YAML file to create the role:

```bash
kubectl apply -f my-role.yml 
```

To make access more granular, specify resources like specific pods:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
  resourceNames: ["podA", "podB"]
```

## `RoleBindings`

Once the role is created, the next step is to link the user to the role. Roles can be bound to subjects within a:

- specific namespace (role binding)
- cluster-wide (cluster role binding)

It is best practice to grant access only to the resources a subject needs, following the principle of least privilege. If a subject requires access to only specific namespaces, avoid using a cluster role binding.

To create a rolebinding, create the necessary YAML file.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

Apply the RoleBinding:

```bash
kubectl apply -f my-rolebinding.yml
```

To list the roles:

```bash
kubectl get roles  
```

To get more details on a specific role:

```bash
kubectl describe role my-role 
```

To list all of the role bindings in the cluster:

```bash
kubectl get rolebinding --all-namespaces
```

Sample output:

```bash 
NAMESPACE              NAME                                                ROLE                                                  AGE
kube-public            kubeadm:bootstrap-signer-clusterinfo                Role/kubeadm:bootstrap-signer-clusterinfo             151d
kube-public            system:controller:bootstrap-signer                  Role/system:controller:bootstrap-signer               151d
kube-system            kube-proxy                                          Role/kube-proxy                                       151d
kube-system            kubeadm:kubelet-config                              Role/kubeadm:kubelet-config                           151d
kube-system            kubeadm:nodes-kubeadm-config                        Role/kubeadm:nodes-kubeadm-config                     151d
kube-system            metrics-server-auth-reader                          Role/extension-apiserver-authentication-reader        151d
kube-system            system::extension-apiserver-authentication-reader   Role/extension-apiserver-authentication-reader        151d
kube-system            system::leader-locking-kube-controller-manager      Role/system::leader-locking-kube-controller-manager   151d
kube-system            system::leader-locking-kube-scheduler               Role/system::leader-locking-kube-scheduler            151d
kube-system            system:controller:bootstrap-signer                  Role/system:controller:bootstrap-signer               151d
kube-system            system:controller:cloud-provider                    Role/system:controller:cloud-provider                 151d
kube-system            system:controller:token-cleaner                     Role/system:controller:token-cleaner                  151d
kubernetes-dashboard   kubernetes-dashboard                                Role/kubernetes-dashboard                             151d
```

## `ClusterRoleBindings`

Role bindings created during cluster initialization are always linked to a specific namespace and only grant access within that namespace. The `system:` prefix is reserved for Kubernetes system use and should not be used when naming roles.

To list all of the cluster-wide role bindings:

```bash
kubectl get clusterrolebinding
```

Sample output:

```bash 
NAME                                                   ROLE                                                                               AGE
admin-cluster-binding                                  ClusterRole/cluster-admin                                                          151d
calico-kube-controllers                                ClusterRole/calico-kube-controllers                                                151d
calico-node                                            ClusterRole/calico-node                                                            151d
cluster-admin                                          ClusterRole/cluster-admin                                                          151d
ebs-csi-attacher-binding                               ClusterRole/ebs-external-attacher-role                                             130d
ebs-csi-node-getter-binding                            ClusterRole/ebs-csi-node-role                                                      130d
ebs-csi-provisioner-binding                            ClusterRole/ebs-external-provisioner-role                                          130d
ebs-csi-resizer-binding                                ClusterRole/ebs-external-resizer-role                                              130d
ebs-csi-snapshotter-binding                            ClusterRole/ebs-external-snapshotter-role                                          130d
kubeadm:get-nodes                                      ClusterRole/kubeadm:get-nodes                                                      151d
kubeadm:kubelet-bootstrap                              ClusterRole/system:node-bootstrapper                                               151d
kubeadm:node-autoapprove-bootstrap                     ClusterRole/system:certificates.k8s.io:certificatesigningrequests:nodeclient       151d
kubeadm:node-autoapprove-certificate-rotation          ClusterRole/system:certificates.k8s.io:certificatesigningrequests:selfnodeclient   151d
kubeadm:node-proxier                                   ClusterRole/system:node-proxier                                                    151d
kubernetes-dashboard                                   ClusterRole/kubernetes-dashboard                                                   151d
metrics-server:system:auth-delegator                   ClusterRole/system:auth-delegator                                                  151d
system:basic-user                                      ClusterRole/system:basic-user                                                      151d
system:controller:attachdetach-controller              ClusterRole/system:controller:attachdetach-controller                              151d
system:controller:certificate-controller               ClusterRole/system:controller:certificate-controller                               151d
system:controller:clusterrole-aggregation-controller   ClusterRole/system:controller:clusterrole-aggregation-controller                   151d
system:controller:cronjob-controller                   ClusterRole/system:controller:cronjob-controller                                   151d
 ....

 (output shortened)                                            
```

System role bindings are used by controllers and components that need access to resources across all namespaces. These are cluster-wide bindings.

- **System roles**: 

  - These bindings are prefixed with `system:` 
  - Apply to controllers with global access across namespaces.
  
- **Cluster-admin binding**: 

  - Grants admin access to all resources in the cluster
  - Does not use the `system:` prefix.

## Can I? 

As a user, we can also see if we have access to a resource by running:

```bash
kubectl auth can-i <action> <resource>
```

As an example, to check if I can created pods:

```bash
kubectl auth can-i delete pods  
```

## Check access of another user 

If you are an administrator, you can also check if a user has permissions on the object:

```bash
kubectl auth can-i <action> <object> --as <user>
```

As an example, to check if user Dave can create pods on the "dev" namespace:

```bash
kubectl auth can-i create pods --as dave --namespace dev
```

## Cluster Admin Rolebinding

We can check the **cluster-admin** cluster role-binding by generating the YAML file.

```bash
kubectl get clusterrolebinding cluster-admin -o yaml
``` 

It will return the specs of the resource in YAML format:

```bash 
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  creationTimestamp: "2022-08-09T19:47:23Z"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
  name: cluster-admin
  resourceVersion: "140"
  uid: 4ba86c3c-ff70-4f9e-97c3-78e3cb9efb28
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: system:masters
```

The output can be forwarded and saved to a file: 

```bash
kubectl get clusterrolebinding cluster-admin -o yaml > cluster-admin.yaml
``` 

The **roleRef** indicates which role or **ClusterRole** the binding applies to. For example, `cluster-admin` is a predefined cluster role.

- Role name doesn't need to match the binding name, but they often do.
- `subjects` specify who the role applies to, like the`system:masters` group.
- `apiGroup` defines the Kubernetes API group for the subject
- `apiGroup` is usually `rbac.authorization.k8s.io` for users and groups.

Run the `explain` command to learn more about the subjects:

```bash
kubectl explain clusterrolebinding.subjects
```

Sample output:

```bash
KIND:     ClusterRoleBinding
VERSION:  rbac.authorization.k8s.io/v1

RESOURCE: subjects <[]Object>

DESCRIPTION:
     Subjects holds references to the objects the role applies to.

     Subject contains a reference to the object or user identities a role
     binding applies to. This can either hold a direct API object reference, or
     a value for non-objects such as user and group names.

FIELDS:
   apiGroup     <string>
     APIGroup holds the API group of the referenced subject. Defaults to "" for
     ServiceAccount subjects. Defaults to "rbac.authorization.k8s.io" for User
     and Group subjects.

.....
```


## ClusterRole

A **role** is a set of policy rules. Each rule defines the **Resources** or **Non-Resource URLs** it applies to, such as pods or services. You can specify all resources of a type or target specific resources (e.g., a pod named `my-pod`).

To describe the cluster-admin cluster role:

```bash
kubectl describe clusterrole cluster-admin
```

Sample output:

```bash 
Name:         cluster-admin
Labels:       kubernetes.io/bootstrapping=rbac-defaults
Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
PolicyRule:
  Resources  Non-Resource URLs  Resource Names  Verbs
  ---------  -----------------  --------------  -----
  *.*        []                 []              [*]
             [*]                []              [*] 
```

**Non-Resource URLs** are Kubernetes API endpoints not tied to resources, like the `/healthz` endpoint. Each rule also specifies **Verbs**, which define allowed actions, such as `get`, `list`, or `watch` for read-only access.

Wildcards (*) can apply to all values. For example, the **cluster-admin** role allows any verb on any resource or non-resource URL.

## Cluster Admin Role

View the YAML for the cluster-admin cluster role:

```bash
kubectl get clusterrole cluster-admin -o yaml
```

Sample output: 

```bash 
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  creationTimestamp: "2022-08-09T19:47:23Z"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
  name: cluster-admin
  resourceVersion: "78"
  uid: b698d652-4d9f-4e38-b9fe-d5ec31b2121a
rules:
- apiGroups:
  - '*'
  resources:
  - '*'
  verbs:
  - '*'
- nonResourceURLs:
  - '*'
  verbs:
  - '*' 
```

A role is simply a list of rules. The rules can apply to **resources** or **nonResourceURLs**. The **apiGroups** key is referring to API Groups in Kubernetes. 


## Resources 

- [CKA Certification Course – Certified Kubernetes Administrator](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/)

- [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)



 

 
