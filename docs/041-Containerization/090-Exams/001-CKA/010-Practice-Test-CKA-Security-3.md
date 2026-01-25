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
sidebar_position: 10
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

21. We don't want to have to specify the kubeconfig file option on each command. Make the my-kube-config file the default kubeconfig.

    <details>
      <summary> Answer </summary>

    There is no kubectl command to do this. Simply copy the contents of the custom kubeconfig to the default kubeconfig file.

    ```bash
    controlplane ~ ➜  cp my-kube-config .kube/config 
    ```
    
    </details>
      


22. With the current-context set to research, we are trying to access the cluster. However something seems to be wrong. Identify and fix the issue.

    Try running the kubectl get pods command and look for the error. All users certificates are stored at /etc/kubernetes/pki/users.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✖ k config get-contexts 
    CURRENT   NAME                         CLUSTER             AUTHINFO    NAMESPACE
            aws-user@kubernetes-on-aws   kubernetes-on-aws   aws-user    
    *         research                     test-cluster-1      dev-user    
            test-user@development        development         test-user   
            test-user@production         production          test-user   

    controlplane ~ ➜  k get po
    error: unable to read client-cert /etc/kubernetes/pki/users/dev-user/developer-user.crt for dev-user due to open /etc/kubernetes/pki/users/dev-user/developer-user.crt: no such file or directory 
    ```

    Incorrect cert defined in the kubeconfig. Fix it and then try to get the pods again.

    ```bash
    controlplane ~ ➜  ls -l /etc/kubernetes/pki/users/dev-user/
    total 12
    -rw-r--r-- 1 root root 1025 Dec 30 10:08 dev-user.crt
    -rw-r--r-- 1 root root  924 Dec 30 10:08 dev-user.csr
    -rw------- 1 root root 1675 Dec 30 10:08 dev-user.key
    ```
    ```bash
    - name: dev-user
    user:
        client-certificate: /etc/kubernetes/pki/users/dev-user/dev-user.crt
        client-key: /etc/kubernetes/pki/users/dev-user/dev-user.key 
    ```
    ```bash
    controlplane ~ ➜  k get po
    No resources found in default namespace.
    ```
    
    </details>
      


23. Inspect the environment and identify the authorization modes configured on the cluster.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po -A
    NAMESPACE      NAME                                   READY   STATUS    RESTARTS   AGE
    blue           blue-app                               1/1     Running   0          10m
    blue           dark-blue-app                          1/1     Running   0          10m
    default        red-697496b845-fkmrr                   1/1     Running   0          10m
    default        red-697496b845-wxks5                   1/1     Running   0          10m
    kube-flannel   kube-flannel-ds-k46ss                  1/1     Running   0          12m
    kube-system    coredns-5d78c9869d-bmfpk               1/1     Running   0          12m
    kube-system    coredns-5d78c9869d-s27fp               1/1     Running   0          12m
    kube-system    etcd-controlplane                      1/1     Running   0          12m
    kube-system    kube-apiserver-controlplane            1/1     Running   0          12m
    kube-system    kube-controller-manager-controlplane   1/1     Running   0          12m
    kube-system    kube-proxy-tjxfp                       1/1     Running   0          12m
    kube-system    kube-scheduler-controlplane            1/1     Running   0          12m

    controlplane ~ ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i auth
        --authorization-mode=Node,RBAC
        --enable-bootstrap-token-auth=true
    ```
    
    </details>
      


