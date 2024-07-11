---
title: "Secure Automation"
description: "Securing each step of the automation"
tags: [Linux, DevOps, Cloud, SRE]
sidebar_position: 2
last_update:
  date: 2/5/2023
---




## Overview

With automation, we can remove the chance of human error or "willful sabotage".

## Secure Builds

- We can secure automated steps but we cannot provenly secure manual steps

- Generated artifacts can be validated and checked for compliance

- All build artifacts should be digitally signed with approved organization certificates

- DevSecOps works to secure the delivery  pipeline

- Every should be in code - Infra-as-code, config-as-code, etc. 

- Code should be held in secure code repositories with regualted access

## Secure Tests

- Deployed artifacts should be the same acorss all environments  

- Using environment variables and configuration to handle differences when deploying artifacts 

- Using secure and insecure test data to test the security boundaries of the service

## Secure Staging

- Immutable staging environments 

- Staging/pre-prod is typically where dependencies and integrations are tested.

- Same artifact should be deployed to staging/pre-prod environment 

- Consider how data-handling rules like GDPR apply on staging data   

- PCI compliance may need to be considered for financial and payment-related data

## Secure Production

- Production environments are immutable 

- Same artifacts are deployed to prod

- Ensure data security compliance (e.g. GDPR, PCI, SOX) are met

- Failure testing can help with audit compliance

- Dedicated security scanning to uncover security vulnerabilites


## Resources 

- [SRE Tools & Automation](https://cloudacademy.com/course/sre-tools-automation-1039/results/?context_resource=lp&context_id=1759)
