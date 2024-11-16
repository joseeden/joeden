---
title: "Authentication Mechanisms"
description: "Authentication Mechanisms"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 14
last_update:
  date: 7/7/2022
---


## Overview
Kubernetes API server supports several authentication methods to secure access to the cluster. Here's a brief description of each:

1. **Static Password File Authentication**
   - Stores usernames and hashed passwords in a static file.
   - Not recommended; use RBAC for new users.

        <div class='img-center'>

        ![](/img/docs/k8s-security-kube-apiserver-basic-auth-file.png)

        </div>


2. **Client Certificate Authentication**
   - Clients present a certificate signed by the cluster's CA.
   - Ensures strong identity verification for both users and applications.

3. **Bearer Token Authentication**
   - Clients send a token in request headers.
   - Tokens are linked to user or service accounts.

4. **Bootstrap Tokens**
   - Used during the bootstrapping process to set up initial cluster components.
   - Replaced by other methods once the cluster is ready.

5. **Service Account Tokens**
   - Pods and services are linked to service accounts.
   - Tokens are automatically mounted in pods for API server authentication.

6. **OpenID Connect Tokens**
   - Integrates with OpenID Connect providers.
   - Supports single sign-on (SSO) and identity federation.

7. **Webhook Token Authentication**
   - External authentication services validate tokens via webhooks.
   - Response from the webhook determines authentication success.

8. **Azure Active Directory (AAD) Integration**
   - Integrates with Azure AD for user authentication.
   - Uses Azure AD identities for Kubernetes resource access.

9. **Client Certificate Rotation**
   - Regularly rotates client certificates for improved security.
   - Prevents long-term exposure of the same certificate.

10. **Node Bootstrapping**
    - Nodes use a bootstrap token for initial registration.
    - Authenticates nodes with the cluster during the bootstrap process.

These methods can be configured based on your security needs and infrastructure.

## Resources 

- [CKA Certification Course – Certified Kubernetes Administrator](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/)
- [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)