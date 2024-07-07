---
title: "Risk Management"
tags: [Cybersecurity]
sidebar_position: 30
last_update:
  date: 1/30/2024
---


## Importance of Risk Management 

Information assurance and cybersecurity are key for risk management. The required cybersecurity level is determined by the entity's risk tolerance. 

- Assess and evaluate risks, and then implement security controls  
- To prioritize risk based on their impact 

## Risk Management Terminologies 

- **Asset**

  - An asset is something in need of protection.

- **Vulnerability**

  - Gap or weakness in protecting valuable assets, including information.
  - Example: IT environment vulnerable to flooding during a major storm.

- **Threat**

  - Something or someone aiming to exploit a vulnerability for unauthorized access.

  - Example: Natural disaster threatening utility power supply, impacting IT asset availability.

  - **Harm by Exploitation:**

    - Exploiting a vulnerability allows threats to harm assets.
    - Example: Storm cutting off power, rendering IT components unusable.

  - **Mitigation and Risk Evaluation:**

    - Evaluate event likelihood and take actions to mitigate risks.
    - Example: Assessing storm risk and implementing measures to protect IT assets.

- **Threat Actor**  

  - An individual or a group posing a threat (according to NIST SP 800-150 under Threat Actor). 
  - Typical threat actors include the following:
    - Insiders (either deliberately, by simple human error, or by gross incompetence).
    - Outside individuals or informal groups (either planned or opportunistic, discovering vulnerability).
    - Formal entities that are nonpolitical (such as business competitors and cybercriminals).
    - Formal entities that are political (such as terrorists, nation-states, and hacktivists).
    - Intelligence or information gatherers (could be any of the above).
    - Technology (such as free-running bots and artificial intelligence , which could be part of any of the above).

  - For more information, please see [Cyber Threat and Attacks.](../004-Threats-and-Attacks/017-Cyber-Threats-and-Attacks.md)

- **Threat Vector**

  - The means by which a threat actor carries out their objectives.

- **Attacker**

  - An Attacker is always an individual, but a Threat Actor can be either a group or an entity.

  - The three most common goals of cybersecurity attackers are DAD:

    - Disclosure
    - Alteration
    - Denial


- **Attack Vectors** 

  - Pathways to gain access to infrastructure. 

    - Weak configurations 
    - Open firewall ports 
    - Lack of user security awareness 
    - Lack of MFA
    - Missing patches 
    - Infected USB drive 

- **Supply-Chain Attacks** 

  - Anyone or anything that allows you to deliver a product or a service:

    - Manufacturers 
    - Contractors
    - Outsourced personnel 

  - As owners of the contractual agreement, we have the **right to audit** the third-party systems any time to make sure they're compliant with standards and regulations.

- **Likelihood**

  - **Likelihood of occurrence** 

      - This is the weighted factor based on a subjective analysis of the probability that a given threat or set of threats is capable of exploiting a given vulnerability or set of vulnerabilities.

  - **Assessing Impact:**

      - Impact is the magnitude of harm resulting from unauthorized actions like disclosure, modification, destruction, or loss of information or system availability.
      - Consideration: Potential results if a threat materializes and an event occurs.  


- **Shadow IT**  

  - Shadow IT is the use of unapproved technology, software, or hardware by employees without authorization from IT or security teams. 

  - It poses risks like data breaches, compliance issues, and other security vulnerabilities. 

  - Focus is on identifying, managing, and mitigating these risks through effective policies, detection methods, and user education.

- **State Actor** 

  - State actors work for or represent a government or nation-state, often with cyber-focused goals.

  - They have extensive resources and technical skills for complex cyber operations.
  - Common targets include government, military, critical infrastructure, and major corporations.
  - Effective responses require strong cybersecurity, intelligence sharing, and international cooperation.

- **Advanced Persistent Threat**

  - An Advanced Persistent Threat (APT) is a sophisticated and stealthy cyber attack.
  - Usually conducted by organized groups, often linked to nation-states.
  - They focus on maintaining long-term access to a target's network.
  - APTs often aim to gather intelligence, steal data, or disrupt operations.

- **Advance Tactics, Techniques, and Procedures**

  - Advanced Tactics, Techniques, and Procedures (TTP) describe the behaviors and methods used by threat actors in cyber attacks.

    - **Tactics** refer to the high-level goals or strategies that threat actors aim to achieve.
    - **Techniques** involve the specific ways or approaches attackers use to execute tactics.
    - **Procedures** describe detailed steps or sequences used to carry out techniques consistently.

## Managing Risks 

### Risk Register 

To manage the different types of risks, we can use a **Risk Register**

