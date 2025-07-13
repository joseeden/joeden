---
title: "How much automation do you have?"
description: "Easy to follow checklists for helpful automations"
tags: [Linux, DevOps, Cloud, SRE]
sidebar_position: 3
last_update:
  date: 8/11/2022
---



## Manage 

- **Audit Management**

    - Using automated tools ensure products and services are auditable. 
    - Includes audit logs of the pipeline stages, auditing configurations, and log files from production operations. 

- **Authentication**

    - Implement mechanisms to ensure appropriate access to tools are in place.
    - User and Password Management 
    - Multi-factor Authentication
 
  - Cloud-specific IAM

- **DevOps Score**

    - Shows DevOps adoption across the organization and the corresponding impact on delivery velocity. 

- **Value Stream Management**

    - Ability to visualize the flow of value delivery through the DevOps lifecycle.
    - Gitlab CI and Jenkins extension 
    - DevOptics for visualization

## Plan 

- **Issue-tracking**
    
    - Usage of tools for capturing incidents or backlogs of work.
    - Sample tools: Jira, Trello, Agile Central 

- **Kanban Boards**

    - The same tools for issue-tracking can also represent delivery flow through Scrum and Kanban workflow boards  

- **Time-tracking**

    - Issue-tracking tools can also be used for tracking time, either against the individual issues, other work, or project types.

- **Agile Portfolio Management**

    - Evaluating in-flight projects and proposed future initiatives.
    - Shapes and governs the ongoing investment in projects and discretionary work.
    - Sample tools: CA's Agile Central, VersionOne 

- **Service desk**

    - Improves the managing of the services lifecycle, as well as internal/external stakeholder engagement. 
    - Sample tools: ServiceNow

- **Requirements management**

    - Tools that handle requirements definition, traceability, hierarchies, and dependency. 
    - Often also handles code requirements and test cases for requirements. 

- **Quality management**

    - Test case planning, test execution, defect tracking, severity, and priority analysis.
    - Sample tools: CA's Agile Central.

## Create 

- **Source code management**

    - Tools to securely store source code and make it available in a scalable multi-user environment. 
    - Sample tools: Git, SVN 

- **Code review**

    - The ability to perform peer code-reviews to check quality can be enforced through tools.
    - Sample tools: Gerrit, Team Foundation Service, Crucible, Gitlab
    - For more information, please see [Code Reviews](/docs/007-Cybersecurity/007-Software-Security/012-Code-Reviews.md)

- **Wiki**

    - Tools for knowledge sharing and creating a rich Wiki of content. 
    - Sample tools: Confluence 

- **Web IDE**

    - Tools that have a web client integrated development environment. 
    - Enables developer productivity without having to use a local development tool.

- **Snippets**

    - Stored and shared code snippets to allow collaboration around specific pieces of code. 
    - Also allows code snippets to be used in other code-bases. 
    - Sample tools: BitBucket, Gitlab

## Verify

- **Continuous integration**

    - Refers to integrating, building, and testing code within the development environment

- **Code quality**

    - Also referred to as code analysis. Use tools that automatically check the seven main dimensions of code:
        - quality
        - comments
        - architecture
        - duplication
        - unit test coverage
        - complexity
        - potential defects
        - language rules

    - Sample tools: Sonarqube, Checkmarks 

- **Performance testing**
 
    - Determining the speed, responsiveness, and stability of a computer, network, software program.
    - Also tests devices under a workload. 

- **Usability testing**

    - Usability testing is a way to see how easy to use something is by testing it with real users. 
    - Tools can be used to track how a user works with a service. 
    - For example, scroll recording, eye checking, and mouse tracking.

## Package

- **Package registry**

    - Repository for software packages, artifacts and their corresponding metadata. 
    - Can store files produced by an organization itself or for third party binaries. 
    - Sample tools: Artifactory, Nexus

- **Container registry**

    - Secure and private registry for container images. 
    - Typically allowing for easy upload and download of images from build tools.

- **Dependency proxy**

    - Implement a local proxy for frequently used upstream images or packages. 
    - In the case of CI/CD, the proxy is responsible for receiving a request and returning the upstream image from a registry, acting as a pull-through cache. 

- **Helm chart registry**

    - Helm charts describe related Kubernetes resources. 
    - Use tools that support a registry for maintaining master records of Helm charts.
    - Sample tools: Artifactory, Codefresh 

- **Dependency firewall**

    - Many projects depend on packages that may come from unknown or unverified providers.
    - This introduces potential security vulnerabilities. 
    - There are tools to scan dependencies but that is done after they are downloaded. 
    - These tools prevent those vulnerabilities from being downloaded to begin with. 

## Secure 

- **SAST**

    - Static application security testing tests applications from the inside out by looking at source code, byte code, or binaries.

- **DAST**

    - Dynamic application security testing tests applications from the outside in to detect security vulnerabilities.

- **IAST**

    - Interactive application security testing combines both SAST and DAST approaches.
    - Involves application tests changing in real time based on information feedback from SAST and DAST, creating new test cases on the fly. 
    - Sample tools: Synopsis, Acunetix, Parasoft, Quotium 

- **Secret detection**

    - Secret detection aims to prevent sensitive information like passwords, authentication tokens, and private keys being unintentionally leaked as part of the repository content.

- **Dependency scanning**

    - Used to automatically find security vulnerabilities in your dependencies while you are developing and testing your applications. 
    - Sample tools: Synopsis, Gemnasium, Retire.js, bundler-audit

- **Container scanning**

    - When building a container image for your applications, tools can run a security scan to ensure it does not have any known vulnerability in the environment where your code is shipped. 
    - Sample tools: Blackduck, Synopsis, Snyk, Claire , Klar

