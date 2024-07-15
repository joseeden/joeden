<!-- ---
title: "Azure Networking "
tags: [Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Virtual Networks 

In Azure, the equivalent of a local area network is called an Azure Virtual Network or VNet. 

- Unlike traditional LANs, Azure VNets have unique characteristics. 
- Multiple customers can create VNets within the same Azure datacenter, requiring isolation from one another. 
- Additionally, not all Azure resources can reside in a VNet. - - These are just a few example of resources that can be created in a vNet:
  
  - Virtual machines
  - firewalls, and
  - Azure Kubernetes clusters 
  
- Whereas the following cannot be created in a vNet:

  - Azure SQL Database instances
  - Azure Storage containers
  - Azure Active Directory tenants

Azure Virtual Networks are foundational to Azure resource deployment, providing enhanced scalability, availability, and isolation.

- Enables secure communication across resources.
- Similar to physical networks but offers improved availability, scalability, and isolation.

### Network Communication

Resources within the same subnet can communicate via default routes created by Azure. 

- Resources in different subnets via default routes
- Users can create their own routes, known as **user-defined routes**. 
- Outbound to the internet is available by default.
- Inbound from the internet:
  - Assign a public IP address to the resource.
  - Provision a public load balancer.

### Name Resolution in vNets 

While IP addresses are crucial, referring to resources by name is often more practical. Azure provides several options for name resolution:

- **Azure-Provided Name Resolution:** Automatically provided when creating a VNet, enabling communication within the VNet using names.

- **Azure DNS Private Zones:** Used when resources need to resolve names in another virtual network. This service manages name resolution for private virtual networks.

- **Custom DNS Servers:** For resolving names of systems in an on-premises environment, users can utilize their own DNS servers or **Azure DNS**, capable of acting as a full DNS service.

  

### Key Concepts

![](/img/docs/azure-simple-vnet-diagram.png)

**Address Space**
- Defines private or public addresses conforming to RFC 1918.
- Resources in the virtual network get assigned addresses from this space.

**Subnets**
- Segment the virtual network into subnetworks, improving address space efficiency.
- Allows better security through Network Security Groups (NSGs).

**Regions**
- Virtual networks are scoped to a single region or location.
- Connectivity across regions is achieved through virtual network peering.

**Subscriptions**
- Each virtual network is scoped to a specific subscription.

  

### Best Practices for Virtual Networks

**Address Space Overlap**
- Ensure the defined virtual network address space doesn't overlap with existing network ranges.
- Critical for scenarios like site-to-site VPN connections.

**Subnet Planning**
- Avoid creating subnets that cover the entire virtual network address space.
- Plan subnets with reserved address space for future use.

**Fewer Larger Virtual Networks**
- Prefer defining fewer large virtual networks over numerous smaller ones.
- Minimizes management overhead.

**Utilize Network Security Groups (NSGs)**
- Secure virtual networks using NSGs.
- Filter network traffic with defined security rules for inbound and outbound traffic.

For more information: [Learn more about Network Security Groups](https://docs.microsoft.com/en-us/azure/virtual-network/security-overview).

(#azure-networking)</small>

## Internet Communication

- Outbound to the internet is available by default.
- Inbound from the internet:
  - Assign a public IP address to the resource.
  - Provision a public load balancer.

## Communication Between Azure Resources

### Deployment in the same vNet

Resources like VMs, Scale Sets, and App Service Environments deployed to the same virtual network can communicate with each other.

### Service Endpoints

Enables secure and direct connectivity from the virtual network to the Azure resources using a secure and optimized route over the Azure backbone network.

For more information: [Service Endpoints Overview](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview)

### Private Links

A private link can be used to privately access specific service instances from virtual network or on-prem.

For more information: [Private Link Overview](https://docs.microsoft.com/en-us/azure/private-link/private-link-overview)

### vNet Peering

Connect two virtual networks, enabling communication between Azure resources. 

For more information: [vNet Peering](#vnet-peering)

  
 
## Communication with On-Prem Networks

### Point-to-Site VPN

Connect a single computer to the virtual network.

- For each on-prem computer or client, a separate connection is used
- Typically used for remote worker access.
   

    <p>
    <img width=700 
    src="../../Images/azure-vnet-p2s-vpn-with-border.png">
    </p>


For more information: [Point-to-Site VPNs](#point-to-site-vpns)

### Site-to-Site VPN

Connect entire on-prem network to Azure virtual network.

- Secure, encrypted connection over the internet.
- Utilizes Azure VPN Gateway.
   

    <p>
    <img width=700 
    src="../../Images/azure-vnet-s2s-vpn-with-border.png">
    </p>


For more information: [Site-to-Site VPNs](#site-to-site-vpns)

### Azure ExpressRoute

Private connection between on-prem network and Azure.

- No internet flow, established through an ExpressRoute partner.
- Offers a more robust and dedicated connection.
    

    <p>
    <img width=700 
    src="../../Images/azure-expressroute-with-border.png">
    </p>

For more information: [Azure ExpressRoute](#expressroute)

  

## Filtering and Routing

Traffic filtering in production virtual networks can be done through network security groups (NSGs) and application security groups (ASGs).

- Filter traffic between subnets.
- Allow certain traffic while blocking others.

### Security Groups 

As mentioned, there are two types of security groups:

- **Network Security Groups**

    - Can be assigned to a specific NIC or entire subnet,
    - Rule specified here is applied to the NIC or all NICs and VMs on the subnet.
    - This works for most scenarios, but is still less flexible than application security groups 

- **Application Security Groups**
        
    - You can logically group NICs of different VMs on the same virtual network.
    - You can then apply NSG rules to specific groups of NICs.
    - Allows for creating different traffic rules for different groups of NICs on the same network.
    - Usig a separate ASG for each group of VMs allows you to manage the network security rules for each different group of VMs.

### Network Virtual Appliances (NVA)

An NVA is a virtual machine performing specific network tasks 

- Act as a firewall
- Provide WAN optimization.
- Examples include Barracuda CloudGen WAF for Azure, Citrix SD-WAN Center.

### Route Tables 

**Default Routing**
Azure handles routing by default between subnets, vNets, on-prem networks, and the internet. To enable custom routes, use route tables and BGP routes.

**Route Tables**
Custom tables that allows you to define custom routes for subnets.

**BGP Routes**
Propagates on-prem BGP routes to Azure virtual networks, through the use of:
- Azure VPN Gateway
- ExpressRoute connection

For more information: [BGP Routes](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-bgp-overview?toc=/azure/virtual-network/toc.json)


  

## vNet Peering 

<p align=center>
<img width=900 
src="../../Images/azure-expressroute-with-border.png">
</p>

In scenarios requiring seamless connectivity between distinct Azure virtual networks, a solution that you can use is Virtual Network Peering, or **vNet Peering**. 

- Enables smooth integration of different Azure virtual networks, presenting them as a unified entity. 
- All inter-network traffic utilizes the robust Microsoft backbone infrastructure.
- Peering can be created without downtime.
- For vNets in different regions, use **Global vNet Peering.**

### Key Features

- **Compatibility:**
  - Connects networks created via Azure Resource Manager, including those from the classic deployment model.

- **No Downtime:**
  - Peering creation and completion cause no downtime for associated resources.

- **Privacy and Security:**
  - Traffic remains private, bypassing the need for public Internet, gateways, or encryption.

- **Consistent Latency:**
  - Latency between VMs on peered virtual networks mirrors that within a single virtual network.

- **Security Groups Integration:**
  - Apply network security groups to control access between peered virtual networks or subnets.

### Types of Peering

1. **Virtual Network Peering**
   - Connects virtual networks within the same Azure region.

2. **Global Virtual Network Peering**
   - Links virtual networks deployed in different Azure regions.

Whether opting for local or global peering, both choices offer low-latency, high-bandwidth connectivity. This connectivity spans across virtual networks in diverse Azure subscriptions, Azure Active Directory tenants, and Azure regions.

  

## VPN Gateway 

A VPN Gateway is a specialized virtual network gateway used for encrypted network traffic over the public internet, and can be used to connect:

- Azure virtual network to on-prem network
- Azure virtual network to another Azure virtual network

Note that only one VPN gateway can be defined per virtual network. However, a VPN gateway can support multiple connections to it.

**How it works**
Azure deploys at least two hidden VMs in a specified gateway subnet.
- Hidden VMs contain routing tables and gateway services.
- VMs are not visible or configurable by users.
- Deployment of VPN gateways can take up to 45 minutes to complete.
  
**Gateway Types**
The type of VPN gateway is specified during deployment:
  - "VPN" type for typical VPN connections.
  - "ExpressRoute" for configuring an ExpressRoute connection.

**After Deployment**
Once the VPN Gateway is deployed, you can create an IPSec or IKE VPN tunnel between the newly deployed vNet gateway and any one of a number of other gateways.
- vNet-to-vNet connection to another VPN gateway in Azure.
- Site-to-site connection to an on-prem VPN device.
- Point-to-site connection for remote location access.

For more information: [Azure VPN Gateway Documentation](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways)

  


## Point-to-Site VPNs 

<p align=center>
<img width=900 
src="../../Images/azure-vnet-p2s-vpn-with-border.png">
</p>

A Point-to-Site (P2S) VPN gateway connection is a secure means to link a single client computer to an Azure virtual network, often favored by remote workers seeking access to Azure resources. This connection type is initiated directly from the client computer.

### Protocols 

When creating a P2S VPN, you have the flexibility to select from various protocols:

- **OpenVPN Protocol:**
  - SSL/TLS-based, it traverses firewalls through TCP port 443 outbound.
  - Compatible with Android, Windows, Linux, and Mac OSX.

- **Secure Socket Tunneling Protocol (SSTP):**
  - Proprietary VPN protocol leveraging TLS.
  - Penetrates firewalls, but exclusively supports Windows devices.

- **IKEv2 VPN:**
  - Standards-based IPSec VPN solution.
  - Suitable for connecting from Mac OSX devices.

### Authentication Methods

Users initiating a P2S VPN connection to Azure must undergo authentication which can done through various methods:

- **Azure Certificate Authentication:**
  - Requires a client certificate on the connecting device, validated by the VPN gateway during the connection handshake.

- **Azure AD Authentication:**
  - Users connect using Azure AD credentials, supported only for OpenVPN protocol.
  - Windows 10 necessitates the Azure VPN Client for compatibility.

- **Traditional AD Domain Authentication:**
  - Users in a traditional AD domain are authenticated via a RADIUS server integrated with the domain controller.

### Gateway SKUs Supporting P2S VPNs

Refer to the table below for Azure gateway SKUs supporting Point-to-Site VPNs:

| Gateway SKU           | P2S VPN Support |
|-----------------------|-----------------|
| Standard              | Yes             |
| HighPerformance       | Yes             |
| VpnGw1                | Yes             |
| VpnGw2                | Yes             |
| VpnGw3                | Yes             |

For more information: [official documentation](https://docs.microsoft.com/en-us/azure/vpn-gateway/point-to-site-about). 

  

## Site-to-Site VPNs 

<p align=center>
<img width=900 
src="../../Images/azure-vnet-s2s-vpn-with-border.png">
</p>

When bridging on-premises networks to Azure virtual networks, the go-to solution is often a Site-to-Site VPN gateway. 

- This connection type establishes a secure IPSec or IKE VPN tunnel, linking your on-prem network to the Azure vNet. 
- The key ingredient for deploying this connection is a VPN device on-premises, equipped with a public IP address for seamless communication with the Azure VPN gateway.

### Creating the Connection

1. **Azure Virtual Network Setup:**
   - Begin by crafting the Azure virtual network that will connect to your on-prem network.

2. **Gateway Subnet and VPN Gateway Creation:**
   - Establish a gateway subnet within your virtual network.
   - Next, create the VPN gateway. 
   - While the gateway subnet takes only minutes, deploying the VPN gateway may take up to 45 minutes.

3. **Local Network Gateway Setup:**
   - Once the VPN gateway is in place, set up the local network gateway, symbolizing the on-premises endpoint of the impending VPN connection.

4. **Configuration of On-Prem VPN Device:**
   - Customize the on-premises VPN device configuration. 
   - Note: The process may vary based on your specific device.

5. **Azure VPN Connection Deployment:**
   - With both VPN and local network gateways ready, deploy the VPN connection in Azure. 
   - This step establishes the site-to-site link between the Azure VPN gateway (representing the Azure side) and the local network gateway (representing the on-prem endpoint).

6. **Verification of Connection:**
   - After provisioning the VPN connection, thorough verification is crucial to ensure a seamless and secure link between on-premises and Azure networks.

  

## Routing Options for VPNs 

There are two types of routing: 

- **Policy-based**

  - In almost every case, route-based is the right option. 
  - Not only is it more robust, but it’s the only supported option for point-to-site connections.

- **Route-based** 

  - Doesn not support point-to-site connections from the same VPN Gateway. 
  - Since only one VPN Gateway is allowed per virtual network, you’d have to create a second virtual network to support the other VPN Gateway. 
  - his isn’t a common scenario

If you don’t want your connection to go over the internet or you need more bandwidth, then you can set up a direct connection using Azure ExpressRoute.

## ExpressRoute 

<p align=center>
<img width=900 
src="../../Images/azure-expressroute-with-border.png">
</p>

Microsoft ExpressRoute is a powerful solution for extending on-premises networks into Azure, providing a private connection facilitated by third-party connectivity providers. 

Unlike traditional site-to-site connections that traverse the public internet, ExpressRoute ensures enhanced security, reliability, and speed.

### Connectivity Options

- **Any-to-Any Network**
  - Establish connectivity from any network to Azure.

- **Point-to-Point Ethernet Network**
  - Direct, dedicated connection between on-premises and Azure.

- **Virtual Cross-Connection**
  - Facilitated through a connectivity provider at a co-location facility.

### Ways to Connect to ExpressRoute 

There are four ways to connect to Azure using ExpressRoute. It all comes down to where you have your IT infrastructure.

![](/img/docs/azure-express-route-connection-options.png)

- **ExpressRoute Location:** 

  - Known as **ExpressRoute Direct**.
  - Many organizations put at least some of their IT systems in a **colocation facility**, which is a datacenter that rents space to multiple customers.
  - Microsoft has designated some of these colocation facility as an ExpressRoute location
  - Connect directly to Microsoft's network via a Microsoft Enterprise Edge device.
  - Supports high bandwidths of 10 or 100 gigabits per second.

- **Cloud Exchange Location:**  

  - Connect through a Service Provider.
  - If you are in a peering location or a “**cloud exchange**”, but you need less than 10 gigabits per second of bandwidth,
  - Offers bandwidth options between 50 megabits and 10 gigabits per second, with the service provider managing certain aspects of the connection.
  - The service provider can also take care of some of the management tasks involved
  - If not in an ExpressRoute location, connect to Microsoft's network through a service provider. 

- **IPVPN Provider:**  
  - Some organizations use an IPVPN provider to connect their branch offices and datacenters to their core network. 
  - This is called **any-to-any connectivity**.

- **Leased Line:**

  - Rent a leased line from a point-to-point Ethernet provider to connect your datacenter to an ExpressRoute location.

### Additional Features

- **Connecting to Microsoft 365:** 

  - ExpressRoute can also be used to connect to Microsoft 365, although direct connection needs are less common than for Azure.

- **ExpressRoute Global Reach:** 

  - Connect branch offices worldwide through the Microsoft network, bypassing the internet. 
  - Additional costs apply for this feature.


### Key Benefits

- **Enhanced Security:**
  - Connections bypass the public internet.

- **Global Connectivity:**
  - Access Microsoft cloud services across all regions with the ExpressRoute premium add-on.

- **Dynamic Routing with BGP:**
  - Enables dynamic routing between on-prem networks and Microsoft.

- **Built-in Redundancy:**
  - Ensures higher reliability with a 99.95% connection uptime SLA for dedicated circuits.

### Bandwidth Options

Choose from a range of ExpressRoute circuit bandwidths:

- 50 Mbps
- 100 Mbps
- 200 Mbps
- 500 Mbps
- 1 Gbps
- 2 Gbps
- 5 Gbps
- 10 Gbps

**Scalability Bonus:** Increase bandwidth without tearing down existing connections.

### Billing Models

1. **Unlimited Data Billing:**
   - Monthly fee offering unlimited inbound and outbound transfer.

2. **Metered Data Billing:**
   - Monthly fee with free inbound data transfer; outbound data transfer charged on a per-GB basis.

### ExpressRoute Premium Add-On

- **Route Limits:**
  - Increases Azure public and private peering route limits from 4,000 to 10,000.

- **Global Connectivity:**
  - Expands connectivity globally (excluding national clouds).

- **vNet Links:**
  - Raises the default limit of 10 vNet links per circuit based on circuit bandwidth.

For more information: [ExpressRoute FAQ](https://docs.microsoft.com/en-us/azure/expressroute/expressroute-faqs)

  

## Private Endpoints 

In the Azure ecosystem, not all resources, such as Azure SQL Database instances and Azure Storage containers, can be directly placed within a virtual network. 

As a solution we'll need to us a **private endpoint** which provides a secure and indirect way to integrate these external resources into a virtual network.

- Represents a private IP address within a virtual network, establishing a connection to an Azure resource outside of the VNet. 
- This addresses the security concerns associated with public endpoints, which expose resources to the internet.

### Benefits of Private Endpoints

- **Enhanced Security:** By creating a private endpoint for an Azure resource, the associated public endpoint can be disabled, limiting access to the resource to connections over the Microsoft backbone network from the associated VNet.

- **Private Link Support:** Not all Azure resources can be connected to a private endpoint. The resource must be hosted by a service supporting **Private Link**, which acts as the underlying technology for connecting private endpoints to services.

**Sample Scenario:**

![](/img/docs/azure-private-endpoints.png)

In the example above, we have virtual machine (VM) running an application needs to store data in an Azure SQL Database instance named DB1. 

Here's a step-by-step process:

- **Create a Private Endpoint:** 

  - Set up a private endpoint, e.g., PrivateSqlEndpoint, in a designated subnet (e.g., Sub1) within the virtual network (e.g., Vnet1).

- **Configure the Private Endpoint:** 

  - Specify the target of the private endpoint to be DB1, connecting the endpoint to the desired Azure resource.

- **Configure Database Connectivity:** 

  - In the configuration of DB1, set its connectivity method to private endpoint. 
  - Optionally, disable public access to the database to restrict accessibility to the private endpoint.

- **Application Access:** 

  - With this setup, the application on the VM can access DB1 by connecting to the IP address of PrivateSqlEndpoint. 
  - The Private Link service ensures traffic is securely routed over Microsoft's backbone network from the private endpoint to the database.

### Custom Private Link

Microsoft has extended the utility of private endpoints by allowing the setup of custom Private Link services. This empowers organizations to establish private connections for their own applications, enhancing the versatility of private endpoints.

![](/img/docs/azure-custom-private-link-services.png)

### Peered VNets and On-Premises Environments

Whether your VNet is peered to another VNet or connected to an on-premises environment, resources in these networks can securely access external Azure resources through private endpoints.

![](/img/docs/azure-peered-vnets-onprem.png)

  





## Resources 

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/) -->
