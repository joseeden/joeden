---
title: "Certificate Authority"
description: "Certificate Authority"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 46
last_update:
  date: 4/7/2022
---

## Overview

By default, kubeadm creates a self-signed certificate authority (CA)

- CA can also be created to be a part of an external PKI
- used to secure cluster communications 
- generates certificates used by API server to encrypt HTTPS
- generates certificates for authenticating users and kubelets
- certificates will be distributed to each node

The CA files will be stored in:

```bash
/etc/kubernetes/pki  
```


 

 
