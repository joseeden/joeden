---
title: "Pod Security Policies"
description: "Security rules for pod deployments"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 20
last_update:
  date: 3/11/2022
---


## Pod Security Policies

PodSecurityPolicy (PSP) is an admission controller in Kubernetes that allows cluster administrators to enforce security rules for Pods.

- Define policies to specify security requirements for Pods.
- Only Pods meeting the security requirements are allowed to run.
- Pods that do not comply with the policies are rejected.
- PSP policies apply cluster-wide to all Pods.

## The Need for Pod Security Policy

While RBAC controls access to Kubernetes resources, it doesn’t account for specific settings within resources. 

- PSP was introduced to enhance Pod security.
- It prevents risky privileges or settings.
- Usability challenges led to the need for new solutions.

## Deployed as an Admission Controller

PSP is deployed as an admission controller by adding it in the kube-apiserver service file.

<div class='img-center'>

![](/img/docs/psp-adding-parameter-on-kube-apiserver-service-file-and-yaml-file.png)

</div>

Once configured, create the PSP object:

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restrictive-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  seLinux:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  runAsUser:
    rule: MustRunAsNonRoot
  fsGroup:
    rule: RunAsAny
  requiredDropCapabilities:
    - 'ALL'
  defaultAddCapabilities:
    - 'CAP_SYS_TIME'
  allowedCapabilities:
    - 'NET_ADMIN'
    - 'SYS_TIME'
    - 'AUDIT_WRITE'
```

PSP deployment is tricky because policies must be created beforehand, including roles and rolebindings. Without these, Pod creation will be denied.

## Challenges of PSPs

PSP faces key issues:

- **Confusing Application:** 
  - Correctly applying PSPs led to unintended permissions.
  - Lack of clarity in policy application.

- **Limited Visibility:** 
  - Hard to determine which policies applied to Pods.
  - Monitoring and tracking were challenging.

- **Limited Default Modifications:** 
  - Modifying default settings was limited and inconsistent.
  - Limited control over default Pod configuration.

- **No Dry Run Mode:** 
  - Lack of testing features before policy enforcement.
  - Difficult to assess impact without enforcement.

- **Difficult to Enable:** 
  - Complex and risky to enable by default.
  - Challenges in widespread adoption due to complexity.

:::info[NOTE]

These issues led to the deprecation of PSP in Kubernetes.

:::

## Transition to a New Pod Security Solution

Since Kubernetes version 1.21, PSP has been deprecated. Cluster administrators now need alternatives:

- **Policy-as-Code (PAC)** solutions within the Kubernetes ecosystem.
- **Pod Security Standards (PSS)** with Pod Security Admission (PSA).

Notable PAC solutions include:

- Kyverno
- OPA/Gatekeeper
- Open Policy Agent (OPA)
- jsPolicy

For more details, see [SIG Auth Update and Deep Dive – Mo Khan, Red Hat; Mike Danese, Google; & Tim Allclair, Google.](https://youtu.be/SFtHRmPuhEw)