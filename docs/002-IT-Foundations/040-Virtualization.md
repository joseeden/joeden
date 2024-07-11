---
title: "Virtualization"
description: "From hardware to virtualized appliances"
sidebar_position: 40
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 3/28/2023
---


## Overview 

Virtualization involves creating virtual instances of computing resources, such as servers, storage devices, or networks, to maximize resource utilization and flexibility.


## Hypervisors

Hypervisors are software or firmware that create and manage virtual machines (VMs).

- **Type-1 (Bare Metal)**

    - Installed directly on the physical hardware.
    - Provides direct access to hardware resources.
    - Typically used in enterprise data centers and cloud environments.
    - Examples: VMware vSphere, Microsoft Hyper-V, Xen, KVM.

- **Type-2 (Hosted)**

    - Installed on top of an operating system.
    - Relies on the host OS for hardware access.
    - Often used for development, testing, and desktop virtualization.
    - Examples: Oracle VirtualBox, VMware Workstation, Parallels Desktop.

## VM Vulnerabilities 

- **VM Escape**

    - Exploiting vulnerabilities to break out of a virtual machine's isolation.
    - Allows unauthorized access to the host system or other VMs.
    - *Example:* 
        - CVE-2018-3646: A vulnerability in Intel CPUs allowed malicious code running in a virtual machine to access memory outside its allocated space, potentially compromising the host system.
    - *Mitigation:* 
        - Regularly update hypervisor software to patch known vulnerabilities. 
        - Implement strict access controls and isolation techniques.

- **Privilege Escalation**

    - Elevating user privileges within a virtualized environment.
    - Grants unauthorized access to sensitive resources or capabilities.
    - *Example:* 
        - CVE-2019-14849: A vulnerability in the Linux Kernel allowed users with lower privileges to escalate their privileges and gain root access within a virtual machine.
    - *Mitigation:* 
        - Apply operating system patches and security updates promptly. 
        - Implement least privilege principles.
        - Regularly audit user permissions to prevent unauthorized privilege escalation.

- **Live VM Migration**

    - Intercepting data during the migration process.
    - Potentially exposing sensitive information to unauthorized entities.
    - *Example:* 
        - Insecure VM migration protocols or misconfigured network settings may expose sensitive data during live VM migrations.
    - *Mitigation:* 
        - Encrypt data during VM migration to prevent interception. 
        - Implement secure network configurations.
        - Restrict access to migration interfaces.

- **Resource Reuse**

    - Exploiting leftover resources from previously used virtual machines.
    - Can lead to unauthorized access or data leakage.
    - *Example:* 
        - Residual data left in memory or storage after a VM is terminated may be exploited to access sensitive information.
    - *Mitigation:* 
        - Use secure deletion techniques to ensure that data remnants are properly erased. 
        - Implement memory and disk scrubbing mechanisms to prevent residual data exploitation. 
        - Regularly monitor and audit resource allocation to detect and mitigate resource reuse vulnerabilities.    

## Securing VMs 

Securing VMs are almost similar with how we secure physical servers.

- Hypervisors needs to be regularlly updated, patched, and secured.
- Limit the connections between VMs and the physical machines.
- Minimize and remove unneeded features to reduce potential vulnerabilities.
- Consider VM distribution across different servers.
- Beware of **VM Sprawl** - Provisioning VMs without proper oversight.
- Enable encryption of the file that hosts the VM.
