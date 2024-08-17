---
title: "Embedded Systems"
description: "Specialized computing systems with specific functions"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 58
last_update:
  date: 1/30/2024
---


## Overview

Embedded systems are **specialized** computing systems designed to perform specific functions within larger systems or devices. They are typically built with microcontrollers or microprocessors and are embedded into products to control and monitor various operations. 

Examples:

- Consumer electronics (smartphones, smart TVs)
- Automotive systems (engine control units, infotainment systems)
- Industrial machinery (robotics, factory automation)
- Medical devices (pacemakers, infusion pumps)
- Home appliances (washing machines, thermostats)

Embedded systems often operate in **real-time** and have resource constraints such as limited memory, processing power, and energy. 

### Types of Embedded Systems 

Types: 

- IoT 
- ICS and SCADA systems
- Medical systems 
- In-vehicle computing systems 
- Unmanned Aerial Vehicles (UAV) - "drones"
- Smart Meter 
- Surveillance systems 
- Voce over IP (VoIP)
- Mobile systems (laptops, handheld devices)

### Real Time Operating Systems 

An RTOS is an operating system designed to manage real-time tasks with strict timing requirements. It provides services such as task scheduling, memory management, and inter-task communication, optimized for deterministic and predictable behavior. RTOSes are commonly used in embedded systems and applications where timing and responsiveness are critical. 

Key characteristics:

- **Task Scheduling**

  - Prioritizes tasks based on urgency and deadlines.
  - Utilizes scheduling algorithms such as preemptive or cooperative scheduling.
  - Supports task preemption to ensure critical tasks are executed on time.
  
- **Interrupt Handling**

  - Efficiently manages hardware interrupts.
  - Provides fast and deterministic response to external events.
  - Utilizes interrupt service routines (ISRs) to handle interrupts with minimal latency.
  
- **Resource Management**

  - Allocates system resources such as CPU time, memory, and peripherals.
  - Ensures fair and efficient utilization of available resources.
  - Implements mechanisms for resource protection and access control.
  
- **Inter-Task Communication**

  - Facilitates communication between tasks in real-time.
  - Uses message queues for asynchronous communication.
  - Employs semaphores and event flags for synchronization and mutual exclusion.

### Risks

- **Hardware Failure**

  - Component failure leading to system malfunction or downtime.
  - Degradation over time due to wear and tear.
  - Environmental factors such as temperature fluctuations or electrical disturbances.

- **Software Bugs**

  - Coding errors or logic flaws in the software.
  - Incompatibility issues with other system components.
  - Lack of thorough testing and quality assurance.

- **Security Vulnerabilities**

  - Weak authentication mechanisms allowing unauthorized access.
  - Exploitable software vulnerabilities like buffer overflows or injection attacks.
  - Insufficient encryption or data protection measures.

- **Outdated Systems**

  - Unsupported hardware or software lacking vendor support.
  - Inability to receive security patches or updates.
  - Increased exposure to known vulnerabilities and exploits.


### Securing Embedded Systems 


