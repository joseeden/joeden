---
title: "Networking Models"
description: "The different networking models"
tags: [Networking,Cybersecurity]
sidebar_position: 2
last_update:
  date: 1/30/2024
---


## Overview

Various models, architectures, and standards facilitate the interconnection of hardware and software systems for sharing information and coordinating activities. 

1. **Provide Reliable Communications**

   - Ensure dependable communication between hosts and users.

2. **Isolate Functions in Layers**

   - Segment functions into distinct layers for better organization and management.

3. **Packets as Communication Basis**

   - Use packets as the fundamental unit of communication.

4. **Standardize Routing, Addressing, and Control**

   - Implement standardized protocols for routing, addressing, and control.

5. **Allow Additional Layer Functionality**

   - Enable flexibility for layers beyond internetworking to add functionality.

6. **Vendor-Agnostic, Scalable, and Resilient**

   - Ensure compatibility across vendors, scalability, and resilience in network design.

In the most basic form, a network model has at least two layers:


<div class="img-center">

![](/img/docs/security-tcp-ip-osi-model.png)


</div>


- **Upper Layer**
    - Also known as the host or application layer
    - Manages connection integrity
    - Controls sessions
    - Handles communication session establishment, maintenance, and termination
    - Transforms data into a universally understandable format
    - Facilitates communication between applications
    - Checks availability and accessibility of remote communication partners

- **Lower Layer**
    - Often referred to as the media or transport layer
    - Receives bits from the physical connection medium
    - Converts bits into standardized frames
    - Frames function like buckets holding water (bits)
    - Ensures controlled transportation of data within standardized frames
    - Adds route data to frames to create packets
    - Preparation for further management and processing by the upper layer

## OSI Model

The Open Systems Interconnection (OSI) Model is a conceptual framework for describing the communication structure of interconnected computer systems, comprising seven layers. 

- **Application, Presentation, and Session Layers (5-7)** - Commonly referred to as data
potential for encapsulation.

  - SNMP (Layer 7)

- **Transport Layer (4)** - Manages protocols like TCP/UDP

- **Network Layer (3)** - Handles routing and packet transmission

  - ICMP 
  - IGMP 
  - IP

- **Data Link Layer (2)** - Manages frames and devices like switche

- **Physical Layer (1)** - Converts data into binary for transmissio


### Encapsulation and De-encapsulation

Encapsulation occurs as data descends, and de-encapsulation happens as it ascends. The OSI Model aids in understanding networking terminology and processes.

The encapsulation/de-encapsulation process is best depicted visually below: 

![](/img/docs/security-encap-deencap-diagram.png)


## TCP/IP

Transmission Control Protocol/Internet Protocol (TCP/IP) is platform-independent but resource-intensive and designed for ease of use rather than security. It predates the OSI model.

  - **Application Layer** - Defines transport layer protocol


    - **Telnet** - Allows terminal emulation over the Interne

    - **File Transfer Protocol (FTP)** - Facilitates file transfers between device

    - **Simple Mail Transport Protocol (SMTP)** - Manages email transmissio

    - **Domain Name Service (DNS)** - Resolves domain names to IP addresse



  - **Transport Layer** - Facilitates data movemen


    - **TCP (Transmission Control Protocol)** - Full-duplex, connection-oriented protoco

    - **UDP (User Datagram Protocol)** - Simplex, connectionless protoco


  - **Internet Layer** - Handles packet creation and insertio


    - **Internet Control Message Protocol (ICMP)** - Determines network or link health. Used b
    tools like ping and traceroute.

    - The **ping** utility employs ICMP echo packets to assess:

        - Online status of a remote system.
        - Prompt responsiveness of the remote system.
        - Support for communications by intermediary systems.
        - Level of performance efficiency in communication among intermediary systems.

              
        <div class="img-center">

              ![](/img/docs/security-tcp-ip-protocol.png)
              

        </div>



  - **Network Interface Layer** - Manages data flow in the networ





## SYN, SYN-ACK, ACK Handshake

The SYN, SYN-ACK, and ACK handshake is a process used in the TCP (Transmission Control Protocol) to establish a connection between two devices on a network. 

- **SYN (Synchronize)** 

  - Initiates the connection request.
  - The sender indicates its intention to establish a connection.
  - The sender picks an initial sequence number.

- **SYN-ACK (Synchronize-Acknowledge)** 

  - Acknowledges the receipt of the SYN packet.
  - Indicates acceptance of the connection request.
  - The receiver also selects an initial sequence number.

- **ACK (Acknowledge)** 

  - Confirms the acknowledgment of the SYN packet.
  - Establishes the connection.
  - Data transfer can begin after the ACK is received.

This three-step handshake ensures that both the sender and receiver are ready to exchange data and have agreed upon initial sequence numbers for reliable communication.


<div class="img-center">

![](/img/docs/security-syn-ack-syn.png)


</div>


## UDP

User Datagram Protocol (UDP) is a connectionless protocol that enables fast data transmission without establishing a connection, making it suitable for low-latency applications like gaming and streaming.

- Connectionless, reducing overhead but less reliable
- No error checking or data recovery, leaving this to the application
- Lightweight, fast, and efficient for small data transmissions
- Supports broadcasting and multicasting, ideal for live broadcasts and conferencing