---
title: "Mock Exam 2"
tags: 
- Containerization
- Containers
- Kubernetes
- Certifications
- CKA
- CKAD
- CKSS
sidebar_position: 32
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

13. A pod definition file is created at /root/CKA/use-pv.yaml. Make use of this manifest file and mount the persistent volume called pv-1. Ensure the pod is running and the PV is bound.

    - mountPath: /data

    - persistentVolumeClaim Name: my-pvc


    This is the given pod YAML file. 

    ```yaml
    ## /root/CKA/use-pv.yaml
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: use-pv
      name: use-pv
    spec:
      containers:
      - image: nginx
        name: use-pv
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```


    <details>
      <summary> Answer </summary>

    Check the PV. 

    ```bash
    controlplane ~ ➜  k get pv
    NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
    pv-1   10Mi       RWO            Retain           Available                                   18s

    controlplane ~ ➜  k get pvc
    No resources found in default namespace.
    ```
    ```bash
    controlplane ~/CKA ➜  k get pv pv-1 -o yaml
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      creationTimestamp: "2024-01-05T04:30:26Z"
      finalizers:
      - kubernetes.io/pv-protection
      name: pv-1
      resourceVersion: "3753"
      uid: ad7d65b3-a7d4-4596-bf05-d12d23f4eeba
    spec:
      accessModes:
      - ReadWriteOnce
      capacity:
        storage: 10Mi
      hostPath:
        path: /opt/data
        type: ""
      persistentVolumeReclaimPolicy: Retain
      volumeMode: Filesystem
    status:
    phase: Available
    ```

    Create the PVC yaml file. 

    ```bash
    controlplane ~ ➜  cd CKA

    controlplane ~/CKA ➜  ls -l
    total 4
    -rw-r--r-- 1 root root 235 Jan  5 00:10 use-pv.yaml
    ```
    ```yaml
    ## pvc.yml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: my-pvc
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 10Mi
    ```

    ```bash
    controlplane ~/CKA ➜  k apply -f  pvc.yml 
    persistentvolumeclaim/my-pvc created

    controlplane ~/CKA ➜  k get pvc
    NAME     STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    my-pvc   Bound    pv-1     10Mi       RWO                           8s

    controlplane ~/CKA ➜  k get pv
    NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM            STORAGECLASS   REASON   AGE
    pv-1   10Mi       RWO            Retain           Bound    default/my-pvc                           2m18s 
    ```

    Modify the pod YAML. 

    ```yaml
    ## use-pv.yml 
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: use-pv
      name: use-pv
    spec:
      containers:
      - image: nginx
        name: use-pv
        resources: {}
        volumeMounts:
        - mountPath: "/data"
          name: vol  
      volumes:
      - name: vol
        persistentVolumeClaim:
        claimName: my-pvc
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```
    ```bash
    controlplane ~/CKA ➜  k apply -f use-pv.yaml 
    pod/use-pv created 

    controlplane ~/CKA ➜  k get po
    NAME             READY   STATUS    RESTARTS   AGE
    redis-storage    1/1     Running   0          6m39s
    super-user-pod   1/1     Running   0          3m39s
    use-pv           1/1     Running   0          25s

    controlplane ~/CKA ➜  k describe pod use-pv | grep Volumes: -A 5
    Volumes:
    vol:
        Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
        ClaimName:  my-pvc
        ReadOnly:   false
    ```
    
    </details>
      