- One or more risk register per organization
- Centralized list of risks, severities, responsibilities, and mitigations
- Also known as **risk log**

Components:

- **Risk Owners**
  Individuals or teams responsible for managing specific risks, including monitoring, mitigation, and reporting on risk status.

- **Key Risk Indicators**
  Measurable metrics suggesting when a risk may be increasing or approaching a critical point.

- **Risk Description**
  A summary of a risk, outlining its nature, causes, and potential consequences if it occurs.


- **Risk Impact**
  The potential consequences if risks materialize, usually measured in number of losses.

- **Risk Likelihood**
  The probability that a risk event will occur, often categorized as high, medium, or low based on historical data or expert judgment.

- **Risk Outcome**
  The result or effect after a risk event occurs, which can be positive or negative.

- **Risk Thresholds**
  Predefined limits or levels at which a risk triggers specific actions or responses, indicating when a risk requires attention or mitigation.

- **Risk Level**
  A combined measure of risk likelihood and impact, often used to categorize risks into priority levels for management and response.

- **Cost**
  The financial resources required to manage, mitigate, or transfer a risk, including expenses for controls, insurance, and other risk-reduction measures.

Example:

![](/img/docs/sec+-risk-register-example.png)

### Risk Heat Map 

Take risk severity levels and map visually by colors.

![](/img/docs/sec+-risk-heat-map-example.png)

### Risk Matrix 

Centralized table containing all the risk details.

![](/img/docs/sec+-risk-matrix-exampleee.png)

## Prioritizing Risks 

The highest priority should be given to risks estimated to high impact and low probability over high probability and low impact value (ISC2 Study Guide, Chapter 1, Module 2). 

In qualitative risk analysis, the 'expected probability of occurrence' and the 'frequency of occurrence' refer to the same thing. 

**Prioritize:**

- Low frequency of occurrence 
- High expected impact

### Risk Tolerance 

Likened to the entity's risk acceptance, risk tolerance varies across organizations and departments.

- **Management's Role**
  - Executives or the Board sets acceptable risk levels.
  - Security professionals align risks with management's tolerance.

- **Geographic Influence**
  - Risk tolerance often dictated by location.
  - Example: Volcano-prone areas plan for related risks.
  - Calculating downtime likelihood defines risk tolerance.

- **Power Outage Example**
  - Risks vary by location.
  - Low tolerance leads to generator investment.
  - Higher tolerance involves multiple generators for increased assurance.

### Risk Appetite 

Signifies an organization's willingness to embrace  or retain specific types and levels of risks to fulfill its strategic  goals.

Types of risk appetites:

- **Expansionary**

  - Willing to take on higher risks for higher returns 
  - Example: entering new markets or launching innovative products.
  - Often characterized by aggressive business strategies and a focus on rapid expansion.
  - Prioritizes opportunities and is comfortable with occasional setbacks in pursuit of greater rewards.

- **Conservative**

  - Prefers stability and risk minimization, avoiding high-risk ventures.
  - Focuses on compliance, risk mitigation, and maintaining existing assets.
  - Common in industries with strict regulations or lower risk tolerance, like healthcare and banking.

- **Neutral**

  - Strikes a balance between risk-taking and risk-avoidance, assessing risks case-by-case.
  - Open to opportunities but cautious, focusing on sustainable growth.
  - Aims to manage risks carefully while not being overly risk-averse.


## Third-Party Risk Management 

### Measurement Systems Analysis

Measurement Systems Analysis (MSA) is a quality assurance metric that evaluates the accuracy and reliability of a measurement system or instrument.
- Determine if measurement process is consistent, precise, and free from significant errors or bias.
- Analyzing factors like repeatability, reproducibility, and measurement uncertainty.
- Crucial in quality control and manufacturing to ensure reliable data for decision-making and compliance with standards.

### Supply Chain Security Risks 

Outsourced hardware and software from vendors:

- EOS (End-of-service) or EOL (End-of-life) means no more patches and support.
- Outdated operating systems are security risks.
- Cloud providers are big targets by threat actors, but they also have a lot to lose if their environments cannot be trusted.
- Temporary access for contractors.
- Company mergers and system linking.
- Developers using third-party components.




## Agreement Types 

### Interconnection Security Agreement 
An Interconnection Security Agreement (ISA) outlines the security requirements for two organizations that are connecting their information systems.

- Details the roles, responsibilities, and technical safeguards for secure connections and data exchange.
- Encryption, authentication, and auditing to ensure data protection.
- Commonly used for secure connections between government agencies or business partners.

Used for:

- Legal review, regulatory compliance 
- Linking companies, partners, and agencies
- Vulnerability scan results
- Mandatory training/certification

