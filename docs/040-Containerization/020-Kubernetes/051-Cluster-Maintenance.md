---
title: "Cluster Maintenance"
description: "Cluster Maintenance"
tags: 
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 51
last_update:
  date: 4/7/2022
---

## OS Upgrade

When a node goes down briefly and comes back, the kubelet process restarts, and the Pods return online. If a node is down for more than 5 minutes, the Pods on that node are terminated.

If a Pod is part of a ReplicaSet, it will be recreated on another available node.

For maintenance, you can drain a node to ensure Pods are gracefully terminated and rescheduled on another node before the main node goes down.

```bash
kubectl drain node-1
```

To prevent new Pods from being scheduled on a node, you can **cordon** it. This doesn’t affect running Pods, just prevents new ones from being scheduled.

```bash
kubectl cordon node-1
```

When the node is back, it won’t serve Pods until you **uncordon** it. Note that existing Pods won’t automatically move to the new node, but new Pods can be scheduled there.

```bash
kubectl uncordon node-1
```

## Kubernetes Software Versions

To check the Kubernetes version for your nodes:

```bash
kubectl get nodes
```

Output: 

```bash 
NAME      STATUS   ROLES    AGE     VERSION
master    Ready    <none>   7h21m   v1.11.3
worker1   Ready    <none>   7h21m   v1.11.3
worker2   Ready    <none>   7h21m   v1.11.3
```


The version number:

<div class='img-center'>

![](/img/docs/k8sversion.png)  

</div>


Kubernetes only supports the three most recent versions.

<div class='img-center'>

![](/img/docs/latest3supportedversions.png)

</div>

## Upgrading the Cluster

For managed Kubernetes clusters, updates are handled through the Management Console. For clusters created with **kubeadm**, the upgrade process is:

1. Upgrade the master node.
2. Upgrade the worker nodes.

You can upgrade worker nodes in several ways:

- **All at once**: The whole cluster goes down.
- **One node at a time**: The workload is moved to other nodes while upgrading.
- **Add new nodes**: Move workloads to new nodes with the latest software and remove old nodes.

## Backup and Restore

### Resource Configs

To back up all resource configs in all namespaces:

```bash
kubectl get all --all-namespaces -o yaml > all-resources.yml
```

Alternatively, store all manifests in a Git repository.

### etcd

To back up the etcd server, back up the data directory:

```bash
/var/lib/etcd
```

You can also use **etcdctl** to create a snapshot:

```bash
ETCDCTL_API=3 etcdctl \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/peer.crt \
  --key=/etc/kubernetes/pki/etcd/peer.key \
  snapshot save /snapshots/backup.db
```

To restore from the snapshot:

```bash
ETCDCTL_API=3 etcdctl \
snapshot restore /snapshots/backup.db \
--data-dir /var/lib/etcd-from-backup \
--initial-cluster master-1=https://192.168.3.10:2380 \
--initial-cluster-token etcd-cluster-1 \
--initial-advertise-peer-urls https://${INTERNAL_IP}:2380
```

Alternatively, use **nerdctl**, a Docker-compatible CLI for containerd:

```bash
sudo nerdctl run --rm \
-v '/snapshots:/snapshots' \
-v '/var/lib/etcd:/var/lib/etcd' \
-e ETCDCTL_API=3 \
'k8s.gcr.io/etcd:3.5.3-0' \
/bin/sh -c "etcdctl snapshot restore --data-dir /var/lib/etcd /snapshots/backup.db"
```

Finally, reload the daemon and restart etcd:

```bash
systemctl daemon-reload
systemctl restart etcd
```