14. Create a new user called john. Grant him access to the cluster. John should have permission to create, list, get, update and delete pods in the development namespace . The private key exists in the location: /root/CKA/john.key and csr at /root/CKA/john.csr.

    Important Note: As of kubernetes 1.19, the CertificateSigningRequest object expects a signerName.

    - CSR: john-developer Status:Approved

    - Role Name: developer, namespace: development, Resource: Pods

    - Access: User 'john' has appropriate permissions    

    <details>
      <summary> Answer </summary>
    
    Follow steps here: 
    https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/

    ```bash
    controlplane ~ ➜  mkdir user-john

    controlplane ~ ➜  cd user-john/

    controlplane ~/user-john ➜  openssl genrsa -out john.key 2048
    Generating RSA private key, 2048 bit long modulus (2 primes)
    ...+++++
    ..........+++++
    e is 65537 (0x010001)

    controlplane ~/user-john ➜  openssl req -new -key john.key -out john.csr -subj "/CN=john"

    controlplane ~/user-john ➜  ls -l
    total 8
    -rw-r--r-- 1 root root  883 Jan  5 00:28 john.csr
    -rw------- 1 root root 1675 Jan  5 00:27 john.key  
    ```
    ```bash
    controlplane ~/user-john ➜  cat john.csr | base64 | tr -d "\n"
    LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZEQ0NBVHdDQVFBd0R6RU5NQXNHQTFVRUF3d0VhbTlvYmpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRApnZ0VQQURDQ0FRb0NnZ0VCQU9sVUVhMFVoK09lVks3TT
    ```

    Create the CSR yaml file. 

    ```yaml
    ## john-csr.yml 
    ---
    apiVersion: certificates.k8s.io/v1
    kind: CertificateSigningRequest
    metadata:
      name: john-developer
    spec:
      signerName: kubernetes.io/kube-apiserver-client
      request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZEQ0NBVHdDQVFBd0R6RU5NQXNHQTFVRUF3d0VhbTlvYmpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRApnZ0VQQURDQ0FRb0NnZ0VCQU9sVUVhMFVoK09lVk
      usages:
      - digital signature
      - key encipherment
      - client auth
    ```
    ```bash
    controlplane ~/user-john ➜  k apply -f john-csr.yml 
    certificatesigningrequest.certificates.k8s.io/john-developer created

    controlplane ~/user-john ➜  k get csr
    NAME             AGE   SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    csr-pd24m        25m   kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued
    csr-qsk2x        24m   kubernetes.io/kube-apiserver-client-kubelet   system:bootstrap:k93sdz    <none>              Approved,Issued
    john-developer   6s    kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Pending 

    controlplane ~/user-john ➜  kubectl certificate approve john-developer
    certificatesigningrequest.certificates.k8s.io/john-developer approved

    controlplane ~/user-john ➜  k get csr
    NAME             AGE   SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
    csr-pd24m        25m   kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <none>              Approved,Issued
    csr-qsk2x        25m   kubernetes.io/kube-apiserver-client-kubelet   system:bootstrap:k93sdz    <none>              Approved,Issued
    john-developer   47s   kubernetes.io/kube-apiserver-client           kubernetes-admin           <none>              Approved,Issued
    ```

    Next, create the role and rolebinding.

    ```yaml
    ## dev-role.yml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      namespace: development
      name: developer
    rules:
    - apiGroups: [""] # "" indicates the core API group
      resources: ["pods"]
      verbs: ["create","get","update","delete","list"]
    ```
    ```yaml
    ## dev-rolebinding.yml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: developer-role-binding
      namespace: development
    subjects:
    - kind: User
      apiGroup: rbac.authorization.k8s.io
    roleRef:
      kind: Role #this must be Role or ClusterRole
      name: developer # this must match the name of the Role or ClusterRole you wish to bind to
      apiGroup: rbac.authorization.k8s.io
    ```
    ```bash
    controlplane ~/user-john ➜  k apply -f  dev-role.yml 
    role.rbac.authorization.k8s.io/developer created

    controlplane ~/user-john ➜  k apply -f  dev-rolebinding.yml 
    rolebinding.rbac.authorization.k8s.io/developer-role-binding created

    controlplane ~/user-john ✖ k get -n development  role | grep dev
    developer   2024-01-05T05:47:57Z

    controlplane ~/user-john ➜  k get -n development  rolebindings.rbac.authorization.k8s.io | grep dev
    developer-role-binding   Role/developer   21s
    ```

    To verify: 

    ```bash
    controlplane ~/user-john ➜  kubectl auth can-i update pods --as=john -n development
    yes 
    ```
    
    </details>
      


