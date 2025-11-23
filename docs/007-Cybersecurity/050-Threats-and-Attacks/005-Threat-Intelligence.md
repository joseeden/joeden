---
title: "Threat Intelligence"
tags: 
- Security
- Cybersecurity
sidebar_position: 5
last_update:
  date: 1/30/2024
---


## Overview

Threat Intelligence is a continual process used to understand the threats faced by an organization. It is focused on analyzing evidence-based knowledge about an existing or emerging hazard to our asset. 

## Characteristics of Good Threat Intelligence

Known as **CART**, effective threat intelligence has four key traits:

1. **Confidence Levels**

   - Indicates how reliable the information is
   - Helps prioritize actions based on trustworthiness

2. **Accuracy**

   - Reflects correctness and validity of the data
   - Reduces false positives and misinformed decisions

3. **Relevancy**

   - Pertains to the organization’s context and threats
   - Ensures focus on actionable and meaningful intelligence

4. **Timeliness**

   - Delivered when needed to make decisions
   - Enables rapid response to emerging threats


## Types of intelligence

### Open-Source

Data that is available to use without subscription, which may include threat feeds similar to the commercial providers and may contain reputation lists and malware signature databases

- US-CERT
- UK’s NCSC
- AT&T Security (previously Alienvault OTX)
- MISP
- VirusTotal
- Spamhaus
- SANS ISC Suspicious Domains

### Proprietary

Threat intelligence is very widely provided as a commercial service offering, where access to updates and research is subject to a subscription fee 

- Some of these are repackaged information. 
- Not nearly as useful.

Companies that provide proprietary threat intelligence feeds:

- FireEye 
- McAfee 
- Symantec

### Closed-Source

Data that is derived from the provider's own research and analysis efforts, such as data from honeynets that they operate, plus information mined from its customers' systems, suitably anonymized

- Good example is **Fireeye**

### Information Sharing Organizations

These are alliances that are formed to share threat intelligence among its members.

- Centers 
- Organizations

Industries:

- Finance 
- Healthcare
- Energy

### Open-Source Intelligence (OSINT)

Methods of obtaining information about a person or organization through public records, websites, and social media.

### Dark Web 

The Dark Web is a part of the internet that is intentionally hidden and requires special software like Tor to access.

- A segment of the Deep Web, often associated with illegal or illicit activities.
- Often monitored by law enforcement due to its association with cybercrime.
- Contents are not indexed by search engine like Google
- Uses Tor network, which is sits over standard internet protocol.
- Encrypted anonymous connections

How it works:


<div class="img-center">

![](/img/docs/sec+-darkweb-darknet-how-it-works.png)


</div>


## Implicit and Explicit Knowledge 

All of the threat feeds mentioned previously as intelligence sources are considered **explicit knowledge**, but **explicit knowledge** comes from years of experience. 

## Automated Indicator Sharing 

Uses a specialized format called **Structured Threat Information Expression (STiX)** to package threat intelligence information.

- Exchange of cybersecurity intelligence between entities
- Uses **Trusted Automated Exchange of Intelligence Information (TAXII)** to transmit the packaged information 
- TAXII is like an RSS feed
- Normally built-in on security monitoring tools




## Collection Management Framework (CMF)

A Collection Management Framework (CMF) is a structured way to track and manage all potential sources of data that can help incident responders and investigators. 

- Organize collection from multiple sources
- Ensure data is accurate, complete, and ready for analysis
- Speeds up detection and response
- Avoids redundant efforts and wasted resources

It is usually maintained as a living document or spreadsheet listing digital assets (computers, network devices, PLCs, loggers) that generate logs or other forensic information.


### Log Sources

Common sources of intelligence for investigations:

- Logs
- Network telemetry
- Threat feeds
- OSINT

### Collection Methods

Collection methods define how data is gathered from sources efficiently.

- Automated agents
- APIs
- Manual collection

### Processing

Processing ensures collected data is meaningful and actionable for analysts.

- **Filtering**
   - Remove irrelevant or duplicate data
   - Focus on actionable indicators only

- **Enrichment**
   - Add context to raw data geolocation, IOC reputation)
   - Correlate with other sources for better insights

- **Prioritization**
   - Rank data based on risk, relevance, or threat impact
   - Focus on the most critical information first
