---
title: "Validating and Mutating Admission Controllers"
description: "Checking and enforcing policies with Admission Controllers"
tags:
  - Cloud
  - DevOps
  - Containers
  - Containerization
  - Kubernetes
  - Cybersecurity
sidebar_position: 11
last_update:
  date: 7/7/2022
---


## Overview  

These are two types of Kubernetes admission controllers, each with distinct roles in managing API requests.  

- Validating controllers check compliance with policies.  
- Mutating controllers modify requests before saving.  
- Both enforce rules in the request process.  

For more information, please see [Admission Controllers.](/docs/015-Containerization/033-Microservice-Vulnerabilities/010-Admission-Controllers.md)

## Validating Admission Controllers  

Admission Controllers validate and potentially reject requests based on predefined policies.  

**After Authorization, Before Persistence:**  

  - Triggered after requests are authenticated and authorized.  
  - Validates before saving to the cluster.  

**Use Cases:**  

- **Security Policies**  
  - Enforce pod security contexts.  
  - Validate against predefined security rules.  

- **Naming Conventions**  
  - Check resource names for compliance.  
  - Prevent invalid naming patterns.  

- **Label Requirements**  
  - Ensure required labels are present.  
  - Validate label consistency.  

## Mutating Admission Controllers  

Mutating admission controllers modify requests before they are persisted in the cluster.  

**Before Persistence:**  

  - Triggered after authentication and validation.  
  - Alters object content before saving.  

**Use Cases:**  

- **Default Values**  
  - Add default field values to objects.  
  - Simplify user input by automating defaults.  

- **Injection of Sidecar Containers**  
  - Automatically add sidecar containers.  
  - Enforce pod runtime configurations.  

- **Defaulting Container Images**  
  - Specify default container images.  
  - Standardize image settings.  

## Mutating First, Then Validating  

Mutating Admission Controllers are generally invoked first, followed by Validating Admission Controllers. It is done this way so that any change done by the Mutating Admission Controllers can be considere during the validation process.

