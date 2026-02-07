---
title: "Virtualization"
description: "From hardware to virtualized appliances"
sidebar_position: 40
tags: 
- IT Fundamentals
- Computers
- Operating Systems
last_update:
  date: 2/26/2017
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

### VM Escape

VM escape involves exploiting vulnerabilities to break out of a virtual machine's isolation, allowing unauthorized access to the host system or other VMs.

- Exploits vulnerabilities in virtualization software.
- Can lead to data breaches and loss of integrity.

**Example:**

- CVE-2018-3646: A vulnerability in Intel CPUs that allowed malicious code running in a VM to access memory outside its allocated space, potentially compromising the host system.

**Mitigation:**

- Regularly update hypervisor software to patch known vulnerabilities.
- Implement strict access controls and isolation techniques.


### Privilege Escalation

Privilege escalation occurs when users gain elevated privileges within a virtualized environment, granting unauthorized access to sensitive resources.

- Exploits weaknesses in operating system or application configurations.
- Can lead to unauthorized actions that compromise system security.
- For more information, please see [Privilege Escalation.](/docs/025-Cybersecurity/051-List-of-Attacks/014-Execution-and-Escalation.md#privilege-escalation)

**Example:**

- CVE-2019-14849: A vulnerability in the Linux Kernel that allowed users with lower privileges to escalate their privileges and gain root access within a VM.

**Mitigation:**

- Apply operating system patches and security updates promptly.
- Implement [least privilege principles](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege).
- Regularly audit user permissions to prevent unauthorized privilege escalation.

### Live VM Migration

Live VM migration refers to the process of moving a VM from one host to another while it's still running, during which data can be intercepted.

- Potentially exposes sensitive information to unauthorized entities.
- Risks increase with insecure migration protocols or misconfigured networks.

**Example:**

- Insecure VM migration protocols may expose sensitive data during live migrations.

**Mitigation:**

- Encrypt data during VM migration to prevent interception.
- Implement secure network configurations.
- Restrict access to migration interfaces.

### Resource Reuse

Resource reuse involves exploiting leftover resources from previously used VMs, which can lead to unauthorized access or data leakage.

- Residual data can be left in memory or storage after a VM is terminated.
- Can lead to potential exploitation of sensitive information.

**Example:**

- Data remnants in memory or storage from a terminated VM may be accessed by unauthorized users.

**Mitigation:**

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


## VDI 

VDI (Virtual Desktop Infrastructure) allows users to access virtual desktops hosted on centralized servers, enabling remote work and centralized management.

- Centralized management for easier updates and maintenance
- Enhanced security as data is stored on central servers
- Flexible access from multiple devices, improving mobility