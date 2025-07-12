---
title: "Threat Actors"
tags: [Cybersecurity]
sidebar_position: 2
last_update:
  date: 1/30/2024
---


## Overview

Threat actors are individuals or groups that carry out malicious activities to compromise security, disrupt operations, or gain unauthorized access to data and resources. 


### Attacker 

An Attacker is always an individual, but a Threat Actor can be either a group or an entity. The three most common goals of cybersecurity attackers are DAD:

- Disclosure
- Alteration
- Denial

For more information, please see [Threats and Attacks](/docs/007-Cybersecurity/011-Threats-and-Attacks/050-Attacks.md). 

### Hackers

There are five types of hackers:

- White Hats
- Black Hats
- Gray Hats
- Blue Hats
- Elite

## Motivations 

The motivations behind the threat actors' actions can vary significantly. Note that there is a difference between the intent behind the attack and the motivation that fuels the attack.

- **Intent** - specific objective
- **Motivation** - underlying reason, or driving forces 

Some common motivations are:

- **Data Exfiltration**

  - Refers to unauthorized transfer of data from a computer.
  - Attackers will want to gain access to information such as PII or trade secrets.
  - Stolen data can then be sold on the dark web or used for identity theft.

- **Financial Gain**

  - Motivated by the prospect of making money through illegal activities. 
  - This can involve ransomware, stealing credit card information, fraud, or selling stolen data on the dark web.

- **Blackmail**

  - Attacker obtains sensitive or compromising information about the individual.
  - The attacker can threaten to release the information to the public unless certain conditions are met.
  - Demands often involve financial transactions, typically in the form of cryptocurrencies. 

- **Service Disruptions**

  - Overwhelming the organization's network through DDoS attack.
  - Often done to cause chaos or make a statement.

- **Chaos or Curiosity**

  - Motivated by the thrill of hacking, seeing it as a challenge, a way to prove their technical skills or simply to cause harm.
  - Common among certain hacking groups or individuals exploring the limits of technology.

- **Philosopical or Political Beliefs**

  - Hacktivists are motivated by ideological, political, or social causes. 
  - They might launch attacks to promote their beliefs, protest against organizations or governments, or raise awareness about particular issues.

- **Personal Vendetta**

  - Sometimes threat actors have personal grievances against an individual, company, or group. 
  - Their attacks are driven by revenge or a desire to cause harm to those they believe have wronged them.

- **Revenge**

  - Similar to personal vendettas, this motivation involves retaliating against someone or something that the threat actor feels has harmed them or their interests.

- **Espionage**

  - Driven by the need to gather sensitive information for political, economic, or military reasons. 
  - This could involve state-sponsored espionage to steal trade secrets or gather intelligence from rival nations.

- **Competition**

  - In a business context, threat actors might attempt to gain a competitive edge by stealing trade secrets, intellectual property, or other confidential information from rivals.

- **Cyber Warfare**

  - State-sponsored threat actors may target other nations to disrupt infrastructure, spread misinformation, or create chaos. 
  - This can be part of broader geopolitical strategies or conflicts.

- **Terrorism**

  - Cyberterrorists use cyber attacks to create fear, cause disruption, or damage critical infrastructure. 
  - Their motivations often align with broader terrorist ideologies.

- **Ethical Reason**

  - Authorized hackers are motivated by the desire to improve security. 
  - Intention is patching and mitigating risks
  - Pentesters and ethical hackers


## Threat Actor Attributes 

Specific characteristics or properties that define and differentiate various threat actors from one another.


### Internal vs. External

- **Internal (Insiders)**

  - Current/former employees or contractors with access to internal systems. 
  - Motives include revenge, financial gain, or accidental negligence.

- **External**

  - Actors outside the organization, like hackers, criminal groups, or nation-states
  
  - Target systems for various motives, such as financial gain, espionage, or ideological reasons.

### Resources and Funding

- **Low Resources/Funding**

  - Minimal financial or technological backing. 
  - Uses basic tools, scripts, or publicly available resources.

