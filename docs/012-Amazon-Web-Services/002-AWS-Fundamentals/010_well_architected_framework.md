---
title: "Five Pillars of Well-Architected Frameworks"
description: "A guide in designing and running workloads in the cloud"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Certifications
sidebar_position: 10
last_update:
  date: 4/30/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::

## Overview 

This is a guide written by AWS that helps to describe key concepts for designing and running workloads in the cloud. This helps us determines what to look for in a service, in an architecture, and in the solutions we are building.

## 1. Operational Excellence

Its goal is to focus on running, monitoring, and designing our systems programmatically.

- Create your infrastructure as code

- Ability to repeat the things that work well

- Roll back changes that do not work. 

- Always look for ways to improve our infrastructure, our code, whenever possible.

- Continuously improve them, and monitor those changes in the system.

## 2. Security

Its goal is to ensure that security is everyone's  responsibility when building architectures. We need to secure our environments as much as we can, because failure to do so can be catastrophic for both your users, and your company. 

- Understand your responsibility.

- Robust identification and authorization of any users that have access to data.

- Ensure least-privilege principle.

- Create ways to trace data access and data movement.

- Provide security both at rest, and in transit for our data.

## 3. Reliability

Its goal is to ensure that our designs and architectures should be able to function correctly and consistently through its entire lifecycle. 

- Constantly testing and understanding how the system recovers from failure, scaling events, and outages. 

- Systems should be automated to reduce downtime and remove human error from the equation 

## 4. Performance Efficiency

Its goal is to encourage us to constantly look for new ways to improve our systems.

- Staying up to date on new technologies and services releases from AWS. 

- Determine when a served solution works better than a serverless solution.

- Understand when it's time to switch from one to the other, or when a combined approach might be beneficial.

## 5. Cost Optimization

Its goal is to ensure that we can technically complete the design specification of a project in a cost-effective way. 

- Everyone, everywhere cares about cost.

- We should not be creating wasteful architecture.

- Measure the efficiency of our systems 

- Determine if any change you make will cost more or less in the long run. 

- Regularly return to old solutions and see if there have been any improvements or new services that can be retrofitted in to improve cost saving. 

