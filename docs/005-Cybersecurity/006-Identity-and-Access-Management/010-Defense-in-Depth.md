---
title: "Defense in Depth"
description: "Identity and Access Management"
tags: [Security, Cybersecurity, Access Management, Access Control, IAM]
sidebar_position: 10
last_update:
  date: 1/30/2024
---


In access control, organizations employ a defense-in-depth strategy which integrates people, technology, and operations across multiple layers. This aims to prevent or deter cyberattacks by implementing various permissions in building, server rooms, networks, and applications.

* **Multi-Factor Authentication (MFA)**
  - Combines username/password with a phone-sent code.
  - Implements two-layered authentication: something you have and something you know.

* **Firewall Implementation for Network Security**
  - Adds firewalls to segregate untrusted and trusted networks.
  - Validates network traffic with rules on multiple firewalls, especially for sensitive data.

For a non-technical example, consider the multiple layers of access required to get to the actual data in a data center.

* **Physical Barrier**
  - Door lock restricts physical entry to data storage devices.

* **Technical Access Rule**
  - Network-based rule limits access to data.

* **Administrative Control (Policy)**
  - Defines access rules for authorized individuals.

The goal is to create multiple layers of protection so that even if one layer is breached, others remain resilient, slowing down attackers and increasing the likelihood of detection.

<div class="img-center">

![](/img/docs/security-defense-in-depth-layered-approach.png)


</div>






