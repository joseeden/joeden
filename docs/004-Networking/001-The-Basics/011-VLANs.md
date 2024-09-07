---
title: "VLANs"
description: "Learn the basics of Networking"
tags: [Networking,Cybersecurity]
sidebar_position: 11
last_update:
  date: 1/30/2024
---


## Virtual Local Area Networks (VLANs)

Virtual Local Area Networks (VLANs) allow switches to segment a network logically without changing the physical setup.

- Improve network management and security.
- Enable traffic isolation between different groups.
- Simplify network design and reduce broadcast domains.

For example, VLANs can separate the network of one department from another, enhancing security and minimizing network congestion.

![](/img/docs/networking-basics-vlanssss-example-office-vlansss.png)


## Configuring VLANs 

Configuring VLANs involves setting up and managing VLANs on network switches to ensure proper traffic segmentation and network efficiency.

- **Enable VLAN Trunking**

    - Extends VLANs across multiple switches.
    - This allows VLANs to span different network locations.
    - Uses trunk ports to carry traffic for multiple VLANs over a single link.

- **Assign switchport to VLANs**

    - Configure switchports to belong to specific VLANs.
    - This ensures traffic is correctly segmented.
    - Ports can be set as:
      - an **access port** for one VLAN, or 
      - as a **trunk port** to carry multiple VLANs.

How it looks like:

<div class='img-center'>

![](/img/docs/networking-basics-configuring-vlansssss.png)

</div>


## Private VLANs 

Private VLANs (PVLANs), also known as **Port Isolation**, enhance network security by isolating ports within the same VLAN.

- Isolate devices within the same VLAN
- Prevent direct communication between devices
- Reduce risk of internal attacks

Port isolation restricts traffic from a source port to a single destination port. This means that if a device is plugged into a particular isolated port (source port), it can only connect to the specified destination port and will not be able to connect to other devices.

<div class='img-center'>

![](/img/docs/networking-basics-private-vlans-port-isolationssss.png)

</div>

Port isolation is not recommended on a corporate network where devices often need to communicate with each other, share resources, or access multiple services. In contrast, it works very well on hotel guest room networks where guests should be isolated from each other to ensure privacy and prevent unauthorized access to other guests' devices.

## VLAN Security 

add simple intro explanation...

- **VLAN Pruning**

  - Limit unnecessary exposure of VLANs.
  - Limit the number of switches where they are trunked.
  - Useful for sensitive VLANs.
  - add more information
  - add more information

- **VLAN Trunk Negotiation**

  - Attackers may attempt VLAN hopping to switch between VLANs.
  - These attacks relies on pretending to be a switch and asking the switch to trunk VLANs
  - As countermeasure, switches should be configured to deny the use of automatic negotiation.
  - This limits the effectiveness of VLAN hoppign attacks.

- **Port Security**

  - Allows administrators to restrict which devices can connect to which port.
  - Connection can be based on the network interface card's MAC address.
  - Limits the MAC address that may be used on particular switchport.
  - For more information, please see [Port Security.](/docs/005-Cybersecurity/005-Communications-and-Network/050-Ports-and-Protocols.md#port-security)