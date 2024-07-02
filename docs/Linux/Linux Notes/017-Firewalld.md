---
title: Firewalld
tags: [Linux, Red Hat, Certifications]
sidebar_position: 17
last_update:
  date: 11/29/2021
---

## Firewalld

Firewalld is a Linux management tool that provides a simpler alternative to the low-level and complex `nftables`, which replaced `iptables` in modern Linux kernels. It offers an easier way to manage firewall rules and configurations on Linux systems.

![](/img/docs/sv-fw.png)


## Firewalld Components

Firewalld consists of the following key components:

- **Services**
   - Main component, contains one or more ports, as well as optional kernel modules.
   - Predefined configurations for specific network services (e.g., HTTP, SSH).
   - Groups rules relevant to a service under one configuration.

- **Zones**
   - Defines the trust level of network connections.
   - Default config to which network cards can eb assigned to apply specific settings.
   - Contains predefined rules that dictate how incoming and outgoing traffic is treated.

- **Ports** 
   - IP and Port Forwarding, optional elements to allow access to specific ports.
   - Redirects traffic from one IP address and port combination to another.
   - Useful for exposing services running on internal networks to external clients.

There are other additional components,but are not frequently used in a base firewall configuration. 

- **Source and Destination NAT (Network Address Translation)**
   - Allows mapping of IP addresses and ports from one network to another.
   - Useful for scenarios like load balancing, routing internal traffic to external networks, or masking internal addresses.


- **Masquerading**
   - A form of dynamic NAT where outgoing packets are rewritten to appear as if they come from the firewall itself.
   - Protects internal network structure by hiding the actual source of outbound traffic.

- **Rich Rules**
   - Advanced firewall rules using complex filtering criteria beyond simple ports and addresses.
   - Allows for fine-grained control over traffic based on various packet attributes.

- **Lockdowns**
   - Restricts access to specific services or ports based on defined criteria.
   - Enhances security by limiting potential attack vectors and reducing exposure of critical services.

- **Logging and Auditing**
   - Records firewall activities for monitoring and troubleshooting.
   - Provides visibility into traffic patterns, firewall rule matches, and potential security incidents.