### Basic Contract 

In risk management and vendor selection, a well-drafted basic contract is essential for defining the terms of engagement, protecting interests, and setting expectations between parties. It serves as the foundation for the business relationship, ensuring clarity and mutual understanding.

- Defines the scope of work, responsibilities, and duties of both parties
- Outlines the conditions under which the contract can be terminated by either party
- Ensures that both parties adhere to relevant laws and regulations throughout the engagement

### Service Level Agreement 

A Service Level Agreement (SLA) is a contract that defines the performance expectations and service standards between a service provider and a customer.

- Uses metrics like response times, uptime, and quality levels.
- Ensure accountability and customer satisfaction.
- Outlines remedies or penalties, if service provider doesn't meet agreed-upon standards.
- Used in IT, telco, and cloud services to manage service quality and customer relationships.

### MOU and MOA 

Both are types of agreements used in various contexts, providing a basis for collaboration and establishing the foundation for future cooperation. MOAs are typically more structured and legally binding compared to MOUs.

- **MOU (Memorandum of Understanding)**
  - Agreement between parties to understand mutual goals and expectations.
  - Outlines broad terms and general understanding.
  - Often non-binding and serves as a framework for future agreements.

- **MOA (Memorandum of Agreement)**
  - More formal than MOU, involves a legally binding commitment.
  - Specifies detailed terms, responsibilities, and obligations.
  - Clearly outlines the agreed-upon course of action.

Additionally:

- **MOU/MOA in Business Continuity**
  - Organizations create agreements for mutual support during emergencies.
  - Parties share resources if one faces a facility-related emergency.
  - Agreements may involve competitors, enhancing industry-wide resilience.

- **Joint Operating Agreements (JOA)**
  - Competing entities collaborate for shared continuity during disruptions.
  - Focus on safety and security collaboration rather than competition.
  - Both outline responsibilities in sharing information, resources, or collaborative efforts, including security responsibilities.

- **Regulatory and Industry Guidelines**
  - Agreements may be mandated by regulations or industry guidelines.
  - Administrative safeguards within industry norms.

- **Difference from SLA**
  - MOU/MOA focuses on system and information usage.
  - SLA delves into granular details, specifying service intricacies.
  - Caution required in cloud-based outsourcing, thorough legal review recommended.


### Master Services Agreement 

A Master Services Agreement (MSA) provides a standardized set of terms for all projects and services provided over time. It helps streamline interactions and ensure consistency across multiple engagements.

- Blanket agreement that covers general terms of engagement between parties.
- Provides a framework for consistent transactions and project execution.
- Establishes the standard terms for various interactions to maintain clarity and efficiency.

For recurring client relationships, the involved parties can use an MSA instead of drafting up a new contract for every project. These agreement will contain the overarchign terms, and can be supplemented with the individual work orders or a **Statement of Work (SOW).**

### Statement of Work 

The Statement of Work (SOW) is a critical document that details the specifics of a project or service engagement, clearly defining the scope, deliverables, and timeline to ensure all parties are aligned.

- Also known as "Scope of Work", SOW provides the in-depth details for the given project.
- Details the project objectives, scope of work, and responsibilities.
- Lists the expected deliverables, project milestones, and deadlines for deliverables.


### Non-Disclosure Agreement 

A Non-Disclosure Agreement (NDA) is a legally binding contract that requires parties to keep certain information confidential.

- Protect sensitive information, trade secrets, or proprietary knowledge from unauthorized disclosure.
- Specifies what information is considered confidential and any exceptions or permissible disclosures.
- Violation can lead to legal consequences, including lawsuits and financial penalties.


### Business Partnership Agreement

A Business Partnership Agreement (BPA) is a legally binding document that outlines the terms and conditions of a business relationship between two or more partners.

- Both parties decide to pool thheir resources for mutual benefit.
- Includes ownership, roles, profit-sharing, decision-making, and dispute resolution.
- Also addresses capital contributions, management, and exit or dissolution processes.
- Goal is to prevent conflicts by clearly outlining the rights and responsibilities of each partner.


## Risk Monitoring and Reporting 

### Risk Monitoring 

Continuously tracking  identified risks, assessing new risks executing response plans, and evaluating their effectiveness during a project's lifecycle.

- **Residual Risk**
  Likelihood and impact after implementing mitigation, transference, or acceptance measures on the initial risk.


- **Control Risk**
  Assessment of how a security measure has lost effectiveness over time.

### Risk Reporting 

Process of communicating information about risk management activities, including the results of risk identification, assessment, response, and monitoring.

- Often presented in the form of a monthly risk report.
- Shared with stakeholders and potentially the clients.


