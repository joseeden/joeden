---
title: "Security"
tags: 
- Containerization
- Containers
- Kubernetes
- Certifications
- CKA
- CKAD
- CKSS
sidebar_position: 9
last_update:
  date: 12/29/2023
---

> *Some of the scenario questions here are based on Kodekloud's [CKA course labs](https://kodekloud.com/courses/ultimate-certified-kubernetes-administrator-cka-mock-exam/).*


:::info[NOTE]

CKAD and CKA can have similar scenario questions. 
It is recommended to go through the [CKAD practice tests.](/docs/041-Containerization/090-Exams/002-CKAD/015-Practice-Test-CKAD.md)

:::


## Shortcuts

First run the two commands below for shortcuts.

```bash
export do="--dry-run=client -o yaml" 
export now="--force --grace-period=0" 
```

## Questions

11. Kubectl suddenly stops responding to your commands. Check it out! Someone recently modified the /etc/kubernetes/manifests/etcd.yaml file

    You are asked to investigate and fix the issue. Once you fix the issue wait for sometime for kubectl to respond. Check the logs of the ETCD container.

    <details>
      <summary> Answer </summary>

    Check the certs. 

    ```bash
    controlplane ~ ➜  grep cert /etc/kubernetes/manifests/etcd.yaml
        - --cert-file=/etc/kubernetes/pki/etcd/server-certificate.crt
        - --client-cert-auth=true
        - --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
        - --peer-client-cert-auth=true
        name: etcd-certs
        name: etcd-certs

    controlplane ~ ➜  ls -la /etc/kubernetes/pki/etcd/
    total 40
    drwxr-xr-x 2 root root 4096 Dec 30 08:41 .
    drwxr-xr-x 3 root root 4096 Dec 30 08:41 ..
    -rw-r--r-- 1 root root 1086 Dec 30 08:41 ca.crt
    -rw------- 1 root root 1679 Dec 30 08:41 ca.key
    -rw-r--r-- 1 root root 1159 Dec 30 08:41 healthcheck-client.crt
    -rw------- 1 root root 1675 Dec 30 08:41 healthcheck-client.key
    -rw-r--r-- 1 root root 1208 Dec 30 08:41 peer.crt
    -rw------- 1 root root 1679 Dec 30 08:41 peer.key
    -rw-r--r-- 1 root root 1208 Dec 30 08:41 server.crt
    -rw------- 1 root root 1679 Dec 30 08:41 server.key 
    ```

    We can see above that the server cert defined is incorrect. Fix the YAML file. 

    ```bash
    --cert-file=/etc/kubernetes/pki/etcd/server.crt
    ```

    </details>
      


