---
title: "Generators"
description: "Generators"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Kustomize
sidebar_position: 20
last_update:
  date: 4/19/2022
---


## Clone the Repository  

To try out the examples in the succeeding sections, clone the project repository from GitHub. 

- Github repo: [joseeden/labs-kustomize](https://github.com/joseeden/labs-kustomize/tree/master)

Clone the repository:

```bash
git clone https://github.com/joseeden/labs-kustomize.git 
```

<!-- Project directory structure:

```bash

``` -->

:::info 

You will need a Kubernetes cluster to try out the examples.

To setup a basic cluster, you can use [k3d](/docs/040-Containerization/020-Kubernetes/011-Setting-Up-Kubernetes-using-k3d.md).

:::



## Before Generators 

In Kubernetes, updating a ConfigMap or Secret won’t automatically update a running pod. 

To test it out, we'll set up a simple deployment that uses a ConfigMap for a database password. Later, we'll update the ConfigMap and see that the app doesn't reflect the change unless we manually restart it.

Start by navigating to the directory:

```bash
cd labs-kustomize/code-samples/05-before-generators 
```

You'll find two manifest files:

- **configmap.yaml** defines a ConfigMap with a password:

  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: db-credentials
  data:
    password: password1
  ```

- **deployment.yaml** references that ConfigMap as an environment variable:

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: nginx-deployment
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: nginx
    template:
      metadata:
        labels:
          app: nginx
      spec:
        containers:
        - name: nginx
          image: nginx
          env:
          - name: DB_PASSWORD
            valueFrom:
              configMapKeyRef:
                name: db-credentials
                key: password
  ```


:::info 

The container reads `DB_PASSWORD` from the ConfigMap, but this value won't automatically change if the ConfigMap is updated later.

:::

Apply the manifests:

```bash
kubectl apply -f .
```

Verify that everything is running:

```bash
kubectl get all
```


Output: 

```bash
NAME                                    READY   STATUS    RESTARTS   AGE
pod/nginx-deployment-6cc58477b8-blz8d   1/1     Running   0          101s     

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE       
deployment.apps/nginx-deployment   1/1     1            1           101s      

NAME                                          DESIRED   CURRENT   READY   AGE 
replicaset.apps/nginx-deployment-6cc58477b8   1         1         1       101s
```

You should see a running pod under the `nginx-deployment`. Now check that the environment variable was picked up correctly:

```bash
kubectl exec nginx-deployment-6cc58477b8-blz8d -- printenv | grep DB
```

You’ll get:

```
DB_PASSWORD=password1
```

Now, simulate a password update. Edit `configmap.yaml` to change the password to:

```yaml
data:
  password: password2
```

Apply the change:

```bash
kubectl apply -f configmap.yaml
```

Notice that the pod is still the same pod seen previously:

```bash
kubectl get pods
```

Output: 

```bash
NAME                                    READY   STATUS    RESTARTS   AGE
nginx-deployment-6cc58477b8-blz8d       1/1     Running   0          101s     
```

Check the pod again:

```bash
kubectl exec nginx-deployment-6cc58477b8-blz8d -- printenv | grep DB
```

You’ll still see:

```
DB_PASSWORD=password1
```

Even though the ConfigMap has changed, the running pod still uses the old value. That’s because Kubernetes doesn't restart pods when a referenced ConfigMap or Secret changes.

To see the update take effect, manually restart the deployment:

```bash
kubectl rollout restart deployment nginx-deployment
```

A new pod should now replace the old NGINX pod:

```bash
kubectl get pods
```

Output: 

```bash
NAME                                    READY   STATUS    RESTARTS   AGE
nginx-deployment-6cc58477b8-mblwh   1/1     Running   0          101s     
```

Then re-check the new pod:

```bash
kubectl exec nginx-deployment-6cc58477b8-mblwh -- printenv | grep DB
```

This time you’ll see:

```
DB_PASSWORD=password2
```

This example shows a core problem: 

> ConfigMap updates do not trigger pod restarts automatically.

This is where Kustomize generators come in. They help automate restarts by generating new resource names whenever content changes.


## Enter Generators 

Generators are used to create new Kubernetes resources automatically.

- Used to create config maps and secrets
- Can be written inline or defined in a YAML file
- Support advanced settings like behavior and naming

Kustomize mainly uses two types of generators:

- **ConfigMapGenerator** creates one or more ConfigMaps
- **SecretGenerator** creates Kubernetes Secrets

## Defining Generators/Transformers

Generators are defined just like transformers. You can set them up in a few simple ways:

- Use a separate configuration file  
- Write them as inline YAML  
- Use convenience fields provided by Kustomize

:::info 

You can use all three of these methods when setting up generators too.

::: 

For more information, please see [Defining Transformers/Generators.](/docs/043-Kubernetes-Tools/039-Kustomize/016-Transformers.md#defining-transformersgenerators)


## Common Generators

### ConfigMap Generators

ConfigMap generators help automate config updates by generating unique names. This ensures Kubernetes detects changes and restarts pods automatically.

- Generator name stays the same, but output name gets a random suffix
- Any change in values or files creates a new ConfigMap
- New ConfigMap name is used in the deployment automatically
- Pods are redeployed without running `kubectl rollout restart`

Here’s a simple config map generator:

```yaml
configMapGenerator:
  - name: app-config
    behavior: create
    files:
      - app.properties
    literals:
      - mode=dev
```

This will create a ConfigMap named app-config with values from both file and literal inputs.

- `name` sets the name of the generated config map
- `behavior` defines how to treat existing config maps
- `files` and `literals` allow data to come from files or inline

You can also generate multiple ConfigMaps:

```yaml
configMapGenerator:
  - name: app-config
    behavior: create
    files:
      - app.properties
    literals:
      - mode=dev
  - name: test-config
    behavior: create
    files:   
  - name: dev-config
    behavior: create
    literals:  
```

To see it in action, please see the [labs](#labs) section below.

### Secret Generators

Secrets are generated similarly, but values must be base64 encoded:

```yaml
secretGenerator:
  - name: app-secret
    literals:
      - token=abcd1234
```

Running `kustomize build .` will produce something like:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret-hg8f9234
data:
  token: YWJjZDEyMzQ=  # base64 encoded
```

Whether you're using literals or files, any change triggers a new name and automatic deployment update. This ensures your pods always pick up the latest configs or secrets without needing extra commands.

To see it in action, please see the [labs](#labs) section below.


## Behavior Field

The `behavior` field controls what happens if the config map already exists.

- `create` makes a new one
- `merge` adds new values to existing
- `replace` fully replaces any existing version

Use this to manage how your customizations affect the base configuration.

## Generator Options

You can use `generatorOptions` in your `kustomization.yaml` to control generator behavior globally.

```yaml
generatorOptions:
  disableNameSuffixHash: true
  labels:
    env: dev
  annotations:
    owner: ops-team
```

This will: 

- Disables random suffix added to generated resources
- Applies the same labels and annotations to all generated items

These settings help ensure consistent metadata and stable resource names.


## Labs 

### Lab 1: Simple ConfigMap 

To try it out, go to the appropriate lab directory inside the repo:

```bash
cd labs-kustomize/code-sample/06-generators-configmaps/lab_01_simple_configmap
```

We have a generator defined in the `kustomization.yaml`:

```yaml
namespace: test-labs-1

configMapGenerator:
  - name: db-cred
    literals:
      - password=secret123
```

Before anything else, create the namespace first:

```bash
kubectl create ns test-labs-1
```

Then run:

```bash
kustomize build .
```

The output will look like:

```yaml
apiVersion: v1
kind: ConfigMap
data:
  password: secret123
metadata:
  name: db-cred-h9286b2f78
  namespace: test-labs-1
```

Notice the `h9286b2f78` part is randomly generated.

After applying the config:

```bash
kubectl apply -k .
```

You can confirm the ConfigMap was created with the random suffix:

```bash
kubectl get cm -n test-labs-2 
```

Example output:

```bash
NAME                 DATA   AGE
db-cred-h9286b2f78   1      44s
kube-root-ca.crt     1      4m8s 
```

If you change the value in the generator (`kustomization.yaml`), a new ConfigMap is created with a different name, and Kustomize automatically updates the deployment to reference the new ConfigMap. This triggers a pod restart without any manual intervention.

Update the password in the `kustomization.yaml`:

```yaml
namespace: test-labs-2

configMapGenerator:
  - name: db-cred
    literals:
      - password=secret123456789
```

Then re-apply:

```bash
kubectl apply -k .
```

When you check the resources again, you will now see two ConfigMaps created, each with a different randomly generated hash suffix:

```bash
kubectl get cm -n test-labs-2 
```

Example output:

```bash
NAME                 DATA   AGE
db-cred-h9286b2f78   1      3m
db-cred-ttcgtm58fb   1      2s
kube-root-ca.crt     1      6m24s
```


### Lab 2: ConfigMap from a File

This lab shows how to generate a ConfigMap from a file using Kustomize.

Change to the lab directory:

```bash
cd labs-kustomize/code-sample/06-generators-configmaps/lab_02_configmap_from_file
```

Inside this directory, we have the following files:

<details>
  <summary> ***kustomization.yaml** </summary>

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: test-labs-2

commonLabels:
  version: lec-12
  
namePrefix: lec-12-

configMapGenerator:
  - name: nginx-config
    files:
      - nginx.conf

resources:
- nginx-deployment.yml
```

</details>

<details>
  <summary> **nginx.conf** </summary>
 
```bash
events {
  worker_connections  1024;
}

http {
    server {
        listen 80;
        listen [::]:80;
        
        server_name localhost;

        root /usr/share/nginx/html;

        location ~ \.(gif|jpg|png)$ {
            root /data/images;
        }

        location /google {
            proxy_pass http://www.google.com/search;
        }

        location / {
          try_files $uri $uri/ =404;
        }
    }
}
```

</details>

<details>
  <summary> **nginx-deployment.yml** </summary>
 
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: test-labs-2
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.23.3-alpine-slim
        ports:
        - containerPort: 80
        
        volumeMounts:
        - mountPath: /etc/nginx/nginx.conf
          name: nginx-config
          subPath: nginx.conf

      volumes:
      - name: nginx-config
        configMap:
          name: nginx-config
          items:
          - key: nginx.conf
            path: nginx.conf 
```

</details>



The generator creates a ConfigMap where the filename is the key, and the content is the value.

Create the namespace first:

```bash
kubectl create ns test-labs-2
```

Apply the changes:

```bash
kubectl apply -k . 
```

Verify the deployment:

```bash
$ kubectl get all -n test-labs-2

NAME                                    READY   STATUS    RESTARTS   AGE
pod/nginx-deployment-8667b86845-2dq2z   1/1     Running   0          59s

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-deployment   1/1     1            1           59s

NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-deployment-8667b86845   1         1         1       59s
```

Check that the ConfigMap was created:

```bash
$ kubectl get cm -n test-labs-2 

NAME                      DATA   AGE
kube-root-ca.crt          1      20m
nginx-config-48gchkg456   1      5s
```

You can also verify the contents of the ConfigMap by running the `describe` command:

```bash
kubectl describe cm nginx-config-48gchkg456 -n test-labs-2
```

:::info

Just like with ConfigMaps, you can generate Secrets using `secretGenerator`. It works the same way, but values are base64-encoded and a random suffix is also added.

:::


To verify that the configuration actually work, we can do port-fowarding:

```bash
kubectl port-forward -n test-labs-2 deploy/nginx-deployment 31000:80
```

It should return:

```bash
Forwarding from 127.0.0.1:31000 -> 80
Forwarding from [::1]:31000 -> 80
```

Open a browser and navigate to `http://localhost:31000/`:

![](/img/docs/08042025-sample-nginx.PNG)


### Lab 3: ConfigMap with File and Literal

We can also create a ConfigMap using a mix of file and literal values.

Change to the lab directory:

```bash
cd labs-kustomize/code-sample/06-generators-configmaps/lab_03_configmap_from_file_and_literal
```

Inside the directory:

- **kustomization.yaml**

    ```yaml
    namespace: test-labs-3

    configMapGenerator:
      - name: app-config
        behavior: create
        files:
          - app.properties
        literals:
          - mode=dev
    ```

- **app.properties**

    ```bash
    host=example.com
    port=8080
    ```

Create the namespace:

```bash
kubectl create ns test-labs-3
```

Apply the configuration:

```bash
kubectl apply -k .
```

Check the ConfigMap:

```bash
kubectl get cm -n test-labs-3
```

You’ll see a name like this, with a hash suffix added automatically:

```bash
NAME                    DATA   AGE
app-config-h4mftk9kcc   2      3s
kube-root-ca.crt        1      14s
```

Verify that the ConfigMap used both the file and the literal:

```bash
kubectl describe cm app-config-h4mftk9kcc -n test-labs-3
```

Output:

```bash
Name:         app-config-h4mftk9kcc
Namespace:    test-labs-3
Labels:       <none>
Annotations:  <none>

Data
====
app.properties:
----
host=example.com
port=8080

mode:
----
dev


BinaryData
====

Events:  <none>
```


### Lab 4: Multiple ConfigMaps

You can define multiple ConfigMaps in the same `kustomization.yaml` by specifying multiple `configMapGenerator` entries.

Change to the lab directory:

```bash
cd labs-kustomize/code-sample/06-generators-configmaps/lab_04_multiple_configmaps
```

Inside this directory:

- **kustomization.yaml**

    ```yaml
    namespace: test-labs-4

    configMapGenerator:
      - name: app-config
        behavior: create
        files:
          - app.properties
        literals:
          - mode=dev
      - name: test-config
        behavior: create
        files:
          - test.properties
      - name: dev-config
        behavior: create
        literals:
          - version=1.0.2
    ```

- **app.properties**

    ```bash
    app.name=DemoApp
    app.port=8080
    ```

- **test.properties**

    ```bash
    app.name=TestApp
    app.port=8081
    ```

Create the namespace:

```bash
kubectl create ns test-labs-4
```

Apply the configuration:

```bash
kubectl apply -k .
```

Output:

```bash
configmap/app-config-m4th5528b9 created
configmap/dev-config-25f4tgthk6 created
configmap/test-config-97f24mmhb7 created
```

Check the generated ConfigMaps:

```bash
kubectl get cm -n test-labs-4
```

Output:

```bash
app-config-m4th5528b9    2      17s
dev-config-25f4tgthk6    1      17s
kube-root-ca.crt         1      4m4s
test-config-97f24mmhb7   1      17s 
```


### Lab 5: Using `merge` and `replace` 

This lab shows how to **modify existing ConfigMaps** using the `merge` and `replace` behaviors in `configMapGenerator` to update ConfigMaps created in [Lab 4](#lab-4-multiple-configmaps).

We’ll build on the following existing ConfigMaps in namespace `test-labs-4`:

- `test-config`
- `dev-config`

To verify:

```bash
$ kubectl get cm -n test-labs-4

NAME                     DATA   AGE
app-config-m4th5528b9    2      17s
dev-config-25f4tgthk6    1      17s
kube-root-ca.crt         1      4m4s
test-config-97f24mmhb7   1      17s 
```

Check the contents of the existing ConfigMaps:

```bash
$ kubectl describe -n test-labs-4 cm dev-config-25f4tgthk6

Name:         dev-config-25f4tgthk6
Namespace:    test-labs-4
Labels:       <none>
Annotations:  <none>

Data
====
version:
----
1.0.2
```

```bash
$ kubectl describe -n test-labs-4 cm test-config-97f24mmhb7

Name:         test-config-97f24mmhb7
Namespace:    test-labs-4
Labels:       <none>
Annotations:  <none>

Data
====
test.properties:
----
app.name=TestApp
app.port=8081
```

To proceed, change to the lab directory:

```bash
cd labs-kustomize/code-sample/06-generators-configmaps/lab_05_using_merge_and_replace
```

Inside this directory, we have the **kustomization.yaml**

```yaml
resources:
  - ../lab_04_multiple_configmaps

configMapGenerator:
  - name: test-config
    behavior: merge
    literals:
      - feature-x=true

  - name: dev-config
    behavior: replace
    literals:
      - version=2.0.0
      - debug=true
```

Note that we need to reference the previous directory as a base `resource` since it contains the original ConfigMap definitions we want to modify. By including it under `resources`, Kustomize first loads the existing configuration from that directory, and then applies the changes defined in the current overlay using the behavior fields (`merge` or `replace`).

Apply the configuration:

```bash
kubectl apply -k .
```

Verify the changes:

```bash
kubectl get cm -n test-labs-4
```

Notice that we now have two `dev-config` and `test-config`:

```bash
NAME                     DATA   AGE
app-config-m4th5528b9    2      25m
dev-config-25f4tgthk6    1      25m
dev-config-k9tg87d4dh    2      10s
kube-root-ca.crt         1      29m
test-config-97f24mmhb7   1      25m
test-config-dt8d8df48d   2      10s
```

Expected:

- `test-config` will retain previous keys and now include `feature-x=true` (merged).
- `dev-config` will **only** include `version=2.0.0` and `debug=true` (replaced).

Check the contents of the new ConfigMaps to verify:

```bash
$ kubectl describe cm -n test-labs-4 dev-config-k9tg87d4dh

Name:         dev-config-k9tg87d4dh
Namespace:    test-labs-4
Labels:       <none>
Annotations:  <none>

Data
====
debug:
----
true

version:
----
2.0.0
```

```bash 
$ kubectl describe cm -n test-labs-4 test-config-dt8d8df48d
Name:         test-config-dt8d8df48d
Namespace:    test-labs-4
Labels:       <none>
Annotations:  <none>

Data
====
feature-x:
----
true

test.properties:
----
app.name=TestApp
app.port=8081
```


### Lab 6: Using `disableNameSuffixHash`

There is an option to disable the automatic name hash suffix that Kustomize appends to configMap and secret resource names. This is useful in scenarios where you want predictable, fixed names for referencing these resources, such as when they are mounted into Pods or referenced by third-party tools.

Navigate to the lab directory inside the repo:

```bash
cd labs-kustomize/code-sample/06-generators-configmaps/lab_06_using_disablenamesuffixhash
```

Inside this directory:

```bash
├── base
│   ├── deployment.yml
│   ├── kustomization.yml
│   └── service.yml
├── kustomization.yml
└── mysql
    ├── deployment.yml
    ├── kustomization.yml
    ├── mysql-config.properties
    └── service.yml
```

The root `kustomization.yaml` file:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

commonLabels:
  version: test-labs-6

namePrefix: test-labs-6-

resources:
- mysql
- base
```

This references two subdirectories, `mysql` and `base`, which define the deployment and service configurations for MySQL and WordPress.

The ConfigMap generator is defined in the `mysql/kustomization.yaml` file:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: test-labs-6

configMapGenerator:
  - name: mysql-config
    envs:
      - mysql-config.properties

generatorOptions:
  disableNameSuffixHash: true
  labels:
    generated: "true"

resources:
- deployment.yml
- service.yml
```

The `configMapGenerator` then references the file `mysql-config.properties`:

```bash
MYSQL_ROOT_PASSWORD=admin
MYSQL_DATABASE=wordpress
```

Before applying the files, create the namespace:

```bash
kubectl create ns test-labs-6 
```

Then apply the full Kustomize config:

```bash
kubectl apply -k .
```

Output:

```bash
configmap/test-labs-6-mysql-config created
service/test-labs-6-mysql created
service/test-labs-6-wordpress created
deployment.apps/test-labs-6-mysql created
deployment.apps/test-labs-6-wordpress created
```

Verify the resources are created:

```bash
kubectl get all -n test-labs-6 
```

We should see the pods and services for both MySQL and WordPress:

```bash
NAME                                         READY   STATUS    RESTARTS   AGE
pod/test-labs-6-mysql-bbdfc966f-qzwsj        1/1     Running   0          87s
pod/test-labs-6-wordpress-7cc596ddd8-66cfn   1/1     Running   0          87s

NAME                            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/test-labs-6-mysql       ClusterIP   10.43.101.67   <none>        3306/TCP       87s
service/test-labs-6-wordpress   NodePort    10.43.50.233   <none>        80:30001/TCP   87s

NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/test-labs-6-mysql       1/1     1            1           87s
deployment.apps/test-labs-6-wordpress   1/1     1            1           87s

NAME                                               DESIRED   CURRENT   READY   AGE        
replicaset.apps/test-labs-6-mysql-bbdfc966f        1         1         1       87s        
replicaset.apps/test-labs-6-wordpress-7cc596ddd8   1         1         1       87s  
```

Check the ConfigMap:

```bash
kubectl get cm -n test-labs-6
```

Output:

```bash
NAME                       DATA   AGE
kube-root-ca.crt           1      29m
test-labs-6-mysql-config   2      2m34s
```

Verify the contents of the ConfigMap:

```bash
kubectl describe cm  test-labs-6-mysql-config -n test-labs-6
```

We can see both the database name and the root password:

```bash
Name:         test-labs-6-mysql-config
Namespace:    test-labs-6
Labels:       generated=true
              version=test-labs-6
Annotations:  <none>

Data
====
MYSQL_DATABASE:
----
wordpress

MYSQL_ROOT_PASSWORD:
----
admin 
```

We can also verify that the environment variables exist in the MySQL pod:

```bash
kubectl exec -n test-labs-6 <mysql-pod-name>  -- printenv | grep ^MYSQL
```

Output:

```bash
MYSQL_MAJOR=8.4
MYSQL_VERSION=8.4.6-1.el9
MYSQL_SHELL_VERSION=8.4.6-1.el9
MYSQL_DATABASE=wordpress
MYSQL_ROOT_PASSWORD=admin
```

#### Updating the ConfigMap 

Let's say we want to to add a MySQL credentials in the `mysql/mysql-config.properties`:

```bash
MYSQL_ROOT_PASSWORD=admin
MYSQL_DATABASE=wordpress
MYSQL_USER=wordpress
MYSQL_PASSWORD=wordpress 
```

Re-apply the changes:

```bash
kubectl apply -k . 
```

If you check the ConfigMaps again, you will see that it will not create another ConfigMap with a new hash. Instead, it will overwrite the existing one:

```bash
$ kubectl get cm -n test-labs-6

NAME                       DATA   AGE
kube-root-ca.crt           1      88m
test-labs-6-mysql-config   4      14s
```

Now, here's the **downside of using `disableNameSuffixHash`:**

> If you set `disableNameSuffixHash: true` in your `configMapGenerator`, Kustomize generates the ConfigMap with a fixed name that never changes, even if the content updates.
>
> Because the ConfigMap name stays the same, your Deployment’s pod spec does not change, so Kubernetes sees no change and won’t restart or recreate pods automatically.

You will need to manually trigger a rollout restart:

```bash
kubectl rollout restart deployment test-labs-6-mysql -n test-labs-6
```

Get the new MySQL pod:

```bash
kubectl get pods -n test-labs-6 
```

Then check the environment variables set in the pod:

```bash
kubectl exec -n test-labs-6 <mysql-pod-name> -- printenv | grep ^MYSQL
kubectl exec -n test-labs-6 test-labs-6-mysql-7d8c44cdf8-jkmjp  -- printenv | grep ^MYSQL
```

Output:

```bash
MYSQL_MAJOR=5.6
MYSQL_VERSION=5.6.51-1debian9
MYSQL_ROOT_PASSWORD=admin
MYSQL_USER=wordpress
MYSQL_DATABASE=wordpress
MYSQL_PASSWORD=wordpress
```


## Cleanup 

To remove the resources across all the created namespaces:

```bash
kubectl delete all --all -n test-lab-1
kubectl delete all --all -n test-lab-2
kubectl delete all --all -n test-lab-4
kubectl delete all --all -n test-lab-6
```

You can then delete the namespaces by repeating the `delete all` command multiple times, or you can also define the namespaces in this way:

```bash
kubectl delete ns test-lab-{1,2,3,4,6}
```

Output:

```bash
namespace "test-lab-1" deleted
namespace "test-lab-2" deleted
namespace "test-lab-3" deleted
namespace "test-lab-4" deleted
namespace "test-lab-6" deleted
```

Confirm that all the custom namespaces are deleted:

```bash
$ kubectl get ns

NAME              STATUS   AGE
default           Active   19h
kube-node-lease   Active   19h
kube-public       Active   19h
kube-system       Active   19h
```