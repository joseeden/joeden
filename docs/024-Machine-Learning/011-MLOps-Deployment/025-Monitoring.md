---
title: "Monitoring"
description: "Monitoring"
tags: 
- Machine Learning
- MLOps
sidebar_position: 25
last_update:
  date: 5/14/2023
---


## Overview

To guarantee the quality of our ML models, we need to monitor both system health and prediction accuracy. This are some key health indicators that we need to monitor:

- Service uptime  
- Request volume and success rate  
- Latency levels

These indicators help maintain overall system stability. However, ensuring the quality of predictions is even more crucial.

## Concept Drift

**Concept drift** occurs when the relationship between input and output features changes over time.

- Leads to incorrect predictions, even though model hasn't changed:
- The model might continue using outdated boundaries for classification.

Since ground truth is often delayed, we can't always verify predictions right away. The time between making a prediction and when the true result becomes available, also known as **verification latency**, makes detecting concept drift more challenging.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-102529.png)

</div>


## Covariate Shift

**Covariate shift** occurs when the input features change over time. It is a good indicator of concept drift but it is not perfect. 

- Can happen without any covariate shift 
- Can also occur at the same time as concept shift as well

Monitoring these shifts helps us identify when the model may need adjustments, though it doesn't always guarantee concept drift.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-102909.png)

</div>

## Monitoring Outputs

When ground truth is unavailable, monitoring output changes becomes vital. If the model’s predictions begin to differ from expected patterns, it may indicate the model needs updating.

<div class="img-center"> 

![](/img/docs/63e4d430549d4a26879bdad9_Frame_2-p-800.jpg)

</div>
