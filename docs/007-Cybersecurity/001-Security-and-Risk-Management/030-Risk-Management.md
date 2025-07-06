---
title: "Risk Management"
description: "Managing and Prioritizing Risks"
tags: [Security, Cybersecurity, Risk Management]
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
  - For more information, please see [Cyber Threat and Attacks.](../011-Threats-and-Attacks/002-Threat-Actors.md)

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

  - **Assessing Impact**

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
  - For more information, please see [APTs.](/docs/007-Cybersecurity/011-Threats-and-Attacks/002-Threat-Actors.md#advanced-persistent-threats)

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

The highest priority should be given to risks estimated to high impact and low probability over high probability and low impact value. 

- Low frequency of occurrence 
- High expected impact


### Risk Analysis

**Risk analysis** is the process of identifying and evaluating potential threats to assets. There are two main types:

- **Qualitative Risk Analysis**

  - Based on expert judgment, experience, or scoring systems
  - Uses categories like **high**, **medium**, or **low** risk
  - Helps prioritize risks quickly without needing numerical data

- **Quantitative Risk Analysis**

  - Based on measurable data and statistical methods
  - Calculates risk using numbers like **cost**, **frequency**, and **impact**
  - Helps determine the financial effect of risks more precisely


:::info 

In qualitative risk analysis, the 'expected probability of occurrence' and the 'frequency of occurrence' refer to the same thing.

:::


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

By thoroughly analyzing and vetting suppliers, an organization can ensure that they are sourcing genuine and certified equipment from reputable vendors, thus reducing the risk of introducing counterfeit hardware into their network. 

For more information, please see [Supply Chain Analysis.](/docs/007-Cybersecurity/001-Security-and-Risk-Management/062-Third-Party-Vendor-Risks.md#supply-chain-attacks)


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




