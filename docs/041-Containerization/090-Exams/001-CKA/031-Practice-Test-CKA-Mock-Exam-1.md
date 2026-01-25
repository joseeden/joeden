---
title: "Mock Exam 1"
tags: 
- Containerization
- Containers
- Kubernetes
- Certifications
- CKA
- CKAD
- CKSS
sidebar_position: 31
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

1. Upgrade the current version of kubernetes from 1.26.0 to 1.27.0 exactly using the kubeadm utility. Make sure that the upgrade is carried out one node at a time starting with the controlplane node. To minimize downtime, the deployment gold-nginx should be rescheduled on an alternate node before upgrading each node.

    Upgrade controlplane node first and drain node node01 before upgrading it. Pods for gold-nginx should run on the controlplane node subsequently.

    <details>
      <summary> Answer </summary>

    Start with the controlplane first. 

    ```bash
    controlplane ~ ➜  k get no
    NAME           STATUS   ROLES           AGE   VERSION
    controlplane   Ready    control-plane   30m   v1.26.0
    node01         Ready    <none>          29m   v1.26.0

    controlplane ~ ➜  k drain controlplane --ignore-daemonsets 
    node/controlplane cordoned
    Warning: ignoring DaemonSet-managed Pods: kube-system/kube-proxy-9q57t, kube-system/weave-net-txlpl
    evicting pod kube-system/coredns-787d4945fb-qdt8z
    evicting pod kube-system/coredns-787d4945fb-c4qz4
    pod/coredns-787d4945fb-c4qz4 evicted
    pod/coredns-787d4945fb-qdt8z evicted
    node/controlplane drained

    controlplane ~ ➜  k get no
    NAME           STATUS                     ROLES           AGE   VERSION
    controlplane   Ready,SchedulingDisabled   control-plane   30m   v1.26.0
    node01         Ready                      <none>          30m   v1.26.0 

    controlplane ~ ➜  k get po -o wide
    NAME                          READY   STATUS    RESTARTS   AGE     IP             NODE     NOMINATED NODE   READINESS GATES
    gold-nginx-6c5b9dd56c-4sgh9   1/1     Running   0          3m10s   10.244.192.1   node01   <none>           <none>
    ```
    ```bash
    apt update
    apt-cache madison kubeadm

    apt-mark unhold kubelet kubectl && \
    apt-get update && apt-get install -y \
    kubeadm=1.27.0-00 \
    kubelet=1.27.0-00 \
    kubectl=1.27.0-00 \
    apt-mark hold kubelet kubectl
    ```
    ```bash
    controlplane ~ ➜  kubeadm version
    kubeadm version: &version.Info{Major:"1", Minor:"27", GitVersion:"v1.27.0", GitCommit:"1b4df30b3cdfeaba6024e81e559a6cd09a089d65", GitTreeState:"clean", BuildDate:"2023-04-11T17:09:06Z", GoVersion:"go1.20.3", Compiler:"gc", Platform:"linux/amd64"}

    controlplane ~ ➜  kubectl version
    WARNING: This version information is deprecated and will be replaced with the output from kubectl version --short.  Use --output=yaml|json to get the full version.
    Client Version: version.Info{Major:"1", Minor:"27", GitVersion:"v1.27.0", GitCommit:"1b4df30b3cdfeaba6024e81e559a6cd09a089d65", GitTreeState:"clean", BuildDate:"2023-04-11T17:10:18Z", GoVersion:"go1.20.3", Compiler:"gc", Platform:"linux/amd64"}
    Kustomize Version: v5.0.1
    ```
    ```bash
    kubeadm upgrade plan
    kubeadm upgrade apply v1.27.0

    sudo systemctl daemon-reload
    sudo systemctl restart kubelet
    ```
    ```bash
    controlplane ~ ➜  k uncordon controlplane 
    node/controlplane uncordoned

    controlplane ~ ➜  k get no
    NAME           STATUS   ROLES           AGE   VERSION
    controlplane   Ready    control-plane   38m   v1.27.0
    node01         Ready    <none>          37m   v1.26.0

    controlplane ~ ➜  k get po -o wide
    NAME                          READY   STATUS    RESTARTS   AGE   IP             NODE     NOMINATED NODE   READINESS GATES
    gold-nginx-6c5b9dd56c-4sgh9   1/1     Running   0          10m   10.244.192.1   node01   <none>           <none>
    ```

    Before going to node01, drain it first.

    ```bash
    controlplane ~ ➜  k get no
    NAME           STATUS   ROLES           AGE   VERSION
    controlplane   Ready    control-plane   39m   v1.27.0
    node01         Ready    <none>          38m   v1.26.0

    controlplane ~ ➜  k drain node01 --ignore-daemonsets 
    node/node01 cordoned
    Warning: ignoring DaemonSet-managed Pods: kube-system/kube-proxy-d5t6j, kube-system/weave-net-kwhpv
    evicting pod kube-system/coredns-5d78c9869d-pzbkb
    evicting pod admin2406/deploy2-7b6d9445df-tgp74
    evicting pod admin2406/deploy3-66785bc8f5-22nv7
    evicting pod default/gold-nginx-6c5b9dd56c-4sgh9
    evicting pod admin2406/deploy1-5d88679d77-nvbfc
    evicting pod admin2406/deploy5-7cbf794564-t66r2
    evicting pod kube-system/coredns-5d78c9869d-844r9
    evicting pod admin2406/deploy4-55554b4b4c-zkz7p
    pod/deploy5-7cbf794564-t66r2 evicted
    I0104 05:34:38.455763   17683 request.go:696] Waited for 1.05165341s due to client-side throttling, not priority and fairness, request: GET:https://controlplane:6443/api/v1/namespaces/admin2406/pods/deploy1-5d88679d77-nvbfc
    pod/deploy1-5d88679d77-nvbfc evicted
    pod/deploy4-55554b4b4c-zkz7p evicted
    pod/deploy3-66785bc8f5-22nv7 evicted
    pod/gold-nginx-6c5b9dd56c-4sgh9 evicted
    pod/deploy2-7b6d9445df-tgp74 evicted
    pod/coredns-5d78c9869d-844r9 evicted
    pod/coredns-5d78c9869d-pzbkb evicted
    node/node01 drained

    controlplane ~ ➜  k get no
    NAME           STATUS                     ROLES           AGE   VERSION
    controlplane   Ready                      control-plane   39m   v1.27.0
    node01         Ready,SchedulingDisabled   <none>          39m   v1.26.0
    ```

    Now run the same commands in node-01. 

    ```bash
    ssh node01

    apt update
    apt-cache madison kubeadm

    apt-mark unhold kubelet kubectl && \
    apt-get update && apt-get install -y \
    kubeadm=1.27.0-00 \
    kubelet=1.27.0-00 \
    kubectl=1.27.0-00 \
    apt-mark hold kubelet kubectl

    kubeadm version
    kubectl version 

    kubeadm upgrade plan
    sudo kubeadm upgrade apply v1.27.0

    sudo systemctl daemon-reload
    sudo systemctl restart kubelet
    ```
    ```bash
    root@node01 ~ ✦ ✖ kubeadm version
    kubeadm version: &version.Info{Major:"1", Minor:"27", GitVersion:"v1.27.0", GitCommit:"1b4df30b3cdfeaba6024e81e559a6cd09a089d65", GitTreeState:"clean", BuildDate:"2023-04-11T17:09:06Z", GoVersion:"go1.20.3", Compiler:"gc", Platform:"linux/amd64"}

    root@node01 ~ ✦ ➜  kubectl version
    WARNING: This version information is deprecated and will be replaced with the output from kubectl version --short.  Use --output=yaml|json to get the full version.
    Client Version: version.Info{Major:"1", Minor:"27", GitVersion:"v1.27.0", GitCommit:"1b4df30b3cdfeaba6024e81e559a6cd09a089d65", GitTreeState:"clean", BuildDate:"2023-04-11T17:10:18Z", GoVersion:"go1.20.3", Compiler:"gc", Platform:"linux/amd64"}
    ```

    Now before we uncordon the node01, we must first make sure that the pod is running on controlplane, as instructed.

    ```bash
    controlplane ~ ✦2 ✖ k get po
    NAME                          READY   STATUS    RESTARTS   AGE
    gold-nginx-6c5b9dd56c-xjc6c   0/1     Pending   0          3m30s

    controlplane ~ ✦2 ➜  k describe po gold-nginx-6c5b9dd56c-xjc6c | grep -i events -A 5
    Events:
    Type     Reason            Age    From               Message
    ----     ------            ----   ----               -------
    Warning  FailedScheduling  4m59s  default-scheduler  0/2 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }, 1 node(s) were unschedulable. preemption: 0/2 nodes are available: 2 Preemption is not helpful for scheduling.

    controlplane ~ ✦2 ➜  k describe nodes controlplane | grep -i taint
    Taints:             node-role.kubernetes.io/control-plane:NoSchedule
    ```

    To allow scheduling of pods controlplane, we need to remove the taint on the controlplane. 

    ```bash
    controlplane ~ ✦2 ✖ k describe nodes controlplane | grep -i taint
    Taints:             node-role.kubernetes.io/control-plane:NoSchedule

    controlplane ~ ✦2 ➜  k taint no controlplane node-role.kubernetes.io/control-plane:NoSchedule-
    node/controlplane untainted

    controlplane ~ ✦2 ➜  k describe nodes controlplane | grep -i taint
    Taints:             <none>

    controlplane ~ ✦2 ➜  k get po
    NAME                          READY   STATUS              RESTARTS   AGE
    gold-nginx-6c5b9dd56c-xjc6c   0/1     ContainerCreating   0          7m10s

    controlplane ~ ✦2 ➜  k get po
    NAME                          READY   STATUS    RESTARTS   AGE
    gold-nginx-6c5b9dd56c-xjc6c   1/1     Running   0          7m13s

    controlplane ~ ✦2 ➜  k get po -o wide
    NAME                          READY   STATUS    RESTARTS   AGE     IP           NODE           NOMINATED NODE   READINESS GATES
    gold-nginx-6c5b9dd56c-xjc6c   1/1     Running   0          7m17s   10.244.0.4   controlplane   <none>           <none>
    ```

    We can now uncordon node01. 

    ```bash
    controlplane ~ ✦2 ➜  k get no
    NAME           STATUS                     ROLES           AGE   VERSION
    controlplane   Ready                      control-plane   56m   v1.27.0
    node01         Ready,SchedulingDisabled   <none>          55m   v1.27.0

    controlplane ~ ✦2 ➜  k uncordon node01 
    node/node01 uncordoned

    controlplane ~ ✦2 ➜  k get no
    NAME           STATUS   ROLES           AGE   VERSION
    controlplane   Ready    control-plane   56m   v1.27.0
    node01         Ready    <none>          55m   v1.27.0

    controlplane ~ ✦2 ➜  k get po -o wide
    NAME                          READY   STATUS    RESTARTS   AGE     IP           NODE           NOMINATED NODE   READINESS GATES
    gold-nginx-6c5b9dd56c-xjc6c   1/1     Running   0          7m44s   10.244.0.4   controlplane   <none>           <none>  
    ```
    
    </details>
      


