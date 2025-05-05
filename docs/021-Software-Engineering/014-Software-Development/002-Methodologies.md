---
title: "Methodologies"
description: "Software Development Methodologies"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 2
last_update:
  date: 6/12/2020
---

## Overview

A software development methodology, or Software Development Life Cycle (SDLC) model, consists of a framework of rules, steps, roles, and principles for software development. While many methodologies are available, the three most common are:

- Waterfall
- Agile
- Lean

Each methodology has its advantages and disadvantages. The choice of methodology depends on factors like project type, duration, and team size.


## Importance of Clear Requirements

Every software project should start with clear requirements. Developers and customers must work together to define these needs, which are essential for project success.

- Provide a shared understanding of project goals.
- Help prioritize critical features.
- Serve as a basis for testing and validation.

## Technical Design Process

After defining requirements, developers create a technical design that shows how different parts of the software will connect. This planning is vital, much like having a blueprint for a construction project.

- Outlines system architecture and data flow.
- Identifies interfaces between components.
- Facilitates better communication among team members.
- Reduces risks by identifying potential issues early.

## Waterfall Model

Once requirements are established, developers can begin building the software using different methodologies. One traditional method is the **Waterfall** model, which follows these steps:

1. Define system requirements
2. Create software requirements
3. Develop preliminary and detailed designs
4. Code and test the software
5. Move into operations and maintenance

This model is linear and can be inflexible, making it hard to adapt to changes during development.

![](/img/docs/software-dev-methodologies-waterfall-method.png)

Since each phase's outcome is crucial for the next, a single misstep can disrupt the entire process. If requirements change during an iteration, they cannot be addressed until the following cycle, potentially leading to increased costs and delays in delivering features to users.

## Spiral Model

Introduced in the 1980s, the Spiral Model improves on the Waterfall approach by using an iterative process with four main steps:

1. Set objectives and identify constraints
2. Evaluate options and manage risks
3. Develop and test the software
4. Plan for future work

In the Spiral mode, developers begin in the first phase and then move through each of the phases, multiple times, until they have a satisfactory finished product.

<div class='img-center'>

![](/img/docs/software-development-methodologies-spiral-method.png)

</div>


## Agile Method

The Agile method is favored for its adaptability and speed. Key Agile principles include:

- Valuing people and communication over strict processes
- Focusing on delivering functional software rather than heavy documentation
- Encouraging customer collaboration
- Being open to changing requirements

Agile promotes frequent delivery of working software, teamwork, and sustainable development. For more information, please see [What is Agile.](/docs/099-Project-Management/010-Introduction/001-Agile.md)

## Lean Software Development

Lean software development is based on Lean Manufacturing principles, which are focused on minimizing waste and maximizing value to the customer. There are seven principles for lean:

* Eliminate waste
* Amplify learning
* Decide as late as possible
* Deliver as fast as possible
* Empower the team
* Build integrity in
* Optimize the whole

For more information, please see [Lean Principles.](/docs/021-Software-Engineering/014-Software-Development/003-Lean-Principles.md)



## Documentation 

Documentation helps developers, users, and stakeholders understand, use, and maintain the software effectively.

- **Source Code Library**

  - Stores source code in a secure, centralized repository
  - Helps with version control, collaboration, and rollback when needed

- **Source Code Documentation**

  - Makes the code easier to read, understand, and maintain
  - Includes design documents and code comments that explain logic and structure

- **Software Documentation**

  - Explains how the software works and how to use it
  - Useful for end users, support staff, and new team members

## Constraints

Every software project has limits — commonly in cost, time, usability, and security. These constraints must be balanced carefully.

> *We can make it cheap, quick, usable, or secure—but not all four.*

Given a fixed budget, management usually selects only two priorities to focus on.

- **Technical Debt**

    When speed is prioritized, quality often takes a back seat. This leads to technical debt:

    - "I'll fix it later; I just need to meet this deadline"
    - Poor or temporary solutions are left in place to save time

- **Management Pressure**

    Often, management pushes for fast delivery:

    - Assumes fixes can be made later after release
    - May overlook long-term costs of rushed or incomplete features
    - Can result in unstable or hard-to-maintain systems

## Integrated Product Team

An Integrated Product Team (IPT) brings together people from different disciplines to work toward a shared goal — delivering a complete product efficiently and effectively.

- **IPPD (Integrated Product and Process Development)**

  - Integrates all acquisition and development activities
  - Collaboratnig to align design, process, and outcomes

- **IPT (Integrated Product Team)**

  - A cross-functional team responsible for specific project deliverables
  - Encourages shared ownership and accountability

- **DevOps**

  - Collaborative relationship between development and IT operations
  - Based on Agile principles: integration, communication, and continuous delivery
  - Involves skilled QA teams and support experts to ensure reliability and speed

