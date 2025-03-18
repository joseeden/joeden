---
title: "ML in Production"
description: "ML in Production"
tags: 
- Machine Learning
- MLOps
sidebar_position: 25
# last_update:
#   date: 7/7/2022
---

## Monitoring the Model  

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