12. The kube-api server stopped again! Check it out. Inspect the kube-api server logs and identify the root cause and fix the issue. Hint: Find the kube-apiserver container.

    <details>
      <summary> Answer </summary>

    We can use crictl. 

    ```bash
    controlplane ~ ➜  crictl ps -a | grep apiserver
    7ca09e4553971       6f707f569b572       2 minutes ago       Exited              kube-apiserver            5                   ec0124d62fe6d       kube-apiserver-controlplane
    ```

    Then check logs.

    ```bash
    controlplane ~ ➜  crictl logs 7ca09e4553971 | tail -1 

    W1230 14:21:08.206143       1 logging.go:59] [core] [Channel #3 SubChannel #6] grpc: addrConn.createTransport failed to connect to {
    "Addr": "127.0.0.1:2379",
    "ServerName": "127.0.0.1",
    "Attributes": null,
    "BalancerAttributes": null,
    "Type": 0,
    "Metadata": null
    }. Err: connection error: desc = "transport: authentication handshake failed: tls: failed to verify certificate: x509: certificate signed by unknown authority"
    E1230 14:21:10.930501       1 run.go:74] "command failed" err="context deadline exceeded"
    ```

    This could be an issue on the ETCD CA cert used. Check the certs.

    ```bash
    controlplane ~ ✖ ls -la /etc/kubernetes/pki/
    total 72
    drwxr-xr-x 3 root root 4096 Dec 30 08:41 .
    drwxr-xr-x 1 root root 4096 Dec 30 08:41 ..
    -rw-r--r-- 1 root root 1289 Dec 30 08:41 apiserver.crt
    -rw-r--r-- 1 root root 1155 Dec 30 08:41 apiserver-etcd-client.crt
    -rw------- 1 root root 1675 Dec 30 08:41 apiserver-etcd-client.key
    -rw------- 1 root root 1679 Dec 30 08:41 apiserver.key
    -rw-r--r-- 1 root root 1164 Dec 30 08:41 apiserver-kubelet-client.crt
    -rw------- 1 root root 1679 Dec 30 08:41 apiserver-kubelet-client.key
    -rw-r--r-- 1 root root 1099 Dec 30 08:41 ca.crt
    -rw------- 1 root root 1675 Dec 30 08:41 ca.key
    drwxr-xr-x 2 root root 4096 Dec 30 08:41 etcd
    -rw-r--r-- 1 root root 1115 Dec 30 08:41 front-proxy-ca.crt
    -rw------- 1 root root 1679 Dec 30 08:41 front-proxy-ca.key
    -rw-r--r-- 1 root root 1119 Dec 30 08:41 front-proxy-client.crt
    -rw------- 1 root root 1679 Dec 30 08:41 front-proxy-client.key
    -rw------- 1 root root 1675 Dec 30 08:41 sa.key
    -rw------- 1 root root  451 Dec 30 08:41 sa.pub  

    controlplane ~ ➜  ls -la /etc/kubernetes/pki/etcd/
    total 40
    drwxr-xr-x 2 root root 4096 Dec 30 08:41 .
    drwxr-xr-x 3 root root 4096 Dec 30 08:41 ..
    -rw-r--r-- 1 root root 1086 Dec 30 08:41 ca.crt
    -rw------- 1 root root 1679 Dec 30 08:41 ca.key
    -rw-r--r-- 1 root root 1159 Dec 30 08:41 healthcheck-client.crt
    -rw------- 1 root root 1675 Dec 30 08:41 healthcheck-client.key
    -rw-r--r-- 1 root root 1208 Dec 30 08:41 peer.crt
    -rw------- 1 root root 1679 Dec 30 08:41 peer.key
    -rw-r--r-- 1 root root 1208 Dec 30 08:41 server.crt
    -rw------- 1 root root 1679 Dec 30 08:41 server.key
    ```

    ```bash
    controlplane ~ ➜  ls -la /etc/kubernetes/manifests/
    total 28
    drwxr-xr-x 1 root root 4096 Dec 30 09:17 .
    drwxr-xr-x 1 root root 4096 Dec 30 08:41 ..
    -rw------- 1 root root 2399 Dec 30 09:16 etcd.yaml
    -rw------- 1 root root 3872 Dec 30 09:17 kube-apiserver.yaml
    -rw------- 1 root root 3393 Dec 30 08:41 kube-controller-manager.yaml
    -rw------- 1 root root 1463 Dec 30 08:41 kube-scheduler.yaml  

    controlplane ~ ➜  grep etcd /etc/kubernetes/manifests/kube-apiserver.yaml 
        - --etcd-cafile=/etc/kubernetes/pki/ca.crt
        - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
        - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
        - --etcd-servers=https://127.0.0.1:2379
    ```

    Fix the --etcd-cafile in the YAML file. 

    ```bash
    --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
    ```
    
    </details>
      


