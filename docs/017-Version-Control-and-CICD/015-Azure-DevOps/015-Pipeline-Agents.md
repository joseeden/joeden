---
title: "Pipeline Agents"
tags: 
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Azure DevOps
sidebar_position: 15
last_update:
  date: 9/5/2022
---

## Overview

Azure DevOps pipelines need agents to execute tasks. These agents run on separate machines, not on the Azure DevOps server itself.  

  - A pipeline consists of one or more jobs.  
  - Each job has a series of tasks to execute.  
  - Jobs run on agents, not directly on the DevOps server.  

Agents are grouped into pools for management, aptly named **Agent Pools**.

  - Each job specifies which pool to use.  
  - When a job runs, an agent from the pool is selected to execute it.  

## Hosting the Agents  

Pipeline agents can run on managed or self-hosted environments, each with different costs and maintenance requirements.  

- **Microsoft-hosted**: Runs on managed machines with pre-installed software.  
- **Self-hosted**: Runs on your own machines, giving you control but requiring maintenance.  
- Microsoft-hosted agents cost about three times more than self-hosted ones.  

## Running Agents  

Agents can operate in different environments, which can affect job execution and state retention.  

- Runs on virtual machines or containers.  
- VMs support multiple jobs over time.  
- Containers run one job and then stop.  
- VMs retain job state, while containers start fresh each time.

## Installation Options 

The following are some options on installing the agents:

- Install by downloading and extracting a file.  
- Configure the agent and run it from the command line.  
- Automation is possible since everything comes in a zip file.  

## Best Practices

- Do not install agents on the Azure DevOps server.  
- Agents consume high CPU, memory, and disk I/O.  
- They execute all assigned tasks with the given permissions, posing security risks.  