2. Print the names of all deployments in the admin2406 namespace in the following format:

    ```bash
    DEPLOYMENT CONTAINER_IMAGE READY_REPLICAS NAMESPACE
    ```

    The data should be sorted by the increasing order of the deployment name.



    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✦2 ➜  k get ns
    NAME              STATUS   AGE
    admin1401         Active   28m
    admin2406         Active   28m
    alpha             Active   28m
    default           Active   57m
    kube-node-lease   Active   57m
    kube-public       Active   57m
    kube-system       Active   57m

    controlplane ~ ✦2 ➜  k get deployments.apps -n admin2406 
    NAME      READY   UP-TO-DATE   AVAILABLE   AGE
    deploy1   1/1     1            1           29m
    deploy2   1/1     1            1           29m
    deploy3   1/1     1            1           29m
    deploy4   1/1     1            1           29m
    deploy5   1/1     1            1           29m
    ```

    Use custom columns to specify the headers. 

    ```bash
    controlplane ~ ✦2 ➜  k get -n admin2406 deployments.apps -o custom-columns="DEPLOYMENT:a,CONTAINER_IMAGE:b,READY_REPLICAS:c,NAMESPACE:d" 
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    <none>       <none>            <none>           <none>
    <none>       <none>            <none>           <none>
    <none>       <none>            <none>           <none>
    <none>       <none>            <none>           <none>
    <none>       <none>            <none>           <none>  
    ```

    Now that we got the format, we just need to supply the values. Let's use one sample first.

    ```bash
    controlplane ~ ✦2 ➜  k get deployments.apps -n admin2406 deploy1 
    NAME      READY   UP-TO-DATE   AVAILABLE   AGE
    deploy1   1/1     1            1           35m

    controlplane ~ ✦2 ➜  k get deployments.apps -n admin2406 
    NAME      READY   UP-TO-DATE   AVAILABLE   AGE
    deploy1   1/1     1            1           35m
    deploy2   1/1     1            1           35m
    deploy3   1/1     1            1           35m
    deploy4   1/1     1            1           35m
    deploy5   1/1     1            1           35m

    controlplane ~ ✦2 ➜  k get deployments.apps -n admin2406 deploy1 
    NAME      READY   UP-TO-DATE   AVAILABLE   AGE
    deploy1   1/1     1            1           35m
    ```

    Determine the values that is needed and use dot notation.

    ```bash
    controlplane ~ ✦2 ➜  k get deployments.apps -n admin2406 deploy1 -o json
    {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
            "annotations": {
                "deployment.kubernetes.io/revision": "1"
            },
            "creationTimestamp": "2024-01-04T10:23:24Z",
            "generation": 1,
            "labels": {
                "app": "deploy1"
            },
            "name": "deploy1",
            "namespace": "admin2406",
            "resourceVersion": "6133",
            "uid": "0c04a727-afbd-4242-9a9f-abc45879367b"
        },
        "spec": {
            "progressDeadlineSeconds": 600,
            "replicas": 1,
            "revisionHistoryLimit": 10,
            "selector": {
                "matchLabels": {
                    "app": "deploy1"
                }
            },
            "strategy": {
                "rollingUpdate": {
                    "maxSurge": "25%",
                    "maxUnavailable": "25%"
                },
                "type": "RollingUpdate"
            },
            "template": {
                "metadata": {
                    "creationTimestamp": null,
                    "labels": {
                        "app": "deploy1"
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "image": "nginx",
                            "imagePullPolicy": "Always",
                            "name": "nginx",
    ```

    Start with first column:

    ```bash
    Deployment names = {.metadata.name}  
    ```
    ```bash
    controlplane ~ ✦2 ➜  k get -n admin2406 deployments.apps -o custom-columns="DEPLOYMENT:{.metadata.name},CONTAINER_IMAGE:b,READY_REPLICAS:c,NAMESPACE:d" 
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    deploy1      <none>            <none>           <none>
    deploy2      <none>            <none>           <none>
    deploy3      <none>            <none>           <none>
    deploy4      <none>            <none>           <none>
    deploy5      <none>            <none>           <none>
    ```

    Now the container image.

    ```bash
    {.spec.template.spec.containers[0].image}
    ```
    ```bash
    controlplane ~ ✦2 ➜  k get -n admin2406 deployments.apps -o custom-columns="DEPLOYMENT:{.metadata.name},CONTAINER_IMAGE:{.spec.template.spec.containers[0].image},READY_REPLICAS:c,NAMESPACE:d" 
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    deploy1      nginx             <none>           <none>
    deploy2      nginx:alpine      <none>           <none>
    deploy3      nginx:1.16        <none>           <none>
    deploy4      nginx:1.17        <none>           <none>
    deploy5      nginx:latest      <none>           <none>
    ```

    Now the ready replicas. 

    ```bash
    {.status.readyReplicas}
    ```
    ```bash
    controlplane ~ ✦2 ➜  k get -n admin2406 deployments.apps -o custom-columns="DEPLOYMENT:{.metadata.name},CONTAINER_IMAGE:{.spec.template.spec.containers[0].image},READY_REPLICAS:{.status.readyReplicas},NAMESPACE:d" 
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    deploy1      nginx             1                <none>
    deploy2      nginx:alpine      1                <none>
    deploy3      nginx:1.16        1                <none>
    deploy4      nginx:1.17        1                <none>
    deploy5      nginx:latest      1                <none>
    ```

    Finally, the namespace. 

    ```bash
    {.metadata.namespace}
    ```
    ```bash
    controlplane ~ ✦2 ➜  k get -n admin2406 deployments.apps -o custom-columns="DEPLOYMENT:{.metadata.name},CONTAINER_IMAGE:{.spec.template.spec.containers[0].image},READY_REPLICAS:{.status.readyReplicas},NAMESPACE:{.metadata.namespace}" 
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    deploy1      nginx             1                admin2406
    deploy2      nginx:alpine      1                admin2406
    deploy3      nginx:1.16        1                admin2406
    deploy4      nginx:1.17        1                admin2406
    deploy5      nginx:latest      1                admin2406
    ```

    Now sort it by deployment name. 

    ```bash
    controlplane ~ ➜  kubectl -n admin2406 get deployment -o custom-columns=DEPLOYMENT:.metadata.name,CONTAINER_IMAGE:.spec.template.spec.containers[].image,READY_REPLICAS:.status.readyReplicas,NAMESPACE:.metadata.namespace --sort-by=.metadata.name
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    deploy1      nginx             1                admin2406
    deploy2      nginx:alpine      1                admin2406
    deploy3      nginx:1.16        1                admin2406
    deploy4      nginx:1.17        1                admin2406
    deploy5      nginx:latest      1                admin2406

    ```    

    Finally, forward it to the specified file.

    ```bash
    kubectl -n admin2406 get deployment -o custom-columns=DEPLOYMENT:.metadata.name,CONTAINER_IMAGE:.spec.template.spec.containers[].image,READY_REPLICAS:.status.readyReplicas,NAMESPACE:.metadata.namespace --sort-by=.metadata.name > /opt/admin2406_data
    ```
    ```bash
    controlplane ~ ➜  ls -la /opt/admin2406_data 
    -rw-r--r-- 1 root root 348 Jan  4 06:57 /opt/admin2406_data

    controlplane ~ ➜  cat /opt/admin2406_data 
    DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
    deploy1      nginx             1                admin2406
    deploy2      nginx:alpine      1                admin2406
    deploy3      nginx:1.16        1                admin2406
    deploy4      nginx:1.17        1                admin2406
    deploy5      nginx:latest      1                admin2406 
    ```


    </details>
      


3. A kubeconfig file called admin.kubeconfig has been created in /root/CKA. There is something wrong with the configuration. Troubleshoot and fix it.

    <details>
      <summary> Answer </summary>

    Make sure the port for the kube-apiserver is correct. So for this change port from 4380 to 6443.

    Run the below command to know the cluster information:

    ```bash
    controlplane ~ ➜  kubectl cluster-info --kubeconfig /root/CKA/admin.kubeconfig
    E0104 07:00:03.980973   11082 memcache.go:238] couldn't get current server API group list: Get "https://controlplane:4380/api?timeout=32s": dial tcp 192.26.250.9:4380: connect: connection refused
    E0104 07:00:03.981343   11082 memcache.go:238] couldn't get current server API group list: Get "https://controlplane:4380/api?timeout=32s": dial tcp 192.26.250.9:4380: connect: connection refused
    E0104 07:00:03.982790   11082 memcache.go:238] couldn't get current server API group list: Get "https://controlplane:4380/api?timeout=32s": dial tcp 192.26.250.9:4380: connect: connection refused
    E0104 07:00:03.984160   11082 memcache.go:238] couldn't get current server API group list: Get "https://controlplane:4380/api?timeout=32s": dial tcp 192.26.250.9:4380: connect: connection refused
    E0104 07:00:03.985582   11082 memcache.go:238] couldn't get current server API group list: Get "https://controlplane:4380/api?timeout=32s": dial tcp 192.26.250.9:4380: connect: connection refused

    To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
    The connection to the server controlplane:4380 was refused - did you specify the right host or port?
    ```

    ```bash
    vi /root/CKA/admin.kubeconfig 
    ```

    ```bash
    server: https://controlplane:6443
    ```

    ```bash
    controlplane ~ ➜  kubectl cluster-info --kubeconfig /root/CKA/admin.kubeconfig
    Kubernetes control plane is running at https://controlplane:6443
    CoreDNS is running at https://controlplane:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

    To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
    ```
    
    </details>
      


4. Create a new deployment called nginx-deploy, with image nginx:1.16 and 1 replica. Next upgrade the deployment to version 1.17 using rolling update.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✦2 ➜  k create deployment nginx-deploy --image nginx:1.16 --replicas 1
    deployment.apps/nginx-deploy created

    controlplane ~ ✦2 ➜  k get deployments.apps 
    NAME           READY   UP-TO-DATE   AVAILABLE   AGE
    gold-nginx     1/1     1            1           44m
    nginx-deploy   1/1     1            1           5s
    ```
    ```bash
    controlplane ~ ➜  k set image deploy nginx-deploy nginx=nginx:1.17
    deployment.apps/nginx-deploy image updated

    controlplane ~ ➜  k rollout status deployment nginx-deploy 
    deployment "nginx-deploy" successfully rolled out
    ```
    ```bash
    controlplane ~ ✦2 ➜  k get deployments.apps 
    NAME           READY   UP-TO-DATE   AVAILABLE   AGE
    gold-nginx     1/1     1            1           45m
    nginx-deploy   1/1     1            1           56s

    controlplane ~ ✦2 ➜  k describe deployments.apps nginx-deploy | grep -i image
        Image:        nginx:1.17
    ```

    </details>
          