15. Create a nginx pod called nginx-resolver using image nginx, expose it internally with a service called nginx-resolver-service. Test that you are able to look up the service and pod names from within the cluster. Use the image: busybox:1.28 for dns lookup. Record results in /root/CKA/nginx.svc and /root/CKA/nginx.pod

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~/CKA ➜  k run nginx-resolver --image nginx
    pod/nginx-resolver created

    controlplane ~/CKA ✖ k get po
    NAME                            READY   STATUS    RESTARTS   AGE
    nginx-deploy-5c95467974-7l68p   1/1     Running   0          102s
    nginx-resolver                  1/1     Running   0          11s
    redis-storage                   1/1     Running   0          12m
    super-user-pod                  1/1     Running   0          9m57s
    use-pv                          1/1     Running   0          6m43s
    ```

    Take note of the word "internally", this means that the port type is a ClusterIP. 

    ```bash
    controlplane ~/user-john ➜  k expose pod nginx-resolver \
    --name nginx-resolver-service \
    --port 80 \
    --target-port 80 \
    --type=ClusterIP

    service/nginx-resolver-service exposed 

    controlplane ~ ➜  k get svc
    NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
    kubernetes               ClusterIP   10.96.0.1       <none>        443/TCP   26m
    nginx-resolver-service   ClusterIP   10.106.113.53   <none>        80/TCP    4s
    ```
    For testing,  we'll create another pod. 

    ```bash
    ontrolplane ~ ➜  k run pod-tester --image  busybox:1.28 --restart Never --rm -it -- nslookup nginx-resolver-service
    If you don't see a command prompt, try pressing enter.
    warning: couldn't attach to pod/pod-tester, falling back to streaming logs: unable to upgrade connection: container pod-tester not found in pod pod-tester_default
    Server:    10.96.0.10
    Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

    Name:      nginx-resolver-service
    Address 1: 10.106.113.53 nginx-resolver-service.default.svc.cluster.local
    pod "pod-tester" deleted

    controlplane ~ ➜  k run pod-tester --image  busybox:1.28 --restart Never --rm -it -- nslookup nginx-resolver-service > /root/CKA/nginx.svc

    controlplane ~ ➜  ls -l /root/CKA/nginx.svc
    -rw-r--r-- 1 root root 217 Jan  5 01:00 /root/CKA/nginx.svc

    controlplane ~ ➜  cat /root/CKA/nginx.svc
    Server:    10.96.0.10
    Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

    Name:      nginx-resolver-service
    Address 1: 10.106.113.53 nginx-resolver-service.default.svc.cluster.local
    pod "pod-tester" deleted
    ```

    Try using the pod IP. 

    ```bash
    controlplane ~ ➜  k get po nginx-resolver -o wide
    NAME             READY   STATUS    RESTARTS   AGE     IP             NODE     NOMINATED NODE   READINESS GATES
    nginx-resolver   1/1     Running   0          4m54s   10.244.192.1   node01   <none>           <none>

    ontrolplane ~ ✦ ➜  k run pod-tester --image  busybox:1.28 --restart Never --rm -it -- nslookup 10.244.192.1
    Server:    10.96.0.10
    Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

    Name:      10.244.192.1
    Address 1: 10.244.192.1 10-244-192-1.nginx-resolver-service.default.svc.cluster.local
    pod "pod-tester" deleted

    controlplane ~ ✦ ➜  k run pod-tester --image  busybox:1.28 --restart Never --rm -it -- nslookup 10.244.192.1 > /root/CKA/nginx.pod

    controlplane ~ ✦ ➜  ls -l /root/CKA/nginx.pod
    -rw-r--r-- 1 root root 219 Jan  5 01:02 /root/CKA/nginx.pod

    controlplane ~ ✦ ➜  cat /root/CKA/nginx.pod
    Server:    10.96.0.10
    Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

    Name:      10.244.192.1
    Address 1: 10.244.192.1 10-244-192-1.nginx-resolver-service.default.svc.cluster.local
    pod "pod-tester" deleted
    ```
    
    </details>
      


16. Create a static pod on node01 called nginx-critical with image nginx and make sure that it is recreated/restarted automatically in case of a failure.

    Use /etc/kubernetes/manifests as the Static Pod path for example.

    <details>
      <summary> Answer </summary>

    Read carefully again. 
    The static pod needs to be created in node01, not in the controlplane. 
    Generate the YAML first and copy it onto node01.

    ```bash
    controlplane ~ ➜ k run nginx-critical --image nginx -o yaml > nginx-critical.yml

    controlplane ~ ➜  scp nginx-critical.yml node01:/root
    nginx-critical.yml                                                                            100% 1577     2.1MB/s   00:00    

    controlplane ~ ➜  ssh node01
    Last login: Fri Jan  5 01:06:59 2024 from 192.10.251.4

    root@node01 ~ ➜  ls -l
    total 4
    -rw-r--r-- 1 root root 1577 Jan  5 01:08 nginx-critical.yml
    ```

    Then create the required directory. 

    ```bash
    root@node01 ~ ➜ mkdir -p /etc/kubernetes/manifests

    root@node01 ~ ➜  cp nginx-critical.yml /etc/kubernetes/manifests/

    root@node01 ~ ➜  ls -l /etc/kubernetes/manifests/
    total 4
    -rw-r--r-- 1 root root 1577 Jan  5 01:09 nginx-critical.yml
    ```

    Check the statisPdPath. It should be set to manifest directory. 

    ```bash
    root@node01 ~ ➜  grep -i static /var/lib/kubelet/config.yaml 
    staticPodPath: /etc/kubernetes/manifests
    ```

    Back at controlplane:

    ```bash
    controlplane ~ ➜  k get po -o wide
    NAME             READY   STATUS    RESTARTS   AGE     IP             NODE     NOMINATED NODE   READINESS GATES
    nginx-critical   1/1     Running   0          7m21s   10.244.192.1   node01   <none>           <none>
    ```
    
    </details>
      


17. Create a new service account with the name pvviewer. Grant this Service account access to list all PersistentVolumes in the cluster by creating an appropriate cluster role called pvviewer-role and ClusterRoleBinding called pvviewer-role-binding.
Next, create a pod called pvviewer with the image: redis and serviceAccount: pvviewer in the default namespace.

    <details>
      <summary> Answer </summary>

    ```bash
    controlplane ~ ➜  k create sa pvviewer --dry-run=client -o yaml > pvviewer.yml

    controlplane ~ ➜  ls -l
    total 8
    drwxr-xr-x 2 root root 4096 Jan  5 05:11 CKA
    -rw-r--r-- 1 root root   89 Jan  5 05:13 pvviewer.yml
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml

    controlplane ~ ➜  cat pvviewer.yml 
    apiVersion: v1
    kind: ServiceAccount
    metadata:
    creationTimestamp: null
    name: pvviewer
    ```
    
    ```bash
    controlplane ~ ➜  k create clusterrole pvviewer-role --verb list --resource="persistentvolumes" $do > pvviewer-role.yml

    controlplane ~ ➜  ls -l
    total 12
    drwxr-xr-x 2 root root 4096 Jan  5 05:11 CKA
    -rw-r--r-- 1 root root  197 Jan  5 05:15 pvviewer-role.yml
    -rw-r--r-- 1 root root   89 Jan  5 05:14 pvviewer.yml
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml

    controlplane ~ ➜  cat pvviewer-role.yml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
      creationTimestamp: null
      name: pvviewer-role
    rules:
    - apiGroups:
      - ""
      resources:
      - persistentvolumes
      verbs:
      - list
    ```
    
    ```bash
    controlplane ~ ➜  k create clusterrolebinding pvviewer-role-binding --clusterrole pvviewer-role --serviceaccount default:pvviewer $do > pvviewer-role-binding.yml

    controlplane ~ ➜  ls -l
    total 16
    drwxr-xr-x 2 root root 4096 Jan  5 05:11 CKA
    -rw-r--r-- 1 root root  292 Jan  5 05:17 pvviewer-role-binding.yml
    -rw-r--r-- 1 root root  197 Jan  5 05:15 pvviewer-role.yml
    -rw-r--r-- 1 root root   89 Jan  5 05:14 pvviewer.yml
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml

    controlplane ~ ➜  cat pvviewer-role-binding.yml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      creationTimestamp: null
      name: pvviewer-role-binding
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: pvviewer-role
    subjects:
    - kind: ServiceAccount
      name: pvviewer
      namespace: default
    ```
    
    ```bash
    controlplane ~ ➜  k run pvviewer --image redis $do > pvviewer-pod.yml

    controlplane ~ ➜  ls -l
    total 20
    drwxr-xr-x 2 root root 4096 Jan  5 05:11 CKA
    -rw-r--r-- 1 root root  241 Jan  5 05:18 pvviewer-pod.yml
    -rw-r--r-- 1 root root  292 Jan  5 05:17 pvviewer-role-binding.yml
    -rw-r--r-- 1 root root  197 Jan  5 05:15 pvviewer-role.yml
    -rw-r--r-- 1 root root   89 Jan  5 05:14 pvviewer.yml
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml
    ```
    
    Modify the pod YAML and add the service account.

    ```bash
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: pvviewer
    name: pvviewer
    spec:
      serviceAccountName: pvviewer
      containers:
      - image: redis
        name: pvviewer
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```
    
    ```bash
    controlplane ~ ➜  ls -l
    total 20
    drwxr-xr-x 2 root root 4096 Jan  5 05:11 CKA
    -rw-r--r-- 1 root root  272 Jan  5 05:20 pvviewer-pod.yml
    -rw-r--r-- 1 root root  292 Jan  5 05:17 pvviewer-role-binding.yml
    -rw-r--r-- 1 root root  197 Jan  5 05:15 pvviewer-role.yml
    -rw-r--r-- 1 root root   89 Jan  5 05:14 pvviewer.yml
    -rw-rw-rw- 1 root root    0 Dec 13 05:39 sample.yaml

    controlplane ~ ➜  k apply -f  .
    clusterrolebinding.rbac.authorization.k8s.io/pvviewer-role-binding created
    clusterrole.rbac.authorization.k8s.io/pvviewer-role created
    serviceaccount/pvviewer created
    pod/pvviewer created
    ```
    
    ```bash
    controlplane ~ ➜  k get clusterrole | grep pv
    pvviewer-role                                                          2024-01-05T10:20:58Z
    system:controller:pv-protection-controller                             2024-01-05T09:52:44Z
    system:controller:pvc-protection-controller                            2024-01-05T09:52:44Z

    controlplane ~ ➜  k get clusterrole | grep pvv
    pvviewer-role                                                          2024-01-05T10:20:58Z

    controlplane ~ ➜  k get clusterrolebinding | grep pvv
    pvviewer-role-binding                                  ClusterRole/pvviewer-role                                                          82s

    controlplane ~ ➜  k get sa | grep pvv
    pvviewer   0         90s

    controlplane ~ ➜  k get po
    NAME       READY   STATUS    RESTARTS   AGE
    pvviewer   1/1     Running   0          79s 

    controlplane ~ ➜  k describe po pvviewer | grep -i service
    Service Account:  pvviewer    
    ```
    
    </details>
      



18. List the InternalIP of all nodes of the cluster. Save the result to a file /root/CKA/node_ips. Answer should be in the format: 

    ```bash
    InternalIP of controlplane<space>InternalIP of node01 (in a single line)
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get no
    NAME           STATUS   ROLES           AGE   VERSION
    controlplane   Ready    control-plane   32m   v1.27.0
    node01         Ready    <none>          32m   v1.27.0

    controlplane ~ ➜  k get no -o jsonpath='{.items[*].status.addresses[*]}'
    {"address":"192.22.238.9","type":"InternalIP"} {"address":"controlplane","type":"Hostname"} {"address":"192.22.238.12","type":"InternalIP"} {"address":"node01","type":"Hostname"}
    controlplane ~ ➜  

    controlplane ~ ➜  k get no -o jsonpath='{.items[*].status.addresses[0]}'
    {"address":"192.22.238.9","type":"InternalIP"} {"address":"192.22.238.12","type":"InternalIP"}
    controlplane ~ ➜  

    controlplane ~ ➜  k get no -o jsonpath='{.items[*].status.addresses[0].address}'
    192.22.238.9 192.22.238.12
    controlplane ~ ➜  

    controlplane ~ ➜  k get no -o jsonpath='{.items[*].status.addresses[0].address}' > /root/CKA/node_ips

    controlplane ~ ➜  ls -la /root/CKA/node_ips
    -rw-r--r-- 1 root root 26 Jan  5 06:11 /root/CKA/node_ips

    controlplane ~ ➜  cat /root/CKA/node_ips
    192.22.238.9 192.22.238.12
    ```
    
    </details>
      



19. Create a pod called multi-pod with two containers.

    - Container 1, name: alpha, image: nginx

    - Container 2: name: beta, image: busybox, command: sleep 4800

    Environment Variables:
    - container 1:
        - name: alpha

    - Container 2:
        - name: beta

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k run multi-pod --image nginx $do > multi-pod.yml

    controlplane ~ ➜  ls -l
    total 24
    drwxr-xr-x 2 root root 4096 Jan  5 06:11 CKA
    -rw-r--r-- 1 root root  244 Jan  5 06:14 multi-pod.yml 
    ```

    Modify the pod YAML file.

    ```bash
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: multi-pod
      name: multi-pod
    spec:
      containers:
      - image: busybox
        name: beta
        command: ["sh","-c","sleep 4800"]
        env:
        - name: NAME
          value: beta
      - image: nginx
        name: alpha
        env:
        - name: NAME
          value: alpha
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```
    ```bash
    controlplane ~ ➜  k apply -f multi-pod.yml 
    pod/multi-pod created

    controlplane ~ ➜  k get po
    NAME        READY   STATUS    RESTARTS   AGE
    multi-pod   2/2     Running   0          7s
    pvviewer    1/1     Running   0          10m
    ```
    ```bash
    controlplane ~ ➜  k describe po multi-pod | grep Containers -A 40
    Containers:
    beta:
        Container ID:  containerd://c2c4de069fcc7ca32732708ea9865e72956fce2c1f25734a2ab3c30a045e064f
        Image:         busybox
        Image ID:      docker.io/library/busybox@sha256:ba76950ac9eaa407512c9d859cea48114eeff8a6f12ebaa5d32ce79d4a017dd8
        Port:          <none>
        Host Port:     <none>
        Command:
        sh
        -c
        sleep 4800
        State:          Running
        Started:      Fri, 05 Jan 2024 06:19:33 -0500
        Ready:          True
        Restart Count:  0
        Environment:
        NAME:  beta
        Mounts:
        /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-v87xr (ro)
    alpha:
        Container ID:   containerd://5ed2a20d88c470c61e6a0766230c95e430b8847f4fcbdc1a12bb46e9d3d49c26
        Image:          nginx
        Image ID:       docker.io/library/nginx@sha256:2bdc49f2f8ae8d8dc50ed00f2ee56d00385c6f8bc8a8b320d0a294d9e3b49026
        Port:           <none>
        Host Port:      <none>
        State:          Running
        Started:      Fri, 05 Jan 2024 06:19:37 -0500
        Ready:          True
        Restart Count:  0
        Environment:
        NAME:  alpha
        Mounts:
        /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-v87xr (ro)
    ```
    
    </details>
      



