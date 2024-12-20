---
title: "Services and Networking"
tags: [Containerization, Containers, Kubernetes, Certifications, CKA, CKAD, CKSS]
sidebar_position: 19
last_update:
  date: 12/29/2023
---



> Some of the scenario questions here are based on [Kodekloud's CKAD course labs](https://kodekloud.com/courses/labs-certified-kubernetes-application-developer/?utm_source=udemy&utm_medium=labs&utm_campaign=kubernetes).


:::info[NOTE]

CKAD and CKA can have similar scenario questions. 
It is recommended to go through the [CKA practice tests.](/docs/015-Containerization/090-Exams/001-CKA/002-Practice-Test-CKA.md)
:::


## Shortcuts

First run the two commands below for shortcuts.

```bash
export do="--dry-run=client -o yaml" 
export now="--force --grace-period=0" 
```

## Questions

1. What is the targetPort configured on the kubernetes service?

    ```bash
    controlplane ~ ➜  k get svc
    NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
    kubernetes   ClusterIP   10.43.0.1    <none>        443/TCP   6m50s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k describe svc kubernetes 
    Name:              kubernetes
    Namespace:         default
    Labels:            component=apiserver
                    provider=kubernetes
    Annotations:       <none>
    Selector:          <none>
    Type:              ClusterIP
    IP Family Policy:  SingleStack
    IP Families:       IPv4
    IP:                10.43.0.1
    IPs:               10.43.0.1
    Port:              https  443/TCP
    TargetPort:        6443/TCP
    Endpoints:         192.36.199.3:6443
    Session Affinity:  None
    Events:            <none> 
    ```
    
    </details>
      



2. Create a new service to access the web application using the service-definition-1.yaml file.

    - Name: webapp-service
    - Type: NodePort
    - targetPort: 8080
    - port: 8080
    - nodePort: 30080
    - selector:
        name: simple-webapp

    ```bash
    controlplane ~ ➜  k get po
    NAME                                        READY   STATUS    RESTARTS   AGE
    simple-webapp-deployment-7b4d799f4d-z2knh   1/1     Running   0          45s
    simple-webapp-deployment-7b4d799f4d-dn9lb   1/1     Running   0          45s
    simple-webapp-deployment-7b4d799f4d-w7rgr   1/1     Running   0          45s
    simple-webapp-deployment-7b4d799f4d-74bj4   1/1     Running   0          45s

    controlplane ~ ➜  k get deployments.apps 
    NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
    simple-webapp-deployment   4/4     4            4           49s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k expose deployment simple-webapp-deployment --name webapp-service --type NodePort --port 8080 --target-port 8080 $do
    apiVersion: v1
    kind: Service
    metadata:
      creationTimestamp: null
      name: webapp-service
    spec:
      ports:
      - port: 8080
        protocol: TCP
        targetPort: 8080
      selector:
        name: simple-webapp
      type: NodePort
    status:
    loadBalancer: {}

    controlplane ~ ➜  k expose deployment simple-webapp-deployment --name webapp-service --type NodePort --port 8080 --target-port 8080 $do > webapp-service.yml 
    ```
    ```yaml
    ## webapp-service.yml
    apiVersion: v1
    kind: Service
      metadata:
      creationTimestamp: null
      name: webapp-service
    spec:
      ports:
      - port: 8080
        protocol: TCP
        targetPort: 8080
        nodePort: 30080
      selector:
        name: simple-webapp
      type: NodePort
    status:
    loadBalancer: {}
    ```
    ```bash
    ontrolplane ~ ➜  k apply -f webapp-service.yml 
    service/webapp-service created

    controlplane ~ ➜  k get svc
    NAME             TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
    kubernetes       ClusterIP   10.43.0.1      <none>        443/TCP          13m
    webapp-service   NodePort    10.43.68.185   <none>        8080:30080/TCP   3s
    ```
    
    </details>
      


3. What type of traffic is this Network Policy configured to handle?

    ```bash
    controlplane ~ ➜  k get netpol
    NAME             POD-SELECTOR   AGE
    payroll-policy   name=payroll   21s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get netpol payroll-policy -o yaml | grep -i policyTypes
        {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"annotations":{},"name":"payroll-policy","namespace":"default"},"spec":{"ingress":[{"from":[{"podSelector":{"matchLabels":{"name":"internal"}}}],"ports":[{"port":8080,"protocol":"TCP"}]}],"podSelector":{"matchLabels":{"name":"payroll"}},"policyTypes":["Ingress"]}} 
    ```
    
    </details>
      



4. Create a network policy to allow traffic from the Internal application only to the payroll-service and db-service. Use the spec given below. You might want to enable ingress traffic to the pod to test your rules in the UI.

    - Policy Name: internal-policy

    - Policy Type: Egress

    - Egress Allow: payroll

    - Payroll Port: 8080

    - Egress Allow: mysql

    - MySQL Port: 3306

    <details>
      <summary> Answer </summary>
    
    ```bash
    ## internal-policy.yaml
    apiVersion: networking.k8s.io/v1
    kind: NetworkPolicy
    metadata:
      name: internal-policy
      namespace: default
    spec:
      podSelector:
        matchLabels:
        name: internal
      policyTypes:
      - Egress
      - Ingress
      ingress:
        - {}
      egress:
      - to:
        - podSelector:
            matchLabels:
              name: mysql
        ports:
        - protocol: TCP
          port: 3306

      - to:
        - podSelector:
            matchLabels:
              name: payroll
        ports:
        - protocol: TCP
          port: 8080

    - ports:
        - port: 53
          protocol: UDP
        - port: 53
          protocol: TCP 
    ```
    Note: We have also allowed Egress traffic to TCP and UDP port. This has been added to ensure that the internal DNS resolution works from the internal pod. 


    ```bash
    controlplane ~ ➜  k apply -f internal-policy.yaml 
    networkpolicy.networking.k8s.io/internal-policy created

    controlplane ~ ➜  k get networkpolicies.networking.k8s.io 
    NAME              POD-SELECTOR    AGE
    internal-policy   name=internal   3s
    payroll-policy    name=payroll    17m 
    ```
    
    </details>
      



5. Which namespace is the Ingress Controller deployed in?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get all -A | grep -i ingress
    ingress-nginx   pod/ingress-nginx-admission-create-ddtp2        0/1     Completed   0          84s
    ingress-nginx   pod/ingress-nginx-admission-patch-nn4hl         0/1     Completed   0          84s
    ingress-nginx   pod/ingress-nginx-controller-5d48d5445f-zwmd9   1/1     Running     0          85s
    ingress-nginx   service/ingress-nginx-controller             NodePort    10.103.62.71    <none>        80:30080/TCP,443:32103/TCP   85s
    ingress-nginx   service/ingress-nginx-controller-admission   ClusterIP   10.96.188.183   <none>        443/TCP                      85s
    ingress-nginx   deployment.apps/ingress-nginx-controller   1/1     1            1           85s
    ingress-nginx   replicaset.apps/ingress-nginx-controller-5d48d5445f   1         1         1       85s
    ingress-nginx   job.batch/ingress-nginx-admission-create   1/1           10s        85s
    ingress-nginx   job.batch/ingress-nginx-admission-patch    1/1           9s         84s 
    ```
    
    </details>
      

6. What is the Host configured on the Ingress Resource?

    ```bash
    controlplane ~ ➜  k get ing -A
    NAMESPACE   NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
    app-space   ingress-wear-watch   <none>   *       10.99.14.178   80      4m20s 
    ```

    <details>
      <summary> Answer </summary>

    All Hosts (*)

    ```bash
    controlplane ~ ➜  k api-resources | grep -i ingress
    ingressclasses                                 networking.k8s.io/v1                   false        IngressClass
    ingresses                         ing          networking.k8s.io/v1                   true         Ingress

    controlplane ~ ➜  k get ing -A
    NAMESPACE   NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
    app-space   ingress-wear-watch   <none>   *       10.103.62.71   80      4m12s

    controlplane ~ ➜  k describe -n app-space ingress ingress-wear-watch 
    Name:             ingress-wear-watch
    Labels:           <none>
    Namespace:        app-space
    Address:          10.103.62.71
    Ingress Class:    <none>
    Default backend:  <default>
    Rules:
      Host        Path  Backends
      ----        ----  --------
      *           
                  /wear    wear-service:8080 (10.244.0.4:8080)
                  /watch   video-service:8080 (10.244.0.5:8080)
    Annotations:  nginx.ingress.kubernetes.io/rewrite-target: /
                  nginx.ingress.kubernetes.io/ssl-redirect: false
    Events:
      Type    Reason  Age                    From                      Message
      ----    ------  ----                   ----                      -------
      Normal  Sync    4m29s (x2 over 4m30s)  nginx-ingress-controller  Scheduled for sync 
    ```
    
    </details>
      

7. You are requested to change the URLs at which the applications are made available. Make the change in the given Ingress Controller.

    ```bash
    controlplane ~ ➜  k get ing -A
    NAMESPACE   NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
    app-space   ingress-wear-watch   <none>   *       10.103.62.71   80      7m48s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k edit -n app-space ingress ingress-wear-watch  
    ```
    ```bash
    # Please edit the object below. Lines beginning with a '#' will be ignored,
    # and an empty file will abort the edit. If an error occurs while saving this file will be
    # reopened with the relevant failures.
    #
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
        nginx.ingress.kubernetes.io/ssl-redirect: "false"
      creationTimestamp: "2023-12-31T04:54:24Z"
      generation: 1
      name: ingress-wear-watch
      namespace: app-space
      resourceVersion: "910"
      uid: 2e334919-c62f-4513-8400-e47ebf0eabf4
    spec:
      rules:
      - http:
          paths:
          - backend:
              service:
                name: wear-service
                port:
                  number: 8080
            path: /wear
            pathType: Prefix
          - backend:
              service:
                name: video-service
                port:
                  number: 8080
            path: /stream
            pathType: Prefix
    status:
      loadBalancer:
        ingress:
        - ip: 10.103.62.71 
    ```
 
    </details>
      


8. You are requested to add a new path to your ingress to make the food delivery application available to your customers.

    Make the new application available at /eat.

    ```bash
    controlplane ~ ➜  k get deploy -n app-space
    NAME              READY   UP-TO-DATE   AVAILABLE   AGE
    default-backend   1/1     1            1           10m
    webapp-food       1/1     1            1           13s
    webapp-video      1/1     1            1           10m
    webapp-wear       1/1     1            1           10m 

    controlplane ~ ➜  k get svc -n app-space 
    NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
    default-backend-service   ClusterIP   10.99.131.124   <none>        80/TCP     14m
    food-service              ClusterIP   10.109.123.30   <none>        8080/TCP   4m5s
    video-service             ClusterIP   10.98.228.143   <none>        8080/TCP   14m
    wear-service              ClusterIP   10.109.75.46    <none>        8080/TCP   14m

    controlplane ~ ➜  k get ing -A
    NAMESPACE   NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
    app-space   ingress-wear-watch   <none>   *       10.103.62.71   80      11m    
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k edit -n app-space ingress ingress-wear-watch  
    ```
    ```bash
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
        nginx.ingress.kubernetes.io/ssl-redirect: "false"
      creationTimestamp: "2023-12-31T04:54:24Z"
      generation: 3
      name: ingress-wear-watch
      namespace: app-space
      resourceVersion: "2107"
      uid: 2e334919-c62f-4513-8400-e47ebf0eabf4
    spec:
      rules:
      - http:
          paths:
          - backend:
              service:
                name: wear-service
                port:
                  number: 8080
            path: /wear
            pathType: Prefix
          - backend:
              service:
                name: video-service
                port:
                  number: 8080
            path: /stream
            pathType: Prefix
          - backend:
              service:
                name: food-service
                port:
                  number: 8080
            path: /eat
            pathType: Prefix 
    ```
    
    </details>
      

9. You are requested to make the new application **webapp-pay**  available at /pay.

    Identify and implement the best approach to making this application available on the ingress controller and test to make sure its working. Look into annotations: rewrite-target as well.

    ```bash
    controlplane ~ ➜  k get deploy -A
    NAMESPACE        NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
    app-space        default-backend            1/1     1            1           16m
    app-space        webapp-food                1/1     1            1           7m2s
    app-space        webapp-video               1/1     1            1           16m
    app-space        webapp-wear                1/1     1            1           16m
    critical-space   webapp-pay                 1/1     1            1           102s
    ingress-nginx    ingress-nginx-controller   1/1     1            1           16m
    kube-system      coredns                    2/2     2            2           20m 

    controlplane ~ ➜  k get svc -n critical-space 
    NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
    pay-service   ClusterIP   10.106.32.226   <none>        8282/TCP   2m13s

    controlplane ~ ➜  k get ing -A
    NAMESPACE   NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
    app-space   ingress-wear-watch   <none>   *       10.103.62.71   80      17m    
    ```

    <details>
      <summary> Answer </summary>

    Do not modify the existing ingress resource. Simply create a new one. 

    ```bash
    ## ingress-pay.yaml
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: minimal-ingress
      annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
    spec:
      ingressClassName: nginx-example
      rules:
      - http:
          paths:
          - path: /testpath
            pathType: Prefix
            backend:
              service:
                name: test
                port:
                  number: 80             
    ```
    ```bash
    controlplane ~ ➜  k apply -f ingress-pay.yaml 
    ingress.networking.k8s.io/pay-ingress created

    controlplane ~ ➜  k get ing -A
    NAMESPACE        NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
    app-space        ingress-wear-watch   <none>   *       10.103.62.71   80      25m
    critical-space   pay-ingress          <none>   *                      80      7s  
    ```
    
    </details>
      


10. Deploy an Ingress Controller. 

    - First, create a namespace called ingress-nginx.
    - The NGINX Ingress Controller requires a ConfigMap object. Create a ConfigMap object with name ingress-nginx-controller in the ingress-nginx namespace.
    - The NGINX Ingress Controller requires two ServiceAccounts. Create both ServiceAccount with name ingress-nginx and ingress-nginx-admission in the ingress-nginx namespace. Use the spec provided below.
      - Name: ingress-nginx
      - Name: ingress-nginx-admission
    - The roles, clusterroles, rolebindings, and clusterrolebindings have been created
    - Create the Ingress Controller using the /root/ingress-controller.yaml. There are several issues with it. Try to fix them.
    - Finally, create the ingress resource to make the applications available at /wear and /watch on the Ingress service. Also, make use of rewrite-target annotation field.
      - Path: /wear
      - Path: /watch


    <details>
      <summary> Answer </summary>

    ```bash
    controlplane ~ ➜  export do="--dry-run=client -o yaml"

    controlplane ~ ➜  export now="--force --grace-period=0" 
    ```

    ```bash
    controlplane ~ ➜  k create ns ingress-nginx
    namespace/ingress-nginx created

    controlplane ~ ➜  k get ns
    NAME              STATUS   AGE
    app-space         Active   67s
    default           Active   8m20s
    ingress-nginx     Active   2s
    kube-flannel      Active   8m14s
    kube-node-lease   Active   8m20s
    kube-public       Active   8m20s
    kube-system       Active   8m20s
    
    ```

    Create the ConfigMap.
    ```bash
    controlplane ~ ➜  k create configmap ingress-nginx-controller --namespace ingress-nginx $do
    apiVersion: v1
    kind: ConfigMap
    metadata:
      creationTimestamp: null
      name: ingress-nginx-controller
      namespace: ingress-nginx 

    controlplane ~ ➜  k create configmap ingress-nginx-controller --namespace ingress-nginx $do > cm-ingress-nginx-controller.yml

    controlplane ~ ➜  k create configmap ingress-nginx-controller --namespace ingress-nginx
    configmap/ingress-nginx-controller created

    controlplane ~ ➜  k get cm -n ingress-nginx 
    NAME                       DATA   AGE
    ingress-nginx-controller   0      53s
    kube-root-ca.crt           1      3m18s
    ```

    Next, create the service accounts. 

    ```bash
    controlplane ~ ➜  k create sa ingress-nginx-admission --namespace ingress-nginx $do
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      creationTimestamp: null
      name: ingress-nginx-admission
      namespace: ingress-nginx

    controlplane ~ ➜  k create sa ingress-nginx-admission --namespace ingress-nginx $do > sa-ingress-nginx-admission.yml

    controlplane ~ ➜  k create sa ingress-nginx --namespace ingress-nginx
    serviceaccount/ingress-nginx created

    controlplane ~ ➜  k create sa ingress-nginx-admission --namespace ingress-nginx
    serviceaccount/ingress-nginx-admission created

    controlplane ~ ➜  k get sa -n ingress-nginx 
    NAME                      SECRETS   AGE
    default                   0         8m53s
    ingress-nginx             0         67s
    ingress-nginx-admission   0         14s
    ```

    Fix the ingress-controller.yaml and apply afterwards.

    ```yaml
    ## ingress-controller.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      labels:
        app.kubernetes.io/component: controller
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/managed-by: Helm
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
        app.kubernetes.io/version: 1.1.2
        helm.sh/chart: ingress-nginx-4.0.18
      name: ingress-nginx-controller
      namespace: ingress-nginx
    spec:
      minReadySeconds: 0
      revisionHistoryLimit: 10
      selector:
        matchLabels:
          app.kubernetes.io/component: controller
          app.kubernetes.io/instance: ingress-nginx
          app.kubernetes.io/name: ingress-nginx
      template:
        metadata:
          labels:
            app.kubernetes.io/component: controller
            app.kubernetes.io/instance: ingress-nginx
            app.kubernetes.io/name: ingress-nginx
        spec:
          containers:
          - args:
            - /nginx-ingress-controller
            - --publish-service=$(POD_NAMESPACE)/ingress-nginx-controller
            - --election-id=ingress-controller-leader
            - --watch-ingress-without-class=true
            - --default-backend-service=app-space/default-http-backend
            - --controller-class=k8s.io/ingress-nginx
            - --ingress-class=nginx
            - --configmap=$(POD_NAMESPACE)/ingress-nginx-controller
            - --validating-webhook=:8443
            - --validating-webhook-certificate=/usr/local/certificates/cert
            - --validating-webhook-key=/usr/local/certificates/key
            env:
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: LD_PRELOAD
              value: /usr/local/lib/libmimalloc.so
            image: registry.k8s.io/ingress-nginx/controller:v1.1.2@sha256:28b11ce69e57843de44e3db6413e98d09de0f6688e33d4bd384002a44f78405c
            imagePullPolicy: IfNotPresent
            lifecycle:
              preStop:
                exec:
                  command:
                  - /wait-shutdown
            livenessProbe:
              failureThreshold: 5
              httpGet:
                path: /healthz
                port: 10254
                scheme: HTTP
              initialDelaySeconds: 10
              periodSeconds: 10
              successThreshold: 1
              timeoutSeconds: 1
            name: controller
            ports:
            - name: http
              containerPort: 80
              protocol: TCP
            - containerPort: 443
              name: https
              protocol: TCP
            - containerPort: 8443
              name: webhook
              protocol: TCP
            readinessProbe:
              failureThreshold: 3
              httpGet:
                path: /healthz
                port: 10254
                scheme: HTTP
              initialDelaySeconds: 10
              periodSeconds: 10
              successThreshold: 1
              timeoutSeconds: 1
            resources:
              requests:
                cpu: 100m
                memory: 90Mi
            securityContext:
              allowPrivilegeEscalation: true
              capabilities:
                add:
                - NET_BIND_SERVICE
                drop:
                - ALL
              runAsUser: 101
            volumeMounts:
            - mountPath: /usr/local/certificates/
              name: webhook-cert
              readOnly: true
          dnsPolicy: ClusterFirst
          nodeSelector:
            kubernetes.io/os: linux
          serviceAccountName: ingress-nginx
          terminationGracePeriodSeconds: 300
          volumes:
          - name: webhook-cert
            secret:
              secretName: ingress-nginx-admission

    ---
    apiVersion: v1
    kind: Service
    metadata:
      creationTimestamp: null
      labels:
        app.kubernetes.io/component: controller
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/managed-by: Helm
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
        app.kubernetes.io/version: 1.1.2
        helm.sh/chart: ingress-nginx-4.0.18
      name: ingress-nginx-controller
      namespace: ingress-nginx
    spec:
      ports:
      - port: 80
        protocol: TCP
        targetPort: 80
        nodePort: 30080
      selector:
        app.kubernetes.io/component: controller
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/name: ingress-nginx
      type: NodePort 
    ```
    ```bash
    controlplane ~ ➜  k get -n ingress-nginx po
    NAME                                       READY   STATUS      RESTARTS   AGE
    ingress-nginx-admission-create-wtzf6       0/1     Completed   0          7m32s
    ingress-nginx-controller-cc9f46d74-fmc65   0/1     Running     0          13s

    controlplane ~ ➜  k get -n ingress-nginx svc
    NAME                                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
    ingress-nginx-controller             NodePort    10.104.168.175   <none>        80:30080/TCP   18s
    ingress-nginx-controller-admission   ClusterIP   10.105.49.126    <none>        443/TCP        7m37s 
    ```

    Next, create the ingress resource. 
    But first, get the services in the app-space namespace.

    ```bash
    controlplane ~ ➜  k get svc -n app-space
    NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
    default-http-backend   ClusterIP   10.104.25.24    <none>        80/TCP     29m
    video-service          ClusterIP   10.97.188.119   <none>        8080/TCP   29m
    wear-service           ClusterIP   10.98.183.145   <none>        8080/TCP   29m 
    ```

    ```yaml
    ## ingress-resource.yaml 
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: app-ingress
      namespace: app-space
      annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
    spec:
      ingressClassName: nginx-example
      rules:
      - http:
          paths:
          - path: /wear
            pathType: Prefix
            backend:
              service:
                name: wear-service
                port:
                  number: 8080
          - path: /watch
            pathType: Prefix
            backend:
              service:
                name: video-service
                port:
                  number: 8080
    ```
    ```bash
    controlplane ~ ➜  k apply -f ingress-resource.yaml 
    ingress.networking.k8s.io/app-ingress created

    controlplane ~ ➜  k get ing -n app-space
    NAME          CLASS           HOSTS   ADDRESS   PORTS   AGE
    app-ingress   nginx-example   *                 80      12s 
    ```
    </details>
      




   


