---
title: "GitLab Architecture"
description: "GitLab Architecture"
tags: 
    - CICD
    - Continuous Integration
    - Continuous Delivery
    - Continuous Deployment
    - GitLab
sidebar_position: 5
last_update:
  date: 7/2/2024
---


## Overview

GitLab's architecture includes the GitLab server, runners, and executors, which work together to manage code and automate tasks.

![](/img/docs/12082024-gitlab-architecture.png)

## GitLab Server

The GitLab server is the core component that handles the GitLab web interface and the management of projects.

- Provides access to the GitLab web interface.
- Manages user permissions and authentication.

There are two types of GitLab servers: GitLab SaaS and GitLab Managed.

- **GitLab SaaS**: A cloud-based GitLab service hosted and managed by GitLab.
- **GitLab Managed**: A self-hosted version of GitLab that you manage on your infrastructure.

More detailed comparison:

| **Feature**         | **GitLab SaaS**                                     | **GitLab Managed**                               |
|---------------------|-----------------------------------------------------|-------------------------------------------------|
| **Hosting**         | Hosted and maintained by GitLab                    | Hosted and maintained on your own infrastructure |
| **Setup**           | Quick and easy, no server setup required           | Requires server setup and configuration        |
| **Maintenance**     | GitLab handles all updates and maintenance         | You are responsible for updates and maintenance |
| **Control**         | Limited control over infrastructure and settings   | Full control over server settings and configuration |
| **Scalability**     | Highly scalable, depending on GitLab's infrastructure | Scalability depends on your infrastructure capabilities |
| **Security**        | Managed by GitLab with standard cloud security measures | Full control over security configuration, can be customized |
| **Cost**            | Subscription-based (varies by plan)                | Initial and ongoing infrastructure costs        |
| **Data Privacy**    | Data stored on GitLab's servers (subject to their policies) | Full control over data storage and privacy, depending on your infrastructure |
| **Vendor Lock-in**  | Potential lock-in with GitLab's SaaS environment   | No vendor lock-in, as it's self-hosted          |
| **Best For**        | Teams looking for a quick, hassle-free GitLab experience without managing infrastructure | Organizations requiring full control over their GitLab environment, with the ability to customize and manage their infrastructure |

## GitLab Runners 

Runners are responsible for executing jobs defined in the CI/CD pipelines.

- Can run on various environments (e.g., local or cloud).
- Connects to GitLab to process jobs.


There are two main options for GitLab runners: Shared runners and Self-Managed runners.

- **Shared Runners**
    - Managed by GitLab and available for all projects.
    - Suitable for small to medium projects where custom runner configurations are not required.

- **Self-Managed Runners**
    - Installed and managed by the user or organization.
    - Provides more control over the runner's environment and resources.

More detailed comparison:

| Feature              | Shared Runners                                   | Self-Managed Runners                               |
|----------------------|--------------------------------------------------|---------------------------------------------------|
| **Hosting**          | Hosted by GitLab                                 | Hosted on your own infrastructure                 |
| **Setup**            | No setup required                                | Requires installation and configuration           |
| **Maintenance**      | Managed by GitLab                                | Managed by you                                    |
| **Control**          | Limited control over configuration              | Full control over configuration                   |
| **Scalability**      | Scales automatically                             | Scales within your infrastructure                 |
| **Security**         | Shares resources with other projects             | Isolated from other projects                      |
| **Cost**             | Included in some GitLab tiers                    | May require additional hardware/software costs    |
| **Best for**         | Small teams, simple needs, ease of use, cost-effectiveness | Large teams, complex needs, control, performance, security |

## Executors 

Runner executors are responsible for running the specific tasks within a job. They can use different environments like Docker or Shell and they execute the commands defined in the job's script section.

![](/img/docs/12082024-gitlab-executors.png)

There are different types of executors:

- **Shell**
    - Executes commands in a shell.
    - Ideal for simple jobs.

- **Docker**
    - Runs jobs in containers.
    - Ensures consistent environments.

- **Kubernetes**
    - Runs jobs in a Kubernetes cluster.
    - Scales jobs dynamically.

- **Virtual Machine**
    - Runs jobs in a virtual machine.
    - Provides strong isolation.

- **SSH**
    - Executes jobs remotely via SSH.
    - Useful for remote servers.

- **Custom**
    - Custom executor for specific needs.
    - Offers environment flexibility.

This table reflects various executor configurations and their properties for different environments.

| **Executor**                                          | **SSH**   | **Shell** | **VirtualBox** | **Parallels** | **Docker** | **Kubernetes** | **Custom**  |
|-------------------------------------------------------|-----------|-----------|----------------|---------------|------------|----------------|-------------|
| **Clean build environment for every build**           | ❌        | ❌         | ✅              | ✅             | ✅          | ❌              | ✅ (conditional) |
| **Reuse previous clone if it exists**                 | ✅        | ❌         | ✅              | ✅             | ✅          | ❌              | ✅ (conditional) |
| **Runner file system access protected**               | ✅        | ✅         | ✅              | ✅             | ✅          | ✅              | conditional  |
| **Migrate runner machine**                            | ❌        | ❌         | ✅              | ✅             | ✅          | ✅              | conditional  |
| **Zero-configuration support for concurrent builds**  | ❌        | ❌         | ✅              | ✅             | ✅          | ❌              | conditional  |
| **Complicated build environments**                    | ❌        | ❌         | ✅              | ✅             | ✅          | ❌              | conditional  |
| **Debugging build problems**                          | easy      | easy       | hard            | hard           | medium     | medium          | medium      |


## Working Together 

The GitLab server, executor, and runner work together to enable continuous integration and continuous delivery (CI/CD) pipelines. 

![](/img/docs/12082024-gitlab-componoents-working-together.png)

Steps:

1. Runner registers `registration_token` with GitLab server.
2. GitLab server verifies and returns `runner_token` to runner.
3. Runner requests jobs from the GitLab server.
4. GitLab server assigns job payload with `job_token` to the runner.
5. Runner fetches job details and prepares the execution environment.
6. Runner sends job payload with `job_token` to the executor. 
8. Executor clones the source and artifacts with `job_token`.
7. Executor runs the job on the runner’s machine.
8. Executor returns job output and status to runner.
9. Runner updates GitLab server with job output and staus with `job_token`
10. GitLab server updates pipeline status.