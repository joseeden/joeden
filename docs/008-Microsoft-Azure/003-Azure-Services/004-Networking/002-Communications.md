---
title: "Communications"
description: "Communications between networks and resources"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 2
last_update:
  date: 7/18/2020
---


## Internet Communication

Internet communication in Azure allows resources to communicate with external networks. Outbound communication to the internet is available by default, while inbound communication requires additional configuration.

- Outbound traffic is available by default.
- Inbound from the internet:
  - Assign a public IP address to the resource
  - Provision a public load balancer

## Communication Between Azure Resources

Azure resources can communicate with each other within a virtual network or across different networks using specific configurations. 

### Deployment in the Same VNet

Resources such as Virtual Machines (VMs), Scale Sets, and App Service Environments deployed within the same virtual network can communicate seamlessly.

- Enables direct communication between resources
- Simplifies management and deployment within a single network

### Service Endpoints

Service Endpoints enable secure and direct connectivity from a virtual network to Azure resources over the Azure backbone network. This ensures a secure and optimized route for traffic.

For more information: [Service Endpoints Overview](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview)


### Private Links

Private Links allow private access to specific service instances from a virtual network or on-premises. This enhances security by eliminating exposure to the public internet.

For more information: [Private Link Overview](https://docs.microsoft.com/en-us/azure/private-link/private-link-overview)


### VNet Peering

VNet Peering connects two virtual networks, enabling resources to communicate across different VNets as if they were part of the same network.

- Enables communication between resources in different VNets
- Facilitates resource sharing across virtual networks

For more information: [VNet Peering](./004-VNet-Peering.md)

## Communication with On-Prem Networks

Azure provides several options for connecting virtual networks to on-premises networks. These options include Point-to-Site VPN, Site-to-Site VPN, and Azure ExpressRoute..

### Point-to-Site VPN

Point-to-Site VPN allows individual computers to connect to the virtual network. It is typically used for remote worker access.

- Connects a single computer to the virtual network
- Uses separate connections for each on-premises computer or client

For more information: [Point-to-Site VPNs](./005-VPN-Options.md)

Diagram: 

![Point-to-Site VPN](/img/docs/azure-vnet-p2s-vpn-with-border.png)


### Site-to-Site VPN

Site-to-Site VPN connects an entire on-premises network to an Azure virtual network. It provides a secure, encrypted connection over the internet and utilizes the Azure VPN Gateway.

- Connects entire on-premises network to Azure
- Secure, encrypted connection over the internet

For more information: [Site-to-Site VPNs](./005-VPN-Options.md)

Diagram: 

![Site-to-Site VPN](/img/docs/azure-vnet-s2s-vpn-with-border.png)



### Azure ExpressRoute

Azure ExpressRoute provides a private connection between an on-premises network and Azure. It offers a more robust and dedicated connection by avoiding the public internet, established through an ExpressRoute partner.


For more information: [Azure ExpressRoute](./006-Azure-ExpressRoute.md)

Diagram:

![Azure ExpressRoute](/img/docs/azure-expressroute-with-border.png)

