---
title: "Create the Virtual Networks"
description: "Create the Virtual Networks"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 12
last_update:
  date: 9/15/2023
---


## Overview

In VirtualBox, you will need to create the networks that will be used by the nodes.

| VirtualBox Network Type | Network Name      | Purpose / Network Type          | CIDR / Address | DHCP                           |
| ----------------------- | ----------------- | ------------------------------- | -------------- | ------------------------------ |
| Host-Only Adapter       | ManagementNetwork | Management (Controller ↔ Nodes) | 10.0.0.0/24    | Disabled                       |
| NAT Network             | ProviderNetwork   | Provider / VM traffic           | 10.10.10.0/24  | Disabled (manual IPs optional) |
| NAT Network             | Internet          | Internet access / Updates       | 10.0.2.0/24    | Enabled                        |

To create the networks, go to Tools → Network → NAT Network.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-16-175206.png)

</div>

## Host-Only Adapter (Management Network)

**Note:** You cannot rename Host-Only adapters in VirtualBox on Windows. VirtualBox does not allow renaming in the GUI, because it links directly to a network interface in Windows.

1. Click `+` to create a new host-only adapter.
2. Select the adapter → click Edit:

   - IPv4 Address: `10.0.0.1`
   - IPv4 Network Mask: `255.255.255.0`
   - DHCP: Disabled (we’ll assign static IPs for the VMs)

3. Click Apply to save.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-16-181024.png)

</div>


## NAT Network (Provider Network)

1. Click `+` to create a new NAT network.
2. Click the Edit (gear icon) and update based on the table above.
3. Click Apply to save.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-16-175736.png)

    </div>

## NAT Network (Internet)

1. Click `+` to create a new NAT network.
2. Click the Edit (gear icon) and update based on the table above.
3. Click Apply to save.

    <div class='img-center'>

    ![](/img/docs/Screenshot-2026-02-17-180706.png)

    </div>

## Next Steps 

Next, create the virtual machines and configure the VM settings. 

See [Create the VMs.](/docs/038-OpenStack/005-Manual-Install/015-Create-the-VMs.md)