13. A new member akshay joined our team. He requires access to our cluster. The Certificate Signing Request is at the /root location.

    - Create a CertificateSigningRequest object with the name akshay with the contents of the akshay.csr file

    - As of kubernetes 1.19, the API to use for CSR is certificates.k8s.io/v1.

    - Please note that an additional field called signerName should also be added when creating CSR. 
    
    - For **client authentication** to the API server we will use the built-in signer kubernetes.io/kube-apiserver-client.

    - Approve the CSR Request

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  ls -l
    total 8
    -rw-r--r-- 1 root root  887 Dec 30 09:36 akshay.csr
    -rw------- 1 root root 1679 Dec 30 09:36 akshay.key 
    ```

    Generate the base64 encoded format:

    ```bash
    controlplane ~ ➜  cat akshay.csr | base64 -w 0

    LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZqQ0NBVDRDQVFBd0VURVBNQTBHQTFVRUF3d0dZV3R6YUdGNU1JSUJJakFOQmdrcW
    ``` 

    Create the YAML file.
    Follow: https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster/#create-a-certificatesigningrequest-object-to-send-to-the-kubernetes-api

    ```bash
    ## akshay-csr.yaml 
    apiVersion: certificates.k8s.io/v1
    kind: CertificateSigningRequest
    metadata:
      name: akshay
    spec:
      request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZqQ0NBVDRDQVFBd0VURVBNQTBHQTFVRUF3d0dZV3R6YUdGNU1JSUJJakFOQmdrcW
      signerName: kubernetes.io/kube-apiserver-client
      usages:
      - client auth 
    ``` 
    ```bash
    controlplane ~ ➜  k apply -f akshay-csr.yaml 
    certificatesigningrequest.certificates.k8s.io/akshay created

    controlplane ~ ➜  k get csr
    NAME        AGE   SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    akshay      8s    kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Pending
    csr-fnjbq   20m   kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued 
        
    controlplane ~ ➜  kubectl certificate approve akshay
    certificatesigningrequest.certificates.k8s.io/akshay approved

    controlplane ~ ➜  k get csr
    NAME        AGE     SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    akshay      3m10s   kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Approved,Issued
    csr-fnjbq   23m     kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued    
    ``` 

    </details>
      


14. There is a new CSR. What groups is this CSR requesting access to? 

    - We need to reject it.
    - After rejecting, delete the CSR.

    ```bash
    controlplane ~ ➜  k get csr
    NAME          AGE     SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    agent-smith   7s      kubernetes.io/kube-apiserver-client           agent-x                    <none>              Pending
    akshay        4m13s   kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Approved,Issued
    csr-fnjbq     24m     kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get csr agent-smith -o yaml
    apiVersion: certificates.k8s.io/v1
    kind: CertificateSigningRequest
    metadata:
      creationTimestamp: "2023-12-30T14:54:23Z"
      name: agent-smith
    resourceVersion: "2368"
    uid: 91311095-f323-42a0-a704-db17451ef8ff
    spec:
      groups:
      - system:masters
      - system:authenticated
      request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1dEQ0NBVUFDQVFBd0V6RVJNQThHQTFVRUF3d0libVYzTFhWelpYSXdnZ0VpTUEwR0NTcUdTSWIzRFFFQgpBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRE8wV0pXK0RYc0FKU0lyanBObzV2UklCcGxuemcrNnhjOStVVndrS2kwCkxmQzI3dCsxZUVuT041TXVxOTlOZXZtTUVPbnJEVU8vdGh5VnFQMncyWE5JRFJYall5RjQwRmJtRCs1eld5Q0sKeTNCaWhoQjkzTUo3T3FsM1VUdlo4VEVMcXlhRGtuUmwvanYvU3hnWGtvazBBQlVUcFdNeDRCcFNpS2IwVSt0RQpJRjVueEF0dE1Wa0RQUTdOYmVaUkc0M2IrUVdsVkdSL3o2RFdPZkpuYmZlek90YUF5ZEdMVFpGQy93VHB6NTJrCkVjQ1hBd3FDaGpCTGt6MkJIUFI0Sjg5RDZYYjhrMzlwdTZqcHluZ1Y2dVAwdEliT3pwcU52MFkwcWRFWnB3bXcKajJxRUwraFpFV2trRno4MGxOTnR5VDVMeE1xRU5EQ25JZ3dDNEdaaVJHYnJBZ01CQUFHZ0FEQU5CZ2txaGtpRwo5dzBCQVFzRkFBT0NBUUVBUzlpUzZDMXV4VHVmNUJCWVNVN1FGUUhVemFsTnhBZFlzYU9SUlFOd0had0hxR2k0CmhPSzRhMnp5TnlpNDRPT2lqeWFENnRVVzhEU3hrcjhCTEs4S2czc3JSRXRKcWw1ckxaeTlMUlZyc0pnaEQ0Z1kKUDlOTCthRFJTeFJPVlNxQmFCMm5XZVlwTTVjSjVURjUzbGVzTlNOTUxRMisrUk1uakRRSjdqdVBFaWM4L2RoawpXcjJFVU02VWF3enlrcmRISW13VHYybWxNWTBSK0ROdFYxWWllKzBIOS9ZRWx0K0ZTR2poNUw1WVV2STFEcWl5CjRsM0UveTNxTDcxV2ZBY3VIM09zVnBVVW5RSVNNZFFzMHFXQ3NiRTU2Q0M1RGhQR1pJcFVibktVcEF3a2ErOEUKdndRMDdqRytocGtueG11RkFlWHhnVXdvZEFMYUo3anUvVERJY3c9PQotLS0tLUVORCBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0K
      signerName: kubernetes.io/kube-apiserver-client
      usages:
      - digital signature
      - key encipherment
      - server auth
    username: agent-x
    status: {} 

    controlplane ~ ➜  k get csr
    NAME          AGE     SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    agent-smith   2m53s   kubernetes.io/kube-apiserver-client           agent-x                    <none>              Pending
    akshay        6m59s   kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Approved,Issued
    csr-fnjbq     27m     kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued

    controlplane ~ ➜  kubectl certificate deny agent-smith
    certificatesigningrequest.certificates.k8s.io/agent-smith denied

    controlplane ~ ➜  k get csr
    NAME          AGE     SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    agent-smith   3m9s    kubernetes.io/kube-apiserver-client           agent-x                    <none>              Denied
    akshay        7m15s   kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Approved,Issued
    csr-fnjbq     27m     kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued
    ```

    To delete the CSR, generate the YAML and use the kubectl delete.

    ```bash
    controlplane ~ ➜  k get csr agent-smith -o yaml > agent-smith.yml

    controlplane ~ ➜  k delete -f agent-smith.yml 
    certificatesigningrequest.certificates.k8s.io "agent-smith" deleted

    controlplane ~ ➜  k get csr
    NAME        AGE     SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    akshay      9m59s   kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Approved,Issued
    csr-fnjbq   30m     kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued  
    ```
    
    </details>
      


15. Where is the default kubeconfig file located in the current environment?

    <details>
      <summary> Answer </summary>

    The answer is /root/.kube/config
    ```bash
    controlplane ~ ➜  ls -la
    total 60
    drwx------ 1 root root 4096 Dec 30 10:02 .
    drwxr-xr-x 1 root root 4096 Dec 30 09:57 ..
    -rw-r--r-- 1 root root 1272 Dec 30 09:57 .bash_profile
    -rw-r--r-- 1 root root 3265 Nov  2 11:39 .bashrc
    drwxr-xr-x 1 root root 4096 Dec 30 10:02 .cache
    drwxr-xr-x 2 root root 4096 Dec 30 10:02 CKA
    drwxr-xr-x 1 root root 4096 Nov  2 11:36 .config
    drwxr-xr-x 3 root root 4096 Dec 30 10:02 .kube
    -rw-rw-rw- 1 root root 1456 Dec 30 10:02 my-kube-config
    -rw-r--r-- 1 root root  161 Dec  5  2019 .profile
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml
    drwx------ 2 root root 4096 Dec 30 10:02 .ssh
    drwxr-xr-x 4 root root 4096 Nov  2 11:37 .vim
    -rw-r--r-- 1 root root  132 Nov  2 11:37 .vimrc
    -rw-r--r-- 1 root root  165 Nov  2 11:38 .wget-hsts

    controlplane ~ ➜  ls -la .kube/
    total 24
    drwxr-xr-x 3 root root 4096 Dec 30 10:02 .
    drwx------ 1 root root 4096 Dec 30 10:02 ..
    drwxr-x--- 4 root root 4096 Dec 30 10:02 cache
    -rw------- 1 root root 5640 Dec 30 09:57 config 
    ```
    
    </details>
         


16. In the default kubeconfig file, what is the user configured in the current context?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~/.kube ➜  grep -i context config
    contexts:
    - context:
    current-context: kubernetes-admin@kubernetes

    controlplane ~/.kube ➜  grep -i current-context -A 5 config
    current-context: kubernetes-admin@kubernetes
    kind: Config
    preferences: {}
    users:
    - name: kubernetes-admin 
    ```
    
    </details>
      


