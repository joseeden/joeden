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

Risk identification is the process of spotting risks early so the organization can prepare for them.

- **Risk Identification In Cybersecurity**

  - Involves spotting risks before they become problems
  - Requires ongoing attention from the team
  - Considers strategic, tactical, and operational plans
  - Helps teams communicate risks clearly
  - Encourages employees at all levels to contribute

- **Security Professional Role**

  - Supports system-level risk assessments
  - Reviews processes, controls, and response plans
  - Helps smaller teams that lack formal mitigation plans

Risk identification ensures everyone understands what could go wrong and how to prepare for it.

## Risk Assessment 

Risk Assessment is the process of identifying, estimating, and **prioritizing** risks to an organization's operations, assets, individuals, and mission.

- **Alignment with Goals**
  - Links risks to goals, assets, and processes
  
- **Example: Fire Risk**
  - Solutions include alarms or extinguishing systems
  - Focuses on estimating and prioritizing risk

- **Further Assessment**
  - Management may need deeper analysis
  - Formal reports help with reviews
  - Considers inherent and residual risk

:::info 

**Note:** There is no risk if both the vulnerability and threat is missing.

:::

![](/img/docs/cissp-risk-vuln-threat.png)




## Risk Assessment Frequency 

Risk assessment frequency describes how often assessments happen.

### Ad-Hoc 

Risk assessments performed on an as-needed basis, typically in response to unexpected events or changes in the environment. 

- Happens after an incident or major change
- Can occur when launching new services

Ad-hoc assessments help teams respond quickly when situations change suddenly.

### Recurring 

Risk assessments scheduled at regular intervals, such as annually or semi-annually. 

- Normally part of an organization's procedures.
- Ensures risks are continually identified and managed
- An example is a recurring [penetration testing](/docs/007-Cybersecurity/028-Assessment-and-Testing/067-Penetration-Testing.md).

### One-Time 

A risk assessment carried out just once, often at the beginning of a project, implementation of a new system, or during an initial risk evaluation. 

- Useful for new systems or major changes
- Not repeated unless required later
- Example: When there's new IT system or organizational change.

:::info 

One-time is not repeated, while Ad-hoc may be repeated.

:::

### Continuous 

An ongoing process of risk assessment that integrates risk monitoring into daily operations. 

- Real-time data collection and analysis.
- Uses automated tools to provide real-time risk insights
- Proactive risk management and swift response to emerging threats.

## Risk Assessment Types

### Quantitative Risk Assessment

Quantitative risk assessment is a risk analysis approach that uses **numerical values** and data to estimate risks.

- Relies on metrics and historical data
- Prioritizes based on financial and operational impact
- Helps with budgeting and resource allocation
- Example: Calculating loss from server failure



### Qualitative Risk Assessment

Qualitative risk assessment evaluates risks **using descriptive and subjective factors** instead of numerical data.

- Uses interviews and expert judgment
- Helps when numbers are unavailable or practical
- Example: Evaluating reputational impact

In this type of assessment, the risks are classified into categories based on probability and impact:

- `High`
- `Medium`
- `Low`

While there are established standards for conducting qualitative assessments, the method itself is not the most important part. What truly matters is ensuring that accurate, relevant information is used so the organization can make the best possible business decisions.

## Metrics in Quantitative Risk Assessment

### Asset Value (AV)

**Asset value** shows how much something is worth and how much money is lost if it stops working. Risk assessors determine asset value using several methods:

- **Original Cost**

  - Based on the initial purchase invoice of the asset.
  - Often used when historical cost data is available.
  - Does not consider current market value or depreciation over time.

- **Depreciated Cost**

  - Wear and tear  reduces the value of the asset over time.
  - Uses *straight-line* or *declining balance depreciation*.
  - Reflects the current book value rather than replacement cost.

- **Replacement Cost**

  - Estimates the cost to replace the asset at today's market price.
  - Most accurate, as it considers real-world current values.
  - Often used for insurance and disaster recovery planning.

### Exposure Factor (EF)

**Exposure factor** shows the percent of damage an asset suffers when something bad happens.

```bash
EF = Risk_of_downtime_hours / 24
```

- Shown as a percent of the total asset
- Can be small or large depending on impact
- Helps estimate how much of the asset value will be lost

EF makes it easier to predict damage by turning the impact into a simple percentage.


### Single Loss Expectancy (SLE)

**Single Loss Expectancy (SLE)** represents the monetary loss from a single occurrence of a risk event. 

```bash
SLE = AV - EF
```

- Uses asset value and exposure factor
- Shows loss from one incident only
- Helps in deciding what protections are needed




### Annualized Rate of Occurrence (ARO)

**Annualized Rate of Occurrence (ARO)** estimates how many times a specific risk may occur over a year. It is based on historical data, industry statistics, or expert judgment.

- ARO of `1.0` → Risk happens once per year
- ARO of `0.1` → Risk happens once every 10 years
- Higher ARO means the event is more common

ARO helps estimate long-term risk by looking at how often an event is expected.

### Annualized Loss Expectancy (ALE)

**Annualized Loss Expectancy (ALE)** calculates the total financial loss expected over one year due to a specific risk. 

```bash
ALE = SLE - ARO
```

