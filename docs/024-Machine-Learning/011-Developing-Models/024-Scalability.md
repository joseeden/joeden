---
title: "Scalability"
description: "Scalability"
tags: 
- Machine Learning
- MLOps
sidebar_position: 22
last_update:
  date: 5/13/2023
---

## Overview

Scaling ML models ensures they can handle increasing data and usage over time. The following are key aspects of scaling and how they impact model performance.

## Compute Constraints 

ML models may face performance issues if the computational resources (CPU, memory, disk space) are insufficient.

- Monitor resource usage during training.
- Ensure serving machines meet required resources.
- Good to identify constraints early.

For example, if your model uses too much memory, it might crash during deployment. 

## Model Complexity 

More complex models tend to require more resources. Balancing complexity with scalability is essential.

- Use feature selection (e.g., Chi-squared, PCA) to reduce model size.
- Implement pruning to remove unnecessary parameters.

These techniques help reduce model size and improve scalability, and ensures faster deployment and lower resource consumption.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-19-081441.png)

</div>


## Velocity of Deployments

Rapid model deployment ensures models stay accurate and relevant over time.

- Use continuous integration (CI/CD) pipelines.
- Use online learning for real-time updates without retraining.

This helps keep the model current without needing to retrain from scratch each time new data comes in.

## Scaling Strategies

There are different ways to scale models depending on the workload and resource requirements.

- **Horizontal Scaling**
  - Add more machines to handle increased demand
  - Implement using load balancing or round robin
  - Partitioning can be used to distribute across machines
  - More machine required = increased complexity and cost
 
- **Vertical Scaling**
  - Add more resources to existing machine, increasing capacity
  - More powerful hardware = can lead to increased cost

- **Auto-Scaling**
  - Dynamically adjust resources based on current demand.
