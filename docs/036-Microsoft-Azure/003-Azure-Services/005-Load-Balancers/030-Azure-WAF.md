---
title: "Azure Web Application Firewall"
description: "Centralized protection of your web applications"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 30
last_update:
  date: 11/16/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Overview

Azure Web Application Firewall (WAF) is a a powerful solution in the Azure security arsenal that provides a centralized defense against common web vulnerabilities and exploits. 

|![](/img/docs/azure-web-app-fw-cdn-app-gw-frontdoor.png)|
|-|

Designed to safeguard web applications from threats like SQL injection and [cross-site scripting attacks](/docs/025-Cybersecurity/051-List-of-Attacks/099-Other-Attacks.md), WAF simplifies protection efforts and enables rapid response to known vulnerabilities.

Azure Front Door seamlessly integrate with:

- Application Gateway
- Front Door 
- CDN

## Key Features

1. **Protection Across Services**
   - WAF can be deployed with Azure Application Gateway, Azure Front Door, and Azure Content Delivery Network (CDN).
   - Customizable features for each service ensure tailored protection.

2. **Application Gateway Deployment**
   - Protects web applications without requiring changes to application code.
   - Secures multiple applications concurrently, hosting and protecting up to 40 websites on a single Application Gateway instance.
   - Custom WAF policies for diverse site protection.

3. **Front Door Deployment**
   - Centralized protection on the edge locations of the Azure network worldwide.
   - Inspects every incoming request at the network edge, preventing attacks before entering the virtual network.

4. **Azure CDN Deployment**
   - Safeguards web content globally.
   - Mitigates attacks closer to their sources, enhancing security before reaching the network.

For more information: [Azure WAF Documentation](https://learn.microsoft.com/en-us/azure/web-application-firewall/)


   