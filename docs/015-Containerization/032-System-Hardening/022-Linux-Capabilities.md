---
title: "Linux Capabilities"
description: "Leveraging linux features"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 22
last_update:
  date: 7/7/2022
---


## Linux Capabilities 

Linux capabilities are a security feature in the Linux kernel that enhance security by limiting application privileges and reducing attack surfaces.

- **Traditional Privileges vs. Capabilities**  

  Traditionally, root processes have full system control. Linux capabilities break these privileges into smaller units, allowing more precise control.

- **Bounding Set**  

  Each process has a **bounding set** of capabilities, limiting the privileges it can gain through user or group permissions.

## View Linux Capabilities 

To check what capabilities is needed by a command, example is ping:

```bash
$ which ping
/usr/bin/ping

$ getcap /usr/bin/ping
/usr/bin/ping = cap_net_raw+ep
```

To get the capabilities needed by a process, example is ssh:

```bash
$ which sshd
/usr/sbin/sshd

$ ps -ef | grep /usr/bin/sshd
joseeden   740    1  0 18:29 ?    00:00:00 /usr/bin/sshd =D

$ getpcaps 740
Capabilities for `740': =cap_net_bind_service,cap_net_raw+ep
```


## Capability Sets  

Each process has three sets of capabilities:  


| **Set**         | **Description**                                      |  
|------------------|------------------------------------------------------|  
| **Permitted**    | Capabilities a process can potentially use.          |  
| **Inheritable**  | Capabilities retained across an `execve()` system call. |  
| **Effective**    | Capabilities currently active for the process.       |  

## Dropping Privileges

Processes can drop specific capabilities to reduce their privileges after they have started.

- The `prctl()` system call 
- Often used to manipulate capabilities programmatically.

## Other Linux Capabilities  

| **Capability**            | **Description**                                         |  
|----------------------------|---------------------------------------------------------|  
| **CAP_NET_BIND_SERVICE**   | Bind to ports `<1024` without root.                       |  
| **CAP_DAC_READ_SEARCH**    | Bypass file read and directory search permission checks. |  
| **CAP_SYS_ADMIN**          | Perform various administrative tasks.                  |  
| **CAP_SYS_PTRACE**         | Trace and debug arbitrary processes.                   |  
| **CAP_NET_RAW**            | Use raw sockets.                                       |  

## Linux Capabilities in Kubernetes 

In Kubernetes, Linux capabilities can be defined in a Pod's security context.  

```yaml 
apiVersion: v1
kind: Pod
metadata:
  name: time-cap-pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu:latest
    command: ["sleep", "3600"]
    securityContext:
      capabilities:
        add: ["SYS_TIME"]
```

Similarly, we can also drop Linux capabilities:

```yaml 
apiVersion: v1
kind: Pod
metadata:
  name: time-cap-pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu:latest
    command: ["sleep", "3600"]
    securityContext:
      capabilities:
        add: ["SYS_TIME"]
        drop: ["CHOWN"]
```

To learn more, check out [Set capabilities for a Container.](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container) 






 

 