5. A new deployment called alpha-mysql has been deployed in the alpha namespace. However, the pods are not running. Troubleshoot and fix the issue. The deployment should make use of the persistent volume alpha-pv to be mounted at /var/lib/mysql and should use the environment variable MYSQL_ALLOW_EMPTY_PASSWORD=1 to make use of an empty root password.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✖ k get all -n alpha 
    NAME                               READY   STATUS    RESTARTS   AGE
    pod/alpha-mysql-5b7b8988c4-r8ls8   0/1     Pending   0          8m8s

    NAME                          READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/alpha-mysql   0/1     1            0           8m8s

    NAME                                     DESIRED   CURRENT   READY   AGE
    replicaset.apps/alpha-mysql-5b7b8988c4   1         1         0       8m8s

    controlplane ~ ➜  k describe deployments.apps -n alpha alpha-mysql 
    Name:                   alpha-mysql
    Namespace:              alpha
    CreationTimestamp:      Thu, 04 Jan 2024 06:52:44 -0500
    Labels:                 app=alpha-mysql
    Annotations:            deployment.kubernetes.io/revision: 1
    Selector:               app=alpha-mysql
    Replicas:               1 desired | 1 updated | 1 total | 0 available | 1 unavailable
    StrategyType:           RollingUpdate
    MinReadySeconds:        0
    RollingUpdateStrategy:  25% max unavailable, 25% max surge
    Pod Template:
    Labels:  app=alpha-mysql
    Containers:
    mysql:
        Image:      mysql:5.6
        Port:       3306/TCP
        Host Port:  0/TCP
        Environment:
        MYSQL_ALLOW_EMPTY_PASSWORD:  1
        Mounts:
        /var/lib/mysql from mysql-data (rw)
    Volumes:
    mysql-data:
        Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
        ClaimName:  mysql-alpha-pvc
        ReadOnly:   false
    Conditions:
    Type           Status  Reason
    ----           ------  ------
    Available      False   MinimumReplicasUnavailable
    Progressing    True    ReplicaSetUpdated
    OldReplicaSets:  <none>
    NewReplicaSet:   alpha-mysql-5b7b8988c4 (1/1 replicas created)
    Events:
    Type    Reason             Age    From                   Message
    ----    ------             ----   ----                   -------
    Normal  ScalingReplicaSet  8m19s  deployment-controller  Scaled up replica set alpha-mysql-5b7b8988c4 to 1
    ```

    Look closely at:

    ```bash
    Volumes:
    mysql-data:
        Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
        ClaimName:  mysql-alpha-pvc
        ReadOnly:   false 
    ```

    However, there's no PVC with that name. 

    ```bash
    controlplane ~ ➜  k get pvc -n alpha 
    NAME          STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    alpha-claim   Pending                                      slow-storage   9m1s
    ```

    Create the PVC.

    ```yaml
    ## pvc.yml 
    ---
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: mysql-alpha-pvc
      namespace: alpha
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
      storageClassName: slow

    ```
    ```bash
    controlplane ~ ➜  k apply -f pvc.yml 
    persistentvolumeclaim/mysql-alpha-pvc created

    controlplane ~ ➜  k get -n alpha pvc
    NAME              STATUS    VOLUME     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    alpha-claim       Pending                                        slow-storage   10m
    mysql-alpha-pvc   Bound     alpha-pv   1Gi        RWO            slow           11s

    controlplane ~ ➜  k get -n alpha po
    NAME                           READY   STATUS    RESTARTS   AGE
    alpha-mysql-5b7b8988c4-r8ls8   1/1     Running   0          10m

    controlplane ~ ➜  k get -n alpha deployments.apps 
    NAME          READY   UP-TO-DATE   AVAILABLE   AGE
    alpha-mysql   1/1     1            1           10m
    ```
    
    </details>
      


6. Take the backup of ETCD at the location /opt/etcd-backup.db on the controlplane node.


    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✦2 ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i ca
    Priority Class Name:  system-node-critical
        Image ID:      registry.k8s.io/kube-apiserver@sha256:89b8d9dbef2b905b7d028ca8b7f79d35ebd9baa66b0a3ee2ddd4f3e0e2804b45
        --client-ca-file=/etc/kubernetes/pki/ca.crt

    controlplane ~ ✦2 ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i server.crt
        --tls-cert-file=/etc/kubernetes/pki/apiserver.crt

    controlplane ~ ✦2 ➜  k describe -n kube-system po kube-apiserver-controlplane | grep -i .key
        --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
        --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
        --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
        --service-account-key-file=/etc/kubernetes/pki/sa.pub
        --service-account-signing-key-file=/etc/kubernetes/pki/sa.key
        --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    ```

    ```bash
    export ETCDCTL_API=3 
    etcdctl \
    --endpoints=127.0.0.1:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    snapshot save /opt/etcd-backup.db
    ```
    ```bash
    controlplane ~ ➜  ls -la /opt/etcd-backup.db 
    -rw-r--r-- 1 root root 2134048 Jan  4 07:05 /opt/etcd-backup.db 
    ```
        
    </details>
      