24. How many roles exist in the default namespace?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k api-resources | grep -i role
    clusterrolebindings                            rbac.authorization.k8s.io/v1           false        ClusterRoleBinding
    clusterroles                                   rbac.authorization.k8s.io/v1           false        ClusterRole
    rolebindings                                   rbac.authorization.k8s.io/v1           true         RoleBinding
    roles                                          rbac.authorization.k8s.io/v1           true         Role

    controlplane ~ ➜  k get roles
    No resources found in default namespace. 
    ```
    
    </details>
      


25. How many roles exist in all namespaces together?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get roles -A
    NAMESPACE     NAME                                             CREATED AT
    blue          developer                                        2023-12-30T15:24:38Z
    kube-public   kubeadm:bootstrap-signer-clusterinfo             2023-12-30T15:22:42Z
    kube-public   system:controller:bootstrap-signer               2023-12-30T15:22:40Z
    kube-system   extension-apiserver-authentication-reader        2023-12-30T15:22:40Z
    kube-system   kube-proxy                                       2023-12-30T15:22:43Z
    kube-system   kubeadm:kubelet-config                           2023-12-30T15:22:41Z
    kube-system   kubeadm:nodes-kubeadm-config                     2023-12-30T15:22:41Z
    kube-system   system::leader-locking-kube-controller-manager   2023-12-30T15:22:40Z
    kube-system   system::leader-locking-kube-scheduler            2023-12-30T15:22:40Z
    kube-system   system:controller:bootstrap-signer               2023-12-30T15:22:40Z
    kube-system   system:controller:cloud-provider                 2023-12-30T15:22:40Z
    kube-system   system:controller:token-cleaner                  2023-12-30T15:22:40Z
    ```
    
    </details>
      


26. What are the resources the kube-proxy role in the kube-system namespace is given access to?


    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get roles -A
    NAMESPACE     NAME                                             CREATED AT
    blue          developer                                        2023-12-30T15:24:38Z
    kube-public   kubeadm:bootstrap-signer-clusterinfo             2023-12-30T15:22:42Z
    kube-public   system:controller:bootstrap-signer               2023-12-30T15:22:40Z
    kube-system   extension-apiserver-authentication-reader        2023-12-30T15:22:40Z
    kube-system   kube-proxy                                       2023-12-30T15:22:43Z
    kube-system   kubeadm:kubelet-config                           2023-12-30T15:22:41Z
    kube-system   kubeadm:nodes-kubeadm-config                     2023-12-30T15:22:41Z
    kube-system   system::leader-locking-kube-controller-manager   2023-12-30T15:22:40Z
    kube-system   system::leader-locking-kube-scheduler            2023-12-30T15:22:40Z
    kube-system   system:controller:bootstrap-signer               2023-12-30T15:22:40Z
    kube-system   system:controller:cloud-provider                 2023-12-30T15:22:40Z
    kube-system   system:controller:token-cleaner                  2023-12-30T15:22:40Z 

    controlplane ~ ✖ k describe role kube-proxy -n kube-system 
    Name:         kube-proxy
    Labels:       <none>
    Annotations:  <none>
    PolicyRule:
    Resources   Non-Resource URLs  Resource Names  Verbs
    ---------   -----------------  --------------  -----
    configmaps  []                 [kube-proxy]    [get]
    ```
    
    </details>
      


27. Which account is the kube-proxy role assigned to?

    <details>
      <summary> Answer </summary>

    It is binded to a group: system:bootstrappers:kubeadm:default-node-token

    ```bash
    controlplane ~ ➜  k get rolebindings.rbac.authorization.k8s.io  -n kube-system 
    NAME                                                ROLE                                                  AGE
    kube-proxy                                          Role/kube-proxy                                       17m
    kubeadm:kubelet-config                              Role/kubeadm:kubelet-config                           17m
    kubeadm:nodes-kubeadm-config                        Role/kubeadm:nodes-kubeadm-config                     17m
    system::extension-apiserver-authentication-reader   Role/extension-apiserver-authentication-reader        17m
    system::leader-locking-kube-controller-manager      Role/system::leader-locking-kube-controller-manager   17m
    system::leader-locking-kube-scheduler               Role/system::leader-locking-kube-scheduler            17m
    system:controller:bootstrap-signer                  Role/system:controller:bootstrap-signer               17m
    system:controller:cloud-provider                    Role/system:controller:cloud-provider                 17m
    system:controller:token-cleaner                     Role/system:controller:token-cleaner                  17m

    controlplane ~ ➜  k describe rolebindings.rbac.authorization.k8s.io -n kube-system kube-proxy 
    Name:         kube-proxy
    Labels:       <none>
    Annotations:  <none>
    Role:
    Kind:  Role
    Name:  kube-proxy
    Subjects:
    Kind   Name                                             Namespace
    ----   ----                                             ---------
    Group  system:bootstrappers:kubeadm:default-node-token   
    ```
    
    </details>
      


28. A user dev-user is created. User's details have been added to the kubeconfig file. Inspect the permissions granted to the user. Check if the user can list pods in the default namespace.

    Use the --as dev-user option with kubectl to run commands as the dev-user.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po --as dev-user
    Error from server (Forbidden): pods is forbidden: User "dev-user" cannot list resource "pods" in API group "" in the namespace "default"
    ```
        
    </details>
      


