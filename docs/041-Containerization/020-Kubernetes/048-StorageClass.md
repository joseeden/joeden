---
title: "Volumes and StorageClass"
description: "Volumes and StorageClass"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 48
last_update:
  date: 4/7/2022
---

## StorageClass

A **StorageClass** defines different types of storage available in a Kubernetes cluster, such as quality of service or backup policies. Administrators can create multiple StorageClass objects, each specifying:

- A volume provisioner (e.g., AWS EBS)
- Parameters for provisioning

This helps users select from different storage options without needing to understand the details of how storage is provisioned.

The name of a StorageClass must be a [valid DNS subdomain name](https://kubernetes.io/docs/concepts/overview/working-with-objects/names#dns-subdomain-names).


:::info[NOTE]

In Kubernetes 1.11, StorageClass is not created by default in EKS, so you need to create it manually.

:::


To check for a default StorageClass:

```bash
kubectl get sc -A
```

It should return something like:

```bash
NAME            PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
gp2 (default)   kubernetes.io/aws-ebs   Delete          WaitForFirstConsumer   false                  162m
```

## Creating a StorageClass 

Create a StorageClass by defining it in a YAML file:

```yaml title="gp2-sc.yml"
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: gp2
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  fsType: ext4  
reclaimPolicy: Retain
mountOptions:
  - debug
```

Apply it:

```bash
kubectl create -f gp2-sc.yml --namespace=<namespace>
```

To verify:

```bash
kubectl get storageclass
```

In the YAML file above, a **storageclass** resource is created and EBS is used as the persistent volume. The **reclaimPolicy** tells Kubernetes whether to retain or delete the EBS volume when the claim is deleted.

Verify that the storage class is now created and set as default.

```bash
kubectl get storageclass 
```

## Default StorageClass

Older versions of Kubernetes deploy your cluster without a default Storageclass. For newer versions, the default StorageClass is used to dynamically provision storage for PersistentVolumeClaims that do not require any specific storage class.

- **Can we change the default Storageclass?**

    One reason to change the default StorageClass is that it might be too expensive or it might not fit our workloads. As a solution, we can do any of the following:

    - Change the default StorageClass
    - Disable to compltely avoid dynamic provisioning

- **Can we delete the StorageClass?**

    We can delete it but it might be automatically be re-created by the running add-on manager in your cluster

- **Can we have multiple default StorageClass?**

    If we have two or more default StorageClass, we will not be able to create a *PersistentVolumeClaim* without a *storageClassName*.

## Changing the default StorageClass

To change the default StorageClass:

1. Create the new StorageClass.
2. Verify both StorageClasses exist:

    ```bash
    kubectl get sc -A
    ```

3. Update the old StorageClass to remove its default annotation:

    ```bash
    kubectl patch storageclass <old-storage-class> -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
    ```

4. Set the new StorageClass as default:

    ```bash
    kubectl patch storageclass <new-storage-class> -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
    ```

5. Verify the change:

    ```bash
    kubectl get sc -A
    ```



## Volumes 

In Kubernetes, volumes are used to persist data, especially after container restarts. There are two types:

- **Ephemeral volumes**: Exist only during the lifetime of a Pod.
- **Persistent volumes**: Persist even after a Pod is deleted.

While volumes do solve the dilemma of losing files, there are some still a few points that we need to remember:

- Volumes can be shared between containers in a Pod.
- A Pod can have multiple volumes.
- Volumes can’t be nested or contain hardlinks to other volumes.
- By default, Kubernetes uses **emptyDir** as a volume type.

For more information, please see [Volumes in Kubernetes.](https://kubernetes.io/docs/concepts/storage/volumes/)

## Persistent Volumes and Persistent Volume Claims

A **PersistentVolume (PV)** lets administrators manage how storage is provided and used through an API. PVs can vary in size and access modes, and users don't need to know how they are created.

There are two key API resources related to persistent storage:

- **PersistentVolume (PV)**
  - Exists even after a Pod is deleted
  - Can be provisioned by an administrator or dynamically through Storage Classes

- **PersistentVolumeClaim (PVC)**
  - A user's request for storage
  - Lets Pods specify the required resources and access modes
  - Similar to Pods, PVCs consume PV resources

## Binding PVC and PV

A PVC to PV binding is a one-to-one mapping, using a `ClaimRef` which is a bi-directional binding between the PersistentVolume and the PersistentVolumeClaim.

<div class='img-center'>

![](/img/docs/bindingpvandpvc.png)  

</div>


## Deleting the PV or the PVC

When deleting a **PVC** or **PV**, the removal process is delayed until they are no longer in use:

- **PVC** is not removed immediately if it's still in use by a Pod. 
- **PV** is not removed until it’s no longer bound to a PVC.

After deleting a **PVC**, the **PV** remains but is marked as "released." It can’t be reused until the previous data is cleared.

:::info[NOTE]

Note that a PVC is in active use by a Pod as long as the Pod using it exists. 

:::

## Volume Phases

A volume will be in one of the following phases:

- **Available** - volume not yet bound to a claim
- **Bound** - volume alread bounded to a claim
- **Released** - claim is delete, but still not reclaimed
- **Failed** - volume failed its automatic reclamation           

## Volume Access Modes 

Kubernetes uses volume access modes to match `PersistentVolumeClaims` and `PersistentVolumes`. There are different types of access modes:

| Volume Access Mode       | Abbreviation | Description                               |
|--------------------------|--------------|-------------------------------------------|
| ReadWriteOnce            | RWO          | Mounted as read-write by a single node    |
| ReadWriteMany            | RWX          | Mounted as read-write by many nodes       |
| ReadOnlyMany             | ROX          | Mounted as read-only by many nodes        |
| ReadWriteOncePod         | RWOP         | Mounted as read-write by a single Pod     |


Some keypoints to remember:

- Volumes can only be mounted using one access mode at a time
- Write protection is **not enforced** once the storage has been mounted
- Additional mount options can specified for a PV

## Volume Lifecycle

The interaction between PVs and PVCs follows this lifecycle:

Here’s the information in bullet format with sub-bullets:

- **Provisioning**  
  - PVs can be manually created  
  - PVs can be automatically created (via Storage Classes)

- **Binding**  
  - PVC requests a PV based on size  
  - PVC requests a PV based on access modes

- **Using**  
  - PV is mounted to a Pod  
  - Pod uses the volume for storage

- **Reclaiming**  
  - Reclaim policy can be Retain, Delete, or Recycle  
  - Policy determines what happens after the PV is released

## Reclaiming 

When a volume is no longer needed, the PVC can be deleted to reclaim the resource. There are three reclaim policies:

- **Retain**: Manual reclamation.
- **Delete**: Removes PVC and volume.
- **Recycled**: Basic scrub on the volume (deprecated).

:::info[NOTE]

The Recycle reclaim policy is deprecated. Instead, the recommended approach is to use dynamic provisioning.

:::

To manually reclaim the volume:

1. Delete the PersistentVolume. 
2. Manually clean up data on the associated storage asset.
3. Manually delete the associated storage asset.

If you want to reuse the same storage asset, create a new PersistentVolume with the same storage asset definition.

## Creating Persistent Volume Claims

Each PVC contains a spec and status, which is the specification and status of the claim. After creating the storageclass, we can enable **dynamic volume provisioning** by creating a **persistent volume claim** and including the StorageClass. 

For more information, please see [Dynamic Volume Provisioning on Kubernetes.](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/#using-dynamic-provisioning)

To use dynamic provisioning, create a PVC with the desired StorageClass:

```bash title="pvc-claim.yml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-mysql
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi 
  storageClassName: fast
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-wordpress
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi 
  storageClassName: fast
```

In the YAML file above, we're creating two PVCs: one for MySQL and one for the Wordpress app. Notice also that both PVCs are specified to have an `accessModes: ReadWriteOnce`, which means the PVC can be used by a Pod for read and write operations.

Apply the manifest.

```bash
kubectl apply -f  pvc-claim.yml --namespace=<namespace>
```

To verify:

```bash
kubectl get pvc -n --namespace=<namespace>
```

For more information, please see:

- [StorageClass on Kubernetes.](https://kubernetes.io/docs/concepts/storage/storage-classes/)

- [StorageClass on Amazon EKS.](https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html)



 

 
