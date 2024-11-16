---
title: "Tracing Linux Syscalls "
description: "Tracing Linux Syscalls "
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 19
last_update:
  date: 7/7/2022
---

## Linux Kernel 

The Linux kernel is the core part of the Linux OS that acts as the bridge between hardware and applications. It manages system resources, provides services to user processes, and enables communication between software and hardware.

<div class='img-center'>

![](/img/docs/what-is-linux-kernel.png)

</div>

Here’s a more detailed diagram:

<div class='img-center'>

![](/img/docs/linux-kernel-detailed-diagram.png)

</div>

Applications that can ran in the User Space:

- C 
- Java 
- Python 
- Ruby 

Applications that can be ran in the Kernel Space:

- Kernel Code
- Kernel Extensions
- Device Drivers 



## System Calls 

System calls allow applications to communicate with the kernel of the operating system.

<div class='img-center'>

![](/img/docs/linux-syscalls-example-process.png)

</div>

In Linux, applications use system calls to request kernel services. These calls act as an interface between user space and kernel space, enabling user-level processes to ask the kernel for tasks requiring elevated privileges or access to protected resources.

## Tracing Syscalls 

To trace the syscalls sent by an application and the responses:

```bash
strace <command>
```

Example: 

<div class='img-center'>

![](/img/docs/lniux-syscalls-which-strace.png)

</div>

<div class='img-center'>

![](/img/docs/linux-syscalls-sample-strace-output.png)

</div>


## List Syscall Summary 

<div class='img-center'>

![](/img/docs/list-syscall-summary.png)

</div>




## Tracing syscalls made by a running process

For tracing syscalls made by a running process, first find the PID of the process:

```bash
pidof etcd  
```

Then use strace:

```bash
strace -p <PID-number> 
```


## Tracing Syscalls using AquaSec Tracee

Tracee is an open-source security tool by Aqua Security that tracks system and application behavior.

<div class='img-center'>

![](/img/docs/aquasec-tracee-logo.png)

</div>

It uses eBPF technology to capture system events, including security events for detecting suspicious behavior.

Link: [Official Github Repo](https://github.com/aquasecurity/tracee)

It can be installed directly to the server, or it can also be ran as a Docker container. Some pre-requisites are to bind mount the following directory to the container.

<div class='img-center'>

![](/img/docs/pre-requisites-of-aquasec-tracee.png)

</div>


**Examples:**

- Tracing syscalls made by the `ls` command:

    <div class='img-center'>

    ![](/img/docs/tracing-syscalls-made-by-the-ls-command.png)

    </div>

- Listing syscalls made by new processes:

    <div class='img-center'>

    ![](/img/docs/list-syscalls-generated-by-new-processes.png)

    </div>

- Listing syscalls made by new containers:

    <div class='img-center'>

    ![](/img/docs/list-syscalls-generated-by-new-containers.png)

    </div>