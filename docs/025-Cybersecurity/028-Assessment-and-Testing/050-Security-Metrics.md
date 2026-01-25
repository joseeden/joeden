---
title: "Security Metrics"
description: "Measuring efficiency with metrics"
tags: [Security, Cybersecurity, Security Operations, Vulnerability Management, Security Assessment, Security Testing]
sidebar_position: 50
last_update:
  date: 1/30/2024
---


## Overview

Organizations use security metrics to evaluate how well their security programs are performing. These metrics help understand both the current state and long-term health of the security framework.

- Metrics assess critical security controls.
- Provide short-term and long-term insights.
- Use predefined standards to ensure accuracy and consistency

:::info[Metrics come from the processes]

Security processes generate the primary data needed to measure performance, preparedness, and risk. Metrics and indicators are derived from how well these processes are executed, rather than just external assessments, raw risk data, or vulnerability scans.

::: 

## Key Traits of Good Metrics

Six characteristics of effective security metrics are:

1. **Measurable / Quantifiable**

    - Can be reliably measured or expressed in numbers
    - Ensures results are objective and trackable over time

2. **Relevant**

    - Focuses on aspects that truly impact security
    - Aligns with organizational goals and priorities

3. **Actionable**

    - Provides insights that guide decisions or improvements
    - Helps teams know what steps to take next

4. **Robust / Consistent**

    - Standardized across time and teams
    - Reliable and resistant to errors, bias, or manipulation

5. **Comparative / Timely / Aligned**

    - Available when needed for decision-making
    - Allows performance comparisons over time or against benchmarks

6. **Simple / Understandable**

    - Easy to interpret and communicate
    - Ensures stakeholders can quickly grasp insights without confusion

## Types of Security Metrics

These metrics provide a complete view of tactical performance and long-term risk posture.


### Preparedness Metrics

**Preparedness metrics** show how ready an organization is for security incidents.

- Evaluate overall security controls and maintenance
- Focus on program-wide effectiveness

Examples:

- Monthly change in mean time to patch systems
- Percentage of systems fully patched
- Percentage of staff up to date on security awareness training

### Performance Metrics

**Performance metrics** measure how well systems and teams detect, block, and respond to threats

- Focus on tactical, day-to-day security operations
- Help identify areas for improvement

Examples:

- Number of incidents detected and blocked per month
- Mean time to detect (MTTD) and respond (MTTR) to threats
- Volume of security alerts handled within SLA

### Goal Metrics

**Goal metrics** track how well the organization meets strategic objectives.

- Align security outcomes with business goals
- Used to monitor progress over time

Examples:

- Reduction in high-risk vulnerabilities year-over-year
- Percentage of security projects completed on schedule
- Alignment of security initiatives with business objectives


### Risk Metrics

**Risk metrics** show organizational risk and changes over time.

- Forward-looking, highlighting potential future issues
- Useful for executives and strategic decision-making

Examples:

- Ratio of security incidents to industry benchmarks
- Number of critical risks mitigated vs. identified
- Trend of potential financial impact from security risks

## Types of Indicators

These indicators help organizations monitor both operational efficiency and potential threats.

### Key Performance Indicators (KPIs)

**Key Performance Indicators (KPIs)** help organizations track their security program’s performance by measuring how well it achieves its objectives. They focus is on historical performance to ensure continuous improvement.

Examples:  

- Decrease in security breaches  
- Increase in security clauses in SLAs  
- Time to implement security controls after identifying threats

### Key Risk Indicators (KRIs)

**Key Risk Indicators (KRIs)** identify and quantify potential risks, which enables organizations to anticipate and mitigate potential threats. They provide a forward-looking view of risk factors and the focus in on risk assessment

Examples:  

- Identify risks significant to the business  
- Measure reliability and sensitivity of risk indicators

When considering KRIs, it is useful to relate them to **single loss expectancy** (potential monetary loss if a specific threat were to be realized). A change in a KRI equates to a change in the likelihood that a specific threat will be realized, increasing the risk of a loss. 

:::info 

Key performance indicators measure how well things are going currently, while key risk indicators measure how badly things could go in the future.

:::

## Common KPIs for Security Programs

ITIL suggests nine KPIs that can guide security programs:

1. Percentage decrease in security breaches.
2. Reduction in the impact of breaches.
3. Increase in SLAs with security clauses.
4. Number of preventive measures implemented.
5. Time between identifying threats and applying controls.
6. Number of major security incidents.
7. Security incidents causing outages or impairments.
8. Number of security tests, training, and awareness events.
9. Shortcomings identified during security tests.


## KRIs Criteria

ISACA recommends choosing KRIs based on these criteria:

- **Impact**: Identifies risks significant to the business.
- **Effort**: Ease of implementation and ongoing support.
- **Reliability**: Indicator's ability to predict risks.
- **Sensitivity**: Captures variances in risk accurately.



## Real User Monitoring (RUM)

RUM is a metric-based assessment approach that collects data from actual users interacting with an application or service. It helps evaluate real-world performance and user experience.

- Monitors live user sessions 
- Measure response time, latency, and availability
- Detects issues specific to certain browsers or devices
- Supports continuous monitoring and performance-based security metrics

Comparison:

- **RUM (Real User Monitoring):** Uses real user activity; reflects actual behavior and conditions
- **Synthetic Monitoring:** Uses simulated or scripted transactions to test performance proactively

:::info 

Real user monitoring (RUM) lacks the elements of predictability and regularity, which means that a problem won’t be detected during low utilization periods. 

:::