- **License compliance**

    - Use tools that perform checks to ensure licenses of your dependencies are compatible with your application and either approve or blacklist them. 
    - Sample tools: Blackduck ,Synopsis

- **Vulnerability database**

    - Collecting, maintaining, and disseminating information about discovered computer security vulnerabilities. 
    - This is then checked as part of the delivery pipeline. 

- **Fuzzing**

    - Fuzzing or fuzz testing is an automated software testing technique.
    - Involves providing invalid, unexpected, or random data as inputs to a service and then watching the results.
    - For more information, please see [Fuzz Testing](/docs/007-Cybersecurity/007-Software-Security/011-Code-Analysis.md#fuzzing)

## Release

- **Continuous delivery**

    - This is a software development discipline where you build software in such a way that the software can be released to production at any time. 

- **Release orchestration**

    - Typically a deployment pipeline used to detect any changes that will lead to potential problems in production. Orchestrating other tools will identify performance, security, or usability issues. 
    - Sample tools: Jenkins ,Gitlab CI

- **Pages**

    - For creating supporting web pages automatically as part of a CI/CD pipeline. 

- **Review apps**

    - Allow code to be committed and launched in real time. 
    - Environments are spun up to allow developers to review their applications. 
    - Sample tools: Gitlab CI 

- **Incremental rollout**

    - Sometimes referred to by colored environments, e.g., blue/green deployments.
    - This means deploying many small, gradual changes to a service instead of a few large ones. 
    - Users are then incrementally moved across to the new version of the service until eventually all users are moved across. 

- **Canary deployments**

    - Similar to incremental rollout, it is where a small portion of the user base is updated to a new version first. 
    - This subset, the canaries, then serve as the proverbial canary in the coal mine. 
    - If something goes wrong, then a release is rolled back and only a small subset of the users have been impacted. 

- **Feature flags**

    - Sometimes called **feature toggles**.
    - Allows system behavior to change without changing the underlying code through the use of flags.
    - Flags is used to decide which behavior is invoked. 
    - Primarily a programming practice although there are tools which can help with flag management and invocation.
    - Sample tools: Launch Darkly

- **Release governance**

    - Release governance is all about the controls and automation, security compliance or otherwise.
    - Ensures your releases are managed in an auditable and trackable way.
    - Ensures that releases meet the need of the business to understand what is changing. 

- **Secrets management**

    - Managing digital authentication credentials, secrets, including passwords, keys, APIs, and tokens for use in applications, services, privileged accounts, and other sensitive parts of the IT ecosystem.

## Configure

- **Auto DevOps**

    - Auto DevOps brings DevOps best practices to your project by automatically configuring software development life cycles. 
    - It automatically detects, builds, test, deploys, and monitors applications. 
    - Sample tools: Gitlab ,AWS Code Pipelines 

- **ChatOps**

    - The ability to execute common DevOps transactions directly from chat, build, deploy, test, incident management, rollback, et cetera, with the resulting output sent back to the ChatOps channel.

- **Runbooks**

    - A collection of procedures necessary for the smooth operation of a service. 
    - Previously manual in nature, they are now usually automated with tools.
    - Sample tools: Ansible

- **Serverless**

    - A code execution paradigm where no underlying infrastructure or dependencies are needed. 
    - Piece of code is executed by a service provider, typically cloud, who takes over the creation of the execution environment. 
    - Sample tools: Lambda functions in AWS, Microsoft's Azure functions 

## Monitor

- **Metrics**

    - Tools that collect and display performance metrics for deployed apps.
    - Sample tools: Prometheus

- **Logging**

    - The capture, aggregation, and storage of all logs associated with system performance including but not limited to process calls, events, user data, responses, error, and status odes. 
    - Sample tools: Logstash, Nagios 

- **Tracing**

    - Tracing provides insight into the performance and health of a deployed application.
    - Tracking each function or microservice which handles a given request.

- **Cluster monitoring**

    - Tools that let you know the health of your deployed environments running in clusters such as Kubernetes. 

- **Error tracking**

    - Tools to easily discover and show the errors that an application may be generating along with the associated data. 

- **Incident management**

    - Involves capturing the who, what, when of service incidents, and the onward use of this data in ensuring service level objectives are being met.

- **Synthetic monitoring**

    - The ability to monitor service behavior by creating scripts to simulate the action or path taken by a customer or end user and the associated outcome. 

- **Status page**

    - Service pages that easily communicate the status of services to customers and end users. 

## Defend

- **RASP**

    - Runtime application self-protection. Tools that actively monitor and block threats in the production environment before they can exploit vulnerabilities. 

- **WAF**

    - Web application firewall. 
    - Tools that examine traffic being sent to an application and can block anything that looks malicious.

- **Threat detection**

    - Refers to the ability to detect, report, and support the ability to respond to attacks. 
    - Intrusion detection systems and denial-of-service systems allow for some level of threat detection and prevention. 

- **UEBA/UBA**

    - User and entity behavior analytics is a machine learning technique to analyze normal and abnormal user behavior with the aim of preventing the latter. 

- **Vulnerability management**

    - This is about ensuring that assets and applications are scanned for vulnerabilities
    - Subsequent processes to record, manage, and mitigate those vulnerabilities. 

- **DLP**

    - Data loss protection. Tools that prevent files and content from being removed from within a service environment or organization.

- **Storage security**

    - A specialty area of security that is concerned with securing data storage systems and ecosystems and the data that resides on these systems. 

- **Container network security**

    - Used to prove that any app that can be run on a container cluster with any other app can be confident that there is no unintended use of the other app or any unintended network traffic between them. 

## Resources 

- [SRE Tools & Automation](https://cloudacademy.com/course/sre-tools-automation-1039/results/?context_resource=lp&context_id=1759)
