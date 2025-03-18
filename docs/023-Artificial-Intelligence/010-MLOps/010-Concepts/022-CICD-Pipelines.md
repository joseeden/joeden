---
title: "CICD Pipelines"
description: "CICD Pipelines"
tags: 
- Machine Learning
- MLOps
sidebar_position: 22
# last_update:
#   date: 7/7/2022
---

## Overview

CI/CD (Continuous Integration and Continuous Deployment) is a key part of the deployment phase. The CI/CD pipeline automates checks and processes to ensure that code is ready for production.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-18-233118.png)

</div>


## CICD

**Continuous Integration (CI)** means frequently integrating code changes and testing them automatically.

- Changes are tested as soon as they are committed.  
- CI tests each code change to ensure it works.

On the other hand, **Continuous Deployment (CD)** automates the release of validated code after testing.

- After testing, the new code is deployed automatically.  

For more information, please see [CICD Overview.](/docs/017-Version-Control-and-CICD/002-CICD-Overview.md)


## Deployment Strategies

Once a machine learning model is ready for deployment, we have several strategies for releasing it into production. Here are three common strategies:

- **Basic Deployment**: The old model is replaced entirely with the new model.  
- **Shadow Deployment**: The new model is tested alongside the old model using the same input data.  
- **Canary Deployment**: The new model is used for a small portion of the incoming data, allowing for safe testing.

## Basic Deployment

In basic deployment, the new model fully replaces the old one in production.

- **Simple and Fast**: The old model is replaced with the new one for all incoming data.  
- **Risky**: If the new model fails, all users are affected.

## Shadow Deployment

Shadow deployment runs the new model alongside the old one, testing both on new data.

- **Dual Models**: Both the old and new models process the same data.  
- **Low Risk**: Even if the new model fails, the old model is still active.

## Canary Deployment

Canary deployment uses the new model for only a small portion of incoming data.

- **Gradual Rollout**: The new model is tested on a small number of users.  
- **Risk Control**: If the new model fails, only a small number of users are affected.

## Comparison of Strategies

- **Basic Deployment**: Simple, but high risk if the model fails.  
- **Shadow Deployment**: Safer but requires more resources since both models run simultaneously.  
- **Canary Deployment**: More efficient than shadow deployment but slightly riskier.