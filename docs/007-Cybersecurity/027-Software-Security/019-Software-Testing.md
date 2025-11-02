---
title: "Software Testing"
description: "Software Testing in Development"
tags: 
- Security
- Cybersecurity
- Security Foundations
- Computer Science
- Application Development
- Software Development
- Application Security
sidebar_position: 19
last_update:
  date: 1/30/2024
---


## Overview 

Throughout the software development process, frequent testing ensures that the final product meets both functional and business requirements.

- Essential for proper functionality
- Key activities: validation and verification

## Model Validation vs. Verification  

These two important testing activities answer different questions during development.

- **Validation**: Are we building the right software? (Meets business requirements)
- **Verification**: Are we building the software right? (Proper functioning)

## Test Coverage

Test coverage shows how much of a system is tested, usually expressed as a percentage.

- Measures which parts of code or functionality are exercised by tests
- Helps identify untested or weak areas in the system
- Guides improvements in testing to reduce potential bugs

Example: If your system has 1,000 lines of code and tests run 800 lines, coverage is 80%

:::info 

A system for a medical device would be an example of a system that may require 100 percent test coverage since it is considered a safety-critical device and must be tested for all possible cases. 

:::

## Stress and Load Testing  

Before release, code must be tested under real-world conditions to ensure it can handle expected loads.

- Simulates real-world activity using automated scripts
- Verifies system capacity and maximum load capabilities
- Tests continue until system failure to determine limits

## User Acceptance Testing (UAT)  

This final phase ensures that the software is intuitive and usable under real-world circumstances.

- Performed in a testing environment
- End users simulate real-world transactions
- Focus on usability and ease of use (often referred to as "beta testing")

## Regression Testing  

After launch, modifications to the software must be tested to ensure they don’t cause unintended issues.

- Verifies no negative impacts from code changes
- Compares system behavior before and after updates
- Focuses on maintaining functionality while adding new features

## Use Case Testing 

Use case testing checks that software features work as intended in real-world situations.

- Describes how users interact with the system
- Tests all possible paths and decisions

Use cases can also be related to each other through associations. These associations define how one use case connects or depends on another.

Common types of associations:

- **Include**

  - The included use case is always executed when the main one runs
  - Example: When processing a payment, the "verify account" is always included

- **Extend**

  - Runs only under certain conditions or decision points
  - Example: "Show welcome offer" runs only after a successful login

## Misuse Case Testing

Misuse case testing looks for vulnerabilities by simulating how attackers might misuse the system.

- Tests malicious or unintended actions
- Complements use case testing by focusing on misuse
- Strengthens system resilience against attacks

The most critical step in misuse case testing is **defining the test cases**. Testers must think like attackers to uncover weaknesses.

- Ask developers how the system could be broken
- Involve developers for deep insights
- Include outsiders for fresh perspectives

Common misuse cases include:

- Invalid or oversized input
- Missing input values
- Injection attacks
- Insufficient funds or blocked transactions


:::info 

Use cases and misuse cases are textual but are often summarized and graphically depicted using a **Unified Modeling Language (UML) use case diagram**.

:::

## Interface Testing

Interface testing ensures that separate systems or components communicate properly.

- Ensure that data sent between systems is accurate and complete.
- Test the adherence to defined protocols and formats for communication.
- Confirm that error messages are properly handled and communicated.

:::info 

**Boundary conditions** are test cases that occur between data communication points during interface tests. 

:::

**Types of Interfaces**:

- **Application Programming Interface (API)**

  - Enables systems to communicate through defined methods
  - Specifies data formats for interaction
  - Supports integration between multiple applications

- **User Interface (UI)**

  - Also called **Graphical User Interface (GUI)**
  - Involves user interaction with visual elements
  - Uses menus, buttons, and forms

- **Physical Interfaces**

  - Connects hardware devices or hardware to software
  - Manages data transfer and device interaction
  - Examples: NIC (network interface cards), ports, connectors, and cables