17. A new kubeconfig file named my-kube-config is created. It is placed in the /root directory. How many clusters are defined in that kubeconfig file?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  ls -l
    total 8
    drwxr-xr-x 2 root root 4096 Dec 30 10:02 CKA
    -rw-rw-rw- 1 root root 1456 Dec 30 10:08 my-kube-config
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml

    controlplane ~ ➜  grep cluster my-kube-config 
    clusters:
    cluster:
    cluster:
    cluster:
    - name: test-cluster-1
    cluster:
        cluster: development
        cluster: kubernetes-on-aws
        cluster: production
        cluster: test-cluster-1 
    ```
    
    </details>
      


18. In the new my-kube-config, what user is configured in the research context?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  grep -A 5 research my-kube-config 
    - name: research
    context:
        cluster: test-cluster-1
        user: dev-user 
    ```
    
    </details>
      


19. In the new my-kube-config, what is the name of the client-certificate file configured for the aws-user?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  grep -A 10 aws-user  my-kube-config

    --
    - name: aws-user
    user:
        client-certificate: /etc/kubernetes/pki/users/aws-user/aws-user.crt
        client-key: /etc/kubernetes/pki/users/aws-user/aws-user.key
    ```
    
    </details>
      


20. I would like to use the dev-user to access test-cluster-1. Set the current context to the right one so I can do that.

    Once the right context is identified, use the kubectl config use-context command.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✖ k config --kubeconfig my-kube-config get-contexts
    CURRENT   NAME                         CLUSTER             AUTHINFO    NAMESPACE
            aws-user@kubernetes-on-aws   kubernetes-on-aws   aws-user    
            research                     test-cluster-1      dev-user    
    *         test-user@development        development         test-user   
            test-user@production         production          test-user  

    controlplane ~ ➜  k config --kubeconfig my-kube-config use-context research
    Switched to context "research".

    controlplane ~ ➜  k config --kubeconfig my-kube-config get-contexts
    CURRENT   NAME                         CLUSTER             AUTHINFO    NAMESPACE
            aws-user@kubernetes-on-aws   kubernetes-on-aws   aws-user    
    *         research                     test-cluster-1      dev-user    
            test-user@development        development         test-user   
            test-user@production         production          test-user            
    ```
    
    </details>
      
