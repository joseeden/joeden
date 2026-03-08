---
title: "Neutron"
description: "Neutron – Networking"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 22
last_update:
  date: 9/15/2023
---


## Overview

Neutron is a core OpenStack service for networking. It allows users to create and manage virtual networks, routers, and network services. 

- Neutron is modular and flexible
- Supports L2 networks, L3 subnets, and virtual routers
- Supports virtual load balancers, firewalls, and VPN as a service
- Enables micro-segmentation using security groups and flow rules
- Supports service function chaining for NFV environments

Neutron complexity affects both deployment design and installation. Its architecture uses plugins, drivers, and agents to manage overlay networks.

:::info 

Neutron replaced an older OpenStack networking service called *Quantum*, which was introduced in the Folsom release. Before Quantum, networking for Nova components was handled by Nova Networking, a subcomponent of Nova. The service was later renamed from Quantum to Neutron due to a trademark conflict, as the name “Quantum” was already used by a tape-based backup system.

:::

<div class='img-center'>

![](/img/docs/Screenshot2026-03-08012422.png)

</div>

## Networks in OpenStack

OpenStack networking involves two layers:

1. Infrastructure networks – physical networks connecting the OpenStack nodes
2. Neutron virtual networks – logical networks used by VMs and tenants

### Infrastructure Networks

These networks connect the physical nodes in your OpenStack deployment. These networks are configured on the servers and are not created by Neutron.
<!-- 
- Management network 
- API network 
- Data network 
- External/Provider network -->

<div class='img-center'>

![](/img/docs/all-things-openstack-neutron-networks-infra.png)

</div>


#### Management Network 

The management network is used for internal communication between OpenStack services.

- Used for internal service communication
- Connects all nodes (controller, compute, network, storage, etc.)
- Usually **private and not exposed to the internet** 

Used by services such as:

- Nova
- Neutron
- Glance
- Keystone
- RabbitMQ
- Databases

Typical traffic:

- RPC messaging
- Database queries
- service-to-service API calls

#### API Network  

The API network is used for accessing the Openstack APIs. 

- Keystone
- Nova API
- Neutron API
- Glance API

Used by:

- OpenStack dashboard
- CLI clients
- automation tools

It can created as a **separate network** for... 

For labs and small deployments, this may be combined with **management** or **external** network  

#### Data Network (Tenant/Overlay) 

This network is used for VM (tenants) traffic **between compute nodes**. 

- Connects to both compute and network nodes
- Carries overlay network tunnels
- Uses VXLAN, GRE, or VLAN tunnels  

**Note:** 

- This network does NOT carry Internet traffic. 
- It carries encapsulated VM traffic between hypervisors.


#### External Network (Internet)

The external network connects the network node to physical router for internet access  .

- Used by north-south traffic 
- Provides floating IPs and NAT/SNAT 

This network is often called:

- External network
- Provider network
- Public network

### Neutron Virtual Networks

Neutron virtual networks are **logical** constructs created by NNeutron to connect the tenants to their VMs. They exist on **top of the infrastructure networks.**

<!-- - Tenant/Internal networks  
- External network (Neutron object)   -->

<div class='img-center'>

![](/img/docs/all-things-openstack-neutron-networks-virtual.png)

</div>



#### Tenant/Internal Network

This is the network that the VMs actually attach to, amd optionally to external networks via a router.

- Created by projects/tenants  
- Isolated L2 segments (from other tenants)
- Uses overlays, such as VSLAN, GRE, VLAN 

Example:

```bash
VM-1 ---- tenant network ----- VM-2 
```

Here, the traffic stay inside the OpenStack cloud unless routed externally. 


#### External Network (Neutron)  

This is a Neutron network that represents the external connectivity for VMs. 

- It maps to the physical provider network.
- Maps to provider/external network on network node  
- Provides north-south connectivity for VMs  
- Used for floating IPs and external connectivity 

Example:

```bash
VM-1 ---> Router ---> External network ---> Internet 
```

## Networking Concepts in Neutron

Below are some basic networking concepts used in Neutron which Allows OpenStack to manage complex networking environments.

- **Network**

   - Isolated Layer-2 segment, similar to a VLAN
   - Provides isolation between tenant networks
   - Can contain one or more subnets

- **Subnet**

   - A block of IP addresses associated with a network.
   - Defines IP address ranges and gateway configuration
   - Multiple subnets can exist within a single network

