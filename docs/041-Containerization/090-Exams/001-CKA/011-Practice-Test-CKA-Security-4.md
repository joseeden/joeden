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
sidebar_position: 11
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


31. Add a new rule in the existing role developer to grant the dev-user permissions to create deployments in the blue namespace.
    Remember to add api group "apps".

    ```bash
    controlplane ~ ➜  k get -n blue role
    NAME        CREATED AT
    developer   2023-12-30T16:01:43Z 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get role -n blue developer -o yaml > blue-dev-role.yaml 
    ```

    Add a new api-group in the YAML file.

    ```bash
    ## blue-dev-role.yaml
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
    
    - apiGroups:
      - apps
      resources:
      - deployments
      verbs:
      - create
    ```
    ```bash
    controlplane ~ ➜  k delete -f blue-dev-role.yaml 
    role.rbac.authorization.k8s.io "developer" deleted

    controlplane ~ ➜  k apply -f blue-dev-role.yaml 
    role.rbac.authorization.k8s.io/developer created
    ```

    Create a sample deployment as the dev-user. 

    ```bash
    controlplane ~ ➜  k create deployment testing-access --image nginx --namespace blue --as dev-user
    deployment.apps/testing-access created  
    ```
    
    </details>
      


32. How many ClusterRoles do you see defined in the cluster?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get clusterroles --no-headers | wc -l
    70 
    ```
    
    </details>
      


33. What user/groups are the cluster-admin role bound to?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get clusterrole | grep admin
    cluster-admin                                                          2023-12-30T16:00:55Z
    system:aggregate-to-admin                                              2023-12-30T16:00:55Z
    system:kubelet-api-admin                                               2023-12-30T16:00:55Z
    admin                                                                  2023-12-30T16:00:55Z

    controlplane ~ ➜  k get clusterrolebinding | grep admin
    cluster-admin                                          ClusterRole/cluster-admin                                          33m
    kube-apiserver-kubelet-admin                           ClusterRole/system:kubelet-api-admin                               32m
    helm-kube-system-traefik-crd                           ClusterRole/cluster-admin                                          32m
    helm-kube-system-traefik                               ClusterRole/cluster-admin                                          32m

    controlplane ~ ➜  k describe clusterrolebinding cluster-admin 
    Name:         cluster-admin
    Labels:       kubernetes.io/bootstrapping=rbac-defaults
    Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
    Role:
    Kind:  ClusterRole
    Name:  cluster-admin
    Subjects:
    Kind   Name            Namespace
    ----   ----            ---------
    Group  system:masters   
    ```
    
    </details>
      


