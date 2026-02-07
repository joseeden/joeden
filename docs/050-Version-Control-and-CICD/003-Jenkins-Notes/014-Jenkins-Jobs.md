---
title: "Jenkins Jobs"
description: "Instructions that Jenkins perform"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
sidebar_position: 14
last_update:
  date: 5/13/2020
---


## Jobs 

Jenkins jobs are a set of instructions that you can configure for Jenkins to perform in an automated fashion.

![](/img/docs/1027-jenkins-jobsssss.png)


## Types of Jobs

- **Freestyle Project**
    - Basic setup for straightforward builds and tasks
    - Flexible, often used for simple jobs or testing

- **Pipeline**
    - Defines complex workflows through code
    - Supports sequential and parallel tasks in multiple stages

- **Multi-Configuration Project**
    - Executes builds across different environments or configurations
    - Useful for testing variations, like OS versions or hardware setups

- **Folder**
    - Organizes multiple jobs into folders for easy management
    - Ideal for grouping jobs by project or team

- **Multi-Branch Pipelines**
    - Automatically sets up pipelines for each branch in a repository
    - Supports feature branch testing and deployment