20. Create a Pod called non-root-pod , image: redis:alpine

    - runAsUser: 1000

    - fsGroup: 2000

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k run non-root-pod --image redis:alpine $do > non-root-pod.yml
    ```
    ```bash
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: non-root-pod
      name: non-root-pod
    spec:
      securityContext:
        runAsUser: 1000
        fsGroup: 2000
      containers:
      - image: redis:alpine
        name: non-root-pod
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```
    ```bash
    controlplane ~ ➜  k get po
    NAME           READY   STATUS    RESTARTS   AGE
    multi-pod      2/2     Running   0          3m16s
    non-root-pod   1/1     Running   0          6s
    pvviewer       1/1     Running   0          13m 
    ```
    
    </details>
      



21. We have deployed a new pod called np-test-1 and a service called np-test-service. Incoming connections to this service are not working. Troubleshoot and fix it.
Create NetworkPolicy, by the name ingress-to-nptest that allows incoming connections to the service over port 80.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po
    NAME           READY   STATUS    RESTARTS   AGE
    multi-pod      2/2     Running   0          3m56s
    non-root-pod   1/1     Running   0          46s
    np-test-1      1/1     Running   0          21s
    pvviewer       1/1     Running   0          14m

    controlplane ~ ➜  k get svc
    NAME              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
    kubernetes        ClusterIP   10.96.0.1       <none>        443/TCP   40m
    np-test-service   ClusterIP   10.106.46.125   <none>        80/TCP    27s
    ```
    
    ```yaml
    ## netpol.yml
    ---
    apiVersion: networking.k8s.io/v1
    kind: NetworkPolicy
    metadata:
      name: ingress-to-nptest
      namespace: default
    spec:
      podSelector:
        matchLabels:
          run: np-test-1
    policyTypes:
    - Ingress
    ingress:
    - ports:
        - protocol: TCP
        port: 80
    ```
    
    ```bash
    controlplane ~ ➜  k apply -f netpol.yml 
    networkpolicy.networking.k8s.io/ingress-to-nptest created

    controlplane ~ ➜  k get netpol
    NAME                POD-SELECTOR   AGE
    default-deny        <none>         4m58s
    ingress-to-nptest   <none>         8s
    ```

    Verify that the port the open by running a test pod which will telnet to the service via port 80. 

    ```bash
    controlplane ~ ➜  k get po -o wide
    NAME           READY   STATUS    RESTARTS   AGE     IP             NODE     NOMINATED NODE   READINESS GATES
    multi-pod      2/2     Running   0          10m     10.244.192.2   node01   <none>           <none>
    non-root-pod   1/1     Running   0          7m15s   10.244.192.3   node01   <none>           <none>
    np-test-1      1/1     Running   0          6m50s   10.244.192.4   node01   <none>           <none>
    pvviewer       1/1     Running   0          20m     10.244.192.1   node01   <none>           <none>

    controlplane ~ ➜  k run test-pod --image busybox --rm -it -- telnet np-test-service 80
    If you don't see a command prompt, try pressing enter.
    Connected to np-test-service

    Session ended, resume using 'kubectl attach test-pod -c test-pod -i -t' command when the pod is running
    pod "test-pod" deleted

    controlplane ~ ➜  k run test-pod --image busybox --rm -it -- telnet 10.244.192.4 80
    If you don't see a command prompt, try pressing enter.
    Connected to 10.244.192.4 
    ```
    
    </details>
      



