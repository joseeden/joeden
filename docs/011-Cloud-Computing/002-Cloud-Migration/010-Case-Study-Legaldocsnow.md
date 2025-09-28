---
title: "Case Study: legaldocsnow.com"
tags: [Cloud, Cloud Migration, Certifications]
sidebar_position: 10
last_update:
  date: 10/3/2022
---


## Overview 

`legaldocsnow.com` is a fictional service managed by Global Legal Systems. It helps customers store, view, and update scanned legal documents in digital form.

- Attracts clients who need lawyers to amend legal documents
- Provides collaboration features like shared signatures
- However it lacks modern improvements
- CEO wants contract collaboration to be easier and faster

This case study focuses on how cloud adoption can solve these business and technical issues.


## Diagram

![](/img/docs/aws-expertpleasecom-diagram.png)

## Document Sources

Digital legal documents are collected in two main ways. Both sources produce sensitive documents, so strict security controls are required.

A. Customers allow LegalDocsNow to scan and digitize their paper documents

  - Automated scanning process with little manual work
  - Digitized files are stored in the service
  - The original documents are archived with a legal agency

B. Third-party companies send contracts as PDF files

  - Uploaded via sFTP in batches during off-peak hours
  - Companies log in to check upload status or view contracts

     
## Requirements

The service must meet strict technical and business requirements. These requirements shape the future architecture of LegalDocsNow.

- **Security**

  - Documents only visible to the intended customer
  - Data encrypted in transit and at rest
  - Must comply with ISO27001 and ISO27018

- **Durability**

  - Documents kept indefinitely unless deleted by customer
  - Less than 2% of files older than six months are accessed
  - Needs highly durable storage

- **Availability**

  - Customers need access anytime
  - Current SLA target is 99.5%, goal is 99.9%
  - Third parties must deliver documents 24/7

- **Performance**

  - Response time under two seconds for viewing documents
  - Current SLA is only 9.5% compliance with this target


## Current Architecture

The service uses a three-tier application with multiple supporting systems.

- Apache web server
- JBOSS application server
- Oracle database

**Networking**:

- Connectivity provided by a co-location vendor
- Peak capacity of 500 Mbps
- DNS hosted in the same data center
- No CDN in place

**Firewall**:

- Clustered firewall appliances
- IDS monitoring of traffic
- Manual firewall rule updates

**Load balancer**:

- SSL front end for uploads

**Web servers**:

- Apache 2.2 for static content and routing

**Application clusters**:

- JBOSS 7.1
- Two clusters for different functions
- Session replication via multicast

**sFTP server**:

- Receives documents from third-party companies
- Acts as batch submission gateway
- Submits batches to app servers

**Database cluster**:

- Oracle 11G with active, standby, and DR nodes
- Virtual cluster IP managed by multicast

**NAS storage**:

- NetApp appliance with 150 TB replicated storage
- Offsite tape backup to DRVC
- Storage growing at 5 TB per month, only 35 TB left

**Hardware security module (HSM)**:

- Safenet module for key management
- Database encryption with Oracle TDE

**Scanning devices and digitizers**:

- Located in legal support centers
- Scanners are configured with the IP address of  both digitizers.
- Scanners connect to digitizers over a private network
- Scanners use custom TCP protocol with HTTPS to digitizer apps
- Digitizers communicate with the digitizer app module via HTTPS.



## Web Application 

The application follows a three-tier model, originally built by an external team but now maintained internally.

- Static web content
- Java modules for business logic
- Data access layer for storage and database

Two clusters run Java modules:

- Cluster 1 for customer-facing services
- Cluster 2 for internal service functions

This separation keeps roles clear but limits scalability.


## Current State - Services

The platform offers several core services. These services form the backbone of LegalDocsNow.

- **Registration**

  - Registers new subscribers with unique encryption keys
  - Secure password storage in database

- **Login**

  - Supports customers and third-party users
  - Provides session handling and timeout policies
  - Enables secure single sign-on integration

- **Payment**

  - Integrates with digital wallet providers
  - No direct credit card handling

- **Document manager**

  - Manages, encrypts, and decrypts files
  - Tracks document versions for audit purposes
  - Ensures access control per user or group

