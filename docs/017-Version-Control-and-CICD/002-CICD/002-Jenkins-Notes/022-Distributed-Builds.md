---
title: "Distributed Builds"
description: "Parallel builds using Jenkins agents"
tags: [CICD, Continuous Integration, Continuous Delivery, Continuous Deployment, Jenkins]
sidebar_position: 22
last_update:
  date: 7/7/2022
---



## Overview

Distributed builds allow build jobs to run on separate agents (nodes), while the master controls and assigns specific builds to specific agents, enhancing parallelism and supporting multiconfiguration setups.

- Nodes can be tagged for specific configurations.
- Relevant pipeline steps can be directed to the right node. 

Note that atifacts and reports are sent back to the master, so storage for the master must be carefully planned.

![](/img/docs/1027-jenkins-distributed-builds.png)

As an example, you need to run 5 tests on 3 software versions requires 15 runs.

- Running all tests on the master takes longer.
- Running them in parallel on agents speeds up the process.

Reminders:

- Use SSH or JNLP (TCP or HTTP) for communication.
- Agents should be replaceable (fungible).
- Configure globally on the master, not locally on agents.



## Starting the Slave Agent 

There are different ways to start the slave agent:

- The master starts the slave agents via SSH 
- Manually start the slave agent using Java Web Start 
- Install the slave agent as a Windows service 
- Start the slave agent from the command line on the slave node.