22. Taint the worker node node01 to be Unschedulable. Once done, create a pod called dev-redis, image redis:alpine, to ensure workloads are not scheduled to this worker node. Finally, create a new pod called prod-redis and image: redis:alpine with toleration to be scheduled on node01.

    - key: env_type
    - value: production
    - operator: Equal and effect: NoSchedule

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k taint node controlplane env_type=production:NoSchedule-
    node/controlplane untainted

    controlplane ~ ➜  k taint node node01 env_type=production:NoSchedule
    node/node01 tainted

    controlplane ~ ➜  k describe no node01 | grep -i taint
    Taints:             env_type=production:NoSchedule

    controlplane ~ ➜  k get po -o wide
    NAME           READY   STATUS    RESTARTS   AGE   IP             NODE     NOMINATED NODE   READINESS GATES
    multi-pod      2/2     Running   0          15m   10.244.192.2   node01   <none>           <none>
    non-root-pod   1/1     Running   0          11m   10.244.192.3   node01   <none>           <none>
    np-test-1      1/1     Running   0          11m   10.244.192.4   node01   <none>           <none>
    pvviewer       1/1     Running   0          25m   10.244.192.1   node01   <none>           <none>
    ```

    Create the dev-redis pod. It should not be scheduled on node01. 

    ```bash
    controlplane ~ ➜  k run dev-redis --image redis:alpine
    pod/dev-redis created

    controlplane ~ ➜  k get po -o wide
    NAME           READY   STATUS              RESTARTS   AGE   IP             NODE           NOMINATED NODE   READINESS GATES
    dev-redis      0/1     ContainerCreating   0          2s    <none>         controlplane   <none>           <none>
    multi-pod      2/2     Running             0          15m   10.244.192.2   node01         <none>           <none>
    non-root-pod   1/1     Running             0          12m   10.244.192.3   node01         <none>           <none>
    np-test-1      1/1     Running             0          12m   10.244.192.4   node01         <none>           <none>
    pvviewer       1/1     Running             0          26m   10.244.192.1   node01         <none>           <none> 
    ```

    Next, create the prod-redis with the specified tolerations. It should be schedules on node01. 

    ```bash
    controlplane ~ ➜  k run prod-redis --image redis:alpine $do > prod-redis.yml
    ```
    ```bash
    ## prod-redis.yml
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: prod-redis
      name: prod-redis
    spec:
      tolerations:
      - key: "env_type"
        operator: "Equal"
        value: "production"
        effect: "NoSchedule"
      containers:
      - image: redis:alpine
        name: prod-redis
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```
    ```bash
    controlplane ~ ➜  k apply -f prod-redis.yml 
    pod/prod-redis created

    controlplane ~ ➜  k get po -o wide
    NAME           READY   STATUS    RESTARTS   AGE    IP             NODE           NOMINATED NODE   READINESS GATES
    dev-redis      1/1     Running   0          5m6s   10.244.0.4     controlplane   <none>           <none>
    multi-pod      2/2     Running   0          21m    10.244.192.2   node01         <none>           <none>
    non-root-pod   1/1     Running   0          17m    10.244.192.3   node01         <none>           <none>
    np-test-1      1/1     Running   0          17m    10.244.192.4   node01         <none>           <none>
    prod-redis     1/1     Running   0          6s     10.244.192.5   node01         <none>           <none>
    pvviewer       1/1     Running   0          31m    10.244.192.1   node01         <none>           <none> 
    ``` 

    </details>
      



23. Create a pod called hr-pod in hr namespace belonging to the production environment and frontend tier .

    - image: redis:alpine

    Use appropriate labels and create all the required objects if it does not exist in the system already.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k create ns hr
    namespace/hr created

    controlplane ~ ➜  k run hr-pod --image redis:alpine --namespace hr --labels "environment=production,tier=frontend" $do
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        environment: production
        tier: frontend
      name: hr-pod
      namespace: hr
    spec:
      containers:
      - image: redis:alpine
        name: hr-pod
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}

    controlplane ~ ➜  k run hr-pod --image redis:alpine --namespace hr --labels "environment=production,tier=frontend" 
    pod/hr-pod created

    controlplane ~ ➜  k get po -n hr
    NAME     READY   STATUS    RESTARTS   AGE
    hr-pod   1/1     Running   0          38s

    controlplane ~ ➜  k describe -n hr po hr-pod | grep -i image:
        Image:          redis:alpine

    controlplane ~ ➜  k describe -n hr po hr-pod | grep -i label -A 5
    Labels:           environment=production
                    tier=frontend
    ```
    
    </details>
      



