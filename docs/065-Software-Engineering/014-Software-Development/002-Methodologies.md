---
title: "Methodologies"
description: "Software Development Methodologies"
tags:
- Computer Science
- Application Development
- Software Development
sidebar_position: 2
last_update:
  date: 6/12/2020
---

## Overview

A software development methodology, or Software Development Life Cycle (SDLC) model, consists of a framework of rules, steps, roles, and principles for software development. 

While many methodologies are available, the three most common are:

- Waterfall
- Agile
- Lean

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

## Incremental Model

The Incremental model involves developing software in small functional increments.  

- Builds software in small portions called increments.  
- Each increment adds functionality and can be deployed early.  
- Allows early feedback and gradual improvement.

## Cleanroom Model 

The Cleanroom model focuses on preventing defects/errors or mistakes by following highly structured and formal methods of rigorous developing and testing.

- Focuses on preventing defects rather than fixing them.  
- Uses formal specifications and statistical quality control
- Emphasizes correctness by construction.

## Reuse Model

The Reuse Methodology approaches software development by using progressively developed code. It leverages existing components to speed up development.  

- Builds software using existing components.  
- Encourages modular design and component libraries.  
- Saves time and reduces errors.

## Exploratory Model

The Exploratory Methodology is flexible, trial-and-error approach useful for uncertain requirements.  

- Informal, trial-and-error approach.  
- Useful when requirements are unclear or research-oriented.  
- Used when there's no clearly defined project objectives.
- Emphasizes learning and adaptation.

## Rapid Prototyping

A development approach that builds early prototypes to explore requirements and design ideas.

- Quickly develops a prototype to clarify requirements.  
- Refined iteratively based on user feedback.  
- Reduces risk of building the wrong system

Different ways to apply prototyping for feedback and testing.  

- **Evolutionary Prototyping**: Grows gradually into the final system.  
- **Operational Prototyping**: Tested in the real environment for performance and usability.


## Joint Application Development (JAD)

A collaborative approach to gather requirements and build consensus.

- Conducts workshops with developers and users.
- Speeds up requirements gathering and consensus.  
- Improves communication and reduces misunderstandings.


## Rapid Application Development (RAD)

Focuses on quick development with iterative prototypes.

- Fast development with prototypes and iterative releases.  
- Prioritizes speed and user feedback over detailed documentation.  
- Best for small to medium projects with clear requirements.


## Agile Method

The Agile method is favored for its adaptability and speed. Key Agile principles include:

- Valuing people and communication over strict processes
- Delivering functional software rather than heavy documentation
- Encouraging customer collaboration
- Being open to changing requirements

Agile methodology does not use prototypes to represent the full product but breaks the product down into individual features that are continuously being delivered.

For more information, please see [What is Agile.](/docs/099-Project-Management/010-Introduction/001-Agile.md)

:::info

A notable element of many Agile methodologies is their focus on user stories. A user story is a sentence that describes what a user wants to do and why. 

:::



## Kanban

Kanban is a visual workflow management system to optimize tasks.  

- Visual system to manage workflow.  
- Tracks tasks on boards to optimize flow and reduce bottlenecks.  
- Limits work in progress for better efficiency.

## Extreme Programming (XP)

Extreme Programming (XP) emphasizes high quality, adaptability, and close collaboration.

- Agile approach focused on quality and responsiveness.
- Uses pair programming, test-driven development, and frequent releases.
- Encourages continuous feedback and collaboration.


## Lean Software Development

Lean software development is based on Lean Manufacturing principles, which are focused on minimizing waste and maximizing value to the customer. There are seven principles for lean:

- Eliminate waste
- Amplify learning
- Decide as late as possible
- Deliver as fast as possible
- Empower the team
- Build integrity in
- Optimize the whole

For more information, please see [Lean Principles.](/docs/065-Software-Engineering/014-Software-Development/003-Lean-Principles.md)


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

Every software project has limits, commonly in cost, time, usability, and security. These constraints must be balanced carefully.

> *You can make it cheap, fast, usable, or secure - but not all at once.*

With a fixed budget, management usually chooses two priorities to focus on.

- **Technical Debt**

  Choosing speed often lowers quality, causing technical debt:

  - “I’ll fix it later; just need to meet the deadline”
  - Quick fixes or temporary solutions are used to save time

- **Management Pressure**

  Management often demands fast delivery:

  - Assumes problems can be fixed after release
  - May ignore long-term costs of rushed work
  - Can lead to unstable or hard-to-maintain systems

## Integrated Product Team

An Integrated Product Team (IPT) is a group of people from different areas working together to achieve a common goal: delivering a complete product efficiently and effectively.

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

