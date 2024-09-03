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

