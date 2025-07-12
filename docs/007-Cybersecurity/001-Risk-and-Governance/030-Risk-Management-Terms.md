---
title: "Risk Management Terms"
description: "Risk Management Terminologies"
tags: 
- Security
- Cybersecurity
- Risk Management
sidebar_position: 30
last_update:
  date: 1/30/2024
---




## Asset

An asset is something in need of protection.

- Can include data, systems, infrastructure, hardware, software, or personnel
- Loss or compromise of an asset may impact operations, finances, or reputation


## Vulnerability

Gap or weakness in protecting valuable assets, including information.

- Can result from misconfigurations, outdated systems, or lack of security controls
- Exploitable by threat actors to gain unauthorized access or cause damage
- **Example**: IT environment vulnerable to flooding during a major storm


## Threat

A potential danger that exploits a vulnerability to cause harm to assets.

- Can be intentional (e.g. hacker) or unintentional (e.g. natural disaster)
- **Example**: Natural disaster threatens utility power supply, impacts IT asset availability

**Harm by Exploitation:**

- Exploiting a vulnerability allows threats to harm assets
- **Example**: Storm cutting off power, rendering IT components unusable

**Mitigation and Risk Evaluation:**

- Evaluate event likelihood and take actions to reduce risk
- **Example**: Assessing storm risk and implementing backup power systems


## Threat Actor

An individual or a group posing a threat (according to NIST SP 800-150 under Threat Actor).

- Can include hackers, insiders, criminal groups, or nation-state actors
- Motivations vary: financial gain, espionage, disruption, or activism
- For more information, please see [Cyber Threat and Attacks.](/docs/007-Cybersecurity/011-Threats-and-Attacks/002-Threat-Actors.md)


## Threat Vector

Threat Vectors are means by which a threat actor carries out their objectives.

- Phishing emails
- Malicious websites
- Unsecured APIs
- Insider misuse


## Attacker

An Attacker is always an individual, but a Threat Actor can be either a group or an entity.

- Attackers use threat vectors to exploit vulnerabilities and compromise systems
- Can act independently or as part of a larger organization


## Attack Vectors

Pathways used to gain unauthorized access to systems or data.

- Weak configurations
- Open firewall ports
- Lack of user security awareness
- Lack of MFA
- Missing patches
- Infected USB drives


## Supply-Chain Attacks

Target weaknesses in external vendors or partners involved in service delivery.

- Attackers may compromise third-party tools or code to infiltrate your system
- **Examples**: Manufacturers, contractors, outsourced personnel

:::info 

As owners of the contractual agreement, we have the **right to audit** the third-party systems any time to make sure they're compliant with standards and regulations.

:::

## Likelihood

### Likelihood of Occurrence

This refers to how likely it is that a threat will successfully exploit a vulnerability.

- It is usually estimated based on past incidents, known threats, and system weaknesses
- Often categorized as **Low**, **Medium**, or **High*- probability
- Helps prioritize risks by weighing the chances of a real event occurring

### Impact Assessment

Impact is the potential damage or consequences resulting from a successful exploit.

- Includes **data loss**, **financial damage**, **reputation harm**, or **service disruption**
- May vary depending on the type of system affected and the sensitivity of the data
- Assessment INCLUDES **direct consequences* (e.g., system outage) and **indirect effects* (e.g., customer trust loss)



## Shadow IT

Shadow IT refers to the use of software, hardware, or services by employees without approval from the IT or security teams.

- Can lead to security risks, data leaks, and compliance violations
- Managed through clear policies, monitoring tools, and staff awareness

# State Actor

A state actor is an individual or group working on behalf of a government to carry out cyber operations.

- Backed by strong resources and expertise to launch advanced attacks
- Often target sensitive sectors like government, defense, and critical services

To defend against state actors, organizations need strong cybersecurity measures, real-time threat intelligence, and international cooperation.


## Advanced Persistent Threat

An Advanced Persistent Threat (APT) is a sophisticated and stealthy cyber attack, usually conducted by organized groups that are often linked to nation-states.

- They focus on maintaining long-term access to a target's network.
- APTs often aim to gather intelligence, steal data, or disrupt operations.
- For more information, please see [APTs.](/docs/007-Cybersecurity/011-Threats-and-Attacks/002-Threat-Actors.md#advanced-persistent-threats)

## Advanced Tactics, Techniques, and Procedures

Advanced Tactics, Techniques, and Procedures (TTP) describe the behaviors and methods used by threat actors in cyber attacks.

- **Tactics** refer to the high-level goals or strategies that threat actors aim to achiev
- **Techniques** involve the specific ways or approaches attackers use to execute tactic
- **Procedures** describe detailed steps or sequences used to carry out techniques consistentl
