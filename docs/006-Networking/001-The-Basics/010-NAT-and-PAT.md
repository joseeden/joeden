---
title: "NAT and PAT"
description: "NAT and PAT"
tags: 
- Networking
- Cybersecurity
sidebar_position: 10
last_update:
  date: 1/16/2018
---


## Network Address Translation (NAT)

Network Address Translation (NAT) translates private IP addresses to a public IP address, allowing multiple devices on a local network to access the internet using a single public IP.

- Conserves public IP addresses.
- Hides internal network structure.
- Provides a basic level of security.
- Enables internal IP address management.
- Supports dynamic and static NAT configurations.

Sample diagram:

<div class="img-center">

![](/img/docs/all-things-devops-NAT-3.png)


</div>

## Types of NAT 

- **Static NAT**

  - Maps a single private IP address to a single public IP address. 
  - Used for servers that need to be accessible from the internet.

- **Dynamic NAT**

  - Maps a private IP address to a public IP from a pool of available IPs. 
  - The pool of IP are available on a first-come, first-served basis
  - Used for general internet access.


## Port Address Translation (PAT)

Port Address Translation (PAT), a subset of NAT, maps multiple private IP addresses to a single public IP address using different ports, allowing multiple devices to share one public IP address simultaneously.

- Can be a hardware or software configuration.
- Normally enabled on the router, PAT hides the internal IPs.
- Enables multiple connections from different devices.
- Uses port numbers to differentiate traffic.
- Supports large-scale networks with limited public IPs.
- Often referred to as "NAT overload", or "NAT Gateway"

Almost similar to a forward proxy, but their differences are:

- PAT is Layer 4, while Forward Proxy is Layer 7 of the OSI Model.
- Forward proxy can cache the retrieved content from the internet, PAT doesn't.
- Forward proxy can force users to authenticate before fetching requests.

Sample diagram:


<div class="img-center">

![](/img/docs/all-things-devops-PAT.png)


</div>
