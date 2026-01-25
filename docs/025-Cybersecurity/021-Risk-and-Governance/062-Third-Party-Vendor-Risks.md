---
title: "Third-Party Vendor Risks"
description: "Potential security from external entities"
tags: [Security, Cybersecurity, Security Operations]
sidebar_position: 62
last_update:
  date: 1/30/2024
---




## Overview

Encompasses potential security and operational challenges introduced by external entities, e.g. vendors, suppliers, service providers. When we integrate external partners into our ecosystems, we also open up our systems to potential threats and vulnerabilities.

### Hardware Manufacturers

Hardware manufacturers are responsible for producing the physical components and devices that are integral to various technological systems. 

- Strictly checked to ensure their microprocessors are securely manufactured.
- Risk can also come from hardware purchases from secondary or aftermarket sources.
- Conduct rigorous assessments to trace the source of hardware used.
- Ensure compliance with industry standards and quality controls.
- Manage the lifecycle of hardware from development through disposal.

### Software Developers

Software developers design, create, and maintain the software applications and systems. Their work is essential for developing solutions that are both functional and secure.

- Ensure software is properly licensed and authentic before installation.
- Update and maintain software to address bugs, vulnerabilities, and performance issues.

### Service Providers

Service providers offer essential services such as maintenance, support, and consulting, which are crucial for the effective operation of technologies and systems in organizations.

- Evaluate data security measures, such as confidentialiy and integrity.
- Ensure cybersecurity protocols are robust enough to protect the organization's data.
- Should be able to provide necessary support and cooperation in case of security breach.

## Supply Chain Attacks

Supply chain attacks involve exploiting vulnerabilities in the supply chain to gain unauthorized access to systems, often targeting weaker links such as suppliers or managed service providers (MSPs) rather than the primary targets directly.

- Instead of well-fortified entities, attackers can target suppliers and MSPs.
- Cisco routers and switches are often the source of supply chain attacks.

### Hardware-based Attacks

- **Chip Washing**

  - Involves repackaging the contents of a microchip with a less expensive one.
  - Appliances with counterfeit chips can lead to system crashes.
  - Worse, these devices may contain malware or always-on backdoors.

- **Rootkits**

  - May be embedded within devices acquired from overseas suppliers.
  - Pre-installed malware tools can provide backdoor access once the devices are active.
  - Conduct thorough vendor assessments to mitigate these vulnerabilities.
  - For more information, please see [Rootkits.](/docs/025-Cybersecurity/051-List-of-Attacks/014-Execution-and-Escalation.md#rootkits)

### Software-based Attacks

Software supply chain attacks involve compromising software during development or distribution stages.

- Attackers can introduce malicious code into legitimate software updates.
- Difficult to detect, as they often exploit trusted sources within the supply chain.
- Regular audits and integrity checks, to prevent unauthorized modifications in software.

### CHIPS Act of 2022 

The CHIPS Act, officially known as the CHIPS and Science Act of 2022, is designed to address supply chain vulnerabilities and promote innovation in the semiconductor industry, which is critical for a wide range of technologies from consumer electronics to advanced military systems.

- Funding to build and expand semiconductor manufacturing facilities in the U.S.
- Resources allocated for advancing semiconductor technologies.
- Support for training a skilled workforce in the semiconductor industry.
- Efforts to reduce dependence on foreign semiconductor manufacturing.
- Creation of jobs and support for industries reliant on advanced semiconductor technologies.

### Supply Chain Analysis 

Used to dive deep into a vendor's entire supply chain and assess the security and reliability of each link.

- Vendor' security is not just about their practices 
- Includes vendor's entire supply chain's integrity
- Scrutinize the locations where hardware vendors source their parts


### Preventing Supply Chain Attacks 

Mitigating supply chain attacks requires a multi-faceted approach to secure all links in the supply chain. 

- **Vendor Due Diligence**
  - Evaluate suppliers' compliance with standards before establishing relationships.
  - Regularly review and audit supplier practices to ensure continued compliance.

- **Regular Monitoring and Audit**
  - Continuously monitor for unusual activities or vulnerabilities that may be exploited by attackers.

- **Education and Collaboration**
  - Educate employees on the risks of supply chain attacks and best practices for security.
  - Collaborate with industry groups to share information on emerging threats and security measures.

- **Incorporating Contractual Safeguards**
  - Include specific security requirements and responsibilities in contracts with suppliers.
  - Establish clear terms for security breaches, corresponding penalties, or remediation processes.

For more information, please see [Supply Chain Analysis.](/docs/025-Cybersecurity/021-Risk-and-Governance/060-Vendor-Assessment.md#supply-chain-analysis)