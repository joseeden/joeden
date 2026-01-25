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
sidebar_position: 12
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

41. What secret type must we choose for docker registry?

    <details>
      <summary> Answer </summary>
    
    ```bash
    root@controlplane ~ ➜  k create secret --help | grep docker
    docker-registry   Create a secret for use with a Docker registry
    ```
    
    </details>
      



42. Update the image of the deployment to use a new image from myprivateregistry.com:5000

    ```bash
    root@controlplane ~ ➜  k get deployments.apps 
    NAME   READY   UP-TO-DATE   AVAILABLE   AGE
    web    2/2     2            2           104s 
    ```

    <details>
      <summary> Answer </summary>
    
    We simply need to append at the beginning of the image. 

    ```bash
    k edit deployments.apps  
    ```
    
    ```bash
        spec:
        containers:
        - image: myprivateregistry.com:5000/nginx:alpine 
    ```
    
    </details>
      



43. Create a secret object with the credentials required to access the registry.

    - Name: private-reg-cred
    - Username: dock_user
    - Password: dock_password
    - Server: myprivateregistry.com:5000
    - Email: dock_user@myprivateregistry.com

    Secret Type: docker-registry

    <details>
      <summary> Answer </summary>

    Based on: https://kubernetes.io/docs/concepts/configuration/secret/

    ```bash
    kubectl create secret docker-registry private-reg-cred \
    --docker-email=dock_user@myprivateregistry.com \
    --docker-username=dock_user \
    --docker-password=dock_password \
    --docker-server=myprivateregistry.com:5000
    ```
    ```bash
    root@controlplane ~ ➜  kubectl create secret docker-registry private-reg-cred \
    >   --docker-email=dock_user@myprivateregistry.com \
    >   --docker-username=dock_user \
    >   --docker-password=dock_password \
    >   --docker-server=myprivateregistry.com:5000
    secret/private-reg-cred created

    root@controlplane ~ ➜  k get secrets 
    NAME               TYPE                             DATA   AGE
    private-reg-cred   kubernetes.io/dockerconfigjson   1      8s

    root@controlplane ~ ➜  k describe secrets  private-reg-cred 
    Name:         private-reg-cred
    Namespace:    default
    Labels:       <none>
    Annotations:  <none>

    Type:  kubernetes.io/dockerconfigjson

    Data
    ====
    .dockerconfigjson:  176 bytes 
    ```

    When we try to generate the YAML file, we can see that the data is hidden.

    ```bash
    root@controlplane ~ ➜  k get secrets private-reg-cred -o yaml
    apiVersion: v1
    data:
      .dockerconfigjson: eyJhdXRocyI6eyJteXByaXZhdGVyZWdpc3RyeS5jb206NTAwMCI6eyJ1c2VybmFtZSI6ImRvY2tfdXNlciIsInBhc3N3b3JkIjoiZG9ja19wYXNzd29yZCIsImVtYWlsIjoiZG9ja191c2VyQG15cHJpdmF0ZXJlZ2lzdHJ5LmNvbSIsImF1dGgiOiJaRzlqYTE5MWMyVnlPbVJ2WTJ0ZmNHRnpjM2R2Y21RPSJ9fX0=
    kind: Secret
    metadata:
      creationTimestamp: "2023-12-30T17:26:54Z"
      name: private-reg-cred
      namespace: default
      resourceVersion: "2092"
      uid: 7bd9c254-9f9e-425a-b7f2-589c85f5df0a
    type: kubernetes.io/dockerconfigjson 
    ```

    </details>
      



44. Configure the deployment to use credentials from the new secret to pull images from the private registry

    ```bash
    root@controlplane ~ ➜  k get secrets 
    NAME               TYPE                             DATA   AGE
    private-reg-cred   kubernetes.io/dockerconfigjson   1      2m40s

    root@controlplane ~ ➜  k get deployments.apps 
    NAME   READY   UP-TO-DATE   AVAILABLE   AGE
    web    2/2     1            2           13m 
    ```

    <details>
      <summary> Answer </summary>

    ```bash
    root@controlplane ~ ➜  k get deployments.apps web -o yaml > web.yaml

    root@controlplane ~ ➜  k delete -f web.yaml 
    deployment.apps "web" deleted

    root@controlplane ~ ➜  k get deployments.apps 
    No resources found in default namespace. 
    ```

    Modify the YAML file. 
    Follow: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/

    ```bash
        spec:
        containers:
        - image: myprivateregistry.com:5000/nginx:alpine
            imagePullPolicy: IfNotPresent
            name: nginx
            resources: {}
            terminationMessagePath: /dev/termination-log
            terminationMessagePolicy: File
        imagePullSecrets:
            - name: private-reg-cred
    ```
    
    ```bash
    root@controlplane ~ ➜  k apply -f web.yaml 
    deployment.apps/web created

    root@controlplane ~ ➜  k get deployments.apps 
    NAME   READY   UP-TO-DATE   AVAILABLE   AGE
    web    2/2     2            2           3s 
    ```
    
    </details>
      



