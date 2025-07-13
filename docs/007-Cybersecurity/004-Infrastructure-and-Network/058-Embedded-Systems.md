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

Embedded systems often operate in **real-time** and have resource constraints such as limited memory, processing power, and energy. 

## Embedded Systems

### Types of Embedded Systems 

Embedded systems are specialized devices designed to perform dedicated functions within larger systems.

- **Internet of Things (IoT)**

  - Found in smart homes, wearables, and sensors
  - Often resource-limited and connected via wireless networks

- **ICS and SCADA Systems**

  - Control industrial processes and critical infrastructure
  - Require high availability and precise timing

- **Medical Systems**

  - Used in diagnostic tools and life-support equipment
  - Must comply with strict safety and reliability standards

- **In-Vehicle Computing Systems**

  - Manage engine, braking, and infotainment functions
  - Operate in real time with high reliability

- **Unmanned Aerial Vehicles (UAVs)**

  - Commonly used for surveillance, mapping, and delivery
  - Depend on embedded flight control and GPS systems

- **Smart Meters**

  - Measure and report electricity, water, or gas usage
  - Support remote updates and energy efficiency

- **Surveillance Systems**

  - Include CCTV, motion detectors, and recorders
  - Often connected to cloud storage or central monitoring

- **Voice over IP (VoIP)**

  - Enable digital voice communication over networks
  - Built into phones, routers, and conferencing devices

- **Mobile Systems**

  - Found in smartphones, tablets, and handheld tools
  - Support mobility, connectivity, and user interaction


### Real Time Operating Systems (RTOS)

RTOS is a specialized operating system designed to run tasks with strict timing and reliability requirements. It's commonly used in embedded systems where timely and predictable responses are critical.

:::info 

RTOSs prioritize performance, sometimes at the expense of security features like buffer overflow protections, potentially leaving the system susceptible to certain attacks. 

:::


Key Characteristics: 

- **Task Scheduling**

  - Runs tasks based on urgency and deadlines
  - Uses preemptive or cooperative scheduling for timing control
  - Supports task preemption to execute critical tasks on time

- **Interrupt Handling**

  - Quickly responds to hardware events
  - Uses fast, low-latency interrupt service routines (ISRs)

- **Resource Management**

  - Manages CPU, memory, and devices efficiently
  - Protects access to shared resources

- **Inter-Task Communication**

  - Enables tasks to communicate and sync with each other
  - Uses queues, semaphores, and event flags for coordination


### Risks of Embedded Systems

Embedded systems, while efficient and widely used, face several operational and security risks that must be addressed:

- **Hardware Failure**

  - Malfunctions from aging components or physical damage
  - Degradation over time due to wear and tear.
  - Environmental stress (e.g., heat, power fluctuations)

- **Software Bugs**

  - Coding errors or logic flaws in the software.
  - Incompatibility issues with other system components.
  - Lack of thorough testing and quality assurance.

- **Security Vulnerabilities**

  - Weak access controls or outdated protocols
  - Unpatched flaws like buffer overflows or injection attacks.
  - Insufficient encryption or data protection measures.

- **Outdated Systems**

  - Legacy hardware/software no longer supported
  - Can't receive updates, increasing attack surface

### Securing Embedded Systems

Embedded systems often have limited resources and run in specialized environments, making them harder to patch and secure. These measures help reduce risk:

- **Network Segmentation**

  - Keep embedded systems in isolated network zones
  - Limits access and reduces exposure to threats
  - See [Isolation and Segmentation](/docs/007-Cybersecurity/003-Security-Architecture/001-Security-Design.md#isolation-and-segmentation)

- **Security Wrappers**

  - Add protective layers or sandboxes around systems
  - Helps block or contain malicious actions
  - Can detect and respond to threats during runtime

- **Firmware Version Control**

  - Manage firmware development and updates strictly
  - Use code signing to verify authenticity
  - Prevents tampering and unauthorized changes
  - See [Code Signing](/docs/021-Software-Engineering/007-Software-Security/010-Application-Security.md#code-signing)

- **Inability to Patch**

  - Many embedded systems are hard to update
  - Reasons include limited memory, hardware constraints, or risk of disruption
  - **OTA (Over-the-Air) Updates** allow secure remote patching where supported



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

:::info 

SCADA systems are often engineered for specific tasks and might not receive regular security updates, which makes them **susceptible to vulnerabilities over time**. 

:::

### Risks 

- **Unauthorized access**

  - Threat of unauthorized individuals gaining access to critical control systems.
  - Potential for manipulation or disruption of industrial processes.

- **Malware attacks**

  - Vulnerability to malware infections targeting industrial control systems.
  - Risks of data theft, operational disruption, or physical damage.
  - For more information, please see [Malware](/docs/007-Cybersecurity/012-Threats-and-Attacks/020-Malware.md)

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
  - For more information, please [Patch Management.](/docs/007-Cybersecurity/009-Security-Operations/052-Updates-and-Patches.md)

- **Firewall and IDS**

  - Deploy firewalls to control network traffic.
  - Utilize intrusion detection systems.
  - For more information, please see [Firewalls](/docs/007-Cybersecurity/004-Infrastructure-and-Network/055-Firewalls.md) and [IDS](/docs/007-Cybersecurity/004-Infrastructure-and-Network/056-IDS-and-IPS.md)

- **Regular security audits**

  - Conduct frequent vulnerability assessments.
  - Ensure compliance with industry standards.

- **Employee training**

  - Provide security awareness training.
  - Foster a culture of security within the organization.



