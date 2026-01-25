---
title: "CICD Pipelines"
description: "CICD Pipelines"
tags: 
- Machine Learning
- MLOps
sidebar_position: 22
last_update:
  date: 5/12/2023
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

For more information, please see [CICD Overview.](/docs/050-Version-Control-and-CICD/002-CICD-Overview.md)


## Deployment Strategies

Once a machine learning model is ready for deployment, we have several strategies for releasing it into production. 

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-19-000707.png)

</div>

For more information, please see [Deployment Strategies.](/docs/080-Machine-Learning/011-MLOps-Deployment/020-Deployment-Strategies.md)

## Automation and Scaling

Automation and scaling helps speed up processes and handle large datasets more efficiently. Here's how automation and scaling fit into different stages of the machine learning lifecycle:

- **Design Phase**  
  - Sets the foundation for machine learning
  - Align business needs with technical goals  
  - Templatize designs for more structured processes in MLOps

- **Data Acquisition and Quality Checks**  
  - Automated data collection improves the model's success rate
  - Automate data checks for quality  
  - Ensures better machine learning model performance  

- **Development Phase**  
  - Focused on building features and experiments
  - Use feature stores to save time  
  - Automate experiment tracking for progress and reproducibility.

- **Deployment Phase**  
  - Use containerization for flexible scaling  
  - Set up CI/CD pipelines for faster, automated updates  
  - Microservices architecture helps scale individual parts independently

For more information, please see:

- [Scalability](/docs/080-Machine-Learning/012-Developing-Models/024-Scalability.md)
- [Automation](/docs/080-Machine-Learning/012-Developing-Models/026-Automation.md)