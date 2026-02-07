---
title: "Jenkins Architecture"
description: "Jenkins uses a master-slave architecture"
tags:
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Jenkins
sidebar_position: 11
last_update:
  date: 5/13/2020
---


## Jenkins Architecture

Jenkins architecture supports continuous integration and delivery through automation.

- **Scalable Design**  
  - Utilizes a master-slave setup.  
  - Distributes tasks for better efficiency.  

- **Plugin Support**  
  - Offers extensive plugins for integration.  
  - Enhances functionality and customization.  

<div class='img-center'>

![](/img/docs/cicd-jenkins-architecture-1026.png)

</div>


## Master Node

The master node orchestrates the build process and manages configurations.

- **Job Management**  
  - Schedules and executes jobs.  
  - Manages builds and tests.  

- **User Interface**  
  - Provides a web-based management interface.  
  - Allows users to configure jobs and view statuses.  

## Slave Node

Slave nodes execute tasks assigned by the master node, distributing workloads.

- **Parallel Execution**  
  - Runs multiple builds simultaneously.  
  - Reduces overall build time.  

- **Resource Utilization**  
  - Efficiently uses separate machines for tasks.  
  - Frees the master node for management duties.

## Components of Jenkins

- **Job/Project**  
   - Represents a single task to be executed.  
   - Can be configured for builds, tests, and deployments.  

- **Slave/Node**  
   - Executes jobs sent by the master node.  
   - Helps distribute workload for efficiency.  

- **Executor**  
   - A computational resource for executing builds on a node.  
   - Each node can have multiple executors for parallel processing.  



## Executor

An executor is a crucial component in Jenkins that enables builds to run on nodes efficiently.

- Represents a resource unit for executing builds on a node.
- Indicates the maximum number of concurrent builds.
- Set the number of executors to match CPU cores for optimal performance.  
- More executors can increase throughput but may lengthen individual build times.  
- Enables simultaneous CPU-bound and I/O-bound builds for better resource use.

## Label Nodes

In certain scenarios, specific nodes may be reserved for particular job types. 

- For example, performance tests might need a dedicated machine.
- Label test jobs to restrict them to specific machine.
- Labeling prevent other jobs from using the test jobs

## Build Steps and Build Triggers

Build steps define the actions taken during a build process, while build triggers determine when builds are initiated.

- **Build Steps**  
   - Specify actions like compiling code and running tests.  
   - Can include scripts, commands, or plugins.  

- **Build Triggers**  
   - Automate build initiation based on events, such as code commits.  
   - Supports scheduled builds and manual triggers.  

For more information, please see [Jenkins Build Triggers.](/docs/050-Version-Control-and-CICD/003-Jenkins-Notes/015-Jenkins-Build-Triggers.md)

## Artifacts and Repositories

Artifacts are the files produced from a build process, while repositories store these files for access and version control.

- **Artifacts**  
   - Generated outputs, such as compiled code and packages.  
   - Can be stored for future deployment or reference.  

- **Repositories**  
   - Centralized storage for artifacts and versioned code.  
   - Facilitates collaboration and access across teams.  

## Build Tools

Build tools automate the process of compiling and packaging code for deployment.

- **Automation**  
   - Streamlines the building process to improve efficiency.  
   - Reduces manual errors and speeds up delivery.  

- **Integration**  
   - Works seamlessly with Jenkins to manage builds.  
   - Supports various programming languages and frameworks.  

## Testing and Notifications

Testing ensures that code quality is maintained, while notifications keep the team informed about build statuses.

  - Verifies that the code functions as intended through automated tests.  
  - Helps catch bugs early in the development cycle.  

Notifications provide real-time updates on build statuses, ensuring the team is informed.

  - Alerts the team about successful or failed builds.  
  - Can be sent via email, messaging apps, or dashboards.  

There are different tests developers can run on their code:

- Unit Test
- Smoke Test
- Functional Test
- Acceptance Test

For more information, please see [Types of Tests.](/docs/050-Version-Control-and-CICD/002-CICD-Overview.md#types-of-tests)
