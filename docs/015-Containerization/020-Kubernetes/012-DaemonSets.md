---
title: "DaemonSets"
description: "Container Management Challenges"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 12
last_update:
  date: 4/7/2022
---


## Overview

A DaemonSet is a Kubernetes resource similar to a Deployment, as it also creates Pods. However, its primary purpose is to ensure each node runs a copy of a specific Pod, commonly used for long-running processes.

- When nodes are added, DaemonSets add Pods to them
- When nodes are removed, the Pods are garbage collected.
- Deleting a DaemonSet removes all its created Pods.

Some typical uses of a DaemonSet are:

- Running a cluster storage daemon on every node
- Running a logs collection daemon on every node
- Running a node monitoring daemon on every node


## Managing DaemonSets

To check the DaemonSets running in the cluster, use:

```bash
kubectl get ds
```

For more detailed information about a DaemonSet in a specific namespace (e.g., `kube-system`), use:

```bash
kubectl describe <daemonset-name> -n kube-system
```

To see the daemonset in a specific namespace, e.g. kube-system: 

```bash
kubectl get ds -n kube-system
```

Example output:

```bash
NAME        DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE
aws-node    2         2         2       2            2
kube-proxy  2         2         2       2            2
```

In the example above, there are two DaemonSets running:

- **kube-proxy** 

    - Handles iptables configs of the nodes
    - Allows network connectivity to happen with the pods on the node.

    ```bash
    kubectl logs -n kube-system kube-proxy-XXXXX
    ```

- **aws-node** 

    - Handles network overlay underneath
    - Contains the CNI plugins enabling EC2 nodes to talk to Amazon VPC CNI.

    ```bash
    kubectl describe ds aws-node -n kube-system 
    ```


## Default DaemonSets

When a Kubernetes cluster is created, certain default DaemonSets, like the `kube-proxy` DaemonSet, are included for core networking functions.

To examine the logs of one of the kube-proxy Pods, list them first:

```bash
kubectl get pods -n kube-system | grep proxy
```

Example output:

```bash 
kube-proxy-f8dl7                                                   1/1     Running   3 (6m58s ago)   140d
kube-proxy-fdmnb                                                   1/1     Running   0               5m23s
kube-proxy-nhzsd                                                   1/1     Running   0               5m17s 
```

To retrieve logs from the first kube-proxy Pod, run:

```bash
# proxy_pod_1 is a variable with the name of the first kube-proxy pod
proxy_pod_1=$(kubectl get pods -n kube-system | grep proxy | cut -d" " -f1 | head -1)

kubectl logs -n kube-system $proxy_pod_1
```      

This log shows network setup details and Pod-specific configurations, including IP address detection, proxy modes, and system settings adjustments.

```bash       
I1228 15:55:44.614375       1 node.go:163] Successfully retrieved node IP: 10.0.0.100
I1228 15:55:44.614936       1 server_others.go:138] "Detected node IP" address="10.0.0.100"
I1228 15:55:44.615089       1 server_others.go:578] "Unknown proxy mode, assuming iptables proxy" proxyMode=""
I1228 15:55:44.842402       1 server_others.go:206] "Using iptables Proxier"
I1228 15:55:44.842586       1 server_others.go:213] "kube-proxy running in dual-stack mode" ipFamily=IPv4
I1228 15:55:44.842673       1 server_others.go:214] "Creating dualStackProxier for iptables"
I1228 15:55:44.842814       1 server_others.go:501] "Detect-local-mode set to ClusterCIDR, but no IPv6 cluster CIDR defined, , defaulting to no-op detect-local for IPv6"
I1228 15:55:44.842884       1 proxier.go:259] "Setting route_localnet=1, use nodePortAddresses to filter loopback addresses for NodePorts to skip it https://issues.k8s.io/90259"
I1228 15:55:44.843065       1 proxier.go:259] "Setting route_localnet=1, use nodePortAddresses to filter loopback addresses for NodePorts to skip it https://issues.k8s.io/90259"
I1228 15:55:44.843261       1 server.go:661] "Version info" version="v1.24.3"
I1228 15:55:44.843277       1 server.go:663] "Golang settings" GOGC="" GOMAXPROCS="" GOTRACEBACK=""
I1228 15:55:44.844361       1 conntrack.go:100] "Set sysctl" entry="net/netfilter/nf_conntrack_max" value=131072
I1228 15:55:44.844397       1 conntrack.go:52] "Setting nf_conntrack_max" nf_conntrack_max=131072
I1228 15:55:44.844659       1 conntrack.go:83] "Setting conntrack hashsize" conntrack hashsize=32768
I1228 15:55:44.858856       1 conntrack.go:100] "Set sysctl" entry="net/netfilter/nf_conntrack_tcp_timeout_close_wait" value=3600
I1228 15:55:44.861250       1 config.go:317] "Starting service config controller"
I1228 15:55:44.862031       1 shared_informer.go:255] Waiting for caches to sync for service config
I1228 15:55:44.862067       1 config.go:444] "Starting node config controller"
I1228 15:55:44.862072       1 shared_informer.go:255] Waiting for caches to sync for node config
I1228 15:55:44.864557       1 config.go:226] "Starting endpoint slice config controller"
I1228 15:55:44.864567       1 shared_informer.go:255] Waiting for caches to sync for endpoint slice config
I1228 15:55:44.962638       1 shared_informer.go:262] Caches are synced for service config
I1228 15:55:44.962638       1 shared_informer.go:262] Caches are synced for node config
I1228 15:55:44.964885       1 shared_informer.go:262] Caches are synced for endpoint slice config 
```

To retrieve the YAML configuration of a running DaemonSet:

```bash
kubectl get daemonset $proxy_pod_1 -n kube-system -o yaml
```

Example output:

```bash
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: monitoring-daemon 
spec:
  selector:
    matchLabels:
      app: monitoring-agent
  template:
    metadata:
      labels:
        app: monitoring-agent
    spec:
      containers:
      - name: monitoring-agent
        image: monitoring-agent 
```


For more information, please see [DaemonSets in Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/).



 

 
