---
title: "Feature Stores"
description: "Feature Stores"
tags: 
- Machine Learning
- MLOps
sidebar_position: 17
last_update:
  date: 5/14/2023
---

## Overview

Feature stores are central databases for storing data prepared for ML training and inference. They enables feature reuse across models.

<div class="img-center"> 

![](/img/docs/all-things-data-Page-30.png)

</div>

## Dual Databases

Feature stores are often implemented as **dual databases** which are consists of two databases:

- DB1 - highly optimized for large volumes of training data
- DB2 - for fast retrieval of records at prediction time

<div class="img-center"> 

![](/img/docs/all-things-data-Page-31.png)

</div>

## Benefits 

Feature stores reduce time spent on feature engineering and help avoid issues like **training/serving skew**, where a model performs well during training but poorly in production. For example, training a spam filter on clean text emails but deploying it on HTML emails can cause performance drops.

<div class="img-center"> 

![](/img/docs/Screenshot-2025-03-20-082141.png)

</div>

