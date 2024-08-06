---
title: "Hardware Security"
description: "Securing hardware memory and interfaces"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 64
last_update:
  date: 1/30/2024
---

## Memory Management

Memory management is an important aspect of operating system functionality, ensuring that applications and processes operate efficiently. The operating system manages memory allocation and access to optimize performance and prevent conflicts.

- Tracks which applications use each segment of memory.
- Grants requests for additional memory.
- Frees up memory that is no longer needed.

The operating system also protects memory by enforcing access rules, ensuring that processes do not access memory segments outside their designated areas.

### Segmentation Fault

A segmentation fault indicates a program's illegal access to memory, often due to programming errors or misconfigurations.

- Results in the termination of the program by the operating system.
- Commonly associated with programming bugs, such as accessing uninitialized pointers.
- Can be debugged using tools like gdb to trace memory access violations.

### Memory Leaks

Memory leaks occur when a program does not release memory that is no longer needed, which can lead to inefficient use of system resources.

- Detected using memory profiling tools like Valgrind.
- Often caused by failing to free dynamically allocated memory.
- Can impact system performance by exhausting available memory over time.

## Interfaces

Interfaces in computing facilitate communication between systems and components. The primary types are:

- **Physical Interface**

  - Tangible connections like USB ports or network cards.
  - Ports for devices such as HDMI or Ethernet.
  - Interaction points for peripherals like keyboards and printers.

- **Virtual Interface**

  - Software connections like APIs or virtual network adapters.
  - Interfaces in virtual machines for network communication.
  - Software-based interaction points for application integration.

## Covert Channel

Covert channels transmit information secretly to bypass security measures: These are interfaces that weren't planned by the developers but may be exploited by malicious users to exfiltrate information from a sensitive system to the outside world.

- **Covert storage Channels**
  - Placing data in an unexpected location where it may be read by another individual/system.
  - Encode data in shared storage like files or memory.
  - Hide information in unused file attributes or metadata.
  - Example: 
    - The ICMP echo request packet may allow the sender to include arbitrary data in the packet payload
    - This packet is usually left blank.
    - If a network allows outbound ICMP packets, a user can send modified ping packets to remote system.
    - The echo request payload can then be used to transmit data covertly.

- **Covert timing Channels**

  - Use timing variations to encode and transfer data.
  - Exploit process delays for hidden communication.
  - May include the use of a network or changing a system's electicity use.
  - Example:
    - **Port knocking** allows a user to send data to a remote system.
    - This will proble different network ports in a specific order to transmit information slowly.

- **Resource Usage Channels**

  - Manipulate resource usage to transfer information.
  - Create patterns in system resources for covert data transfer.