45. What is the user used to execute the sleep process within the ubuntu-sleeper pod?

    ```bash
    controlplane ~ ➜  k get po
    NAME             READY   STATUS    RESTARTS   AGE
    ubuntu-sleeper   1/1     Running   0          76s 
    ```

    <details>
      <summary> Answer </summary>

    Enter the pod and run whoami.

    ```bash
    controlplane ~ ➜  k exec -it ubuntu-sleeper -- whoami
    root
    ```
    
    </details>
      



46. Edit the pod ubuntu-sleeper to run the sleep process with user ID 1010.

    ```bash
    controlplane ~ ➜  k get po
    NAME             READY   STATUS    RESTARTS   AGE
    ubuntu-sleeper   1/1     Running   0          76s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po ubuntu-sleeper -o yaml > ubuntu-sleeper.yaml

    controlplane ~ ✦ ➜  k delete po ubuntu-sleeper $now
    Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
    pod "ubuntu-sleeper" force deleted

    controlplane ~ ✦ ✖ k get po
    No resources found in default namespace.
    ```
    
    ```bash
    ## ubuntu-sleeper.yaml 
    apiVersion: v1
    kind: Pod
    metadata:
      creationTimestamp: "2023-12-30T17:40:14Z"
      name: ubuntu-sleeper
      namespace: default
      resourceVersion: "814"
      uid: f866a186-25d6-45f3-9fb8-f8e37cf91c38
    spec:
      securityContext:
        runAsUser: 1010
      containers:
      - command:
        - sleep
        - "4800"
        image: ubuntu
        imagePullPolicy: Always
        name: ubuntu 
    ```
    
    ```bash
    controlplane ~ ➜  k apply -f ubuntu-sleeper.yaml 
    pod/ubuntu-sleeper created

    controlplane ~ ➜  k get po
    NAME             READY   STATUS    RESTARTS   AGE
    ubuntu-sleeper   1/1     Running   0          3s

    controlplane ~ ➜  k exec -it ubuntu-sleeper -- whoami
    whoami: cannot find name for user ID 1010
    command terminated with exit code 1
    ```
    
    </details>
      



47. Update pod ubuntu-sleeper to run as Root user and with the SYS_TIME capability.

    ```bash
    controlplane ~ ➜  k get po
    NAME             READY   STATUS    RESTARTS   AGE
    ubuntu-sleeper   1/1     Running   0          2m48s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k get po ubuntu-sleeper -o yaml > ubuntu-sleeper.yaml

    controlplane ~ ➜  k delete po ubuntu-sleeper $now
    Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
    pod "ubuntu-sleeper" force deleted

    controlplane ~ ➜  k get po
    No resources found in default namespace.
    ```
    
    ```bash
    ## ubuntu-sleeper.yaml 
    ---
    apiVersion: v1
    kind: Pod
    metadata:
      name: ubuntu-sleeper
      namespace: default
    spec:
      containers:
      - command:
        - sleep
        - "4800"
        image: ubuntu
        name: ubuntu-sleeper
        securityContext:
          capabilities:
            add: ["SYS_TIME"]
    ```
    
    ```bash
    controlplane ~ ➜  k apply -f ubuntu-sleeper.yaml 
    pod/ubuntu-sleeper created

    controlplane ~ ➜  k get po
    NAME             READY   STATUS    RESTARTS   AGE
    ubuntu-sleeper   1/1     Running   0          6s 

    controlplane ~ ➜  k exec -it ubuntu-sleeper -- whoami
    root
    ```

    </details>
      



48. How many network policies do you see in the environment?

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k api-resources | grep -i network
    ingressclasses                                 networking.k8s.io/v1                   false        IngressClass
    ingresses                         ing          networking.k8s.io/v1                   true         Ingress
    networkpolicies                   netpol       networking.k8s.io/v1                   true         NetworkPolicy

    controlplane ~ ➜  k get netpol
    NAME             POD-SELECTOR   AGE
    payroll-policy   name=payroll   37s 
    ```
    
    </details>
      


49. Which pod is the Network Policy applied on?

    ```bash
    controlplane ~ ➜  k get netpol
    NAME             POD-SELECTOR   AGE
    payroll-policy   name=payroll   37s 
    ```

    <details>
      <summary> Answer </summary>
    
    ```bash
    controlplane ~ ➜  k describe networkpolicies.networking.k8s.io payroll-policy 
    Name:         payroll-policy
    Namespace:    default
    Created on:   2023-12-30 13:01:40 -0500 EST
    Labels:       <none>
    Annotations:  <none>
    Spec:
    PodSelector:     name=payroll
    Allowing ingress traffic:
        To Port: 8080/TCP
        From:
        PodSelector: name=internal
    Not affecting egress traffic
    Policy Types: Ingress
    
    ```
    
    </details>
      


49. Create a network policy to allow traffic from the Internal application only to the payroll-service and db-service. Use the spec given below. You might want to enable ingress traffic to the pod to test your rules in the UI.

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
      


     