- **Moderate Resources/Funding**

  - Greater resources for advanced tools and teams. 
  - Includes organized criminal groups or hacktivists.

- **High Resources/Funding**

  - Significant backing, typically from nation-states or large crime syndicates, allowing for sophisticated operations and custom tools.

### Levels of Sophistication and Capability

- **Low Sophistication/Capability**

  - Basic tools, limited technical skills.
  - Often relying on known vulnerabilities or social engineering.

- **Moderate Sophistication/Capability**

  - Advanced techniques like zero-day exploitation and refined social engineering. 
  - Capable of crafting targeted attacks.

- **High Sophistication/Capability**

  - Advanced technical skills with custom-built tools and multi-stage attacks. 
  - Can maintain a presence for extended period of time without detection.
  - Often include nation-states, APTs, or high-end criminal networks.



## Types of Threat Actors 

### Unskilled Attackers

Commonly called "Script Kiddies", this threat actors have little to no skill who only use the tools and exploits written by others.

- Can still pose as significant threat.
- Most experienced hackers start as script kiddies.
- Most are motivated by the desire for recognition, curiosity, or thrill.
- Opportunistic, as they tend to focus on easier targets.

### Hacktivists

Attackers who are driven by a cause like social change, political agendas, or terrorism, often to promote or protest against specific issues or actions.

- Hacking + Activism 
- Use wide range of techniques such as website defacement, DDoS attacks, etc.
- Defacing sites are just another form of graffiti.
- Most well-known is the **Anonymous** and **LulzSec**.
  
### Organized Crime

Attackers who are part of a crime group that is well-funded and highly sophisticated.

- Well-plan operations and coordinated based on the approach.
- Members could be across countries and borders.
- Have resources, expertise, and networks to carry out sophisticated attacks: 
  - custom malware 
  - ransomware
  - phishing campaigns

:::info 

Organized crime groups are most likely to be hired by a foreign government to attack critical systems located in other countries

:::

### Advanced Persistent Threats

Highly trained and funded groups of hackers (often by nation states) with covert and open-source intelligence at their disposal.

  - Orchestrated by well-funded entities.
  - Targets specific organizations.
  - Aims to steal sensitive information or disrupt operations.
  - Attack could span months or even years. 
  - *Reference:* ISC2 Study Guide, Chapter 4, Module 2.

Nation-state actors sometimes conduct **False Flag Attack**, which is orchestrated to make it appear that the attack originated from a different source or group with the intent to mislead investigators.

Motivations of Nation-state actors: 

- Gathering Intelligence 
- Disrupting critical infrastructure 
- Influencing political processes 
- Cyber espionage, to steal nation secrets
- Most are not focused on financial gains

### Insider Threats 

Often overlooked, insider threats are security threats that originate from within the organization. 

- Motivated by financial incentives, dissatisfaction with their employer, etc.
- Their inside access and pre-existing knowledge makes them especially dangerous.
- Can be in many forms:
  - Data theft 
  - Sabotage
  - Misuse of access privileges 
  - Help in facilitating external attacks 

## Types of Hackers 

### White Hats

Non-malicious hackers who attempt to break into a company’s
systems at their request.

- Normally contracted and paid by the company.
- Ethical hackers and penetration testers

### Black Hats

Malicious hackers who break into computer systems and
networks without authorization or permission.

### Gray Hats

Hackers without any affiliation to a company who attempt to
break into a company’s network but risk the law by doing so.

Difference with Black Hat: Gray hats doesn't have any malicious intent.

### Blue Hats

Hackers who attempt to hack into a network **with permission** of
the company **but are not employed by the company**.

- Freelance ethical hacker/penetration tester
- Bug bounty programs

### Elite

Hackers who find and exploit vulnerabilities before anyone else
does. 1 in 10,000 are elite.

- Create their own tools, which everyone ends up using.

### Script kiddies

Script kiddies have limited skill and only run other people’s exploits and tools.

- Other end of spectrum, normally babies of the bunch.
- Little to no skill 
- Most people start as script kiddies




