---
title: "SDLC"
description: "Software Development Lifecycle"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 1
last_update:
  date: 3/14/2022
---


## Software Development

The software development process, or software development life cycle (SDLC), goes beyond coding. It involves gathering requirements, creating a proof of concept, testing, and bug fixing.

- Encompasses planning, design, and development
- Requires collaboration among teams
- Focuses on continuous improvement and maintenance


## Software Development Life Cycle

The software development life cycle (SDLC) outlines the process of developing software from an initial idea to delivery. It typically consists of six phases, where each phase builds on the previous one.

1. Requirements & Analysis
2. Design
3. Implementation
4. Testing
5. Deployment
6. Maintenance

Historically, teams followed these phases in a strict order using the waterfall method, which aimed to complete each phase in detail before moving on, without revisiting previous phases.

<div class='img-center'>

![](/img/docs/devnet-sdlc.png)

</div>

While the waterfall method is still used, it is being gradually replaced by more adaptive Agile development methods that allow for faster and more efficient software production.


## Flexibility of the SDLC

The software development life cycle (SDLC) offers adaptability to enhance project efficiency.

- Phases can be repeated or reordered
- Individual phases can run in parallel
- Requirements can be gathered for specific aspects


## Requirements and Analysis Phase

The requirements and analysis phase focuses on understanding stakeholder needs and defining the software's problems to solve.

- Explore stakeholder needs and constraints
- Identify software operation context
- Define specific feature and user experience requirements
- Assess architectural options for development

After gathering the requirements, the team analyzes the results to determine the following:

- Can we develop the software according to the requirements?
- Can it be done on-budget?
- Are there any risks to the development schedule?
- How will the software be tested?
- When and how will the software be delivered?

At the end of this phase, the traditional waterfall method recommends producing a **Software Requirement Specification (SRS) document** that outlines the software requirements and scope, ensuring thorough confirmation with stakeholders.


## Design and Implementation Phases

### Design

The design phase utilizes the SRS document to create the software's architecture.

- Design software based on the SRS
- Produce High-Level Design (HLD) for architecture
- Create Low-Level Design (LLD) for component details

### Implementation

The implementation phase involves coding based on HLD and LLD.

- Developers create functional code from design documents
- Longest phase, building all components and modules
- Testing engineers prepare the test plan concurrently

At the end of the implementation phase, functional code that implements all of the customer's requirements is ready to be tested.

## Testing, Deployment, and Maintenance Phases

### Testing

The testing phase validates the code from the implementation phase.

- Install code in a testing environment and execute test plan
- Identify and fix bugs, followed by re-testing

The **test plan** is a document that includes a list of every single test to be performed in order to cover all of the features and functionality of the software, as specified by the customer requirements. In addition to functional testing, the test engineers also perform:

- Integration testing
- Performance testing
- Security testing

At the end of testing, software is theoretically ready for production, but this rarely happens. Developers have enhanced testing efficiency and workflows, recognizing that software is never completely bug-free. It must be observable, tested in production, and resilient to maintain availability and performance.

### Deployment

The deployment phase involves installing the software into production.

- Finalize installation and assess readiness for release
- Product manager works with engineers to device is software is good to release.

At the end of the deployment phase, the final piece of software is released to customers and other end users.

### Maintenance

During the maintenance phase, the team:

- Provides support for customers
- Fixes bugs found in production
- Works on software improvements
- Gathers new requests from the customer

At the end of the maintenance phase, the team prepares for the next software iteration, restarting the SDLC process with the requirements and analysis phase.