24. A kubeconfig file called super.kubeconfig has been created under /root/CKA. There is something wrong with the configuration. Troubleshoot and fix it.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  ls -la CKA
    total 24
    drwxr-xr-x 2 root root 4096 Jan  5 06:45 .
    drwx------ 1 root root 4096 Jan  5 06:39 ..
    -rw-r--r-- 1 root root   26 Jan  5 06:11 node_ips
    -rw------- 1 root root 5636 Jan  5 06:45 super.kubeconfig

    controlplane ~ ➜  k cluster-info --kubeconfig CKA/super.kubeconfig
    E0105 06:46:28.819247   20286 memcache.go:265] couldn't get current server API group list: Get "https://controlplane:9999/api?timeout=32s": dial tcp 192.22.238.9:9999: connect: connection refused
    E0105 06:46:28.819555   20286 memcache.go:265] couldn't get current server API group list: Get "https://controlplane:9999/api?timeout=32s": dial tcp 192.22.238.9:9999: connect: connection refused
    E0105 06:46:28.820954   20286 memcache.go:265] couldn't get current server API group list: Get "https://controlplane:9999/api?timeout=32s": dial tcp 192.22.238.9:9999: connect: connection refused
    E0105 06:46:28.822299   20286 memcache.go:265] couldn't get current server API group list: Get "https://controlplane:9999/api?timeout=32s": dial tcp 192.22.238.9:9999: connect: connection refused
    E0105 06:46:28.823566   20286 memcache.go:265] couldn't get current server API group list: Get "https://controlplane:9999/api?timeout=32s": dial tcp 192.22.238.9:9999: connect: connection refused

    To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
    The connection to the server controlplane:9999 was refused - did you specify the right host or port?
    ```

    Make sure the port is correct in /root/CKA/super.kubeconfig.

    ```bash
    server: https://controlplane:6443
    ```
    ```bash
    controlplane ~ ➜  kubectl cluster-info --kubeconfig=/root/CKA/super.kubeconfig
    Kubernetes control plane is running at https://controlplane:6443
    CoreDNS is running at https://controlplane:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

    To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
    ```
    
    </details>
      




     
