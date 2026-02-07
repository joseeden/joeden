---
title: "SDLC"
description: "Software Development Lifecycle"
tags:
- Computer Science
- Application Development
- Software Development
sidebar_position: 1
last_update:
  date: 6/12/2020
---



## Overview

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


## Flexibility of SDLC

The software development life cycle (SDLC) offers adaptability to enhance project efficiency.

- Phases can be repeated or reordered
- Individual phases can run in parallel
- Requirements can be gathered for specific aspects


## 1. Requirements and Analysis

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

## 2. Design

The design phase utilizes the Software Requirements Specification (SRS) document to create the software's architecture.

- Design software based on the SRS
- Produce High-Level Design (HLD) for architecture
- Create Low-Level Design (LLD) for component details

During this phase, several models are developed:

- **Informational Model**

  - Represents the data and information flow in the system.
  - Defines entities, attributes, and relationships.
  - Involves how data is stored and accessed.

- **Functional Model**

  - Describes the system’s processes and functions.
  - Shows how inputs are transformed into outputs.
  - Verifies that functional requirements are met.

- **Behaviorial Model**

  - Shows how system behaves in response to events or inputs.
  - Considers the states of the application during transactions
  - Uses state diagrams, sequence diagrams, and activity diagrams.

## 3. Implementation

The implementation phase involves coding based on HLD and LLD.

- Developers create functional code from design documents
- Longest phase, building all components and modules
- Testing engineers prepare the test plan concurrently

At the end of the implementation phase, functional code that implements all of the customer's requirements is ready to be tested.


## 4. Testing

The testing phase validates the code from the implementation phase.

- Install code in a testing environment and execute test plan
- Identify and fix bugs, followed by re-testing

The **test plan** is a document that includes a list of every single test to be performed in order to cover all of the features and functionality of the software, as specified by the customer requirements. In addition to functional testing, the test engineers also perform:

- Integration testing
- Performance testing
- Security testing

At the end of testing, software is theoretically ready for production, but this rarely happens. Developers have enhanced testing efficiency and workflows, recognizing that software is never completely bug-free. It must be observable, tested in production, and resilient to maintain availability and performance.

## 5. Deployment

The deployment phase involves installing the software into production.

- Finalize installation and assess readiness for release
- Product manager works with engineers to device is software is good to release.

At the end of the deployment phase, the final piece of software is released to customers and other end users.

## 6. Maintenance

During the maintenance phase, the team:

- Provides support for customers
- Fixes bugs found in production
- Works on software improvements
- Gathers new requests from the customer

At the end of the maintenance phase, the team prepares for the next software iteration, restarting the SDLC process with the requirements and analysis phase.

For more information, please see [Operations and Maintenance.](/docs/065-Software-Engineering/014-Software-Development/007-Operations-and-Maintenance.md)