- Combines cost per event and frequency
- Helps compare cost of controls versus yearly losses
- Useful for planning, budgeting, and security decisions

ALE summarizes everything by giving the yearly financial impact of a risk.

Example computation:

![](/img/docs/sec+-eg-computations.png)

![](/img/docs/sec+-ale-computation-example.png)

These computations help organizations make informed decisions on where to invest in security, how to prioritize risks, and how to allocate resources effectively.


## Risk Analysis Methods

Risk analysis methods help identify, evaluate, and understand potential risks in a structured way. They are used in cybersecurity, engineering, and business to prevent or reduce negative impacts.

### Fault Tree Analysis (FTA)

**Fault Tree Analysis (FTA)** is a visual method that uses a diagram to find the root cause of failures in a system.

- Uses a tree diagram to map failure events
- Starts with a top-level failure and breaks it into causes
- Helps prioritize risks based on likelihood and impact

Failures are shown as a top event in a logic tree, with causes branching out below. FTA gives a clear picture of how problems spread and  helps prevent system failures.

<div class='img-center'>

![](/img/docs/Screenshot-2025-11-29-211521.png)

</div>

### Failure Modes and Effects Analysis (FMEA)

**Failure Modes and Effects Analysis (FMEA)** identifies potential failures in a system and assesses their effects.

- Lists possible failure modes for each component
- Evaluates severity, likelihood, and detectability
- Prioritizes risks using a risk priority number (RPN)
- Common in product development and operational environments

FMEA helps teams systematically spot weaknesses and plan corrective actions before failures occur.

<div class='img-center'>

![](/img/docs/GettyImages-826284808.jpg)

</div>

### Attack Tree Analysis

**Attack Tree Analysis** maps potential attacks on a system in a hierarchical structure.

- Each branch represents a way an attacker could achieve a goal
- Assigns likelihood or difficulty to each attack path
- Useful for designing better security controls

An attack tree is a diagram that represents the attack pattern by presenting:

1. Decision points 
2. Specific conditions required for the attack
3. Endpoints for the attack 

Attack trees make complex security threats easier to understand and defend against by showing all possible attack paths.

<div class='img-center'>

![](/img/docs/An-example-attack-tree.png)

</div>


### Facilitated Risk Analysis Process (FRAP)

**Facilitated Risk Analysis Process (FRAP)** is a qualitative risk assessment methodology used to focus only on the systems that really need assessing, to reduce costs and time obligations. 

- Collaborative approach to assess risks with stakeholders
- Conducted in workshops with team members
- Focuses on high-impact, high-likelihood risks
- Helps prioritize actions and assign responsibilities

FRAP stresses prescreening activities so that the risk assessment steps are only carried out on the item(s) that needs it the most. FRAP is intended to be used to analyze one system, application, or business process at a time. 






## Risk Treatment 

Risk treatment involves deciding on the most appropriate actions based on management's risk attitude and the availability and cost of mitigation measures.

### Risk Avoidance

Risk avoidance means removing the risk completely.

- Decision to eliminate a risk entirely.
- May involve halting specific activities.
- Leadership decision when impact or likelihood is deemed too high.

Avoidance helps when a risk is too costly or dangerous to accept.

### Risk Acceptance

Acceptance means choosing to do nothing about the risk.

- Used when impact is small
- Management continues business as usual
- Includes **exemptions** when needed

When a company decides to accept a risk, it should be a decision based on:

- **Cost** - Countermeasure costs more than potential loss.
- **Pain** - The company can live with the vulnerability and threat.
- **Visibility** - The company won’t be viewed as irresponsible in the industry or by stakeholders.

### Risk Mitigation

Mitigation reduces the risk impact or likelihood.

- Most commonly used treatment
- Includes controls and policies
- Reduces but may not eliminate risk

Mitigation ensures risks stay manageable even if they cannot be fully removed.


### Risk Transference

Transference moves the risk to another party.

- Often done through insurance
- Another party handles financial loss
- Used when risk is expensive to manage internally

Transference helps organizations avoid absorbing major financial losses.

### Risk Rejection 

Risk rejection means ignoring a risk without proper evaluation.

- Happens when risks are dismissed
- Often caused by lack of awareness
- Poses major compliance problems

Rejection is dangerous because it leaves the organization exposed without preparation.


## Risk Priorities 

Prioritizing risks helps teams decide what to act on first.

- **Prioritizing and Analyzing Risks**
  - Essential step post-risk identification.
  - Utilizes qualitative and quantitative analyses.
  - Determine root causes and prioritize risk-response actions.

- **Contextualizing Risks**
  - Aligns the risks with mission and goals.
  - Places risks in context and identifies root causes.

- **Management Direction**
  - Management typically directs the use of assessment findings.
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


:::info 

After a risk response has been implemented, the continuing effectiveness of controls to protect assets is carefully monitored to ensure that they maintain their protection in the face of a changing threat environment. 

:::

## Business Impact Analysis 

A Business Impact Analysis (BIA) identifies how disruptions affect operations.

- Finds critical functions
- Evaluates impact of outages
- Supports planning for disasters or attacks

A BIA ensures the organization knows which processes need protection the most.

For more details, see [Business Continuity.](/docs/007-Cybersecurity/030-Incident-Response/010-Business-Continuity.md).
