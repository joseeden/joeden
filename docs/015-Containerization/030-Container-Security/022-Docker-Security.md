---
title: "Container Security"
description: "Container Security"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 22
last_update:
  date: 7/7/2022
---


## Security Risks

When using containers, it's important to keep an eye on potential risks:

- Containers share the same kernel, increasing exposure to vulnerabilities.  
- Running containers as root can lead to privilege escalation.  
- Public images may harbor malicious software, putting systems at risk.  

## Cloud Native Security 

Cloud Native Security consists of four key layers to protect applications:

- Cloud/Colocation/Corporate datacenter
- Cluster
- Container
- Code

## Docker Security 

Docker implements several security features:

- **Swarm mode** 
  - Security settings are enabled by default.
  - Utilizes PKI for managing certificates.
  - Creates secure tunnels between container endpoints.

- **Docker Content Trust** 
  - Ensures image integrity through signing:
    ```bash
    export DOCKER_CONTENT_TRUST=1 
    ```

- **Security Scanning** 
  - Automatically scans images for vulnerabilities.

- **Secrets** 
  - Encrypts and securely stores sensitive data:
    ```bash
    docker secret 
    ```