---
title: "Docker Networking"
description: "Networking for containers"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 17
last_update:
  date: 7/7/2022
---

## Container Network Model

Docker’s **Container Network Model** divides networking into key components:

- **Sandboxes**: 
  - Isolate containers on the same Docker node.
  - Prevent direct communication.

- **Endpoints**: 
  - Act as virtual NICs.
  - Allow container connectivity.

- **Networks**: 
  - Create a simulated network.
  - Connect containers through endpoints.

- **libnetwork**: 
  - Manages network resources.
  - Comprises control and management planes.

## Driver

Drivers facilitate container networking. Available drivers in Linux include:

- **bridge**: 
  - Default networking option.
  - Functions as a NAT.

- **host**: 
  - Connects directly to the node's network.
  - Bypasses NAT.

- **overlay**: 
  - Supports communication across multiple nodes.
  - Allows encryption for security.

- **macvlan**: 
  - Connects containers to internal LANs.
  - Provides unique IP and MAC addresses.

To create a separate network:

```bash
docker network create -d <driver> <name>
```

## Network Types

- **Single-host Bridge Network**:
  - Containers run on a single node using the bridge driver.

- **Single-host Host Network**:
  - Containers run on a single node using the host driver.
  - Bypasses isolation, allowing access to the node’s network stack.

- **Multi-host Overlay Network**:
  - Containers run on multiple nodes using the overlay driver.
  - Virtual switch spans all hosts (VXLAN).

- **Existing Network**:
  - Connects containers to local network infrastructure across multiple nodes.
  - Not compatible with public clouds (promiscuous mode).
  - Uses macvlan or transparent driver.

## Overlay Networks

In an overlay network:

- Containers operate on multiple nodes with a virtual switch spanning all hosts (VXLAN).
- Uses the overlay driver.
- Supports Docker "swarms."
- Control plane is encrypted by default.
- Data plane can be encrypted using `-o encrypted`.

To create an overlay network:

```bash
docker network create -d overlay <name>
```

To create services for swarms:

```bash
docker service create --name <name> \
    --network <name> \
    --replicas 2 \
    <image>
```

## VXLAN 

Overlay networks leverage VXLAN, which creates a layer 2 network on top of layer 3:

- Established as needed on an existing L3 network.
- Uses encapsulation to add VXLAN information to L3 packets.
- Creates a tunnel between containers via VXLAN Tunnel Endpoint (VTEP).