- **Network Segmentation**

  - Isolating embedded systems within segmented networks.
  - Limit exposure to external threats.
  - For more information, please see [Isolation and Segmentation.](../003-Security-Architecture/001-Security-Design.md#isolation-and-segmentation)

- **Security Wrappers**

  - Using protective wrappers or sandboxes to encapsulate embedded systems.
  - This shields the systems from potential security threats.
  - Detect and mitigate attacks in real-time using runtime protection mechanisms.

- **Firmware Version Control**

  - Strict control over firmware code development, deployment, and updates
  - Prevent unauthorized modifications.
  - Code signing and integrity verification - ensure authenticity and integrity of updates.

- **Inability to Patch**

  - Challenges such as limited resources, compatibility issues, and potential disruptions.
  - **Over-the Air (OTA) Updates** - patches are delivered and installed remotely.



## Internet of Things 

A network of interconnected devices, sensors, and actuators that communicate and exchange data over the internet, enabling remote monitoring, control, and automation of physical objects and environments

### Components 

- **Hub or Control System**

    - Centralized device that manages communication and control of IoT devices within a network.
    - Orchestrates data flow and interactions between devices.
    - Often provides a user interface for device management and monitoring.

- **Smart Devices**

    - Connected devices with embedded sensors and actuators.
    - Utilizes internet connectivity for data exchange and remote control.
    - Examples include smart thermostats, smart locks, and connected appliances.

- **Wearables**

    - IoT devices worn on the body, such as smartwatches or fitness trackers.
    - Collects biometric data such as heart rate, activity levels, and sleep patterns.
    - Enables users to track health and fitness metrics in real-time.

- **Sensors**

    - Devices that detect and measure physical or environmental conditions.
    - Measures temperature, humidity, light intensity, motion, and more.
    - Used in various applications including home automation, industrial monitoring, and environmental sensing.

### Risks 

- **Security Considerations for IoT Devices**

    - IoT devices, including embedded systems and network-enabled devices, need special attention.
    - Potential for malicious use, and security breaches could cause harm.
    - Multiple access routes (ethernet, wireless, Bluetooth) require careful isolation.
    
- **Weak Default Settings** 

    - IoT devices often come with default settings that may lack adequate security measures.
    - This makes them vulnerable to exploitation.
    - Mitigation: Change default settings and credentials.

- **Poorly Configured Network Services** 

    - Inadequate configuration of network services, such as insecure protocols or open ports.
    - This can expose IoT devices to unauthorized access and cyberattacks.
    - Mitigation: Network isolation

### Securing IoT 

- **Logical Network Segmentation**

  - Use switches and VLANs for logical network segmentation.
  - Traffic control via MAC addresses, IP addresses, physical ports, protocols, or application filtering.
  - Isolation of IoT environments to enhance security and protect against potential threats.


## ICS and SCADA Systems

### ICS

Industrial Control Systems  or ICS is a type of control systems used to monitor and control industrial processes ranging from simple systems to complex systems. 

- **DCS (Distributed Control System)**
    - Utilizes networked computers to coordinate and control industrial processes or manufacturing operations.
    - Centralized control, monitoring, and data acquisition capabilities across distributed field devices.
    - Typically used in large-scale industrial settings such as power plants, chemical plants, and oil refineries.

- **PLCs (Programmable Logic Controllers)**
    - Specialized industrial computers used to automate electromechanical processes, e.g. assembly lines, robotic systems.
    - Designed for real-time operation in harsh industrial environments.
    - Programmable using ladder logic or other programming languages to control machinery and processes.
    - High reliability, flexibility, and modularity, allowing for easy reconfiguration and expansion of control systems.


### SCADA 

SCADA (Supervisory Control and Data Acquisition) is a system used to remotely monitor, control, and manage industrial processes and infrastructure.

- **Collection of ICS devices dispersed over a wide area network.**
- Integrates data acquisition, visualization, and control functions for supervisory management.
- Collects data from sensors, meters, and other devices, and displays it to operators in real-time.
- Remotely control equipment, adjust setpoints, and respond to alarms or abnormal conditions.
- Typically used in industries such as manufacturing, utilities, transportation, and oil and gas.


### Risks 

- **Unauthorized access**

  - Threat of unauthorized individuals gaining access to critical control systems.
  - Potential for manipulation or disruption of industrial processes.

- **Malware attacks**

  - Vulnerability to malware infections targeting industrial control systems.
  - Risks of data theft, operational disruption, or physical damage.
  - For more information, please see [Malware](../011-Threats-and-Attacks/020-Malware.md)

- **Lack of updates**

  - Risk posed by outdated or unpatched software in ICS and SCADA systems.
  - Increases susceptibility to known vulnerabilities and exploits.

- **Physical threats**

  - Exposure to physical threats such as sabotage, vandalism, or tampering.
  - Potential for operational downtime, safety hazards, or environmental damage.

### Securing ICS and SCADA Systems
 
- **Strong access controls**

  - Implement role-based access controls.
  - Enforce multi-factor authentication.

- **Regular updates and patches**

  - Keep software and firmware up-to-date.
  - Maintain a robust patch management process.

- **Firewall and IDS**

  - Deploy firewalls to control network traffic.
  - Utilize intrusion detection systems.

- **Regular security audits**

  - Conduct frequent vulnerability assessments.
  - Ensure compliance with industry standards.

- **Employee training**

  - Provide security awareness training.
  - Foster a culture of security within the organization.