- **Port**

   - A connection point that attaches a device to a network.
   - Represents a virtual network interface
   - Used by instances, routers, and DHCP services
   - Like  physical switch ports, but  on a virtual switch.

- **Router**

   - Routes traffic between subnets
   - Provides NAT and floating IP functionality
   - Allows instances to access external networks

## The Basic Neutron Process

The following steps show what happens in Neutron when a new VM is created. These actions occur during the **Layer-2 networking stage**.

1. **VM boot starts**

    - Nova begins the virtual machine creation process.
    - Neutron networking is prepared for the instance.

2. **Port is created**

    - Neutron creates a virtual network port for the VM.
    - The DHCP service is notified about the new port.

3. **Virtual device is created**

    - The virtualization layer (such as `libvirt`) creates the VM network interface.
    - The interface represents the VM inside the hypervisor.

4. **Port is wired**

    - The VM interface is connected to the Neutron network.
    - The virtual switch links the interface to the correct network segment.

5. **VM boot completes**

    - The instance finishes starting.
    - The VM can now obtain an IP address and communicate on the network.

## Neutron Architecture

Like Nova, Neutron has control and user plane components. Its key services include:

- API server installed on controller nodes
- SQL database for state and messaging
- Message queue for RPC between components
- L2 plugin and agents for DHCP, metadata, L3, load balancer, and firewall

Network nodes may require high CPU, RAM, and NICs for heavy workloads like virtual routers or load balancers. Small demo setups can combine all components on a single controller.

<center><small>All-in-one Controller</small></center>

<div class='img-center'>

![](/img/docs/all-things-openstack-neutron-single-on-controller.png)

</div>

<center><small>Controller + Network Node</small></center>

<div class='img-center'>

![](/img/docs/all-things-openstack-neutron-controller-network-nodes.png)

</div>

Neutron also runs plugin agents on compute nodes to handle the mechanism driver for the chosen underlay switching technology.

<div class='img-center'>

![](/img/docs/all-things-openstack-neutron-drivers-plugin-agents.png)

</div>

## Neutron Components 

In most OpenStack documentations, the main Neutron components are:

- Neutron Server
- L2 Agent
- L3 Agent
- DHCP Agent
- Metadata Agent
- Database
- Message Queue

### The Neutron server

The Neutron server is the central control service of Neutron. It receives API requests and coordinates networking operations across the environment. It is made up of three modules:

- **REST Service (API)**

  - Handles incoming API requests from clients
  - Validates requests from users and services
  - Sends requests to appropriate Neutron modules   
  - Interacts with the database to store network state

- **RPC Service**

  - Enables communication between Neutron services and agents
  - Uses the message queue to send instructions
  - Triggers actions such as port creation or network updates

- **Plugin Framework**

  - Integrates Neutron with networking backends
  - Translates API requests into backend operations
  - Loads core plugins and optional service plugins

Plugins are further divided into two types:

- **Core plugins**

  - Implements the core Neutron API
  - Provides Layer-2 networking and IP address management

- **Service plugins**

  - Provides additional network services
  - Examples include load balancing and firewall services

A common implementation is the **ML2 (Modular Layer 2) plugin**, which allows Neutron to support multiple Layer-2 networking technologies used in datacenters through pluggable drivers.

### Layer-2 Agent

The Layer-2 agent runs on the hypervisor (compute nodes) and manages virtual networking for instances.

- Connects virtual machines to Neutron networks
- Configures virtual switches on the hypervisor
- Notifies Neutron when ports are created or removed

### Layer-3 Agent

The Layer-3 agent runs on the network node and provides routing services between Neutron networks.

- Manages virtual routers
- Performs NAT between internal and external networks
- Handles floating IP address routing

The L3 agent allows instances to communicate with external networks such as the internet.

### DHCP Agent

The DHCP agent runs on the network node and provides DHCP services to instances.

- Assigns IP addresses to instances
- Configures DNS and gateway information
- Manages DHCP leases for Neutron ports

### Metadata Agent

The metadata agent runs on the network node and provides instance metadata services.

- Provides instance metadata to VMs via the metadata API
- Talk to Nova to retrieve instance information

## ML2 (Modular Layer 2) Plugin

The **ML2 (Modular Layer 2) plugin** is the default Neutron networking plugin. It provides a framework that allows OpenStack to support multiple Layer-2 networking technologies through pluggable drivers. 

ML2 separates networking functions into several driver types, which allows OpenStack to work with different virtual switches, overlays, and hardware networks.