34. What permissions does the clusterrole **cluster-admin** have?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get clusterrole | grep admin
    cluster-admin                                                          2023-12-30T16:00:55Z
    system:aggregate-to-admin                                              2023-12-30T16:00:55Z
    system:kubelet-api-admin                                               2023-12-30T16:00:55Z
    admin                                                                  2023-12-30T16:00:55Z 

    controlplane ~ ➜  k describe clusterrole cluster-admin 
    Name:         cluster-admin
    Labels:       kubernetes.io/bootstrapping=rbac-defaults
    Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
    PolicyRule:
    Resources  Non-Resource URLs  Resource Names  Verbs
    ---------  -----------------  --------------  -----
    *.*        []                 []              [*]
                [*]                []              [*]
    ```
    
    </details>
      


35. A new user michelle joined the team. She will be focusing on the nodes in the cluster. Create the required ClusterRoles and ClusterRoleBindings so she gets access to the nodes.

    <details>
      <summary> Answer </summary>
    
    ```bash
    ## michelle-clusterrole.yaml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
    # "namespace" omitted since ClusterRoles are not namespaced
      name: nodes-access
    rules:
    - apiGroups: [""]
      resources:
      - nodes
      verbs: 
      - "*" 
    ```
    
    ```bash
    ## michelle-clusterrolebinding.yaml 
    apiVersion: rbac.authorization.k8s.io/v1
    # This cluster role binding allows anyone in the "manager" group to read secrets in any namespace.
    kind: ClusterRoleBinding
    metadata:
      name: nodes-access-binding
    subjects:
    - kind: User
      name: michelle # Name is case sensitive
      apiGroup: rbac.authorization.k8s.io
    roleRef:
      kind: ClusterRole
      name: nodes-access
      apiGroup: rbac.authorization.k8s.io 
    ```
    
    ```bash
    controlplane ~ ➜  k apply -f michelle-clusterrole.yaml 
    clusterrole.rbac.authorization.k8s.io/nodes-access created

    controlplane ~ ➜  k apply -f michelle-clusterrolebinding.yaml 
    clusterrolebinding.rbac.authorization.k8s.io/nodes-access-binding created 

    controlplane ~ ➜  k apply -f michelle-clusterrole.yaml 
    clusterrole.rbac.authorization.k8s.io/nodes-access created

    controlplane ~ ➜  k apply -f michelle-clusterrolebinding.yaml 
    clusterrolebinding.rbac.authorization.k8s.io/nodes-access-binding created

    controlplane ~ ➜  k get nodes --as michelle
    NAME           STATUS   ROLES                  AGE   VERSION
    controlplane   Ready    control-plane,master   39m   v1.27.1+k3s1
    ```

    
    </details>
      



36. User michelle's responsibilities are growing and now she will be responsible for storage as well. Create the required ClusterRoles and ClusterRoleBindings to allow her access to Storage.

    - ClusterRole: storage-admin

    - Resource: persistentvolumes

    - Resource: storageclasses

    - ClusterRoleBinding: michelle-storage-admin

    - ClusterRoleBinding Subject: michelle

    - ClusterRoleBinding Role: storage-admin

    <details>
      <summary> Answer </summary>
    
    ```bash
    ## storage-admin-clusterrole.yaml 
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
    # "namespace" omitted since ClusterRoles are not namespaced
      name: storage-admin
    rules:
    - apiGroups:
      - storage.k8s.io
      resources:
      - storageclasses
      verbs: 
      - "*"
    - apiGroups:
      - ""
      resources:
      - persistentvolumes
      verbs:
      - "*" 
    ```
    ```bash
    ## storage-admin-clusterrolebinding.yaml 
    apiVersion: rbac.authorization.k8s.io/v1
    # This cluster role binding allows anyone in the "manager" group to read secrets in any namespace.
    kind: ClusterRoleBinding
    metadata:
    name: michelle-storage-admin
    subjects:
    - kind: User
    name: michelle # Name is case sensitive
    apiGroup: rbac.authorization.k8s.io
    roleRef:
    kind: ClusterRole
    name: storage-admin
    apiGroup: rbac.authorization.k8s.io 
    ```
    ```bash
    controlplane ~ ➜  k apply -f storage-admin-clusterrole.yaml 
    clusterrole.rbac.authorization.k8s.io/storage-admin created

    controlplane ~ ➜  k apply -f storage-admin-clusterrolebinding.yaml 
    clusterrolebinding.rbac.authorization.k8s.io/michelle-storage-admin created

    controlplane ~ ➜  k get clusterrole | grep storage-admin
    storage-admin                                                          2023-12-30T16:45:41Z

    controlplane ~ ➜  k get clusterrolebinding | grep storage-admin
    michelle-storage-admin                                 ClusterRole/storage-admin                                          41s
    ```
    ```bash
    controlplane ~ ➜  k get sc --as michelle
    NAME                   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
    local-path (default)   rancher.io/local-path   Delete          WaitForFirstConsumer   false                  48m

    controlplane ~ ➜  k get pv --as michelle
    No resources found 
    ```
    
    </details>
      



37. What is the secret token used by the default service account?

    ```bash
    controlplane ~ ➜  k get sa
    NAME      SECRETS   AGE
    default   0         10m
    dev       0         76s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k describe sa default 
    Name:                default
    Namespace:           default
    Labels:              <none>
    Annotations:         <none>
    Image pull secrets:  <none>
    Mountable secrets:   <none>
    Tokens:              <none>
    Events:              <none> 
    ```
    
    </details>
      



38. Inspect the Dashboard Application POD and identify the Service Account mounted on it.

    ```bash
    controlplane ~ ➜  k get po
    NAME                            READY   STATUS    RESTARTS   AGE
    web-dashboard-97c9c59f6-f6krx   1/1     Running   0          43s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k describe po web-dashboard-97c9c59f6-f6krx | grep -i service
    Service Account:  default
        /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-jcbls (ro) 
    ```
    
    </details>
      



39. The application needs a ServiceAccount with the Right permissions to be created to authenticate to Kubernetes. The default ServiceAccount has limited access. Create a new ServiceAccount named dashboard-sa.

    ```bash
    controlplane ~ ➜  k get po
    NAME                            READY   STATUS    RESTARTS   AGE
    web-dashboard-97c9c59f6-f6krx   1/1     Running   0          43s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    ## dashboard-sa.yaml 
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: dashboard-sa
      annotations:
        kubernetes.io/enforce-mountable-secrets: "true"
    ```
    ```bash
    controlplane ~ ➜  k apply -f dashboard-sa.yaml 
    serviceaccount/dashboard-sa created

    controlplane ~ ➜  k get sa
    NAME           SECRETS   AGE
    default        0         15m
    dev            0         5m58s
    dashboard-sa   0         3s
    ```
    
    </details>
      



40. Edit the deployment to change ServiceAccount from default to dashboard-sa.

    ```bash
    controlplane ~ ➜  k get deployments.apps 
    NAME            READY   UP-TO-DATE   AVAILABLE   AGE
    web-dashboard   1/1     1            1           6m22s 

    controlplane ~ ➜  k get sa
    NAME           SECRETS   AGE
    default        0         20m
    dev            0         10m
    dashboard-sa   0         4m26s
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    k edit deployments.apps web-dashboard  
    ```
    ```bash
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      annotations:
        deployment.kubernetes.io/revision: "1"
      creationTimestamp: "2023-12-30T16:53:13Z"
      generation: 1
      name: web-dashboard
      namespace: default
    resourceVersion: "854"
    uid: 937b66d9-e256-4944-9a5b-426731eda7ce
    spec:
      progressDeadlineSeconds: 600
      replicas: 1
      revisionHistoryLimit: 10
      selector:
        matchLabels:
          name: web-dashboard
      strategy:
        rollingUpdate:
          maxSurge: 25%
          maxUnavailable: 25%
        type: RollingUpdate
      template:
        metadata:
          creationTimestamp: null
          labels:
            name: web-dashboard
        spec:
          serviceAccountName: dashboard-sa 
    ```
    
    </details>
      