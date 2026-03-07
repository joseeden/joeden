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


## Mechanism Drivers

The mechanism driver connects Neutron to the physical network. 

Common drivers:

- **Linux Bridge**: simple, for small or demo setups
- **Open vSwitch**: robust, supports complex topologies
- **VMware NSX**: integrates with VMware virtualization

Common hardware switches: 

- Cisco
- NEC
- Arista
- Juniper
- Huawei SDN

Open-source options: 

- Opendaylight
- Tungsten Fabric (formerly OpenContrail)

**UPDATE:** Newer OpenStack versions may support additional drivers and updated syntax.


## Network Node and Interfaces

Before configuration:

- Ensure network nodes can access management and provider networks
- Provider networks connect floating IPs and external routers
- Compute nodes may run L3 agents for distributed routing

In production environments, it is recommended to separate management traffic from tenant traffic for better security and performance. DNS resolution can also be implemented to further simplify network operations and management.

## Neutron Server Setup

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

In `/etc/nova/nova.conf`:

Configure `neutron` section for notifications

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


## ML2 Plugin Configuration

ML2 plugin defines virtual network types and mechanism drivers.

- `type_drivers`: flat, VLAN, VXLAN
- `tenant_network_types`: enables VXLAN for project networks
- `mechanism_drivers`: Linux Bridge or Open vSwitch
- `extension_drivers`: enable L2 functions, like port security, QoS, etc.

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




