---
title: "Pod Security Admission"
description: ""
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 21
last_update:
  date: 7/7/2022
---


## PSA and PSS  

The Pod Security Standards (PSS) and Pod Security Admission (PSA) were introduced to manage pod security after the deprecation of Pod Security Policies (PSP).

- They address ongoing pod security needs in Kubernetes.
- PSA is enabled by default, has built-in security controls.

## Pod Security Admission (PSA)  

PSA is a Kubernetes solution that enforces pod security standards automatically. 

- Integrates a webhook for admission controllers to enforce PSS rules.
- Helps automate security enforcement, like Policy as Code (PAC) systems.

## Pod Security Standards (PSS)  

PSS defines three security policies with varying levels of restrictiveness:

- **Privileged:**  
    - Grants full access for system components needing elevated privileges 
    - System component examples: logging agents, CNIs
    - Suitable for essential system operations.  

- **Baseline:**  
    - Prevents privilege escalation while allowing minimal changes.  
    - Suitable for most general workloads.  

- **Restricted:**  
    - Adds stricter controls than Baseline
    - Includes blocking root user/group access.  
    - Ideal for security-sensitive applications.  

For more information, please see [Pod Security Standards.](https://kubernetes.io/docs/concepts/security/pod-security-standards/)

## Namespace Labels in PSA

PSA is configured at the namespace level.

<div class='img-center'>

![](/img/docs/configuring-psa-at-namespace-levels.png)

</div>

Namespace labels determine the policy applied to all Pods within the namespace.

- **Label Key:**  
    - `pod-security.kubernetes.io/enforce`  
    - `pod-security.kubernetes.io/audit`  
    - `pod-security.kubernetes.io/warn`

- **Label Value:**  
    - Aligns with Pod Security Standards levels 
    - PSS Levels: privileged, baseline, or restricted
    - Label values:
        - `enforced`
        - `audited`
        - `warned`  

## PSA Modes

PSA modes define how Pod Security Policies are applied to Pods within a namespace. 

- **Enforce:**  
    - Pods are rejected if they don't meet the policy requirements.  
    - Strictly enforces policy and ensures only compliant Pods can run.

- **Audit:**  
    - Pods are allowed, but violations are recorded in the audit log.  
    - Allows non-compliant Pods but keeps record of violations for later review.

- **Warn:**  
    - Pods run but generate warnings if they violate the policy.  
    - Informs users of violations without blocking or rejecting Pods.

<div class='img-center'>

![](/img/docs/configuring-psa-and-profiles-for-pss-psa.png)

</div>


## Examples of PSA Modes Application

- **Enforce Mode**

    Namespace label:

    ```bash
    pod-security.kubernetes.io/enforce: restricted
    ```

    Effect: Pods not meeting the 'restricted' PSS are rejected.


- **Audit Mode**

    Namespace label:

    ```bash
    pod-security.kubernetes.io/audit: baseline
    ```

    Effect: Violations are logged, but Pods are allowed to run.

- **Warn Mode**

    Namespace label:

    ```bash
    pod-security.kubernetes.io/warn: privileged
    ```

    Effect: Warnings are generated for non-compliant Pods, but no enforcement occurs.



## PSA Exemptions

Some exceptions are needed to bypass normal security checks.

- **Usernames**  

    - Trusted users, like admins or automated processes, bypass checks.  
    - Ensures essential operations are not interrupted.

- **RuntimeClassNames**  

    - Special Pods with unique runtime needs bypass checks.  
    - Used for performance or compatibility reasons.

- **Namespaces**  

    - Certain namespaces can be exempt from rules.  
    - Allows Pods in those namespaces more flexibility.

## Configuring PSA Exemptions 

PSA Exemptions can be set in two ways:

1. **Directly in the PSA admission controller:**  
    - Special passes are programmed directly into the admission controller.

2. **Using a ConfigMap in the Validating Webhook:**  
    - A ConfigMap contains the rules and exemptions.  
    - The file is placed in the 'pod-security-webhook' container.

Both methods ensure Kubernetes remains secure while allowing flexibility for special cases.


## PSS in Action 

Here are examples of how different Pod Security Standards can be applied:

- **Privileged Level**  

  Used for workloads requiring full capabilities and access to the host.  
  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: privileged-pod
  spec:
    containers:
    - name: privileged-container
      image: nginx
      securityContext:
        privileged: true
  ```

- **Baseline Level**  

  Default setting to prevent privilege escalation.  
  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: baseline-pod
  spec:
    containers:
    - name: baseline-container
      image: nginx
      securityContext:
        allowPrivilegeEscalation: false
  ```

- **Restricted Level** 

  For high-security workloads, preventing privilege escalation and enforcing additional security controls.  
  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: restricted-pod
  spec:
    securityContext:
      seccompProfile:
        type: RuntimeDefault
    containers:
    - name: restricted-container
      image: nginx
      securityContext:
        allowPrivilegeEscalation: false
        runAsNonRoot: true
        readOnlyRootFilesystem: true
  ```

## Use Cases

Examples of workloads and appropriate PSS levels:

- **Privileged**

  - Container managing the host’s network stack.  
  - System tools requiring elevated privileges.  

- **Baseline**

  - API server with limited permissions.  
  - Web server with basic security needs.  

- **Restricted**

  - Payment app handling sensitive data.  
  - Security-critical workloads requiring strict control.
  
## Migrating from PSP to PSA

Follow these steps when transitioning from PodSecurityPolicy (PSP) to Pod Security Admission (PSA):

1. Review your current PSPs and security policies.  
2. Learn how PSA works and choose the appropriate level:  
    - Privileged  
    - Baseline  
    - Restricted  
3. Enable PSA in audit mode to test your policies.  
4. Map PSP policies to PSA or create new ones.  
5. Use PSA in Warn Mode to identify issues.  
6. Monitor audit and warning logs.  
7. Switch from audit to enforce mode when ready.  
8. Start small and implement changes gradually.  
9. Keep your team informed about new policies.  