7. Create a pod called secret-1401 in the admin1401 namespace using the busybox image. The container within the pod should be called secret-admin and should sleep for 4800 seconds.

    The container should mount a read-only secret volume called secret-volume at the path /etc/secret-volume. The secret being mounted has already been created for you and is called dotfile-secret.

    <details>
      <summary> Answer </summary>
    
    ```bash
    k run secret-1401 -n admin1401 --image=busybox --dry-run=client -oyaml --command -- sleep 4800 > admin.yaml
    ```
    ```bash
    ---
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      name: secret-1401
      namespace: admin1401
      labels:
        run: secret-1401
    spec:
      volumes:
      - name: secret-volume
        # secret volume
        secret:
          secretName: dotfile-secret
      containers:
      - command:
        - sleep
        - "4800"
        image: busybox
        name: secret-admin
        # volumes' mount path
        volumeMounts:
        - name: secret-volume
          readOnly: true
          mountPath: "/etc/secret-volume"
    ```
    ```bash
    controlplane ~ ➜  k get po -n admin1401 
    NAME          READY   STATUS    RESTARTS   AGE
    secret-1401   1/1     Running   0          27s    
    ```
    
    </details>
      


8. Expose the hr-web-app as service hr-web-app-service application on port 30082 on the nodes on the cluster. The web application listens on port 8080.

    - Name: hr-web-app-service

    - Type: NodePort

    - Endpoints: 2

    - Port: 8080

    - NodePort: 30082


    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ✦ ➜  k get po
    NAME                          READY   STATUS    RESTARTS   AGE
    hr-web-app-57cd7b5799-vzmsz   1/1     Running   0          9m2s
    hr-web-app-57cd7b5799-wqshb   1/1     Running   0          9m2s
    messaging                     1/1     Running   0          11m
    nginx-pod                     1/1     Running   0          11m
    orange                        1/1     Running   0          3m23s
    static-busybox                1/1     Running   0          5m52s

    controlplane ~ ✦ ➜  k get deployments.apps 
    NAME         READY   UP-TO-DATE   AVAILABLE   AGE
    hr-web-app   2/2     2            2           9m4s 

    controlplane ~ ✦ ➜  kubectl expose deployment hr-web-app --type=NodePort --port=8080 --name=hr-web-app-service --dry-run=client -o yaml > hr-web-app-service.yaml

    ```

    Modify the YAML file and add the nodeport section:

    ```bash
    ### hr-web-app-service.yaml
    apiVersion: v1
    kind: Service
    metadata:
    creationTimestamp: null
    labels:
        app: hr-web-app
    name: hr-web-app-service
    spec:
    ports:
    - port: 8080
        protocol: TCP
        targetPort: 8080
        nodePort: 30082
    selector:
        app: hr-web-app
    type: NodePort
    status:
    loadBalancer: {}  
    ```
    ```bash
    controlplane ~ ➜  k get svc
    NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
    hr-web-app-service   NodePort    10.106.44.228    <none>        8080:30082/TCP   23s
    kubernetes           ClusterIP   10.96.0.1        <none>        443/TCP          128m
    messaging-service    ClusterIP   10.100.177.203   <none>        6379/TCP         30m 
    ```
    
    </details>
      



9. Create a static pod named static-busybox on the controlplane node that uses the busybox image and the command sleep 1000.

    <details>
      <summary> Answer </summary>
    
    ```bash
    kubectl run --restart=Never --image=busybox static-busybox --dry-run=client -oyaml --command -- sleep 1000 > /etc/kubernetes/manifests/static-busybox.yaml
    ```
    ```bash
    controlplane ~ ➜  ls -la /etc/kubernetes/manifests/static-busybox.yaml 
    -rw-r--r-- 1 root root 298 Jan  4 08:12 /etc/kubernetes/manifests/static-busybox.yaml

    controlplane ~ ➜  k get po
    NAME                          READY   STATUS    RESTARTS   AGE
    hr-web-app-57cd7b5799-vzmsz   1/1     Running   0          26m
    hr-web-app-57cd7b5799-wqshb   1/1     Running   0          26m
    messaging                     1/1     Running   0          28m
    nginx-pod                     1/1     Running   0          28m
    orange                        1/1     Running   0          20m
    static-busybox                1/1     Running   0          23m 
    ```
    
    </details>
      



10. Create a Persistent Volume with the given specification: -

    - Volume name: pv-analytics

    - Storage: 100Mi

    - Access mode: ReadWriteMany

    - Host path: /pv/data-analytics

    <details>
      <summary> Answer </summary>
    
    ```bash
    ## pv.yml 
    apiVersion: v1
    kind: PersistentVolume
    metadata:
    name: pv-analytics
    spec:
    capacity:
        storage: 100Mi
    accessModes:
        - ReadWriteMany
    hostPath:
        path: /pv/data-analytics
    ```
    ```bash
    controlplane ~ ➜  k apply -f pv.yml 
    persistentvolume/pv-analytics created

    controlplane ~ ➜  k get pv
    NAME           CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
    pv-analytics   100Mi      RWX            Retain           Available      
    ```
    
    </details>
      



11. Use JSON PATH query to retrieve the osImages of all the nodes and store it in a file /opt/outputs/nodes_os_x43kj56.txt.

    The osImages are under the nodeInfo section under status of each node.

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get no -o jsonpath='{.items[*].status.nodeInfo}'
    {"architecture":"amd64","bootID":"1ededf94-06c6-443e-b30a-58a8637de4ad","containerRuntimeVersion":"containerd://1.6.6","kernelVersion":"5.4.0-1106-gcp","kubeProxyVersion":"v1.27.0","kubeletVersion":"v1.27.0","machineID":"73d7539cb95c4ef09a8ddd274b5251bc","operatingSystem":"linux","osImage":"Ubuntu 20.04.6 LTS","systemUUID":"f27b8c4f-18b7-2007-fc27-ce8e34bfff92"}
    controlplane ~ ➜  

    controlplane ~ ➜  k get no -o jsonpath='{.items[*].status.nodeInfo.osImage}'
    Ubuntu 20.04.6 LTS
    controlplane ~ ➜  

    controlplane ~ ➜  kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}' > /opt/outputs/nodes_os_x43kj56.txt

    controlplane ~ ➜  

    controlplane ~ ➜  ls -l /opt/outputs/
    total 20
    -rw-r--r-- 1 root root    18 Jan  4 08:19 nodes_os_x43kj56.txt
    -rw-r--r-- 1 root root 12296 Jan  4 07:45 nodes-z3444kd9.json

    controlplane ~ ➜  cat /opt/outputs/nodes_os_x43kj56.txt 
    Ubuntu 20.04.6 LTS
    ```
    
    </details>
      



12. Create a new pod called super-user-pod with image busybox:1.28. Allow the pod to be able to set system_time. Pod should sleep for 4800 seconds.

    <details>
      <summary> Answer </summary>
    
    ```YAML 
    ## super.yml
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: null
      labels:
        run: super-user-pod
      name: super-user-pod
    spec:
      containers:
      - image: busybox:1.28
        name: super-user-pod
        command: ["sh","-c","sleep 4800"]
        securityContext:
          capabilities:
            add: ["SYS_TIME"]
        resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
    status: {}
    ```
    ```bash
    controlplane ~ ➜  k apply -f super.yml 
    pod/super-user-pod created

    controlplane ~ ➜  k get po
    NAME                            READY   STATUS    RESTARTS   AGE
    nginx-critical                  1/1     Running   0          6m28s
    nginx-deploy-5c95467974-d27mz   1/1     Running   0          12m
    redis-storage                   1/1     Running   0          28m
    super-user-pod                  1/1     Running   0          3s
    ```
    
    </details>
      