- **Presentation**

  - Delivers rendered content to devices
  - Optimizes viewing across web and mobile
  - Supports multiple file formats for display

- **Core**

  - Main business logic for customers and partners
  - Handles requests across service modules
  - Ensures compliance with legal workflows

- **Batch processing**

  - Converts third-party templates into deliverables
  - Schedules jobs during off-peak hours
  - Provides monitoring of batch status

- **Encryption**

  - Connects to HSM for encryption keys
  - Secures data at rest and in transit

- **Administration**

  - Portal for backend management
  - Enables role-based access for staff
  - Includes reporting and monitoring tools

- **Digitizer**

  - Similar to batch processing for ingestion
  - Converts scanned images into searchable formats
  - Sends processed data to storage and indexing

- **Data access service**

  - Abstraction for storage and database
  - Improves query efficiency for applications


## Challenges

The system faces multiple technical and business issues.

- Hardware is nearing end of life, storage almost full
- Data center contract expiring in nine months
- High Capex costs unsustainable long-term
- Pain points in operations reduce SLA compliance
- SLA target must rise from 99.5% to 99.9%
- Infrastructure struggles with peak loads
- Monolithic clusters block fast updates
- Rising volume of digital data
- Partners demand real-time delivery, not batch processing
- Passive IDS and firewall outdated
- Need for real-time attack detection and restricted access

These challenges show why a cloud migration is necessary.


## Why Migrate to Public Cloud?

Moving to the public cloud helps address these challenges. Adopting cloud services allows LegalDocsNow to achieve better scalability, stronger security, and improved cost efficiency.

- **Ease of Use and Managed Services**

  - No need for manual infrastructure setup
  - Resources available instantly on pay-per-use
  - Pay-per-use model speeds up application development.

- **Scalable Storage and Cost Savings**

  - Elastic storage on demand through Amazon S3 Buckets.
  - Pay only for what is used, reducing operational costs.

- **Flexibility and Growth**

  - Scale services dynamically based on demand
  - Providers like AWS, Azure, and GCP offer global infrastructure

- **Lower Costs and Faster Agility**

  - Pay-as-you-go pricing means lower operating costs
  - Rapid iteration without provisioning extra servers

- **Reliable Managed Services**

  - Managed services at scale, high SLAs for uptime
  - Cloud providers handle infrastructure management

- **End-to-End Security**

  - Shared responsibility model
  - Provider secures infrastructure, customer secures data in cloud



## Cloud Transformation Maturity Model

Moving to the cloud happens in stages. Each stage builds on the last, helping a company move from small experiments to full reinvention.

