---
title: "Security 1"
tags: 
- Containerization
- Containers
- Kubernetes
- Certifications
- CKA
- CKAD
- CKSS
sidebar_position: 8
last_update:
  date: 12/29/2023
---

> *Some of the scenario questions here are based on Kodekloud's [CKA course labs](https://kodekloud.com/courses/ultimate-certified-kubernetes-administrator-cka-mock-exam/).*


:::info[NOTE]

CKAD and CKA can have similar scenario questions. 
It is recommended to go through the [CKAD practice tests.](/docs/015-Containerization/090-Exams/002-CKAD/015-Practice-Test-CKAD.md)

:::


## Shortcuts

First run the two commands below for shortcuts.

```bash
export do="--dry-run=client -o yaml" 
export now="--force --grace-period=0" 
```

## Questions


1. Identify the certificate file used for the kube-api server.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          4m43s
    kube-system    etcd-controlplane                      1/1     Running   0          4m54s
    kube-system    kube-apiserver-controlplane            1/1     Running   0          4m57s
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          4m54s
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          4m43s
    kube-system    kube-scheduler-controlplane            1/1     Running   0          4m58s

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i cert
        --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
        --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
        --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
        --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
        /etc/ca-certificates from etc-ca-certificates (ro)
        /etc/kubernetes/pki from k8s-certs (ro)
        /etc/ssl/certs from ca-certs (ro)
        /usr/local/share/ca-certificates from usr-local-share-ca-certificates (ro)
        /usr/share/ca-certificates from usr-share-ca-certificates (ro)
    ca-certs:
        Path:          /etc/ssl/certs
    etc-ca-certificates:
        Path:          /etc/ca-certificates
    k8s-certs:
    usr-local-share-ca-certificates:
        Path:          /usr/local/share/ca-certificates
    usr-share-ca-certificates:
        Path:          /usr/share/ca-certificates

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i cert | grep api
        --tls-cert-file=/etc/kubernetes/pki/apiserver.crt 
    ```
    
    </details>
      


2. Identify the Certificate file used to authenticate kube-apiserver as a client to ETCD Server.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          4m43s
    kube-system    etcd-controlplane                      1/1     Running   0          4m54s
    kube-system    kube-apiserver-controlplane            1/1     Running   0          4m57s
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          4m54s
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          4m43s
    kube-system    kube-scheduler-controlplane            1/1     Running   0          4m58s

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i cert | grep api
        --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
    ```
    
    </details>
      


3. Identify the key used to authenticate kubeapi-server to the kubelet server.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          4m43s
    kube-system    etcd-controlplane                      1/1     Running   0          4m54s
    kube-system    kube-apiserver-controlplane            1/1     Running   0          4m57s
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          4m54s
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          4m43s
    kube-system    kube-scheduler-controlplane            1/1     Running   0          4m58s

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i key
        --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
        --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key 
    ```
    
    </details>
      


4. Identify the ETCD Server Certificate used to host ETCD server.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          4m43s
    kube-system    etcd-controlplane                      1/1     Running   0          4m54s
    kube-system    kube-apiserver-controlplane            1/1     Running   0          4m57s
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          4m54s
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          4m43s
    kube-system    kube-scheduler-controlplane            1/1     Running   0          4m58s 

    controlplane ~ ➜  k describe -n kube-system po etcd-controlplane | grep -i cert
        --cert-file=/etc/kubernetes/pki/etcd/server.crt
    ```
    
    </details>
      


5. Identify the ETCD Server CA Root Certificate used to serve ETCD Server.
    ETCD can have its own CA. So this may be a different CA certificate than the one used by kube-api server.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          4m43s
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          4m43s
    kube-system    etcd-controlplane                      1/1     Running   0          4m54s
    kube-system    kube-apiserver-controlplane            1/1     Running   0          4m57s
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          4m54s
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          4m43s
    kube-system    kube-scheduler-controlplane            1/1     Running   0          4m58s 

    controlplane ~ ➜  k describe -n kube-system po etcd-controlplane | grep -i ca
    Priority Class Name:  system-node-critical
        --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
        --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    ```
    
    </details>
      


6. What is the Common Name (CN) configured on the Kube API Server Certificate?

    <details>
      <summary> Answer </summary>

    Find the kube-api server cert first. 

    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          15m
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          15m
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          15m
    kube-system    etcd-controlplane                      1/1     Running   0          16m
    kube-system    kube-apiserver-controlplane            1/1     Running   0          16m
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          16m
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          15m
    kube-system    kube-scheduler-controlplane            1/1     Running   0          16m

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep cert
        --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    ```

    Based on: https://kubernetes.io/docs/tasks/administer-cluster/certificates/
    Use the openssl command to view the certificate. 

    ```bash
    openssl x509  -noout -text -in /etc/kubernetes/pki/apiserver.crt
    ```

    The answer is kube-apiserver.

    ```bash
    controlplane ~ ➜  openssl x509  -noout -text -in /etc/kubernetes/pki/apiserver.crt | grep CN
            Issuer: CN = kubernetes
            Subject: CN = kube-apiserver
    ```
    
    </details>
      


