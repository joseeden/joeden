---
title: "WAF and API Gateway"
description: "Security through Managed Firewall and API Gateway features"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 71
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## AWS WAF 

AWS WAF is a web application firewall that helps to protect your web applications from common web exploits that could affect application availability, compromise security, or consume excessive resources.

- Can specify web security rules on which traffic to allow or block.  
- Can create custom rules to block common attack patterns.

## AWS Shield and Shield Advanced
 
Shield is a managed service that is enabled by default and works in conjunction with WAF which provides basic DDoS protection at no additional cost for AWS customers.

Shield Advanced is a paid version:

- 3000USD per month plus additional data transfer fees
- Cost protection and advanced capabilities 
- Advanced DDoS protection 
- 24/7 DDoS response team 
- More visibility and reporting

### How it works

- WAF integrates with application loadbalancers at a regional level. 
- It also works with CloudFront at a global level.
- WAF also allows geofencing to allow access from certain countries.
- Can be configured in multiple ways:

    - **Allow all** - withe exceptions 
    - **Block all** - with exceptions 
    - **Count** the ones that match certain properties

        ![](/img/docs/awswafshieldshieldadvanced.png)


## Throttling and Caching in API Gateway

As a recap, API Gateway is a fully managed service that makes it easy for developers to create, publich, maintain, monitor, and secure APIs at any scale.

- Creat REST and WebSocket APIs 
- Acts as front door for applications to access data, business logic, or functionality from your backend services

### Throttling 

The API Gateway Throttling feature prevents your API from being overwhelmed with too many requests.

- When exceeded, it returns a:

    ```bash
    HTTP 429  TOO MANY REQUESTS 
    ```
- Allows you to configure how many requests your API can handle:

    - request per second 
    - burst of requests 

    ![](/img/docs/awsapigwthrottlinefeature.png)

### Caching 

This feature allows caching the endpoint response. 

- If a lot users request for the same object, API Gateway can cache the response which reduces the processing 
- Reduces latency 
- When enabled, TTL can be from 300 to 3600 seconds