29. Create the necessary roles and role bindings required for the dev-user to create, list and delete pods in the default namespace. Use the given spec:

    - Role: developer

    - Role Resources: pods

    - Role Actions: list

    - Role Actions: create

    - Role Actions: delete

    - RoleBinding: dev-user-binding

    - RoleBinding: Bound to dev-user

    <details>
      <summary> Answer </summary>
    
    ```yaml
    ## role-rolebinding.yaml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      namespace: default
      name: developer
    rules:
    - apiGroups: [""] # "" indicates the core API group
      resources: ["pods"]
      verbs: ["delete", "create", "list"]
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: dev-user-binding
      namespace: default
    subjects:
    - kind: User
      name: dev-user
      apiGroup: rbac.authorization.k8s.io
    roleRef:
      kind: Role #this must be Role or ClusterRole
      name: developer
      apiGroup: rbac.authorization.k8s.io
    ```
    ```bash
    controlplane ~ ➜  k apply -f role-rolebinding.yaml 
    role.rbac.authorization.k8s.io/developer created
    rolebinding.rbac.authorization.k8s.io/dev-user-binding created

    controlplane ~ ➜  k get role
    NAME        CREATED AT
    developer   2023-12-30T15:49:59Z

    controlplane ~ ➜  k get rolebindings.rbac.authorization.k8s.io 
    NAME               ROLE             AGE
    dev-user-binding   Role/developer   9s 
    ```

    </details>
      


30. A set of new roles and role-bindings are created in the blue namespace for the dev-user. However, the dev-user is unable to get details of the dark-blue-app pod in the blue namespace. Investigate and fix the issue.

    ```bash
    controlplane ~ ➜  k get role -n blue
    NAME        CREATED AT
    developer   2023-12-30T15:24:38Z

    controlplane ~ ➜  k get rolebindings -n blue
    NAME               ROLE             AGE
    dev-user-binding   Role/developer   26m 
    ```

    <details>
      <summary> Answer </summary>

    ```bash
    controlplane ~ ➜  k get po dark-blue-app -n blue --as dev-user
    Error from server (Forbidden): pods "dark-blue-app" is forbidden: User "dev-user" cannot get resource "pods" in API group "" in the namespace "blue"
    ```
    
    ```bash
    controlplane ~ ➜  k get role -n blue developer -o yaml > blue-dev-role.yaml

    controlplane ~ ➜  k get rolebindings.rbac.authorization.k8s.io -n blue dev-user-binding -o yaml > blue-dev-rolebinding.yaml
    ```

    Check the role. Here we can see that the resource name is incorrect. 

    ```bash
    ## blue-dev-rolebinding.yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      creationTimestamp: "2023-12-30T15:24:38Z"
      name: developer
      namespace: blue
      resourceVersion: "619"
      uid: 994093a1-b5e4-4256-b911-533769b6eb63
    rules:
    - apiGroups:
      - ""
      resourceNames:
      - blue-app
      resources:
      - pods
      verbs:
      - get
      - watch
      - create
      - delete 
    ```

    Fix it. 

    ```bash
    ## blue-dev-rolebinding.yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
    creationTimestamp: "2023-12-30T15:24:38Z"
    name: developer
    namespace: blue
    resourceVersion: "619"
    uid: 994093a1-b5e4-4256-b911-533769b6eb63
    rules:
    - apiGroups:
    - ""
    resourceNames:
    - dark-blue-app
    resources:
    - pods
    verbs:
    - get
    - watch
    - create
    - delete
    ```
    ```bash
    controlplane ~ ➜  k delete -f blue-dev-role.yaml 
    role.rbac.authorization.k8s.io "developer" deleted

    controlplane ~ ➜  k apply -f blue-dev-role.yaml 
    role.rbac.authorization.k8s.io/developer created

    controlplane ~ ➜  k get po dark-blue-app -n blue --as dev-user
    NAME            READY   STATUS    RESTARTS   AGE
    dark-blue-app   1/1     Running   0          37m 
    ```
    
    </details>
      
