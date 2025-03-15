---
title: "TLS in Kubernetes"
description: "TLS in Kubernetes"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 19
last_update:
  date: 3/11/2022
---


 
## TLS in Kubernetes 


To secure a Kubernetes cluster, we need to encrypt:

- Communication between master and worker nodes.
- Communication between clients (users) and the cluster.

<div class='img-center'>

![](/img/docs/tlsinkubernetes.png)  

</div>

There are three types of certificates we need:

- Root certificates (CA)
- Server certificates
- Client certificates

### Server Certificates for Servers

In self-managed Kubernetes clusters (e.g., using kubeadm), you need to generate the following keypairs:

<div class='img-center'>

![](/img/docs/servercertsforservers.png)

</div>

### Client Certificates 

For the client's side, there's actually four clients that talks to the kube-apiserver.

- admin/users
- kube scheduler 
- kube-controller manager
- kube-proxy 

<div class='img-center'>

![](/img/docs/cleintcertificatesforkubernetes.png)

</div>

### Root Server (CA)

In a Kubernetes setup, the CA is simply a pair of key and certificate files. The server where these files are securely stored are called the CA server. These certificates can also be placed in the master node, which makes the master node a CA server.

## Generating the Certificates 

You can use these tools to generate certificates:

- EasyRSA
- OpenSSL
- CFSSL

### Certificate Authority (CA) Certificates

1. Generate a private key for the CA:

    ```bash
    openssl genrsa -out ca.key 2048
    ```

2. Generate a CSR (Certificate Signing Request) with the private key:

    ```bash
    openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr
    ```

3. Sign the CSR to create the CA certificate:

    ```bash
    openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
    ```

This CA key pair is used to sign all other certificates.

### Client Certificates 

1. Generate a private key for the client:

    ```bash
    openssl genrsa -out admin.key 2048
    ```

2. Create a CSR for the client:

    ```bash
    openssl req -new -key admin.key -subj "/CN=kube-admin/O=system:master" -out admin.csr
    ```

3. Sign the client certificate:

    ```bash
    openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt
    ```

### Other Client Certificates 

The same steps is followed for generating the other client certificates:

1. Generate a private key.
2. Create a CSR.
3. Sign the certificate.

The other server certificates need to be generated (for self-managed Kubernetes cluster):

- kube scheduler 
- kube-controller manager
- kube-proxy

### Server Certificates 

The same steps is followed for generating the other client certificates:

1. Generate a private key.
2. Create a CSR.
3. Sign the certificate.

The following set of certs need to be generated:

- etcd server certificate
- kube-api server certificate
- kubelet certificate

For the etcd server, it can be deployed in an HA setup thus we will need additional peer certificates. The certificates are then specified in the etcd.yaml file alogn with the CA root certificate. 

<div class='img-center'>

![](/img/docs/etcserver-certs-3.png)

</div>


For the kube-apiserver, we can specify an **openssl.cnf** file and specify the alternate names for the kube-apiserver.

```bash
[ req ]
req_extensions = v3_req

[v3_req]
basicConstraints = CA:FALSE 
keyUsage = nonRepudiation ,
sibjectAltName = @alt_names 

[alt_names]
DNS.1 = kubernetes 
DNS.2 = kubernetes.default 
DNS.3 = kubernetes.default.svc 
DNS.4 = kubernetes.default.svc.cluster.local 
IP.1 =  10.23.45.61 
IP.2 = 172.16.1.88
```

Generate the private key the same way:

```bash
openssl genrsa -out apiserver.key 2048                      # apiserver.key
```

Create the CSR. Make sure to specify the config file. 

```bash
openssl req -new -key admin.key -subj \          
    "/CN=kube-apiserver" -out apiserver.csr \
    -config openssl.cnf            
```

Then sign the certificate:

```bash
openssl x509 -req -in apiserver.csr \
    -CA ca.crt -CAkey ca.key -out apiserver.crt 
```

The location of these certificates are also passed to the kube-apiserver service.

