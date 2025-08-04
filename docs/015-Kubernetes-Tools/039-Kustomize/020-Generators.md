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


## Before Generators 

Sometimes in Kubernetes, even if you update a ConfigMap or Secret, your app won't see the change unless you manually restart it. This sections shows a simple example of that issue.

- Set up a ConfigMap with a password
- Reference the password in a deployment as an environment variable
- Update the password later and notice the deployment does not restart

### Sample Setup Using ConfigMap

Go to the section directory inside the repo:

```bash
cd labs-kustomize/code-samples/05-before-generators 
```

You will see manifests for a deployment and ConfigMap:

- **configmap.yaml**

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: db-credentials
    data:
      password: password1
    ```

- **deployment.yaml**

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

We use `DB_PASSWORD` to read the `password` key from the `db-credentials` ConfigMap.

:::

<!-- The app gets the value as an environment variable, but it won't get updated if the ConfigMap value changes later. -->

Create a namespace:

```bash
kubectl create ns test-labs-1 
```

Apply the changes:

```bash
kubectl apply -f . -n test-labs-1 
```

Confirm the resources are created:

```bash
$ kubectl get all -n test-labs-1 

NAME                                    READY   STATUS    RESTARTS   AGE
pod/nginx-deployment-6cc58477b8-blz8d   1/1     Running   0          101s     

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE       
deployment.apps/nginx-deployment   1/1     1            1           101s      

NAME                                          DESIRED   CURRENT   READY   AGE 
replicaset.apps/nginx-deployment-6cc58477b8   1         1         1       101s
```

### Verify the Environment Variable

You can check if the environment variable is correctly set:

```bash
kubectl exec nginx-deployment-6cc58477b8-blz8d -n test-labs-1  -- printenv | grep DB
```

Expected output:

```
DB_PASSWORD=password1
```

This shows the app is reading from the ConfigMap correctly the first time.

### What Happens When You Update the ConfigMap

In the `configmap.yaml`, change the password from `password1` to `password2`.

```yaml
data:
  password: password2
```

Then apply the change:

```bash
kubectl apply -f configmap.yaml
```

Expected output:

```
configmap/db-credentials configured
```

Now check the deployment again:

```bash
kubectl get pods
kubectl exec <pod-name> -n test-labs-1 -- printenv | grep DB
```

You still get:

```
DB_PASSWORD=password1
```

Even though the ConfigMap has `password2`, the pod still shows `password1`. This is because the pod wasn't restarted.

This shows the problem: ConfigMap changes don’t trigger a pod restart automatically.

### Manually Restarting the Deployment

You can manually restart the deployment like this:

```bash
kubectl rollout restart deployment nginx-deployment
```

Then check the new pod:

```bash
kubectl get pods
kubectl exec <new-pod-name> -- printenv | grep DB
```

Expected output:

```
DB_PASSWORD=password2
```

After the restart, the new pod picks up the updated password. This confirms that pod restarts are required to reflect ConfigMap or Secret updates.

This issue is why tools like **config generators** exist - to help automate restarts when configuration changes.


## Enter Generators 

Generators are used to create new Kubernetes resources automatically.

- Used to create config maps and secrets
- Can be written inline or defined in a YAML file
- Support advanced settings like behavior and naming

Generators help you generate multiple resources easily without creating each file manually.


:::info 

You will need a Kubernetes cluster to try out the examples.

To setup a basic cluster, you can use [k3d](/docs/015-Containerization/020-Kubernetes/011-Setting-Up-Kubernetes-using-k3d.md).

:::


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


## Common Generators

Kustomize mainly uses two types of generators:

- **ConfigMapGenerator** creates one or more ConfigMaps
- **SecretGenerator** creates Kubernetes Secrets

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

This will create a ConfigMap named `app-config` with values from both file and literal inputs.

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
    behavior: merge
    files:   
  - name: dev-config
    behavior: merge
    literals:  
```
 
To learn more, please see [ConfigMap Generators.](#configmap-generators) 

## Defining Generators/Transformers

Generators are defined just like transformers. You can set them up in a few simple ways:

- Use a separate configuration file  
- Write them as inline YAML  
- Use convenience fields provided by Kustomize

:::info 

You can use all three of these methods when setting up generators too.

::: 

For more information, please see [Defining Transformers/Generators.](/docs/015-Kubernetes-Tools/039-Kustomize/016-Transformers.md#defining-transformersgenerators)



## ConfigMap Generators



## Secret Generators

Secrets are generated similarly, but values must be base64 encoded:

```yaml
secretGenerator:
  - name: app-secret
    type: Opaque
    files:
      - username.txt
      - password.txt
```

Where: 

- `type` is optional but recommended (default is Opaque)
- Values from files become keys inside the secret


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