- [Project Stage](#project-stage)
- [Foundation Stage](#foundation-stage)
- [Migration Stage](#migration-stage)
- [Reinvention Stage](#reinvention-stage)

### Project Stage

This is the starting point where planning and goals are defined.

- Define migration objectives
- Assess current workloads
- Build a clear roadmap

This is also the stage where the employees  experiments with cloud services through one-off projects.

- Early trials of cloud tools
- Small projects run by a few staff
- Limited knowledge and ownership

**Assessment**: Run informal interviews to see what people are trying out. This stage ensures LegalDocsNow knows what to achieve before moving forward.


### Foundation Stage

This stage sets up the basic cloud environment.

- Establish security and compliance
- Configure networks and access
- Create shared company cloud accounts
- Start taking security and compliance seriously
- Use early success to get leadership interest

**Assessment**: Check for the existence of a transformation plan; its absence indicates early stages.

### Migration Stage

Here, applications and data are moved to the cloud.

- Rehost or replatform workloads
- Some projects run independently
- Larger apps or whole data centers may shift
- Train teams on cloud operations

**Assessment**: Presence of third-party proposals and ongoing migration projects.
    
### Reinvention Stage

This is where optimization and innovation take place.

- Break large apps into smaller parts
- Focus on faster delivery and improvements
- Adopt cloud-native tools
- Scale services efficiently

**Assessment**: Ongoing optimizations and operational efficiencies from cloud environment usage.


## Strategies and Techniques for Moving an Organization Forward in Cloud Maturity

Successful cloud adoption involves a balance of technology, business, and strategic planning.

### Identifying Current Stage

- **Assessment**
    - Evaluate current stage in the cloud maturity adoption cycle.
    - Use a brief and informal interview process to gauge experimentation levels.
    - Consolidate results into a one-pager for further discussions and experimentation.

### Transition from Project to Foundation

- **Challenges**
    - Overcoming lack of executive support, budget, or planning.

- **Strategies**
    - Develop a clear transformation roadmap.
    - Petition for stakeholder buy-in by focusing on individual benefits.
    - Be provider-agnostic and prioritize business and project requirements over technology.

- **Outputs**
    - Transformation roadmap, best practices for security, and a strong value management plan.

### Foundation Stage - Building Core Competencies

- **Initiatives for Cloud Center of Excellence**
 
  - Cloud training and knowledge sharing.
    - Support and guidance for business units.
    - Creation and maintenance of security standards.
    - Development of common architecture blueprints.
    - Consolidated cloud services account management.

- **Outputs**
    - Transformation roadmap, security and compliance architecture, and a strong value management plan.

### Transition from Migration to Reinvention

- **Challenges**
    - Risk, confidence drop, and potential project delays in the migration stage.

- **Strategies**
    - Prioritize small steps done often to minimize scope and risk.
    - Implement an agile working approach with managed sprints.
    - Establish view checkpoints to prevent program delays.

- **Outputs**
    - Effective and efficient migration strategy.
    - Agreed and robust migration process.
    - Proper cloud environment setup.
    - Balanced enthusiasm with structured processes.

## Strategies to Move Forward

Cloud adoption works best with a mix of tech steps, business goals, and strategy.

### Identifying Current Stage

Understanding where LegalDocsNow stands helps shape the right path forward.

- Review current adoption level
- Interview staff for quick insights
- Summarize findings in one page

This creates a clear view of the present state and a base for planning next steps.

### Transition from Project to Foundation

LegalDocsNow must move from isolated efforts to a structured setup. A clear plan and visible results help secure support.

- **Challenges**

  - Limited budget or leadership backing

- **Strategies**

  - Build a roadmap linked to business needs
  - Show early wins to stakeholders
  - Stay flexible across cloud providers

- **Outputs**

  - Roadmap with priorities
  - Basic security and governance practices
  - Shared value plan for adoption

These outputs bring stronger governance, staff training, and common blueprints for secure and consistent growth.

### Migration to Reinvention

LegalDocsNow should focus on small but steady moves to reduce risk and maintain momentum.

- **Challenges**

  - Delays that reduce confidence

- **Strategies**

  - Take frequent small steps
  - Apply agile sprints
  - Add checkpoints to monitor progress

- **Outputs**

  - Efficient migration plan
  - Stable cloud environment
  - Balanced and structured migration process

Each step keeps LegalDocsNow on track without overwhelming teams or budgets.

### Best Practices for Migration

A structured process ensures LegalDocsNow balances speed with safety while moving services.

- **Focus Areas**

  - Clear migration strategy
  - Documented repeatable processes
  - Reliable cloud setup

- **Strategies**

  - Work with trusted partners
  - Share updates, including budgets
  - Reuse proven steps
  - Keep leadership engaged

- **Outputs**

  - Reduced risk of failure
  - Consistent tools and methods
  - Strong foundation for future growth


### Conclusion

LegalDocsNow’s transition works best when the approach is flexible and adaptive.

- **Adaptive Approach**

  - Accept each case is unique
  - Return to basics when challenges arise
  - Solve small problems early for smoother progress

- **Successful Transition**

  - Clear plan and aligned stakeholders
  - Strategy that evolves with business needs
  - Execution tied to real outcomes

By linking every step back to its core goals, LegalDocsNow ensures its cloud adoption delivers lasting value.


## Cloud Readiness Assessment Process

Before moving LegalDocsNow services to the cloud, it is important to assess readiness. This ensures smooth migration and a setup that meets business needs.

### Initiating the Cloud Readiness Workshop

Start by gathering the right people and setting clear goals. This workshop lays the groundwork for evaluating cloud readiness and aligning priorities.

- **Background**

  - Alex, Sys Ops Lead, wants to migrate services after a successful test project
  - Sees the need to review all applications and dependencies before full migration

- **Workshop Setup**

  - Propose a short workshop to executives
  - Invite key stakeholders from business and tech teams
  - Cover all angles: operations, security, compliance, and business goals


### First Pass Portfolio Assessment: Discovery

Identify which applications are ready for cloud and which need attention.

- **Assessment Criteria**

  - Cloud compatibility
  - Licenses
  - Compliance requirements

- **Strategic Decisions**

  - List all applications and dependencies
  - Group apps by readiness
  - Draft a high-level migration roadmap

Discovery ensures LegalDocsNow knows where to start and which apps need preparation.

### First Pass Execution: Workshop Details

This step helps the team understand what moving to cloud involves.

- Outline cloud service advantages
- Provide basic cloud knowledge for everyone
- Run the initial assessment to see the current systems


### Classifying Applications into Buckets

Organize applications by their cloud readiness. This classification makes it easier to prioritize migration and plan the next steps efficiently.

- **Buckets**

  - Cloud Native
  - Cloud Eligible
  - Cloud Friendly
  - Not Cloud Ready

- **Evaluation**

  - Check compliance, licenses, dependencies, and tech compatibility
  - Place apps into the appropriate buckets



### Second Pass Portfolio Assessment: Migration Strategies

Decide the right approach for each application. This ensures decisions align with business priorities and long-term goals.

- **Migration Options**

  - Rehost, Replatform, Refactor, Repurchase, Retain, Retire
  - Match each application to the best strategy

- **Focus**

  - Keep discussion business-driven, not overly technical


### Qualification of Applications: Strategy Discussion

Assign specific actions to each type of application. This creates a clear plan for how each category should be handled during migration.

- **Examples**

  - Rehost image storage or core apps
  - Replatform databases like Oracle
  - Refactor apps to microservices for scalability

- **Prioritization**

  - Retire outdated or monolithic apps
  - Focus on apps that provide the highest value quickly


### Swim Lane Prioritization 

Group tasks into clear categories. Using swim lanes turns the roadmap into practical steps and keeps the focus on achieving results.

- **Three Swim Lanes**

  - Quick Wins
  - Optimization
  - Transform

- **Outcomes**

  - Group apps into lanes
  - Identify short-term gains, efficiency improvements, and long-term changes


### Outcome and Outputs

Record the results of the readiness assessment. These outputs provide LegalDocsNow with a clear roadmap, highlight priorities, and guide the next steps in migration.

- Business value matrix, application register, and system audit
- Second pass migration strategies for each application

Snapshot of cloud readiness: 

- Cloud Native
- Cloud Eligible
- Cloud Friendly
- Not Cloud Ready

### Next Steps After Workshop

Begin executing the migration plan. These steps help LegalDocsNow move in a structured way, keeping the process organized and controlled.

- **Detailed Planning**

  - Define, quantify, and prioritize a task backlog
  - Use task matrix for resources and budgets

- **Green Light for Project**

  - Approve migration based on priorities
  - Plan repeatable sprints for execution

- **Governance and Operating Model**

  - Establish policies for security, compliance, and access
  - Implement automation and monitoring where needed


### Subsequent Meetings and Architecture Phase

Work with experts and providers to refine the migration plan. This phase ensures LegalDocsNow follows best practices, assigns clear responsibilities, and designs an effective cloud environment.


- **Involving Providers**

  - Use provider expertise for governance and best practices
  - Stay updated on cloud tools and approaches

- **Objectives**

  - Define migration steps for each workload
  - Include tools, validation methods, and roles


### Conclusion

The cloud readiness assessment provides LegalDocsNow with a clear foundation for migration. Following this process ensures the cloud move is structured, secure, and focused on delivering business value efficiently.


- **Strategic Roadmap**

  - Align migration with business priorities and complexity
  - Create a practical, actionable plan

- **Continued Collaboration**

  - Keep teams and providers involved for success

- **Key Outcomes**

  - Clear cloud readiness understanding
  - Prioritized tasks and actionable roadmap
  - Governance model to maintain control and compliance

## Resources 

- [Getting Started with Migrating to AWS](https://cloudacademy.com/learning-paths/cloud-academy-getting-started-with-migrating-to-aws-125/)
