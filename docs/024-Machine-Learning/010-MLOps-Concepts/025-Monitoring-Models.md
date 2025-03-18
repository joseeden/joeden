---
title: "Monitoring Models"
description: "Monitoring Models"
tags: 
- Machine Learning
- MLOps
sidebar_position: 25
last_update:
  date: 5/12/2023
---

## Overview

Monitoring ensures the model is working as expected over time.

- Monitor model predictions over time  
- Ensure the model works with new data

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-19-002202.png)

</div>


## Types of Monitoring  

Monitoring can be divided into two main categories:

- **Statistical monitoring**

  - Track model output (e.g., prediction accuracy)  
  - Monitor how well predictions match real outcomes  

- **Computational monitoring**

  - Track resource usage (e.g., server load)  
  - Monitor incoming requests and network traffic


## Feedback Loop  

The feedback loop helps improve the model over time.

- Compare predictions to actual outcomes (ground truth)  
- Identify model errors and why they occur  
- Use feedback to improve the model

The actual results are called the **ground truth**, which helps assess the model's accuracy and guide adjustments

## Effective Monitoring 

Effective monitoring helps detect and resolve issues quickly.

- Monitor both statistical and computational metrics  
- Spot issues early and fix them quickly

## MLOps Tools  

MLOps tools improve machine learning workflows and makes them more efficient and reliable.

- **Feature store**  
  - Tools: Feast, Hopsworks  
  - Feast is open-source and self-managed, offering flexibility.  
  - Hopsworks is best with the full Hopsworks platform.

- **Experiment tracking**  
  - Tools: MLFlow, ClearML, Weights and Biases  
  - MLFlow tracks experiments and development.  
  - ClearML tracks experiments and handles deployment.  
  - Weights and Biases visualizes experiment results.

- **Containerization**  
  - Tools: Docker, Kubernetes, cloud services  
  - Docker containers apps; Kubernetes handles deployment and scaling.  
  - Cloud services like AWS, Azure, and Google Cloud manage containers.

- **CI/CD pipeline**  
  - Tools: Jenkins, GitLab  
  - Jenkins automates the CI/CD process.  
  - GitLab offers CI/CD tools and project management.

- **Monitoring**  
  - Tools: Fiddler, Great Expectations  
  - Fiddler tracks model performance.  
  - Great Expectations monitors data quality.

- **MLOps platforms**  
  - Tools: AWS Sagemaker, Azure ML, Google Cloud AI  
  - These platforms cover the entire machine learning lifecycle, from data exploration to model deployment.