7. What are the alternate names configured on the Kube API Server Certificate?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  openssl x509  -noout -text -in /etc/kubernetes/pki/apiserver.crt | grep -i alternative -A 10
                X509v3 Subject Alternative Name: 
                    DNS:controlplane, DNS:kubernetes, DNS:kubernetes.default, DNS:kubernetes.default.svc, DNS:kubernetes.default.svc.cluster.local, IP Address:10.96.0.1, IP Address:192.20.62.6 
    ```
    
    </details>
      


8. What is the Common Name (CN) configured on the ETCD Server certificate?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          20m
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          20m
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          20m
    kube-system    etcd-controlplane                      1/1     Running   0          21m
    kube-system    kube-apiserver-controlplane            1/1     Running   0          21m
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          21m
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          20m
    kube-system    kube-scheduler-controlplane            1/1     Running   0          21m

    controlplane ~ ➜  k describe -n kube-system po etcd-controlplane | grep cert
        --cert-file=/etc/kubernetes/pki/etcd/server.crt 
    ```

    Based on: https://kubernetes.io/docs/tasks/administer-cluster/certificates/
    Use the openssl command to view the certificate. 

    ```bash
    openssl x509  -noout -text -in /etc/kubernetes/pki/etcd/server.crt 
    ```

    The answer is the controlplane. Issuer is the CA.

    ```bash
    controlplane ~ ➜  openssl x509  -noout -text -in /etc/kubernetes/pki/etcd/server.crt | grep CN
            Issuer: CN = etcd-ca
            Subject: CN = controlplane  
    ``` 
    </details>
      


9. How long, from the issued date, is the Kube-API Server Certificate valid for?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          20m
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          20m
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          20m
    kube-system    etcd-controlplane                      1/1     Running   0          21m
    kube-system    kube-apiserver-controlplane            1/1     Running   0          21m
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          21m
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          20m
    kube-system    kube-scheduler-controlplane            1/1     Running   0          21m

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep cert
        --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    ```

    Based on: https://kubernetes.io/docs/tasks/administer-cluster/certificates/
    Use the openssl command to view the certificate. 

    ```bash
    openssl x509  -noout -text -in /etc/kubernetes/pki/apiserver.crt
    ```
    ```bash
    controlplane ~ ➜  openssl x509  -noout -text -in /etc/kubernetes/pki/apiserver.crt | grep -i validity -A 5
            Validity
                Not Before: Dec 30 13:41:34 2023 GMT
                Not After : Dec 29 13:41:34 2024 GMT
    ```
    
    </details>
      


10. How long, from the issued date, is the Root CA Certificate valid for?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    kube-flannel   kube-flannel-ds-rvnsq                  1/1     Running   0          25m
    kube-system    coredns-5d78c9869d-q28bn               1/1     Running   0          25m
    kube-system    coredns-5d78c9869d-sdgcj               1/1     Running   0          25m
    kube-system    etcd-controlplane                      1/1     Running   0          26m
    kube-system    kube-apiserver-controlplane            1/1     Running   0          26m
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          26m
    kube-system    kube-proxy-5ngt7                       1/1     Running   0          25m
    kube-system    kube-scheduler-controlplane            1/1     Running   0          26m

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep ca
    Priority Class Name:  system-node-critical
        Image ID:      registry.k8s.io/kube-apiserver@sha256:89b8d9dbef2b905b7d028ca8b7f79d35ebd9baa66b0a3ee2ddd4f3e0e2804b45
        --client-ca-file=/etc/kubernetes/pki/ca.crt 
    ```
    Based on: https://kubernetes.io/docs/tasks/administer-cluster/certificates/
    Use the openssl command to view the certificate. 

    ```bash
    openssl x509  -noout -text -in /etc/kubernetes/pki/ca.crt 
    ```
        
    ```bash
    controlplane ~ ➜  openssl x509  -noout -text -in /etc/kubernetes/pki/ca.crt | grep -i validity -A 3
            Validity
                Not Before: Dec 30 13:41:34 2023 GMT
                Not After : Dec 27 13:41:34 2033 GMT
    ```
    
    </details>
      


