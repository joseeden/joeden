---
title: "Automation"
description: "Automation"
tags: 
- Machine Learning
- MLOps
sidebar_position: 26
last_update:
  date: 5/13/2023
---



## Overview

Automation improve efficiency and reduce human error in ML pipelines. The four main principles are:

- **Continuous Integration (CI)**: Regularly merge code changes into a shared repository.
- **Continuous Delivery (CD)**: Automatically build, test, and deploy code.
- **Continuous Training (CT)**: Automatically update models as new data arrives.
- **Continuous Monitoring (CM)**: Continuously track model performance.

## Continuous Integration and Delivery

**Continuous Integration (CI)** means frequently integrating code changes and testing them automatically.

- Changes are tested as soon as they are committed.  
- CI tests each code change to ensure it works.

On the other hand, **Continuous Deployment (CD)** automates the release of validated code after testing.

- After testing, the new code is deployed automatically.  

For more information, please see [CICD Overview.](/docs/050-Version-Control-and-CICD/002-CICD-Overview.md)

:::info 

Tools like **Git**, **AWS CodePipeline**, **Jenkins**, and **Travis CI** are commonly used to implement CI/CD.

:::

## Continuous Training 

Continuous Training involves automatically retraining models as new data becomes available, keeping models accurate.

- Reduce the risk of model decay
- Reduce the time required to retrain models 

## Continuous Monitoring

Continuous Monitoring is the practice of continuously monitoring performance, identifying issues early, and triggering retraining if necessary.

- Also reduces the risk of model decay
- Improves overall accuracy ad performance 
- Access to consistent and reliable ML metrics


## Example: ML Automation at Scale

Here’s how automation works in a typical ML pipeline:

1. **Code Commit**: Commit model code to **Git**.
2. **CI/CD**: Automatically build and test with **Jenkins**.
3. **Deploy**: If tests pass, deploy to a test environment.
4. **Model Deployment**: Package model in **Docker**, deploy to cloud/local.
5. **Monitoring**: Use **Prometheus** or **Grafana** for performance tracking.
6. **Retraining**: Trigger retraining if performance dips.

