---
title: "Seccomp"
description: "Filter system calls to enhance application security"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 20
last_update:
  date: 3/11/2022
---


## Seccomp in Docker

Seccomp (Secure Computing Mode) is a Linux feature that limits the system calls a process can make. By restricting syscalls, it creates a more secure environment for running programs.

To check if seccomp is supported, inspect the boot config file.

<div class='img-center'>

![](/img/docs/restrict-syscalls-using-seccomp-check-if-supported-by-kernel.png)

</div>


## Built-in Seccomp Filters in Docker

Docker uses a built-in Seccomp filter when creating containers, as long as the host kernel has Seccomp enabled. Here's a basic example of the Seccomp profile:

```json
{
  "defaultAction": "SCMP_ACT_ALLOW",
  "architectures": [
    "amd64",
    "x86_64"
  ],
  "syscalls": [
    {
      "name": "accept4",
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "name": "access",
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "name": "adjtimex",
      "action": "SCMP_ACT_ALLOW"
    },
    // ... additional syscalls ...
  ]
}
```


## Seccomp Modes

Seccomp operates in the following modes:

- `0` - Disabled
- `1` - Filter Mode
- `2` - Notification Mode

### Filter Mode

In Filter Mode, Seccomp allows or denies syscalls based on a set filter.

Example Seccomp filter:

```json
{
  "defaultAction": "SCMP_ACT_ALLOW",
  "architectures": ["amd64"],
  "syscalls": [
    { "name": "read" },
    { "name": "write" },
    { "name": "exit" }
  ]
}
```

### User Notification Mode

In this mode, the process is notified (via a signal) when a specified syscall is about to be executed. The process can then decide how to handle it.

Example in C:

```C
#include <linux/seccomp.h>
#include <stdio.h>
#include <sys/prctl.h>

int main() {
    prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, NULL);
    prctl(PR_SET_SECCOMP, SECCOMP_MODE_NOTIFY, SECCOMP_RET_TRAP);
    return 0;
}
```

## Seccomp Profiles

Seccomp profiles control the system calls allowed for a process.

- Can be strict or use a filter expression.
- Created manually or using **seccomp-bpf** or **Docker**.

A Seccomp profile consists of:

- **Default Action**: actions for undefined syscalls.
- **Architecture**: defines supported systems.
- **Syscalls Array**: list of syscalls and actions.

Here's an example of a simple seccomp profile in JSON format that allows only a few basic syscalls:

```json
{
  "defaultAction": "SCMP_ACT_ALLOW",
  "architectures": ["amd64"],
  "syscalls": [
    { "name": "read" },
    { "name": "write" },
    { "name": "exit" }
  ]
}
```

Note that there are two types of profiles:

- **Whitelist** - Allows defined syscalls, deny the rest .
- **Blacklist** - Rejects defined syscalls, allows the rest.

Below is an example:

<div class='img-center'>

![](/img/docs/types-of-syscalls-blacklsit-whitelist.png)

</div>



## Specifying a Custom Seccomp Profile

Create a custom Seccomp profile and use it when running containers:

```json
## custom.json 
{
  "defaultAction": "SCMP_ACT_ALLOW",
  "architectures": ["amd64"],
  "syscalls": [
    { "name": "read", "action": "SCMP_ACT_ALLOW" },
    { "name": "write", "action": "SCMP_ACT_ALLOW" },
    { "name": "exit", "action": "SCMP_ACT_ALLOW" },
    { "name": "exit_group", "action": "SCMP_ACT_ALLOW" },
    { "name": "open", "action": "SCMP_ACT_ALLOW" },
    { "name": "close", "action": "SCMP_ACT_ALLOW" },
    { "name": "fstat", "action": "SCMP_ACT_ALLOW" },
    { "name": "arch_prctl", "action": "SCMP_ACT_ALLOW" },
    { "name": "brk", "action": "SCMP_ACT_ALLOW" },
    { "name": "munmap", "action": "SCMP_ACT_ALLOW" },
    { "name": "mmap", "action": "SCMP_ACT_ALLOW" }
    // Add more syscalls as needed
  ]
}
```

To use this profile:

```bash
docker run --security-opt seccomp=/path/to/custom.json -it ubuntu:latest
```

## Disable Seccomp When Running Container

We can also tell the Docker container to completely ignore any seccomp profile completely:

```bash
docker run \
--security-opt seccomp=unconfined \
-it ubuntu:latest
```

By doing this, the container should be able to use all avaiable syscalls from within the container. 

This is **NOT RECOMMENDED.**

## Seccomp in Kubernetes

In Kubernetes, Seccomp isn’t enabled by default. To enable it, specify it in the pod's security context.


  # Add more containers or configurations if needed

Now, if we try to run a pod using the image, we'll see a different output.

<div class='img-center'>

![](/img/docs/running-amicontained-as-a-kubernetes-pod.png)

</div>


From the pod logs above, we see that there's lesser blocked syscalls, and the Seccomp is set to disabled. This is because Kubernetes doesn't implement Seccomp by default.

To implement Seccomp in the Pod, specify it as a Security Context in the Pod definition file.


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-pod
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: my-container
    image: nginx:latest
    securityContext:
      allowPrivilegeEscalation: false
  # Add more containers or configurations if needed
```

## Using a Custom Seccomp Profile in Kubernetes

To use a custom profile, create the profile in the `/var/lib/kubelet/seccomp/profiles/` directory and reference it in the pod definition.

Example custom profile:

```json
{
  "defaultAction": "SCMP_ACT_LOG"
}
```

Kubernetes pod YAML using the custom profile:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-pod
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: profiles/audit.json
  containers:
  - name: my-container
    image: nginx:latest
    securityContext:
      allowPrivilegeEscalation: false
```

Once pod is created, syslog calls made by the container in the pod will be logged in the `/var/log/syslog` file. 

<div class='img-center'>

![](/img/docs/seccomp-in-kubernetes-logging-to-syslog.png)

</div>



From the syslog output above, we could see the syslog call number made by the container in the pod. Note that this number are mapped to specific syscall names, which we can check in the /usr/include/asm/unistd_64.h

<div class='img-center'>

![](/img/docs/syslog_output_mapping_syslog_id_to_syslog_call_names.png)

</div>


Below are just some of the syscall numbers and their corresponding syscall names.

<div class='img-center'>

![](/img/docs/mapping-of-syscall-id-and-syscall-namess-table.png)

</div>



## Rejecting All Syscalls in Kubernetes

Ccreate a Seccomp profile that rejects all syscalls by using:

```json
{
  "defaultAction": "SCMP_ACT_ERRNO"
}
```

Then, use it in your pod definition:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-violation
spec:
  restartPolicy: Never
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: profiles/violation.json
  containers:
  - name: my-container
    image: nginx:latest
    securityContext:
      allowPrivilegeEscalation: false
```

After applying this profile, the pod will be in "ContainerCannotRun" status due to rejected syscalls.


<div class='img-center'>

![](/img/docs/containercannotrun-due-to-seccomp-profile-rejecting-all-syslog-calls.png)

</div>



