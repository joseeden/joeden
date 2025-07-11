---
title: "Threat Modelling"
tags: [Cybersecurity]
sidebar_position: 7
last_update:
  date: 1/30/2024
---

## Threat Modelling

Threat modelling is a structured approach for identifying, quantifying, and addressing the security risks associated with an application or system. This process helps organizations understand potential threats, vulnerabilities, and attack vectors, which enables them to implement effective security controls to mitigate risks.

### Steps in Threat Modelling

1. **Identify Assets**
   - Determine what needs to be protected.
   - Examples: Data, software, hardware, intellectual property.

2. **Create an Architecture Overview**
   - Diagram the system or application, including data flows, processes, and interactions.
   - Examples: Flowcharts, data flow diagrams (DFDs), system architecture diagrams.

3. **Identify Threats**
   - Use frameworks like STRIDE to systematically identify potential threats.
   - Examples: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.

4. **Identify Vulnerabilities**
   - Assess the system for weaknesses that could be exploited by threats.
   - Examples: Unpatched software, weak passwords, lack of encryption.

5. **Evaluate Risks**
   - Assess the potential impact and likelihood of each identified threat exploiting a vulnerability.
   - Examples: High, medium, low risk.

6. **Develop Mitigations**
   - Design and implement security controls to address identified risks.
   - Examples: Firewalls, access controls, encryption, intrusion detection systems.

7. **Validate and Iterate**
   - Test the effectiveness of the mitigations and continuously improve the threat model.
   - Examples: Penetration testing, security audits, code reviews.

### Benefits 

- **Proactive Security**
  - Identifies potential threats early in the development lifecycle.

- **Cost-Effective**
  - Reduces the cost of security by addressing issues early.

- **Comprehensive**
  - Provides a systematic approach to identify and mitigate risks.

- **Improves Communication**
  - Enhances understanding of security issues among stakeholders.


## Identify Threats

Protecting against all attacks requires multiple steps, and implementing fundamental measures can guard against various threats. Here are examples of actions to safeguard networks:

- **Service and Protocol Management**
   - If a service or protocol is unnecessary, it should be deactivated. Attackers cannot exploit vulnerabilities in inactive services or protocols.

- **Firewall Implementation**
   - Firewalls, whether network-based or host-based, are effective defenses against various attacks. Network-based firewalls secure entire networks, while host-based firewalls protect individual systems.

Organizations can use a structured approach to identify threats. This process involves analyzing various aspects of the organization’s environment, operations, and information systems to pinpoint vulnerabilities and possible threat sources. 

- **Asset Focus**
  - Use the asset inventory as basis for analysis.
  - Identify critical assets needing protection.
  - Determine the value and importance of each asset.
  - Assess the potential impact of threats on these assets.

- **Threat Focus**
  - Identify all possible threats and evaluate their likelihood and capability.
  - Analyze potential sources of threats, including natural, human, and environmental.
  - Identify specific threats relevant to the organization’s context.

- **Service Focus**
  - Used by service providers who offer services over the internet.
  - Identify essential services that support business operations.
  - Assess the dependency of critical services on various assets.
  - Evaluate the impact of various threats on a specific service.

## Understand threats using STRIDE 

The STRIDE model is a framework used to understand and categorize different types of security threats. This model helps organizations systematically identify and address potential vulnerabilities in their systems. Each letter in STRIDE represents a specific category of threat:

- **Spoofing Identity**
  - Attackers pretend to be someone they are not.
  - Common examples include phishing attacks and credential theft.
  - Mitigation: Implement strong authentication mechanisms.

- **Tampering with Data**
  - Unauthorized modification of data.
  - Examples include altering database records or modifying data in transit.
  - Mitigation: Use cryptographic hashing and digital signatures.

- **Repudiation**
  - Denying the performance of an action without other parties being able to prove otherwise.
  - Examples include deleting logs or performing transactions without a trace.
  - Mitigation: Enable auditing and logging.

- **Information Disclosure**
  - Unauthorized access to confidential information.
  - Examples include data breaches and eavesdropping on communications.
  - Mitigation: Implement encryption and access controls.

- **Denial of Service (DoS)**
  - Disrupting service availability to legitimate users.
  - Examples include network flooding and resource exhaustion attacks.
  - Mitigation: Use redundancy and rate limiting.

- **Elevation of Privilege**
  - Gaining unauthorized access to higher privileges than originally granted.
  - Examples include exploiting software vulnerabilities to gain administrative access.
  - Mitigation: Implement [least privilege](/docs/007-Cybersecurity/006-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege) access and secure coding practices.


## Reduction Analysis

Reduction analysis is a security technique used to simplify the assessment of complex systems by breaking them down into more manageable components. This approach helps identify and evaluate the potential risks associated with each part of the system which then makes it easier to develop targeted security controls.

Steps in Reduction Analysis:

1. **Decompose the System**
   - Break down the system into smaller, understandable components.
   - Examples: Applications, databases, network segments.

2. **Identify Entry and Exit Points**
   - Determine where data enters and exits each component.
   - Examples: APIs, user interfaces, network interfaces.

3. **Analyze Trust Boundaries**
   - Identify the boundaries where trust levels change within the system.
   - Examples: Between user interface and backend systems, between internal and external networks.

4. **Assess Security Controls**
   - Evaluate the existing security measures for each component.
   - Examples: Authentication mechanisms, encryption, access controls.

5. **Identify Potential Threats**
   - Determine possible threats for each component.
   - Examples: Unauthorized access, data breaches, denial of service attacks.

6. **Evaluate Risk**
   - Assess the risk level for each identified threat based on its impact and likelihood.
   - Examples: High risk, medium risk, low risk.

An example of this is using diagrams to identify the data flows and relationship between systems. As an example, we have a diagram below for a simple e-commerce website where the user interacts with the web server, which relies on an e-commerce database. In addition to this, the web server depend on an authentication server for user identity verifications. The authentication server, in turn relies to a backend database.

|![](/img/docs/cissp-diagramming-attacksss.png)|
|-|


The arrows shows the data flows while the dotted lines indicate firewalls. When evaluating the security for this architecture, we know that potential attacks can be sent by the user to the publicly-accessible web server, which can then unintentionally pass the request to the e-commerce database.


## Preventing Threats

While there is no single step to protect against all threats, several basic measures can significantly reduce the risk of various types of threats.

- **Keep Systems Updated**
  - Regularly apply patches released by vendors.
  - Implement patch management for timely updates.

- **Disable Unneeded Services**
  - Remove or disable unnecessary services and protocols.
  - Reduces vulnerability to potential attacks.

- **Intrusion Detection and Prevention**
  - Implement systems that observe and detect threats.
  - Provide alerts and can block or stop attacks.
  - For more information, please see [IDS and IPS.](/docs/007-Cybersecurity/004-Infrastructure-and-Network/056-IDS-and-IPS.md)

- **Anti-Malware Software**
  - Utilize up-to-date anti-malware software.
  - Countermeasure against various types of malicious code.
  - For more information, please see [Malware](../011-Threats-and-Attacks/020-Malware.md)

- **Firewalls**
  - Deploy network-based firewalls for entire networks.
  - Utilize host-based firewalls for individual systems.
  - Effective in preventing different types of threats.




