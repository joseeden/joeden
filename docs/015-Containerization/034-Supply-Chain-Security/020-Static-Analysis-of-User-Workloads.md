---
title: "Static Analysis of User Workloads"
description: "Inspect container images for security issues."
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



## Static Analysis

Static analysis of user workloads in Kubernetes involves inspecting the configuration of deployed resources without running them.

- Detects security vulnerabilities and issues.
- Ensures best practices before deployment.
- Maintains security and reliability.


## Enforcing Policies Earlier

Static analysis focuses on reviewing resource files to enforce policies early in the development cycle, before deployment to the cluster.

- Identify issues before code reaches production.
- Ensures policy compliance during development.
- Catch misconfigurations early to reduce risks.


## Static Analysis Tools

These tools can be integrated into your CI/CD pipeline to catch issues early in the development lifecycle.

1. **kube-score**  
   - Analyzes Kubernetes YAML files.  
   - Provides a score based on best practices and security.  
   - [Learn more](https://github.com/zegl/kube-score)

2. **kube-linter**  
   - Scans YAML files for security and best practices.  
   - Identifies common issues in manifests.  
   - [Learn more](https://github.com/stackrox/kube-linter)

3. **kubeval**  
   - Validates YAML files against Kubernetes schemas.  
   - Detects syntax and structure errors.  
   - [Learn more](https://github.com/instrumenta/kubeval)

4. **Kubernetes Policy Controller**  
   - Enforces policies on Kubernetes resources.  
   - OPA-based engine for custom rules.  
   - [Learn more](https://github.com/open-policy-agent/gatekeeper)

5. **kube-bench**  
   - Checks Kubernetes security with the CIS benchmark.  
   - Identifies security misconfigurations.  
   - [Learn more](https://github.com/aquasecurity/kube-bench)

6. **kube-hunter**  
   - Scans clusters for security vulnerabilities.  
   - Performs penetration testing to identify risks.  
   - [Learn more](https://github.com/aquasecurity/kube-hunter)


## Kubesec 

Kubesec scans Kubernetes manifests to find security issues before deployment.

- Identifies issues and suggests fixes.  
- Provides detailed security advisories.  
- Integrates into CI/CD pipelines.  
- Supports JSON output for automation.

Installation:

- [Docker container image at docker.io/kubesec/kubesec:v2](https://hub.docker.com/r/kubesec/kubesec/tags)
- [Linux/MacOS/Win binary (latest release)](https://github.com/controlplaneio/kubesec/releases))
- [Kubernetes Admission Controller](https://github.com/stefanprodan/kubesec-webhook)
- [Kubectl plugin](https://github.com/stefanprodan/kubectl-kubesec)

To run kubesec:

```bash
kubesec scan pod.yaml 
```

Another option is through a POST request.

```bash
curl -sSX POST --data-binary @"pod.yaml" https://v2.kubesec.io/scan
```

Kubesec can also be ran as a server locally:

```bash
kubesec http 8080 & 
```

 

 
