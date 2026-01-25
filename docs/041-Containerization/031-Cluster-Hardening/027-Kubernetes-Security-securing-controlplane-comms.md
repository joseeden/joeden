---
title: "Securing the Control Plane"
description: "Securing Control Plane Communications with Ciphers"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 27
last_update:
  date: 3/11/2022
---


## Ciphers 

TLS uses Public Key Encryption, which relies on cryptographic algorithms called ciphers. As mathematicians discover stronger ciphers, they gradually replace older ones.

To adopt a new cipher, software libraries must be updated, ensuring compatibility with older ciphers. This update affects various software that uses TLS, including:

- Browsers
- Web clients (e.g., curl, wget)
- Web servers (e.g., IIS, nginx, Apache)
- Layer 7 appliances (e.g., AWS ALB, WAFs)
- Kubernetes components (e.g., API server, kubelet)
- etcd

When a TLS connection is established, both ends negotiate which cipher to use, typically choosing the strongest common cipher. The ciphers available depend on the software versions at each end.

Software often allows limiting the available ciphers to stronger ones, preventing older clients (with weaker ciphers) from connecting, reducing the risk of exploitation.


## Kubernetes Control Plane

The Kubernetes control plane components (API server, controller manager, kubelet, scheduler) have two optional settings:

- `--tls-min-version`: Sets the minimum TLS version allowed for connections. Options:
    - `VersionTLS10` (default)
    - `VersionTLS11`
    - `VersionTLS12`
    - `VersionTLS13`
  
- `--tls-cipher-suites`: Specifies a comma-separated list of allowed cipher suites for connection negotiation. If not set, the default list from GoLang is used.

`etcd` also supports a `--cipher-suites` argument to control which ciphers are allowed for API server → etcd communication. It's recommended to use the newest/strongest ciphers.

- `--cipher-suites`: Sets a list of allowed ciphers, defaulting to GoLang's list if not set.

Note: Not all cipher suites and TLS versions are compatible. For example, if `--tls-min-version` is set to `VersionTLS13`, some ciphers may not work. Using an incompatible cipher will prevent the API server from starting.


## Sample Scenario 

To restrict communication between `etcd` and the API server using TLS 1.2 and a specific cipher:

1. **Cipher**: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256  
2. **TLS Version**: TLS 1.2

**Solution**:

1. Edit the API server manifest and add:

    ```bash
    --tls-min-version=VersionTLS12
    --tls-cipher-suites=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
    ```

2. Edit the `etcd` manifest and add:

    ```bash
    --cipher-suites=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
    ```

3. Restart both pods, which may take a minute or more.



 

 
