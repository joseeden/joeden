---
title: "Azure Front Door"
description: "Azure's Content Delivery Network (CDN)"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 20
last_update:
  date: 7/18/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::




## Overview

Azure Front Door is a service delivered from the edge of Microsoft's global network that revolutionizes global load balancing for applications and microservices. Front Door is a comprehensive solution for managing web traffic globally.#

## Key Features

1. **Improved App Performance**
   - Utilizes split TCP-based anycast protocol.
   - Ensures users connect to the nearest point of presence, enhancing access speed and reducing latency.

2. **Increased Availability**
   - Employs smart health probes to monitor backend resources for latency and availability.
   - Facilitates quick failover to remaining backend resources when one goes down.

3. **URL-Based Routing**
   - Routes traffic to backend pools based on URL paths in requests.
   - Enables granular configuration, directing requests to specific resources based on URL criteria.

4. **Session Affinity**
   - Provides cookie-based session affinity.
   - Ensures a specific user session remains on the same backend for the duration of the session.

5. **Additional Features**
   - **TLS Termination** Securely terminates TLS connections.
   - **Custom Domain Support** Supports custom domain configurations.
   - **URL Redirection** Facilitates URL redirection for enhanced flexibility.

For more information: [Azure Front Door Features Documentation](https://learn.microsoft.com/en-us/azure/frontdoor/)

   