<div class='img-center'>

![](/img/docs/passlcoationofcertstokubeapiserverservice.png)  

</div>

Alternatively, specify certificate paths in the kube-apiserver command line.

```bash
kube apiserver \
  --client-ca-file=/etc/kubernetes/pki/ca.crt \
  --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt \
  --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt \
  --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key \
  --tls-cert-file=/etc/kubernetes/pki/apiserver.crt \
  --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
```

## Using the Certificates

To use certificates in API calls:

```bash
curl https://kube-apiserver:6443/api/v1/pods/
    --key admin.key \
    --cert admin.crt \
    --cacert ca.crt 
```

They can also be specified in a kube-config.yaml file.

```yaml
apiVersion: v1 
kind: Config 
clusters:
- name: kubernetes
  cluster:
    certificate-authority: ca.crt 
    server: https://kube-apiserver:6443 
users:
- name: kubernetes-admin 
  user:
    client-certificate: admin.crt 
    client-key: admin.key
```


## View Certificate Details 

For a Kubernetes Cluster that is setup via kubeadm, look for the YAMl file for kube-apiserver.

```bash
cat /etc/kubernetes/manifests/kube-apiserver.yaml 
```

<div class='img-center'>

![](/img/docs/viewcertdeailskubeapiserver.png)

</div>


Then, use OpenSSL to inspect individual certificates:

```bash
openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout 
```

Check the following:

- Issuer of the certificate (CA)
- "Not after" to check if certificate is still valid 
- Subject section 
- Alternative names 

<div class='img-center'>

![](/img/docs/drilldownonthecertdetails.png)

</div>

Perform the same checks on the other certificates.

<div class='img-center'>

![](/img/docs/performechecksonothercerts.png)  

</div>

## Certificates API

Kubernetes provides a certificates API to manage certificate signing and rotation.

1. User creates a private key:

    ```bash
    openssl genrsa -out jane.key 2048
    ```

2. Create a CSR:

    ```bash
    openssl req -new -key jane.key -subj "/CN=jane" -out jane.csr
    ```

3. Admin creates a CSR object via YAML:

    ```yaml
    apiVersion: certificates.k8s.io/v1
    kind: CertificateSigningRequest
    metadata:
      name: jane
    spec:
      groups:
      - system:authenticated
      usages:
      - digital signature
      - key encipherment
      - server auth
      request: <base64_encoded_csr>
    ```

4. The CSR can be reviewed and approved using `kubectl`:

    ```bash
    kubectl get csr
    kubectl certificate approve jane
    ```

5. The approved certificate can be retrieved and shared:

    ```bash
    kubectl get csr jane -o yaml
    cat jane-approved.csr | base64 --decode
    ```


    <div class='img-center'>

    ![](/img/docs/certsapprovedandextacted.png)  

    </div>

## Controller-Manager handles all 

The Controller Manager manages certificate operations in the cluster.

<div class='img-center'>

![](/img/docs/conrtrollermanagertakescareofcerts.png)  

</div>

To sign the certificates, recall that we need the CA root server and private key. These files are also defined in the Controller Manager's definitions file.

<div class='img-center'>

![](/img/docs/controllermaangeryamlfile.png)

</div>

## Inspect Logs 

As additional troubleshooting steps, we can check the logs for any certificate-related issues.

<div class='img-center'>

![](/img/docs/journactlchecklogsforcerrelatedissue.png)  

</div>

For kubeadm-managed cluster:

<div class='img-center'>

![](/img/docs/checklogsforkuebadmmanagedcluster.png)  

</div>

If `kubectl` is down, use Docker CLI to inspect logs:

<div class='img-center'>

![](/img/docs/checkdockerpsforlogs.png)  

</div>

<div class='img-center'>

![](/img/docs/checkdockerspecificonctainerforcertrelatedissue.png)  

</div>



## Resources 

- [CKA Certification Course – Certified Kubernetes Administrator](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/)



 

 
