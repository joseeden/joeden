---
title: "Networking Security"
description: "Networking Security"
tags: 
- Cloud
- Microsoft Azure
- DevOps
- Security
- Certifications
sidebar_position: 2
last_update:
  date: 11/22/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Overview

Azure offers a robust suite of services for network security, providing solutions for:
- filtering traffic, 
- establishing secure connections,
- protecting web applications,
- and mitigating DDoS attacks. 

These services cater to diverse needs, ensuring the security and reliability of Azure resources and connections.

## Network Security Groups (NSG)

Used to filter network traffic to and from Azure resources connected to a virtual network.

  - Default security rules control inbound and outbound traffic 
  - You can create as many custom rules as you need.
  - Defines allowed or denied traffic based on source, destination, and port.
  - Enhances security by controlling communication between resources.
     
For more information: [Azure services compatible with NSG](https://docs.microsoft.com/azure/virtual-network/virtual-network-for-azure-services).

|![](/img/docs/azure-nsg-network.png)|
|-|

  
## Azure VPN Gateway

Virtual network gateway facilitating encrypted traffic between Azure virtual networks, on-premises networks, or remote users.

  - Sents encrypted traffic over public Internet.
  - Supports multiple connections to a single gateway.
  - Deployed with specialized VMs in a dedicated subnet (gateway subnet).
  - Supports VNet-to-VNet, Site-to-Site, and Point-to-Site connections.
     
    |![](/img/docs/azure-vpn-gw.png)|
    |-|
    

### Virtual Network Gateway

When a virtual network gateway is deployed, Azure provisions two or more specialized VMs under the covers. 

- These specialized VMs are not accessible
- They are deployed to a special subnet that you create. 
- This special subnet is called the **gateway subnet**. 
- The specialized VMs that get deployed contain routing tables and they run specific gateway services. 


### Creating Virtual Network Gateway

You can deploy VPN gateways in Azure Availability Zones so they can benefit from the resiliency, scalability, and higher availability that Availability Zones provide.

|![](/img/docs/azure-virtual-network-gway.png)|
|-|

Once you’ve deployed a VPN gateway, you can:

- Create an IPsec/IKE VPN connection between the VPN gateway and another endpoint, which could be another VPN gateway (to form a VNet-to-VNet connection).
   
    |[](/img/docs/azure-vnetgw-ipsec-ike.png)|
    |-|
    

- Create an IPsec/IKE VPN connection between the VPN gateway and an on-prem VPN device (to create a Site-to-Site connection). 

- You could also create a Point-to-Site VPN connection that allows you or your users to connect to the virtual network from a remote location.

For more information: [Azure VPN Gateway Documentation](https://docs.microsoft.com/azure/vpn-gateway/vpn-gateway-about-vpngateways)

  

## Azure ExpressRoute

Private, dedicated connection between on-premises networks and Microsoft Cloud services.

  - Traffic goes through connectivity providers for a secure and reliable connection.
  - Layer 3 connectivity with any-to-any, point-to-point, or virtual cross-connection options.
  - Global connectivity across geopolitical regions.
  - Dynamic BGP routing, built-in redundancy.


For more information: [Azure ExpressRoute FAQs](https://docs.microsoft.com/azure/expressroute/expressroute-faqs)


|![](/img/docs/azure-expressroute-diag.png)|
|-|


## Web Application Firewall (WAF)

Provides centralized protection for web applications against malicious attacks.

- Simplifies security management by patching known vulnerabilities centrally.
- Included in Application Gateway service and Front Door service.
   

For more information: [Web Application Firewall Overview](https://docs.microsoft.com/azure/web-application-firewall/overview)


|![](/img/docs/azure-wafff.png)|
|-|



## Azure Firewall

Cloud-based network security service for protecting Azure Virtual Network resources.
  
  - Fully stateful firewall as a service, with built-in high availability and unrestricted cloud scalability.
  - Centrally creates, enforces, and logs application and network connectivity policies.
  - Uses a static public IP address for easy identification of traffic from the virtual network.
  - Integrated with Azure Monitor for logging and analytics.
     
For more information: [Azure Firewall Documentation](https://docs.microsoft.com/azure/firewall/)


|![](/img/docs/azure-firwall-different-from-azure-waf.png)|
|-|

  

## Azure DDoS Protection

A distributed denial of service attack, or **DDoS attack**, can wreak havoc on an internet-facing application. It’s a real concern for organizations who are considering moving their workloads to the cloud because DDoS attacks can be leveled at any internet-facing endpoint.

To help mitigate these threats, you can leverage Azure DDoS Protection. By combining this service with solid application design, you can protect yourself from dangerous DDoS attacks

### DDoS Tiers

- **Basic Tier**
   - Automatically enabled in the Azure platform.
   - Provides always-on traffic monitoring and real-time mitigation of common network-level attacks.

- **Standard Tier**
   - Offers additional mitigation capabilities.
   - Mitigate volumetric attacks.
   - Configurable protection policies with dedicated traffic monitoring and machine learning.

**Implementation**
  - Apply protection policies to public IP addresses associated with resources.
  - Protects against volumetric, protocol, and application-layer attacks.

For more information: [Azure DDoS Protection Overview](https://docs.microsoft.com/azure/virtual-network/ddos-protection-overview)

  

## Virtual Network Service Endpoints

Extends the private address space of an Azure virtual network.
- Extends the identity of a virtual network to Azure services over a direct connection.
- Locks down Azure service resources to only virtual networks.
- Allows routing of service traffic from your virtual network directly to the Azure service.
- Allows auditing and monitoring of outbound Internet traffic through **forced-tunneling** without impacting service traffic.

For more information: [Virtual Network Service Endpoints Overview](https://docs.microsoft.com/azure/virtual-network/virtual-network-service-endpoints-overview)

  
