---
title: "Risk Management"
description: "Managing and Prioritizing Risks"
tags: 
- Security
- Cybersecurity
- Risk Management
sidebar_position: 29
last_update:
  date: 1/30/2024
---

## Importance of Risk Management 

Information assurance and cybersecurity are key for risk management. The required cybersecurity level is determined by the entity's risk tolerance. 

- Assess and evaluate risks, and then implement security controls  
- To prioritize risk based on their impact 

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

:::info

**Geographic Dispersion** refers to spreading important systems and data across different locations to prevent a single event, like a natural disaster, from causing a total loss. This helps keep the business running smoothly.

:::


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

For more information, please see [Supply Chain Analysis.](/docs/007-Cybersecurity/021-Risk-and-Governance/062-Third-Party-Vendor-Risks.md#supply-chain-attacks)


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