<div class='img-center'>

![](/img/docs/all-things-openstack-neutron-ml2.png)

</div>


## ML2 Key Components

### Type Drivers

Type drivers define the **network encapsulation type** used by Neutron networks.

- Determine how tenant networks are created
- Define segmentation mechanisms such as VLAN or VXLAN

### Mechanism Drivers

Mechanism drivers connect Neutron to the **actual networking backend**. They translate Neutron networking operations into actions performed by the underlying virtual switch or network device.

:::info 

Mechanism drivers belong inside the ML2 plugin, which itself runs inside the Neutron server. They are usually described as **part of the ML2 plugin architecture**, not a standalone Neutron component.

:::

Common mechanism drivers:

- **Linux Bridge**: simple, for small or demo setups
- **Open vSwitch**: robust, supports complex topologies
- **VMware NSX**: integrates with VMware virtualization

Mechanism drivers may also integrate with hardware networking platforms such as:

- Cisco
- NEC
- Arista
- Juniper
- Huawei

Open-source SDN controllers may also be used:

- OpenDaylight
- Tungsten Fabric (formerly OpenContrail)

**UPDATE:** Newer OpenStack releases may introduce additional drivers and configuration options. For more information, please see [Neutron Plugins and Drivers](https://wiki.openstack.org/wiki/Neutron_Plugins_and_Drivers)

### Extension Drivers

Extension drivers add additional networking features.

Examples include:

- Port security
- Quality of Service (QoS)
- DNS integration

## ML2 Supported Network Types

| Network Type | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| Local        | Network exists only on a single compute node                   |
| Flat         | Untagged Layer-2 network mapped directly to a physical network |
| VLAN         | Uses VLAN tags to isolate tenant networks                      |
| GRE          | Overlay tunnel network used for tenant isolation               |
| VXLAN        | Encapsulated overlay network commonly used in OpenStack        |

## ML2 Plugin Configuration

ML2 plugin defines virtual network types and mechanism drivers.

- `type_drivers`: flat, VLAN, VXLAN
- `tenant_network_types`: enables VXLAN for project networks
- `mechanism_drivers`: Linux Bridge or Open vSwitch
- `extension_drivers`: enable L2 functions, like port security, QoS, etc.

### Linux Bridge

For Linux Bridges, below are the files that needs to be configured:

- `plugins/ml2/ml2_conf.ini`

    Maps provider networks and VXLAN ranges to compute node interfaces.

    ```ini
    [ml2]
    type_drivers = flat,vlan,vxlan 
    tenant_network_types = vxlan
    mechanism_drivers = linuxbridge,l2population
    extension_drivers = port_security

    [ml2_type_flat]
    flat_networks = provider  ## name of provider network

    [ml2_type_vxlan]
    vni_ranges = 1:1000

    [securitygroup]
    enable_ipset = True
    firewall_driver = iptables_hybrid
    ```


- `plugins/ml2/linuxbridge_Agent.ini`:

    ```bash
    [linux_bridge]
    physical_interface_mappings = profiver:eth1 

    [vxlan]
    enable_vxlan = True
    local_ip = ENTER-OVERLAP-INTERFACE-IP  
    l2_population = true 

    [securitygroup]
    enable_security_group = true 
    firewall_driver = neutron.agent.linxu.iptables_firewall.IptablesFirewallDriver
    ```

    **Note:** Configure agents according to mechanism driver:

    - L3 agent: interface driver (Linux Bridge or OVS)
    - DHCP agent: interface driver (Linux Bridge or OVS)
    - Security group driver defined in agent INI files

    Multiple agents can be installed on network nodes to handle heavy workloads.

- `l2_agent.ini` 

    ```bash
    [DEFAULT]
    interface_driver = linuxbridge 
    ```

- `dhcp_agent.ini` 

    ```bash
    interface_driver = linuxbridge 
    dhcp_driver = neutron.agent.linux.dhcp.Dnsmasq 
    enable_isolated_metadata = true
    ```

### Open vSwitch 

For Open vSwitch:

- `plugins/ml2/ml2_conf.ini` 

    ```bash
    [ml2] 
    type_drivers = flat,vlna,vxlan 
    tenant_network_types = vxlan 
    mechanism_drivers = openvswitch.l2population 
    vni_ranges = 1:1000 
    ```

    To create OVS provider bridge `br-provider`:

    ```bash
    ovs-vsctl add-br br-provider 
    ```

- `plugins/ml2/openvswitch_agent.ini` 

    ```ini
    [ovs]
    bridge_mappings = provider:br-provider
    local_ip = ENTER-INTERFACE-IP

    [agent]
    tunnel_types = vxlan
    l2population = True 

    [securitygroup]
    firewall_driver = iptables_hybrid
    ```

- `l3_agent.ini`

    ```bash
    [DEFAULT]
    interface_driver = openvswitch 
    external_network_bridge = 
    ```

- `dhcp_agent.ini` 

    ```bash
    interface_driver = openvswitch
    dhcp_driver = neutron.agent.linux.dhcp.Dnsmasq
    enable_isolated_metadata = true
    ```

## Network Node and Interfaces

Before configuration:

- Ensure network nodes can access management and provider networks
- Provider networks connect floating IPs and external routers
- Compute nodes may run L3 agents for distributed routing

In production environments, it is recommended to separate management traffic from tenant traffic for better security and performance. DNS resolution can also be implemented to further simplify network operations and management.

## Neutron Server Deployment

Neutron does not require a separate server. In most deployments, the Neutron server runs on the controller node together with other OpenStack control services.

- Neutron API/server runs on the controller node
- Network agents may run on separate network nodes
- Large deployments often use dedicated network nodes

In small environments or demo labs, all Neutron components can run on the controller node.

- Neutron server
- L3 agent
- DHCP agent
- Metadata agent
- ML2 plugin
- Mechanism driver (Linux Bridge or Open vSwitch)

In larger deployments, Neutron services are distributed across multiple nodes.

- Controller nodes run the Neutron API server
- Network nodes run L3, DHCP, and metadata agents
- Compute nodes run the mechanism driver agent

For more information, please see [Installing Neutron.](/docs/038-OpenStack/005-Manual-Install/030-Install-Neutron.md)

### Control Plane 

On the controller:

1. Create SQL database for Neutron
2. Create OpenStack user, service, and endpoints
3. Install Neutron packages (server, ML2 plugin, L3, DHCP, metadata agents)
4. Configure mechanism driver (Linux Bridge or Open vSwitch)

Configuration is stored in `/etc/neutron/neutron.conf` and plugin/agent `INI` files.

### User Plane 

On compute nodes:

1. Configure network interfaces and DNS
2. Install ML2 plugin agent
3. Configure `neutron.conf` with authentication and control plane settings
4. Configure mechanism driver agent (Linux Bridge or OVS)


## Key Neutron Parameters

In `neutron.conf`:

| Parameter                       | Description                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `core_plugin`                   | Typically `ml2`                                                                       |
| `service_plugins`               | Additional services such as routers, load balancer, firewall                          |
| `allow_overlapping_ips`         | `true` or `false`                                                                     |
| `transport_url`                 | Connection string for the message queue                                               |
| `auth_strategy`                 | Usually `keystone`                                                                    |
| `notify_nova_on_port_changes`   | Sends notifications to Nova when a port is created, deleted, or updated.              |
| `notify_nova_on_status_changes` | Sends notifications to Nova when a port’s operational status changes (e.g., up/down). |

In `metadata_agent.ini`:

| Configuration                             | Description                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `metadata_host`                           | Hostname or IP of the metadata service, usually the **controller** or a **load balancer virtual IP**. |
| `metadata_proxy_shared_secret`            | Shared secret used between Neutron metadata agent and Nova metadata service for secure communication. |

In `/etc/nova/nova.conf` (`neutron` section):

| Configuration                             | Description                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `url`                                     | Endpoint URL for the Neutron service.                                                                 |
| `auth_url`                                | Keystone authentication URL used for service authentication.                                          |
| `auth_type`                               | Authentication method, typically `password`.                                                          |
| `project_domain_name`                     | Keystone domain name of the service project.                                                          |
| `user_domain_name`                        | Keystone domain name of the service user.                                                             |
| `project_name`                            | Name of the service project used for authentication.                                                  |
| `region_name`                             | OpenStack region where the service is located.                                                        |
| `username`                                | Service account username used by Nova to authenticate with Neutron.                                   |
| `password`                                | Password for the service account.                                                                     |
| `service_metadata_proxy`                  | Enables Nova to act as a metadata proxy service for instances.                                        |
| `metadata_proxy_shared_secret`            | Same shared secret configured in Neutron metadata agent to secure metada_                             |

**UPDATE:** Parameter names may vary slightly in newer OpenStack releases (e.g., Yoga, Zed).


