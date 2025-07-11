---
title: "Risk Management Process"
description: "Identify, assess, and prioritize risk"
tags: 
- Security
- Cybersecurity
- Risk Management
sidebar_position: 31
last_update:
  date: 1/30/2024
---



## Risk Identification 

- **Risk Identification in Cybersecurity**
  - Proactively identifying cyber risks requires constant attention.
  - Continuous identification, characterization, and estimation of potential disruptions.
  - Security professionals understand strategic, tactical, and operational plans.
  - Identify risks for clear communication and protection.
  - Employee Involvement - All levels contribute to identifying risks.

- **Security Professional's Role**
  - Assist in system-level risk assessment, focusing on processes, controls, monitoring, or incident response.
  - Contribute to risk management in smaller organizations lacking mitigation plans.

## Risk Assessment 

Risk Assessment is the process of identifying, estimating, and **prioritizing** risks to an organization's operations, assets, individuals, and mission.

- **Alignment with Goals**
  - Links risks to organizational goals, objectives, assets, or processes.

- **Example: Fire Risk**
  - Options: Alarms, sprinklers, gas-based solutions.
  - Goal: Estimate and prioritize, considering costs and effectiveness.

- **Further Assessment**
  - Management may request detailed assessments.
  - Reports are required for review and approval.
  - Consider inherent or residual risks 

:::info 

**Likelihood Determination**

By analyzing industry reports, the analyst is gauging the probability of a similar ransomware attack succeeding against his organization, particularly due to the shared use of the same operating system.

:::

**Note:** There is no risk if both the vulnerability and threat is missing.

![](/img/docs/cissp-risk-vuln-threat.png)




## Risk Assessment Frequency 

Refers to how often the risk assessment process is conducted within an organization.

### Ad-Hoc 

Risk assessments performed on an as-needed basis, typically in response to unexpected events or changes in the environment. 

- Examples include after a security incident, a significant organizational change, or the introduction of new technology.
- Assessments when launching a new product or entering a new market. 

### Recurring 

Risk assessments scheduled at regular intervals, such as annually or semi-annually. 

- Normally part of an organization's standard operating procedures.
- Ensures risks are continually identified and managed effectively
- An example is a recurring [penetration testing](/docs/007-Cybersecurity/007-Assessment-and-Testing/067-Penetration-Testing.md).

### One-Time 

A risk assessment carried out just once, often at the beginning of a project, implementation of a new system, or during an initial risk evaluation. 

- Typically used for specific situations or projects with a defined timeline.
- Example is when there's new IT system or organizational change.
- **One-time is not repeated, while Ad-hoc may be repeated**

### Continuous 

An ongoing process of risk assessment that integrates risk monitoring into daily operations. 

- Real-time data collection and analysis.
- Uses automated tools and analytics to provide real-time risk insights
- Proactive risk management and swift response to emerging threats.

## Risk Assessment Types

### Quantitative Risk Assessment

Quantitative risk assessment is a risk analysis approach that uses numerical values and data to estimate risks.

- It relies on metrics, statistical models, and historical data to quantify risks.
- Prioritize risk management by focusing on risk exposure and potential financial or operational consequences.
- Often used to inform decision-making, budgeting, and resource allocation in cybersecurity and beyond.
- Example: Calculate the potential financial loss if a critical server fails

Important terms: 

- **Asset Value (AV)** 

  - Value of an asset, financial loss if asset fails
  - Risk assessors determine an asset's value using different options:
  
    - **Original Cost**
      - Simply looking at the invoice of an asset purchase.
      - The purchase price is then used to determine the asset value.
      - Easiest technique to perform, but is criticized.
      - The cost of replacing an asset may be slightly higher or lower.

    - **Depreciated Cost**
      - An accounting favorite, it reduces the value of an asset as it ages.
      - Uses an estimate of the asset's useful life and gradually decrease asset value until it reaches zero at the end of the projected lifespan.
    
    - **Replacement Cost**
      - Most popular, produces results closest to the actual costs.
      - Uses current supplier prices to determine the actual cost of replacing an asset, then uses this cost as the asset's value.  
  
- **Exposure Factor (EF)** 
  
  - Percentage of asset considered loss when negative incident occurs.
  - Percentage of damage to an asset when a risk materializes.

    ```bash
    EF = Risk of downtime (hours) / 24 hours
    ```

- **Single Loss Expectancy (SLE)** 

  - How much loss is experienced during one negative incident?
  - Actual damage we expect to occur if a risks occurs one time.

    ```bash
    SLE = AV * EF
    ```

- **Annualized Rate of Occurrence (ARO)** 

  - Expected number of yearly occurrences.
  - In cases of floods, we can consult records of yearly floods for the location.

- **Annualized Loss Expectancy (ALE)** 

  - Total yearly cost of bad things happening.
  - Amount of money we expect to lose each year from the risk.

    ```bash
    ALE = SLE * ARO
    ```

Example:

![](/img/docs/sec+-eg-computations.png)

![](/img/docs/sec+-ale-computation-example.png)


### Qualitative Risk Assessment

Qualitative risk assessment evaluates risks using descriptive, subjective factors instead of numerical data.
- Relies on expert judgment, interviews, and categorization of threats and vulnerabilities.
- Risks are classified into categories based on probability and impact:
  
  - High
  - Medium
  - Low

- Prioritize risks and determine security measures when quantitative data is unavailable or not suitable.
- Example: Understand the impact on the organization's reputation.


## Risk Treatment 

Risk treatment involves deciding on the most appropriate actions based on management's risk attitude and the availability and cost of mitigation measures.

- **Risk Avoidance**
    - Decision to eliminate a risk entirely.
    - May involve halting specific activities.
    - Leadership decision when impact or likelihood is deemed too high.

- **Risk Acceptance**
    - Decision to take no action to reduce risk likelihood.
    - Management proceeds with associated business functions without further action.
    - Occurs when impact or likelihood is negligible, or benefits outweigh the risk.
    - **Exemption** - provision that grants an exception from a specific rule or requirement

- **Risk Mitigation**
    - Most commonly used in risk management.
    - Aims to prevent or reduce risk likelihood or impact.
    - Involves measures like security controls and policies.
    - While complete mitigation isn't always possible, safety measures should be implemented.

- **Risk Transference**
    - Involves passing the risk to another party.
    - The party accepts financial impact in exchange for payment.
    - Commonly done through insurance policies.    


## Risk Priorities 

- **Prioritizing and Analyzing Risks**
  - Essential step post-risk identification.
  - Utilizes qualitative and quantitative analyses.
  - Aims to determine root causes and prioritize risk-response actions.

- **Contextualizing Risks**
  - Understands the organization's mission and supporting functions.
  - Places risks in context and identifies root causes.

- **Management Direction**
  - Typically, management directs the use of risk assessment findings.
  - Guides the prioritization of risk-response actions.

- **Risk Matrix for Prioritization**
  - Aligns likelihood of occurrence with impact.
  - Provides a common language for team and management.

          
      <div class="img-center">

          ![](/img/docs/risk-matrix-for-prioritization.png)
          

      </div>

- **Priority Assignment Factors**
  - Business priorities.
  - Mitigation costs.
  - Potential losses in case of an incident.


## Business Impact Analysis 

A Business Impact Analysis (BIA) is a process used to identify and evaluate the effects of disruptions to business operations. 

The goal of a BIA is to understand which functions and processes are critical to an organization's success and how they would be impacted by disruptions, such as natural disasters, cyberattacks, or equipment failures.

For more information, please see [Business Continuity](../009-Incident-Response/010-Business-Continuity.md).

